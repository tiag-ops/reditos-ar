import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuia, guias } from "@/lib/articulos";
import { ArticuloView } from "@/lib/articulos/articulo-view";
import tasas from "@/data/tasas.json";

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) return {};
  return {
    title: guia.titulo,
    description: guia.descripcion,
    alternates: { canonical: `/guia/${slug}/` },
    openGraph: {
      type: "article",
      title: guia.titulo,
      description: guia.descripcion,
      url: `/guia/${slug}/`,
      publishedTime: tasas.fecha,
      modifiedTime: tasas.fecha,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PageGuia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) notFound();

  return <ArticuloView guia={guia} fecha={tasas.fecha} />;
}
