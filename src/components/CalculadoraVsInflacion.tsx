"use client";

import { useMemo, useState } from "react";
import { rendimientoReal, tea, interesSimple } from "@/lib/finanzas";
import { formatARS2, formatPct } from "@/lib/format";

/**
 * La calculadora estrella: ¿le ganás o no a la inflación?
 * Compara el rendimiento nominal del plazo fijo contra la inflación mensual (IPC INDEC).
 */
export default function CalculadoraVsInflacion({
  tnaDefault,
  ipcMensualDefault,
}: {
  tnaDefault: number;
  ipcMensualDefault: number;
}) {
  const [monto, setMonto] = useState(100_000);
  const [tna, setTna] = useState(tnaDefault);
  const [ipcMensual, setIpcMensual] = useState(ipcMensualDefault);

  const r = useMemo(() => {
    const teaDec = tea(tna || 0);
    const { inflacionAnual, realAnual } = rendimientoReal(teaDec, (ipcMensual || 0) / 100);
    // En 30 días: interés nominal vs pérdida por inflación
    const interes30 = interesSimple(monto || 0, tna || 0, 30);
    const perdidaInflacion30 = (monto || 0) * ((ipcMensual || 0) / 100);
    const real30 = interes30 - perdidaInflacion30;
    const leGana = realAnual > 0;
    return { teaDec, inflacionAnual, realAnual, interes30, perdidaInflacion30, real30, leGana };
  }, [monto, tna, ipcMensual]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Monto ($)</span>
          <input
            className="input"
            type="number"
            min={0}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">TNA plazo fijo (%)</span>
          <input
            className="input"
            type="number"
            step="0.01"
            min={0}
            value={tna}
            onChange={(e) => setTna(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Inflación mensual (%)</span>
          <input
            className="input"
            type="number"
            step="0.1"
            min={0}
            value={ipcMensual}
            onChange={(e) => setIpcMensual(Number(e.target.value))}
          />
        </label>
      </div>

      <div
        className={`rounded-xl p-5 text-center ${
          r.leGana ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
        }`}
      >
        <p className="text-3xl" aria-hidden>
          {r.leGana ? "✅" : "❌"}
        </p>
        <p className="mt-1 text-lg font-bold">
          {r.leGana
            ? "Le ganás a la inflación"
            : "No le ganás a la inflación"}
        </p>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Rendimiento real anual:{" "}
          <strong className={r.leGana ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
            {formatPct(r.realAnual * 100)}
          </strong>{" "}
          (TEA {formatPct(r.teaDec * 100)} vs inflación anualizada {formatPct(r.inflacionAnual * 100)})
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Interés en 30 días</p>
          <p className="mt-1 font-bold text-green-700 dark:text-green-300">+{formatARS2(r.interes30)}</p>
        </div>
        <div className="card text-center">
          <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Pérdida por inflación</p>
          <p className="mt-1 font-bold text-red-700 dark:text-red-300">−{formatARS2(r.perdidaInflacion30)}</p>
        </div>
        <div className="card text-center">
          <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Balance real del mes</p>
          <p className={`mt-1 font-bold ${r.real30 >= 0 ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
            {r.real30 >= 0 ? "+" : "−"}{formatARS2(Math.abs(r.real30))}
          </p>
        </div>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        Métodos: TEA con capitalización diaria; inflación anualizada por capitalización compuesta
        del IPC mensual. El balance de 30 días es una aproximación lineal (interés simple vs IPC del
        mes). No constituye asesoramiento financiero.
      </p>
    </div>
  );
}
