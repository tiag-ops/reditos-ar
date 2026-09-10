import { ImageResponse } from "next/og";
import { PlantillaOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-plantilla";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const alt = "Todas las guías de Redito.ar: plazo fijo, UVA, CER, Lecaps, dólar e inflación";

export default function Image() {
  return new ImageResponse(
    <PlantillaOG titular="Guías de ahorro e inversión" chip="Guías" />,
    size,
  );
}
