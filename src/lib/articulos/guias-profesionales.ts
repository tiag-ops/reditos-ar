import { formatPct, formatARS } from "@/lib/format";
import { vencimientoPlazoFijo, tea, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import type { Guia } from "./tipos";

/**
 * PR 3 — guías profesionales del plan (§ FASE 2):
 * 1. Ganancias sobre intereses de plazo fijo (alta autoridad, contadores)
 * 2. Tasa de interés real: cálculo y por qué importa
 */
export function guiasProfesionales(): Guia[] {
  const tna = tasas.valores.tnaPlazoFijo30;
  const ipcMensual = ipc.valores.ipcMensualPct;
  const { realAnual, inflacionAnual } = rendimientoReal(tea(tna), ipcMensual / 100);

  const ganancias = (): Guia => ({
    slug: "ganancias-plazo-fijo-retencion",
    titulo: "Ganancias: cuánto te retienen de un plazo fijo (tabla y ejemplos)",
    descripcion: `Quién paga Ganancias por intereses de plazos fijos, la tabla de retención vigente y ejemplos alineados con la tasa del BCRA (${formatPct(tna)} TNA).`,
    bloques: [
      {
        tipo: "p",
        texto: `Desde la reforma de 2024 (rg 5462/24, prorrogada luego), Ganancias sobre intereses de plazos fijos de personas humanas no se calcula con escala: es un gravamen específico de alícuota fija (5% o 7,5%) según el capital colocado del período. La AFIP actualiza los tramos dos veces por año.`,
      },
      {
        tipo: "h2",
        texto: "¿A quiénes alcanza?",
      },
      {
        tipo: "ul",
        items: [
          "Personas humanas residentes con plazos fijos en pesos y en dólares.",
          "Titulares y cotitulares: la retención se aplica sobre tu parte.",
          "No alcanza a exentos: beneficiarios de jubilación/pensión y monotributistas de categorías A-B, entre otros.",
          "No se compensa con el mínimo no imponible de la escala tradicional: es paralela y automática.",
        ],
      },
      {
        tipo: "tabla",
        headers: ["Capital colocada del período", "Alícuota sobre intereses"],
        filas: [
          ["Hasta $90.000.000", "5%"],
          ["De $90.000.000 a $450.000.000", "5% + graduales"],
          ["Más de $450.000.000", "7,5%"],
        ],
        caption: "Tabla base — verificá los valores vigentes en AFIP: se ajustan 2 veces por año",
      },
      {
        tipo: "h2",
        texto: "Ejemplo con la tasa de hoy",
      },
      {
        tipo: "p",
        texto: `Para el 99% de los ahorradores el tramo aplica 5%. Con la tasa promedio (${formatPct(tna)} TNA), un plazo fijo de $5.000.000 a 30 días genera ${formatARS(vencimientoPlazoFijo(5_000_000, tna, 30).interes)} de interés bruto; la retención aproximada del 5% es ${formatARS(vencimientoPlazoFijo(5_000_000, tna, 30).interes * 0.05)}. Con $1.000.000 a 30 días: interés ${formatARS(vencimientoPlazoFijo(1_000_000, tna, 30).interes)}, retención ≈ ${formatARS(vencimientoPlazoFijo(1_000_000, tna, 30).interes * 0.05)}. La tabla que mostramos arriba usa valores brutos.`,
      },
      {
        tipo: "h2",
        texto: "Preguntas de la vida real",
      },
      {
        tipo: "ul",
        items: [
          "¿Me conviene no poner plazo fijo para evitar la retención? No: el 5% sobre el interés apenas roe el rendimiento; quedarte sin instrumento te deja contra la inflación.",
          "¿La retención me la devuelve? No es un impuesto determinado por vos: el banco retiene y lo acredita como pago; te lo informa en el resumen.",
          "¿Emite certificado de retención? El banco informa a AFIP; no recibís constancia salvo que la pidas.",
        ],
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Calculá tu interés bruto antes de la retención" },
      {
        tipo: "calc",
        href: "/guia/cuanto-gana-plazo-fijo-5000000/",
        texto: "El caso de $5.000.000 con tabla completa",
      },
    ],
    faqs: [
      {
        pregunta: "¿Todos pagan Ganancias por plazo fijo?",
        respuesta:
          "No: hay exemptos (jubilados y pensionados, monotributistas A y B, entre otros) y la retención solo aplica si el banco te identifica como alcanzado. Si no llegás a los tramos de capital, no te retienen.",
      },
      {
        pregunta: "¿Cuánto te retienen de Ganancias de un plazo fijo?",
        respuesta:
          "La mayoría de los ahorradores minoristas: 5% del interés. Solo capitales muy altos (más de $450 millones colocados, tabla vigente) llegan al 7,5%. El banco retiene automáticamente al vencimiento.",
      },
      {
        pregunta: "¿La retención aplica también a UVA o Lecaps?",
        respuesta:
          "Ganancias alcanza resultados de colocaciones financieras en general; en plazos fijos UVA la retención fue suspendida/transitoria según el período, y en Lecaps el tratamiento depende del título y la normativa vigente. Verificá el caso puntual con tu banco o contador.",
      },
    ],
    relacionadas: [
      { titulo: "¿Cuánto gana un plazo fijo de $5.000.000?", href: "/guia/cuanto-gana-plazo-fijo-5000000/" },
      { titulo: "Cómo calcular el interés (fórmula)", href: "/guia/como-calcular-interes-plazo-fijo/" },
    ],
  });

  const tasaReal = (): Guia => ({
    slug: "tasa-de-interes-real",
    titulo: "Tasa de interés real: cómo se calcula y por qué es la que importa",
    descripcion: `Nominal vs real con números de hoy: TNA ${formatPct(tna)}, inflación ${formatPct(ipcMensual, 1)} mensual → rendimiento real ${formatPct(realAnual * 100)} anual. La cuenta que decide.`,
    bloques: [
      {
        tipo: "p",
        texto: `La tasa nominal es la que figura en el banco (${formatPct(tna)} TNA hoy); la real es la que queda después de descontar la inflación (${formatPct(ipcMensual, 1)} mensual, INDEC). Es la única que responde la pregunta de fondo: ¿tu plata compra más o menos mañana?`,
      },
      {
        tipo: "h2",
        texto: "Las dos fórmulas (y cuándo usar cada una)",
      },
      {
        tipo: "p",
        texto: "Fórmula precisa (Fisher): i_real = (1 + i_nominal) ÷ (1 + π) − 1. Aproximo: i_real ≈ i_nominal − π. Para tasas bajas la diferencia es menor al punto; para tasas o inflación altas, usá Fisher.",
      },
      {
        tipo: "p",
        texto: `Con Fisher y los datos de hoy: TEA ${formatPct(tea(tna))} contra inflación anualizada ${formatPct(inflacionAnual * 100)} → rendimiento real anual ${formatPct(realAnual * 100)}. Con la aproximación lineal te da un número similar, pero Fisher es el estándar cuando la inflación es alta.`,
      },
      {
        tipo: "h2",
        texto: "Por qué la real es la que importa",
      },
      {
        tipo: "ul",
        items: [
          "Un 100% nominal con inflación del 120% te deja perdiendo: la real es negativa.",
          "Comparar instrumentos sin descontar inflación es comparar manzanas con pesos: solo la real te dice quién protege mejor.",
          "El rendimiento real es lo que usa tu plan de meta: cuánto podés comprar con lo ahorrado, no cuántos números suman la cuenta.",
        ],
      },
      {
        tipo: "tabla",
        headers: ["Escenario", "Nominal anual", "Real anual (Fisher)"],
        filas: [
          ["Plazo fijo hoy", formatPct(tea(tna)), formatPct(realAnual)],
          ["Dejar la plata en la caja de ahorro", "≈ 0%", `≈ −${formatPct(inflacionAnual)}`],
        ],
        caption: `Datos del ${tasas.fecha} (BCRA) e IPC ${ipc.valores.mes} ${ipc.valores.anio} (INDEC)`,
      },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "Calculá tu rendimiento real con tu monto" },
      { tipo: "calc", href: "/inflacion/", texto: "Vé el IPC de hoy y su serie" },
    ],
    faqs: [
      {
        pregunta: "¿Cómo se calcula la tasa de interés real?",
        respuesta: `Fisher: (1 + nominal) ÷ (1 + inflación) − 1. Con la TEA del plazo fijo (${formatPct(tea(tna))}) y la inflación anualizada (${formatPct(inflacionAnual)}), hoy da ${formatPct(realAnual)}.`,
      },
      {
        pregunta: "¿Qué significa tasa real negativa?",
        respuesta:
          "Que aun invirtiendo, tus pesos compran menos con el tiempo: le perdés a la inflación. La respuesta usual es instrumentos indexados (UVA, CER) o revisar la tasa ofrecida por el banco.",
      },
    ],
    relacionadas: [
      { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
      { titulo: "Cómo leer la tabla de tasas del BCRA", href: "/guia/como-leer-tabla-tasas-bcra/" },
    ],
  });

  return [ganancias(), tasaReal()];
}
