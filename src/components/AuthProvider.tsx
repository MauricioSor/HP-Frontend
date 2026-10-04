'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  usuario: string
  rol: number
  premium: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabase = createClient()

/** Extrae los datos de usuario de Supabase Auth + tabla usuario */
async function buildUser(supabaseUser: SupabaseUser): Promise<User> {
  const usuario = supabaseUser.user_metadata?.usuario || supabaseUser.email || ''

  // Obtener rol desde la tabla usuario
  let rol = 0
  const { data } = await supabase
    .from('usuario')
    .select('rol')
    .eq('usuario', usuario)
    .single()

  if (data) {
    rol = data.rol
  }

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    usuario,
    rol,
    premium: supabaseUser.user_metadata?.plan === 'premium',
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
        return { success: true }
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
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
