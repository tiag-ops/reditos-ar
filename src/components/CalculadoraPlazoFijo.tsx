"use client";

import { useMemo, useState } from "react";
import { vencimientoPlazoFijo } from "@/lib/finanzas";
import { formatARS, formatARS2, formatPct } from "@/lib/format";

/** Simulador de plazo fijo tradicional: monto + tasa + días. */
export default function CalculadoraPlazoFijo({ tnaDefault }: { tnaDefault: number }) {
  const [monto, setMonto] = useState(100_000);
  const [tna, setTna] = useState(tnaDefault);
  const [dias, setDias] = useState(30);

  const { interes, total } = useMemo(
    () => vencimientoPlazoFijo(monto || 0, tna || 0, dias || 30),
    [monto, tna, dias]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Monto a invertir ($)</span>
          <input
            className="input"
            type="number"
            min={0}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">TNA anual (%)</span>
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
          <span className="mb-1 block font-medium">Plazo (días)</span>
          <select
            className="input"
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
          >
            {[30, 60, 90, 180, 365].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl bg-blue-50 p-4 sm:grid-cols-2 dark:bg-blue-950">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">Interés ganado</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatARS2(interes)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">Total al vencimiento</p>
          <p className="text-2xl font-bold">{formatARS(total)}</p>
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Fórmula: interés = capital × TNA × (días ÷ 365). Con {formatPct(tna)} TNA en {dias} días.
        Los montos son orientativos; tu banco puede aplicar una tasa distinta.
      </p>
    </div>
  );
}
