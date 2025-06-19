-- Deshabilitar RLS temporalmente para evitar recursión infinita
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalle_pedidos DISABLE ROW LEVEL SECURITY;

-- Eliminar políticas problemáticas existentes
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.productos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.pedidos;

-- Crear políticas simples y seguras
CREATE POLICY "Allow all operations for authenticated users" ON public.user_profiles
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow read access to products" ON public.productos
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage orders" ON public.pedidos
    FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to manage order details" ON public.detalle_pedidos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Rehabilitar RLS con las nuevas políticas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalle_pedidos ENABLE ROW LEVEL SECURITY;
