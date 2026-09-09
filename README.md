# Redito.ar

Calculadoras de ahorro e inversión para Argentina: plazo fijo, interés compuesto, dólar, inflación y metas de ahorro. Todos los números salen de datos oficiales del BCRA e INDEC, actualizados cada mes por el engine de datos en build-time.

**Sitio:** https://reditos.com.ar

## Qué hay adentro

- **Calculadoras** (sección `/plazo-fijo`, `/interes-compuesto`, `/dolar`, `/inflacion`, `/plazo-fijo-vs-inflacion`, `/meta-de-ahorro`): resultado en el primer screen, sin registros.
- **Guías** (`/guia/...`): series "¿Cuánto gana un plazo fijo de $X?" por monto exacto, comparativas (plazo fijo vs dólar, rendimiento real), impuestos (retención de Ganancias) e instrumentos (UVA, CER, Lecaps).
- **Datos frescos como moat**: `src/data/*.json` se regeneran con tasas del BCRA/INDEC vía GitHub Action y todo el contenido estático se recalcula en build.

## Stack

Next.js (App Router, SSG) + Tailwind + Vitest. Deploy en Cloudflare Pages (integración Git).

## Scripts

```bash
npm install
npm run dev    # desarrollo
npm run test   # vitest (finanzas + anti-doorway/anti-404 de artículos)
npm run lint
npm run build  # export estático a out/
```

## Sitios hermanos

- [SueldoNeto.ar](https://suelloneto.ar) — calculadoras de sueldo, aguinaldo y vacaciones.
- [Maternidad.ar](https://maternidad.ar) — calculadoras de embarazo, licencia y asignaciones.
