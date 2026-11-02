import { NextResponse, type NextRequest } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/server'
import { esRolAdministrador } from '@/lib/roles'
import { resolverNombreUsuario } from '@/lib/usuario'
import { ESTADO_ACTIVO, ESTADO_INACTIVO } from '@/lib/estados-usuario'
import { normalizarPerfil } from '@/lib/perfil'

async function verificarAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      supabase,
      errorResponse: NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      ),
    }
  }

  const nombre = await resolverNombreUsuario(supabase, user)
  const { data: fila } = await supabase
    .from('usuario')
    .select('rol')
    .eq('usuario', nombre)
    .maybeSingle()

  if (!esRolAdministrador(fila?.rol)) {
    return {
      supabase,
      errorResponse: NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 403 }
      ),
    }
  }

  return { supabase, errorResponse: null }
}

// GET - Listar usuarios (sin contraseñas, ya no están en esta tabla)
export async function GET() {
  try {
    const { supabase, errorResponse } = await verificarAdmin()
    if (errorResponse) return errorResponse

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

// POST - Crear usuario (y opcionalmente su registro en persona y en Supabase Auth) desde el panel de administración
export async function POST(request: NextRequest) {
  try {
    const { supabase, errorResponse } = await verificarAdmin()
    if (errorResponse) return errorResponse

    const body = await request.json()
    const nombreUsuario = typeof body?.usuario === 'string' ? body.usuario.trim() : ''
    const contraseña = typeof body?.contraseña === 'string' ? body.contraseña : ''
    const rol = typeof body?.rol === 'number' && [0, 1, 2].includes(body.rol) ? body.rol : 0
    const estado = body?.estado === ESTADO_INACTIVO ? ESTADO_INACTIVO : ESTADO_ACTIVO
    const personaInput = body?.persona && typeof body.persona === 'object' ? body.persona : null
    const correo =
      typeof personaInput?.correo === 'string' && personaInput.correo.trim()
        ? personaInput.correo.trim()
        : typeof body?.correo === 'string' && body.correo.trim()
          ? body.correo.trim()
          : ''

    if (!nombreUsuario) {
      return NextResponse.json(
        { success: false, error: 'El nombre de usuario es obligatorio' },
        { status: 400 }
      )
    }

    const { data: existente } = await supabase
      .from('usuario')
      .select('usuario')
      .eq('usuario', nombreUsuario)
      .maybeSingle()

    if (existente) {
      return NextResponse.json(
        { success: false, error: 'Ese nombre de usuario ya está registrado' },
        { status: 409 }
      )
    }

    // Si se suministró correo y contraseña válida, dar de alta en Supabase Auth sin alterar la sesión del admin
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (correo && contraseña && contraseña.length >= 6 && supabaseUrl) {
      if (serviceRoleKey) {
        const adminAuthClient = createSupabaseClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        const { error: authError } = await adminAuthClient.auth.admin.createUser({
          email: correo,
          password: contraseña,
          email_confirm: true,
          user_metadata: { usuario: nombreUsuario },
        })
        if (authError && !authError.message.toLowerCase().includes('already')) {
          return NextResponse.json(
            { success: false, error: authError.message },
            { status: 400 }
          )
        }
      } else if (anonKey) {
        const statelessClient = createSupabaseClient(supabaseUrl, anonKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        const { error: signUpError } = await statelessClient.auth.signUp({
          email: correo,
          password: contraseña,
          options: { data: { usuario: nombreUsuario } },
        })
        if (signUpError && !signUpError.message.toLowerCase().includes('already')) {
          return NextResponse.json(
            { success: false, error: signUpError.message },
            { status: 400 }
          )
        }
      }
    }

    const perfilNormalizado = normalizarPerfil(personaInput?.perfil_inversor)

    // Upsert para asegurar que rol, estado y perfil_inversor queden aplicados aunque el trigger haya corrido antes
    const { error: errorUsuario } = await supabase.from('usuario').upsert(
      {
        usuario: nombreUsuario,
        rol,
        estado,
        perfil_inversor: perfilNormalizado,
      },
      { onConflict: 'usuario' }
    )

    if (errorUsuario) {
      return NextResponse.json(
        { success: false, error: errorUsuario.message },
        { status: 500 }
      )
    }

    if (personaInput && typeof personaInput.dni === 'number' && !Number.isNaN(personaInput.dni)) {
      const { error: errorPersona } = await supabase.from('persona').insert({
        dni: personaInput.dni,
        nombre: typeof personaInput.nombre === 'string' ? personaInput.nombre.trim() || null : null,
        apellido: typeof personaInput.apellido === 'string' ? personaInput.apellido.trim() || null : null,
        correo: correo || null,
        perfil_inversor: perfilNormalizado,
        nacimiento: typeof personaInput.nacimiento === 'string' && personaInput.nacimiento ? personaInput.nacimiento : null,
        usuario: nombreUsuario,
      })

      if (errorPersona) {
        return NextResponse.json({
          success: true,
          warning: `Usuario "${nombreUsuario}" creado, pero no se pudieron guardar los datos personales: ${errorPersona.message}`,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Usuario "${nombreUsuario}" creado exitosamente`,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno al procesar la solicitud' },
      { status: 500 }
    )
  }
}
