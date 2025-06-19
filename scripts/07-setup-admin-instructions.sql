-- INSTRUCCIONES PARA CREAR EL PRIMER USUARIO ADMINISTRADOR
-- 
-- 1. Primero, registra un usuario normal a través de la aplicación web
--    usando el email que quieres que sea administrador (ej: admin@tourismapp.com)
--
-- 2. Luego ejecuta esta función para promoverlo a administrador:
--    SELECT promote_user_to_admin('admin@tourismapp.com');
--
-- 3. O si ya tienes el ID del usuario, puedes actualizar directamente:
--    UPDATE profiles SET role = 'admin' WHERE email = 'admin@tourismapp.com';

-- Función de utilidad para verificar usuarios existentes
CREATE OR REPLACE FUNCTION list_all_users()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  full_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    COALESCE(p.role, 'user') as role,
    p.created_at
  FROM profiles p
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Para ver todos los usuarios registrados, ejecuta:
-- SELECT * FROM list_all_users();

-- Para promover un usuario a admin después de que se registre:
-- SELECT promote_user_to_admin('email@del-usuario.com');
