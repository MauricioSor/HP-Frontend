-- ============================================
-- FinBootCamp - Schema para Supabase
-- Ejecutar en SQL Editor de Supabase Dashboard
-- ============================================

-- Tabla de usuarios del sistema
CREATE TABLE IF NOT EXISTS usuario (
  usuario VARCHAR PRIMARY KEY,
  "contraseña" VARCHAR NOT NULL,
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
  "SituacionLaboral" VARCHAR,
  "Perfil" VARCHAR,
  cuit VARCHAR,
  nacimiento TIMESTAMP WITH TIME ZONE,
  usuario VARCHAR REFERENCES usuario(usuario)
);

-- Desactivar RLS para que el anon key pueda acceder
-- (para desarrollo, activar políticas adecuadas en producción)
ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE persona ENABLE ROW LEVEL SECURITY;

-- Política permisiva para desarrollo (permite todo con anon key)
CREATE POLICY "Allow all for usuario" ON usuario
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for persona" ON persona
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- NOTA: Para crear un usuario de prueba, 
-- usar la página /admin/usuarios de la app.
-- La contraseña se hashea automáticamente con bcrypt.
-- ============================================
