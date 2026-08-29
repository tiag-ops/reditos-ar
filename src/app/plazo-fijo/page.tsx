import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraPlazoFijo from "@/components/CalculadoraPlazoFijo";
import { formatPct } from "@/lib/format";
import { vencimientoPlazoFijo, tea } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";

export const metadata: Metadata = {
  title: "Calculadora de plazo fijo — cuánto ganás hoy",
  description:
    "Simulá tu plazo fijo tradicional: interés y total al vencimiento con la tasa de referencia del BCRA, actualizada automáticamente cada mes.",
  alternates: { canonical: "/plazo-fijo/" },
};

export default function PagePlazoFijo() {
  const tna = tasas.valores.tnaPlazoFijo30;

  // Tabla SEO viva: generada del JSON en build-time
  const montos = [100_000, 500_000, 1_000_000, 5_000_000];
  const plazos = [30, 60, 90];

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Calculadora de plazo fijo</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Tasa de referencia: <strong>{formatPct(tna)} TNA</strong> (depósitos a 30 días, BCRA ·{" "}
          {tasas.fecha}). Simulá con tu monto y plazo.
        </p>
      </header>

      <div className="card">
        <CalculadoraPlazoFijo tnaDefault={tna} />
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          ¿Cuánto gano con un plazo fijo de $100.000, $500.000 o $1.000.000?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                <th className="py-2 pr-4">Monto</th>
                {plazos.map((d) => (
                  <th key={d} className="py-2 pr-4">Interés a {d} días</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {montos.map((m) => (
                <tr key={m} className="border-b border-neutral-100 dark:border-neutral-900">
                  <td className="py-2 pr-4 font-medium">${m.toLocaleString("es-AR")}</td>
                  {plazos.map((d) => (
                    <td key={d} className="py-2 pr-4">
                      {formatPct(
                        (vencimientoPlazoFijo(m, tna, d).interes / m) * 100
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[13px] text-neutral-600 dark:text-neutral-400">
          Rendimiento porcentual sobre el capital (interés simple, TNA {formatPct(tna)}, TEA{" "}
          {formatPct(tea(tna) * 100)}). Valores recalculados automáticamente cada mes desde los
          datos del BCRA.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Cómo se calcula el interés de un plazo fijo
        </h2>
        <p>
          El plazo fijo tradicional paga interés simple: <strong>capital × TNA × (días ÷ 365)</strong>.
          La TNA es la Tasa Nominal Anual que informa tu banco; el BCRA publica la tasa promedio del
          sistema, que usamos como referencia.
        </p>
        <p>
          Si comparás ofertas, mirá siempre la <strong>TEA</strong> (Tasa Efectiva Anual), que
          incluye la capitalización diaria: con TNA {formatPct(tna)} la TEA es{" "}
          {formatPct(tea(tna) * 100)}.
        </p>
        <p>
          ¿La cuenta que de verdad importa?{" "}
          <Link href="/plazo-fijo-vs-inflacion/" className="text-blue-600 hover:underline">
            Plazo fijo vs inflación: ¿le ganás o no?
          </Link>
        </p>
      </section>

      <section className="card text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          Descargo de responsabilidad: esta calculadora es orientativa y no constituye asesoramiento
          financiero. Las tasas reales varían por banco, monto y plazo. Fuente de la tasa de
          referencia: BCRA, serie de tasa de interés de depósitos a 30 días ({tasas.fecha}).
        </p>
      </section>
    </article>
  );
}
