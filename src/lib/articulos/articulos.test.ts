import { describe, expect, it } from "vitest";
import { guias } from "./index";

describe("registro de guías", () => {
  it("no tiene slugs ni títulos duplicados", () => {
    const slugs = guias.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titulos = guias.map((g) => g.titulo);
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("familia cuanto-gana: 12 montos, cada una con FAQ exclusiva (anti-doorway)", () => {
    const familia = guias.filter((g) => g.slug.startsWith("cuanto-gana-plazo-fijo-"));
    expect(familia.length).toBe(12);
    const preguntasExtra = familia.map((g) => g.faqs[3]?.pregunta);
    expect(new Set(preguntasExtra).size).toBe(12);
    // Cada guía tiene su h2 segmentado (chico vs monto alto)
    familia.forEach((g) => {
      const h2s = g.bloques.filter((b) => b.tipo === "h2").map((b) => b.texto);
      expect(h2s.some((t) => /constancia|liquidez/i.test(t))).toBe(true);
    });
  });

  it("todas las guías tienen descripción y contenido mínimos", () => {
    guias.forEach((g) => {
      expect(g.descripcion.length).toBeGreaterThan(50);
      expect(g.descripcion.length).toBeLessThanOrEqual(160);
      expect(g.faqs.length).toBeGreaterThanOrEqual(2);
      expect(g.bloques.length).toBeGreaterThan(3);
    });
  });
});
