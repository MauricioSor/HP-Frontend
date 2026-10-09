import type { LucideIcon } from 'lucide-react'
import {
  ChartCandlestick,
  ChartPie,
  Briefcase,
  Gavel,
  Globe2,
  Handshake,
  Landmark,
  ScrollText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MetaInstrumento {
  icon: LucideIcon
  /** Degradé del logo (clases de Tailwind) */
  gradiente: string
  /** Color del halo que aparece detrás de la tarjeta */
  halo: string
  /** Color del texto de acento (chips, links) */
  acento: string
  /** Sombra de color del logo */
  sombra: string
  /** Etiquetas / tickers representativos */
  etiquetas: string[]
}

const META: Record<string, MetaInstrumento> = {
  'bonos-soberanos': {
    icon: Landmark,
    gradiente: 'from-[#0f2a22] via-[#12372c] to-[#2e8a69]',
    halo: 'bg-emerald-400/25',
    acento: 'text-emerald-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(18,55,44,0.75)]',
    etiquetas: ['AL30', 'GD30', 'AE38'],
  },
  lecaps: {
    icon: ScrollText,
    gradiente: 'from-[#a9741f] via-[#c99a45] to-[#ecca85]',
    halo: 'bg-amber-300/30',
    acento: 'text-amber-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(169,116,31,0.75)]',
    etiquetas: ['Pesos', 'Tasa fija'],
  },
  cedears: {
    icon: Globe2,
    gradiente: 'from-sky-700 via-sky-500 to-cyan-300',
    halo: 'bg-sky-300/30',
    acento: 'text-sky-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(2,132,199,0.75)]',
    etiquetas: ['AAPL', 'MSFT', 'KO'],
  },
  'acciones-argentinas': {
    icon: ChartCandlestick,
    gradiente: 'from-emerald-700 via-emerald-500 to-lime-300',
    halo: 'bg-lime-300/30',
    acento: 'text-emerald-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(5,150,105,0.75)]',
    etiquetas: ['YPFD', 'PAMP', 'GGAL'],
  },
  etfs: {
    icon: ChartPie,
    gradiente: 'from-violet-700 via-violet-500 to-indigo-300',
    halo: 'bg-violet-300/30',
    acento: 'text-violet-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(109,40,217,0.7)]',
    etiquetas: ['SPY', 'QQQ', 'IWM'],
  },
  fci: {
    icon: Briefcase,
    gradiente: 'from-teal-800 via-teal-600 to-teal-300',
    halo: 'bg-teal-300/30',
    acento: 'text-teal-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(13,148,136,0.75)]',
    etiquetas: ['Money Market', 'T+0'],
  },
  'cauciones-bursatiles': {
    icon: Handshake,
    gradiente: 'from-rose-700 via-rose-500 to-orange-300',
    halo: 'bg-rose-300/30',
    acento: 'text-rose-800',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(225,29,72,0.7)]',
    etiquetas: ['1 a 7 días', 'Garantía BYMA'],
  },
  'licitaciones-publicas': {
    icon: Gavel,
    gradiente: 'from-slate-800 via-slate-600 to-slate-400',
    halo: 'bg-slate-400/30',
    acento: 'text-slate-700',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(51,65,85,0.75)]',
    etiquetas: ['Tesoro', 'Primario'],
  },
}

const META_DEFAULT: MetaInstrumento = META['bonos-soberanos']

export function metaInstrumento(slug: string): MetaInstrumento {
  return META[slug] ?? META_DEFAULT
}

const TAMANOS = {
  md: { caja: 'h-14 w-14 rounded-2xl', icono: 'h-7 w-7' },
  lg: { caja: 'h-20 w-20 rounded-[1.6rem]', icono: 'h-10 w-10' },
} as const

/**
 * Tile genérico de logo: degradé, brillo interior, círculos decorativos
 * y un ícono. Lo usan los instrumentos y los temas cripto.
 */
export function LogoTile({
  icon: Icon,
  gradiente,
  sombra,
  size = 'md',
  className,
}: {
  icon: LucideIcon
  gradiente: string
  sombra: string
  size?: keyof typeof TAMANOS
  className?: string
}) {
  const t = TAMANOS[size]

  return (
    <div
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br text-white ring-1 ring-white/40',
        t.caja,
        gradiente,
        sombra,
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute -right-3 -top-3 h-9 w-9 rounded-full bg-white/25 blur-[2px]" />
      <span className="absolute -bottom-4 -left-3 h-10 w-10 rounded-full bg-black/15" />
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
      <Icon className={cn('relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]', t.icono)} strokeWidth={1.9} />
    </div>
  )
}

/** Logo propio de cada instrumento bursátil. */
export function LogoInstrumento({
  slug,
  size = 'md',
  className,
}: {
  slug: string
  size?: keyof typeof TAMANOS
  className?: string
}) {
  const meta = metaInstrumento(slug)
  return (
    <LogoTile
      icon={meta.icon}
      gradiente={meta.gradiente}
      sombra={meta.sombra}
      size={size}
      className={className}
    />
  )
}
