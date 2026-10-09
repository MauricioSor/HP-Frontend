type Meta = Record<string, unknown>

function texto(meta: Meta | undefined, clave: string) {
  const valor = meta?.[clave]
  return typeof valor === 'string' ? valor.trim() : ''
}

export function nombreApellidoDesdeAuth(user: {
  user_metadata?: Meta
  identities?: { identity_data?: Meta }[] | null
} | null) {
  const fuentes: Meta[] = []
  if (user?.user_metadata) fuentes.push(user.user_metadata)
  for (const identidad of user?.identities ?? []) {
    if (identidad.identity_data) fuentes.push(identidad.identity_data)
  }

  let nombre = ''
  let apellido = ''
  let completo = ''

  for (const fuente of fuentes) {
    if (!nombre) nombre = texto(fuente, 'given_name') || texto(fuente, 'first_name')
    if (!apellido) apellido = texto(fuente, 'family_name') || texto(fuente, 'last_name')
    if (!completo) completo = texto(fuente, 'full_name') || texto(fuente, 'name')
  }

  if (completo) {
    const partes = completo.split(/\s+/).filter(Boolean)
    if (!nombre && partes[0]) nombre = partes[0]
    if (!apellido && partes.length > 1) apellido = partes.slice(1).join(' ')
  }

  return { nombre, apellido }
}

export function vieneDeGoogle(user: {
  identities?: { provider?: string }[] | null
  app_metadata?: { provider?: string }
} | null) {
  if (!user) return false
  if (user.app_metadata?.provider === 'google') return true
  return (user.identities ?? []).some((identidad) => identidad.provider === 'google')
}
