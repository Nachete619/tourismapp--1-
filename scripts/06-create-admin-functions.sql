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

-- Función para crear usuario admin por defecto
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS VOID AS $$
BEGIN
  -- Insertar admin si no existe
  INSERT INTO profiles (id, email, full_name, role)
  SELECT 
    gen_random_uuid(),
    'admin@tourismapp.com',
    'Administrador',
    'admin'
  WHERE NOT EXISTS (
    SELECT 1 FROM profiles WHERE role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ejecutar creación de admin
SELECT create_admin_user();
