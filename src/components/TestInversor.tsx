'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, RotateCcw } from 'lucide-react'
import { preguntasTest, perfilDesdePuntaje } from '@/data/test-inversor'
import { descripcionPerfil, etiquetaPerfil, type PerfilInversor } from '@/lib/perfil'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/client'

export default function TestInversor() {
  const { user, isAuthenticated, refrescarUsuario } = useAuth()
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [perfil, setPerfil] = useState<PerfilInversor | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState('')

  const pregunta = preguntasTest[paso]
  const lista = paso < preguntasTest.length

  function elegir(puntos: number) {
    const nuevas = [...respuestas.slice(0, paso), puntos]
    setRespuestas(nuevas)
    if (paso + 1 >= preguntasTest.length) {
      const total = nuevas.reduce((suma, valor) => suma + valor, 0)
      setPerfil(perfilDesdePuntaje(total))
      setPaso(preguntasTest.length)
      return
    }
    setPaso(paso + 1)
  }

  function reiniciar() {
    setPaso(0)
    setRespuestas([])
    setPerfil(null)
    setGuardado(false)
    setError('')
  }

  async function guardar() {
    if (!perfil || !user?.usuario) return
    setError('')
    setGuardando(true)
    const supabase = createClient()
    const { error: fallaUsuario } = await supabase
      .from('usuario')
      .update({ perfil_inversor: perfil })
      .eq('usuario', user.usuario)

    if (fallaUsuario) {
      setError('No se pudo guardar el perfil. Probá de nuevo.')
      setGuardando(false)
      return
    }

    await supabase.from('persona').update({ perfil_inversor: perfil }).eq('usuario', user.usuario)
    await refrescarUsuario()
    setGuardado(true)
    setGuardando(false)
  }

  const progreso = Math.min(paso, preguntasTest.length) / preguntasTest.length

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Test del inversor</p>
      <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">¿Cuál es tu perfil?</h1>
      <p className="mt-4 text-lg text-stone-600">
        Seis preguntas. Sin trampa: el resultado se guarda en tu cuenta y arma las recomendaciones.
      </p>

      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-[#12372c] transition-all duration-500"
          style={{ width: `${progreso * 100}%` }}
        />
      </div>

      {lista && pregunta && (
        <section className="mt-10">
          <p className="text-sm font-semibold text-stone-500">
            Pregunta {paso + 1} de {preguntasTest.length}
          </p>
          <h2 className="mt-2 text-3xl font-medium text-[#12372c]">{pregunta.titulo}</h2>
          <p className="mt-3 text-stone-600">{pregunta.detalle}</p>
          <div className="mt-8 grid gap-3">
            {pregunta.opciones.map((opcion) => (
              <button
                key={opcion.texto}
                type="button"
                onClick={() => elegir(opcion.puntos)}
                className="rounded-[1.4rem] border border-stone-200 bg-white px-5 py-4 text-left text-lg text-[#12372c] transition hover:border-[#12372c] hover:bg-[#12372c] hover:text-[#f4f1ea]"
              >
                {opcion.texto}
              </button>
            ))}
          </div>
          {paso > 0 && (
            <button
              type="button"
              onClick={() => setPaso(paso - 1)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-[#12372c]"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </button>
          )}
        </section>
      )}

      {!lista && perfil && (
        <section className="mt-10 rounded-[1.8rem] border border-stone-200 bg-white p-8 shadow-[0_24px_60px_-40px_rgba(18,55,44,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800">Tu perfil</p>
          <h2 className="mt-2 text-4xl font-medium text-[#12372c]">{etiquetaPerfil(perfil)}</h2>
          <p className="mt-4 text-lg text-stone-600">{descripcionPerfil(perfil)}</p>

          {!isAuthenticated && (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Iniciá sesión para guardar el perfil y ver recomendaciones armadas para vos.{' '}
              <Link href="/auth/login?redirect=/test-inversor" className="font-semibold underline">
                Ir al login
              </Link>
            </p>
          )}

          {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={guardar}
                disabled={guardando || guardado}
                className="inline-flex items-center gap-2 rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea] disabled:opacity-60"
              >
                {guardado ? <CheckCircle2 className="h-4 w-4" /> : null}
                {guardado ? 'Perfil guardado' : guardando ? 'Guardando...' : 'Guardar en mi cuenta'}
              </button>
            )}
            <Link
              href="/recomendado"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 font-semibold text-[#12372c]"
            >
              <Compass className="h-4 w-4" />
              Ver recomendados
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={reiniciar}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-stone-500"
            >
              <RotateCcw className="h-4 w-4" />
              Repetir test
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
