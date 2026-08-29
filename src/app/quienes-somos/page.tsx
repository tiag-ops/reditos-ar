import type { Metadata } from "next";
import { formatPct } from "@/lib/format";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Quién hace Redito.ar, de dónde salen los datos y cuál es nuestra política editorial con las fuentes oficiales.",
  alternates: { canonical: "/quienes-somos/" },
};

export default function PageQuienesSomos() {
  return (
    <article className="space-y-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold sm:text-3xl">Quiénes somos</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">El proyecto</h2>
        <p>
          Redito.ar nació en 2026 con una idea simple: que cualquier persona en Argentina pueda
          calcular en segundos si su plata rinde de verdad, sin cuentas confusas y sin letra
          chica. Somos un sitio independiente, financiado únicamente con publicidad y sin
          vínculos comerciales con bancos, brokers ni fintechs.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">De dónde salen los datos</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Tasas de interés:</strong> Banco Central de la República Argentina (BCRA),
            serie de tasa de depósitos a 30 días. Último dato procesado: {formatPct(tasas.valores.tnaPlazoFijo30)} TNA
            ({tasas.fecha}).
          </li>
          <li>
            <strong>Inflación:</strong> Índice de Precios al Consumidor (IPC) nacional del INDEC.
            Último dato: {formatPct(ipc.valores.ipcMensualPct, 1)} ({ipc.valores.mes} {ipc.valores.anio}).
          </li>
          <li>
            <strong>Dólar:</strong> cotización oficial A3500 del BCRA.
          </li>
        </ul>
        <p>
          Las actualizaciones son automáticas: un proceso interno consulta las fuentes oficiales
          el primer día de cada mes y recalcula todas las tablas del sitio. Los errores de datos
          se corrigen en cuanto se detectan; si encontrás uno, avisanos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Política editorial</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Toda tabla muestra su fecha y fuente. No publicamos números sin origen.</li>
          <li>Las fórmulas de cálculo están documentadas en cada página.</li>
          <li>
            No recomendamos instrumentos ni entidades específicas: explicamos cómo funcionan y
            cómo calcularlos.
          </li>
          <li>
            El sitio es de carácter informativo y no sustituye el asesoramiento de un profesional
            financiero matriculado.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>
          Consultas, correcciones y sugerencias: por el formulario de contacto o por las vías que
          figuran en el pie de página. Leemos todo.
        </p>
      </section>
    </article>
  );
}
