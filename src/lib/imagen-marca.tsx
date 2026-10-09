import { ImageResponse } from 'next/og'

function Marca({ tamano }: { tamano: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="9" fill="#12372c" />
      <path
        d="M7.5 21.5c3.2-.4 5.2-6.2 8.2-6.2 2.4 0 3.3 3.6 6.1-5.6"
        fill="none"
        stroke="#f4f1ea"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="23.6" cy="8.2" r="1.7" fill="#6ee7b7" />
    </svg>
  )
}

export function imagenIcono(tamano: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#12372c',
        }}
      >
        <Marca tamano={tamano} />
      </div>
    ),
    { width: tamano, height: tamano }
  )
}

export function imagenTarjeta(ancho: number, alto: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#12372c',
          padding: '72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 220,
            height: 220,
            borderRadius: 48,
            overflow: 'hidden',
          }}
        >
          <Marca tamano={220} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 56,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 86,
              color: '#f4f1ea',
              letterSpacing: '-0.04em',
            }}
          >
            FinBootcamp
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontSize: 34,
              color: '#d4af6a',
            }}
          >
            Educación financiera
          </div>
        </div>
      </div>
    ),
    { width: ancho, height: alto }
  )
}
