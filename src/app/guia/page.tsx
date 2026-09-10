import type { Metadata } from "next";
import Link from "next/link";
import { guias } from "@/lib/articulos";

export const metadata: Metadata = {
  title: "Guías de ahorro e inversión",
  description:
    "Todas las guías: plazo fijo, UVA, CER, cauciones, Lecaps, dólar e inflación explicados simple y con datos oficiales actualizados.",
  alternates: { canonical: "/guia/" },
};

export default function PageIndiceGuias() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Guías</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Explicaciones simples con números reales: cada tabla se recalcula automáticamente con
          los datos del BCRA e INDEC.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {guias.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guia/${g.slug}/`}
              className="card block h-full hover:border-blue-400"
            >
              <h2 className="text-lg font-bold leading-snug">{g.titulo}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
