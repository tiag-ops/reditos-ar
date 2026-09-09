import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Redito.ar — Calculadoras de ahorro e inversión en Argentina";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>
          Redito<span style={{ color: "#60a5fa" }}>.ar</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 40,
            color: "#d4d4d8",
            textAlign: "center",
          }}
        >
          ¿Cuánto rinde tu ahorro hoy?
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 28,
            padding: "12px 32px",
            borderRadius: 12,
            background: "#2563eb",
          }}
        >
          Plazo fijo · Dólar · Inflación · Datos BCRA/INDEC
        </div>
      </div>
    ),
    size
  );
}
