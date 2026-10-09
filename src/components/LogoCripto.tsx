import type { ComponentType } from 'react'
import { Bitcoin, Brain, Coins, Cpu, Flame, Rocket } from 'lucide-react'
import { LogoTile } from '@/components/LogoInstrumento'

export interface MetaTema {
  icon: ComponentType<{ className?: string }>
  gradiente: string
  sombra: string
  halo: string
}

const META_TEMAS: Record<string, MetaTema> = {
  'principales-criptos': {
    icon: Coins,
    gradiente: 'from-amber-600 via-amber-500 to-yellow-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(217,119,6,0.75)]',
    halo: 'bg-amber-300/30',
  },
  'fundamentos-bitcoin': {
    icon: Bitcoin,
    gradiente: 'from-orange-600 via-orange-500 to-amber-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(234,88,12,0.75)]',
    halo: 'bg-orange-300/30',
  },
  minado: {
    icon: Cpu,
    gradiente: 'from-slate-800 via-slate-600 to-sky-400',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(51,65,85,0.75)]',
    halo: 'bg-sky-300/30',
  },
  fomo: {
    icon: Brain,
    gradiente: 'from-violet-700 via-violet-500 to-fuchsia-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(109,40,217,0.7)]',
    halo: 'bg-violet-300/30',
  },
  'quemado-monedas': {
    icon: Flame,
    gradiente: 'from-rose-700 via-red-500 to-orange-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(225,29,72,0.7)]',
    halo: 'bg-rose-300/30',
  },
  memecoins: {
    icon: Rocket,
    gradiente: 'from-fuchsia-700 via-pink-500 to-amber-300',
    sombra: 'shadow-[0_14px_28px_-12px_rgba(192,38,211,0.7)]',
    halo: 'bg-fuchsia-300/30',
  },
}

export function metaTema(slug: string): MetaTema {
  return META_TEMAS[slug] ?? META_TEMAS['principales-criptos']
}

export function LogoTema({
  slug,
  size = 'md',
  className,
}: {
  slug: string
  size?: 'md' | 'lg'
  className?: string
}) {
  const meta = metaTema(slug)
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
