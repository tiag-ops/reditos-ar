/**
 * Motor de fórmulas financieras — Redito.ar
 * Funciones puras, sin React, sin IO. 100% cubiertas por tests.
 * Convención: tasas en porcentaje (40 = 40% TNA), duraciones en días/meses según el nombre.
 */

/** Interés simple: capital * TNA * (dias/365). */
export function interesSimple(capital: number, tnaPct: number, dias: number): number {
  return capital * (tnaPct / 100) * (dias / 365);
}

/** Vencimiento de un plazo fijo tradicional (interés simple al vencimiento). */
export function vencimientoPlazoFijo(
  capital: number,
  tnaPct: number,
  dias: number
): { interes: number; total: number } {
  const interes = interesSimple(capital, tnaPct, dias);
  return { interes, total: capital + interes };
}

/** TEA (Tasa Efectiva Anual) a partir de TNA con capitalización diaria. */
export function tea(tnaPct: number): number {
  return Math.pow(1 + tnaPct / 100 / 365, 365) - 1;
}

/** TEM (Tasa Efectiva Mensual) aproximada: TNA/12 (convención de mercado AR). */
export function tem(tnaPct: number): number {
  return tnaPct / 12 / 100;
}

/** Interés compuesto: capital * (1+i)^meses. i = tasa efectiva mensual (decimal). */
export function interesCompuesto(capital: number, temDec: number, meses: number): number {
  return capital * Math.pow(1 + temDec, meses);
}

/**
 * Monto final con aportes mensuales (forma cerrada, sin loop):
 * FV = P*(1+i)^n + A*[(1+i)^n - 1]/i * (1+i)
 * Aporte depositado al inicio de cada mes (anualidad anticipada).
 */
export function montoConAportes(
  capitalInicial: number,
  aporteMensual: number,
  temDec: number,
  meses: number
): number {
  const fvCapital = interesCompuesto(capitalInicial, temDec, meses);
  if (aporteMensual === 0) return fvCapital;
  if (temDec === 0) return fvCapital + aporteMensual * meses;
  const fvAnualidad =
    aporteMensual * ((Math.pow(1 + temDec, meses) - 1) / temDec) * (1 + temDec);
  return fvCapital + fvAnualidad;
}

/**
 * Rendimiento real vs inflación:
 * - nominal: TEA (decimal, ej 0.4915)
 * - ipcMensual: inflación mensual (decimal, ej 0.02)
 * Devuelve inflación anualizada y rendimiento real anual: (1+TEA)/(1+inflación anual) - 1.
 */
export function rendimientoReal(teaDec: number, ipcMensual: number): {
  inflacionAnual: number;
  realAnual: number;
} {
  const inflacionAnual = Math.pow(1 + ipcMensual, 12) - 1;
  const realAnual = (1 + teaDec) / (1 + inflacionAnual) - 1;
  return { inflacionAnual, realAnual };
}
