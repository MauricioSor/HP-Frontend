'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { irA } from '@/lib/navegacion';
import {
  Menu,
  X,
  TrendingUp,
  Bitcoin,
  Calculator,
  BarChart3,
  LogOut,
  Users,
  Sparkles,
  BookOpen,
  Briefcase,
  Compass,
  ClipboardList,
} from 'lucide-react';
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

function estaActivo(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const linksVisibles = navLinks.filter(
    (link) => !link.soloAdmin || esRolAdministrador(user?.rol)
  );
  const linksPrincipales = linksVisibles.filter((link) => !link.soloAdmin);
  const linkAdmin = linksVisibles.find((link) => link.soloAdmin);

  const inicial = (user?.usuario ?? '?').trim().charAt(0).toUpperCase() || '?';

  async function handleLogout() {
    await logout();
    irA('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="border-b border-white/70 bg-white/70 shadow-[0_12px_40px_-28px_rgba(18,55,44,0.6)] backdrop-blur-xl">
        {/* Filo dorado superior */}
        <div className="h-[3px] bg-gradient-to-r from-[#12372c] via-[#d4af6a] to-[#12372c]" />

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Logo className="shrink-0" />

            {/* Desktop: todos los links visibles */}
            <div className="hidden min-w-0 items-center gap-0.5 rounded-full bg-[#12372c]/[0.06] p-1 ring-1 ring-[#12372c]/10 lg:flex">
              {linksPrincipales.map((link) => {
                const activo = estaActivo(pathname, link.href);
                const Icon = link.icon;
                const premium = link.href === '/suscripcion';
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={activo ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[13px] font-semibold transition-all xl:px-3.5',
                      activo
                        ? 'bg-[#12372c] text-[#f4f1ea] shadow-[0_6px_16px_-8px_rgba(18,55,44,0.9)]'
                        : premium
                          ? 'text-[#8a6420] hover:bg-[#d4af6a]/25'
                          : 'text-stone-600 hover:bg-white hover:text-[#12372c] hover:shadow-sm'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        premium && !activo ? 'inline text-[#c99a45]' : 'hidden 2xl:inline'
                      )}
                    />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop: usuario */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              {linkAdmin && (
                <Link
                  href={linkAdmin.href}
                  title={linkAdmin.name}
                  aria-label={linkAdmin.name}
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-full border transition-colors',
                    estaActivo(pathname, linkAdmin.href)
                      ? 'border-[#12372c] bg-[#12372c] text-[#f4f1ea]'
                      : 'border-stone-200 bg-white/70 text-stone-600 hover:border-[#d4af6a] hover:text-[#12372c]'
                  )}
                >
                  <linkAdmin.icon className="h-4 w-4" />
                </Link>
              )}

              <div className="flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/70 py-1 pl-1 pr-1 xl:pr-1.5">
                <span
                  className={cn(
                    'h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#12372c] to-[#2e8a69] text-xs font-bold text-[#f4f1ea]',
                    linkAdmin ? 'hidden xl:grid' : 'grid'
                  )}
                >
                  {inicial}
                </span>
                <span className="hidden max-w-[7rem] truncate text-sm font-semibold text-[#12372c] xl:block">
                  {user?.usuario}
                </span>
                <button
                  onClick={handleLogout}
                  className="grid h-7 w-7 place-items-center rounded-full text-stone-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile: botón de menú */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
              className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/80 p-2.5 text-[#12372c] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 lg:hidden"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile: panel */}
      {isOpen && (
        <div
          id="menu-movil"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-4.5rem)] overflow-y-auto rounded-b-[2rem] border-b border-white/70 bg-white/90 px-4 pb-5 pt-4 shadow-[0_30px_60px_-30px_rgba(18,55,44,0.6)] backdrop-blur-xl lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {linksVisibles.map((link) => {
              const activo = estaActivo(pathname, link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-sm font-semibold transition-colors',
                    activo
                      ? 'border-[#12372c] bg-[#12372c] text-[#f4f1ea]'
                      : 'border-stone-200/80 bg-white text-stone-700 hover:border-[#d4af6a] hover:text-[#12372c]'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', activo ? 'text-[#d4af6a]' : 'text-emerald-700')} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-[#12372c]/[0.06] p-3 ring-1 ring-[#12372c]/10">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#12372c] to-[#2e8a69] font-bold text-[#f4f1ea]">
                {inicial}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Sesión iniciada</p>
                <p className="truncate font-semibold text-[#12372c]">{user?.usuario}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-600 ring-1 ring-rose-100 transition hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
