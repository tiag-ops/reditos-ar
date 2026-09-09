import { formatPct, formatARS } from "@/lib/format";
import { tea, tem, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import type { Guia } from "./tipos";

/**
 * PR 2b — guías transversales del plan (§ FASE 2):
 * 1. Interés compuesto diario vs mensual
 * 2. Cómo leer la tabla de tasas del BCRA
 * 3. Lecaps: qué son y rendimiento (interlinkea con la guía de Lecaps existente y CER)
 */
export function guiasTransversales(): Guia[] {
  const tna = tasas.valores.tnaPlazoFijo30;
  const losTres = { tna, tem: tem(tna), tea: tea(tna) };
  const { realAnual } = rendimientoReal(tea(tna), ipc.valores.ipcMensualPct / 100);

  const interesCompuesto = (): Guia => ({
    slug: "interes-compuesto-diario-vs-mensual",
    titulo:
      "Interés compuesto diario vs mensual: la diferencia real con números de hoy",
    descripcion: `Comparada con la tasa del BCRA (${formatPct(tna)} TNA): cuánto cambia capitalizar cada día vs cada mes a 6 y 12 meses. Números concretos, no teoría.`,
    bloques: [
      {
        tipo: "p",
        texto: `La frecuencia de capitalización es cada cuánto el interés generado empieza a generar interés propio. Con la TNA promedio del BCRA de hoy (${formatPct(tna)}), la diferencia entre el peor y el mejor escenario visible es menor de la que prometen los anuncios, pero existe: son unos ${formatPct((tea(tna) - tem(tna) * 12) * 100, 2)} al año de diferencia entre capitalización mensual y efectiva anual.`,
      },
      {
        tipo: "tabla",
        headers: ["Capitalización", "Tasa efectiva anual", "$1.000.000 a 12 meses"],
        filas: [
          [
            "Mensual (renovás mes a mes)",
            `${formatPct(losTres.tem * 12)} nominal`,
            formatARS(1_000_000 * (1 + losTres.tem) ** 12),
          ],
          [
            "Diaria (cauciones y algunos FCI)",
            `${formatPct(losTres.tea)} TEA`,
            formatARS(1_000_000 * (1 + losTres.tea)),
          ],
        ],
        caption: `TNA ${formatPct(tna)} del BCRA al ${tasas.fecha}`,
      },
      {
        tipo: "h2",
        texto: "Por qué la diferencia es más chica de lo que parece",
      },
      {
        tipo: "p",
        texto: `La TEA (${formatPct(losTres.tea)}) ya incluye la capitalización continua del sistema financiero. La tentación de "daily compounding" importa más cuando la tasa es alta o el plazo largo: a ${formatPct(tna)} TNA, un año de capitalización diaria vs mensual separa los montos en menos de la inflación de un mes (${formatPct(ipc.valores.ipcMensualPct, 1)}). Priorizá tasa y constancia antes que frecuencia.`,
      },
      {
        tipo: "h2",
        texto: "Dónde se ve cada una en la práctica argentina",
      },
      {
        tipo: "ul",
        items: [
          "Plazo fijo tradicional: interés simple al vencimiento; compuesto solo si renovás capital más interés (mensual).",
          "Cauciones bursátiles: se renuevan día a día (daily compounding real, con riesgo de mercado).",
          "FCI money market: capitalización diaria con liquidez en 24-48 hs.",
        ],
      },
      { tipo: "calc", href: "/interes-compuesto/", texto: "Simulá tu interés compuesto con aportes y frecuencia" },
      {
        tipo: "calc",
        href: "/guia/interes-compuesto-guia-simple/",
        texto: "Primero entendé el concepto: guía simple de interés compuesto",
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué rinde más: interés compuesto diario o mensual?",
        respuesta: `A igual tasa nominal, el diario rinde un poco más porque el interés empieza a rendir antes. Con la tasa del BCRA de hoy (${formatPct(tna)} TNA), la diferencia anual es de aproximadamente ${formatPct((tea(tna) - tem(tna) * 12) * 100, 2)}: menor que cualquier variación mensual de tasa.`,
      },
      {
        pregunta: "¿El plazo fijo capitaliza diariamente?",
        respuesta:
          "No: el plazo fijo tradicional paga interés simple al vencimiento. La TEA que informa el banco asume capitalización efectiva si renovás. El compuesto diario real está en cauciones y FCI money market.",
      },
      {
        pregunta: "¿Vale la pena renovar mes a mes?",
        respuesta: `Sí: renovar capital más interés es lo que convierte la TNA en TEA (${formatPct(losTres.tea)} hoy). En un año, la diferencia con gastarte el interés es concreta — y si el rendimiento real es positivo (${formatPct(realAnual * 100)} hoy), además le ganás a la inflación.`,
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de interés compuesto", href: "/interes-compuesto/" },
      { titulo: "Interés compuesto: guía simple", href: "/guia/interes-compuesto-guia-simple/" },
    ],
  });

  const tasasBcra = (): Guia => ({
    slug: "como-leer-tabla-tasas-bcra",
    titulo: "Cómo leer la tabla de tasas del BCRA (sin confundirte)",
    descripcion: `TNA, TEA, TEM, tasas de pases y demás siglas de las tablas del BCRA, explicadas con la tasa de hoy (${formatPct(tna)}) y ejemplos en pesos.`,
    bloques: [
      {
        tipo: "p",
        texto: `El BCRA publica varias tablas de tasas: principales variables, pases, depósitos de ahorro. Casi todas se resumen en una pregunta: ¿esa tasa es nominal o efectiva, y para qué plazo? Con el dato de hoy (${formatPct(tna)} TNA de promedio para plazos fijos a 30 días), estas son las claves.`,
      },
      {
        tipo: "tabla",
        headers: ["Sigla", "Qué es", "Valor de hoy"],
        filas: [
          ["TNA", "Tasa Nominal Anual: sin capitalización, es la que informa el banco", formatPct(tna)],
          ["TEA", "Tasa Efectiva Anual: con capitalización", formatPct(tea(tna))],
          ["TEM", "Tasa Efectiva Mensual: TNA ÷ 12 aproximada", formatPct(tem(tna))],
          ["Tasa de pases", "A la que el BCRA le presta/cobra liquidez a los bancos", "—"],
        ],
        caption: `Datos del BCRA al ${tasas.fecha}`,
      },
      {
        tipo: "h2",
        texto: "Los tres errores típicos",
      },
      {
        tipo: "ul",
        items: [
          "Comparar una TNA de 30 días con una TEA de otro plazo: no son la misma unidad.",
          "Mirar la tasa de pases como si fuera lo que cobra tu plazo fijo: es una tasa mayorista entre bancos.",
          "Ignorar la fecha del dato: las tablas del BCRA muestran el dato más reciente disponible, no el del día en tiempo real.",
        ],
      },
      {
        tipo: "h2",
        texto: "Regla de conversión rápida",
      },
      {
        tipo: "p",
        texto: `De TNA a TEA: (1 + TNA/365)^365 - 1. Con la tasa de hoy: ${formatPct(tna)} TNA = ${formatPct(tea(tna))} TEA. Para el interés de un plazo fijo real de 30 días, el número correcto es el interés simple: capital × TNA × (30/365).`,
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Calculá tu interés sin leer tablas" },
      {
        tipo: "calc",
        href: "/guia/como-calcular-interes-plazo-fijo/",
        texto: "La fórmula del interés, paso a paso",
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué tasa del BCRA usar para calcular mi plazo fijo?",
        respuesta: `La TNA promedio de depósitos a 30 días del sistema financiero (hoy ${formatPct(tna)}). Es la que refleja lo que paga el sistema, no la tasa de pases mayorista.`,
      },
      {
        pregunta: "¿Por qué la TEA es más alta que la TNA?",
        respuesta: `Porque incluye la capitalización: ${formatPct(tna)} TNA equivalen a ${formatPct(tea(tna))} TEA. Si renovás mes a mes capital más interés, eso es lo que obtenés efectivamente.`,
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
      { titulo: "Cómo calcular el interés (fórmula)", href: "/guia/como-calcular-interes-plazo-fijo/" },
    ],
  });

  const lecaps = (): Guia => ({
    slug: "lecaps-rendimiento-hoy",
    titulo: "Lecaps: rendimiento de hoy y cómo compararlas con el plazo fijo",
    descripcion: `Qué son las Lecaps, cuánto rinden vs el plazo fijo (${formatPct(tna)} TNA) y cómo calcular el rendimiento real. Con la tabla de tasas actualizada.`,
    bloques: [
      {
        tipo: "p",
        texto: `Las Lecaps son letras del Tesoro a tasa fija en pesos: comprás a descuento, al vencimiento te pagan el valor nominal. El comparable directo es el plazo fijo (${formatPct(tna)} TNA hoy) y la pregunta es siempre la misma: ¿qué tasa efectiva anual me queda después de comisiones?`,
      },
      {
        tipo: "h2",
        texto: "Cómo se calcula el rendimiento de una Lecap",
      },
      {
        tipo: "p",
        texto: `Rendimiento = (valor nominal ÷ precio de compra)^(365/días al vencimiento) - 1. Ejemplo con números de mercado: si comprás a 99,0 un título que paga 100 en 90 días, la TEA resultante es de aproximadamente ${(100 / 99) ** (365 / 90) - 1 >= 0 ? formatPct((100 / 99) ** (365 / 90) - 1, 1) : "—"} — comparala con la TEA del plazo fijo: ${formatPct(tea(tna))}.`,
      },
      {
        tipo: "h2",
        texto: "Lecaps vs plazo fijo: la comparación honesta",
      },
      {
        tipo: "tabla",
        headers: ["Criterio", "Lecaps", "Plazo fijo"],
        filas: [
          ["Tasa de hoy", "Fija en el precio de mercado", `${formatPct(tna)} TNA promedio BCRA`],
          ["Monto mínimo", "El de 1 título (cientos de pesos)", "Desde $1.000 según banco"],
          ["Liquidez", "Revendés en mercado antes del vencimiento", "Esperás el vencimiento (o nada)"],
          ["Riesgo", "Riesgo soberano + precio de mercado", "Garantía de depósitos hasta el tope"],
          ["Comisiones", "Comisión del broker (0,1%-0,5% típico)", "Sin comisión"],
        ],
      },
      {
        tipo: "h2",
        texto: "Cuándo convienen",
      },
      {
        tipo: "ul",
        items: [
          "Cuando la TEA implícita del precio supera la del plazo fijo (suele pasar en plazos cortos, 60-120 días).",
          "Cuando necesitás liquidez antes del vencimiento: se pueden vender en bolsa.",
          "Para montos arriba del promedio minorista donde el plazo fijo deja de ser práctico.",
        ],
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Comparalo con tu plazo fijo simulado" },
      {
        tipo: "calc",
        href: "/guia/letras-del-tesoro-lecaps-principiantes/",
        texto: "Empezá por la guía básica de Lecaps",
      },
      {
        tipo: "calc",
        href: "/guia/que-es-el-cer/",
        texto: "¿Y si el título ajusta por inflación? CER explicado",
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuánto rinde una Lecap hoy?",
        respuesta: `Depende del precio de mercado del día. La referencia: el plazo fijo paga ${formatPct(tna)} TNA (${formatPct(tea(tna))} TEA). Si la TEA implícita de la Lecap a su plazo supera eso (descontando comisión del broker), conviene. El dato exacto lo da el panel de tu broker.`,
      },
      {
        pregunta: "¿Las Lecaps son más riesgosas que el plazo fijo?",
        respuesta:
          "Tienen riesgo soberano y variación de precio de mercado, pero no riesgo de banco. Para horizontes de 2-6 meses con montos medios, son una alternativa legítima al plazo fijo con mejor liquidez.",
      },
      {
        pregunta: "¿Puedo comprar Lecaps desde la app del banco?",
        respuesta:
          "Solo si el banco tiene bot integrado: normalmente se compran desde un broker o la app de inversiones del banco con cuenta comitente. El proceso es similar en todos: elegís el título, el precio y confirmás.",
      },
    ],
    relacionadas: [
      { titulo: "Lecaps para principiantes", href: "/guia/letras-del-tesoro-lecaps-principiantes/" },
      { titulo: "Qué es el CER", href: "/guia/que-es-el-cer/" },
    ],
  });

  return [interesCompuesto(), tasasBcra(), lecaps()];
}
