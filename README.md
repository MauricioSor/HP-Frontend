# 📊 FinBootcamp — Plataforma de Educación Financiera

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Plataforma web educativa tipo bootcamp para aprender sobre el mercado financiero argentino: instrumentos bursátiles, criptomonedas, simulador de inversiones e información impositiva.

## 🚀 Demo

[Visitar FinBootcamp](https://finbootcamp.vercel.app) _(Próximamente)_

## 📋 Características

### MVP
- **📈 Catálogo de Instrumentos Bursátiles** — Bonos, LECAPs, CEDEARs, Acciones, ETFs, FCIs, Cauciones y Licitaciones
- **₿ Educación Cripto** — Fundamentos de Bitcoin, minado, FOMO, quemado de monedas y memecoins
- **💰 Información Impositiva** — Tratamiento fiscal de cada instrumento (Ganancias, Bienes Personales, ITF)
- **🧮 Simulador de Inversión** — Calculá rendimientos con interés compuesto, elegí plazos y compará escenarios

### Extras
- **📊 Cotizaciones en Tiempo Real** — Widgets de TradingView integrados (MERVAL, Criptos, Dólar)
- **📢 Monetización con Google AdSense** — Modelo freemium con espacios publicitarios
- **🔐 Sistema de Usuarios** — Autenticación con Firebase _(planificado)_
- **⭐ Plan VIP** — Sin anuncios + features premium _(planificado)_

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| [Next.js 16](https://nextjs.org/) | Framework fullstack con SSR y generación estática |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos utility-first |
| [Recharts](https://recharts.org/) | Gráficos interactivos del simulador |
| [Lucide React](https://lucide.dev/) | Iconos |
| [TradingView Widgets](https://www.tradingview.com/widget/) | Gráficos de cotizaciones |
| [Vercel](https://vercel.com/) | Deploy y hosting |

## 📁 Estructura del Proyecto

```
finbootcamp/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx            # Landing page
│   │   ├── mercado-bursatil/   # Instrumentos bursátiles
│   │   ├── cripto/             # Educación cripto
│   │   ├── simulador/          # Simulador interactivo
│   │   └── cotizaciones/       # Widgets TradingView
│   ├── components/             # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AdBanner.tsx        # Google AdSense
│   ├── data/                   # Datos estáticos
│   │   ├── instruments.ts      # 8 instrumentos bursátiles
│   │   ├── crypto-topics.ts    # 6 temas cripto
│   │   └── tax-info.ts         # Información impositiva
│   └── lib/                    # Lógica de negocio
│       ├── simulator.ts        # Motor del simulador
│       └── utils.ts            # Utilidades
└── public/                     # Assets estáticos
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/finbootcamp.git
cd finbootcamp

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Análisis de código con ESLint |

## 📊 Modelo de Negocio

### Freemium + AdSense
- **Plan Gratuito**: Acceso completo al contenido educativo con anuncios de Google AdSense
- **Plan VIP** _(futuro)_: Sin anuncios + features premium (alertas, bot de licitaciones)

### Proyección de ingresos AdSense

| Visitas/mes | CPC Promedio | Ingreso estimado |
|:-----------:|:------------:|:----------------:|
| 500-1,000 | ~$0.50 USD | $2-5 USD |
| 5,000-10,000 | ~$0.50 USD | $25-50 USD |
| 10,000+ | ~$0.50 USD | $50-150 USD |

## 📖 Disclaimer

> La información proporcionada por FinBootcamp es exclusivamente con fines educativos y no constituye asesoramiento financiero, fiscal ni de inversión. Siempre consultá con un profesional matriculado antes de tomar decisiones de inversión.

## 👤 Autor

**[Tu Nombre]** — Proyecto Final para Analista de Sistemas de Información

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
