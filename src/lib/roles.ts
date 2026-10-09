export const ROL_ADMINISTRADOR = 1

export function esRolAdministrador(rol: number | null | undefined) {
  return rol === ROL_ADMINISTRADOR
}

export function etiquetaRol(rol: number | null | undefined) {
  if (rol === 1) return 'Administrador'
  if (rol === 2) return 'Moderador'
  return 'Usuario'
}
