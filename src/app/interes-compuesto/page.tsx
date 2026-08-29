import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraInteresCompuesto from "@/components/CalculadoraInteresCompuesto";
import { formatPct } from "@/lib/format";
import { montoConAportes } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";

export const metadata: Metadata = {
  title: "Calculadora de interés compuesto con aportes mensuales",
  description:
    "Simulá el efecto bola de nieve: capital inicial + aportes mensuales con capitalización compuesta. Grilla de escenarios generada con datos actualizados.",
  alternates: { canonical: "/interes-compuesto/" },
};

export default function PageInteresCompuesto() {
  const temRef = tasas.valores.tnaPlazoFijo30 / 12;

  const escenarios = [
    { capital: 100_000, aporte: 10_000 },
    { capital: 500_000, aporte: 50_000 },
    { capital: 1_000_000, aporte: 100_000 },
  ];
  const horizontes = [12, 24, 60];

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Interés compuesto con aportes mensuales</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          El interés compuesto es cuando tus intereses también generan intereses. Con aportes
          mensuales, el efecto se multiplica.
        </p>
      </header>

      <div className="card">
        <CalculadoraInteresCompuesto />
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          Escenarios con la tasa de referencia ({formatPct(temRef)} mensual)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                <th className="py-2 pr-4">Capital + aporte mensual</th>
                {horizontes.map((m) => (
                  <th key={m} className="py-2 pr-4">A {m} meses</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escenarios.map(({ capital, aporte }) => (
                <tr key={capital} className="border-b border-neutral-100 dark:border-neutral-900">
                  <td className="py-2 pr-4 font-medium">
                    ${capital.toLocaleString("es-AR")} + ${aporte.toLocaleString("es-AR")}/mes
                  </td>
                  {horizontes.map((m) => {
                    const final = montoConAportes(capital, aporte, temRef / 100, m);
                    const aportado = capital + aporte * m;
                    const ganancia = ((final - aportado) / aportado) * 100;
                    return (
                      <td key={m} className="py-2 pr-4">
                        ${final.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                        <span className="ml-1 text-xs text-green-700 dark:text-green-400">
                          (+{ganancia.toFixed(1)}%)
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          TEM de referencia = TNA del plazo fijo a 30 días ÷ 12 ({formatPct(temRef)}). Los plazos
          fijos no capitalizan mensualmente (pagan interés simple al vencimiento); esta tabla
          asume renovación total mes a mes, que es la práctica habitual.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          La regla del 72 (para quedar bien en un asado)
        </h2>
        <p>
          Dividí 72 por el rendimiento mensual en porcentaje y obtenés aproximadamente en cuántos
          meses duplicás tu plata. Con {formatPct(temRef)} mensual: 72 ÷ {temRef.toFixed(1)} ≈{" "}
          {Math.round(72 / temRef)} meses.
        </p>
        <p>
          Para poner en marcha el plan:{" "}
          <Link href="/plazo-fijo/" className="text-blue-600 hover:underline">
            calculá tu plazo fijo hoy
          </Link>{" "}
          y verificá que le ganes a los precios en{" "}
          <Link href="/plazo-fijo-vs-inflacion/" className="text-blue-600 hover:underline">
            plazo fijo vs inflación
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
