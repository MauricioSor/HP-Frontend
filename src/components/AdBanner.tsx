'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { esRolAdministrador } from '@/lib/roles';

const SCRIPT_SRC = 'https://bauval.org/21/fb003db01e42b174d9f59d4bd7b31788';
const CONTAINER_ID = 'container-fb003db01e42b174d9f59d4bd7b31788';
let espacioReclamado = false;

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

function alturaMinima(format: AdBannerProps['format']) {
  if (format === 'rectangle') return '250px';
  if (format === 'horizontal') return '90px';
  return '100px';
}

export default function AdBanner({ format = 'auto', className = '' }: AdBannerProps) {
  const { user, isLoading } = useAuth();
  const ocultar = isLoading || user?.premium === true || esRolAdministrador(user?.rol);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (ocultar) {
      setMostrar(false);
      return;
    }
    if (espacioReclamado || document.getElementById(CONTAINER_ID)) return;
    espacioReclamado = true;
    setMostrar(true);
    return () => {
      espacioReclamado = false;
    };
  }, [ocultar]);

  useEffect(() => {
    if (!mostrar) return;
    const contenedor = document.getElementById(CONTAINER_ID);
    if (!contenedor) return;
    if (contenedor.previousElementSibling?.getAttribute('src') === SCRIPT_SRC) return;

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.dataset.cfasync = 'false';
    contenedor.parentElement?.insertBefore(script, contenedor);
  }, [mostrar]);

  if (ocultar || !mostrar) return null;

  return (
    <div className={className} style={{ minHeight: alturaMinima(format) }}>
      <div id={CONTAINER_ID} />
    </div>
  );
}
