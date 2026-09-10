import type { Metadata, Viewport } from "next";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { themeScript } from "./theme-script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Redito.ar — Calculadoras de ahorro e inversión en Argentina",
    template: "%s | Redito.ar",
  },
  description:
    "Simuladores de plazo fijo, dólar e inflación con datos oficiales del BCRA e INDEC. Calculá cuánto gana tu ahorro hoy y si le ganás a la inflación.",
  metadataBase: new URL("https://reditos.com.ar"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://reditos.com.ar/",
    siteName: "Redito.ar",
    title: "Redito.ar — Calculadoras de ahorro e inversión en Argentina",
    description:
      "Simuladores de plazo fijo, dólar e inflación con datos oficiales del BCRA e INDEC. Calculá cuánto gana tu ahorro hoy y si le ganás a la inflación.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redito.ar — Calculadoras de ahorro e inversión en Argentina",
    description:
      "Simuladores de plazo fijo, dólar e inflación con datos oficiales del BCRA e INDEC.",
  },
  verification: {
    google: "e5Y4y2CX6A_lbY-fYr475wgHnLXYJvB4BaCl0OwLWu8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold">
              Redito<span className="text-blue-600">.ar</span>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden gap-4 text-sm sm:flex">
                <Link href="/guia/" className="hover:text-blue-600">Guías</Link>
                <Link href="/plazo-fijo/" className="hover:text-blue-600">Plazo fijo</Link>
                <Link href="/plazo-fijo-vs-inflacion/" className="hover:text-blue-600">Vs inflación</Link>
                <Link href="/interes-compuesto/" className="hover:text-blue-600">Compuesto</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-neutral-200 py-6 text-center text-[13px] text-neutral-600 dark:text-neutral-400 dark:border-neutral-800">
          <p className="mb-2 flex flex-wrap justify-center gap-3">
            <Link href="/quienes-somos/" className="hover:text-blue-600">Quiénes somos</Link>
            <Link href="/privacidad/" className="hover:text-blue-600">Privacidad</Link>
            <Link href="/terminos/" className="hover:text-blue-600">Términos</Link>
            <Link href="/guia/" className="hover:text-blue-600">Guías</Link>
          </p>
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
