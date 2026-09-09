import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { guias, getGuia } from "./index";

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

  it("cada link /guia/ del código apunta a un slug del registro (grafo sin 404)", () => {
    // Si alguien linkea /guia/foo/ y foo no existe, este test revienta antes
    // de que el 404 llegue a producción.
    const appDir = join(process.cwd(), "src", "app");
    const libDir = join(process.cwd(), "src", "lib");
    const archivos: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(tsx|ts)$/.test(f) && !f.includes("test")) archivos.push(p);
      }
    };
    walk(appDir);
    walk(libDir);
    const hrefs = archivos.flatMap((a) =>
      readFileSync(a, "utf8").match(/\/guia\/[a-z0-9-]+/g) ?? []
    );
    const unicos = [...new Set(hrefs)].filter((h) => h !== "/guia/");
    // Piso del grafo: 12+ slugs cross-linkeados entre calculadoras y guías.
    // Es >=, no toBe: subilo cuando agregues contenido (no lo bajes).
    expect(unicos.length).toBeGreaterThanOrEqual(12);
    for (const h of unicos) {
      const slug = h.replace("/guia/", "");
      expect(getGuia(slug), `link roto: ${h}`).toBeDefined();
    }
  });
});
