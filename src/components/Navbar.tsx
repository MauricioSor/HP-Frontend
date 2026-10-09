'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { irA } from '@/lib/navegacion';
import { Menu, X, TrendingUp, Bitcoin, Calculator, BarChart3, LogOut, Users, User, Sparkles, BookOpen, Briefcase, Compass, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';
import { Logo } from '@/components/Logo';
import { esRolAdministrador } from '@/lib/roles';

const navLinks = [
  { name: 'Mercado', href: '/mercado-bursatil', icon: TrendingUp, soloAdmin: false },
  { name: 'Cripto', href: '/cripto', icon: Bitcoin, soloAdmin: false },
  { name: 'Simulador', href: '/simulador', icon: Calculator, soloAdmin: false },
  { name: 'Cotizaciones', href: '/cotizaciones', icon: BarChart3, soloAdmin: false },
  { name: 'Cartera', href: '/cartera', icon: Briefcase, soloAdmin: false },
  { name: 'Recomendado', href: '/recomendado', icon: Compass, soloAdmin: false },
  { name: 'Perfil', href: '/test-inversor', icon: ClipboardList, soloAdmin: false },
  { name: 'Guías', href: '/guias', icon: BookOpen, soloAdmin: false },
  { name: 'Premium', href: '/suscripcion', icon: Sparkles, soloAdmin: false },
  { name: 'Gestión de usuarios', href: '/admin/usuarios', icon: Users, soloAdmin: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const linksVisibles = navLinks.filter(
    (link) => !link.soloAdmin || esRolAdministrador(user?.rol)
  );

  async function handleLogout() {
    await logout();
    irA('/');
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200/70 bg-[#f7f4ee]/85 shadow-[0_10px_30px_-24px_rgba(18,55,44,0.45)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[4.25rem]">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-3 lg:gap-4 overflow-x-auto">
            {linksVisibles.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 whitespace-nowrap border-b-2 px-0.5 pt-1 text-[13px] font-medium transition-colors',
                    isActive
                      ? 'border-[#12372c] text-[#12372c]'
                      : 'border-transparent text-stone-600 hover:text-[#12372c] hover:border-[#d4af6a]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}

            {/* User info + Logout */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-stone-200">
              <div className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-sm text-stone-500">
                <User className="w-4 h-4" />
                <span className="font-medium text-[#12372c]">{user?.usuario}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {linksVisibles.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-base font-medium border-l-4',
                    isActive
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-600'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile: user info + logout */}
            <div className="border-t border-slate-200 mt-2 pt-2">
              <div className="px-4 py-2 text-sm text-slate-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Sesión: <span className="font-medium text-slate-700">{user?.usuario}</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 border-l-4 border-transparent"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
