'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/client'
import { listarFavoritos, toggleFavorito } from '@/lib/cartera'
import type { TipoCatalogo } from '@/lib/catalogo'
import { cn } from '@/lib/utils'

export default function BotonFavorito({
  slug,
  tipo,
  riesgo,
  compacto = false,
}: {
  slug: string
  tipo: TipoCatalogo
  riesgo: string
  compacto?: boolean
}) {
  const { user, isAuthenticated } = useAuth()
  const [activo, setActivo] = useState(false)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!user?.usuario) {
      setActivo(false)
      return
    }
    let vivo = true
    const supabase = createClient()
    listarFavoritos(supabase, user.usuario)
      .then((lista) => {
        if (vivo) setActivo(lista.some((item) => item.slug === slug))
      })
      .catch(() => {
        if (vivo) setActivo(false)
      })
    return () => {
      vivo = false
    }
  }, [slug, user?.usuario])

  async function onClick(evento: React.MouseEvent) {
    evento.preventDefault()
    evento.stopPropagation()
    if (!isAuthenticated || !user?.usuario || cargando) return
    setCargando(true)
    try {
      const supabase = createClient()
      const ahora = await toggleFavorito(supabase, user.usuario, { slug, tipo, riesgo })
      setActivo(ahora)
    } finally {
      setCargando(false)
    }
  }

  if (!isAuthenticated) return null

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={cargando}
      title={activo ? 'Sacar de la cartera' : 'Agregar a la cartera'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition',
        compacto ? 'p-2' : 'px-3 py-1.5 text-sm font-semibold',
        activo
          ? 'border-[#d4af6a] bg-[#d4af6a]/15 text-[#8a6a28]'
          : 'border-stone-200 bg-white text-stone-500 hover:border-[#d4af6a] hover:text-[#8a6a28]'
      )}
    >
      <Star className={cn('h-4 w-4', activo && 'fill-[#d4af6a] text-[#d4af6a]')} />
      {!compacto && (activo ? 'En cartera' : 'Favorito')}
    </button>
  )
}
