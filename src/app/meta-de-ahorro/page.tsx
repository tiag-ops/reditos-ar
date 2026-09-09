import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraMetaAhorro from "@/components/CalculadoraMetaAhorro";
import { montoConAportes } from "@/lib/finanzas";
import { formatARS, formatPct } from "@/lib/format";
import tasas from "@/data/tasas.json";

export const metadata: Metadata = {
  title: "Meta de ahorro — cuánto apartar por mes",
  description:
    "Calculá cuánto necesitás ahorrar por mes para llegar a tu meta, con el rendimiento de un plazo fijo compuesto mensualmente.",
  alternates: { canonical: "/meta-de-ahorro/" },
};

export default function PageMetaAhorro() {
  const temRef = tasas.valores.tnaPlazoFijo30 / 12;

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Calculadora de meta de ahorro</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Convertí &laquo;quiero juntar X&raquo; en un número concreto: cuánto apartar cada mes. Tasa de
          referencia: {formatPct(temRef)} mensual (TNA {formatPct(tasas.valores.tnaPlazoFijo30)} ÷ 12, BCRA).
        </p>
      </header>

      <div className="card">
        <CalculadoraMetaAhorro />
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">¿Cuánto hay que apartar para juntar $1.000.000?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                <th className="py-2 pr-4">Capital inicial</th>
                {["En 6 meses", "En 12 meses", "En 24 meses"].map((h) => (
                  <th key={h} className="py-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 200_000].map((capital) => (
                <tr key={capital} className="border-b border-neutral-100 dark:border-neutral-900">
                  <td className="py-2 pr-4 font-medium">
                    {capital === 0 ? "Empezando de cero" : `Con ${formatARS(capital)} inicial`}
                  </td>
                  {[6, 12, 24].map((meses) => {
                    const i = temRef / 100;
                    const fvCapital = capital * Math.pow(1 + i, meses);
                    const necesario = 1_000_000 - fvCapital;
                    const aporte =
                      necesario <= 0
                        ? 0
                        : necesario / (((Math.pow(1 + i, meses) - 1) / i) * (1 + i));
                    return (
                      <td key={meses} className="py-2 pr-4">
                        {aporte === 0 ? "✔ Ya lo tenés" : `${formatARS(aporte)}/mes`}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[13px] text-neutral-600 dark:text-neutral-400">
          Aportes al inicio de cada mes con capitalización mensual ({formatPct(temRef)}). Valores
          recalculados automáticamente con la tasa del BCRA.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Metas que se cumplen solas
        </h2>
        <p>
          La clave no es el monto, es la constancia: un débito automático el día de cobro vale más
          que cualquier esfuerzo de fin de mes. Para ver cuánto crece lo que apartás, usá la{" "}
          <Link href="/interes-compuesto/" className="text-blue-600 hover:underline">
            calculadora de interés compuesto
          </Link>
          , y verificá que tu tasa le gane a los precios en{" "}
          <Link href="/plazo-fijo-vs-inflacion/" className="text-blue-600 hover:underline">
            plazo fijo vs inflación
          </Link>
          .
        </p>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">Guías relacionadas</h2>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <Link href="/guia/cuanto-gana-plazo-fijo-500000/" className="text-blue-600 hover:underline">
              ¿Cuánto gana un plazo fijo de $500.000?
            </Link>{" "}
            — dónde meter la cuota que te sobra hoy.
          </li>
          <li>
            <Link href="/guia/como-calcular-interes-plazo-fijo/" className="text-blue-600 hover:underline">
              Cómo calcular el interés de un plazo fijo
            </Link>{" "}
            — fórmula y ejemplos para verificar cualquier oferta.
          </li>
        </ul>
      </section>
    </article>
  );
}
