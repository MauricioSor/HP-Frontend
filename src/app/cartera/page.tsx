'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Briefcase, Loader2, Star } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/client'
import { listarFavoritos, toggleFavorito, type FavoritoGuardado } from '@/lib/cartera'
import { itemCatalogo, tickersPorSlug } from '@/lib/catalogo'
import BotonFavorito from '@/components/BotonFavorito'
import { LogoItem } from '@/components/LogoItem'

export default function CarteraPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [favoritos, setFavoritos] = useState<FavoritoGuardado[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    if (!user?.usuario) {
      setFavoritos([])
      setCargando(false)
      return
    }
    setCargando(true)
    try {
      const supabase = createClient()
      const lista = await listarFavoritos(supabase, user.usuario)
      setFavoritos(lista)
      setError('')
    } catch {
      setError('No se pudo leer la cartera.')
    } finally {
      setCargando(false)
    }
  }, [user?.usuario])

  useEffect(() => {
    if (isLoading) return
    cargar()
  }, [isLoading, cargar])

  const items = useMemo(
    () =>
      favoritos
        .map((fav) => ({ fav, item: itemCatalogo(fav.slug, fav.tipo) }))
        .filter((fila): fila is { fav: FavoritoGuardado; item: NonNullable<ReturnType<typeof itemCatalogo>> } => !!fila.item),
    [favoritos]
  )

  const tickers = useMemo(() => {
    const vistos = new Set<string>()
    return items.flatMap(({ item }) => tickersPorSlug[item.slug] ?? []).filter((ticker) => {
      if (vistos.has(ticker.proName)) return false
      vistos.add(ticker.proName)
      return true
    })
  }, [items])

  const riesgos = items.reduce(
    (acc, { item }) => {
      const clave = item.risk.includes('alto') ? 'alto' : item.risk.includes('bajo') ? 'bajo' : 'medio'
      acc[clave] += 1
      return acc
    },
    { bajo: 0, medio: 0, alto: 0 }
  )

  async function sacar(slug: string, tipo: 'bursatil' | 'cripto', riesgo: string) {
    if (!user?.usuario) return
    const supabase = createClient()
    await toggleFavorito(supabase, user.usuario, { slug, tipo, riesgo })
    cargar()
  }

  if (isLoading || cargando) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-stone-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando cartera...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl font-medium text-[#12372c]">Cartera</h1>
        <p className="mt-4 text-stone-600">Iniciá sesión para marcar favoritos y verlos acá.</p>
        <Link href="/auth/login?redirect=/cartera" className="mt-6 inline-flex rounded-full bg-[#12372c] px-5 py-2.5 font-semibold text-[#f4f1ea]">
          Iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-800">Tus favoritos</p>
      <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">Cartera</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-600">
        Instrumentos que marcaste con estrella. No es una cuenta comitente: es tu tablero de estudio.
      </p>

      {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.4rem] border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Instrumentos</p>
          <p className="mt-2 font-heading text-4xl text-[#12372c]">{items.length}</p>
        </div>
        <div className="rounded-[1.4rem] border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Riesgo</p>
          <p className="mt-2 text-sm text-stone-700">
            {riesgos.bajo} bajo · {riesgos.medio} medio · {riesgos.alto} alto
          </p>
        </div>
        <div className="rounded-[1.4rem] border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Tickers ligados</p>
          <p className="mt-2 font-heading text-4xl text-[#12372c]">{tickers.length}</p>
        </div>
      </div>

      {tickers.length > 0 && (
        <section className="mt-8 rounded-[1.6rem] border border-stone-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-medium text-[#12372c]">Dashboard de cotizaciones</h2>
          <div className="flex flex-wrap gap-2">
            {tickers.map((ticker) => (
              <span
                key={ticker.proName}
                className="rounded-full border border-[#d4af6a]/40 bg-[#d4af6a]/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#8a6a28]"
              >
                {ticker.title}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Cotizan en BYMA / el mercado de origen.{' '}
            <Link href="/cotizaciones" className="font-semibold text-emerald-800">
              Ver pizarra completa
            </Link>
          </p>
        </section>
      )}

      {items.length === 0 ? (
        <div className="mt-12 rounded-[1.6rem] border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-stone-400" />
          <p className="mt-4 text-stone-600">Todavía no hay favoritos.</p>
          <Link href="/mercado-bursatil" className="mt-4 inline-flex items-center gap-2 font-semibold text-emerald-800">
            <Star className="h-4 w-4" />
            Ir al mercado y marcar instrumentos
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map(({ item }) => (
            <article key={`${item.tipo}-${item.slug}`} className="flex flex-col rounded-[1.6rem] border border-stone-200 bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <LogoItem slug={item.slug} tipo={item.tipo} className="h-14 w-14" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">{item.tipo}</p>
                    <h2 className="mt-1 text-2xl font-medium leading-tight text-[#12372c]">{item.name}</h2>
                  </div>
                </div>
                <BotonFavorito slug={item.slug} tipo={item.tipo} riesgo={item.risk} compacto />
              </div>
              <p className="mt-3 flex-1 text-sm text-stone-600">{item.shortDescription}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-stone-700">Riesgo {item.risk}</span>
                <div className="flex gap-3">
                  <Link href={item.href} className="font-semibold text-emerald-800">
                    Ver ficha
                  </Link>
                  <button
                    type="button"
                    onClick={() => sacar(item.slug, item.tipo, item.risk)}
                    className="text-stone-400 hover:text-rose-700"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
