'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const supabase = createClient()

export default function RegistroPage() {
  // Datos de credenciales
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Datos de persona
  const [dni, setDni] = useState('')
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [situacionLaboral, setSituacionLaboral] = useState('')
  const [perfil_inversor, setPerfil] = useState('')
  const [cuit, setCuit] = useState('')
  const [nacimiento, setNacimiento] = useState('')

  // Estado
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validaciones
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (!dni) {
      setError('El DNI es obligatorio')
      return
    }

    if (!usuario.trim()) {
      setError('El nombre de usuario es obligatorio')
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Verificar que el nombre de usuario no esté en uso
      const { data: existingUser } = await supabase
        .from('usuario')
        .select('usuario')
        .eq('usuario', usuario)
        .single()

      if (existingUser) {
        setError('Ese nombre de usuario ya está en uso')
        setIsSubmitting(false)
        return
      }

      // 2. Registrar con Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: contraseña,
        options: {
          data: {
            usuario: usuario, // Se guarda en user_metadata
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Este email ya está registrado. ¿Querés iniciar sesión?')
        } else {
          setError(signUpError.message)
        }
        setIsSubmitting(false)
        return
      }

      // 3. Si no hay sesión, es porque se requiere confirmar email
      if (!data.session) {
        setSuccess(
          '¡Cuenta creada! Revisá tu email y confirmá tu cuenta para poder iniciar sesión.'
        )
        setIsSubmitting(false)
        return
      }

      // 4. Insertar datos de persona (el trigger ya creó la fila en `usuario`)
      if (dni) {
        await supabase.from('persona').insert({
          dni: parseInt(dni),
          nombre: nombre || null,
          correo: email,
          direccion: direccion || null,
          situacion_laboral: situacionLaboral || null,
          perfil_inversor: perfil_inversor || null,
          cuit: cuit || null,
          nacimiento: nacimiento || null,
          usuario: usuario,
        })
      }

      // 5. Registro exitoso + login automático → redirigir
      router.push('/')
      router.refresh()
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-emerald-600">📊 FinBootcamp</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Crear Cuenta</h1>
          <p className="mt-2 text-slate-500">Registrate para acceder a toda la plataforma</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Sección: Credenciales */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Credenciales
              </h2>

              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre de usuario *
                </label>
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="ej: juan.perez"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contraseña" className="block text-sm font-medium text-slate-700 mb-1">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <input
                      id="contraseña"
                      type={showPassword ? 'text' : 'password'}
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmar" className="block text-sm font-medium text-slate-700 mb-1">
                    Confirmar *
                  </label>
                  <input
                    id="confirmar"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    placeholder="Repetir contraseña"
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t border-slate-200" />

            {/* Sección: Datos personales */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Datos Personales
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">DNI *</label>
                  <input
                    type="number"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="12345678"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Av. Siempre Viva 742"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CUIT</label>
                  <input
                    type="text"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                    placeholder="20-12345678-9"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nacimiento</label>
                  <input
                    type="date"
                    value={nacimiento}
                    onChange={(e) => setNacimiento(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Situación Laboral</label>
                  <input
                    type="text"
                    value={situacionLaboral}
                    onChange={(e) => setSituacionLaboral(e.target.value)}
                    placeholder="Empleado"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">perfil_inversor inversor</label>
                  <input
                    type="text"
                    value={perfil_inversor}
                    onChange={(e) => setPerfil(e.target.value)}
                    placeholder="Conservador"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link a login */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-slate-500">
            ¿Ya tenés cuenta?{' '}
            <Link href="/auth/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              Iniciar Sesión
            </Link>
          </p>
          <Link href="/" className="block text-sm text-slate-400 hover:text-emerald-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
