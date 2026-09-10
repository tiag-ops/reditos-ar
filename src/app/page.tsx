import Link from "next/link";
import type { Metadata } from "next";
import { formatARS, formatPct } from "@/lib/format";
import { guias } from "@/lib/articulos";
import { vencimientoPlazoFijo } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import dolar from "@/data/dolar.json";
import ipc from "@/data/ipc.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  keywords: [
    "calculadora plazo fijo",
    "plazo fijo hoy",
    "cuánto gana un plazo fijo",
    "interés compuesto",
    "dólar oficial",
    "inflación argentina",
    "plazo fijo vs inflación",
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Redito.ar",
      alternateName: "Redito",
      url: "https://reditos.com.ar/",
      inLanguage: "es-AR",
    },
    {
      "@type": "Organization",
      name: "Redito.ar",
      url: "https://reditos.com.ar/",
      logo: "https://reditos.com.ar/icon.svg",
    },
  ],
};

interface WidgetCalc {
  href: string;
  titulo: string;
  descripcion: string;
  img: string;
  alt: string;
}

/** Widgets con imagen estandarizada (mismo diseño que las OG de cada ruta). */
const widgets: WidgetCalc[] = [
  {
    href: "/plazo-fijo/",
    titulo: "📈 Plazo fijo tradicional",
    descripcion: "Cuánto ganás con tu plazo fijo a 30, 60 o 90 días.",
    img: "/og/plazo-fijo.png",
    alt: "Calculadora de plazo fijo tradicional",
  },
  {
    href: "/plazo-fijo-vs-inflacion/",
    titulo: "🔥 Plazo fijo vs inflación",
    descripcion: "¿Le ganás o no a la inflación? La cuenta que casi nadie te muestra.",
    img: "/og/plazo-fijo-vs-inflacion.png",
    alt: "Plazo fijo vs inflación si le ganás a la inflación",
  },
  {
    href: "/interes-compuesto/",
    titulo: "🌱 Interés compuesto",
    descripcion: "Con aportes mensuales: el efecto bola de nieve.",
    img: "/og/interes-compuesto.png",
    alt: "Calculadora de interés compuesto con aportes mensuales",
  },
  {
    href: "/dolar/",
    titulo: "💵 Dólar oficial",
    descripcion: "Cotización BCRA de hoy y conversor pesos ↔ dólares.",
    img: "/og/dolar.png",
    alt: "Dólar oficial BCRA de hoy con conversor",
  },
  {
    href: "/inflacion/",
    titulo: "🔥 Inflación",
    descripcion: "Cuánto vas a necesitar mañana para comprar lo mismo que hoy.",
    img: "/og/inflacion.png",
    alt: "Calculadora de inflación Argentina",
  },
  {
    href: "/meta-de-ahorro/",
    titulo: "🎯 Meta de ahorro",
    descripcion: "Cuánto apartar por mes para llegar a tu meta.",
    img: "/og/meta-de-ahorro.png",
    alt: "Calculadora de meta de ahorro mensual",
  },
];

export default function Home() {
  const tna = tasas.valores.tnaPlazoFijo30;
  const ejemplo = vencimientoPlazoFijo(100_000, tna, 30);

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Cuánto rinde tu ahorro <span className="text-blue-600">hoy</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          Calculadoras de plazo fijo, dólar e inflación con datos oficiales del
          BCRA e INDEC, actualizadas automáticamente cada mes.
        </p>
      </section>

      {/* Widget "hoy": valores del JSON de datos, nunca hardcodeados */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">TNA plazo fijo 30 días</p>
          <p className="mt-1 text-2xl font-bold">{formatPct(tna)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
            BCRA · {tasas.fecha} · $100.000 → {formatARS(ejemplo.interes)}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Dólar oficial</p>
          <p className="mt-1 text-2xl font-bold">{formatARS(dolar.valores.oficial)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">BCRA · {dolar.fecha}</p>
        </div>
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Inflación mensual</p>
          <p className="mt-1 text-2xl font-bold">{formatPct(ipc.valores.ipcMensualPct, 1)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
            INDEC · {ipc.valores.mes} {ipc.valores.anio}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Calculadoras</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {widgets.map((w) => (
            <Link key={w.href} href={w.href} className="group block">
              <img
                src={w.img}
                alt={w.alt}
                width={1200}
                height={630}
                loading="lazy"
                className="aspect-[1200/630] w-full rounded-lg object-cover"
              />
              <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-blue-600">
                {w.titulo}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {w.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Guías</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {guias.map((g) => (
            <Link key={g.slug} href={`/guia/${g.slug}/`} className="group block">
              <img
                src={`/guia/${g.slug}/opengraph-image`}
                alt={g.titulo}
                width={1200}
                height={630}
                loading="lazy"
                className="aspect-[1200/630] w-full rounded-lg object-cover"
              />
              <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-blue-600">
                {g.titulo}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {g.descripcion}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/guia/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Ver todas las guías →
          </Link>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">¿Cómo funciona el sitio?</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Las tasas, el dólar y la inflación salen directo de las APIs del BCRA
          y del INDEC. Un robot actualiza los datos el primer día de cada mes y
          recalcula todas las tablas. Si la tasa de hoy ya cambió, ajustá el
          porcentaje manualmente en cada calculadora: las fórmulas son las
          mismas que usan los bancos.
        </p>
      </section>
    </div>
  );
}
