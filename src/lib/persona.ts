import type { SupabaseClient } from '@supabase/supabase-js'

export async function personaDeUsuario(supabase: SupabaseClient, usuario: string) {
  if (!usuario) return null
  const { data } = await supabase.from('persona').select('dni, nombre, correo, nacimiento, perfil_inversor, usuario').eq('usuario', usuario).maybeSingle()
  return data
}
