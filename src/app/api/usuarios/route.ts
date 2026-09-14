import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET - Listar usuarios (sin exponer contraseñas)
export async function GET() {
  try {
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

// POST - Crear usuario (y opcionalmente persona asociada)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { usuario, contraseña, rol, estado, persona } = body

    if (!usuario || !contraseña) {
      return NextResponse.json(
        { success: false, error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(contraseña, salt)

    // Crear usuario
    const { error: userError } = await supabase
      .from('usuario')
      .insert({
        usuario,
        contraseña: hashedPassword,
        rol: rol ?? 0,
        alta: new Date().toISOString(),
        estado: estado ?? 1,
      })

    if (userError) {
      // Si el error es de unique constraint, es que el usuario ya existe
      if (userError.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'El nombre de usuario ya existe' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { success: false, error: userError.message },
        { status: 500 }
      )
    }

    // Si se proporcionó data de persona, crearla
    if (persona && persona.dni) {
      const { error: personaError } = await supabase
        .from('persona')
        .insert({
          dni: persona.dni,
          nombre: persona.nombre || null,
          correo: persona.correo || null,
          direccion: persona.direccion || null,
          SituacionLaboral: persona.SituacionLaboral || null,
          Perfil: persona.Perfil || null,
          cuit: persona.cuit || null,
          nacimiento: persona.nacimiento || null,
          usuario: usuario,
        })

      if (personaError) {
        return NextResponse.json(
          {
            success: true,
            warning: `Usuario creado pero hubo un error al crear la persona: ${personaError.message}`,
          },
          { status: 207 }
        )
      }
    }

    return NextResponse.json({ success: true, message: 'Usuario creado exitosamente' })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
