import { NextResponse, type NextRequest } from 'next/server'
import { enviarConsulta, MOTIVOS_CONTACTO, type MotivoContacto } from '@/lib/emailSender'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const recientes = new Map<string, number[]>()

function motivoValido(valor: unknown): valor is MotivoContacto {
  return typeof valor === 'string' && valor in MOTIVOS_CONTACTO
}

function limitado(ip: string) {
  const ahora = Date.now()
  const ventana = (recientes.get(ip) ?? []).filter((marca) => ahora - marca < 10 * 60 * 1000)
  if (ventana.length >= 5) {
    recientes.set(ip, ventana)
    return true
  }
  ventana.push(ahora)
  recientes.set(ip, ventana)
  return false
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'El mensaje no se pudo leer.' }, { status: 400 })
  }

  const datos = body as Record<string, unknown>
  const nombre = typeof datos.nombre === 'string' ? datos.nombre.trim() : ''
  const email = typeof datos.email === 'string' ? datos.email.trim() : ''
  const mensaje = typeof datos.mensaje === 'string' ? datos.mensaje.trim() : ''

  if (!nombre || nombre.length > 120 || !EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ success: false, error: 'Revisá el nombre y el correo.' }, { status: 400 })
  }
  if (!motivoValido(datos.motivo)) {
    return NextResponse.json({ success: false, error: 'Elegí un motivo de contacto.' }, { status: 400 })
  }
  if (!mensaje || mensaje.length > 5000) {
    return NextResponse.json(
      { success: false, error: 'El mensaje tiene que tener entre 1 y 5000 caracteres.' },
      { status: 400 }
    )
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limitado(ip)) {
    return NextResponse.json(
      { success: false, error: 'Esperá unos minutos antes de enviar otra consulta.' },
      { status: 429 }
    )
  }

  try {
    await enviarConsulta({ nombre, email, motivo: datos.motivo, mensaje })
  } catch (error) {
    console.error('Error enviando consulta:', error)
    return NextResponse.json(
      { success: false, error: 'No pudimos enviar la consulta. Probá de nuevo en unos minutos.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
