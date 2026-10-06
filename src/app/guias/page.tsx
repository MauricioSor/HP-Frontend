import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import AdBanner from '@/components/AdBanner'
import { guias } from '@/data/guias'

export const metadata: Metadata = {
  title: 'Guías de ayuda | FinBootcamp',
  description:
    'Blog de ayuda sobre el mercado argentino: bonos soberanos, cupones, amortizaciones e impuestos.',
}

function formatearFecha(fecha: string) {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function GuiasPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      <header className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Blog de ayuda
        </p>
        <h1 className="text-4xl font-medium text-[#12372c] sm:text-5xl">Guías para invertir con criterio</h1>
        <p className="mt-4 text-lg text-slate-600">
          Explicamos instrumentos reales del mercado argentino: cómo pagan, qué mirar antes de comprar
          y qué impuestos aplican — o no aplican — a cada cobro.
        </p>
      </header>

      <AdBanner slot="guias-horizontal" format="horizontal" className="mb-10" />

      <div className="grid gap-6">
        {guias.map((guia) => (
          <article
            key={guia.slug}
            className="rounded-[1.6rem] border border-stone-200/80 bg-white/85 p-6 shadow-[0_20px_50px_-38px_rgba(18,55,44,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-34px_rgba(18,55,44,0.5)] sm:p-8"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {guia.etiquetas.map((etiqueta) => (
                <span
                  key={etiqueta}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                >
                  {etiqueta}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-medium text-[#12372c] sm:text-3xl">
              <Link href={`/guias/${guia.slug}`} className="hover:text-emerald-800">
                {guia.titulo}
              </Link>
            </h2>
            <p className="mt-3 text-slate-600">{guia.resumen}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{formatearFecha(guia.fecha)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {guia.lecturaMinutos} min de lectura
              </span>
            </div>
            <Link
              href={`/guias/${guia.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Leer la guía
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>

      <aside className="mt-12 flex gap-4 rounded-2xl border border-stone-200 bg-[#12372c] p-6 text-[#f4f1ea] sm:p-8">
        <BookOpen className="mt-1 h-7 w-7 shrink-0 text-emerald-300" />
        <div>
          <h2 className="text-xl font-medium">¿Qué vas a encontrar acá?</h2>
          <p className="mt-2 text-emerald-50/90">
            Material educativo, no una recomendación de compra. Los ejemplos usan los tickers más
            operados en BYMA y el tratamiento impositivo vigente para personas humanas residentes.
            Siempre contrastá con el prospecto y con un contador.
          </p>
        </div>
      </aside>
    </div>
  )
}
