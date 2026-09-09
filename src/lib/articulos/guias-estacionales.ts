import { formatPct, formatARS } from "@/lib/format";
import { vencimientoPlazoFijo, tea, rendimientoReal } from "@/lib/finanzas";
import tasas from "@/data/tasas.json";
import ipc from "@/data/ipc.json";
import dolar from "@/data/dolar.json";
import type { Guia } from "./tipos";

/**
 * PR 3 — guías estacionales y prácticas del plan (§ FASE 2):
 * 1. ¿Dónde conviene poner $1.000.000 hoy? (estacional: el mes va en el title
 *    y se refresca con cada build mensual del engine de datos)
 * 2. La escalera de plazos fijos (práctica, complementa la FAQ de $2M)
 */
export function guiasEstacionales(): Guia[] {
  const tna = tasas.valores.tnaPlazoFijo30;
  const mes = new Date().toLocaleDateString("es-AR", { month: "long", timeZone: "America/Argentina/Buenos_Aires" });
  const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1);
  const { realAnual } = rendimientoReal(tea(tna), ipc.valores.ipcMensualPct / 100);
  const { interes: int30, total: tot30 } = vencimientoPlazoFijo(1_000_000, tna, 30);

  const dondeMillon = (): Guia => ({
    slug: "donde-invertir-1000000",
    titulo: `¿Dónde conviene poner $1.000.000 en ${mesCap}?`,
    descripcion: `Te entró un millón de pesos: comparada de plazo fijo (${formatPct(tna)} TNA), dólar y fondos con los datos de ${mesCap} y un criterio de decisión en 4 pasos.`,
    bloques: [
      {
        tipo: "p",
        texto: `Acaba de entrar $1.000.000 — aguinaldo, venta, un premio o ahorro acumulado — y tenés que decidir hoy. Los datos de ${mesCap}: el plazo fijo promedio paga ${formatPct(tna)} TNA (interés de 30 días: ${formatARS(int30)}, total al vencimiento ${formatARS(tot30)}), el dólar oficial está en ${formatARS(dolar.valores.oficial)} y la inflación mensual ronda ${formatPct(ipc.valores.ipcMensualPct, 1)} (INDEC).`,
      },
      {
        tipo: "h2",
        texto: "El criterio en 4 pasos (antes que la tasa)",
      },
      {
        tipo: "ul",
        items: [
          "¿Cuándo vas a necesitarlo? Si es en menos de 30 días, nada de plazo fijo: money market o dejala en la cuenta.",
          "¿De qué te protegés? Si tu gasto futuro es en pesos (alquiler, cuotas), instrumentos en pesos; si es en dólares, dolarizá.",
          "¿Le gana a la inflación? Hoy el plazo fijo rinde " + formatPct(realAnual * 100) + " real anual: si es positivo, es el piso razonable sin riesgo.",
          "¿Estás duplicando riesgo? Un solo banco abajo del tope de garantía, pero si vas por más, repartí.",
        ],
      },
      {
        tipo: "tabla",
        headers: ["Opción para $1.000.000", "Qué te queda en 30 días", "Riesgo"],
        filas: [
          ["Plazo fijo tradicional", `${formatARS(tot30)} en pesos`, "Mínimo (garantía de depósitos)"],
          ["FCI money market", "≈ similar al plazo fijo, sin plazo fijo", "Muy bajo, no garantizado"],
          ["Dólar oficial", `US$ ${Math.round(1_000_000 / dolar.valores.oficial)} (no generan interés)`, "Depende del tipo de cambio"],
        ],
        caption: `Datos al ${tasas.fecha} — BCRA / INDEC`,
      },
      {
        tipo: "h2",
        texto: `La respuesta corta para ${mesCap}`,
      },
      {
        tipo: "p",
        texto: `Si le ganás de sobra a la inflación (real anual ${formatPct(realAnual * 100)}), el plazo fijo es la opción simple: sin comisiones, sin pantalla de cotizaciones, garantizado. La escalera (dividir en 2-4 plazos) te da flexibilidad sin sacrificar tasa. El dólar solo si tu plan es guardar en dólares, no rendir.`,
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Simulá tu millón con distintos plazos" },
      { tipo: "calc", href: "/plazo-fijo-vs-inflacion/", texto: "Verificá si le ganás a la inflación" },
    ],
    faqs: [
      {
        pregunta: `¿Cuánto gana un millón de pesos en un mes (${mesCap})?`,
        respuesta: `A la tasa promedio (${formatPct(tna)} TNA), el interés de 30 días es ${formatARS(int30)} y recibís ${formatARS(tot30)} al vencimiento.`,
      },
      {
        pregunta: "¿Conviene dividir el millón en varios plazos fijos?",
        respuesta:
          "La escalera (2-4 plazos con vencimientos desfasados) no aumenta la tasa pero da liquidez mensual sin romper plazos. Si el dinero es para algo dentro de 6 meses, casi siempre conviene.",
      },
      {
        pregunta: "¿Esto se actualiza?",
        respuesta: `Sí: la tabla se recalcula con la tasa del BCRA de cada mes y el título incorpora el mes en curso (${mesCap}).`,
      },
    ],
    relacionadas: [
      { titulo: "¿Cuánto gana un plazo fijo de $1.000.000?", href: "/guia/cuanto-gana-plazo-fijo-1000000/" },
      { titulo: "Plazo fijo vs dólar", href: "/guia/plazo-fijo-vs-dolar/" },
    ],
  });

  const escalera = (): Guia => ({
    slug: "escalera-plazos-fijos",
    titulo: "Escalera de plazos fijos: qué es y cómo armarla con tus montos",
    descripcion: `Dividí tus ahorros en plazos desfasados para tener liquidez cada mes sin romper nada. Ejemplo real con la tasa de hoy (${formatPct(tna)} TNA).`,
    bloques: [
      {
        tipo: "p",
        texto: `La escalera es dividir el total en plazos fijos con vencimientos desfasados: en vez de un plazo de $4.000.000, cuatro de $1.000.000 que vencen a partir del segundo mes, cada 30 días. La tasa no cambia (${formatPct(tna)} TNA hoy); lo que ganás es acceso periódico al dinero sin romper el resto.`,
      },
      {
        tipo: "h2",
        texto: "Cómo armarla en 3 movimientos",
      },
      {
        tipo: "ul",
        items: [
          "Mes 1: hacé el primer plazo con 1/N del total hoy.",
          "Mes 2: el segundo con otro 1/N.",
          "Al vencer cada uno: renovalo completo (capital + interés) o usalo si lo necesitás — la escalera se mantiene sola.",
        ],
      },
      {
        tipo: "tabla",
        headers: ["Tramo", "Vence", "Interés (30 días, tasa de hoy)"],
        filas: [1, 2, 3, 4].map((n) => [
          `Tramo ${n}: ${formatARS(1_000_000)}`,
          n === 1 ? "En 30 días" : `En ${n * 30} días`,
          formatARS(vencimientoPlazoFijo(1_000_000, tna, 30).interes),
        ]),
        caption: `Ejemplo con $4.000.000 escalonado — TNA ${formatPct(tna)} del ${tasas.fecha}`,
      },
      {
        tipo: "h2",
        texto: "Cuándo conviene y cuándo no",
      },
      {
        tipo: "p",
        texto: `Conviene si tu plata puede quedar a 30 días mínimo pero querés salidas mensuales (eventos, cuotas, oportunidades). No conviene si sabés que no vas a tocar nada por 6+ meses: un solo plazo más largo (o UVA) suele rendir más tranquilo. Y si el rendimiento real es ${realAnual >= 0 ? "positivo" : "negativo"} (${formatPct(realAnual * 100)} anual hoy), la escalera en pesos sigue siendo razonable; si no, mirá instrumentos indexados.`,
      },
      { tipo: "calc", href: "/plazo-fijo/", texto: "Simulá cada tramo de tu escalera" },
      { tipo: "calc", href: "/interes-compuesto/", texto: "Y proyectá la escalera con renovaciones" },
    ],
    faqs: [
      {
        pregunta: "¿La escalera de plazos fijos paga más interés?",
        respuesta: `No: el interés depende de la tasa y el plazo, no de cómo divides. Con la misma tasa (${formatPct(tna)} TNA), 4 plazos de $1.000.000 pagan lo mismo que uno de $4.000.000. La ventaja es la liquidez.`,
      },
      {
        pregunta: "¿Cada cuánto vencen los tramos de la escalera?",
        respuesta:
          "Lo típico es cada 30 días en Argentina (hasta 4 tramos). Con plazos de 60 o 90 días la escalera también funciona: tenés salidas menos frecuentes pero menos renovaciones que hacer.",
      },
    ],
    relacionadas: [
      { titulo: "¿Cuánto gana un plazo fijo de $2.000.000?", href: "/guia/cuanto-gana-plazo-fijo-2000000/" },
      { titulo: "¿Dónde conviene poner $1.000.000?", href: "/guia/donde-invertir-1000000/" },
    ],
  });

  return [dondeMillon(), escalera()];
}
