// Genera los PNG estándar de los widgets de la homepage en public/og/.
// Usa la MISMA plantilla (mismos estilos) que las opengraph-image de Next.
// Espejo en createElement porque node ESM no parsea JSX en .mjs.
// node ESM no resuelve "next/og" (next no declara exports map) → usar og.js
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement } from "react";
import { ImageResponse } from "next/og.js";

// ——— plantilla (espejo de src/lib/og-plantilla.tsx) ———
function PlantillaOG({ titular, chip }) {
  const fontSize = titular.length > 64 ? 52 : 68;
  return createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#fafafa",
        borderLeft: "16px solid #2563eb",
        fontFamily: "sans-serif",
      },
    },
    createElement(
      "div",
      { style: { display: "flex", fontSize: 36, fontWeight: 700, color: "#171717" } },
      "Redito",
      createElement("span", { style: { color: "#2563eb" } }, ".ar"),
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          fontSize,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#171717",
        },
      },
      titular,
    ),
    createElement(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      createElement(
        "div",
        {
          style: {
            display: "flex",
            padding: "10px 26px",
            borderRadius: 999,
            background: "#2563eb",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
          },
        },
        chip,
      ),
      createElement("div", { style: { display: "flex", fontSize: 24, color: "#737373" } }, "Datos oficiales BCRA · INDEC"),
    ),
  );
}

// ——— generación ———
const directorio = join(process.cwd(), "public", "og");

const widgets = [
  { file: "plazo-fijo.png", titular: "Plazo fijo tradicional" },
  { file: "plazo-fijo-vs-inflacion.png", titular: "Plazo fijo vs inflación" },
  { file: "interes-compuesto.png", titular: "Interés compuesto" },
  { file: "dolar.png", titular: "Dólar oficial BCRA" },
  { file: "inflacion.png", titular: "Inflación mes a mes" },
  { file: "meta-de-ahorro.png", titular: "Meta de ahorro" },
];

await mkdir(directorio, { recursive: true });

for (const { file, titular } of widgets) {
  const respuesta = new ImageResponse(
    createElement(PlantillaOG, { titular, chip: "Calculadora" }),
    { width: 1200, height: 630 },
  );
  const buffer = await respuesta.arrayBuffer();
  await writeFile(join(directorio, file), Buffer.from(buffer));
  console.log(`og: ${file} (${Math.round(buffer.byteLength / 1024)} KB)`);
}
