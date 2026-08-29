import type { Metadata } from "next";
import Link from "next/link";
import SimuladorInflacion from "@/components/SimuladorInflacion";
import { formatARS, formatPct } from "@/lib/format";
import { montoConAportes } from "@/lib/finanzas";
import ipc from "@/data/ipc.json";
import tasas from "@/data/tasas.json";

export const metadata: Metadata = {
  title: "Calculadora de inflación — cuánto valdrá tu dinero",
  description:
    "Simulá cómo la inflación erosiona tus ahorros: cuánto vas a necesitar mañana para comprar lo mismo que hoy, con el IPC oficial del INDEC.",
  alternates: { canonical: "/inflacion/" },
};

export default function PageInflacion() {
  const ipcMensual = ipc.valores.ipcMensualPct;
  const tna = tasas.valores.tnaPlazoFijo30;

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Calculadora de inflación</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Último IPC nacional (INDEC · {ipc.valores.mes} {ipc.valores.anio}):{" "}
          <strong>{formatPct(ipcMensual, 1)}</strong> mensual. Publicado el{" "}
          {ipc.valores.fechaPublicacion}.
        </p>
      </header>

      <div className="card">
        <SimuladorInflacion ipcMensualDefault={ipcMensual} />
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          ¿Qué pasa con $100.000 quietos si la inflación sigue en {formatPct(ipcMensual, 1)}?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                <th className="py-2 pr-4">En</th>
                <th className="py-2 pr-4">Necesitarás</th>
                <th className="py-2 pr-4">Plazo fijo al {formatPct(tna)} TNA</th>
                <th className="py-2 pr-4">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {[3, 6, 12].map((meses) => {
                const futuro = 100_000 * Math.pow(1 + ipcMensual / 100, meses);
                const temTna = tna / 12 / 100;
                const pf = montoConAportes(100_000, 0, temTna, meses);
                const dif = pf - futuro;
                return (
                  <tr key={meses} className="border-b border-neutral-100 dark:border-neutral-900">
                    <td className="py-2 pr-4 font-medium">{meses} meses</td>
                    <td className="py-2 pr-4">{formatARS(futuro)}</td>
                    <td className="py-2 pr-4">{formatARS(pf)}</td>
                    <td className={`py-2 pr-4 font-medium ${dif >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                      {dif >= 0 ? "+" : "−"}{formatARS(Math.abs(dif))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[13px] text-neutral-600 dark:text-neutral-400">
          Plazo fijo con interés simple por mes (TNA {formatPct(tna)} ÷ 12); inflación compuesta
          mensual. Ambos escenarios recalculados automáticamente cada mes.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Dejar la plata quieta también es una decisión
        </h2>
        <p>
          Cada mes que tus ahorros no rinden, compran menos. El punto de comparación justo es{" "}
          <Link href="/plazo-fijo-vs-inflacion/" className="text-blue-600 hover:underline">
            plazo fijo vs inflación
          </Link>
          : no se trata de &laquo;ganar mucho&raquo;, sino de no perder.
        </p>
      </section>
    </article>
  );
}
