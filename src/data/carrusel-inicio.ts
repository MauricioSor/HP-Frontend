export interface SlideCarrusel {
  slug: string
  categoria: string
  titulo: string
  bajada: string
  tickers: string[]
  riesgo: 'bajo' | 'medio' | 'alto'
  horizonte: string
  spark: string
}

export const slidesCarrusel: SlideCarrusel[] = [
  {
    slug: 'bonos-soberanos',
    categoria: 'Renta fija · Dólares',
    titulo: 'Bonos soberanos',
    bajada: 'AL30, GD30 y la curva hard-dollar. Cupón, amortización y TIR para dolarizar con flujo.',
    tickers: ['AL30', 'GD30', 'AL35', 'GD35', 'AE38'],
    riesgo: 'medio',
    horizonte: '1 a 5 años',
    spark: 'M4 52 C 28 50 46 28 72 34 S 118 12 156 18 198 40 236 22',
  },
  {
    slug: 'lecaps',
    categoria: 'Renta fija · Pesos',
    titulo: 'LECAPs',
    bajada: 'Letras del Tesoro a tasa fija que capitalizan cada mes. Liquidez de bolsa, no de plazo fijo.',
    tickers: ['S31L', 'S28N', 'T15E', 'S30Y'],
    riesgo: 'bajo',
    horizonte: '1 a 12 meses',
    spark: 'M4 48 C 36 46 58 40 86 34 S 140 22 178 18 220 12 236 10',
  },
  {
    slug: 'acciones-argentinas',
    categoria: 'Renta variable · Merval',
    titulo: 'Acciones argentinas',
    bajada: 'YPF, Pampa, Loma y los bancos. Socios del Merval, con ciclos y dividendos locales.',
    tickers: ['YPFD', 'PAMP', 'LOMA', 'GGAL', 'BMA'],
    riesgo: 'alto',
    horizonte: '3 a 5+ años',
    spark: 'M4 46 C 24 42 40 56 62 30 S 110 18 140 38 176 8 236 16',
  },
  {
    slug: 'etfs',
    categoria: 'Renta variable · Global',
    titulo: 'ETFs',
    bajada: 'SPY, QQQ y el mundo en un certificado. Diversificación instantánea, cotiza como una acción.',
    tickers: ['SPY', 'QQQ', 'DIA', 'IWM', 'GLD'],
    riesgo: 'medio',
    horizonte: '3 a 10+ años',
    spark: 'M4 50 C 32 44 54 36 82 32 S 136 20 168 24 204 14 236 12',
  },
]

export const cintaTickers = [
  'AL30',
  'GD30',
  'AL35',
  'AE38',
  'S31L',
  'YPFD',
  'PAMP',
  'LOMA',
  'GGAL',
  'MELI',
  'AAPL',
  'NVDA',
  'SPY',
  'QQQ',
  'GLD',
]
