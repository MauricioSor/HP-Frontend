'use client'

import { useEffect, useState } from 'react'
import { irA } from '@/lib/navegacion'
import { createClient } from '@/lib/client'
import { GoogleAuthButton } from '@/components/GoogleAuthButton'
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { ESTADO_ACTIVO } from '@/lib/estados-usuario'
import { personaDeUsuario } from '@/lib/persona'

const supabase = createClient()

function sugerirUsuario(email: string) {
  return email.split('@')[0]?.replace(/[^a-zA-Z0-9._]/g, '') || ''
}

export default function RegistroPage() {
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)

  useEffect(() => {
    let activo = true

    async function redirigirSiYaHayCuenta() {
      const params = new URLSearchParams(window.location.search)
      if (params.get('error') === 'google') {
        setError(params.get('detalle') || 'No se pudo vincular la cuenta de Google. Intentá de nuevo.')
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!activo) return

      if (!user) {
        setCargandoSesion(false)
        return
      }

      const usuarioSesion =
        (typeof user.user_metadata?.usuario === 'string' && user.user_metadata.usuario) ||
        sugerirUsuario(user.email ?? '')
      const persona = await personaDeUsuario(supabase, usuarioSesion)
      irA(persona ? '/' : '/auth/datos-personales')
    }

    redirigirSiYaHayCuenta()
    return () => {
      activo = false
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!usuario.trim()) {
      setError('El nombre de usuario es obligatorio')
      return
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsSubmitting(true)

    try {
      const { data: existingUser } = await supabase
        .from('usuario')
        .select('usuario')
        .eq('usuario', usuario.trim())
        .maybeSingle()

      if (existingUser) {
        setError('Ese nombre de usuario ya está en uso')
        setIsSubmitting(false)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: contraseña,
        options: {
          data: {
            usuario: usuario.trim(),
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Este email ya está registrado. ¿Querés iniciar sesión?')
        } else {
          setError(signUpError.message)
        }
        setIsSubmitting(false)
        return
      }

      if (!data.session) {
        setSuccess('¡Cuenta creada! Revisá tu email y confirmá tu cuenta. Después completás tus datos personales.')
        setIsSubmitting(false)
        return
      }

      const { data: filaUsuario } = await supabase
        .from('usuario')
        .select('usuario')
        .eq('usuario', usuario.trim())
        .maybeSingle()

      if (!filaUsuario) {
        await supabase.from('usuario').insert({
          usuario: usuario.trim(),
          rol: 0,
          estado: ESTADO_ACTIVO,
        })
      }

      irA('/auth/datos-personales')
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Logo size="lg" className="justify-center" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Crear Cuenta</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          {cargandoSesion ? (
            <div className="flex items-center justify-center gap-3 py-10 text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              Cargando...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <GoogleAuthButton next="/" label="Registrarse con Google" />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-slate-400">o completá el formulario</span>
                </div>
              </div>

              <div>
                <label htmlFor="usuario" className="mb-1 block text-sm font-medium text-slate-700">
                  Nombre de usuario *
                </label>
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="ej: juan.perez"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contraseña" className="mb-1 block text-sm font-medium text-slate-700">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      id="contraseña"
                      type={showPassword ? 'text' : 'password'}
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmar" className="mb-1 block text-sm font-medium text-slate-700">
                    Confirmar *
                  </label>
                  <input
                    id="confirmar"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    placeholder="Repetir contraseña"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    Crear cuenta y continuar
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 space-y-2 text-center">
          <p className="text-sm text-slate-500">
            ¿Ya tenés cuenta?{' '}
            <Link href="/auth/login" className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700">
              Iniciar Sesión
            </Link>
          </p>
          <Link href="/" className="block text-sm text-slate-400 transition-colors hover:text-emerald-600">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
