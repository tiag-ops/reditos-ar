import { formatPct, formatARS } from "@/lib/format";
import { tea, rendimientoReal, interesCompuesto } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import dolar from "@/data/dolar.json";
import type { Guia } from "./tipos";

const tna = tasas.valores.tnaPlazoFijo30;
const ipcMensual = ipc.valores.ipcMensualPct;
const { realAnual, inflacionAnual } = rendimientoReal(tea(tna), ipcMensual / 100);

export const guiasAvanzadas: Guia[] = [
  {
    slug: "conviene-plazo-fijo-uva",
    titulo: "¿Conviene plazo fijo UVA? Cuándo sí y cuándo no",
    descripcion:
      "El plazo fijo UVA ajusta por inflación y paga un plus. Cuándo conviene, cuándo no, y la trampa de los 90 días mínimos, con los datos de hoy.",
    bloques: [
      {
        tipo: "p",
        texto: `El plazo fijo UVA protege contra la inflación: tu capital ajusta por el coeficiente de estabilización (que sigue al IPC) y encima paga una tasa nominal. La contracara: el dinero queda inmovilizado mínimo 90 días, y a veces mucho más.`,
      },
      {
        tipo: "h2",
        texto: "La cuenta de hoy",
      },
      {
        tipo: "tabla",
        headers: ["Instrumento", "Rendimiento anual", "Contra"],
        filas: [
          ["Plazo fijo tradicional", `${formatPct(tna)} TNA · real ${formatPct(realAnual * 100)}`, "Inmovilizado 30 días"],
          ["Plazo fijo UVA", "Ajusta por inflación (CER/UVA) + tasa extra", "Mínimo 90 días, riesgo de valor final variable"],
          ["Estar quieto en caja de ahorro", `Real ${formatPct(((1 - (1 + ipcMensual / 100) ** 12) * 100))}`, "Perdés contra los precios seguro"],
        ],
        caption: `IPC mensual ${formatPct(ipcMensual, 1)} · TNA PF ${formatPct(tna)} · datos BCRA/INDEC`,
      },
      {
        tipo: "h2",
        texto: "Conviene UVA cuando...",
      },
      {
        tipo: "ul",
        items: [
          `El plazo fijo tradicional NO le gana a la inflación (hoy: real ${formatPct(realAnual * 100)} anual).`,
          "Podés esperar 90+ días sin tocar el dinero.",
          "Querés dormir tranquilo: el UVA sigue al IPC casi 1 a 1.",
        ],
      },
      {
        tipo: "p",
        texto:
          "No conviene si necesitás la plata en menos de 90 días: precancelar un UVA puede implicar perder el ajuste o el interés completo. Para plazos cortos, mirá la comparación directa en la calculadora de plazo fijo.",
      },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "¿Le gana hoy el plazo fijo tradicional a la inflación? Verificalo acá" },
    ],
    faqs: [
      {
        pregunta: "¿Qué es el plazo fijo UVA?",
        respuesta:
          "Un depósito cuyo capital se ajusta por UVA (unidad de valor adquisitivo, ligada al IPC) más un interés nominal. Protege el poder de compra a cambio de un plazo mínimo de 90 días.",
      },
      {
        pregunta: "¿El UVA le gana siempre a la inflación?",
        respuesta:
          "Casi: el capital sigue al IPC, así que como mínimo empata con la inflación, y el interés nominal adicional hace la diferencia positiva. La excepción es precancelar antes de tiempo.",
      },
    ],
    relacionadas: [
      { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
      { titulo: "Calculadora de inflación", href: "/inflacion/" },
    ],
  },
  {
    slug: "que-es-el-cer",
    titulo: "Qué es el CER y cómo afecta tus inversiones",
    descripcion:
      "El Coeficiente de Estabilización de Referencia: qué mide, cómo se calcula y por qué aparece en UVA, Lecaps y bonos. Explicado simple.",
    bloques: [
      {
        tipo: "p",
        texto:
          "El CER (Coeficiente de Estabilización de Referencia) es un número que publica el BCRA todos los días y que crece exactamente igual que la inflación. Es la 'regla de medición' que usan varios instrumentos para ajustarse por precios.",
      },
      {
        tipo: "h2",
        texto: "Cómo funciona en la práctica",
      },
      {
        tipo: "p",
        texto: `Si invertís en algo "ajustable por CER", tu capital se multiplica por la variación del coeficiente entre el día que entraste y el día que salís. Como el CER sigue al IPC mes a mes (último dato: ${formatPct(ipcMensual, 1)} de ${ipc.valores.mes} ${ipc.valores.anio} según INDEC), esa parte de tu inversión queda protegida de la inflación.`,
      },
      {
        tipo: "tabla",
        headers: ["Instrumento", "Ajusta por", "Plazo típico"],
        filas: [
          ["Plazo fijo UVA", "CER/UVA + tasa", "90+ días"],
          ["Lecaps ajustables (duales)", "CER o tasa, lo que sea mayor", "Meses"],
          ["Bonos del Tesoro CER", "CER + cupón", "Años"],
        ],
      },
      {
        tipo: "h2",
        texto: "Por qué te importa",
      },
      {
        tipo: "p",
        texto: `Con la inflación anualizada en ${formatPct(inflacionAnual * 100)} y el plazo fijo tradicional en ${formatPct(tna)} TNA (real: ${formatPct(realAnual * 100)}), los instrumentos indexados por CER son el refugio estándar cuando la tasa no alcanza.`,
      },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "Compará: cuánto rinde de más el CER hoy" },
    ],
    faqs: [
      {
        pregunta: "¿Dónde veo el valor del CER?",
        respuesta:
          "El BCRA lo publica diariamente en su sitio, junto a las principales variables monetarias. No es necesario seguirlo a diario: sigue al IPC con pocos días de rezago.",
      },
      {
        pregunta: "¿El CER es lo mismo que la UVA?",
        respuesta:
          "No exactamente: la UVA se construye a partir del CER con un divisor fijo. En la práctica ambos siguen a la inflación; la UVA se usa para plazos fijos y créditos hipotecarios, el CER para bonos y Lecaps.",
      },
    ],
    relacionadas: [
      { titulo: "¿Conviene plazo fijo UVA?", href: "/guia/conviene-plazo-fijo-uva/" },
      { titulo: "Calculadora de inflación", href: "/inflacion/" },
    ],
  },
  {
    slug: "inflacion-argentina-2026",
    titulo: `Inflación en Argentina: el IPC de ${ipc.valores.mes} ${ipc.valores.anio} y la tendencia`,
    descripcion: `El INDEC publicó ${formatPct(ipcMensual, 1)} de inflación para ${ipc.valores.mes} ${ipc.valores.anio}. Qué significa, cómo anualizarlo bien y qué hacer con tus ahorros.`,
    bloques: [
      {
        tipo: "p",
        texto: `El último informe técnico del INDEC (publicado el ${ipc.valores.fechaPublicacion}) registró una inflación mensual de ${formatPct(ipcMensual, 1)}. El próximo dato se conoce el ${ipc.valores.fechaProximoInforme}.`,
      },
      {
        tipo: "h2",
        texto: "Cómo anualizar sin trampas",
      },
      {
        tipo: "p",
        texto: `Multiplicar por 12 está mal. La forma correcta es capitalizar: (1 + ${formatPct(ipcMensual, 1)})^12 − 1 = ${formatPct(inflacionAnual * 100)} anual. Ese es el número contra el que medir cualquier inversión.`,
      },
      {
        tipo: "tabla",
        headers: ["Referencia", "Valor"],
        filas: [
          [`IPC mensual (${ipc.valores.mes} ${ipc.valores.anio})`, formatPct(ipcMensual, 1)],
          ["Anualizado (capitalizado)", formatPct(inflacionAnual * 100)],
          [`TNA plazo fijo (BCRA ${tasas.fecha})`, formatPct(tna)],
          ["Rendimiento real del plazo fijo", formatPct(realAnual * 100)],
        ],
      },
      { tipo: "calc", href: "/inflacion/", texto: "Simulá cuánto valdrá tu dinero con esta inflación" },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "¿Tu inversión le gana a estos números?" },
    ],
    faqs: [
      {
        pregunta: `¿Cuál fue la inflación de ${ipc.valores.mes} ${ipc.valores.anio}?`,
        respuesta: `${formatPct(ipcMensual, 1)} según el INDEC (IPC nacional, publicado el ${ipc.valores.fechaPublicacion}). Esta página se actualiza automáticamente con cada informe.`,
      },
      {
        pregunta: "¿Cómo se calcula la inflación anualizada?",
        respuesta: "Capitalizando el dato mensual: (1 + IPC mensual)^12 − 1. Sumar 12 meses a mano subestima el efecto bola de nieve de los precios.",
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de inflación", href: "/inflacion/" },
      { titulo: "Plazo fijo vs inflación", href: "/plazo-fijo-vs-inflacion/" },
    ],
  },
  {
    slug: "cauciones-el-plazo-fijo-de-la-bolsa",
    titulo: "Cauciones bursátiles: el 'plazo fijo' de la bolsa",
    descripcion:
      "Qué es una caución, por qué rinde más que un plazo fijo, qué riesgos tiene y cómo empezar desde cero. Sin tecnicismos.",
    bloques: [
      {
        tipo: "p",
        texto: `Una caución es un préstamo de dinero a un día (o a los días que elijas) garantizado con títulos valores. Funciona como un plazo fijo ultra corto que podés renovar a diario — y que suele pagar más que el plazo fijo del banco.`,
      },
      {
        tipo: "h2",
        texto: "Caución vs plazo fijo",
      },
      {
        tipo: "tabla",
        headers: ["", "Caución", "Plazo fijo"],
        filas: [
          ["Plazo mínimo", "1 día", "30 días"],
          ["Disponibilidad", "Todos los días hábiles", "Al vencimiento"],
          ["Quién la regula", "CNV, vía mercado bursátil", "BCRA"],
          ["Impuestos", "Sin sellos; retención de Ganancias según el caso", "Retención de Ganancias sobre intereses"],
        ],
      },
      {
        tipo: "h2",
        texto: "Por qué rinde más",
      },
      {
        tipo: "p",
        texto: `La tasa de caución la fija el mercado, no un banco. Cuando la demanda de plata de los bancos sube, la caución supera el plazo fijo. Con la TNA actual en ${formatPct(tna)}, las cauciones a 1 día suelen jugarse en ese mismo rango — a veces arriba, a veces abajo.`,
      },
      {
        tipo: "h2",
        texto: "Qué necesitás",
      },
      {
        tipo: "ul",
        items: [
          "Una cuenta comitente (bolsa) — la mayoría es gratis de apertura.",
          "Monto mínimo bajo (muchos brokers: desde unos pocos miles de pesos).",
          "Elegir el plazo (1, 7, 14 días...) y la tasa que ofrecés.",
        ],
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Compará primero contra el plazo fijo tradicional" },
    ],
    faqs: [
      {
        pregunta: "¿Es segura una caución?",
        respuesta:
          "Está garantizada con títulos values y regulada por la CNV. El riesgo principal es operativo (tu broker), no de crédito como en un préstamo. Aun así, es un instrumento de mercado: su tasa varía todos los días.",
      },
      {
        pregunta: "¿Con cuánta plata puedo empezar?",
        respuesta:
          "Depende del broker, pero muchos permiten cauciones desde montos muy bajos. La comisión del broker (0,25%–0,5% anualizada) se descuenta de la tasa.",
      },
    ],
    relacionadas: [
      { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
      { titulo: "Interés compuesto", href: "/interes-compuesto/" },
    ],
  },
  {
    slug: "letras-del-tesoro-lecaps-principiantes",
    titulo: "Lecaps y letras del Tesoro: la guía para principiantes",
    descripcion:
      "Qué son las Lecaps, cómo se compran, qué tasa tienen hoy y en qué se diferencian del plazo fijo. Empezá por acá antes de tu primera letra.",
    bloques: [
      {
        tipo: "p",
        texto: `Una Lecap es un préstamo al Tesoro Nacional que se compra y vende en la bolsa. El Estado te devuelve el valor nominal al vencimiento: la ganancia es la diferencia entre lo que pagaste y el 100%. Por eso su rendimiento se mide en TIR, no en TNA.`,
      },
      {
        tipo: "h2",
        texto: "Lecap vs plazo fijo",
      },
      {
        tipo: "tabla",
        headers: ["", "Lecap", "Plazo fijo"],
        filas: [
          ["Dónde se compra", "Bolsa (cuenta comitente)", "Banco o fintech"],
          ["Rendimiento", "TIR según precio de mercado", `TNA fija (hoy ${formatPct(tna)})`],
          ["Salida anticipada", "Vendés en el mercado (a cualquier hora)", "Solo precancelable con penalidad"],
          ["Versiones", "En pesos, duales (peso/dólar), CER", "Tradicional, UVA, precancelable"],
        ],
      },
      {
        tipo: "h2",
        texto: "Cómo se compra una Lecap",
      },
      {
        tipo: "ul",
        items: [
          "Abrís una cuenta comitente (gratis en la mayoría de los brokers).",
          "Transferís plata a la cuenta.",
          "Elegís la letra por vencimiento y su TIR publicada.",
          "La mantenés al vencimiento (o la vendés antes: el precio puede variar).",
        ],
      },
      {
        tipo: "p",
        texto: `La regla de oro para principiantes: comprá con vencimiento cercano y mantené hasta el final. La TIR que ves al comprar es la que cobrás si esperás al vencimiento — vendiendo antes, ese número no está garantizado.`,
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Compará con el rendimiento del plazo fijo de hoy" },
    ],
    faqs: [
      {
        pregunta: "¿Qué es una Lecap?",
        respuesta:
          "Una letra del Tesoro argentino en pesos que se compra en la bolsa. Pagás menos que el valor nominal y al vencimiento cobrás el 100%: la diferencia es tu interés (TIR).",
      },
      {
        pregunta: "¿Las Lecaps son seguras?",
        respuesta:
          "El emisor es el Tesoro Nacional: el riesgo es crediticio del Estado. Históricamente se han cumplido los vencimientos, pero al ser un título negociable su precio puede bajar si vendés antes de tiempo.",
      },
    ],
    relacionadas: [
      { titulo: "¿Conviene plazo fijo UVA?", href: "/guia/conviene-plazo-fijo-uva/" },
      { titulo: "Calculadora de plazo fijo", href: "/plazo-fijo/" },
    ],
  },
  {
    slug: "donde-guardar-dolares-argentina",
    titulo: "Dónde guardar los dólares en Argentina (y cuánto rinde cada opción)",
    descripcion:
      "Bajo el colchón, banco, billetera o bonos en dólares: comparativa honesta de seguridad, costo y rendimiento con el dólar oficial de hoy.",
    bloques: [
      {
        tipo: "p",
        texto: `Con el dólar oficial en ${formatARS(dolar.valores.oficial)} (BCRA, ${dolar.fecha}), la pregunta no es cuánto vale sino dónde guardarlo para que no se lo coma la inflación ni el riesgo.`,
      },
      {
        tipo: "tabla",
        headers: ["Opción", "Seguridad", "Rinde", "Costo"],
        filas: [
          ["Colchón / caja fuerte", "Cero (robo, fuego)", "Nada", "Nada"],
          ["Caja de ahorro en USD (banco)", "Depósitos garantizados", "Nada (los bancos no pagan interés en USD)", "Comisiones de mantenimiento en algunos bancos"],
          ["Billetera virtual en USD", "Garantía según entidad", "Nada o casi", "Spread al comprar/vender"],
          ["Bonos / money market en USD vía bolsa", "Riesgo de mercado", "Tasa en USD (variable)", "Comisión de broker"],
        ],
      },
      {
        tipo: "h2",
        texto: "La lógica por horizonte",
      },
      {
        tipo: "ul",
        items: [
          "Gastos próximos en dólares (viaje, importe): caja de ahorro o billetera — accesibilidad primero.",
          "Ahorro mediano plazo: evaluar money market en USD (rinde algo vs nada).",
          "Largo plazo: el colchón pierde contra la inflación de EE.UU. también; los instrumentos indexados en USD son la alternativa seria.",
        ],
      },
      { tipo: "calc", href: "/dolar/", texto: "Convertí tu ahorro en pesos a dólares al oficial de hoy" },
    ],
    faqs: [
      {
        pregunta: "¿Conviene dejar los dólares en el banco?",
        respuesta:
          "Los bancos no pagan interés en dólares y cobran mantenimiento en algunos casos. A cambio tenés seguridad física y disponibilidad inmediata. Para montos medianos suele compensar; para sumas grandes hay alternativas en el mercado bursátil.",
      },
      {
        pregunta: "¿Cuánto vale el dólar oficial hoy?",
        respuesta: `${formatARS(dolar.valores.oficial)} según la cotización A3500 del BCRA al ${dolar.fecha}. Se actualiza automáticamente en nuestra página del dólar.`,
      },
    ],
    relacionadas: [
      { titulo: "Dólar oficial hoy", href: "/dolar/" },
      { titulo: "Plazo fijo vs dólar", href: "/guia/plazo-fijo-vs-dolar/" },
    ],
  },
  {
    slug: "interes-compuesto-guia-simple",
    titulo: "Interés compuesto: la guía simple (con ejemplos reales)",
    descripcion:
      "Qué es el interés compuesto, por qué Einstein lo llamó la octava maravilla y cómo aplicarlo a tus ahorros en Argentina desde hoy.",
    bloques: [
      {
        tipo: "p",
        texto:
          "Interés simple: ganás sobre tu capital. Interés compuesto: ganás también sobre los intereses ya ganados. La diferencia, en pocos meses, es brutal.",
      },
      {
        tipo: "h2",
        texto: "Ejemplo con la tasa de hoy",
      },
      {
        tipo: "p",
        texto: `Con $100.000 al ${formatPct(tna / 12)} mensual (TNA ${formatPct(tna)} ÷ 12, renovando el plazo fijo completo cada mes): en 12 meses terminás con ${formatARS(interesCompuesto(100_000, tna / 12 / 100, 12))} en vez de los ${formatARS(100_000 * (1 + (tna / 12 / 100) * 12))} del interés simple. La diferencia es el interés que ganan tus intereses.`,
      },
      {
        tipo: "tabla",
        headers: ["Meses", "Interés simple", "Interés compuesto", "Diferencia"],
        filas: [3, 6, 12, 24].map((m) => {
          const simple = 100_000 * (1 + (tna / 12 / 100) * m);
          const comp = interesCompuesto(100_000, tna / 12 / 100, m);
          return [`${m}`, formatARS(simple), formatARS(comp), formatARS(comp - simple)];
        }),
        caption: `$100.000 iniciales al ${formatPct(tna / 12)} mensual — recálculo automático con la tasa BCRA`,
      },
      {
        tipo: "h2",
        texto: "Las tres condiciones para que funcione",
      },
      {
        tipo: "ul",
        items: [
          "Renovar completo: si retirás los intereses, volvés al interés simple.",
          "Constancia: los aportes mensuales potencian todo el efecto.",
          "Tiempo: la curva se empina recién después de varios meses/años.",
        ],
      },
      { tipo: "calc", href: "/interes-compuesto/", texto: "Simulá con tu monto, aporte y plazo" },
      { tipo: "calc", href: "/meta-de-ahorro/", texto: "¿Cuánto apartar por mes para tu meta?" },
    ],
    faqs: [
      {
        pregunta: "¿El plazo fijo capitaliza intereses?",
        respuesta:
          "No por sí solo: paga interés simple al vencimiento. El interés compuesto aparece cuando renovás el plazo fijo completo (capital + intereses) mes a mes.",
      },
      {
        pregunta: "¿Cuánto rinde $100.000 en un año con interés compuesto?",
        respuesta: `Al ${formatPct(tna / 12)} mensual (tasa BCRA de hoy), $100.000 se convierten en ${formatARS(interesCompuesto(100_000, tna / 12 / 100, 12))} en 12 meses si renovás todo cada mes. Actualizado automáticamente.`,
      },
    ],
    relacionadas: [
      { titulo: "Interés compuesto (calculadora)", href: "/interes-compuesto/" },
      { titulo: "Meta de ahorro", href: "/meta-de-ahorro/" },
    ],
  },
];
