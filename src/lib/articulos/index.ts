import { guiasCuantoGana, guiaPlazoFijoVsDolar, guiaFormula } from "./guias-basicas";
import { guiasAvanzadas } from "./guias-avanzadas";
import { guiasTransversales } from "./guias-transversales";
import { guiasEstacionales } from "./guias-estacionales";
import { guiasProfesionales } from "./guias-profesionales";
import type { Guia } from "./tipos";

/** Registro completo de guías (build-time). */
export const guias: Guia[] = [
  ...guiasCuantoGana(), // 12 guías "¿cuánto gana...?"
  guiaPlazoFijoVsDolar(),
  guiaFormula(),
  ...guiasAvanzadas, // 7 guías temáticas
  ...guiasTransversales(), // 3 transversales (PR 2b)
  ...guiasEstacionales(), // 2 estacionales/prácticas (PR 3)
  ...guiasProfesionales(), // 2 profesionales (PR 3)
];

export function getGuia(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}
