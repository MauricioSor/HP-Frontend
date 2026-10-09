export type PerfilInversor = 'conservador' | 'moderado' | 'agresivo'

export const perfilesInversor: PerfilInversor[] = ['conservador', 'moderado', 'agresivo']

export function normalizarPerfil(valor: string | null | undefined): PerfilInversor | null {
  if (!valor) return null
  const clave = valor.trim().toLowerCase()
  if (clave.includes('agres')) return 'agresivo'
  if (clave.includes('moder')) return 'moderado'
  if (clave.includes('conserv')) return 'conservador'
  return null
}

export function etiquetaPerfil(perfil: PerfilInversor) {
  if (perfil === 'conservador') return 'Conservador'
  if (perfil === 'moderado') return 'Moderado'
  return 'Agresivo'
}

export function descripcionPerfil(perfil: PerfilInversor) {
  if (perfil === 'conservador') {
    return 'Priorizás preservar capital y liquidez. Te calzan letras, fondos money market y cauciones.'
  }
  if (perfil === 'moderado') {
    return 'Buscás crecer sin irte al extremo. Mezcla de renta fija soberana, ETFs y algo de renta variable.'
  }
  return 'Aceptás volatilidad a cambio de más potencial. Acciones, CEDEARs y cripto entran en tu mapa.'
}

export const recomendadosPorPerfil: Record<PerfilInversor, { bursatil: string[]; cripto: string[] }> = {
  conservador: {
    bursatil: ['lecaps', 'fci', 'cauciones-bursatiles', 'licitaciones-publicas'],
    cripto: [],
  },
  moderado: {
    bursatil: ['bonos-soberanos', 'lecaps', 'etfs', 'cedears', 'fci'],
    cripto: ['principales-criptos'],
  },
  agresivo: {
    bursatil: ['acciones-argentinas', 'cedears', 'etfs', 'bonos-soberanos'],
    cripto: ['principales-criptos', 'fundamentos-bitcoin', 'memecoins'],
  },
}
