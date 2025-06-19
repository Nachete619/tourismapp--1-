-- Función para mover pedido a histórico
CREATE OR REPLACE FUNCTION move_order_to_history(order_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  order_record orders%ROWTYPE;
BEGIN
  -- Obtener el pedido
  SELECT * INTO order_record FROM orders WHERE id = order_id_param;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Insertar en histórico
  INSERT INTO order_history (
    original_order_id, user_id, status, total, items, 
    shipping_address, notes, created_at
  ) VALUES (
    order_record.id, order_record.user_id, 'delivered', 
    order_record.total, order_record.items,
    order_record.shipping_address, order_record.notes, 
    order_record.created_at
  );
  
  -- Registrar venta
  INSERT INTO sales (
    order_id, user_id, product_type, total_amount, 
    net_amount, sale_date
  ) VALUES (
    order_record.id, order_record.user_id, 'general',
    order_record.total, order_record.total, NOW()
  );
  
  -- Crear notificación
  INSERT INTO notifications (
    user_id, order_id, type, title, message
  ) VALUES (
    order_record.user_id, order_record.id, 'order_delivered',
    'Pedido Entregado', 
    'Tu pedido #' || order_record.id || ' ha sido entregado exitosamente.'
  );
  
  -- Eliminar pedido original
  DELETE FROM orders WHERE id = order_id_param;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para cancelar pedido
CREATE OR REPLACE FUNCTION cancel_order(order_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  order_record orders%ROWTYPE;
BEGIN
  -- Obtener el pedido
  SELECT * INTO order_record FROM orders WHERE id = order_id_param;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Solo se pueden cancelar pedidos pendientes
  IF order_record.status != 'pending' THEN
    RETURN FALSE;
  END IF;
  
  -- Crear notificación
  INSERT INTO notifications (
    user_id, order_id, type, title, message
  ) VALUES (
    order_record.user_id, order_record.id, 'order_cancelled',
    'Pedido Cancelado', 
    'Tu pedido #' || order_record.id || ' ha sido cancelado.'
  );
  
  -- Eliminar pedido
  DELETE FROM orders WHERE id = order_id_param;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas de ventas
CREATE OR REPLACE FUNCTION get_sales_stats(
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  user_id_param UUID DEFAULT NULL
)
RETURNS TABLE(
  total_sales DECIMAL,
  total_orders BIGINT,
  avg_order_value DECIMAL,
  period_start DATE,
  period_end DATE
) AS $$
BEGIN
  -- Establecer fechas por defecto si no se proporcionan
  IF start_date IS NULL THEN
    start_date := CURRENT_DATE - INTERVAL '30 days';
  END IF;
  
  IF end_date IS NULL THEN
    end_date := CURRENT_DATE;
  END IF;
  
  RETURN QUERY
  SELECT 
    COALESCE(SUM(s.total_amount), 0) as total_sales,
    COUNT(s.id) as total_orders,
    COALESCE(AVG(s.total_amount), 0) as avg_order_value,
    start_date as period_start,
    end_date as period_end
  FROM sales s
  WHERE 
    s.sale_date::DATE BETWEEN start_date AND end_date
    AND (user_id_param IS NULL OR s.user_id = user_id_param);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para promover un usuario existente a admin
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_id_found UUID;
BEGIN
  -- Buscar el usuario por email
  SELECT au.id INTO user_id_found 
  FROM auth.users au 
  WHERE au.email = user_email;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Actualizar o insertar el perfil como admin
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (user_id_found, user_email, 'Administrador', 'admin')
  ON CONFLICT (id) 
  DO UPDATE SET role = 'admin', updated_at = NOW();
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener pedidos con información del usuario
CREATE OR REPLACE FUNCTION get_orders_with_user_info()
RETURNS TABLE(
  order_id UUID,
  user_email TEXT,
  user_name TEXT,
  status TEXT,
  total DECIMAL,
  items JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id as order_id,
    p.email as user_email,
    COALESCE(p.full_name, 'Usuario') as user_name,
    o.status,
    o.total,
    o.items,
    o.created_at,
    o.updated_at
  FROM orders o
  LEFT JOIN profiles p ON o.user_id = p.id
  ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener historial de pedidos con información del usuario
CREATE OR REPLACE FUNCTION get_order_history_with_user_info()
RETURNS TABLE(
  order_id UUID,
  original_order_id UUID,
  user_email TEXT,
  user_name TEXT,
  status TEXT,
  total DECIMAL,
  items JSONB,
  delivered_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    oh.id as order_id,
    oh.original_order_id,
    p.email as user_email,
    COALESCE(p.full_name, 'Usuario') as user_name,
    oh.status,
    oh.total,
    oh.items,
    oh.delivered_at
  FROM order_history oh
  LEFT JOIN profiles p ON oh.user_id = p.id
  ORDER BY oh.delivered_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
