'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, ClipboardList, IdCard, Pencil, UserRound, X } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/client'
import { etiquetaEstado } from '@/lib/estados-usuario'
import { etiquetaRol } from '@/lib/roles'
import { etiquetaPerfil, normalizarPerfil, perfilesInversor } from '@/lib/perfil'
import {
  guardarDatosPersona,
  personaDeUsuario,
  perfilDeFilas,
  usuarioDeCuenta,
  type FilaPersona,
  type FilaUsuario,
} from '@/lib/persona'

const supabase = createClient()

const campo =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500'

function formatearFecha(valor: string | null | undefined, soloDia = false) {
  if (!valor) return 'Sin cargar'
  const partes = valor.slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (soloDia && partes) {
    return new Date(Number(partes[1]), Number(partes[2]) - 1, Number(partes[3])).toLocaleDateString(
      'es-AR',
      { day: 'numeric', month: 'long', year: 'numeric' }
    )
  }
  const fecha = new Date(valor)
  if (Number.isNaN(fecha.getTime())) return valor
  return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{etiqueta}</p>
      <p className="mt-1 text-lg font-medium text-[#12372c]">{valor}</p>
    </div>
  )
}

export default function MisDatos() {
  const { user, isAuthenticated, isLoading, refrescarUsuario } = useAuth()
  const [cuenta, setCuenta] = useState<FilaUsuario | null>(null)
  const [persona, setPersona] = useState<FilaPersona | null>(null)
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(false)
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [nacimiento, setNacimiento] = useState('')
  const [perfil, setPerfil] = useState('')
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [guardando, setGuardando] = useState(false)

  const cargar = useCallback(async (nombreUsuario: string) => {
    const [filaUsuario, filaPersona] = await Promise.all([
      usuarioDeCuenta(supabase, nombreUsuario),
      personaDeUsuario(supabase, nombreUsuario),
    ])
    setCuenta(filaUsuario)
    setPersona(filaPersona)
    return { filaUsuario, filaPersona }
  }, [])

  const hidratarFormulario = useCallback(
    (filaUsuario: FilaUsuario | null, filaPersona: FilaPersona | null) => {
      setDni(filaPersona ? String(filaPersona.dni) : '')
      setNombre(filaPersona?.nombre ?? '')
      setCorreo(filaPersona?.correo || user?.email || '')
      setNacimiento(filaPersona?.nacimiento ? filaPersona.nacimiento.slice(0, 10) : '')
      setPerfil(perfilDeFilas(filaUsuario, filaPersona) ?? '')
    },
    [user?.email]
  )

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !user?.usuario) {
      setCargando(false)
      return
    }

    let activo = true
    setCargando(true)
    cargar(user.usuario)
      .then(({ filaUsuario, filaPersona }) => {
        if (!activo) return
        hidratarFormulario(filaUsuario, filaPersona)
        if (!filaPersona) setEditando(true)
      })
      .catch(() => {
        if (!activo) return
        setError('No se pudieron leer tus datos.')
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [isLoading, isAuthenticated, user?.usuario, cargar, hidratarFormulario])

  function empezarEdicion() {
    hidratarFormulario(cuenta, persona)
    setError('')
    setExito('')
    setEditando(true)
  }

  function cancelar() {
    setError('')
    setEditando(false)
    hidratarFormulario(cuenta, persona)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setExito('')

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

    setGuardando(true)
    try {
      await guardarDatosPersona(supabase, user.usuario, {
        dni: dniNumero,
        nombre: nombre.trim(),
        correo: correo.trim() || user.email || null,
        nacimiento: nacimiento || null,
        perfil_inversor: normalizarPerfil(perfil),
      })
      const actualizado = await cargar(user.usuario)
      hidratarFormulario(actualizado.filaUsuario, actualizado.filaPersona)
      await refrescarUsuario()
      setEditando(false)
      setExito('Tus datos quedaron guardados.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron guardar los datos.')
    } finally {
      setGuardando(false)
    }
  }

  if (isLoading || cargando) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-stone-500">
        Cargando tus datos...
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <UserRound className="mx-auto h-10 w-10 text-[#12372c]" />
        <h1 className="mt-4 text-4xl font-medium text-[#12372c]">Mis datos</h1>
        <p className="mt-4 text-stone-600">Iniciá sesión para ver y editar lo que está cargado en tu cuenta.</p>
        <Link
          href="/auth/login?redirect=/mis-datos"
          className="mt-6 inline-flex rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea]"
        >
          Iniciar sesión
        </Link>
      </div>
    )
  }

  const perfilVisible = perfilDeFilas(cuenta, persona)
  const perfilPersona = normalizarPerfil(persona?.perfil_inversor)
  const vacio = (valor: string | number | null | undefined) =>
    valor === null || valor === undefined || valor === '' ? 'Sin cargar' : String(valor)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Tu cuenta</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-medium text-[#12372c]">Mis datos</h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            Lo que ves acá es lo cargado en las tablas usuario y persona. Podés completar lo que falte o cambiarlo.
          </p>
        </div>
        {!editando && (
          <button
            type="button"
            onClick={empezarEdicion}
            className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea]"
          >
            <Pencil className="h-4 w-4" />
            {persona ? 'Cambiar datos' : 'Completar datos'}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {exito && !editando && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{exito}</span>
        </div>
      )}

      {editando ? (
        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-medium text-[#12372c]">
              <UserRound className="h-5 w-5" />
              Usuario
            </h2>
            <p className="mt-1 text-sm text-stone-500">El usuario, el rol, el alta y el estado los define el sistema.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Dato etiqueta="Usuario" valor={cuenta?.usuario || user.usuario} />
              <Dato etiqueta="Rol" valor={etiquetaRol(cuenta?.rol ?? user.rol)} />
              <Dato etiqueta="Alta" valor={formatearFecha(cuenta?.alta)} />
              <Dato etiqueta="Estado" valor={etiquetaEstado(cuenta?.estado)} />
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-medium text-[#12372c]">
              <IdCard className="h-5 w-5" />
              Persona
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">DNI *</label>
                <input
                  type="number"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  placeholder="12345678"
                  className={campo}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">Nacimiento</label>
                <input
                  type="date"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  className={campo}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-stone-700">Nombre completo *</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  placeholder="Juan Pérez"
                  className={campo}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-stone-700">Correo</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@email.com"
                  className={campo}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-stone-700">Perfil inversor</label>
                <select value={perfil} onChange={(e) => setPerfil(e.target.value)} className={campo}>
                  <option value="">Sin perfil todavía</option>
                  {perfilesInversor.map((item) => (
                    <option key={item} value={item}>
                      {etiquetaPerfil(item)}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-stone-500">
                  También lo podés obtener con el{' '}
                  <Link href="/test-inversor" className="font-semibold text-emerald-800 underline">
                    test del inversor
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={guardando}
              className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-6 py-3 font-semibold text-[#f4f1ea] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
            {persona && (
              <button
                type="button"
                onClick={cancelar}
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-medium text-[#12372c]">
              <UserRound className="h-5 w-5" />
              Usuario
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Dato etiqueta="Usuario" valor={vacio(cuenta?.usuario || user.usuario)} />
              <Dato etiqueta="Rol" valor={etiquetaRol(cuenta?.rol ?? user.rol)} />
              <Dato etiqueta="Alta" valor={formatearFecha(cuenta?.alta)} />
              <Dato etiqueta="Estado" valor={etiquetaEstado(cuenta?.estado)} />
              <Dato etiqueta="Perfil inversor" valor={perfilVisible ? etiquetaPerfil(perfilVisible) : 'Sin cargar'} />
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-medium text-[#12372c]">
              <IdCard className="h-5 w-5" />
              Persona
            </h2>
            {persona ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Dato etiqueta="DNI" valor={vacio(persona.dni)} />
                <Dato etiqueta="Nacimiento" valor={formatearFecha(persona.nacimiento, true)} />
                <Dato etiqueta="Nombre" valor={vacio(persona.nombre)} />
                <Dato etiqueta="Correo" valor={vacio(persona.correo)} />
                <Dato etiqueta="Perfil inversor" valor={perfilPersona ? etiquetaPerfil(perfilPersona) : 'Sin cargar'} />
              </div>
            ) : (
              <p className="mt-4 text-stone-600">Todavía no hay una fila de persona ligada a tu usuario.</p>
            )}
          </section>

          <Link
            href="/test-inversor"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800"
          >
            <ClipboardList className="h-4 w-4" />
            Ir al test del inversor
          </Link>
        </div>
      )}
    </div>
  )
}
