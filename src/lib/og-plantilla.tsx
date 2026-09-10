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
        backgroundColor: "#1e3a8a",
        backgroundImage: "linear-gradient(135deg, #0b1f4b 0%, #1d4ed8 60%, #2563eb 100%)",
        borderLeft: "16px solid #93c5fd",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#ffffff" }}>
        Redito<span style={{ color: "#bfdbfe" }}>.ar</span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#ffffff",
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
            background: "#ffffff",
            color: "#1d4ed8",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {chip}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#bfdbfe" }}>
          Datos oficiales BCRA · INDEC
        </div>
      </div>
    </div>
  );
}
