-- Función para mover pedido a histórico
CREATE OR REPLACE FUNCTION move_order_to_history(order_id_param UUID)
RETURNS VOID AS $$
DECLARE
  order_record orders%ROWTYPE;
BEGIN
  -- Obtener el pedido
  SELECT * INTO order_record FROM orders WHERE id = order_id_param;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;
  
  -- Insertar en histórico
  INSERT INTO order_history (
    original_order_id, user_id, status, total, 
    delivery_date, created_at, updated_at
  ) VALUES (
    order_record.id, order_record.user_id, 'delivered', 
    order_record.total, NOW(), order_record.created_at, NOW()
  );
  
  -- Registrar en ventas
  INSERT INTO sales (
    order_id, user_id, product_type, total_amount, 
    net_amount, sale_date
  ) 
  SELECT 
    order_record.id, order_record.user_id, p.type, 
    order_record.total, order_record.total, NOW()
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  WHERE oi.order_id = order_record.id
  LIMIT 1;
  
  -- Crear notificación
  INSERT INTO notifications (
    user_id, order_id, type, title, message
  ) VALUES (
    order_record.user_id, order_record.id, 'order_delivered',
    'Pedido Entregado', 
    'Tu pedido #' || order_record.id || ' ha sido entregado exitosamente.'
  );
  
  -- Eliminar pedido original
  DELETE FROM order_items WHERE order_id = order_record.id;
  DELETE FROM orders WHERE id = order_record.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para cancelar pedido
CREATE OR REPLACE FUNCTION cancel_order(order_id_param UUID, reason TEXT DEFAULT 'Cancelled by admin')
RETURNS VOID AS $$
DECLARE
  order_record orders%ROWTYPE;
BEGIN
  -- Obtener el pedido
  SELECT * INTO order_record FROM orders WHERE id = order_id_param;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;
  
  -- Actualizar estado
  UPDATE orders SET 
    status = 'cancelled', 
    updated_at = NOW() 
  WHERE id = order_id_param;
  
  -- Crear notificación
  INSERT INTO notifications (
    user_id, order_id, type, title, message
  ) VALUES (
    order_record.user_id, order_record.id, 'order_cancelled',
    'Pedido Cancelado', 
    'Tu pedido #' || order_record.id || ' ha sido cancelado. Motivo: ' || reason
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para obtener estadísticas de ventas
CREATE OR REPLACE FUNCTION get_sales_stats(
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  client_id UUID DEFAULT NULL
)
RETURNS TABLE(
  total_sales DECIMAL,
  total_orders BIGINT,
  avg_order_value DECIMAL,
  top_product_type TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(s.total_amount), 0) as total_sales,
    COUNT(s.id) as total_orders,
    COALESCE(AVG(s.total_amount), 0) as avg_order_value,
    (
      SELECT s2.product_type 
      FROM sales s2 
      WHERE (start_date IS NULL OR s2.sale_date >= start_date)
        AND (end_date IS NULL OR s2.sale_date <= end_date)
        AND (client_id IS NULL OR s2.user_id = client_id)
      GROUP BY s2.product_type 
      ORDER BY SUM(s2.total_amount) DESC 
      LIMIT 1
    ) as top_product_type
  FROM sales s
  WHERE (start_date IS NULL OR s.sale_date >= start_date)
    AND (end_date IS NULL OR s.sale_date <= end_date)
    AND (client_id IS NULL OR s.user_id = client_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
