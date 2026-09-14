'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, TrendingUp, Bitcoin, Calculator, BarChart3, Home, LogOut, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

const navLinks = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Mercado Bursátil', href: '/mercado-bursatil', icon: TrendingUp },
  { name: 'Cripto', href: '/cripto', icon: Bitcoin },
  { name: 'Simulador', href: '/simulador', icon: Calculator },
  { name: 'Cotizaciones', href: '/cotizaciones', icon: BarChart3 },
  { name: 'Usuarios', href: '/admin/usuarios', icon: Users },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-600">📊 FinBootcamp</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-slate-600 hover:text-emerald-600 hover:border-emerald-300'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}

            {/* User info + Logout */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <User className="w-4 h-4" />
                <span className="font-medium text-slate-700">{user?.usuario}</span>
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
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
