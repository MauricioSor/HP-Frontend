'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'
import { rutaSegura } from '@/lib/navegacion'

const supabase = createClient()

function explicarErrorGoogle(mensaje: string) {
  const texto = mensaje.toLowerCase()

  if (texto.includes('database error saving new user')) {
    return 'Google aceptó la cuenta, pero Supabase no pudo crear el usuario. En el SQL Editor hay que actualizar la función handle_new_user para que arme el nombre de usuario desde el email.'
  }

  if (texto.includes('code verifier') || texto.includes('pkce')) {
    return 'La vinculación con Google se cortó antes de guardar la sesión. Volvé a intentar.'
  }

  if (texto.includes('not enabled') || texto.includes('unsupported provider')) {
    return 'El acceso con Google no está habilitado en Supabase.'
  }

  return mensaje
}

function salirA(destino: string) {
  window.location.replace(`${window.location.origin}${rutaSegura(destino)}`)
}

export default function AuthCallbackPage() {
  const [mensaje, setMensaje] = useState('Vinculando tu cuenta de Google...')

  useEffect(() => {
    let activo = true

    async function completar() {
      const url = new URL(window.location.href)
      const hash = new URLSearchParams(url.hash.replace(/^#/, ''))
      const errorUrl = url.searchParams.get('error_description') || hash.get('error_description')

      if (errorUrl) {
        const detalle = explicarErrorGoogle(errorUrl)
        salirA(`/auth/registro?error=google&detalle=${encodeURIComponent(detalle)}`)
        return
      }

      const { error: errorInicial } = await supabase.auth.initialize()
      if (!activo) return

      if (errorInicial) {
        const detalle = explicarErrorGoogle(errorInicial.message)
        salirA(`/auth/registro?error=google&detalle=${encodeURIComponent(detalle)}`)
        return
      }

      let {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        const code = url.searchParams.get('code')
        if (!code) {
          salirA(
            `/auth/registro?error=google&detalle=${encodeURIComponent('Google no devolvió un código de acceso.')}`
          )
          return
        }

        const flowId = url.searchParams.get('sb_flow_id') || undefined
        const { data, error } = await supabase.auth.exchangeCodeForSession(code, { flowId })
        if (!activo) return

        if (error || !data.session) {
          const detalle = explicarErrorGoogle(error?.message || 'No se pudo vincular la cuenta de Google.')
          salirA(`/auth/registro?error=google&detalle=${encodeURIComponent(detalle)}`)
          return
        }

        session = data.session
      }

      const user = session.user
      const email = user.email ?? ''
      const usuario = typeof user.user_metadata?.usuario === 'string' ? user.user_metadata.usuario : ''
      let tienePersona = false

      if (usuario) {
        const { data } = await supabase.from('persona').select('dni').eq('usuario', usuario).maybeSingle()
        tienePersona = !!data
      }

      if (!tienePersona && email) {
        const { data } = await supabase.from('persona').select('dni').eq('correo', email).maybeSingle()
        tienePersona = !!data
      }

      const next = url.searchParams.get('next') || '/'
      const destinoSeguro = rutaSegura(next)
      const destino = tienePersona
        ? destinoSeguro
        : `/auth/datos-personales?next=${encodeURIComponent(destinoSeguro)}`
      setMensaje(tienePersona ? 'Entrando...' : 'Completá tus datos...')
      salirA(destino)
    }

    completar()
    return () => {
      activo = false
    }
  }, [])

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-12">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        {mensaje}
      </div>
    </div>
  )
}
