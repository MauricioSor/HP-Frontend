import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { usuario, contraseña } = body

    if (!usuario || !contraseña) {
      return NextResponse.json(
        { success: false, error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar usuario en la tabla
    const { data: userData, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('usuario', usuario)
      .single()

    if (error || !userData) {
      return NextResponse.json(
        { success: false, error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // Verificar que el usuario esté activo (estado = 1)
    if (userData.estado !== 1) {
      return NextResponse.json(
        { success: false, error: 'Usuario inactivo. Contactá al administrador.' },
        { status: 403 }
      )
    }

    // Comparar contraseña con bcrypt
    const isValidPassword = await bcrypt.compare(contraseña, userData.contraseña)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // Crear cookie de sesión
    const sessionData = JSON.stringify({
      usuario: userData.usuario,
      rol: userData.rol,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        usuario: userData.usuario,
        rol: userData.rol,
      },
    })

    response.cookies.set('finbootcamp-session', Buffer.from(sessionData).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
