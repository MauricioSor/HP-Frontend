import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('finbootcamp-session')

    if (!session?.value) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      )
    }

    // Decodificar la cookie de sesión
    const sessionData = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    )

    return NextResponse.json({
      success: true,
      user: {
        usuario: sessionData.usuario,
        rol: sessionData.rol,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Sesión inválida' },
      { status: 401 }
    )
  }
}
