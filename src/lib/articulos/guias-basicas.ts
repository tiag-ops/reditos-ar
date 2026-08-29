import { formatPct, formatARS } from "@/lib/format";
import { vencimientoPlazoFijo, tea, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import dolar from "@/data/dolar.json";
import type { Guia } from "./tipos";

const tna = tasas.valores.tnaPlazoFijo30;
const ipcMensual = ipc.valores.ipcMensualPct;
const { realAnual, inflacionAnual } = rendimientoReal(tea(tna), ipcMensual / 100);

function tablaGanancias(monto: number): string[][] {
  return [30, 60, 90].map((d) => {
    const { interes } = vencimientoPlazoFijo(monto, tna, d);
    return [`Interés a ${d} días`, `${formatPct((interes / monto) * 100)}`, formatARS(interes)];
  });
}

/** Guías 1–3: la familia "¿cuánto gana...?" — las búsquedas de mayor volumen. */
export function guiasCuantoGana(): Guia[] {
  const montos = [
    { m: 100_000, etiqueta: "100 mil pesos" },
    { m: 500_000, etiqueta: "500 mil pesos" },
    { m: 1_000_000, etiqueta: "un millón de pesos" },
  ];
  return montos.map(({ m, etiqueta }) => ({
    slug: `cuanto-gana-plazo-fijo-${m.toLocaleString("en-US").replace(/,/g, "")}`,
    titulo: `¿Cuánto gana un plazo fijo de $${m.toLocaleString("es-AR")}?`,
    descripcion: `Interés exacto de un plazo fijo de ${etiqueta} a 30, 60 y 90 días con la tasa del BCRA (${formatPct(tna)} TNA). Actualizado automáticamente cada mes.`,
    bloques: [
      {
        tipo: "p",
        texto: `Con la tasa de referencia actual (${formatPct(tna)} TNA según el BCRA), un plazo fijo de ${formatARS(m)} produce lo siguiente:`,
      },
      {
        tipo: "tabla",
        headers: ["Plazo", "Rendimiento %", "Interés en pesos"],
        filas: tablaGanancias(m),
        caption: `TNA ${formatPct(tna)} · TEA ${formatPct(tea(tna) * 100)} · datos BCRA ${tasas.fecha}`,
      },
      {
        tipo: "h2",
        texto: "¿Y contra la inflación?",
      },
      {
        tipo: "p",
        texto: `El número de arriba es nominal: no descuenta la subida de precios. Con el IPC en ${formatPct(ipcMensual, 1)} mensual (INDEC ${ipc.valores.mes} ${ipc.valores.anio}), el rendimiento real anual del plazo fijo hoy es ${formatPct(realAnual * 100)}. Es decir: ${realAnual >= 0 ? "le ganás" : "no le ganás"} a la inflación invirtiendo a la tasa promedio.`,
      },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "Verificá con tu monto exacto si le ganás a la inflación" },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Simulá tu plazo fijo con otro monto o plazo" },
    ],
    faqs: [
      {
        pregunta: `¿Cuánto gana ${etiqueta} en un plazo fijo a 30 días?`,
        respuesta: `A la tasa de referencia actual (${formatPct(tna)} TNA), el interés de 30 días es de ${formatARS(vencimientoPlazoFijo(m, tna, 30).interes)}. Al vencimiento recibís ${formatARS(vencimientoPlazoFijo(m, tna, 30).total)}.`,
      },
      {
        pregunta: "¿La tasa que uso es la de mi banco?",
        respuesta: `No: usamos la tasa promedio de depósitos a 30 días del sistema financiero que publica el BCRA (${formatPct(tna)} al ${tasas.fecha}). Tu banco puede ofrecer más o menos, y los bancos digitales suelen pagar mejor que los tradicionales.`,
      },
      {
        pregunta: "¿Cada cuánto se actualiza esta página?",
        respuesta: "La tasa viene del BCRA y se actualiza automáticamente el primer día de cada mes. Las fórmulas nunca cambian; solo el dato.",
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
      { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
    ],
  }));
}

/** Guía 4: PF vs dólar. */
export function guiaPlazoFijoVsDolar(): Guia {
  const { total: pf90 } = vencimientoPlazoFijo(1_000_000, tna, 90);
  return {
    slug: "plazo-fijo-vs-dolar",
    titulo: "Plazo fijo vs dólar: dónde conviene poner los ahorros",
    descripcion: `Comparada honesta entre ahorrar en pesos (plazo fijo al ${formatPct(tna)}) y en dólares (oficial a ${formatARS(dolar.valores.oficial)}). Con números reales y actualizados.`,
    bloques: [
      {
        tipo: "p",
        texto: `La pregunta que todo ahorrador argentino se hace. Los números de hoy: el plazo fijo paga ${formatPct(tna)} TNA y el dólar oficial está en ${formatARS(dolar.valores.oficial)} (BCRA, ${dolar.fecha}).`,
      },
      {
        tipo: "tabla",
        headers: ["Escenario a 90 días (con $1.000.000)", "Resultado"],
        filas: [
          ["Plazo fijo tradicional", `Terminás con ${formatARS(pf90)} en pesos`],
          ["Dólar oficial sin moverse", `Seguís con US$ ${Math.round(1_000_000 / dolar.valores.oficial)}`],
          ["Dólar +2% en 90 días", `US$ ${(1_000_000 / dolar.valores.oficial * 1.02).toFixed(0)} en dólares`],
          ["Inflación acumulada estimada", `${(((1 + ipcMensual / 100) ** 3 - 1) * 100).toFixed(1)}% — tu punto de comparación`],
        ],
        caption: `Cálculo al ${tasas.fecha} con datos BCRA/INDEC`,
      },
      {
        tipo: "h2",
        texto: "La pregunta correcta no es pesos o dólares",
      },
      {
        tipo: "p",
        texto: `Es: ¿mi dinero rinde más que la inflación? Hoy el plazo fijo rinde ${formatPct(realAnual * 100)} real anual contra la inflación anualizada de ${formatPct(inflacionAnual * 100)}. El dólar, en cambio, no paga interés: es una apuesta a que suba más que la inflación.`,
      },
      {
        tipo: "h2",
        texto: "Regla práctica",
      },
      {
        tipo: "ul",
        items: [
          "Gastos de los próximos meses: pesos a la vista (caja de ahorro).",
          "Ahorro de mediano plazo: plazo fijo si le gana a la inflación; sino, instrumentos indexados.",
          "Ahorro de largo plazo o protección: la decisión del dólar depende de tu expectativa del tipo de cambio, no de fórmulas.",
        ],
      },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "Calculá el rendimiento real de tu plazo fijo" },
      { tipo: "calc", href: "/dolar/", texto: "Vé el dólar oficial de hoy y convertí montos" },
    ],
    faqs: [
      {
        pregunta: "¿Conviene más el plazo fijo o el dólar?",
        respuesta: `Depende de la inflación esperada y del movimiento del dólar. Hoy el plazo fijo rinde ${formatPct(tna)} nominal (${formatPct(realAnual * 100)} real anual). El dólar oficial está en ${formatARS(dolar.valores.oficial)} y no genera intereses: gana solo si sube más que la inflación.`,
      },
      {
        pregunta: "¿Qué es mejor para protegerse de la inflación?",
        respuesta: `Un instrumento cuyo rendimiento supere al IPC. Si el plazo fijo no le gana (hoy: ${formatPct(realAnual * 100)} real), evaluá plazo fijo UVA o Lecaps, que ajustan por inflación o tasa de mercado.`,
      },
    ],
    relacionadas: [
      { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
      { titulo: "Dólar oficial hoy", href: "/dolar/" },
    ],
  };
}

/** Guía 5: la fórmula del interés. */
export function guiaFormula(): Guia {
  return {
    slug: "como-calcular-interes-plazo-fijo",
    titulo: "Cómo calcular el interés de un plazo fijo (fórmula y ejemplos)",
    descripcion: "La fórmula del interés simple paso a paso, TNA vs TEA explicadas sin vueltas, y ejemplos con la tasa actual del BCRA.",
    bloques: [
      {
        tipo: "p",
        texto: "El plazo fijo tradicional usa interés simple. La fórmula completa es esta:",
      },
      {
        tipo: "p",
        texto: "Interés = Capital × TNA × (días ÷ 365)",
      },
      {
        tipo: "h2",
        texto: "Ejemplo con la tasa de hoy",
      },
      {
        tipo: "p",
        texto: `Con la TNA promedio del BCRA (${formatPct(tna)}) y $500.000 a 30 días: 500.000 × 0,${Math.round(tna * 100)} × (30 ÷ 365). El resultado: ${formatARS(vencimientoPlazoFijo(500_000, tna, 30).interes)} de interés y ${formatARS(vencimientoPlazoFijo(500_000, tna, 30).total)} al vencimiento.`,
      },
      {
        tipo: "tabla",
        headers: ["Concepto", "Qué significa"],
        filas: [
          ["TNA", `Tasa Nominal Anual: la que informa el banco (${formatPct(tna)} hoy)`],
          ["TEA", `Tasa Efectiva Anual: incluye capitalización diaria (${formatPct(tea(tna) * 100)} hoy)`],
          ["TEM", `Tasa Efectiva Mensual: aproximación TNA ÷ 12 (${formatPct(tna / 12)})`],
        ],
      },
      {
        tipo: "h2",
        texto: "TNA vs TEA: cuál mirar",
      },
      {
        tipo: "p",
        texto: `Para comparar ofertas entre bancos, mirá la TEA: es la que refleja el rendimiento real si renovás. Para calcular el interés de un plazo único a 30 días, alcanza la TNA con la fórmula de arriba. La diferencia no es menor: ${formatPct(tna)} TNA son ${formatPct(tea(tna) * 100)} TEA.`,
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "No querés hacer cuentas: usá la calculadora" },
      { tipo: "calc", href: "/interes-compuesto/", texto: "¿Y si renovás mes a mes? Interés compuesto" },
    ],
    faqs: [
      {
        pregunta: "¿Cómo se calcula el interés de un plazo fijo a 30 días?",
        respuesta: `Interés = capital × TNA × (30/365). Ejemplo: $500.000 al ${formatPct(tna)} TNA genera ${formatARS(vencimientoPlazoFijo(500_000, tna, 30).interes)}.`,
      },
      {
        pregunta: "¿Qué es mejor, TNA o TEA?",
        respuesta: "La TEA siempre es mayor que la TNA porque incluye la capitalización diaria. Para comparar plazos fijos entre bancos, la TEA es la medida justa.",
      },
      {
        pregunta: "¿El plazo fijo paga interés compuesto?",
        respuesta: "No: el plazo fijo tradicional paga interés simple al vencimiento. Compuesto solo si lo renovás completo mes a mes — simulalo en nuestra calculadora de interés compuesto.",
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
      { titulo: "Interés compuesto", href: "/interes-compuesto/" },
    ],
  };
}
