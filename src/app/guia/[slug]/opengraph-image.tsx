import { ImageResponse } from "next/og";
import { guias, getGuia } from "@/lib/articulos";
import { notFound } from "next/navigation";
import { PlantillaOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-plantilla";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) notFound();

  return new ImageResponse(<PlantillaOG titular={guia.titulo} chip="Guía" />, size);
}
