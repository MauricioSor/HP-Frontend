import type { SupabaseClient } from '@supabase/supabase-js'
import type { TipoCatalogo } from '@/lib/catalogo'

export interface FavoritoGuardado {
  idInstrumento: number
  slug: string
  tipo: TipoCatalogo
  riesgo: string | null
}

export async function obtenerOCrearCartera(supabase: SupabaseClient, usuario: string) {
  const { data: existente, error: lectura } = await supabase
    .from('CarteraInstrumentos')
    .select('idCartera')
    .eq('usuario', usuario)
    .eq('tipo', 'favoritos')
    .maybeSingle()

  if (lectura) throw lectura
  if (existente?.idCartera) return existente.idCartera as number

  const { data: creada, error: alta } = await supabase
    .from('CarteraInstrumentos')
    .insert({ usuario, tipo: 'favoritos' })
    .select('idCartera')
    .single()

  if (alta) throw alta
  return creada.idCartera as number
}

export async function listarFavoritos(supabase: SupabaseClient, usuario: string) {
  const { data: cartera, error: lecturaCartera } = await supabase
    .from('CarteraInstrumentos')
    .select('idCartera')
    .eq('usuario', usuario)
    .eq('tipo', 'favoritos')
    .maybeSingle()

  if (lecturaCartera) throw lecturaCartera
  if (!cartera?.idCartera) return [] as FavoritoGuardado[]

  const { data, error } = await supabase
    .from('instrumento')
    .select('idInstrumento, nombre, tipo, riesgo')
    .eq('idCartera', cartera.idCartera)

  if (error) throw error

  return (data ?? []).map((fila) => ({
    idInstrumento: fila.idInstrumento as number,
    slug: String(fila.nombre),
    tipo: (fila.tipo === 'cripto' ? 'cripto' : 'bursatil') as TipoCatalogo,
    riesgo: (fila.riesgo as string | null) ?? null,
  }))
}

export async function toggleFavorito(
  supabase: SupabaseClient,
  usuario: string,
  item: { slug: string; tipo: TipoCatalogo; riesgo: string }
) {
  const idCartera = await obtenerOCrearCartera(supabase, usuario)
  const { data: actual } = await supabase
    .from('instrumento')
    .select('idInstrumento')
    .eq('idCartera', idCartera)
    .eq('nombre', item.slug)
    .maybeSingle()

  if (actual?.idInstrumento) {
    const { error } = await supabase.from('instrumento').delete().eq('idInstrumento', actual.idInstrumento)
    if (error) throw error
    return false
  }

  const { error } = await supabase.from('instrumento').insert({
    nombre: item.slug,
    tipo: item.tipo,
    riesgo: item.riesgo,
    idCartera,
  })
  if (error) throw error
  return true
}
