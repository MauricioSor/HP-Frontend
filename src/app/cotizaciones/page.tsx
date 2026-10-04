'use client';

import { useEffect, useRef, useState } from 'react';
import { LineChart, DollarSign, Bitcoin, Clock, Landmark, Building2, Loader2 } from 'lucide-react';

type Simbolo = { proName: string; title: string };

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
    <div className="relative min-h-28 w-full" aria-busy={!listo}>
      {!listo && <SpinnerCarga />}
      <div className="min-h-28 w-full" ref={contenedor} />
    </div>
  );
}

export default function CotizacionesPage() {
  const mervalRef = useRef<HTMLDivElement>(null);
  const [mervalListo, setMervalListo] = useState(false);

  useEffect(() => {
    const nodo = mervalRef.current;
    if (!nodo) return;

    if (!nodo.querySelector('script, iframe')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: 'BCBA:IMV',
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center md:justify-start">
          <LineChart className="w-8 h-8 mr-3 text-blue-600" />
          Cotizaciones en Tiempo Real
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Datos provistos por TradingView. Bonos, acciones y CEDEARs cotizan en BYMA.
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm border border-amber-200 dark:border-amber-800/50">
          <Clock className="w-4 h-4 mr-2" />
          Los datos pueden tener un retraso de hasta 15 minutos
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[400px]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <LineChart className="w-6 h-6 mr-2 text-blue-600" />
            Índice Merval (Mercado Argentino)
          </h2>
          <div className="relative min-h-0 w-full flex-1" aria-busy={!mervalListo}>
            {!mervalListo && <SpinnerCarga />}
            <div className="h-full w-full" ref={mervalRef} />
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-emerald-600" />
            Tipos de Cambio (Referencia)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">Dólar MEP</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">---.--</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">Dólar CCL</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">---.--</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">Dólar Blue</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">---.--</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">Dólar Oficial</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">---.--</span>
            </div>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4 italic">Cotizaciones simuladas - Referencia educativa</p>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Bitcoin className="w-6 h-6 mr-2 text-amber-500" />
            Criptomonedas
          </h2>
          <CintaCotizaciones simbolos={criptos} />
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
            <Landmark className="w-6 h-6 mr-2 text-emerald-700" />
            Bonos soberanos
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Bonares (AL) en legislación local y Globales (GD) en legislación extranjera.
          </p>
          <CintaCotizaciones simbolos={bonos} />
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-blue-700" />
            Acciones argentinas
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            YPF, Pampa Energía y Loma Negra cotizan como acciones locales, no como CEDEARs.
          </p>
          <CintaCotizaciones simbolos={acciones} />
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
            <LineChart className="w-6 h-6 mr-2 text-violet-600" />
            CEDEARs
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Certificados que representan acciones del exterior y se operan en pesos en BYMA.
          </p>
          <CintaCotizaciones simbolos={cedears} />
        </section>
      </div>
    </div>
  );
}
