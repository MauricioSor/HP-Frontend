'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, IdCard } from 'lucide-react'
import { createClient } from '@/lib/client'
import { useAuth } from '@/components/AuthProvider'
import { irA, rutaSegura } from '@/lib/navegacion'
import { Logo } from '@/components/Logo'
import { etiquetaPerfil, normalizarPerfil, perfilesInversor } from '@/lib/perfil'
import { ESTADO_ACTIVO } from '@/lib/estados-usuario'
import { personaDeUsuario } from '@/lib/persona'

const supabase = createClient()

export default function FormDatosPersonales() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [nacimiento, setNacimiento] = useState('')
  const [perfil, setPerfil] = useState('')
  const [dniFijo, setDniFijo] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [next, setNext] = useState('/')
  const [precargado, setPrecargado] = useState('')

  useEffect(() => {
    const pedido = new URLSearchParams(window.location.search).get('next') || '/'
    setNext(rutaSegura(pedido) === '/auth/datos-personales' ? '/' : rutaSegura(pedido))
  }, [])

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !user) {
      irA('/auth/login?redirect=/auth/datos-personales')
      return
    }
    if (precargado === user.usuario) return

    let activo = true

    async function precargar() {
      const fila = await personaDeUsuario(supabase, user.usuario)
      if (!activo) return

      if (fila) {
        setDni(String(fila.dni))
        setDniFijo(true)
        setNombre(fila.nombre ?? '')
        setCorreo(fila.correo || user.email || '')
        setNacimiento(fila.nacimiento ? fila.nacimiento.slice(0, 10) : '')
        setPerfil(normalizarPerfil(fila.perfil_inversor) ?? user.perfilInversor ?? '')
      } else {
        const nombreMeta =
          (typeof user.email === 'string' && user.email) || ''
        setCorreo(nombreMeta)
        setNombre('')
        setPerfil(user.perfilInversor ?? '')
      }
      setPrecargado(user.usuario)
      setCargando(false)
    }

    precargar()
    return () => {
      activo = false
    }
  }, [isLoading, isAuthenticated, user, precargado])

  async function asegurarUsuario(nombreUsuario: string) {
    const { data } = await supabase.from('usuario').select('usuario').eq('usuario', nombreUsuario).maybeSingle()
    if (data?.usuario) return null
    const { error: alta } = await supabase.from('usuario').insert({
      usuario: nombreUsuario,
      rol: 0,
      estado: ESTADO_ACTIVO,
    })
    return alta?.message ?? null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!user?.usuario) {
      setError('No hay una cuenta de usuario asociada.')
      return
    }

    const dniNumero = Number(dni)
    if (!Number.isInteger(dniNumero) || dniNumero < 1000000 || dniNumero > 99999999) {
      setError('Ingresá un DNI válido.')
      return
    }

    if (!nombre.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    setIsSubmitting(true)
    try {
      const errorUsuario = await asegurarUsuario(user.usuario)
      if (errorUsuario) {
        setError(errorUsuario)
        return
      }

      const datos = {
        nombre: nombre.trim(),
        correo: correo.trim() || user.email || null,
        nacimiento: nacimiento || null,
        perfil_inversor: normalizarPerfil(perfil),
        usuario: user.usuario,
      }

      if (dniFijo) {
        const { error: actualizacion } = await supabase.from('persona').update(datos).eq('usuario', user.usuario)
        if (actualizacion) {
          setError(actualizacion.message)
          return
        }
      } else {
        const { error: alta } = await supabase.from('persona').insert({
          dni: dniNumero,
          ...datos,
        })
        if (alta) {
          if (alta.code === '23505') {
            setError('Ese DNI ya está cargado en otra cuenta.')
          } else if (alta.code === '23503') {
            setError('La cuenta de usuario todavía no está lista. Recargá e intentá de nuevo.')
          } else {
            setError(alta.message)
          }
          return
        }
      }

      irA(next)
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || cargando) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-stone-500">
        Cargando tus datos...
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Logo size="lg" className="justify-center" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Completá tus datos</h1>
          <p className="mt-2 text-slate-500">
            Quedan los datos de persona. Van ligados a tu usuario <span className="font-semibold text-[#12372c]">{user?.usuario}</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">DNI *</label>
                <input
                  type="number"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  readOnly={dniFijo}
                  placeholder="12345678"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 read-only:bg-slate-50"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nacimiento</label>
                <input
                  type="date"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nombre completo *</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Juan Pérez"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Perfil inversor</label>
              <select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Lo completo después en el test</option>
                {perfilesInversor.map((item) => (
                  <option key={item} value={item}>
                    {etiquetaPerfil(item)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Guardando...
                </>
              ) : (
                <>
                  <IdCard className="h-5 w-5" />
                  Guardar datos
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
