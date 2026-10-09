import Image from 'next/image'
import { Check } from 'lucide-react'
import { instruments } from '@/data/instruments'
import {
  etiquetaPerfil,
  perfilesInversor,
  recomendadosPorPerfil,
  type PerfilInversor,
} from '@/lib/perfil'
import { cn } from '@/lib/utils'

interface DatosImagenPerfil {
  src: string
  alt: string
  lema: string
  /** Texto corto que acompaña la ilustración */
  frase: string
  /** Color de acento (chips y etiqueta) */
  acento: string
}

export const IMAGENES_PERFIL: Record<PerfilInversor, DatosImagenPerfil> = {
  conservador: {
    src: '/perfiles/perfil-conservador.jpg',
    alt: 'Faro en una isla rocosa sobre un mar en calma al amanecer, con un velero resguardado en la bahía',
    lema: 'Puerto seguro',
    frase: 'Primero cuidar lo que ya tenés.',
    acento: 'bg-emerald-100 text-emerald-900',
  },
  moderado: {
    src: '/perfiles/perfil-moderado.jpg',
    alt: 'Velero navegando con rumbo firme sobre un mar turquesa al atardecer, con una brújula dorada en el cielo',
    lema: 'Rumbo firme',
    frase: 'Avanzar parejo, sin irse a los extremos.',
    acento: 'bg-sky-100 text-sky-900',
  },
  agresivo: {
    src: '/perfiles/perfil-agresivo.jpg',
    alt: 'Cohete dorado ascendiendo junto a una cumbre nevada bajo un cielo de tormenta',
    lema: 'Directo a la cima',
    frase: 'Más vaivén a cambio de más potencial.',
    acento: 'bg-amber-100 text-amber-900',
  },
}

const NOMBRES_CORTOS: Record<string, string> = {
  fci: 'FCI',
  'cauciones-bursatiles': 'Cauciones',
  'licitaciones-publicas': 'Licitaciones',
}

function nombreCorto(slug: string) {
  if (NOMBRES_CORTOS[slug]) return NOMBRES_CORTOS[slug]
  const instrumento = instruments.find((i) => i.slug === slug)
  return instrumento ? instrumento.name.replace(/\s*\(.*\)/, '') : slug
}

/** Banner grande con la imagen del perfil del usuario. */
export function BannerPerfil({ perfil, className }: { perfil: PerfilInversor; className?: string }) {
  const datos = IMAGENES_PERFIL[perfil]

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-[#12372c] shadow-[0_30px_60px_-34px_rgba(18,55,44,0.8)] ring-1 ring-black/5 sm:aspect-[16/8]',
        className
      )}
    >
      <Image
        src={datos.src}
        alt={datos.alt}
        fill
        priority
        sizes="(min-width: 768px) 48rem, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f18]/90 via-[#0b1f18]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f0d08a]">
            Perfil {etiquetaPerfil(perfil)}
          </p>
          <p className="mt-1 font-heading text-3xl text-[#f4f1ea] sm:text-4xl">{datos.lema}</p>
          <p className="mt-1 text-sm text-emerald-50/80">{datos.frase}</p>
        </div>
      </div>
    </div>
  )
}

/** Los tres perfiles con su imagen; el del usuario va destacado. */
export function GaleriaPerfiles({ actual }: { actual: PerfilInversor }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-medium text-[#12372c]">Los tres perfiles</h2>
      <p className="mt-2 text-stone-600">Así se ve cada estilo de inversor. El tuyo está marcado.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {perfilesInversor.map((perfil) => {
          const datos = IMAGENES_PERFIL[perfil]
          const esActual = perfil === actual
          const sugeridos = recomendadosPorPerfil[perfil].bursatil.slice(0, 3)

          return (
            <article
              key={perfil}
              className={cn(
                'group relative overflow-hidden rounded-[1.6rem] bg-white shadow-[0_22px_50px_-38px_rgba(18,55,44,0.55)] transition duration-300',
                esActual
                  ? 'ring-2 ring-[#d4af6a] shadow-[0_28px_60px_-34px_rgba(212,175,106,0.8)]'
                  : 'ring-1 ring-stone-200 hover:-translate-y-1'
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={datos.src}
                  alt={datos.alt}
                  fill
                  sizes="(min-width: 640px) 22rem, 100vw"
                  className={cn(
                    'object-cover transition duration-500 group-hover:scale-105',
                    !esActual && 'saturate-[0.75]'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f18]/70 via-transparent to-transparent" />
                {esActual && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#d4af6a] px-2.5 py-1 text-xs font-bold text-[#12372c] shadow">
                    <Check className="h-3.5 w-3.5" />
                    Tu perfil
                  </span>
                )}
                <p className="absolute bottom-3 left-4 font-heading text-2xl text-[#f4f1ea]">
                  {etiquetaPerfil(perfil)}
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-[#12372c]">{datos.lema}</p>
                <p className="mt-0.5 text-sm text-stone-600">{datos.frase}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sugeridos.map((slug) => (
                    <span key={slug} className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', datos.acento)}>
                      {nombreCorto(slug)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
