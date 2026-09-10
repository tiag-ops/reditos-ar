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
        backgroundColor: "#1e3a8a",
        backgroundImage: "linear-gradient(135deg, #0b1f4b 0%, #1d4ed8 60%, #2563eb 100%)",
        borderLeft: "16px solid #93c5fd",
        fontFamily: "sans-serif",
      },
    },
    createElement(
      "div",
      { style: { display: "flex", fontSize: 36, fontWeight: 700, color: "#ffffff" } },
      "Redito",
      createElement("span", { style: { color: "#bfdbfe" } }, ".ar"),
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
          color: "#ffffff",
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
            background: "#ffffff",
            color: "#1d4ed8",
            fontSize: 24,
            fontWeight: 700,
          },
        },
        chip,
      ),
      createElement("div", { style: { display: "flex", fontSize: 24, color: "#bfdbfe" } }, "Datos oficiales BCRA · INDEC"),
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
