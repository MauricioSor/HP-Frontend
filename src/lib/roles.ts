export const ROL_ADMINISTRADOR = 1

export function esRolAdministrador(rol: number | null | undefined) {
  return rol === ROL_ADMINISTRADOR
}
