'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { slidesCarrusel } from '@/data/carrusel-inicio'
import { cn } from '@/lib/utils'

const riesgoEstilo = {
  bajo: 'bg-emerald-300/15 text-emerald-200',
  medio: 'bg-amber-300/15 text-amber-100',
  alto: 'bg-rose-300/15 text-rose-100',
}

export default function CarruselInstrumentos() {
  const [activo, setActivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const total = slidesCarrusel.length
  const slide = slidesCarrusel[activo]

  useEffect(() => {
    if (pausado) return
    const id = window.setInterval(() => {
      setActivo((actual) => (actual + 1) % total)
    }, 5200)
    return () => window.clearInterval(id)
  }, [pausado, total])

  function irA(indice: number) {
    setActivo((indice + total) % total)
  }

  return (
    <section
      className="relative overflow-hidden bg-[#12372c] py-16 text-[#f4f1ea] sm:py-20"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(212,175,106,0.18),transparent_42%),radial-gradient(circle_at_88%_85%,rgba(110,231,183,0.12),transparent_38%)]" />
      <div className="grain-overlay" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              El mercado, en movimiento
            </p>
            <h2 className="max-w-xl text-3xl font-medium sm:text-5xl">
              Bonos, letras, acciones y el mundo
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-emerald-50/70">
            Cuatro puertas de entrada al mercado argentino. El carrusel recorre solo; pausalo al pasar el mouse.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-0 bg-[linear-gradient(155deg,#0c241c_0%,#164536_46%,#1f5a45_100%)]" />
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#d4af6a]/18 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-emerald-300/12 blur-3xl" />

          <svg
            key={slide.slug}
            className="pointer-events-none absolute bottom-8 left-6 hidden h-36 w-[46%] opacity-40 lg:block"
            viewBox="0 0 240 64"
            fill="none"
            aria-hidden
          >
            <path d={slide.spark} stroke="#d4af6a" strokeWidth="2.2" strokeLinecap="round" />
            <path d={`${slide.spark} L236 64 L4 64 Z`} fill="url(#fill-spark-activo)" opacity="0.28" />
            <defs>
              <linearGradient id="fill-spark-activo" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#d4af6a" />
                <stop offset="1" stopColor="#d4af6a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
                    {slide.categoria}
                  </span>
                  <span className={cn('rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]', riesgoEstilo[slide.riesgo])}>
                    Riesgo {slide.riesgo}
                  </span>
                </div>
                <h3
                  key={`${slide.slug}-titulo`}
                  className="animate-fade-up text-4xl font-medium tracking-tight sm:text-6xl"
                >
                  {slide.titulo}
                </h3>
                <p
                  key={`${slide.slug}-bajada`}
                  className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-emerald-50/80 sm:text-xl"
                >
                  {slide.bajada}
                </p>
              </div>

              <div className="mt-10">
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-emerald-200/50">Tickers de referencia</p>
                <div className="flex flex-wrap gap-2">
                  {slide.tickers.map((ticker) => (
                    <span
                      key={ticker}
                      className="rounded-full border border-[#d4af6a]/30 bg-[#d4af6a]/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-[#f3e2b8]"
                    >
                      {ticker}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/mercado-bursatil/${slide.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-6 py-3 text-sm font-semibold text-[#12372c] transition hover:bg-white"
                  >
                    Ver ficha
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="text-sm text-emerald-100/55">Horizonte {slide.horizonte}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 self-end">
              {slidesCarrusel.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => irA(index)}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition duration-300',
                    index === activo
                      ? 'border-[#d4af6a]/50 bg-[#d4af6a]/12 shadow-[inset_0_0_0_1px_rgba(212,175,106,0.15)]'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/55">{item.categoria.split('·')[0]}</p>
                  <p className="mt-1 font-heading text-lg text-[#f4f1ea]">{item.titulo}</p>
                  <p className="mt-1 text-[11px] tracking-[0.12em] text-[#f3e2b8]/70">{item.tickers.slice(0, 3).join(' · ')}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slidesCarrusel.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => irA(index)}
                aria-label={`Ir a ${item.titulo}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  index === activo ? 'w-10 bg-[#d4af6a]' : 'w-3 bg-white/25 hover:bg-white/50'
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => irA(activo - 1)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => irA(activo + 1)}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
