import type { MetadataRoute } from "next";
import { guias } from "@/lib/articulos";

export const dynamic = "force-static";

const BASE = "https://reditos.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculadoras = [
    "",
    "/plazo-fijo/",
    "/plazo-fijo-vs-inflacion/",
    "/interes-compuesto/",
    "/dolar/",
    "/inflacion/",
    "/meta-de-ahorro/",
  ].map((p) => ({
    url: `${BASE}${p || "/"}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.9,
  }));

  const indices = [{ url: `${BASE}/guia/`, changeFrequency: "weekly" as const, priority: 0.8 }];

  const articulos = guias.map((g) => ({
    url: `${BASE}/guia/${g.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legales = ["/privacidad/", "/terminos/", "/quienes-somos/"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...calculadoras, ...indices, ...articulos, ...legales];
}
