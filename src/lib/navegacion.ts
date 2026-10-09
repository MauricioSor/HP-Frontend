/** Navegación completa después de crear o cerrar la sesión. */
export function irA(destino: string) {
  window.location.replace(`${window.location.origin}${rutaSegura(destino)}`)
}

export function rutaSegura(destino: string) {
  if (!destino.startsWith('/') || destino.startsWith('//')) {
    return '/'
  }

  return destino
}
