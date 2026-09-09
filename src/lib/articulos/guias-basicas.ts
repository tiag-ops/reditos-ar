import { formatPct, formatARS } from "@/lib/format";
import { vencimientoPlazoFijo, tea, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import dolar from "@/data/dolar.json";
import type { Guia, Faq } from "./tipos";

const tna = tasas.valores.tnaPlazoFijo30;
const ipcMensual = ipc.valores.ipcMensualPct;
const { realAnual, inflacionAnual } = rendimientoReal(tea(tna), ipcMensual / 100);

function tablaGanancias(monto: number): string[][] {
  return [30, 60, 90].map((d) => {
    const { interes } = vencimientoPlazoFijo(monto, tna, d);
    return [`Interés a ${d} días`, `${formatPct((interes / monto) * 100)}`, formatARS(interes)];
  });
}

/** Guías 1–12: la familia "¿cuánto gana...?" — las búsquedas de mayor volumen. */
export function guiasCuantoGana(): Guia[] {
  type Segmento = { tips: string; h2: string; intro: string };
  // Cada tramo tiene ángulo propio: evita que Google lea 12 páginas como gemelas.
  const segmentos: { chico: Segmento; grandes: Segmento } = {
    chico: {
      tips:
        "Si lo vas a renovar, tomale foto a la tasa ofrecida: los bancos digitales suelen pagar más que los tradicionales por el mismo monto. Y si el dinero es para algo concreto (alquiler, viaje, matrícula), elegí el plazo según esa fecha, no según la tasa.",
      h2: "Es un monto para empezar: lo importante es la constancia",
      intro:
        "Para montos chicos, la diferencia entre bancos es poquita en pesos, pero el hábito no: renovar mes a mes con interés compuesto es lo que hace la diferencia real a un año.",
    },
    grandes: {
      tips:
        "Con este monto ya vale la pena comparar bancos de verdad: la diferencia de 1 punto de TNA son pesos concretos al vencimiento. Considerá también repartir en dos plazos de fechas distintas (escalera): te da liquidez a mitad de camino sin romper el plazo.",
      h2: "Monto alto: cada punto de tasa importa (y la liquidez también)",
      intro:
        "A este nivel no hablamos de monedas: la diferencia entre la peor y la mejor tasa del sistema son decenas de miles de pesos. Comparar 10 minutos entre bancos rinde más que cualquier tip de inversión.",
    },
  };

  const faqPorMonto: Record<number, Faq> = {
    100_000: {
      pregunta: "¿Puedo armar un plazo fijo de $100.000 desde el celular?",
      respuesta:
        "Sí: todos los bancos con home banking y las billeteras virtuales permiten abrirlo desde la app en un par de minutos, sin ir a sucursal. El mínimo suele ser de $1.000 o menos.",
    },
    200_000: {
      pregunta: "¿Conviene un solo plazo fijo de $200.000 o dos de $100.000?",
      respuesta:
        "Si podés necesitar parte del dinero a mitad de camino, dos plazos de $100.000 con fechas desfasadas te dan liquidez sin romper el otro. Si no lo vas a tocar, da igual: el interés es el mismo.",
    },
    300_000: {
      pregunta: "¿Cuánto es por día un plazo fijo de $300.000?",
      respuesta:
        "El interés se acredita al vencimiento, no por día, pero se puede estimar: dividí el interés de 30 días por 30. Con la tasa actual te da un promedio diario de referencia (el banco no paga día a día).",
    },
    400_000: {
      pregunta: "¿Me cobran impuestos al interés de $400.000?",
      respuesta:
        "Depende de tu situación fiscal: los intereses de plazos fijos pueden estar alcanzados por Ganancias y el banco hace la retención cuando corresponde (lo informa en el resumen). El neto suele ser algo menor al bruto de la tabla.",
    },
    500_000: {
      pregunta: "¿Qué banco paga mejor tasa para $500.000?",
      respuesta:
        `La tasa cambia mes a mes: el promedio del sistema es ${formatPct(tna)} TNA, pero los bancos digitales suelen pagar por encima y los tradicionales por debajo. Compará la TNA ofrecida en tu app antes de renovar — esa diferencia en puntos son pesos concretos con este monto.`,
    },
    750_000: {
      pregunta: "¿Conviene el plazo fijo UVA con $750.000?",
      respuesta:
        "La versión UVA ajusta por inflación: conviene si tu miedo es que el plazo fijo tradicional no le gane al IPC, pero solo si podés dejar el dinero mucho tiempo (mínimo recomendable 6 a 12 meses). No es un instrumento de corto plazo.",
    },
    1_000_000: {
      pregunta: "¿Es mucho dinero para un solo banco con $1.000.000?",
      respuesta:
        "Estás muy lejos del límite de garantía de depósitos (que cubre hasta un tope mucho mayor por persona y banco). El criterio para repartir no es seguridad sino liquidez y tasa: dejalo donde pague más.",
    },
    2_000_000: {
      pregunta: "¿Escalera de plazos fijos con $2.000.000?",
      respuesta:
        "Ejemplo clásico: 4 plazos de $500.000 con vencimientos cada 15 o 30 días. Al vencimiento de cada uno renovás (o lo gastás): siempre tenés dinero accesible sin romper el resto. El interés total es similar; ganás flexibilidad.",
    },
    5_000_000: {
      pregunta: "¿Sigue conviniendo el plazo fijo con $5.000.000?",
      respuesta:
        `Depende de la tasa real: al ${formatPct(tna)} TNA el rendimiento real anual es ${formatPct(realAnual * 100)}. Si le gana a la inflación, sí; si no, mirá instrumentos indexados (UVA, Lecaps). A este monto, la comparación importa de verdad.`,
    },
    10_000_000: {
      pregunta: "¿Qué otros instrumentos debería considerar con $10.000.000?",
      respuesta:
        "Además del plazo fijo: FCI de mercado de dinero (liquidez diaria), Lecaps (letras del Tesoro) y cauciones bursátiles. Cada uno con su riesgo y horizonte — el plazo fijo sigue siendo el más simple.",
    },
    15_000_000: {
      pregunta: "¿El plazo fijo de $15.000.000 está garantizado por el Estado?",
      respuesta:
        "Los depósitos están garantizados por SEDESA hasta un tope por persona y banco. Para montos muy altos, la garantía cubre una parte: distribuir entre bancos es una decisión de gestión de riesgo, no de tasa.",
    },
    20_000_000: {
      pregunta: "¿Conviene negociar la tasa con $20.000.000?",
      respuesta:
        "Sí: los bancos ofrecen tasas preferentes a depósitos altos (a tasa pactada, usualmente desde montos muy superiores al promedio minorista). Preguntá en el escritorio PyME/empresas o con el asesor de tu banco: la tasa pactada suele superar la publicada.",
    },
  };

  const montos = [
    { m: 100_000, etiqueta: "100 mil pesos" },
    { m: 200_000, etiqueta: "200 mil pesos" },
    { m: 300_000, etiqueta: "300 mil pesos" },
    { m: 400_000, etiqueta: "400 mil pesos" },
    { m: 500_000, etiqueta: "500 mil pesos" },
    { m: 750_000, etiqueta: "750 mil pesos" },
    { m: 1_000_000, etiqueta: "un millón de pesos" },
    { m: 2_000_000, etiqueta: "2 millones de pesos" },
    { m: 5_000_000, etiqueta: "5 millones de pesos" },
    { m: 10_000_000, etiqueta: "10 millones de pesos" },
    { m: 15_000_000, etiqueta: "15 millones de pesos" },
    { m: 20_000_000, etiqueta: "20 millones de pesos" },
  ];
  return montos.map(({ m, etiqueta }) => {
    const seg = m >= 5_000_000 ? segmentos.grandes : segmentos.chico;
    const faqExtra = faqPorMonto[m];
    const faqs = [
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
        respuesta:
          "La tasa viene del BCRA y se actualiza automáticamente el primer día de cada mes. Las fórmulas nunca cambian; solo el dato.",
      },
      ...(faqExtra ? [faqExtra] : []),
    ];
    return {
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
          texto: seg.h2,
        },
        {
          tipo: "p",
          texto: seg.intro,
        },
        {
          tipo: "p",
          texto: seg.tips,
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
      faqs,
      relacionadas: [
        { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
        { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
      ],
    };
  });
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
