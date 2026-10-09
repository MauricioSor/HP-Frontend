import type { ComponentType } from 'react'

/**
 * Ilustraciones propias (dúo-tono) de cada instrumento.
 * Usan `currentColor` (blanco sobre el tile) + un dorado de acento, y
 * capas con distinta opacidad para dar profundidad.
 */
type IconoProps = { className?: string }

const ORO = '#fde7a6'
const ORO_FUERTE = '#e0a93a'
const TINTA = '#0b1f18'

function Base({ className, children }: IconoProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

/** Bono: certificado con sello y cinta */
function IconoBono({ className }: IconoProps) {
  return (
    <Base className={className}>
      <rect x="6" y="9" width="30" height="31" rx="5" fill="currentColor" fillOpacity=".28" />
      <rect x="10" y="5" width="30" height="31" rx="5" fill="currentColor" />
      <rect x="15" y="11" width="13" height="3.2" rx="1.6" fill={TINTA} fillOpacity=".38" />
      <rect x="15" y="17.5" width="20" height="2.4" rx="1.2" fill={TINTA} fillOpacity=".2" />
      <rect x="15" y="22.5" width="20" height="2.4" rx="1.2" fill={TINTA} fillOpacity=".2" />
      <rect x="15" y="27.5" width="10" height="2.4" rx="1.2" fill={TINTA} fillOpacity=".2" />
      <path d="M29.5 38.5 27 46l5-3 5 3-2.5-7.5Z" fill={ORO_FUERTE} />
      <circle cx="32" cy="33" r="8.5" fill={ORO} />
      <circle cx="32" cy="33" r="5.6" stroke={ORO_FUERTE} strokeWidth="1.8" />
      <path d="m32 29.6 1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.3-2.3 1.3.5-2.5-1.8-1.7 2.5-.3Z" fill={ORO_FUERTE} />
    </Base>
  )
}

/** LECAP: calendario con barras que capitalizan */
function IconoLecap({ className }: IconoProps) {
  return (
    <Base className={className}>
      <rect x="6" y="9" width="36" height="34" rx="7" fill="currentColor" />
      <path d="M6 16a7 7 0 0 1 7-7h22a7 7 0 0 1 7 7v3H6Z" fill={ORO} />
      <rect x="14" y="4" width="4.5" height="9" rx="2.2" fill="currentColor" stroke={TINTA} strokeOpacity=".25" strokeWidth="1.2" />
      <rect x="29.5" y="4" width="4.5" height="9" rx="2.2" fill="currentColor" stroke={TINTA} strokeOpacity=".25" strokeWidth="1.2" />
      <rect x="12" y="31" width="6" height="7" rx="1.5" fill={TINTA} fillOpacity=".28" />
      <rect x="21" y="27" width="6" height="11" rx="1.5" fill={TINTA} fillOpacity=".38" />
      <rect x="30" y="22" width="6" height="16" rx="1.5" fill={ORO_FUERTE} />
    </Base>
  )
}

/** CEDEAR: globo con órbita y satélite */
function IconoCedear({ className }: IconoProps) {
  return (
    <Base className={className}>
      <circle cx="24" cy="24" r="15" fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeWidth="2.6" />
      <ellipse cx="24" cy="24" rx="6.5" ry="15" stroke="currentColor" strokeWidth="2.2" />
      <path d="M9.5 19.5h29M9.5 28.5h29" stroke="currentColor" strokeWidth="2.2" />
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="7.5"
        transform="rotate(-24 24 24)"
        stroke={ORO}
        strokeWidth="2.6"
        strokeDasharray="30 6"
      />
      <circle cx="40.5" cy="15.5" r="3.6" fill={ORO} />
      <circle cx="40.5" cy="15.5" r="1.5" fill={ORO_FUERTE} />
    </Base>
  )
}

/** Acciones: velas japonesas con tendencia alcista */
function IconoAccion({ className }: IconoProps) {
  return (
    <Base className={className}>
      <path d="M12 12v26M24 7v28M36 14v24" stroke="currentColor" strokeWidth="2.6" strokeOpacity=".75" />
      <rect x="8" y="20" width="8" height="13" rx="2.2" fill="currentColor" fillOpacity=".55" />
      <rect x="20" y="14" width="8" height="15" rx="2.2" fill="currentColor" />
      <rect x="32" y="21" width="8" height="13" rx="2.2" fill="currentColor" fillOpacity=".8" />
      <path d="m6 36 11-9 8 5L41 11" stroke={ORO} strokeWidth="3.4" />
      <path d="M32 10.5h9.5V20" stroke={ORO} strokeWidth="3.4" />
    </Base>
  )
}

/** ETF: torta diversificada con porción destacada */
function IconoEtf({ className }: IconoProps) {
  return (
    <Base className={className}>
      <path d="M22 26V10A16 16 0 1 0 38 26Z" fill="currentColor" />
      <path d="M22 26 10.7 37.3" stroke={TINTA} strokeOpacity=".22" strokeWidth="2" />
      <path d="M22 26 12 15.5" stroke={TINTA} strokeOpacity=".22" strokeWidth="2" />
      <path d="M27 21V5a16 16 0 0 1 16 16Z" fill={ORO} />
      <path d="M27 21 38.3 9.7" stroke={ORO_FUERTE} strokeWidth="2" />
    </Base>
  )
}

/** FCI: portafolio con monedas */
function IconoFci({ className }: IconoProps) {
  return (
    <Base className={className}>
      <path d="M17 13v-1.5A4.5 4.5 0 0 1 21.5 7h5a4.5 4.5 0 0 1 4.5 4.5V13" stroke="currentColor" strokeWidth="3" />
      <rect x="5" y="12" width="38" height="29" rx="6.5" fill="currentColor" />
      <path d="M5 24h38" stroke={TINTA} strokeOpacity=".18" strokeWidth="2.2" />
      <rect x="20" y="20.5" width="8" height="7.5" rx="2" fill={ORO} />
      <circle cx="36" cy="37" r="8" fill={ORO} stroke="#ffffff" strokeWidth="2" />
      <path d="M36 32.4v9.2M33.6 34.4c0-1.2 1.1-1.8 2.4-1.8s2.4.6 2.4 1.7c0 2.4-4.8 1.3-4.8 3.6 0 1.1 1.1 1.7 2.4 1.7s2.4-.6 2.4-1.8" stroke={ORO_FUERTE} strokeWidth="1.5" />
    </Base>
  )
}

/** Caución: escudo garantizado + reloj de corto plazo */
function IconoCaucion({ className }: IconoProps) {
  return (
    <Base className={className}>
      <path d="M22 4.5 36.5 9.8v12.4c0 9.3-6.2 16.3-14.5 19.3C13.7 38.500 7.500 31.500 7.500 22.200V9.800Z" fill="currentColor" />
      <path d="M22 4.5v37" stroke={TINTA} strokeOpacity=".1" strokeWidth="2" />
      <path d="m14.500 22.500 5.200 5.200 9.300-10.200" stroke={ORO_FUERTE} strokeWidth="4" />
      <circle cx="35.500" cy="35.500" r="9" fill={ORO} stroke="#ffffff" strokeWidth="2" />
      <path d="M35.500 30.500v5.300l3.300 2" stroke={ORO_FUERTE} strokeWidth="2.200" />
    </Base>
  )
}

/** Licitación: martillo de remate sobre la base */
function IconoLicitacion({ className }: IconoProps) {
  return (
    <Base className={className}>
      <g transform="rotate(-38 24 22)">
        <rect x="11" y="7" width="26" height="12" rx="3.500" fill="currentColor" />
        <rect x="16.500" y="7" width="3" height="12" fill={TINTA} fillOpacity=".15" />
        <rect x="28.500" y="7" width="3" height="12" fill={TINTA} fillOpacity=".15" />
        <rect x="21.500" y="19" width="5" height="21" rx="2.500" fill="currentColor" fillOpacity=".78" />
      </g>
      <rect x="22" y="38" width="22" height="6" rx="3" fill={ORO} />
      <path d="M8 33.500c2.500-1 4.800-1 7.200 0M6 39c3-1.300 6.200-1.300 9.200 0" stroke={ORO} strokeWidth="2.200" strokeOpacity=".8" />
    </Base>
  )
}

export const ICONOS_INSTRUMENTO: Record<string, ComponentType<IconoProps>> = {
  'bonos-soberanos': IconoBono,
  lecaps: IconoLecap,
  cedears: IconoCedear,
  'acciones-argentinas': IconoAccion,
  etfs: IconoEtf,
  fci: IconoFci,
  'cauciones-bursatiles': IconoCaucion,
  'licitaciones-publicas': IconoLicitacion,
}
