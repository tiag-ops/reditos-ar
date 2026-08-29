"use client";

import { useMemo, useState } from "react";
import { montoConAportes } from "@/lib/finanzas";
import { formatARS, formatPct } from "@/lib/format";

/** Interés compuesto con aportes mensuales. */
export default function CalculadoraInteresCompuesto() {
  const [capital, setCapital] = useState(100_000);
  const [aporte, setAporte] = useState(10_000);
  const [temPct, setTemPct] = useState(3);
  const [meses, setMeses] = useState(12);

  const r = useMemo(() => {
    const final = montoConAportes(capital || 0, aporte || 0, (temPct || 0) / 100, meses || 0);
    const aportado = (capital || 0) + (aporte || 0) * (meses || 0);
    return { final, aportado, ganancia: final - aportado };
  }, [capital, aporte, temPct, meses]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Capital inicial ($)</span>
          <input className="input" type="number" min={0} value={capital}
            onChange={(e) => setCapital(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Aporte mensual ($)</span>
          <input className="input" type="number" min={0} value={aporte}
            onChange={(e) => setAporte(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Rendimiento mensual (%)</span>
          <input className="input" type="number" step="0.1" min={0} value={temPct}
            onChange={(e) => setTemPct(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Plazo (meses)</span>
          <select className="input" value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
            {[3, 6, 12, 24, 36, 60].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Total aportado</p>
          <p className="mt-1 font-bold">{formatARS(r.aportado)}</p>
        </div>
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Interés ganado</p>
          <p className="mt-1 font-bold text-green-700 dark:text-green-300">+{formatARS(r.ganancia)}</p>
        </div>
        <div className="card text-center bg-blue-50 dark:bg-blue-950">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Monto final</p>
          <p className="mt-1 text-xl font-bold text-blue-700 dark:text-blue-300">{formatARS(r.final)}</p>
        </div>
      </div>

      <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
        Capitalización mensual con aportes al inicio de cada mes (interés sobre el aporte desde el
        primer día). Tasa efectiva mensual: {formatPct(temPct)}.
      </p>
    </div>
  );
}
