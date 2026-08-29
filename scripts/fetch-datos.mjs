/**
 * fetch-datos.mjs — Pipeline de datos vivos de Redito.ar
 * Consulta APIs oficiales (BCRA + Argly/INDEC) y escribe JSON normalizados en src/data/.
 * Idempotente: mismos datos → mismos archivos (para el auto-PR del workflow mensual).
 * Sin dependencias: Node 22+ con fetch global.
 *
 * Fuentes:
 *  - TNA plazo fijo 30 días (minorista): BCRA v4.0 Monetarias id=12
 *  - Dólar oficial: BCRA Estadísticas Cambiarias v1.0
 *  - IPC mensual: Argly (sincroniza INDEC)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "src", "data");
const TIMEOUT_MS = 30_000;

async function getJson(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return res.json();
}

/** TNA de depósitos a 30 días (BCRA id=12): serie diaria. */
async function fetchTasas() {
  const d = await getJson(
    "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/12"
  );
  const serie = d.results?.[0]?.detalle ?? [];
  if (serie.length === 0) throw new Error("Serie de tasas vacía (BCRA id=12)");
  const ordenada = [...serie].sort((a, b) => a.fecha.localeCompare(b.fecha));
  const ultimo = ordenada.at(-1);
  return {
    fecha: ultimo.fecha,
    fuente: "https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/12",
    valores: {
      tnaPlazoFijo30: Number(ultimo.valor.toFixed(2)),
      serie7d: ordenada.slice(-7).map((x) => ({
        fecha: x.fecha,
        valor: Number(x.valor.toFixed(2)),
      })),
    },
  };
}

/** Dólar oficial BCRA (cotización A3500). */
async function fetchDolar() {
  const d = await getJson(
    "https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD"
  );
  const dia = d.results?.[0];
  const usd = dia?.detalle?.find((x) => x.codigoMoneda === "USD");
  if (!usd) throw new Error("Cotización USD ausente en respuesta BCRA");
  return {
    fecha: dia.fecha,
    fuente:
      "https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD",
    valores: {
      oficial: usd.tipoCotizacion,
      tipoPase: usd.tipoPase,
    },
  };
}

/** IPC mensual nacional (INDEC vía Argly). */
async function fetchIpc() {
  const d = await getJson("https://api.argly.com.ar/v1/ipc");
  const v = d.data ?? {};
  if (typeof v.indice_ipc !== "number")
    throw new Error("Respuesta Argly sin indice_ipc");
  return {
    fecha: `${v.anio}-${String(v.mes).padStart(2, "0")}-01`,
    fuente: "https://api.argly.com.ar/v1/ipc",
    valores: {
      ipcMensualPct: v.indice_ipc,
      mes: v.nombre_mes,
      anio: v.anio,
      fechaPublicacion: v.fecha_publicacion,
      fechaProximoInforme: v.fecha_proximo_informe,
    },
  };
}

const tareas = [
  { archivo: "tasas.json", fn: fetchTasas },
  { archivo: "dolar.json", fn: fetchDolar },
  { archivo: "ipc.json", fn: fetchIpc },
];

mkdirSync(DATA_DIR, { recursive: true });
let fallas = 0;
for (const { archivo, fn } of tareas) {
  try {
    const data = await fn();
    const destino = join(DATA_DIR, archivo);
    writeFileSync(destino, JSON.stringify(data, null, 2) + "\n");
    console.log(`OK  ${archivo}: ${JSON.stringify(data.valores).slice(0, 120)}`);
  } catch (err) {
    fallas++;
    console.error(`FALLA ${archivo}: ${err.message}`);
  }
}

// Exit 1 solo si fallan TODAS las fuentes (el sitio queda con el último JSON bueno);
// si falla una sola, el workflow lo registra pero no bloquea el deploy.
if (fallas === tareas.length) {
  console.error("Todas las fuentes fallaron.");
  process.exit(1);
}
