---
pdf_options:
  format: A4
  margin: 25mm 20mm
  printBackground: true
  headerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#999;">FinBootcamp — Walkthrough de Desarrollo</div>'
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
  pre { background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; font-size: 12px; }
  blockquote { border-left: 4px solid #059669; padding: 12px 16px; background: #f0fdf4; margin: 16px 0; color: #166534; }
</style>

# FinBootcamp — Walkthrough de Desarrollo

**Documento de Resumen Técnico**  
**Fecha:** Agosto 2026

---

## Resumen General

Se desarrolló una plataforma web educativa completa sobre finanzas para el mercado argentino usando **Next.js 16 + TypeScript + Tailwind CSS 4**. El proyecto incluye el MVP completo con simulador de inversiones, información impositiva, y extras como widgets de TradingView y soporte para Google AdSense.

---

## Archivos Creados (20 archivos)

### Estructura base

| Archivo | Descripción |
|---------|-------------|
| `src/app/layout.tsx` | Layout principal con Navbar + Footer, metadata SEO, fuente Geist |
| `src/app/globals.css` | Estilos globales con paleta emerald/blue/amber |
| `src/components/Navbar.tsx` | Barra de navegación responsive con hamburger menu mobile |
| `src/components/Footer.tsx` | Footer con 3 columnas y disclaimer legal |
| `src/lib/utils.ts` | Utilidades: cn(), formatCurrency(), formatPercent() |

### Datos (contenido educativo)

| Archivo | Contenido |
|---------|-----------|
| `src/data/instruments.ts` | 8 instrumentos bursátiles con descripciones, ejemplos, tasas y datos fiscales |
| `src/data/crypto-topics.ts` | 6 temas cripto con contenido educativo, key points y niveles de riesgo |
| `src/data/tax-info.ts` | 11 escenarios fiscales (8 bursátiles + 3 cripto) con disclaimer legal |

### Páginas de la aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Landing: hero con gradient, stats, feature cards, preview impositiva, CTA |
| `/mercado-bursatil` | Grid de 8 instrumentos con badges de riesgo y horizonte |
| `/mercado-bursatil/[slug]` | Detalle: descripción, ejemplo práctico, tabla impositiva, link al simulador |
| `/cripto` | Grid de 6 temas cripto con badges de riesgo |
| `/cripto/[slug]` | Detalle: contenido educativo, key points, advertencia de riesgo |
| `/simulador` | Simulador interactivo con gráfico Recharts y tabla comparativa |
| `/cotizaciones` | Widgets TradingView embebidos (MERVAL, BTC, tipos de dólar) |

### Lógica y componentes extra

| Archivo | Descripción |
|---------|-------------|
| `src/lib/simulator.ts` | Motor del simulador: interés compuesto con capitalización variable |
| `src/components/AdBanner.tsx` | Componente Google AdSense con placeholder en desarrollo |
| `README.md` | README profesional con badges, estructura y modelo de negocio |

---

## Verificación Técnica

| Criterio | Resultado |
|----------|:---------:|
| Build de producción | ✅ Exitosa |
| TypeScript sin errores | ✅ Limpio |
| Páginas estáticas generadas | ✅ 22 páginas |
| Dev server funcional | ✅ localhost:3000 |

---

## Problemas Encontrados y Resueltos

| Problema | Causa | Solución |
|----------|-------|----------|
| Import incorrecto en simulador | Subagente usó `calculateInvestment` en vez de `simulateInvestment` | Reescritura completa del archivo con API correcta |
| Propiedad `riskWarning` inexistente | Tipo `CryptoTopic` no tiene esa propiedad | Reemplazada con lógica basada en `topic.risk` |
| Error de tipo en ITF | `boolean` pasado a función que espera `string` | Renderizado directo como "Aplica"/"No aplica" |
| Incompatibilidad en Recharts Tooltip | Tipo `ValueType` no asignable a `number` | Conversión con `Number(value)` |

---

## Estado del Proyecto

### ✅ Completado

- MVP completo (catálogos, info impositiva, simulador)
- Extras: TradingView widgets, componente AdSense
- README profesional
- Build de producción exitosa

### 📋 Pendiente (Futuro Desarrollo)

| Feature | Dificultad | Horas estimadas |
|---------|:----------:|:---------------:|
| Firebase Auth (login/register) | 🟡 Media | 12-18 hs |
| Firestore (guardar simulaciones) | 🟡 Media | 8-12 hs |
| Plan VIP con Mercado Pago | 🔴 Alta | 25-35 hs |
| Deploy en Vercel | 🟢 Fácil | 1 hs |
| Dominio propio para AdSense | 🟢 Fácil | ~$5 USD |
