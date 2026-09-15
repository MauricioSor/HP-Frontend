-- ============================================
-- FinBootCamp - Schema para Supabase
-- Ejecutar en SQL Editor de Supabase Dashboard
-- ============================================

-- ============================================
-- PASO 1: Crear las tablas
-- ============================================

-- Tabla de usuarios del sistema (sin contraseña, la maneja Supabase Auth)
CREATE TABLE IF NOT EXISTS usuario (
  usuario VARCHAR PRIMARY KEY,
  rol INT NOT NULL DEFAULT 0,
  alta TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  estado SMALLINT NOT NULL DEFAULT 1
);

-- Tabla de datos personales asociados a un usuario
CREATE TABLE IF NOT EXISTS persona (
  dni INT PRIMARY KEY,
  nombre VARCHAR,
  correo VARCHAR,
  direccion VARCHAR,
  "situacion_laboral" VARCHAR,
  "perfil_inversor" VARCHAR,
  cuit VARCHAR,
  nacimiento TIMESTAMP WITH TIME ZONE,
  usuario VARCHAR REFERENCES usuario(usuario)
);

-- ============================================
-- PASO 2: Configurar RLS (Row Level Security)
-- ============================================

ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona ENABLE ROW LEVEL SECURITY;

-- Política: cualquier usuario autenticado puede leer
CREATE POLICY "Authenticated users can read usuario" ON usuario
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política: cualquier usuario autenticado puede leer personas
CREATE POLICY "Authenticated users can read persona" ON persona
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política: permitir insertar persona (para el registro)
CREATE POLICY "Authenticated users can insert persona" ON persona
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: permitir insertar usuario (para el trigger, usa SECURITY DEFINER)
-- El trigger corre con permisos elevados, no necesita política extra.
-- Pero si queremos que el anon key pueda leer (para verificar si un username existe antes de registrarse):
CREATE POLICY "Anyone can check if usuario exists" ON usuario
  FOR SELECT USING (true);

-- ============================================
-- PASO 3: Trigger para crear fila en `usuario`
--         automáticamente al registrarse
-- ============================================

-- Función que se ejecuta cuando se crea un usuario en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuario (usuario, rol, estado)
  VALUES (
    new.raw_user_meta_data->>'usuario',  -- Toma el nombre de usuario de la metadata
    0,                                    -- Rol: usuario normal
    1                                     -- Estado: activo
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que escucha inserciones en auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- NOTAS IMPORTANTES
-- ============================================
-- 
-- 1. La contraseña la maneja Supabase Auth internamente 
--    (esquema auth.users, no accesible desde el frontend).
--
-- 2. El trigger handle_new_user() se ejecuta automáticamente
--    cada vez que alguien se registra via supabase.auth.signUp().
--    Crea la fila en public.usuario con el nombre de usuario
--    que se pasó como metadata.
--
-- 3. CONFIGURACIÓN RECOMENDADA en Supabase Dashboard:
--    Authentication > Settings > Email Auth:
--    - "Enable email confirmations" → DESACTIVAR 
--      (para desarrollo/demo, así no hay que confirmar email)
--    - "Minimum password length" → 6
--
-- 4. El login se hace con EMAIL + CONTRASEÑA (no con el campo usuario).
--    El campo "usuario" es solo un nombre de display/identificador en la app.
-- ============================================
