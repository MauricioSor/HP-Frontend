'use client';

import { useEffect, useRef } from 'react';
import { LineChart, DollarSign, Bitcoin, Clock } from 'lucide-react';

export default function CotizacionesPage() {
  const mervalRef = useRef<HTMLDivElement>(null);
  const cryptoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject TradingView Widget - MERVAL
    if (mervalRef.current && mervalRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": "BCBA:IMV",
        "width": "100%",
        "height": "100%",
        "locale": "es",
        "dateRange": "1M",
        "colorTheme": "light",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": ""
      });
      mervalRef.current.appendChild(script);
    }

    // Inject TradingView Widget - Crypto
    if (cryptoRef.current && cryptoRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "BINANCE:BTCUSDT", "title": "Bitcoin" },
          { "proName": "BINANCE:ETHUSDT", "title": "Ethereum" },
          { "proName": "BINANCE:SOLUSDT", "title": "Solana" }
        ],
        "colorTheme": "light",
        "isTransparent": true,
        "showSymbolLogo": true,
        "locale": "es"
      });
      cryptoRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center md:justify-start">
          <LineChart className="w-8 h-8 mr-3 text-blue-600" />
          Cotizaciones en Tiempo Real
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Datos provistos por TradingView.
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm border border-amber-200 dark:border-amber-800/50">
          <Clock className="w-4 h-4 mr-2" />
          Los datos pueden tener un retraso de hasta 15 minutos
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mercado Argentino */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[400px]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <LineChart className="w-6 h-6 mr-2 text-blue-600" />
            Índice Merval (Mercado Argentino)
          </h2>
          <div className="flex-grow w-full relative" ref={mervalRef} />
        </section>

        <div className="space-y-8">
          {/* Criptomonedas */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Bitcoin className="w-6 h-6 mr-2 text-amber-500" />
              Criptomonedas Principales
            </h2>
            <div className="w-full relative h-[100px]" ref={cryptoRef} />
          </section>

          {/* Dólar Placeholder Cards */}
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
      </div>
    </div>
  );
}
