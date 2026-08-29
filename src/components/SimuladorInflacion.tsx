"use client";

import { useMemo, useState } from "react";
import { formatARS } from "@/lib/format";

/**
 * Simulador de inflación acumulada: cuánto vale mañana lo que hoy vale X.
 * Capitalización compuesta del IPC mensual.
 */
export default function SimuladorInflacion({ ipcMensualDefault }: { ipcMensualDefault: number }) {
  const [monto, setMonto] = useState(100_000);
  const [ipc, setIpc] = useState(ipcMensualDefault);
  const [meses, setMeses] = useState(12);

  const r = useMemo(() => {
    const factor = Math.pow(1 + (ipc || 0) / 100, meses || 0);
    return { futuro: (monto || 0) * factor, factor };
  }, [monto, ipc, meses]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Monto de hoy ($)</span>
          <input className="input" type="number" min={0} value={monto}
            onChange={(e) => setMonto(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Inflación mensual estimada (%)</span>
          <input className="input" type="number" step="0.1" min={0} value={ipc}
            onChange={(e) => setIpc(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Horizonte (meses)</span>
          <select className="input" value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
            {[3, 6, 12, 24, 36].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-red-50 p-5 text-center dark:bg-red-950">
        <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          Para comprar lo mismo en {meses} meses vas a necesitar
        </p>
        <p className="mt-1 text-3xl font-bold text-red-700 dark:text-red-300">{formatARS(r.futuro)}</p>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Acumulación de {(r.factor - 1) * 100 >= 0 ? `+${((r.factor - 1) * 100).toFixed(1)}` : "0"}%
          en {meses} meses a {ipc}% mensual. Lo que hoy vale {formatARS(monto)} habrá perdido esa
          parte de su poder de compra si está quieto.
        </p>
      </div>
    </div>
  );
}
