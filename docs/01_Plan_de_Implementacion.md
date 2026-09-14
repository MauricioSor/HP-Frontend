---
pdf_options:
  format: A4
  margin: 25mm 20mm
  printBackground: true
  headerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;">FinBootcamp — Proyecto Final | Analista de Sistemas de Información</div>'
  footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  displayHeaderFooter: true
stylesheet: 
body_class: markdown-body
---

<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; line-height: 1.6; }
  h1 { color: #059669; border-bottom: 3px solid #059669; padding-bottom: 8px; font-size: 28px; }
  h2 { color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 30px; font-size: 22px; }
  h3 { color: #334155; margin-top: 20px; font-size: 18px; }
  table { border-collapse: collapse; width: 100%; margin: 15px 0; font-size: 13px; }
  th { background-color: #f1f5f9; color: #334155; padding: 10px 12px; text-align: left; border: 1px solid #e2e8f0; font-weight: 600; }
  td { padding: 8px 12px; border: 1px solid #e2e8f0; }
  tr:nth-child(even) { background-color: #f8fafc; }
  code { background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 12px; color: #059669; }
  pre { background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; font-size: 12px; overflow-x: auto; }
  blockquote { border-left: 4px solid #059669; padding: 12px 16px; background: #f0fdf4; margin: 16px 0; color: #166534; }
  .page-break { page-break-after: always; }
</style>

# FinBootcamp — Plataforma de Educación Financiera

**Proyecto Final — Analista de Sistemas de Información**  
**Fecha:** Agosto 2026  
**Autor:** [Tu Nombre]

---

## 1. Visión General del Proyecto

### 1.1 Problema que resuelve
En Argentina, la educación financiera es escasa. La mayoría de las personas desconocen los instrumentos de inversión disponibles (bonos, LECAPs, CEDEARs, etc.), sus implicancias impositivas, y cómo simular rendimientos antes de invertir. Esta plataforma centraliza información educativa, impositiva y simulación en un solo lugar.

### 1.2 Propuesta de valor

| Aspecto | Descripción |
|---------|-------------|
| **Público objetivo** | Jóvenes argentinos (18-35) interesados en invertir por primera vez |
| **Diferenciador** | Combina educación + información fiscal + simulación en una sola app |
| **Modelo** | Freemium: acceso gratuito con ads + plan VIP sin ads con features extra |

---

## 2. Análisis de Requerimientos

### 2.1 Requerimientos Funcionales — MVP

| ID | Requerimiento | Descripción | Prioridad |
|----|--------------|-------------|-----------|
| RF01 | Catálogo de instrumentos bursátiles | Listado navegable de: Bonos, LECAPs, CEDEARs, Acciones, ETFs, FCIs, Cauciones, Licitaciones | 🔴 Alta |
| RF02 | Catálogo de instrumentos cripto | Sección dedicada a: Principales criptos, Fundamentos BTC, Minado, FOMO, Quemado, Memecoins | 🔴 Alta |
| RF03 | Resumen educativo por instrumento | Cada instrumento muestra: qué es, cómo funciona, riesgo, horizonte de inversión, ejemplo práctico | 🔴 Alta |
| RF04 | Información impositiva | Panel por instrumento: Ganancias, Bienes Personales, ITF, IVA, IIBB según tipo | 🔴 Alta |
| RF05 | Simulador de inversión | Ingreso de capital, selección de instrumento, plazo temporal → cálculo de rendimiento con interés compuesto | 🔴 Alta |

### 2.2 Requerimientos Funcionales — Extras

| ID | Requerimiento | Descripción | Prioridad |
|----|--------------|-------------|-----------|
| RE01 | Cotización en tiempo real | Consumir APIs / widgets TradingView para mostrar precios actuales | 🟡 Media |
| RE02 | Datos históricos / TradingView | Incrustar widgets de TradingView para gráficos de cotización | 🟡 Media |
| RE03 | Base de datos de usuarios | Sistema de registro/login con Firebase Auth + Firestore | 🟡 Media |
| RE04 | Plan de suscripción VIP | Tier sin anuncios con: info extra, acceso anticipado, alertas por mail | 🟠 Baja |
| RE05 | Anuncios con Google Ads | Integración de Google AdSense para monetización | 🟡 Media |

### 2.3 Requerimientos No Funcionales

| ID | Requerimiento | Descripción |
|----|--------------|-------------|
| RNF01 | Responsive Design | Funcionar en desktop, tablet y mobile |
| RNF02 | Performance | Carga inicial < 3 segundos |
| RNF03 | Accesibilidad | Estándares básicos WCAG 2.1 |
| RNF04 | SEO | Metadata, Open Graph tags, sitemap |
| RNF05 | Seguridad | HTTPS, sanitización de inputs, autenticación segura |

<div class="page-break"></div>

## 3. Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend** | Next.js 16 (React) | SSR para SEO, App Router, componentes reutilizables |
| **Estilos** | Tailwind CSS 4 | Desarrollo rápido, diseño profesional, responsive |
| **Auth** | Firebase Authentication | Gratis hasta 50K MAU, Google/Email login |
| **Base de datos** | Cloud Firestore | NoSQL, gratis (Spark plan), tiempo real |
| **Gráficos** | Recharts | Simulador de rendimientos, gráficos interactivos |
| **Deploy** | Vercel (free tier) | Deploy automático, dominio gratuito |
| **APIs crypto** | CoinGecko API (free) | Cotizaciones cripto sin API key |
| **Gráficos bursátiles** | TradingView Widgets | Embed gratuito copy-paste |

### Arquitectura del Sistema

```
┌─────────────────────────────────────────────────┐
│               CLIENTE (Browser)                  │
├─────────────────────────────────────────────────┤
│           Next.js Frontend + SSR/SSG             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ React UI │ │ Recharts │ │ TradingView      │ │
│  │ Tailwind │ │ Charts   │ │ Widgets          │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
├─────────────────────────────────────────────────┤
│  Firebase Auth │ Firestore DB │ Google AdSense   │
├─────────────────────────────────────────────────┤
│              Vercel (Hosting)                    │
└─────────────────────────────────────────────────┘
```

<div class="page-break"></div>

## 4. Análisis de Dificultad por Feature

### 4.1 Matriz de Dificultad — MVP

| Feature | Dificultad | Esfuerzo | Complejidad | Notas |
|---------|:----------:|:--------:|:-----------:|-------|
| Catálogo bursátil | 🟢 Fácil | 8-12 hs | Baja | Contenido estático/JSON, cards |
| Catálogo cripto | 🟢 Fácil | 6-8 hs | Baja | Similar al bursátil |
| Resumen educativo | 🟢 Fácil | 10-15 hs | Baja | Redacción + componentes UI |
| Info impositiva | 🟡 Medio | 8-12 hs | Media | Investigar normativa vigente |
| Simulador inversión | 🟡 Medio | 15-20 hs | Media | Fórmulas, gráficos, validaciones |

**Total MVP estimado: 47-67 horas**

### 4.2 Matriz de Dificultad — Extras

| Feature | Dificultad | Esfuerzo | Riesgo | Notas |
|---------|:----------:|:--------:|:------:|-------|
| Cotización real (APIs) | 🔴 Difícil | 20-30 hs | ⚠️ Alto | Solo IOL tiene API pública |
| TradingView embed | 🟢 Fácil | 3-5 hs | ✅ Bajo | Copy-paste de widgets |
| BD usuarios (Firebase) | 🟡 Medio | 12-18 hs | ✅ Bajo | Bien documentado, gratis |
| Plan VIP (suscripción) | 🔴 Difícil | 25-35 hs | ⚠️ Medio | Requiere pasarela de pago |
| Google AdSense | 🟡 Medio | 5-8 hs | ⚠️ Medio | Requiere aprobación de Google |

**Total Extras estimado: 65-96 horas**

### ⚠️ APIs de Brokers — Hallazgo Crítico

- **IOL (InvertirOnline):** Tiene API con OAuth2, pero requiere credenciales reales.
- **Balanz:** ❌ NO tiene API pública para clientes minoristas.
- **Bull Market:** ❌ NO tiene API oficial. Solo scrapers no oficiales.

**Alternativa implementada:** Widgets gratuitos de TradingView + CoinGecko API para cripto.

<div class="page-break"></div>

## 5. Monetización con Google AdSense

### 5.1 Viabilidad

| Criterio | Estado | Detalle |
|----------|:------:|---------|
| Contenido original y de valor | ✅ Viable | Contenido educativo financiero |
| Dominio propio | ⚠️ Requerido | ~$5 USD/año (.com.ar) |
| Páginas legales | ✅ Fácil | Privacidad, contacto, "acerca de" |
| 15-20 artículos mínimo | ✅ Natural | Cada instrumento = 1 artículo |
| Tráfico mínimo | ⚠️ Desafío | Se recomienda tráfico orgánico constante |

### 5.2 Proyección de Ingresos

| Escenario | Visitas/mes | CPC Promedio | Ingreso/mes |
|-----------|:-----------:|:------------:|:-----------:|
| Inicial (mes 1-3) | 500-1,000 | ~$0.50 USD | $2-5 USD |
| Crecimiento (mes 4-6) | 2,000-5,000 | ~$0.50 USD | $10-25 USD |
| Maduro (mes 6+) | 10,000+ | ~$0.50 USD | $50-150 USD |

> **¿Es "insignificante pero representativo"?** Sí. Con ~500 visitas/mes se generan $2-5 USD, suficiente para demostrar el modelo de negocio en la defensa del proyecto.

### 5.3 Ubicación de Anuncios

```
┌────────────────────────────────────┐
│  HEADER / NAVBAR                   │
├────────────────────────────────────┤
│  [Banner Ad - Leaderboard 728x90]  │
├──────────┬─────────────────────────┤
│ SIDEBAR  │  CONTENIDO PRINCIPAL    │
│ [Ad      │  Descripción del       │
│  300x250]│  instrumento           │
│          │  [In-Article Ad]        │
│          │  Información impositiva │
│          │  Simulador              │
├──────────┴─────────────────────────┤
│  [Banner Ad - Footer 728x90]       │
│  FOOTER                            │
└────────────────────────────────────┘
```

<div class="page-break"></div>

## 6. Información Impositiva por Instrumento

### 6.1 Mercado Bursátil

| Instrumento | Imp. Ganancias | Bienes Personales | ITF |
|-------------|:--------------:|:-----------------:|:---:|
| Bonos soberanos (ARS) | Exento | Exento | Sí |
| Bonos soberanos (USD) | Exento | Gravado | Sí |
| LECAPs | Exento | Exento | Sí |
| CEDEARs | Exento* | Gravado | Sí |
| Acciones argentinas | Exento | Exento | Sí |
| ETFs | Depende | Depende | Sí |
| FCIs | Exento** | Exento** | Sí |
| Cauciones bursátiles | Exento | N/A | Sí |
| Licitaciones públicas | Exento | Depende | Sí |

\* Dividendos de CEDEARs gravados como renta de fuente extranjera  
\*\* Si más del 75% del activo subyacente está compuesto por bienes exentos

### 6.2 Mercado Cripto

| Aspecto | Ganancias | Bienes Personales |
|---------|:---------:|:-----------------:|
| Compraventa cripto | Gravado (15%) | Gravado |
| Staking / Yield | Gravado | Gravado |
| Minado | Gravado | Gravado |

> **Disclaimer:** La información impositiva es a título informativo y no constituye asesoramiento fiscal. Consultá con un contador público matriculado.

<div class="page-break"></div>

## 7. Diseño del Simulador de Inversión

### 7.1 Fórmulas

**Interés compuesto (LECAPs, plazos fijos):**

VF = C × (1 + r)^n

- VF = Valor futuro
- C = Capital inicial
- r = Tasa efectiva del período
- n = Cantidad de períodos

**Rendimiento por precio (Bonos, CEDEARs):**

Rendimiento = ((Precio_venta - Precio_compra) / Precio_compra) × 100

### 7.2 Inputs del simulador

| Campo | Tipo | Validación |
|-------|------|------------|
| Capital inicial | Número | Mínimo $1.000 ARS |
| Instrumento | Selector | Lista predefinida (8 instrumentos) |
| Tasa de rendimiento | Número | Auto-completado al seleccionar instrumento |
| Plazo (meses) | Slider + Número | 1-120 meses |
| Frecuencia capitalización | Selector | Mensual / Trimestral / Anual / Al vencimiento |

### 7.3 Outputs del simulador

| Dato | Descripción |
|------|-------------|
| Valor final | Capital + rendimientos acumulados |
| Ganancia total | Rendimiento total en $ |
| Rendimiento % | Ganancia / Capital × 100 |
| Ganancia mensual promedio | Ganancia / meses |
| Gráfico temporal | Curva de crecimiento (Recharts AreaChart) |
| Comparativa | vs. Plazo fijo (35%) y vs. Inflación estimada (50%) |

<div class="page-break"></div>

## 8. Estructura de la Aplicación

```
finbootcamp/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Layout (Navbar + Footer)
│   │   ├── mercado-bursatil/
│   │   │   ├── page.tsx        # Listado instrumentos
│   │   │   └── [slug]/page.tsx # Detalle instrumento
│   │   ├── cripto/
│   │   │   ├── page.tsx        # Listado temas
│   │   │   └── [slug]/page.tsx # Detalle tema
│   │   ├── simulador/page.tsx  # Simulador interactivo
│   │   └── cotizaciones/page.tsx # TradingView widgets
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación responsive
│   │   ├── Footer.tsx          # Footer con disclaimer
│   │   └── AdBanner.tsx        # Google AdSense
│   ├── data/
│   │   ├── instruments.ts      # 8 instrumentos bursátiles
│   │   ├── crypto-topics.ts    # 6 temas cripto
│   │   └── tax-info.ts         # Información impositiva
│   └── lib/
│       ├── simulator.ts        # Motor del simulador
│       └── utils.ts            # Utilidades
└── docs/                       # Documentación PDF
```

<div class="page-break"></div>

## 9. Análisis FODA

| | Positivo | Negativo |
|---|----------|----------|
| **Interno** | **Fortalezas:** Tema actual y relevante; Stack moderno y gratuito; Contenido diferenciador | **Debilidades:** Requiere actualización constante; APIs de brokers limitadas |
| **Externo** | **Oportunidades:** Creciente interés en inversiones; Nicho poco explotado; Posibilidad de app mobile | **Amenazas:** Cambios regulatorios; Competencia de apps de brokers |

## 10. Costos del Proyecto

| Recurso | Costo | Notas |
|---------|:-----:|-------|
| Vercel (hosting) | $0 | Free tier: 100 GB bandwidth/mes |
| Firebase Spark | $0 | 50K MAU auth, 1 GB Firestore |
| Dominio .com.ar | ~$5 USD/año | Necesario para AdSense |
| CoinGecko API | $0 | Free tier |
| TradingView Widgets | $0 | Embed gratuito |
| **Total inicial** | **~$5 USD** | Solo el dominio |

## 11. Cronograma

| Fase | Duración | Contenido |
|------|:--------:|-----------|
| Investigación | 2 semanas | Instrumentos, normativa, contenido |
| MVP | 3 semanas | Catálogos, info impositiva, simulador, landing |
| Extras | 2 semanas | TradingView, Firebase, AdSense |
| Documentación | 1 semana | Documentos, presentación |
| Testing + ajustes | 1 semana | Pruebas, responsive, deploy |
| **Total** | **~9-10 semanas** | |

## 12. Resumen Ejecutivo

| Aspecto | Evaluación |
|---------|:----------:|
| Viabilidad del MVP | ✅ Altamente viable |
| Viabilidad de AdSense | ✅ Viable (requiere dominio ~$5) |
| Monetización representativa | ✅ Centavos suficientes como prueba |
| Dificultad MVP | 🟢 Baja-Media (~50-65 hs) |
| Dificultad Extras | 🟡 Media-Alta (~65-96 hs) |
| Riesgo principal | ⚠️ APIs de brokers inexistentes |
| Recomendación | 🎯 MVP + TradingView + Firebase + AdSense |
