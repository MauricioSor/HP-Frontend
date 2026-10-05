export interface GuiaResumen {
  slug: string
  titulo: string
  resumen: string
  fecha: string
  lecturaMinutos: number
  etiquetas: string[]
}

export const guias: GuiaResumen[] = [
  {
    slug: 'bonos-soberanos',
    titulo: 'Guía de los 5 principales bonos soberanos de Argentina',
    resumen:
      'Cómo funcionan AL30, GD30, AL35, GD35 y AE38: cupones, amortizaciones, paridad, TIR y si hay que pagar Ganancias o Bienes Personales.',
    fecha: '2026-10-04',
    lecturaMinutos: 14,
    etiquetas: ['Bonos', 'Impuestos', 'Renta fija'],
  },
]
