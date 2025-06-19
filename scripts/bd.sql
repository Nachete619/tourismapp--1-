-- =====================================================
-- ESTRUCTURA COMPLETA BASE DE DATOS TURISMOAPP
-- Compatible con Supabase (PostgreSQL)
-- =====================================================

-- =====================================================
-- 1. EXTENSIONES Y CONFIGURACIONES
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 2. ENUMS Y TIPOS PERSONALIZADOS
-- =====================================================

-- Tipos de usuario
CREATE TYPE user_type AS ENUM ('cliente', 'admin', 'vendedor');

-- Estados de pedidos
CREATE TYPE order_status AS ENUM ('pendiente', 'confirmado', 'en_proceso', 'entregado', 'cancelado', 'anulado');

-- Tipos de productos/servicios
CREATE TYPE product_type AS ENUM ('vuelo', 'hospedaje', 'auto', 'paquete');

-- Estados de email
CREATE TYPE email_status AS ENUM ('pendiente', 'enviado', 'fallido', 'reenviado');

-- Métodos de pago
CREATE TYPE payment_method AS ENUM ('tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo', 'paypal');

-- =====================================================
-- 3. TABLAS PRINCIPALES
-- =====================================================

-- Tabla de perfiles de usuario (extiende auth.users de Supabase)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    tipo_usuario user_type NOT NULL DEFAULT 'cliente',
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    fecha_nacimiento DATE,
    documento_identidad VARCHAR(50),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos/servicios
CREATE TABLE public.productos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo product_type NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    precio_oferta DECIMAL(10,2) CHECK (precio_oferta >= 0),
    disponible BOOLEAN DEFAULT TRUE,
    stock INTEGER DEFAULT 0,
    
    -- Campos específicos para vuelos
    origen VARCHAR(100),
    destino VARCHAR(100),
    fecha_salida TIMESTAMP WITH TIME ZONE,
    fecha_llegada TIMESTAMP WITH TIME ZONE,
    aerolinea VARCHAR(100),
    clase_vuelo VARCHAR(50),
    
    -- Campos específicos para hospedaje
    ubicacion VARCHAR(200),
    tipo_alojamiento VARCHAR(100),
    habitaciones INTEGER,
    servicios_incluidos TEXT[],
    check_in TIME,
    check_out TIME,
    
    -- Campos específicos para autos
    modelo VARCHAR(100),
    marca VARCHAR(100),
    año INTEGER,
    tipo_vehiculo VARCHAR(50),
    ubicacion_recogida VARCHAR(200),
    ubicacion_devolucion VARCHAR(200),
    
    -- Campos específicos para paquetes
    servicios_incluidos_paquete TEXT[],
    duracion_dias INTEGER,
    itinerario TEXT,
    
    -- Metadatos
    imagen_url TEXT,
    imagenes_adicionales TEXT[],
    tags TEXT[],
    calificacion DECIMAL(2,1) DEFAULT 0 CHECK (calificacion >= 0 AND calificacion <= 5),
    numero_resenas INTEGER DEFAULT 0,
    
    created_by UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de carrito de compras
CREATE TABLE public.carrito (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES public.productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    fecha_agregado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Campos específicos para servicios con fechas
    fecha_servicio_inicio DATE,
    fecha_servicio_fin DATE,
    pasajeros INTEGER DEFAULT 1,
    observaciones TEXT,
    
    UNIQUE(user_id, producto_id, fecha_servicio_inicio)
);

-- Tabla de pedidos
CREATE TABLE public.pedidos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    numero_pedido VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    estado order_status DEFAULT 'pendiente',
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0,
    descuentos DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    metodo_pago payment_method,
    
    -- Información de contacto para el pedido
    email_contacto VARCHAR(255),
    telefono_contacto VARCHAR(20),
    direccion_entrega TEXT,
    
    -- Fechas importantes
    fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_confirmacion TIMESTAMP WITH TIME ZONE,
    fecha_entrega TIMESTAMP WITH TIME ZONE,
    fecha_cancelacion TIMESTAMP WITH TIME ZONE,
    
    -- Notas y observaciones
    notas_cliente TEXT,
    notas_admin TEXT,
    
    -- Auditoría
    procesado_por UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de detalle de pedidos
CREATE TABLE public.detalle_pedidos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pedido_id UUID REFERENCES public.pedidos(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES public.productos(id),
    cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    
    -- Información específica del servicio al momento de la compra
    nombre_producto VARCHAR(200) NOT NULL,
    descripcion_producto TEXT,
    tipo_producto product_type NOT NULL,
    
    -- Fechas de servicio
    fecha_servicio_inicio DATE,
    fecha_servicio_fin DATE,
    pasajeros INTEGER DEFAULT 1,
    
    -- Información adicional del servicio
    detalles_servicio JSONB,
    observaciones TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos históricos
CREATE TABLE public.pedidos_historicos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pedido_original_id UUID NOT NULL,
    numero_pedido VARCHAR(20) NOT NULL,
    user_id UUID REFERENCES public.user_profiles(id),
    estado order_status NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    descuentos DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago payment_method,
    
    -- Información de contacto
    email_contacto VARCHAR(255),
    telefono_contacto VARCHAR(20),
    direccion_entrega TEXT,
    
    -- Fechas
    fecha_pedido TIMESTAMP WITH TIME ZONE,
    fecha_confirmacion TIMESTAMP WITH TIME ZONE,
    fecha_entrega TIMESTAMP WITH TIME ZONE,
    fecha_cancelacion TIMESTAMP WITH TIME ZONE,
    fecha_movido_historico TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Notas
    notas_cliente TEXT,
    notas_admin TEXT,
    
    -- Auditoría
    procesado_por UUID REFERENCES public.user_profiles(id),
    movido_por UUID REFERENCES public.user_profiles(id),
    
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de detalle pedidos históricos
CREATE TABLE public.detalle_pedidos_historicos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pedido_historico_id UUID REFERENCES public.pedidos_historicos(id) ON DELETE CASCADE,
    detalle_original_id UUID NOT NULL,
    producto_id UUID,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    
    -- Información del producto al momento de la compra
    nombre_producto VARCHAR(200) NOT NULL,
    descripcion_producto TEXT,
    tipo_producto product_type NOT NULL,
    
    -- Fechas de servicio
    fecha_servicio_inicio DATE,
    fecha_servicio_fin DATE,
    pasajeros INTEGER,
    
    -- Información adicional
    detalles_servicio JSONB,
    observaciones TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de ventas/transacciones
CREATE TABLE public.ventas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pedido_id UUID REFERENCES public.pedidos(id),
    user_id UUID REFERENCES public.user_profiles(id),
    numero_transaccion VARCHAR(50) UNIQUE NOT NULL,
    
    -- Montos
    monto_bruto DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0,
    descuentos DECIMAL(10,2) NOT NULL DEFAULT 0,
    monto_neto DECIMAL(10,2) NOT NULL,
    comision DECIMAL(10,2) DEFAULT 0,
    
    -- Información de pago
    metodo_pago payment_method NOT NULL,
    referencia_pago VARCHAR(100),
    estado_pago VARCHAR(50) DEFAULT 'completado',
    
    -- Información del cliente
    cliente_nombre VARCHAR(200),
    cliente_email VARCHAR(255),
    cliente_telefono VARCHAR(20),
    
    -- Clasificación
    tipo_servicio product_type,
    categoria_venta VARCHAR(100),
    
    -- Fechas
    fecha_venta TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_servicio DATE,
    periodo_contable VARCHAR(7), -- YYYY-MM
    
    -- Auditoría
    procesado_por UUID REFERENCES public.user_profiles(id),
    notas TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de emails automáticos
CREATE TABLE public.emails_automaticos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pedido_id UUID REFERENCES public.pedidos(id),
    user_id UUID REFERENCES public.user_profiles(id),
    
    -- Información del email
    tipo_email VARCHAR(50) NOT NULL, -- 'confirmacion_pedido', 'pedido_entregado', 'cancelacion', etc.
    destinatario_email VARCHAR(255) NOT NULL,
    destinatario_nombre VARCHAR(200),
    copia_email VARCHAR(255), -- para copia al sector correspondiente
    
    -- Contenido
    asunto VARCHAR(255) NOT NULL,
    cuerpo_html TEXT,
    cuerpo_texto TEXT,
    
    -- Estado del envío
    estado email_status DEFAULT 'pendiente',
    fecha_envio TIMESTAMP WITH TIME ZONE,
    fecha_programado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    intentos_envio INTEGER DEFAULT 0,
    error_mensaje TEXT,
    
    -- Metadatos
    proveedor_email VARCHAR(50) DEFAULT 'supabase',
    template_usado VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración del sistema
CREATE TABLE public.configuracion_sistema (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descripcion TEXT,
    tipo_dato VARCHAR(20) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    categoria VARCHAR(50) DEFAULT 'general',
    activo BOOLEAN DEFAULT TRUE,
    
    updated_by UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de logs de actividad
CREATE TABLE public.logs_actividad (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50),
    registro_id UUID,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address INET,
    user_agent TEXT,
    fecha_accion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para user_profiles
CREATE INDEX idx_user_profiles_tipo ON public.user_profiles(tipo_usuario);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_activo ON public.user_profiles(activo);

-- Índices para productos
CREATE INDEX idx_productos_codigo ON public.productos(codigo);
CREATE INDEX idx_productos_tipo ON public.productos(tipo);
CREATE INDEX idx_productos_disponible ON public.productos(disponible);
CREATE INDEX idx_productos_precio ON public.productos(precio);
CREATE INDEX idx_productos_origen_destino ON public.productos(origen, destino) WHERE tipo = 'vuelo';
CREATE INDEX idx_productos_ubicacion ON public.productos(ubicacion) WHERE tipo = 'hospedaje';

-- Índices para carrito
CREATE INDEX idx_carrito_user_id ON public.carrito(user_id);
CREATE INDEX idx_carrito_producto_id ON public.carrito(producto_id);
CREATE INDEX idx_carrito_fecha_agregado ON public.carrito(fecha_agregado);

-- Índices para pedidos
CREATE INDEX idx_pedidos_numero ON public.pedidos(numero_pedido);
CREATE INDEX idx_pedidos_user_id ON public.pedidos(user_id);
CREATE INDEX idx_pedidos_estado ON public.pedidos(estado);
CREATE INDEX idx_pedidos_fecha ON public.pedidos(fecha_pedido);
CREATE INDEX idx_pedidos_total ON public.pedidos(total);

-- Índices para ventas
CREATE INDEX idx_ventas_fecha ON public.ventas(fecha_venta);
CREATE INDEX idx_ventas_user_id ON public.ventas(user_id);
CREATE INDEX idx_ventas_tipo_servicio ON public.ventas(tipo_servicio);
CREATE INDEX idx_ventas_periodo ON public.ventas(periodo_contable);
CREATE INDEX idx_ventas_metodo_pago ON public.ventas(metodo_pago);

-- Índices para emails
CREATE INDEX idx_emails_estado ON public.emails_automaticos(estado);
CREATE INDEX idx_emails_fecha_programado ON public.emails_automaticos(fecha_programado);
CREATE INDEX idx_emails_tipo ON public.emails_automaticos(tipo_email);

-- =====================================================
-- 5. FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger de updated_at a las tablas necesarias
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON public.user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_productos_updated_at 
    BEFORE UPDATE ON public.productos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_updated_at 
    BEFORE UPDATE ON public.pedidos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_emails_updated_at 
    BEFORE UPDATE ON public.emails_automaticos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_updated_at 
    BEFORE UPDATE ON public.configuracion_sistema 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar número de pedido único
CREATE OR REPLACE FUNCTION generar_numero_pedido()
RETURNS TEXT AS $$
DECLARE
    nuevo_numero TEXT;
    contador INTEGER;
BEGIN
    -- Generar número basado en fecha y secuencia
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_pedido FROM 9) AS INTEGER)), 0) + 1
    INTO contador
    FROM public.pedidos 
    WHERE numero_pedido LIKE TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-%';
    
    nuevo_numero := TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(contador::TEXT, 4, '0');
    
    RETURN nuevo_numero;
END;
$$ LANGUAGE plpgsql;

-- Trigger para asignar número de pedido automáticamente
CREATE OR REPLACE FUNCTION asignar_numero_pedido()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.numero_pedido IS NULL OR NEW.numero_pedido = '' THEN
        NEW.numero_pedido := generar_numero_pedido();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_asignar_numero_pedido
    BEFORE INSERT ON public.pedidos
    FOR EACH ROW EXECUTE FUNCTION asignar_numero_pedido();

-- Función para calcular total del pedido
CREATE OR REPLACE FUNCTION calcular_total_pedido(pedido_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    subtotal_calculado DECIMAL(10,2);
    impuestos_calculados DECIMAL(10,2);
    total_calculado DECIMAL(10,2);
BEGIN
    -- Calcular subtotal desde detalle_pedidos
    SELECT COALESCE(SUM(subtotal), 0)
    INTO subtotal_calculado
    FROM public.detalle_pedidos
    WHERE pedido_id = pedido_uuid;
    
    -- Calcular impuestos (21% por defecto, configurable)
    impuestos_calculados := subtotal_calculado * 0.21;
    
    -- Calcular total
    total_calculado := subtotal_calculado + impuestos_calculados;
    
    -- Actualizar el pedido
    UPDATE public.pedidos 
    SET 
        subtotal = subtotal_calculado,
        impuestos = impuestos_calculados,
        total = total_calculado,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = pedido_uuid;
    
    RETURN total_calculado;
END;
$$ LANGUAGE plpgsql;

-- Trigger para recalcular total cuando se modifica detalle_pedidos
CREATE OR REPLACE FUNCTION trigger_recalcular_total()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM calcular_total_pedido(OLD.pedido_id);
        RETURN OLD;
    ELSE
        PERFORM calcular_total_pedido(NEW.pedido_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_recalcular_total_pedido
    AFTER INSERT OR UPDATE OR DELETE ON public.detalle_pedidos
    FOR EACH ROW EXECUTE FUNCTION trigger_recalcular_total();

-- Función para mover pedido a histórico
CREATE OR REPLACE FUNCTION mover_pedido_a_historico(pedido_uuid UUID, usuario_movio UUID)
RETURNS BOOLEAN AS $$
DECLARE
    pedido_record RECORD;
    detalle_record RECORD;
    nuevo_historico_id UUID;
BEGIN
    -- Obtener datos del pedido
    SELECT * INTO pedido_record FROM public.pedidos WHERE id = pedido_uuid;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Pedido no encontrado: %', pedido_uuid;
    END IF;
    
    -- Insertar en pedidos_historicos
    INSERT INTO public.pedidos_historicos (
        pedido_original_id, numero_pedido, user_id, estado, subtotal, impuestos, 
        descuentos, total, metodo_pago, email_contacto, telefono_contacto, 
        direccion_entrega, fecha_pedido, fecha_confirmacion, fecha_entrega, 
        fecha_cancelacion, notas_cliente, notas_admin, procesado_por, 
        movido_por, created_at, updated_at
    ) VALUES (
        pedido_record.id, pedido_record.numero_pedido, pedido_record.user_id, 
        pedido_record.estado, pedido_record.subtotal, pedido_record.impuestos,
        pedido_record.descuentos, pedido_record.total, pedido_record.metodo_pago,
        pedido_record.email_contacto, pedido_record.telefono_contacto,
        pedido_record.direccion_entrega, pedido_record.fecha_pedido,
        pedido_record.fecha_confirmacion, pedido_record.fecha_entrega,
        pedido_record.fecha_cancelacion, pedido_record.notas_cliente,
        pedido_record.notas_admin, pedido_record.procesado_por,
        usuario_movio, pedido_record.created_at, pedido_record.updated_at
    ) RETURNING id INTO nuevo_historico_id;
    
    -- Mover detalles del pedido
    FOR detalle_record IN 
        SELECT * FROM public.detalle_pedidos WHERE pedido_id = pedido_uuid
    LOOP
        INSERT INTO public.detalle_pedidos_historicos (
            pedido_historico_id, detalle_original_id, producto_id, cantidad,
            precio_unitario, subtotal, nombre_producto, descripcion_producto,
            tipo_producto, fecha_servicio_inicio, fecha_servicio_fin,
            pasajeros, detalles_servicio, observaciones, created_at
        ) VALUES (
            nuevo_historico_id, detalle_record.id, detalle_record.producto_id,
            detalle_record.cantidad, detalle_record.precio_unitario,
            detalle_record.subtotal, detalle_record.nombre_producto,
            detalle_record.descripcion_producto, detalle_record.tipo_producto,
            detalle_record.fecha_servicio_inicio, detalle_record.fecha_servicio_fin,
            detalle_record.pasajeros, detalle_record.detalles_servicio,
            detalle_record.observaciones, detalle_record.created_at
        );
    END LOOP;
    
    -- Eliminar detalle del pedido original
    DELETE FROM public.detalle_pedidos WHERE pedido_id = pedido_uuid;
    
    -- Eliminar pedido original
    DELETE FROM public.pedidos WHERE id = pedido_uuid;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Función para crear venta automáticamente cuando se entrega un pedido
CREATE OR REPLACE FUNCTION crear_venta_desde_pedido()
RETURNS TRIGGER AS $$
DECLARE
    numero_transaccion TEXT;
BEGIN
    -- Solo crear venta cuando el estado cambia a 'entregado'
    IF NEW.estado = 'entregado' AND OLD.estado != 'entregado' THEN
        -- Generar número de transacción único
        numero_transaccion := 'TXN-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISS') || '-' || SUBSTRING(NEW.id::TEXT FROM 1 FOR 8);
        
        -- Insertar en tabla de ventas
        INSERT INTO public.ventas (
            pedido_id, user_id, numero_transaccion, monto_bruto, impuestos,
            descuentos, monto_neto, metodo_pago, cliente_nombre, cliente_email,
            cliente_telefono, fecha_venta, fecha_servicio, periodo_contable,
            procesado_por
        ) VALUES (
            NEW.id, NEW.user_id, numero_transaccion, NEW.subtotal, NEW.impuestos,
            NEW.descuentos, NEW.total, NEW.metodo_pago,
            (SELECT nombre || ' ' || apellido FROM public.user_profiles WHERE id = NEW.user_id),
            NEW.email_contacto,
            NEW.telefono_contacto,
            CURRENT_TIMESTAMP,
            CURRENT_DATE,
            TO_CHAR(CURRENT_DATE, 'YYYY-MM'),
            NEW.procesado_por
        );
        
        -- Programar email de confirmación de entrega
        INSERT INTO public.emails_automaticos (
            pedido_id, user_id, tipo_email, destinatario_email, destinatario_nombre,
            asunto, cuerpo_texto, fecha_programado
        ) VALUES (
            NEW.id, NEW.user_id, 'pedido_entregado', NEW.email_contacto,
            (SELECT nombre || ' ' || apellido FROM public.user_profiles WHERE id = NEW.user_id),
            'Pedido Entregado - ' || NEW.numero_pedido,
            'Su pedido ' || NEW.numero_pedido || ' ha sido entregado exitosamente.',
            CURRENT_TIMESTAMP
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_crear_venta_entrega
    AFTER UPDATE ON public.pedidos
    FOR EACH ROW EXECUTE FUNCTION crear_venta_desde_pedido();

-- Función para registrar actividad en logs
CREATE OR REPLACE FUNCTION registrar_log_actividad()
RETURNS TRIGGER AS $$
DECLARE
    user_id_actual UUID;
    accion_realizada TEXT;
BEGIN
    -- Obtener user_id del contexto actual (puede ser NULL si es un proceso automático)
    user_id_actual := NULLIF(current_setting('app.current_user_id', TRUE), '')::UUID;
    
    -- Determinar la acción
    IF TG_OP = 'INSERT' THEN
        accion_realizada := 'INSERT';
        INSERT INTO public.logs_actividad (
            user_id, accion, tabla_afectada, registro_id, datos_nuevos
        ) VALUES (
            user_id_actual, accion_realizada, TG_TABLE_NAME, NEW.id, to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        accion_realizada := 'UPDATE';
        INSERT INTO public.logs_actividad (
            user_id, accion, tabla_afectada, registro_id, datos_anteriores, datos_nuevos
        ) VALUES (
            user_id_actual, accion_realizada, TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        accion_realizada := 'DELETE';
        INSERT INTO public.logs_actividad (
            user_id, accion, tabla_afectada, registro_id, datos_anteriores
        ) VALUES (
            user_id_actual, accion_realizada, TG_TABLE_NAME, OLD.id, to_jsonb(OLD)
        );
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers de auditoría a tablas importantes
CREATE TRIGGER trigger_log_pedidos
    AFTER INSERT OR UPDATE OR DELETE ON public.pedidos
    FOR EACH ROW EXECUTE FUNCTION registrar_log_actividad();

CREATE TRIGGER trigger_log_productos
    AFTER INSERT OR UPDATE OR DELETE ON public.productos
    FOR EACH ROW EXECUTE FUNCTION registrar_log_actividad();

-- =====================================================
-- 6. VISTAS ÚTILES
-- =====================================================

-- Vista de pedidos con información del cliente
CREATE VIEW public.vista_pedidos_completa AS
SELECT 
    p.id,
    p.numero_pedido,
    p.estado,
    p.total,
    p.fecha_pedido,
    p.fecha_entrega,
    up.nombre || ' ' || up.apellido AS cliente_nombre,
    up.email AS cliente_email,
    up.telefono AS cliente_telefono,
    COUNT(dp.id) AS total_items,
    STRING_AGG(DISTINCT prod.tipo::TEXT, ', ') AS tipos_productos
FROM public.pedidos p
LEFT JOIN public.user_profiles up ON p.user_id = up.id
LEFT JOIN public.detalle_pedidos dp ON p.id = dp.pedido_id
LEFT JOIN public.productos prod ON dp.producto_id = prod.id
GROUP BY p.id, p.numero_pedido, p.estado, p.total, p.fecha_pedido, p.fecha_entrega,
         up.nombre, up.apellido, up.email, up.telefono;

-- Vista de estadísticas de ventas
CREATE VIEW public.vista_estadisticas_ventas AS
SELECT 
    DATE_TRUNC('month', fecha_venta) AS mes,
    tipo_servicio,
    COUNT(*) AS total_ventas,
    SUM(monto_neto) AS ingresos_totales,
    AVG(monto_neto) AS promedio_venta,
    COUNT(DISTINCT user_id) AS clientes_unicos
FROM public.ventas
GROUP BY DATE_TRUNC('month', fecha_venta), tipo_servicio
ORDER BY mes DESC, tipo_servicio;

-- Vista de productos más vendidos
CREATE VIEW public.vista_productos_populares AS
SELECT 
    p.id,
    p.codigo,
    p.nombre,
    p.tipo,
    p.precio,
    COUNT(dp.id) AS veces_vendido,
    SUM(dp.cantidad) AS cantidad_total_vendida,
    SUM(dp.subtotal) AS ingresos_generados,
    AVG(dp.precio_unitario) AS precio_promedio_venta
FROM public.productos p
LEFT JOIN public.detalle_pedidos dp ON p.id = dp.producto_id
LEFT JOIN public.pedidos ped ON dp.pedido_id = ped.id
WHERE ped.estado = 'entregado'
GROUP BY p.id, p.codigo, p.nombre, p.tipo, p.precio
ORDER BY cantidad_total_vendida DESC, ingresos_generados DESC;

-- Vista de estado de cuenta por cliente
CREATE VIEW public.vista_estado_cuenta_clientes AS
SELECT 
    up.id AS user_id,
    up.nombre || ' ' || up.apellido AS cliente_nombre,
    up.email,
    COUNT(DISTINCT v.id) AS total_compras,
    SUM(v.monto_neto) AS total_gastado,
    AVG(v.monto_neto) AS promedio_compra,
    MAX(v.fecha_venta) AS ultima_compra,
    MIN(v.fecha_venta) AS primera_compra,
    COUNT(DISTINCT p.id) AS pedidos_pendientes
FROM public.user_profiles up
LEFT JOIN public.ventas v ON up.id = v.user_id
LEFT JOIN public.pedidos p ON up.id = p.user_id AND p.estado IN ('pendiente', 'confirmado', 'en_proceso')
WHERE up.tipo_usuario = 'cliente'
GROUP BY up.id, up.nombre, up.apellido, up.email
ORDER BY total_gastado DESC NULLS LAST;

-- Vista de emails pendientes de envío
CREATE VIEW public.vista_emails_pendientes AS
SELECT 
    ea.id,
    ea.tipo_email,
    ea.destinatario_email,
    ea.destinatario_nombre,
    ea.asunto,
    ea.fecha_programado,
    ea.intentos_envio,
    p.numero_pedido,
    up.nombre || ' ' || up.apellido AS cliente_nombre
FROM public.emails_automaticos ea
LEFT JOIN public.pedidos p ON ea.pedido_id = p.id
LEFT JOIN public.user_profiles up ON ea.user_id = up.id
WHERE ea.estado = 'pendiente'
ORDER BY ea.fecha_programado ASC;

-- =====================================================
-- 7. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS en todas las tablas principales
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrito ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalle_pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos_historicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalle_pedidos_historicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails_automaticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_sistema ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs_actividad ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Los admins pueden ver todos los perfiles" ON public.user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para productos (lectura pública, escritura solo admins)
CREATE POLICY "Todos pueden ver productos disponibles" ON public.productos
    FOR SELECT USING (disponible = true);

CREATE POLICY "Solo admins pueden gestionar productos" ON public.productos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para carrito
CREATE POLICY "Los usuarios pueden gestionar su propio carrito" ON public.carrito
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para pedidos
CREATE POLICY "Los usuarios pueden ver sus propios pedidos" ON public.pedidos
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden crear sus propios pedidos" ON public.pedidos
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus pedidos pendientes" ON public.pedidos
    FOR UPDATE USING (
        auth.uid() = user_id AND estado IN ('pendiente', 'confirmado')
    );

CREATE POLICY "Los admins pueden gestionar todos los pedidos" ON public.pedidos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para detalle_pedidos
CREATE POLICY "Los usuarios pueden ver detalles de sus pedidos" ON public.detalle_pedidos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.pedidos 
            WHERE id = pedido_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Los admins pueden gestionar todos los detalles" ON public.detalle_pedidos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para ventas (solo admins)
CREATE POLICY "Solo admins pueden ver ventas" ON public.ventas
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para emails (solo admins)
CREATE POLICY "Solo admins pueden gestionar emails" ON public.emails_automaticos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario IN ('admin', 'vendedor')
        )
    );

-- Políticas para configuración (solo admins)
CREATE POLICY "Solo admins pueden gestionar configuración" ON public.configuracion_sistema
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    );

-- Políticas para logs (solo lectura para admins)
CREATE POLICY "Solo admins pueden ver logs" ON public.logs_actividad
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND tipo_usuario = 'admin'
        )
    );

-- =====================================================
-- 8. FUNCIONES ADICIONALES PARA LA APLICACIÓN
-- =====================================================

-- Función para obtener el carrito de un usuario con totales
CREATE OR REPLACE FUNCTION obtener_carrito_usuario(usuario_id UUID)
RETURNS TABLE (
    id UUID,
    producto_id UUID,
    codigo_producto VARCHAR,
    nombre_producto VARCHAR,
    precio_unitario DECIMAL,
    cantidad INTEGER,
    subtotal DECIMAL,
    fecha_servicio_inicio DATE,
    fecha_servicio_fin DATE,
    pasajeros INTEGER,
    observaciones TEXT,
    total_carrito DECIMAL
) AS $$ -- CORREGIDO
DECLARE
    total_calculado DECIMAL(10,2);
BEGIN
    -- Calcular total del carrito
    SELECT COALESCE(SUM(c.subtotal), 0) INTO total_calculado
    FROM public.carrito c
    WHERE c.user_id = usuario_id;
    
    -- Retornar items del carrito con total
    RETURN QUERY
    SELECT 
        c.id,
        c.producto_id,
        p.codigo,
        p.nombre,
        c.precio_unitario,
        c.cantidad,
        c.subtotal,
        c.fecha_servicio_inicio,
        c.fecha_servicio_fin,
        c.pasajeros,
        c.observaciones,
        total_calculado
    FROM public.carrito c
    JOIN public.productos p ON c.producto_id = p.id
    WHERE c.user_id = usuario_id
    ORDER BY c.fecha_agregado DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- CORREGIDO

-- Función para crear pedido desde carrito
CREATE OR REPLACE FUNCTION crear_pedido_desde_carrito(
    usuario_id UUID,
    email_contacto VARCHAR DEFAULT NULL,
    telefono_contacto VARCHAR DEFAULT NULL,
    direccion_entrega TEXT DEFAULT NULL,
    notas_cliente TEXT DEFAULT NULL
)
RETURNS UUID AS $$ -- CORREGIDO
DECLARE
    nuevo_pedido_id UUID;
    item_carrito RECORD;
    producto_info RECORD;
BEGIN
    -- Verificar que el carrito no esté vacío
    IF NOT EXISTS (SELECT 1 FROM public.carrito WHERE user_id = usuario_id) THEN
        RAISE EXCEPTION 'El carrito está vacío';
    END IF;
    
    -- Crear el pedido
    INSERT INTO public.pedidos (
        user_id, email_contacto, telefono_contacto, direccion_entrega, notas_cliente
    ) VALUES (
        usuario_id, email_contacto, telefono_contacto, direccion_entrega, notas_cliente
    ) RETURNING id INTO nuevo_pedido_id;
    
    -- Mover items del carrito al detalle del pedido
    FOR item_carrito IN 
        SELECT * FROM public.carrito WHERE user_id = usuario_id
    LOOP
        -- Obtener información actual del producto
        SELECT codigo, nombre, descripcion, tipo 
        INTO producto_info
        FROM public.productos 
        WHERE id = item_carrito.producto_id;
        
        -- Insertar detalle del pedido
        INSERT INTO public.detalle_pedidos (
            pedido_id, producto_id, cantidad, precio_unitario,
            nombre_producto, descripcion_producto, tipo_producto,
            fecha_servicio_inicio, fecha_servicio_fin, pasajeros, observaciones
        ) VALUES (
            nuevo_pedido_id, item_carrito.producto_id, item_carrito.cantidad,
            item_carrito.precio_unitario, producto_info.nombre,
            producto_info.descripcion, producto_info.tipo,
            item_carrito.fecha_servicio_inicio, item_carrito.fecha_servicio_fin,
            item_carrito.pasajeros, item_carrito.observaciones
        );
    END LOOP;
    
    -- Limpiar el carrito
    DELETE FROM public.carrito WHERE user_id = usuario_id;
    
    -- El trigger se encargará de calcular el total automáticamente
    
    -- Programar email de confirmación
    INSERT INTO public.emails_automaticos (
        pedido_id, user_id, tipo_email, destinatario_email, destinatario_nombre,
        asunto, cuerpo_texto
    ) VALUES (
        nuevo_pedido_id, usuario_id, 'confirmacion_pedido',
        COALESCE(email_contacto, (SELECT email FROM public.user_profiles WHERE id = usuario_id)),
        (SELECT nombre || ' ' || apellido FROM public.user_profiles WHERE id = usuario_id),
        'Confirmación de Pedido - ' || (SELECT numero_pedido FROM public.pedidos WHERE id = nuevo_pedido_id),
        'Su pedido ha sido recibido y está siendo procesado.'
    );
    
    RETURN nuevo_pedido_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- CORREGIDO

-- Función para obtener resumen de ventas por período
CREATE OR REPLACE FUNCTION resumen_ventas_periodo(
    fecha_inicio DATE,
    fecha_fin DATE,
    tipo_servicio_filtro product_type DEFAULT NULL
)
RETURNS TABLE (
    periodo DATE,
    tipo product_type,
    total_ventas BIGINT,
    ingresos_brutos DECIMAL,
    ingresos_netos DECIMAL,
    clientes_unicos BIGINT
) AS $$ -- CORREGIDO
BEGIN
    RETURN QUERY
    SELECT 
        v.fecha_venta::DATE as periodo,
        v.tipo_servicio as tipo,
        COUNT(*)::BIGINT as total_ventas,
        SUM(v.monto_bruto) as ingresos_brutos,
        SUM(v.monto_neto) as ingresos_netos,
        COUNT(DISTINCT v.user_id)::BIGINT as clientes_unicos
    FROM public.ventas v
    WHERE v.fecha_venta::DATE BETWEEN fecha_inicio AND fecha_fin
      AND (tipo_servicio_filtro IS NULL OR v.tipo_servicio = tipo_servicio_filtro)
    GROUP BY v.fecha_venta::DATE, v.tipo_servicio
    ORDER BY periodo DESC, tipo;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- CORREGIDO

-- Función para buscar productos con filtros
CREATE OR REPLACE FUNCTION buscar_productos(
    texto_busqueda TEXT DEFAULT NULL,
    tipo_filtro product_type DEFAULT NULL,
    precio_min DECIMAL DEFAULT NULL,
    precio_max DECIMAL DEFAULT NULL,
    fecha_inicio DATE DEFAULT NULL,
    fecha_fin DATE DEFAULT NULL,
    origen_filtro VARCHAR DEFAULT NULL,
    destino_filtro VARCHAR DEFAULT NULL,
    ubicacion_filtro VARCHAR DEFAULT NULL,
    limite INTEGER DEFAULT 50,
    offset_param INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    codigo VARCHAR,
    nombre VARCHAR,
    descripcion TEXT,
    tipo product_type,
    precio DECIMAL,
    precio_oferta DECIMAL,
    origen VARCHAR,
    destino VARCHAR,
    ubicacion VARCHAR,
    fecha_salida TIMESTAMP WITH TIME ZONE,
    imagen_url TEXT,
    calificacion DECIMAL,
    numero_resenas INTEGER
) AS $$ -- CORREGIDO
BEGIN
    RETURN QUERY
    SELECT 
        p.id, p.codigo, p.nombre, p.descripcion, p.tipo, p.precio, p.precio_oferta,
        p.origen, p.destino, p.ubicacion, p.fecha_salida, p.imagen_url,
        p.calificacion, p.numero_resenas
    FROM public.productos p
    WHERE p.disponible = true
      AND (texto_busqueda IS NULL OR 
           p.nombre ILIKE '%' || texto_busqueda || '%' OR 
           p.descripcion ILIKE '%' || texto_busqueda || '%')
      AND (tipo_filtro IS NULL OR p.tipo = tipo_filtro)
      AND (precio_min IS NULL OR p.precio >= precio_min)
      AND (precio_max IS NULL OR p.precio <= precio_max)
      AND (fecha_inicio IS NULL OR p.fecha_salida::DATE >= fecha_inicio)
      AND (fecha_fin IS NULL OR p.fecha_salida::DATE <= fecha_fin)
      AND (origen_filtro IS NULL OR p.origen ILIKE '%' || origen_filtro || '%')
      AND (destino_filtro IS NULL OR p.destino ILIKE '%' || destino_filtro || '%')
      AND (ubicacion_filtro IS NULL OR p.ubicacion ILIKE '%' || ubicacion_filtro || '%')
    ORDER BY 
        CASE WHEN p.precio_oferta IS NOT NULL THEN p.precio_oferta ELSE p.precio END ASC,
        p.calificacion DESC
    LIMIT limite OFFSET offset_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- CORREGIDO

-- =====================================================
-- 11. FUNCIONES DE LIMPIEZA Y MANTENIMIENTO
-- =====================================================

-- Función para limpiar carritos abandonados
CREATE OR REPLACE FUNCTION limpiar_carritos_abandonados()
RETURNS INTEGER AS $$ -- CORREGIDO
DECLARE
    dias_limite INTEGER;
    registros_eliminados INTEGER;
BEGIN
    -- Obtener configuración de días límite
    SELECT valor::INTEGER INTO dias_limite
    FROM public.configuracion_sistema
    WHERE clave = 'dias_limpiar_carrito';
    
    IF dias_limite IS NULL THEN
        dias_limite := 7; -- Valor por defecto
    END IF;
    
    -- Eliminar carritos antiguos
    DELETE FROM public.carrito
    WHERE fecha_agregado < CURRENT_TIMESTAMP - INTERVAL '1 day' * dias_limite;
    
    GET DIAGNOSTICS registros_eliminados = ROW_COUNT;
    
    RETURN registros_eliminados;
END;
$$ LANGUAGE plpgsql; -- CORREGIDO

-- Función para actualizar estadísticas de productos
CREATE OR REPLACE FUNCTION actualizar_estadisticas_productos()
RETURNS VOID AS $$ -- CORREGIDO
BEGIN
    -- Actualizar número de reseñas y calificación promedio
    -- (Esto se implementaría cuando se agregue el sistema de reseñas)
    
    -- Por ahora, solo actualizar algunos campos calculados
    UPDATE public.productos 
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id IN (
        SELECT DISTINCT producto_id 
        FROM public.detalle_pedidos dp
        JOIN public.pedidos p ON dp.pedido_id = p.id
        WHERE p.fecha_pedido >= CURRENT_DATE - INTERVAL '1 day'
    );
END;
$$ LANGUAGE plpgsql; -- CORREGIDO
-- =====================================================
-- 9. CONFIGURACIÓN INICIAL DEL SISTEMA
-- =====================================================

-- Insertar configuraciones básicas del sistema
INSERT INTO public.configuracion_sistema (clave, valor, descripcion, tipo_dato, categoria) VALUES
('porcentaje_impuestos', '21', 'Porcentaje de impuestos aplicado a las ventas', 'number', 'ventas'),
('moneda_sistema', 'ARS', 'Moneda utilizada en el sistema', 'string', 'general'),
('email_admin', 'admin@turismoapp.com', 'Email del administrador del sistema', 'string', 'notificaciones'),
('horas_limite_modificacion', '24', 'Horas límite para modificar un pedido', 'number', 'pedidos'),
('productos_por_pagina', '20', 'Cantidad de productos mostrados por página', 'number', 'frontend'),
('activar_emails_automaticos', 'true', 'Activar envío automático de emails', 'boolean', 'notificaciones'),
('dias_limpiar_carrito', '7', 'Días después de los cuales se limpia el carrito automáticamente', 'number', 'general');

-- =====================================================
-- 10. DATOS DE PRUEBA
-- =====================================================

-- Insertar usuarios de prueba (después de que se registren via Supabase Auth)
-- Estos se insertarían automáticamente via trigger cuando alguien se registre

-- Insertar productos de ejemplo
INSERT INTO public.productos (codigo, nombre, descripcion, tipo, precio, origen, destino, fecha_salida, aerolinea, disponible) VALUES
('VUE001', 'Buenos Aires - Madrid', 'Vuelo directo Buenos Aires - Madrid con Iberia', 'vuelo', 89999.00, 'Buenos Aires', 'Madrid', '2025-07-15 14:30:00+00', 'Iberia', true),
('VUE002', 'Buenos Aires - Lima', 'Vuelo Buenos Aires - Lima con LATAM', 'vuelo', 45699.00, 'Buenos Aires', 'Lima', '2025-08-20 09:15:00+00', 'LATAM', true),
('VUE003', 'Córdoba - Buenos Aires', 'Vuelo doméstico Córdoba - Buenos Aires', 'vuelo', 12500.00, 'Córdoba', 'Buenos Aires', '2025-07-01 16:45:00+00', 'Aerolíneas Argentinas', true);

INSERT INTO public.productos (codigo, nombre, descripcion, tipo, precio, ubicacion, tipo_alojamiento, habitaciones, check_in, check_out, disponible) VALUES
('HOT001', 'Hotel Plaza Salta', 'Hotel 4 estrellas en el centro de Salta', 'hospedaje', 15800.00, 'Salta, Argentina', 'Hotel', 2, '15:00', '11:00', true),
('HOT002', 'Hostel Backpackers BA', 'Hostel económico en San Telmo, Buenos Aires', 'hospedaje', 4500.00, 'Buenos Aires, Argentina', 'Hostel', 1, '14:00', '10:00', true),
('HOT003', 'Resort Bariloche Premium', 'Resort de lujo frente al lago Nahuel Huapi', 'hospedaje', 28900.00, 'Bariloche, Argentina', 'Resort', 1, '16:00', '12:00', true);

INSERT INTO public.productos (codigo, nombre, descripcion, tipo, precio, modelo, marca, año, tipo_vehiculo, ubicacion_recogida, disponible) VALUES
('AUT001', 'Chevrolet Onix Automático', 'Auto compacto automático ideal para ciudad', 'auto', 8900.00, 'Onix', 'Chevrolet', 2023, 'Compacto', 'Aeropuerto Internacional Salta', true),
('AUT002', 'Toyota Corolla', 'Sedán confortable para viajes largos', 'auto', 12400.00, 'Corolla', 'Toyota', 2022, 'Sedán', 'Centro de Salta', true),
('AUT003', 'Ford EcoSport 4x4', 'SUV ideal para aventuras off-road', 'auto', 15600.00, 'EcoSport', 'Ford', 2023, 'SUV', 'Aeropuerto Internacional Salta', true);

INSERT INTO public.productos (codigo, nombre, descripcion, tipo, precio, duracion_dias, itinerario, servicios_incluidos_paquete, disponible) VALUES
('PAQ001', 'Salta y Jujuy Completo', 'Paquete completo por el Norte Argentino', 'paquete', 125000.00, 7, 'Día 1: Llegada a Salta, Día 2: City Tour Salta, Día 3: Quebrada de Humahuaca, Día 4: Salinas Grandes, Día 5: Tilcara y Purmamarca, Día 6: Cafayate, Día 7: Regreso', ARRAY['Traslados', 'Alojamiento', 'Desayunos', 'Excursiones'], true),
('PAQ002', 'Buenos Aires Express', 'Paquete de 3 días en Buenos Aires', 'paquete', 45000.00, 3, 'Día 1: City Tour, Día 2: Tigre y Delta, Día 3: Tango Show', ARRAY['Alojamiento', 'Desayunos', 'Excursiones'], true),
('PAQ003', 'Patagonia Aventura', 'Aventura completa en la Patagonia', 'paquete', 189000.00, 10, 'Recorrido por Bariloche, El Calafate y Ushuaia', ARRAY['Vuelos internos', 'Alojamiento', 'Excursiones', 'Algunas comidas'], true);

-- =====================================================
-- 11. FUNCIONES DE LIMPIEZA Y MANTENIMIENTO
-- =====================================================

-- Función para limpiar carritos abandonados
CREATE OR REPLACE FUNCTION limpiar_carritos_abandonados()
RETURNS INTEGER AS $$ -- CORREGIDO
DECLARE
    dias_limite INTEGER;
    registros_eliminados INTEGER;
BEGIN
    -- Obtener configuración de días límite
    SELECT valor::INTEGER INTO dias_limite
    FROM public.configuracion_sistema
    WHERE clave = 'dias_limpiar_carrito';
    
    IF dias_limite IS NULL THEN
        dias_limite := 7; -- Valor por defecto
    END IF;
    
    -- Eliminar carritos antiguos
    DELETE FROM public.carrito
    WHERE fecha_agregado < CURRENT_TIMESTAMP - INTERVAL '1 day' * dias_limite;
    
    GET DIAGNOSTICS registros_eliminados = ROW_COUNT;
    
    RETURN registros_eliminados;
END;
$$ LANGUAGE plpgsql; -- CORREGIDO

-- Función para actualizar estadísticas de productos
CREATE OR REPLACE FUNCTION actualizar_estadisticas_productos()
RETURNS VOID AS $$ -- CORREGIDO
BEGIN
    -- Actualizar número de reseñas y calificación promedio
    -- (Esto se implementaría cuando se agregue el sistema de reseñas)
    
    -- Por ahora, solo actualizar algunos campos calculados
    UPDATE public.productos 
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id IN (
        SELECT DISTINCT producto_id 
        FROM public.detalle_pedidos dp
        JOIN public.pedidos p ON dp.pedido_id = p.id
        WHERE p.fecha_pedido >= CURRENT_DATE - INTERVAL '1 day'
    );
END;
$$ LANGUAGE plpgsql; -- CORREGIDO

-- =====================================================
-- 12. COMENTARIOS FINALES Y NOTAS
-- =====================================================

/*
NOTAS IMPORTANTES PARA LA IMPLEMENTACIÓN:

1. CONFIGURACIÓN DE SUPABASE:
   - Asegúrate de que las políticas RLS estén habilitadas
   - Configura los hooks de autenticación para crear perfiles automáticamente
   - Configura el servicio de email en Supabase para los emails automáticos

2. SEGURIDAD:
   - Todas las tablas tienen RLS habilitado
   - Las funciones importantes usan SECURITY DEFINER
   - Los logs de actividad registran cambios importantes

3. PERFORMANCE:
   - Se han creado índices en campos frecuentemente consultados
   - Las vistas materializadas podrían implementarse para consultas complejas
   - Considera particionar las tablas de logs y emails si crecen mucho

4. FUNCIONALIDADES ADICIONALES A IMPLEMENTAR:
   - Sistema de reseñas y calificaciones
   - Integración con pasarelas de pago
   - Sistema de cupones y descuentos
   - Notificaciones push
   - Chat de soporte

5. MANTENIMIENTO:
   - Ejecutar limpiar_carritos_abandonados() periódicamente
   - Monitorear el crecimiento de la tabla logs_actividad
   - Hacer backup regular de pedidos_historicos

6. INTEGRACIÓN CON FRONTEND:
   - Usar las funciones definidas para operaciones complejas
   - Implementar paginación en las consultas de productos
   - Cachear datos de configuración en el frontend
*/

-- =====================================================
-- FIN DEL SCRIPT DE BASE DE DATOS
-- =====================================================
