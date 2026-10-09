'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { ADSENSE_CLIENT, esSlotAdsense } from '@/lib/adsense';
import { esRolAdministrador } from '@/lib/roles';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const { user, isLoading } = useAuth();
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const ocultar = isLoading || user?.premium === true || esRolAdministrador(user?.rol);
  const slotValido = esSlotAdsense(slot);

  useEffect(() => {
    if (ocultar || !slotValido) return;
    if (isAdLoaded.current) return;

    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isAdLoaded.current = true;
    } catch (err) {
      console.error('Error cargando anuncio:', err);
    }
  }, [ocultar, slotValido]);

  if (ocultar) return null;

  if (!slotValido) {
    return (
      <div className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm ${className}`}
        style={{ minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '100px' }}
      >
        <div className="text-center p-4">
          <p className="font-medium">Espacio publicitario</p>
          <p className="text-xs mt-1">Google AdSense - Slot: {slot}</p>
          <p className="text-xs">Visible en el plan libre. Premium no ve este espacio.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
