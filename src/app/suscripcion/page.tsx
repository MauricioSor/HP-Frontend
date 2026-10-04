'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/client'

const incluido = [
  'Todo el contenido: mercado, cripto, simulador y cotizaciones',
  'Sin anuncios en ninguna página',
  'El plan queda guardado en tu cuenta',
]

const libre = [
  'El mismo contenido educativo',
  'Con espacios publicitarios',
]

export default function SuscripcionPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function cambiarPlan(plan: 'premium' | 'libre') {
    setError('')
    setEnviando(true)
    const supabase = createClient()
    const { error: fallo } = await supabase.auth.updateUser({ data: { plan } })
    setEnviando(false)
    if (fallo) {
      setError('No se pudo actualizar el plan. Intentá de nuevo.')
    }
  }

  const premium = user?.premium === true

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Suscripción
        </p>
        <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">Plan Premium</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          El contenido sigue siendo el mismo. Premium saca los anuncios de toda la plataforma.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-8">
          <h2 className="text-2xl font-medium text-slate-900">Libre</h2>
          <p className="mt-2 text-3xl font-medium text-slate-900">$ 0</p>
          <ul className="mt-6 space-y-3 text-slate-600">
            {libre.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#12372c] bg-[#12372c] p-8 text-[#f4f1ea]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Sin anuncios
          </div>
          <h2 className="text-2xl font-medium">Premium</h2>
          <p className="mt-2 text-3xl font-medium">
            $ 2.900 <span className="text-base font-sans text-emerald-100">/ mes</span>
          </p>
          <ul className="mt-6 space-y-3 text-emerald-50">
            {incluido.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {isLoading ? (
              <p className="text-sm text-emerald-100">Cargando tu cuenta...</p>
            ) : !isAuthenticated ? (
              <Link
                href="/auth/login?redirect=/suscripcion"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#f4f1ea] px-5 py-3 font-semibold text-[#12372c] hover:bg-white"
              >
                Iniciar sesión para suscribirme
              </Link>
            ) : premium ? (
              <div className="space-y-3">
                <p className="rounded-lg bg-white/10 px-4 py-3 text-sm">
                  Tu cuenta ya es Premium. No vas a ver anuncios.
                </p>
                <button
                  type="button"
                  onClick={() => cambiarPlan('libre')}
                  disabled={enviando}
                  className="text-sm text-emerald-100 underline-offset-2 hover:underline disabled:opacity-60"
                >
                  Volver al plan libre
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => cambiarPlan('premium')}
                disabled={enviando}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#f4f1ea] px-5 py-3 font-semibold text-[#12372c] hover:bg-white disabled:opacity-60"
              >
                {enviando ? 'Activando...' : 'Suscribirme'}
              </button>
            )}
            {error && <p className="mt-3 text-sm text-amber-200">{error}</p>}
          </div>
        </section>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
        El botón activa el plan en tu cuenta y oculta los anuncios. Todavía no cobra la tarjeta: el medio de pago no está conectado.
      </p>
    </div>
  )
}
