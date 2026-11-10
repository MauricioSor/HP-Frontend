'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LineChart, DollarSign, Bitcoin, Clock, Landmark, Building2, Loader2, BookOpen, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

type Simbolo = { proName: string; title: string };

interface CotizacionDolar {
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  descripcion: string;
}

const DOLARES_REFERENCIA: CotizacionDolar[] = [
  {
    casa: 'bolsa',
    nombre: 'Dólar MEP (Bolsa)',
    compra: 1185,
    venta: 1190,
    descripcion: 'Implícito en la compraventa de bonos (ej. AL30 / AL30D) en el mercado local.',
  },
  {
    casa: 'contadoliqui',
    nombre: 'Dólar CCL (Cable)',
    compra: 1205,
    venta: 1212,
    descripcion: 'Referencia para girar divisas al exterior y valuar CEDEARs en pesos.',
  },
  {
    casa: 'oficial',
    nombre: 'Dólar Oficial',
    compra: 1050,
    venta: 1090,
    descripcion: 'Cotización bancaria minorista de referencia regulada por el BCRA.',
  },
  {
    casa: 'blue',
    nombre: 'Dólar Libre / Blue',
    compra: 1200,
    venta: 1220,
    descripcion: 'Cotización informativa del mercado informal extrabursátil.',
  },
];

const criptos: Simbolo[] = [
  { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
  { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
  { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
  { proName: 'BINANCE:BNBUSDT', title: 'BNB' },
  { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
  { proName: 'BINANCE:ADAUSDT', title: 'Cardano' },
  { proName: 'BINANCE:DOGEUSDT', title: 'Dogecoin' },
  { proName: 'BINANCE:AVAXUSDT', title: 'Avalanche' },
  { proName: 'BINANCE:LINKUSDT', title: 'Chainlink' },
  { proName: 'BINANCE:DOTUSDT', title: 'Polkadot' },
];

const bonos: Simbolo[] = [
  { proName: 'BCBA:AL30', title: 'AL30' },
  { proName: 'BCBA:GD30', title: 'GD30' },
  { proName: 'BCBA:AL35', title: 'AL35' },
  { proName: 'BCBA:GD35', title: 'GD35' },
  { proName: 'BCBA:AE38', title: 'AE38' },
  { proName: 'BCBA:GD38', title: 'GD38' },
  { proName: 'BCBA:AL29', title: 'AL29' },
  { proName: 'BCBA:GD41', title: 'GD41' },
];

const acciones: Simbolo[] = [
  { proName: 'BCBA:YPFD', title: 'YPF' },
  { proName: 'BCBA:PAMP', title: 'Pampa' },
  { proName: 'BCBA:LOMA', title: 'Loma Negra' },
  { proName: 'BCBA:GGAL', title: 'Galicia' },
  { proName: 'BCBA:BMA', title: 'Macro' },
  { proName: 'BCBA:ALUA', title: 'Aluar' },
  { proName: 'BCBA:TXAR', title: 'Ternium' },
  { proName: 'BCBA:TECO2', title: 'Telecom' },
  { proName: 'BCBA:CEPU', title: 'Central Puerto' },
  { proName: 'BCBA:SUPV', title: 'Supervielle' },
  { proName: 'BCBA:VIST', title: 'Vista' },
  { proName: 'BCBA:CRES', title: 'Cresud' },
];

const cedears: Simbolo[] = [
  { proName: 'BCBA:MELI', title: 'Mercado Libre' },
  { proName: 'BCBA:NVDA', title: 'Nvidia' },
  { proName: 'BCBA:AMZN', title: 'Amazon' },
  { proName: 'BCBA:AAPL', title: 'Apple' },
  { proName: 'BCBA:GOOGL', title: 'Google' },
  { proName: 'BCBA:MSFT', title: 'Microsoft' },
  { proName: 'BCBA:TSLA', title: 'Tesla' },
  { proName: 'BCBA:META', title: 'Meta' },
  { proName: 'BCBA:NFLX', title: 'Netflix' },
  { proName: 'BCBA:KO', title: 'Coca-Cola' },
];

function formatearPesos(valor: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 2,
  }).format(valor);
}

function SpinnerCarga() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-800">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" aria-hidden />
      <span className="text-sm text-slate-500">Cargando cotizaciones...</span>
    </div>
  );
}

function observarWidget(nodo: HTMLElement, alListo: () => void) {
  let listo = false;
  const terminar = () => {
    if (listo) return;
    listo = true;
    alListo();
  };

  const vigilar = (iframe: HTMLIFrameElement) => {
    if (iframe.dataset.vigilado === '1') return;
    iframe.dataset.vigilado = '1';
    const alCargar = () => {
      try {
        if (iframe.contentDocument?.URL === 'about:blank') return;
      } catch {
        // El documento de TradingView es de otro origen: el widget ya cargó.
      }
      iframe.removeEventListener('load', alCargar);
      terminar();
    };
    iframe.addEventListener('load', alCargar);
  };

  nodo.querySelectorAll('iframe').forEach((iframe) => vigilar(iframe));
  const observador = new MutationObserver(() => {
    nodo.querySelectorAll('iframe').forEach((iframe) => vigilar(iframe));
  });
  observador.observe(nodo, { childList: true, subtree: true });
  const tope = window.setTimeout(terminar, 15000);

  return () => {
    observador.disconnect();
    window.clearTimeout(tope);
  };
}

function CintaCotizaciones({ simbolos }: { simbolos: Simbolo[] }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    if (!nodo.querySelector('script, iframe')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: simbolos,
        colorTheme: 'light',
        isTransparent: true,
        showSymbolLogo: true,
        displayMode: 'adaptive',
        locale: 'es',
      });
      nodo.appendChild(script);
    }

    return observarWidget(nodo, () => setListo(true));
  }, [simbolos]);

  return (
    <div className="space-y-3">
      <div className="relative min-h-28 w-full" aria-busy={!listo}>
        {!listo && <SpinnerCarga />}
        <div className="min-h-28 w-full" ref={contenedor} />
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {simbolos.map((s) => (
          <span
            key={s.proName}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
          >
            {s.title} ({s.proName.split(':')[1]})
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CotizacionesCliente() {
  const mervalRef = useRef<HTMLDivElement>(null);
  const [mervalListo, setMervalListo] = useState(false);
  const [dolares, setDolares] = useState<CotizacionDolar[]>(DOLARES_REFERENCIA);
  const [fuenteEnVivo, setFuenteEnVivo] = useState(false);

  useEffect(() => {
    let activo = true;
    fetch('https://dolarapi.com/v1/dolares')
      .then((res) => (res.ok ? res.json() : null))
      .then((lista: Array<{ casa?: string; compra?: number; venta?: number }> | null) => {
        if (!activo || !Array.isArray(lista)) return;
        setDolares((prev) =>
          prev.map((item) => {
            const encontrado = lista.find((d) => d.casa === item.casa);
            if (
              encontrado &&
              typeof encontrado.compra === 'number' &&
              encontrado.compra > 0 &&
              typeof encontrado.venta === 'number' &&
              encontrado.venta > 0
            ) {
              return { ...item, compra: encontrado.compra, venta: encontrado.venta };
            }
            return item;
          })
        );
        setFuenteEnVivo(true);
      })
      .catch(() => {
        // Mantiene valores de referencia educativa si no hay conexión
      });

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const nodo = mervalRef.current;
    if (!nodo) return;

    if (!nodo.querySelector('script, iframe')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: 'INDEX:MERV',
        width: '100%',
        height: '100%',
        locale: 'es',
        dateRange: '1M',
        colorTheme: 'light',
        isTransparent: true,
        autosize: true,
        largeChartUrl: '',
      });
      nodo.appendChild(script);
    }

    return observarWidget(nodo, () => setMervalListo(true));
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="mb-4 flex items-center justify-center text-3xl font-bold text-slate-900 dark:text-white md:justify-start md:text-4xl">
          <LineChart className="mr-3 h-8 w-8 text-blue-600" />
          Cotizaciones del Mercado Argentino y Cripto
        </h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          Seguí la pizarra de bonos soberanos, acciones del panel líder (S&amp;P Merval), CEDEARs operados en BYMA,
          tipos de cambio de referencia y principales criptomonedas.
        </p>
        <div className="mt-4 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-400">
          <Clock className="mr-2 h-4 w-4" />
          Los precios de mercado provistos por TradingView pueden presentar un retraso de hasta 15 minutos
        </div>
      </div>

      <AdBanner slot="cotizaciones-horizontal" format="horizontal" className="mb-8" />

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="flex h-[420px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-2 flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <LineChart className="mr-2 h-6 w-6 text-blue-600" />
            Índice S&amp;P Merval
          </h2>
          <p className="mb-4 text-xs text-slate-500">
            Mide la evolución en pesos de la canasta de acciones más líquidas de Bolsas y Mercados Argentinos (BYMA).
          </p>
          <div className="relative min-h-0 w-full flex-1" aria-busy={!mervalListo}>
            {!mervalListo && <SpinnerCarga />}
            <div className="h-full w-full" ref={mervalRef} />
          </div>
        </section>

        <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center text-xl font-bold text-slate-900 dark:text-white">
                <DollarSign className="mr-2 h-6 w-6 text-emerald-600" />
                Tipos de Cambio (Referencia)
              </h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                {fuenteEnVivo ? 'Cotización actualizada' : 'Referencia educativa'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {dolares.map((dolar) => (
                <div
                  key={dolar.casa}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {dolar.nombre}
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-slate-400">Compra</span>
                      <span className="text-lg font-bold tabular-nums text-slate-700 dark:text-slate-300">
                        {formatearPesos(dolar.compra)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] uppercase tracking-wider text-emerald-700">Venta</span>
                      <span className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
                        {formatearPesos(dolar.venta)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-slate-500">{dolar.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-xs italic text-slate-400">
            Valores orientativos con fines estrictamente informativos y pedagógicos.
          </p>
        </section>
      </div>

      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-2 flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <Bitcoin className="mr-2 h-6 w-6 text-amber-500" />
            Criptomonedas (Par USDT)
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Principales criptoactivos por capitalización de mercado expresados en dólares digitales (USDT). Operan las
            24 horas, los 7 días de la semana.
          </p>
          <CintaCotizaciones simbolos={criptos} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-2 flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <Landmark className="mr-2 h-6 w-6 text-emerald-700" />
            Bonos soberanos argentinos
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Títulos públicos en dólares: Bonares (AL29, AL30, AL35, AE38) bajo ley argentina y Globales (GD30, GD35,
            GD38, GD41) bajo ley de Nueva York. Su relación de precio contra la especie &ldquo;D&rdquo; determina el Dólar MEP.
          </p>
          <CintaCotizaciones simbolos={bonos} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-2 flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <Building2 className="mr-2 h-6 w-6 text-blue-700" />
            Acciones argentinas (Panel Líder BYMA)
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Compañías locales de energía, bancos, industria y servicios públicos que integran el índice S&amp;P Merval y
            se negocian directamente en pesos en la Bolsa de Comercio de Buenos Aires.
          </p>
          <CintaCotizaciones simbolos={acciones} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="mb-2 flex items-center text-xl font-bold text-slate-900 dark:text-white">
            <LineChart className="mr-2 h-6 w-6 text-violet-600" />
            CEDEARs (Empresas Internacionales en BYMA)
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Certificados de Depósito Argentinos que representan fracciones de acciones que cotizan en Wall Street
            (NYSE/Nasdaq). Su precio en pesos varía según la acción original en EE.UU. y el tipo de cambio CCL.
          </p>
          <CintaCotizaciones simbolos={cedears} />
        </section>
      </div>

      {/* Guía rápida de lectura de pizarras */}
      <section className="mt-10 rounded-2xl border border-stone-200 bg-white/90 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-medium text-[#12372c]">
          <BookOpen className="h-6 w-6 text-emerald-700" />
          ¿Cómo leer las cotizaciones en el mercado argentino?
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-[#12372c]">Especies en Pesos, MEP (D) y Cable (C)</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              En BYMA, un mismo bono o CEDEAR puede tener tres códigos: el ticker base (ej. <strong>AL30</strong>) opera
              en pesos argentinos; el sufijo <strong>D</strong> (<strong>AL30D</strong>) opera en dólares locales (MEP);
              y el sufijo <strong>C</strong> (<strong>AL30C</strong>) liquida en dólares en el exterior (CCL).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#12372c]">Precio cada 100 nominales</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              Los bonos soberanos y las LECAPs suelen mostrar su precio en las pizarras por lámina de{' '}
              <strong>100 valores nominales (VN)</strong>, aunque podés comprar desde 1 valor nominal en tu broker.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#12372c]">Plazo de liquidación (T+1 / Contado Inmediato)</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              En el mercado argentino el plazo estándar de liquidación es <strong>T+1 (24 horas hábiles)</strong>,
              además de la rueda de Contado Inmediato (T+0) donde el dinero y los títulos se acreditan en el día.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 border-t border-stone-100 pt-5 text-sm">
          <Link href="/glosario" className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:underline">
            Consultar términos en el Glosario Financiero
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/guias/bonos-soberanos" className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:underline">
            Ver guía completa de Bonos Soberanos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AdBanner slot="cotizaciones-cierre" format="horizontal" className="mt-8" />
    </div>
  );
}
