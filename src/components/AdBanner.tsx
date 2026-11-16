'use client';

import { useAuth } from '@/components/AuthProvider';
import { esRolAdministrador } from '@/lib/roles';

const SCRIPT_SRC = 'https://bauval.org/21/fb003db01e42b174d9f59d4bd7b31788';
const CONTAINER_ID = 'container-fb003db01e42b174d9f59d4bd7b31788';

const documentoAnuncio = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent}</style></head><body><script async data-cfasync="false" src="${SCRIPT_SRC}"><\/script><div id="${CONTAINER_ID}"></div></body></html>`;

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

function altura(format: AdBannerProps['format']) {
  if (format === 'rectangle') return '300px';
  if (format === 'vertical') return '600px';
  if (format === 'horizontal') return '250px';
  return '280px';
}

export default function AdBanner({ format = 'auto', className = '' }: AdBannerProps) {
  const { user, isLoading } = useAuth();
  const ocultar = isLoading || user?.premium === true || esRolAdministrador(user?.rol);

  if (ocultar) return null;

  return (
    <div className={className}>
      <iframe
        title="Publicidad"
        srcDoc={documentoAnuncio}
        loading="lazy"
        scrolling="no"
        className="block w-full border-0"
        style={{ height: altura(format) }}
      />
    </div>
  );
}
