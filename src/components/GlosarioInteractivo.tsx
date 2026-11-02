'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import {
  terminosGlosario,
  categoriasGlosario,
  type CategoriaGlosario,
} from '@/data/glosario';
import { cn } from '@/lib/utils';

export default function GlosarioInteractivo() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaGlosario | 'todas'>('todas');

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return terminosGlosario.filter((item) => {
      if (categoriaActiva !== 'todas' && item.categoria !== categoriaActiva) {
        return false;
      }
      if (!q) return true;
      return (
        item.termino.toLowerCase().includes(q) ||
        (item.sigla?.toLowerCase().includes(q) ?? false) ||
        item.definicionCorta.toLowerCase().includes(q) ||
        item.explicacion.toLowerCase().includes(q)
      );
    });
  }, [busqueda, categoriaActiva]);

  return (
    <div className="space-y-8">
      {/* Barra de búsqueda y filtros */}
      <div className="rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-5 shadow-[0_20px_50px_-38px_rgba(18,55,44,0.45)] sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por sigla o concepto (ej: TNA, MEP, TIR, Paridad, LECAP, UVA, CEDEAR)..."
            aria-label="Buscar término financiero"
            className="w-full rounded-2xl border border-stone-200 bg-[#faf7f1] py-3.5 pl-12 pr-4 text-sm text-stone-900 placeholder-stone-400 transition focus:border-[#12372c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#12372c]/15"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoriaActiva('todas')}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition',
              categoriaActiva === 'todas'
                ? 'bg-[#12372c] text-[#f4f1ea]'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-[#12372c]'
            )}
          >
            Todos ({terminosGlosario.length})
          </button>
          {categoriasGlosario.map((cat) => {
            const cantidad = terminosGlosario.filter((t) => t.categoria === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoriaActiva(cat.id)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition',
                  categoriaActiva === cat.id
                    ? 'bg-[#12372c] text-[#f4f1ea]'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-[#12372c]'
                )}
              >
                {cat.nombre} ({cantidad})
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de términos */}
      {filtrados.length === 0 ? (
        <div className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-10 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-stone-400" />
          <h2 className="text-xl font-medium text-[#12372c]">No encontramos ese término</h2>
          <p className="mt-2 text-sm text-stone-600">
            Probá buscando con otra palabra clave o seleccionando &ldquo;Todos&rdquo; en las categorías.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtrados.map((item) => {
            const nombreCat =
              categoriasGlosario.find((c) => c.id === item.categoria)?.nombre ?? item.categoria;
            return (
              <article
                key={item.slug}
                id={item.slug}
                className="flex flex-col justify-between rounded-[1.8rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-38px_rgba(18,55,44,0.45)] transition hover:border-[#d4af6a]"
              >
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {nombreCat}
                    </span>
                    {item.sigla && (
                      <span className="rounded-lg border border-stone-200 bg-[#faf7f1] px-2.5 py-1 font-mono text-xs font-bold text-[#12372c]">
                        {item.sigla}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-medium text-[#12372c]">{item.termino}</h2>
                  <p className="mt-2 font-medium text-stone-800">{item.definicionCorta}</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.explicacion}</p>

                  {item.ejemplo && (
                    <div className="mt-4 rounded-2xl border border-stone-200/80 bg-[#faf7f1] p-4 text-xs leading-relaxed text-stone-700">
                      <strong className="font-semibold text-[#12372c]">Ejemplo práctico: </strong>
                      {item.ejemplo}
                    </div>
                  )}
                </div>

                {item.linkRelacionado && (
                  <div className="mt-5 border-t border-stone-100 pt-4">
                    <Link
                      href={item.linkRelacionado.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 transition hover:text-[#12372c]"
                    >
                      {item.linkRelacionado.etiqueta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
