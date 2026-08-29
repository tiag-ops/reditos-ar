import { guiasCuantoGana, guiaPlazoFijoVsDolar, guiaFormula } from "./guias-basicas";
import { guiasAvanzadas } from "./guias-avanzadas";
import type { Guia } from "./tipos";

/** Registro completo de guías (build-time). */
export const guias: Guia[] = [
  ...guiasCuantoGana(), // 3 guías "¿cuánto gana...?"
  guiaPlazoFijoVsDolar(),
  guiaFormula(),
  ...guiasAvanzadas, // 7 guías temáticas
];

export function getGuia(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}
