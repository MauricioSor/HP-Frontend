---
pdf_options:
  format: A4
  margin: 25mm 20mm
  printBackground: true
  headerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;">FinBootcamp — Requerimientos del Sistema</div>'
  footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  displayHeaderFooter: true
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
  blockquote { border-left: 4px solid #059669; padding: 12px 16px; background: #f0fdf4; margin: 16px 0; color: #166534; }
  .page-break { page-break-after: always; }
</style>

# FinBootcamp — Documento de Requerimientos

**Especificación de Requerimientos del Software (SRS)**  
**Versión:** 1.0  
**Fecha:** Agosto 2026  
**Autor:** [Tu Nombre]

---

## 1. Introducción

### 1.1 Propósito
Este documento especifica los requerimientos funcionales y no funcionales de FinBootcamp, una plataforma web educativa de educación financiera orientada al mercado argentino.

### 1.2 Alcance
FinBootcamp es una aplicación web que permite a los usuarios:
- Aprender sobre instrumentos de inversión bursátiles y criptomonedas
- Consultar el tratamiento impositivo de cada instrumento
- Simular inversiones con interés compuesto
- Visualizar cotizaciones en tiempo real

### 1.3 Público objetivo
Jóvenes argentinos de 18 a 35 años interesados en comenzar a invertir, sin conocimientos financieros previos requeridos.

---

## 2. Descripción General

### 2.1 Perspectiva del producto
FinBootcamp se posiciona como un complemento educativo a las plataformas de trading existentes (IOL, Balanz, Cocos, etc.), enfocándose en la formación del usuario antes de que realice su primera inversión.

### 2.2 Funciones principales
1. Catálogo educativo de instrumentos bursátiles
2. Catálogo educativo de criptomonedas
3. Información impositiva por instrumento
4. Simulador de inversiones
5. Cotizaciones en tiempo real (TradingView)
6. Monetización con Google AdSense

### 2.3 Restricciones
- No constituye asesoramiento financiero
- No permite operar (comprar/vender) instrumentos
- Información impositiva sujeta a cambios regulatorios

<div class="page-break"></div>

## 3. Requerimientos Funcionales

### RF01 — Catálogo de Instrumentos Bursátiles

| Campo | Detalle |
|-------|---------|
| **Descripción** | El sistema debe mostrar un catálogo navegable de instrumentos del mercado bursátil argentino |
| **Instrumentos** | Bonos, LECAPs, CEDEARs, Acciones, ETFs, FCIs, Cauciones, Licitaciones |
| **Datos por instrumento** | Nombre, descripción, nivel de riesgo, horizonte temporal, inversión mínima |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

### RF02 — Catálogo de Criptomonedas

| Campo | Detalle |
|-------|---------|
| **Descripción** | El sistema debe mostrar contenido educativo sobre criptomonedas |
| **Temas** | Principales criptos, Fundamentos BTC, Minado, FOMO, Quemado de monedas, Memecoins |
| **Datos por tema** | Título, contenido educativo, puntos clave, nivel de riesgo |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

### RF03 — Resumen Educativo por Instrumento

| Campo | Detalle |
|-------|---------|
| **Descripción** | Cada instrumento debe tener una página de detalle con información completa |
| **Contenido** | Qué es, cómo funciona, para quién es, ejemplo práctico con números |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

### RF04 — Información Impositiva

| Campo | Detalle |
|-------|---------|
| **Descripción** | Cada instrumento debe mostrar su tratamiento fiscal en Argentina |
| **Impuestos cubiertos** | Impuesto a las Ganancias, Bienes Personales, ITF, IVA |
| **Formato** | Tabla con indicadores de color (verde = exento, rojo = gravado) |
| **Disclaimer** | Incluir nota legal indicando que no constituye asesoramiento fiscal |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

### RF05 — Simulador de Inversión

| Campo | Detalle |
|-------|---------|
| **Descripción** | Herramienta interactiva para calcular rendimientos de inversiones |
| **Inputs** | Capital inicial, instrumento, tasa anual, plazo (1-120 meses), frecuencia de capitalización |
| **Outputs** | Valor final, ganancia total, rendimiento %, ganancia mensual promedio |
| **Visualización** | Gráfico de área (Recharts) con curva de crecimiento |
| **Comparativas** | vs. Plazo fijo (35%), vs. Inflación estimada (50%) |
| **Fórmula** | VF = C × (1 + r)^n (interés compuesto) |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

<div class="page-break"></div>

### RE01 — Cotizaciones en Tiempo Real

| Campo | Detalle |
|-------|---------|
| **Descripción** | Mostrar cotizaciones actuales del mercado |
| **Implementación** | Widgets embebidos de TradingView |
| **Mercados** | MERVAL (BCBA:IMV), BTC, ETH, SOL, tipos de dólar |
| **Prioridad** | Media |
| **Estado** | ✅ Implementado |

### RE02 — Sistema de Usuarios

| Campo | Detalle |
|-------|---------|
| **Descripción** | Registro y autenticación de usuarios |
| **Implementación** | Firebase Authentication |
| **Providers** | Email/Password, Google Sign-In |
| **Prioridad** | Media |
| **Estado** | 📋 Pendiente |

### RE03 — Google AdSense

| Campo | Detalle |
|-------|---------|
| **Descripción** | Monetización mediante anuncios display |
| **Implementación** | Componente AdBanner con Google AdSense SDK |
| **Ubicaciones** | Header, sidebar, in-article, footer |
| **Requisitos** | Dominio propio, cuenta AdSense aprobada |
| **Prioridad** | Media |
| **Estado** | ✅ Componente creado (pendiente cuenta AdSense) |

### RE04 — Plan VIP

| Campo | Detalle |
|-------|---------|
| **Descripción** | Suscripción premium sin anuncios con features extra |
| **Features VIP** | Sin ads, info extra, alertas, bot de licitaciones |
| **Pasarela de pago** | Mercado Pago (a implementar) |
| **Prioridad** | Baja |
| **Estado** | 📋 Pendiente |

<div class="page-break"></div>

## 4. Requerimientos No Funcionales

### RNF01 — Rendimiento

| Criterio | Especificación |
|----------|---------------|
| Tiempo de carga inicial | < 3 segundos |
| Estrategia | SSG (Static Site Generation) para todas las páginas de contenido |
| Bundle size | Optimizado con Next.js tree-shaking |

### RNF02 — Diseño Responsive

| Breakpoint | Comportamiento |
|-----------|---------------|
| Mobile (< 768px) | Menú hamburguesa, columna única, cards apiladas |
| Tablet (768-1024px) | Grid de 2 columnas |
| Desktop (> 1024px) | Grid de 3 columnas, sidebar en detalles |

### RNF03 — SEO

| Elemento | Implementación |
|----------|---------------|
| Metadata | Title y description por página |
| Generación estática | generateStaticParams para todas las rutas dinámicas |
| Semántica HTML | Uso correcto de h1-h6, section, nav, main, footer |

### RNF04 — Seguridad

| Aspecto | Implementación |
|---------|---------------|
| HTTPS | Vercel provee SSL automático |
| Inputs | Validación de tipos en el simulador |
| Auth | Firebase Authentication (OAuth2) |

### RNF05 — Mantenibilidad

| Aspecto | Implementación |
|---------|---------------|
| Lenguaje | TypeScript con tipos estrictos |
| Datos | Archivos .ts centralizados (fácil de actualizar) |
| Componentes | Reutilizables y modulares |

---

## 5. Glosario

| Término | Definición |
|---------|-----------|
| **CEDEAR** | Certificado de Depósito Argentino — permite invertir en acciones extranjeras desde Argentina |
| **LECAP** | Letra de Capitalización del Tesoro Nacional — bono de corto plazo con interés compuesto |
| **FCI** | Fondo Común de Inversión — vehículo de inversión colectiva |
| **ITF** | Impuesto a los Débitos y Créditos bancarios |
| **FOMO** | Fear Of Missing Out — miedo a perderse una oportunidad de inversión |
| **SSG** | Static Site Generation — generación de páginas estáticas en build time |
| **SSR** | Server Side Rendering — renderizado del lado del servidor |
| **CPC** | Cost Per Click — costo por clic en publicidad digital |
