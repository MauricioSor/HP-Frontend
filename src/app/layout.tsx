import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import ConditionalLayout from '@/components/ConditionalLayout';
import { ADSENSE_CLIENT } from '@/lib/adsense';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FinBootcamp - Educación Financiera',
  description: 'Plataforma educativa sobre el mercado financiero argentino. Aprendé a invertir, simulá rendimientos y conocé los instrumentos disponibles.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${fraunces.variable} ${sourceSans.variable} min-h-screen flex flex-col font-sans antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
