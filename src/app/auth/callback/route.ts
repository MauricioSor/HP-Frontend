import { NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'

  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const usuario =
        typeof user?.user_metadata?.usuario === 'string' ? user.user_metadata.usuario : ''
      const email = user?.email ?? ''

      let tienePersona = false

      if (usuario) {
        const { data } = await supabase.from('persona').select('dni').eq('usuario', usuario).maybeSingle()
        tienePersona = !!data
      }

      if (!tienePersona && email) {
        const { data } = await supabase.from('persona').select('dni').eq('correo', email).maybeSingle()
        tienePersona = !!data
      }

      const destino = tienePersona ? next : '/auth/registro'
      return NextResponse.redirect(`${origin}${destino}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/registro?error=google`)
}
