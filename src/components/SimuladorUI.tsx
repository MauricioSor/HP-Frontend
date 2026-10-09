'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export const inputClass =
  'w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[#12372c] font-semibold tabular-nums shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-[#12372c]/40 focus:ring-4 focus:ring-[#12372c]/10'

export const tarjetaClass =
  'rounded-[1.6rem] bg-white/85 shadow-[0_22px_50px_-38px_rgba(18,55,44,0.55)] ring-1 ring-stone-200/70 backdrop-blur-sm'

export const tooltipStyle = {
  backgroundColor: '#12372c',
  border: 'none',
  borderRadius: '12px',
  color: '#f4f1ea',
  boxShadow: '0 12px 30px -12px rgba(18,55,44,0.6)',
}

/** Campo con etiqueta y ayuda plegable (la ayuda no ocupa lugar hasta que se pide). */
export function Campo({
  etiqueta,
  ayuda,
  valor,
  children,
}: {
  etiqueta: string
  ayuda?: string
  /** Valor destacado a la derecha de la etiqueta (por ejemplo, el plazo elegido). */
  valor?: ReactNode
  children: ReactNode
}) {
  const [abierta, setAbierta] = useState(false)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
          {etiqueta}
          {ayuda && (
            <button
              type="button"
              onClick={() => setAbierta(!abierta)}
              aria-expanded={abierta}
              aria-label={`Ayuda: ${etiqueta}`}
              className={cn(
                'grid h-5 w-5 place-items-center rounded-full transition',
                abierta ? 'bg-[#12372c] text-[#f4f1ea]' : 'text-stone-400 hover:bg-stone-100 hover:text-[#12372c]'
              )}
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          )}
        </span>
        {valor && <span className="text-sm font-bold text-[#12372c]">{valor}</span>}
      </div>
      {children}
      {ayuda && abierta && (
        <p className="mt-2 rounded-xl bg-[#12372c]/[0.05] px-3 py-2 text-xs leading-relaxed text-stone-600">{ayuda}</p>
      )}
    </div>
  )
}

/** Control segmentado tipo píldora. */
export function Segmentado<T extends string | number>({
  opciones,
  valor,
  onChange,
  className,
}: {
  opciones: { valor: T; etiqueta: string }[]
  valor: T
  onChange: (valor: T) => void
  className?: string
}) {
  return (
    <div className={cn('flex rounded-xl bg-[#12372c]/[0.06] p-1 ring-1 ring-[#12372c]/10', className)}>
      {opciones.map((opcion) => (
        <button
          key={String(opcion.valor)}
          type="button"
          onClick={() => onChange(opcion.valor)}
          className={cn(
            'flex-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition',
            valor === opcion.valor
              ? 'bg-white text-[#12372c] shadow-sm'
              : 'text-stone-500 hover:text-[#12372c]'
          )}
        >
          {opcion.etiqueta}
        </button>
      ))}
    </div>
  )
}

/** Chips de valores rápidos debajo de un input. */
export function Atajos<T extends number>({
  opciones,
  valor,
  onChange,
}: {
  opciones: { valor: T; etiqueta: string }[]
  valor: T
  onChange: (valor: T) => void
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          onClick={() => onChange(opcion.valor)}
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-xs font-semibold transition',
            valor === opcion.valor
              ? 'border-[#12372c] bg-[#12372c] text-[#f4f1ea]'
              : 'border-stone-200 bg-white text-stone-500 hover:border-[#d4af6a] hover:text-[#12372c]'
          )}
        >
          {opcion.etiqueta}
        </button>
      ))}
    </div>
  )
}

/** Grupo plegable para parámetros secundarios. */
export function Grupo({
  titulo,
  resumen,
  abiertoInicial = false,
  children,
}: {
  titulo: string
  resumen?: string
  abiertoInicial?: boolean
  children: ReactNode
}) {
  const [abierto, setAbierto] = useState(abiertoInicial)

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60">
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span>
          <span className="block text-sm font-semibold text-[#12372c]">{titulo}</span>
          {resumen && !abierto && <span className="block text-xs text-stone-500">{resumen}</span>}
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-stone-400 transition', abierto && 'rotate-180')} />
      </button>
      {abierto && <div className="space-y-5 border-t border-stone-200/80 px-4 pb-4 pt-4">{children}</div>}
    </div>
  )
}

/** Dato secundario con etiqueta y detalle chico. */
export function Dato({
  titulo,
  valor,
  detalle,
  tono = 'neutro',
}: {
  titulo: string
  valor: string
  detalle?: string
  tono?: 'neutro' | 'positivo' | 'negativo' | 'dorado'
}) {
  return (
    <div className={cn(tarjetaClass, 'p-5')}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{titulo}</p>
      <p
        className={cn(
          'mt-2 font-heading text-2xl tabular-nums',
          tono === 'positivo' && 'text-emerald-700',
          tono === 'negativo' && 'text-rose-700',
          tono === 'dorado' && 'text-[#8a6420]',
          tono === 'neutro' && 'text-[#12372c]'
        )}
      >
        {valor}
      </p>
      {detalle && <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{detalle}</p>}
    </div>
  )
}

/** Sección plegable de contenido largo (tablas, guías). */
export function Desplegable({
  titulo,
  subtitulo,
  icono,
  children,
}: {
  titulo: string
  subtitulo?: string
  icono?: ReactNode
  children: ReactNode
}) {
  const [abierto, setAbierto] = useState(false)

  return (
    <section className={tarjetaClass}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
      >
        {icono && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#12372c]/[0.07] text-[#12372c]">
            {icono}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-medium text-[#12372c]">{titulo}</span>
          {subtitulo && <span className="mt-0.5 block text-sm text-stone-500">{subtitulo}</span>}
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#12372c]/[0.06]">
          <ChevronDown className={cn('h-4 w-4 text-[#12372c] transition', abierto && 'rotate-180')} />
        </span>
      </button>
      {abierto && <div className="border-t border-stone-200/70 p-5 sm:p-6">{children}</div>}
    </section>
  )
}
