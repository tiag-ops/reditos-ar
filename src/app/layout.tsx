import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Redito.ar — Calculadoras de ahorro e inversión en Argentina",
    template: "%s | Redito.ar",
  },
  description:
    "Simuladores de plazo fijo, dólar e inflación con datos oficiales del BCRA e INDEC. Calculá cuánto gana tu ahorro hoy y si le ganás a la inflación.",
  metadataBase: new URL("https://reditos.ar"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold">
              Redito<span className="text-blue-600">.ar</span>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/guia/" className="hover:text-blue-600">Guías</Link>
              <Link href="/plazo-fijo/" className="hover:text-blue-600">Plazo fijo</Link>
              <Link href="/plazo-fijo-vs-inflacion/" className="hover:text-blue-600">Vs inflación</Link>
              <Link href="/interes-compuesto/" className="hover:text-blue-600">Interés compuesto</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
          <p>
            Los cálculos son orientativos y no constituyen asesoramiento financiero.
            Datos: BCRA e INDEC.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Redito.ar</p>
        </footer>
      </body>
    </html>
  );
}
