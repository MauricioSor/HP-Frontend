import type { SupabaseClient } from '@supabase/supabase-js'
import { normalizarPerfil, type PerfilInversor } from '@/lib/perfil'
import { asegurarFilaUsuario, guardarPerfilInversor } from '@/lib/usuario'

export type FilaPersona = {
  dni: number
  nombre: string | null
  apellido: string | null
  correo: string | null
  nacimiento: string | null
  perfil_inversor: string | null
  usuario: string | null
}

export type FilaUsuario = {
  usuario: string
  rol: number
  alta: string | null
  estado: string | null
  perfil_inversor: string | null
}

export type DatosPersonaInput = {
  dni: number
  nombre: string
  apellido: string
  correo: string | null
  nacimiento: string | null
  perfil_inversor: PerfilInversor | null
}

export async function personaDeUsuario(supabase: SupabaseClient, usuario: string) {
  if (!usuario) return null
  const { data } = await supabase
    .from('persona')
    .select('dni, nombre, apellido, correo, nacimiento, perfil_inversor, usuario')
    .eq('usuario', usuario)
    .maybeSingle()
  return data as FilaPersona | null
}

export async function usuarioDeCuenta(supabase: SupabaseClient, usuario: string) {
  if (!usuario) return null
  const { data } = await supabase
    .from('usuario')
    .select('usuario, rol, alta, estado, perfil_inversor')
    .eq('usuario', usuario)
    .maybeSingle()
  return data as FilaUsuario | null
}

function mensajeErrorPersona(error: { code?: string; message: string }) {
  if (error.code === '23505') return 'Ese DNI ya está cargado en otra cuenta.'
  if (error.code === '23503') return 'La cuenta de usuario todavía no está lista. Recargá e intentá de nuevo.'
  return error.message
}

export async function guardarDatosPersona(
  supabase: SupabaseClient,
  usuario: string,
  datos: DatosPersonaInput,
  opciones: { sincronizarPerfilUsuario?: boolean } = {}
) {
  const sincronizarPerfilUsuario = opciones.sincronizarPerfilUsuario ?? true
  const cuenta = await asegurarFilaUsuario(supabase, usuario)

  if (sincronizarPerfilUsuario) {
    if (datos.perfil_inversor) {
      await guardarPerfilInversor(supabase, cuenta, datos.perfil_inversor)
    } else {
      const { data, error } = await supabase
        .from('usuario')
        .update({ perfil_inversor: null })
        .eq('usuario', cuenta)
        .select('usuario')
        .maybeSingle()
      if (error) throw error
      if (!data) throw new Error(`No hay una fila en usuario para "${cuenta}".`)
    }
  }

  const fila = {
    dni: datos.dni,
    nombre: datos.nombre,
    apellido: datos.apellido,
    correo: datos.correo,
    nacimiento: datos.nacimiento,
    perfil_inversor: datos.perfil_inversor,
    usuario: cuenta,
  }

  const existente = await personaDeUsuario(supabase, cuenta)
  const { error } = existente
    ? await supabase.from('persona').update(fila).eq('usuario', cuenta)
    : await supabase.from('persona').insert(fila)

  if (error) throw new Error(mensajeErrorPersona(error))
  return personaDeUsuario(supabase, cuenta)
}

export function perfilDeFilas(usuario: FilaUsuario | null, persona: FilaPersona | null): PerfilInversor | null {
  return normalizarPerfil(usuario?.perfil_inversor) ?? normalizarPerfil(persona?.perfil_inversor)
}
