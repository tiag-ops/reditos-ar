import type { MetadataRoute } from "next";
import { guias } from "@/lib/articulos";
import tasas from "@/data/tasas.json";

export const dynamic = "force-static";

const BASE = "https://reditos.com.ar";
const datosActualizados = new Date(tasas.fecha);

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
    lastModified: datosActualizados,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.9,
  }));

  const indices = [
    {
      url: `${BASE}/guia/`,
      lastModified: datosActualizados,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const articulos = guias.map((g) => ({
    url: `${BASE}/guia/${g.slug}/`,
    lastModified: datosActualizados,
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
