import { NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

// GET - Listar usuarios (sin contraseñas, ya no están en esta tabla)
export async function GET() {
  try {
    const supabase = await createClient()

    // Verificar que el usuario está autenticado
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      )
    }

    const { data: usuarios, error } = await supabase
      .from('usuario')
      .select('usuario, rol, alta, estado')
      .order('alta', { ascending: false })

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    // Obtener personas asociadas
    const { data: personas, error: personaError } = await supabase
      .from('persona')
      .select('*')

    if (personaError) {
      return NextResponse.json(
        { success: false, error: personaError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, usuarios, personas })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
