import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraVsInflacion from "@/components/CalculadoraVsInflacion";
import { formatPct } from "@/lib/format";
import { tea, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";

export const metadata: Metadata = {
  title: "Plazo fijo vs inflación — ¿le ganás o no?",
  description:
    "Compará el rendimiento de tu plazo fijo contra la inflación mensual del INDEC. El cálculo real que casi nadie te muestra, actualizado automáticamente.",
  alternates: { canonical: "/plazo-fijo-vs-inflacion/" },
};

export default function PageVsInflacion() {
  const tna = tasas.valores.tnaPlazoFijo30;
  const ipcMensual = ipc.valores.ipcMensualPct;
  const { realAnual, inflacionAnual } = rendimientoReal(tea(tna), ipcMensual / 100);

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
          ¿Le ganás a la inflación con un plazo fijo?
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Con la tasa actual ({formatPct(tna)} TNA) y una inflación mensual de{" "}
          {formatPct(ipcMensual, 1)} (INDEC · {ipc.valores.mes} {ipc.valores.anio}), el
          rendimiento <strong>real</strong> anual de un plazo fijo es{" "}
          <strong className={realAnual > 0 ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
            {formatPct(realAnual * 100)}
          </strong>
          .
        </p>
      </header>

      <div className="card">
        <CalculadoraVsInflacion tnaDefault={tna} ipcMensualDefault={ipcMensual} />
      </div>

      <section className="space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Por qué la tasa nominal te engaña
        </h2>
        <p>
          Un plazo fijo al {formatPct(tna)} TNA suena a mucho, pero lo que importa es cuánto podés
          comprar con ese dinero al vencer. Si la inflación anualiza{" "}
          {formatPct(inflacionAnual * 100)} y tu TEA es {formatPct(tea(tna) * 100)}, la diferencia
          es tu <strong>rendimiento real</strong>: {(realAnual >= 0 ? "+" : "")}
          {formatPct(realAnual * 100)} anual.
        </p>
        <p>
          La regla rápida: si el IPC mensual supera la TNA dividida 12, estás perdiendo poder de
          compra mes a mes. En ese caso conviene evaluar instrumentos indexados (plazo fijo UVA,
          Lecaps) — te lo contamos en la guía sobre{" "}
          <Link href="/plazo-fijo/" className="text-blue-600 hover:underline">
            cómo funciona el plazo fijo tradicional
          </Link>
          .
        </p>
      </section>

      <section className="card text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          Metodología: inflación anualizada por capitalación compuesta del IPC mensual; TEA con
          capitalización diaria. El IPC es el último dato oficial publicado por INDEC; la tasa, la
          serie del BCRA para depósitos a 30 días. No constituye asesoramiento financiero.
        </p>
      </section>
    </article>
  );
}
