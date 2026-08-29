"use client";

import { useMemo, useState } from "react";
import { formatARS, formatNum } from "@/lib/format";

/** Conversor pesos ↔ dólar oficial (cotización BCRA). */
export default function ConversorDolar({ oficial }: { oficial: number }) {
  const [monto, setMonto] = useState(100);
  const [sentido, setSentido] = useState<"usdToArs" | "arsToUsd">("usdToArs");

  const resultado = useMemo(
    () => (sentido === "usdToArs" ? (monto || 0) * oficial : (monto || 0) / oficial),
    [monto, sentido, oficial]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Monto</span>
          <input
            className="input"
            type="number"
            min={0}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Conversión</span>
          <select
            className="input"
            value={sentido}
            onChange={(e) => setSentido(e.target.value as "usdToArs" | "arsToUsd")}
          >
            <option value="usdToArs">Dólares → Pesos</option>
            <option value="arsToUsd">Pesos → Dólares</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-blue-50 p-5 text-center dark:bg-blue-950">
        <p className="text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          {sentido === "usdToArs" ? "Recibís" : "Necesitás"}
        </p>
        <p className="mt-1 text-3xl font-bold text-blue-700 dark:text-blue-300">
          {sentido === "usdToArs"
            ? formatARS(resultado)
            : `US$ ${formatNum(resultado)}`}
        </p>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Dólar oficial BCRA: {formatARS(oficial)} ·{" "}
          {sentido === "usdToArs"
            ? `US$ ${formatNum(monto)} × ${formatARS(oficial)}`
            : `${formatARS(monto)} ÷ ${formatARS(oficial)}`}
        </p>
      </div>
    </div>
  );
}
