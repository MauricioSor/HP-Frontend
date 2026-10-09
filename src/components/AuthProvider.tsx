'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { normalizarPerfil, type PerfilInversor } from '@/lib/perfil'
import { resolverNombreUsuario } from '@/lib/usuario'

interface User {
  id: string
  email: string
  usuario: string
  rol: number
  premium: boolean
  perfilInversor: PerfilInversor | null
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; faltaPersona?: boolean }>
  logout: () => Promise<void>
  refrescarUsuario: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabase = createClient()

/** Extrae los datos de usuario de Supabase Auth + tabla usuario */
async function buildUser(supabaseUser: SupabaseUser): Promise<User> {
  const usuario = await resolverNombreUsuario(supabase, supabaseUser)

  let rol = 0
  let perfilInversor: PerfilInversor | null = null
  const { data } = await supabase
    .from('usuario')
    .select('rol, perfil_inversor')
    .eq('usuario', usuario)
    .maybeSingle()

  if (data) {
    rol = data.rol
    perfilInversor = normalizarPerfil(data.perfil_inversor)
  }

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    usuario,
    rol,
    premium: supabaseUser.user_metadata?.plan === 'premium',
    perfilInversor,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar sesión al montar y escuchar cambios.
  // La consulta a `usuario` no puede correr dentro de onAuthStateChange:
  // ese callback mantiene el lock del cliente y la consulta nunca termina,
  // así que la app se queda en "Cargando..." y no renderiza las rutas.
  useEffect(() => {
    let activo = true

    function aplicarSesion(sessionUser: SupabaseUser | null) {
      if (!sessionUser) {
        if (activo) {
          setUser(null)
          setIsLoading(false)
        }
        return
      }

      setTimeout(() => {
        buildUser(sessionUser)
          .then((userData) => {
            if (!activo) return
            setUser(userData)
            setIsLoading(false)
          })
          .catch(() => {
            if (!activo) return
            setUser({
              id: sessionUser.id,
              email: sessionUser.email || '',
              usuario: sessionUser.user_metadata?.usuario || sessionUser.email || '',
              rol: 0,
              premium: sessionUser.user_metadata?.plan === 'premium',
              perfilInversor: null,
            })
            setIsLoading(false)
          })
      }, 0)
    }

    supabase.auth.getSession().then(
      ({ data: { session } }) => {
        aplicarSesion(session?.user ?? null)
      },
      () => {
        if (activo) setIsLoading(false)
      }
    )

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      aplicarSesion(session?.user ?? null)
    })

    return () => {
      activo = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Traducir mensajes comunes
        if (error.message === 'Invalid login credentials') {
          return { success: false, error: 'Email o contraseña incorrectos' }
        }
        if (error.message === 'Email not confirmed') {
          return { success: false, error: 'Debés confirmar tu email antes de iniciar sesión' }
        }
        return { success: false, error: error.message }
      }

      if (data.user) {
        const userData = await buildUser(data.user)
        setUser(userData)
        const { data: persona } = await supabase
          .from('persona')
          .select('dni')
          .eq('usuario', userData.usuario)
          .maybeSingle()
        return { success: true, faltaPersona: !persona }
      }

      return { success: false, error: 'Error al iniciar sesión' }
    } catch {
      return { success: false, error: 'Error de conexión' }
    }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const refrescarUsuario = useCallback(async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      setUser(await buildUser(data.user))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refrescarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
