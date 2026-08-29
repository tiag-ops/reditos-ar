"use client";

import { useMemo, useState } from "react";
import { montoConAportes } from "@/lib/finanzas";
import { formatARS } from "@/lib/format";

/** Cuánto tenés que apartar por mes para llegar a una meta. */
export default function CalculadoraMetaAhorro() {
  const [meta, setMeta] = useState(1_000_000);
  const [capitalInicial, setCapitalInicial] = useState(100_000);
  const [temPct, setTemPct] = useState(1.8);
  const [meses, setMeses] = useState(12);

  /**
   * Despejamos el aporte mensual de la fórmula de anualidad anticipada:
   * M = C*(1+i)^n + A*[((1+i)^n - 1)/i]*(1+i)
   * => A = (M - C*(1+i)^n) / ([((1+i)^n - 1)/i]*(1+i))
   */
  const aporteNecesario = useMemo(() => {
    const i = (temPct || 0) / 100;
    const n = meses || 1;
    const fvCapital = (capitalInicial || 0) * Math.pow(1 + i, n);
    const factorAnualidad = i === 0 ? n : (Math.pow(1 + i, n) - 1) / i * (1 + i);
    const necesario = (meta || 0) - fvCapital;
    return necesario <= 0 ? 0 : necesario / factorAnualidad;
  }, [meta, capitalInicial, temPct, meses]);

  const alcanzada = aporteNecesario === 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Tu meta ($)</span>
          <input className="input" type="number" min={0} value={meta}
            onChange={(e) => setMeta(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Capital inicial ($)</span>
          <input className="input" type="number" min={0} value={capitalInicial}
            onChange={(e) => setCapitalInicial(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Rendimiento mensual (%)</span>
          <input className="input" type="number" step="0.1" min={0} value={temPct}
            onChange={(e) => setTemPct(Number(e.target.value))} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Plazo (meses)</span>
          <select className="input" value={meses} onChange={(e) => setMeses(Number(e.target.value))}>
            {[6, 12, 18, 24, 36, 48].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-blue-50 p-5 text-center dark:bg-blue-950">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {alcanzada
            ? "Tu capital inicial solo ya alcanza la meta 🎉"
            : "Tenés que apartar por mes"}
        </p>
        <p className="mt-1 text-3xl font-bold text-blue-700 dark:text-blue-300">
          {alcanzada ? "✔" : formatARS(aporteNecesario)}
        </p>
        {!alcanzada && (
          <p className="mt-1 text-xs text-neutral-500">
            {formatARS(aporteNecesario)} × {meses} meses + tu capital inicial creciendo al{" "}
            {temPct}% mensual = {formatARS(meta)}
          </p>
        )}
      </div>
    </div>
  );
}
