import type { SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js'
import type { PerfilInversor } from '@/lib/perfil'
import { ESTADO_ACTIVO } from '@/lib/estados-usuario'

export async function resolverNombreUsuario(
  supabase: SupabaseClient,
  authUser: Pick<SupabaseUser, 'email' | 'user_metadata'>
) {
  const meta =
    typeof authUser.user_metadata?.usuario === 'string' ? authUser.user_metadata.usuario.trim() : ''
  const email = authUser.email?.trim() || ''

  if (meta) {
    const { data } = await supabase.from('usuario').select('usuario').eq('usuario', meta).maybeSingle()
    if (data?.usuario) return String(data.usuario)
  }

  if (email) {
    const { data: porPersona } = await supabase
      .from('persona')
      .select('usuario')
      .eq('correo', email)
      .maybeSingle()
    if (porPersona?.usuario) return String(porPersona.usuario)

    const { data: porEmail } = await supabase.from('usuario').select('usuario').eq('usuario', email).maybeSingle()
    if (porEmail?.usuario) return String(porEmail.usuario)

    const local = email.split('@')[0]?.replace(/[^a-zA-Z0-9._]/g, '') || ''
    if (local) {
      const { data: porLocal } = await supabase.from('usuario').select('usuario').eq('usuario', local).maybeSingle()
      if (porLocal?.usuario) return String(porLocal.usuario)
    }
  }

  return meta || email
}

export async function guardarPerfilInversor(
  supabase: SupabaseClient,
  usuario: string,
  perfil: PerfilInversor
) {
  const { data: rpc, error: errorRpc } = await supabase.rpc('guardar_perfil_inversor', {
    p_perfil: perfil,
  })

  if (!errorRpc && rpc) {
    const fila = rpc as { usuario?: string; perfil_inversor?: string }
    return {
      usuario: fila.usuario || usuario,
      perfil_inversor: fila.perfil_inversor || perfil,
    }
  }

  const { data, error } = await supabase
    .from('usuario')
    .update({ perfil_inversor: perfil })
    .eq('usuario', usuario)
    .select('usuario, perfil_inversor')
    .maybeSingle()

  if (error) throw error
  if (!data) {
    throw new Error(errorRpc?.message || `No hay una fila en usuario para "${usuario}".`)
  }

  await supabase.from('persona').update({ perfil_inversor: perfil }).eq('usuario', usuario)
  return data
}

export async function asegurarFilaUsuario(supabase: SupabaseClient, nombreUsuario: string) {
  const { data } = await supabase.from('usuario').select('usuario').eq('usuario', nombreUsuario).maybeSingle()
  if (data?.usuario) return
  const { error } = await supabase.from('usuario').insert({
    usuario: nombreUsuario,
    rol: 0,
    estado: ESTADO_ACTIVO,
  })
  if (error) throw new Error(error.message)
}
