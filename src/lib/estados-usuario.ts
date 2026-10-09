export const ESTADO_ACTIVO = ''
export const ESTADO_INACTIVO = 'I'

export function esUsuarioActivo(estado: string | null | undefined) {
  return estado !== ESTADO_INACTIVO
}

export function etiquetaEstado(estado: string | null | undefined) {
  return esUsuarioActivo(estado) ? 'Activo' : 'Inactivo'
}
