import { describe, expect, it } from "vitest";
import {
  interesSimple,
  tea,
  tem,
  interesCompuesto,
  montoConAportes,
  rendimientoReal,
  vencimientoPlazoFijo,
} from "@/lib/finanzas";
import { formatARS, formatPct } from "@/lib/format";

// Casos validados con cálculo externo (29/8/2026):
// PF $1.000.000 @ TNA 40% 30 días → interés $32.876,71 y TEA 49,15%.

describe("finanzas: interés simple (plazo fijo tradicional)", () => {
  it("calcula interés simple 30 días", () => {
    expect(interesSimple(1_000_000, 40, 30)).toBeCloseTo(32_876.7123, 2);
  });

  it("un año completo devuelve capital * TNA", () => {
    expect(interesSimple(100_000, 40, 365)).toBeCloseTo(40_000, 2);
  });

  it("vencimiento = capital + interés", () => {
    const v = vencimientoPlazoFijo(1_000_000, 40, 30);
    expect(v.interes).toBeCloseTo(32_876.7123, 2);
    expect(v.total).toBeCloseTo(1_032_876.7123, 2);
  });
});

describe("finanzas: TEA / TEM", () => {
  it("TEA de TNA 40% con capitalización diaria ≈ 49,15%", () => {
    expect(tea(40)).toBeCloseTo(0.4915, 3);
  });

  it("TEM mensual ≈ TNA/12", () => {
    expect(tem(40)).toBeCloseTo(40 / 12 / 100, 6);
  });

  it("TNA 0 → TEA 0", () => {
    expect(tea(0)).toBe(0);
  });
});

describe("finanzas: interés compuesto", () => {
  it("crece exponencialmente con capitalización mensual", () => {
    // 1.000.000 al 3% mensual, 12 meses, sin aportes
    const m = interesCompuesto(1_000_000, 0.03, 12);
    expect(m).toBeCloseTo(1_000_000 * Math.pow(1.03, 12), 2);
    expect(m).toBeGreaterThan(1_400_000);
  });

  it("aportes mensuales suman al monto final", () => {
    const sinAportes = interesCompuesto(100_000, 0.02, 6);
    const conAportes = montoConAportes(100_000, 10_000, 0.02, 6);
    expect(conAportes).toBeGreaterThan(sinAportes);
  });

  it("aporte 0 equivale a compuesto simple", () => {
    expect(montoConAportes(100_000, 0, 0.02, 6)).toBeCloseTo(
      interesCompuesto(100_000, 0.02, 6),
      2
    );
  });
});

describe("finanzas: rendimiento real (vs inflación)", () => {
  it("si la TNA supera a la inflación anualizada, el rendimiento real es positivo", () => {
    // TNA 40% ≈ TEA 49,15% anual; inflación 2% mensual ≈ 26,8% anual
    const r = rendimientoReal(0.4915, 0.02);
    expect(r.realAnual).toBeGreaterThan(0);
  });

  it("inflación mayor que rendimiento → real negativo", () => {
    const r = rendimientoReal(0.10, 0.05); // TEA 10% vs inflación ~80% anual
    expect(r.realAnual).toBeLessThan(0);
  });

  it("cero inflación → real = nominal", () => {
    const r = rendimientoReal(0.4915, 0);
    expect(r.realAnual).toBeCloseTo(0.4915, 4);
  });
});

describe("format", () => {
  it("formatea pesos argentinos", () => {
    expect(formatARS(1032876.71)).toContain("1.032.877");
  });

  it("formatea porcentajes con coma decimal", () => {
    expect(formatPct(49.15)).toBe("49,15%");
  });
});
