// Plantilla estándar de OG images (satori / next/og): un solo look para todo el sitio.
// Reglas de satori: display:flex en cada div con hijos, sin emojis (la fuente default no los cubre).

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

interface PlantillaOGProps {
  titular: string;
  chip: string;
}

/** Fondo claro, barra azul lateral (marca), título bold y fila de chips abajo. */
export function PlantillaOG({ titular, chip }: PlantillaOGProps) {
  const fontSize = titular.length > 64 ? 52 : 68;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#fafafa",
        borderLeft: "16px solid #2563eb",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#171717" }}>
        Redito<span style={{ color: "#2563eb" }}>.ar</span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#171717",
        }}
      >
        {titular}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            padding: "10px 26px",
            borderRadius: 999,
            background: "#2563eb",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {chip}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#737373" }}>
          Datos oficiales BCRA · INDEC
        </div>
      </div>
    </div>
  );
}
