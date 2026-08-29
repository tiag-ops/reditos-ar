/** Utilidades de formato es-AR. */

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const fmtNum = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

/** $1.032.877 (sin decimales, estándar para montos grandes). */
export function formatARS(n: number): string {
  return fmtARS.format(n);
}

/** 1.234,56 con coma decimal. */
export function formatNum(n: number): string {
  return fmtNum.format(n);
}

/** 49,15% (coma decimal, es-AR). */
export function formatPct(pct: number, decimales = 2): string {
  return `${new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(pct)}%`;
}

/** Formato de monto con decimales para intereses chicos. */
export function formatARS2(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
