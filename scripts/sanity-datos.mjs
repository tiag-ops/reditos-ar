/**
 * sanity-datos.mjs — rechaza datos absurdos ANTES de que entren al sitio.
 * Se corre en el workflow tras el fetch: si algo sale del rango de plausibilidad
 * (o la fuente quedó congelada), corta con exit 1 y el PR nunca se crea.
 * Rangos pensados para AR 2026; ajustar si cambia el régimen de tasas.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dias = (iso) => (Date.now() - Date.parse(iso)) / 86400000;

const errores = [];

const tasas = JSON.parse(readFileSync(join(ROOT, "src/data/tasas.json"), "utf-8"));
const tna = tasas.valores?.tnaPlazoFijo30;
if (typeof tna !== "number" || tna < 5 || tna > 80)
  errores.push(`TNA fuera de rango [5, 80]: ${tna}`);
if (dias(tasas.fecha) > 7)
  errores.push(`tasas.json congelado: fecha ${tasas.fecha} (${Math.floor(dias(tasas.fecha))} días atrás)`);

const dolar = JSON.parse(readFileSync(join(ROOT, "src/data/dolar.json"), "utf-8"));
const oficial = dolar.valores?.oficial;
if (typeof oficial !== "number" || oficial < 500 || oficial > 5000)
  errores.push(`Dólar oficial fuera de rango [500, 5000]: ${oficial}`);
if (dias(dolar.fecha) > 5)
  errores.push(`dolar.json congelado: fecha ${dolar.fecha} (${Math.floor(dias(dolar.fecha))} días atrás)`);

if (errores.length) {
  console.error("SANITY FAIL:\n- " + errores.join("\n- "));
  process.exit(1);
}
console.log(`Sanity OK: TNA ${tna}% (${tasas.fecha}) · USD ${oficial} (${dolar.fecha})`);
