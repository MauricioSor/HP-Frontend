import { LogoInstrumento } from '@/components/LogoInstrumento'
import { LogoTema } from '@/components/LogoCripto'

/** Logo de un ítem del catálogo, sea instrumento bursátil o tema cripto. */
export function LogoItem({
  slug,
  tipo,
  size = 'md',
  className,
}: {
  slug: string
  tipo: 'bursatil' | 'cripto'
  size?: 'md' | 'lg'
  className?: string
}) {
  return tipo === 'cripto' ? (
    <LogoTema slug={slug} size={size} className={className} />
  ) : (
    <LogoInstrumento slug={slug} size={size} className={className} />
  )
}
