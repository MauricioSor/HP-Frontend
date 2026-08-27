'use client';

/**
 * Componente de banner publicitario para Google AdSense.
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Crear cuenta en Google AdSense (https://adsense.google.com)
 * 2. Verificar tu dominio
 * 3. Reemplazar 'ca-pub-XXXXXXXXXX' con tu Publisher ID real
 * 4. Reemplazar los data-ad-slot con los IDs de tus bloques de anuncios
 * 
 * NOTA: En desarrollo, los anuncios no se muestran. Solo funcionan en producción
 * con un dominio verificado y cuenta aprobada.
 */

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Solo cargar ads en producción
    if (process.env.NODE_ENV !== 'production') return;
    if (isAdLoaded.current) return;

    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isAdLoaded.current = true;
    } catch (err) {
      console.error('Error cargando anuncio:', err);
    }
  }, []);

  // En desarrollo, mostrar placeholder
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm ${className}`}
        style={{ minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '100px' }}
      >
        <div className="text-center p-4">
          <p className="font-medium">📢 Espacio publicitario</p>
          <p className="text-xs mt-1">Google AdSense - Slot: {slot}</p>
          <p className="text-xs">(Solo visible en producción)</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // TODO: Reemplazar con tu Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
