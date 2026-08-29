import Link from "next/link";
import { formatARS, formatPct } from "@/lib/format";
import { vencimientoPlazoFijo } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import dolar from "@/data/dolar.json";
import ipc from "@/data/ipc.json";

export default function Home() {
  const tna = tasas.valores.tnaPlazoFijo30;
  const ejemplo = vencimientoPlazoFijo(100_000, tna, 30);

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Cuánto rinde tu ahorro <span className="text-blue-600">hoy</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          Calculadoras de plazo fijo, dólar e inflación con datos oficiales del
          BCRA e INDEC, actualizadas automáticamente cada mes.
        </p>
      </section>

      {/* Widget "hoy": valores del JSON de datos, nunca hardcodeados */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">TNA plazo fijo 30 días</p>
          <p className="mt-1 text-2xl font-bold">{formatPct(tna)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
            BCRA · {tasas.fecha} · $100.000 → {formatARS(ejemplo.interes)}
          </p>
        </div>
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Dólar oficial</p>
          <p className="mt-1 text-2xl font-bold">{formatARS(dolar.valores.oficial)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">BCRA · {dolar.fecha}</p>
        </div>
        <div className="card text-center">
          <p className="text-[13px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">Inflación mensual</p>
          <p className="mt-1 text-2xl font-bold">{formatPct(ipc.valores.ipcMensualPct, 1)}</p>
          <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
            INDEC · {ipc.valores.mes} {ipc.valores.anio}
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Calculadoras</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href="/plazo-fijo/" className="card hover:border-blue-400">
            <h3 className="font-semibold">📈 Plazo fijo tradicional</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Cuánto ganás con tu plazo fijo a 30, 60 o 90 días.
            </p>
          </Link>
          <Link href="/plazo-fijo-vs-inflacion/" className="card hover:border-blue-400">
            <h3 className="font-semibold">🔥 Plazo fijo vs inflación</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              ¿Le ganás o no a la inflación? La cuenta que casi nadie te muestra.
            </p>
          </Link>
          <Link href="/interes-compuesto/" className="card hover:border-blue-400">
            <h3 className="font-semibold">🌱 Interés compuesto</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Con aportes mensuales: el efecto bola de nieve.
            </p>
          </Link>
          <Link href="/dolar/" className="card hover:border-blue-400">
            <h3 className="font-semibold">💵 Dólar oficial</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Cotización BCRA de hoy y conversor pesos ↔ dólares.
            </p>
          </Link>
          <Link href="/inflacion/" className="card hover:border-blue-400">
            <h3 className="font-semibold">🔥 Inflación</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Cuánto vas a necesitar mañana para comprar lo mismo que hoy.
            </p>
          </Link>
          <Link href="/meta-de-ahorro/" className="card hover:border-blue-400">
            <h3 className="font-semibold">🎯 Meta de ahorro</h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Cuánto apartar por mes para llegar a tu meta.
            </p>
          </Link>
        </div>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">¿Cómo funciona el sitio?</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Las tasas, el dólar y la inflación salen directo de las APIs del BCRA
          y del INDEC. Un robot actualiza los datos el primer día de cada mes y
          recalcula todas las tablas. Si la tasa de hoy ya cambió, ajustá el
          porcentaje manualmente en cada calculadora: las fórmulas son las
          mismas que usan los bancos.
        </p>
      </section>
    </div>
  );
}
