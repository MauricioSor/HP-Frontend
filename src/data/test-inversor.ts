import type { PerfilInversor } from '@/lib/perfil'

export interface OpcionTest {
  texto: string
  puntos: number
}

export interface PreguntaTest {
  id: string
  titulo: string
  detalle: string
  opciones: OpcionTest[]
}

export const preguntasTest: PreguntaTest[] = [
  {
    id: 'horizonte',
    titulo: '¿Cuándo vas a necesitar esta plata?',
    detalle: 'El plazo define si conviene un instrumento líquido o uno que aguante vaivenes.',
    opciones: [
      { texto: 'En menos de un año', puntos: 1 },
      { texto: 'Entre 1 y 3 años', puntos: 2 },
      { texto: 'Más de 3 años, puedo esperar', puntos: 3 },
    ],
  },
  {
    id: 'caida',
    titulo: 'Si tu inversión cae un 20% en un mes, ¿qué hacés?',
    detalle: 'No hay respuesta correcta: mide tolerancia real, no la que uno declara.',
    opciones: [
      { texto: 'Vendo. No banco esa pérdida.', puntos: 1 },
      { texto: 'Espero y no toco nada', puntos: 2 },
      { texto: 'Si el fundamento sigue, compro más', puntos: 3 },
    ],
  },
  {
    id: 'objetivo',
    titulo: '¿Qué buscás primero?',
    detalle: 'El objetivo pesa más que la moda del instrumento.',
    opciones: [
      { texto: 'Que no se licúe. Preservar.', puntos: 1 },
      { texto: 'Crecer a un ritmo razonable', puntos: 2 },
      { texto: 'Maximizar rendimiento, aunque baile', puntos: 3 },
    ],
  },
  {
    id: 'experiencia',
    titulo: '¿Cuánto operaste hasta ahora?',
    detalle: 'La experiencia no cambia el perfil solo, pero evita recomendar cosas que no vas a entender.',
    opciones: [
      { texto: 'Casi nada: plazo fijo o nada', puntos: 1 },
      { texto: 'Algún bono, fondo o CEDEAR', puntos: 2 },
      { texto: 'Opéro con frecuencia, incluyendo renta variable o cripto', puntos: 3 },
    ],
  },
  {
    id: 'liquidez',
    titulo: 'Si necesitás plata ya, ¿qué tan grave es no poder vender al toque?',
    detalle: 'Algunos títulos tienen pozo; las cauciones y los FCI T+0 no.',
    opciones: [
      { texto: 'Grave. Necesito liquidez inmediata', puntos: 1 },
      { texto: 'Puedo esperar unos días', puntos: 2 },
      { texto: 'No me importa quedar trabado un tiempo', puntos: 3 },
    ],
  },
  {
    id: 'moneda',
    titulo: '¿Cómo querés estar expuesto?',
    detalle: 'En Argentina la moneda es parte del riesgo, no un detalle.',
    opciones: [
      { texto: 'Pesos, lo más previsible posible', puntos: 1 },
      { texto: 'Mezcla: pesos + dólares (MEP/CCL o soberanos)', puntos: 2 },
      { texto: 'Dólares, acciones y/o cripto', puntos: 3 },
    ],
  },
]

export function perfilDesdePuntaje(puntos: number): PerfilInversor {
  const maximo = preguntasTest.length * 3
  const ratio = puntos / maximo
  if (ratio <= 0.45) return 'conservador'
  if (ratio <= 0.7) return 'moderado'
  return 'agresivo'
}
