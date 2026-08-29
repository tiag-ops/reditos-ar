import type { Metadata } from "next";
import Link from "next/link";
import ConversorDolar from "@/components/ConversorDolar";
import { formatARS, formatPct } from "@/lib/format";
import dolar from "@/data/dolar.json";
import tasas from "@/data/tasas.json";

export const metadata: Metadata = {
  title: "Dólar oficial hoy — conversor pesos a dólares",
  description:
    "Cuánto vale el dólar oficial hoy según el BCRA y conversor de pesos a dólares, actualizado automáticamente.",
  alternates: { canonical: "/dolar/" },
};

export default function PageDolar() {
  const oficial = dolar.valores.oficial;
  const serie = tasas.valores.serie7d;

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Dólar oficial hoy</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Cotización BCRA (A3500) al {dolar.fecha}:{" "}
          <strong className="text-xl">{formatARS(oficial)}</strong>
        </p>
      </header>

      <div className="card">
        <ConversorDolar oficial={oficial} />
      </div>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Ahorrar en dólares vs pesos: la cuenta rápida
        </h2>
        <p>
          Con la TNA del plazo fijo en {formatPct(tasas.valores.tnaPlazoFijo30)} y el dólar a{" "}
          {formatARS(oficial)}, la pregunta clave es a qué ritmo se mueve cada uno. Los intereses
          en pesos son inmediatos; la subida del dólar, incierta.{" "}
          <Link href="/plazo-fijo-vs-inflacion/" className="text-blue-600 hover:underline">
            Comparalo contra la inflación
          </Link>{" "}
          antes de decidir.
        </p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Esta página usa el dólar oficial mayorista del BCRA. El dólar blue y el
          ahorro (con impuestos) se agregan en próximas versiones.
        </p>
      </section>
    </article>
  );
}
