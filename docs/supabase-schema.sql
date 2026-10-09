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
  estado VARCHAR(1) NOT NULL DEFAULT '', -- '' activo, 'I' inactivo
  perfil_inversor VARCHAR,
  CONSTRAINT usuario_estado_check CHECK (estado IN ('', 'I'))
);

-- Tabla de datos personales asociados a un usuario
CREATE TABLE IF NOT EXISTS persona (
  dni INT PRIMARY KEY,
  nombre VARCHAR,
  apellido VARCHAR,
  correo VARCHAR,
  "perfil_inversor" VARCHAR,
  nacimiento TIMESTAMP WITH TIME ZONE,
  usuario VARCHAR UNIQUE REFERENCES usuario(usuario) ON UPDATE CASCADE ON DELETE SET NULL
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

-- Función que se ejecuta cuando se crea un usuario en auth.users.
-- Si el alta viene de Google, no hay metadata "usuario": se arma uno
-- a partir del email y se guarda también en raw_user_meta_data.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_username text;
  username text;
  suffix int := 0;
BEGIN
  base_username := NULLIF(btrim(new.raw_user_meta_data->>'usuario'), '');

  IF base_username IS NULL THEN
    base_username := NULLIF(
      regexp_replace(split_part(COALESCE(new.email, ''), '@', 1), '[^a-zA-Z0-9._]', '', 'g'),
      ''
    );
  END IF;

  IF base_username IS NULL OR base_username = '' THEN
    base_username := 'user';
  END IF;

  username := base_username;

  WHILE EXISTS (SELECT 1 FROM public.usuario WHERE usuario = username) LOOP
    suffix := suffix + 1;
    username := base_username || suffix::text;
  END LOOP;

  INSERT INTO public.usuario (usuario, rol, estado)
  VALUES (username, 0, '');

  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_usuario_alta()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.alta := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_usuario_alta ON public.usuario;
CREATE TRIGGER trg_usuario_alta
  BEFORE INSERT ON public.usuario
  FOR EACH ROW EXECUTE FUNCTION public.set_usuario_alta();

DROP POLICY IF EXISTS "Authenticated users can insert usuario" ON usuario;
CREATE POLICY "Authenticated users can insert usuario" ON usuario
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Crea la fila de usuario de la sesión si el alta de Auth no la dejó.
CREATE OR REPLACE FUNCTION public.asegurar_usuario_actual()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
  v_meta text;
  base_username text;
  username text;
  suffix int := 0;
  encontrado text;
BEGIN
  IF auth.role() IS DISTINCT FROM 'authenticated' THEN
    RAISE EXCEPTION 'tenes que estar autenticado';
  END IF;

  v_email := NULLIF(btrim(COALESCE(auth.jwt() ->> 'email', '')), '');
  v_meta := NULLIF(btrim(COALESCE(auth.jwt() -> 'user_metadata' ->> 'usuario', '')), '');

  IF v_meta IS NOT NULL THEN
    SELECT u.usuario INTO encontrado FROM public.usuario u WHERE u.usuario = v_meta;
    IF encontrado IS NOT NULL THEN
      RETURN encontrado;
    END IF;
  END IF;

  IF v_email IS NOT NULL THEN
    SELECT p.usuario INTO encontrado
    FROM public.persona p
    WHERE p.correo = v_email AND p.usuario IS NOT NULL
    LIMIT 1;
    IF encontrado IS NOT NULL THEN
      RETURN encontrado;
    END IF;

    SELECT u.usuario INTO encontrado FROM public.usuario u WHERE u.usuario = v_email;
    IF encontrado IS NOT NULL THEN
      RETURN encontrado;
    END IF;
  END IF;

  IF v_meta IS NOT NULL THEN
    base_username := v_meta;
  ELSE
    base_username := COALESCE(
      NULLIF(regexp_replace(split_part(COALESCE(v_email, ''), '@', 1), '[^a-zA-Z0-9._]', '', 'g'), ''),
      'user'
    );
    SELECT u.usuario INTO encontrado FROM public.usuario u WHERE u.usuario = base_username;
    IF encontrado IS NOT NULL THEN
      RETURN encontrado;
    END IF;
  END IF;

  username := base_username;
  WHILE EXISTS (SELECT 1 FROM public.usuario WHERE usuario = username) LOOP
    suffix := suffix + 1;
    username := base_username || suffix::text;
  END LOOP;

  INSERT INTO public.usuario (usuario, rol, estado)
  VALUES (username, 0, '');

  RETURN username;
END;
$$;

REVOKE ALL ON FUNCTION public.asegurar_usuario_actual() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.asegurar_usuario_actual() TO authenticated;

DROP POLICY IF EXISTS "Authenticated users can update usuario" ON usuario;
CREATE POLICY "Authenticated users can update usuario" ON usuario
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

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
--
-- 5. Para "Registrarse con Google":
--    Authentication > Providers > Google: habilitar y cargar Client ID/Secret.
--    Authentication > URL Configuration: agregar
--    http://localhost:3000/auth/callback
--    (y la URL de producción equivalente).
--    En Google Cloud, el redirect autorizado es el callback de Supabase:
--    https://<project-ref>.supabase.co/auth/v1/callback
-- ============================================
