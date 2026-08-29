import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de uso",
  description:
    "Condiciones de uso de Redito.ar: alcance de las calculadoras, límites de responsabilidad y propiedad del contenido.",
  alternates: { canonical: "/terminos/" },
};

export default function PageTerminos() {
  return (
    <article className="space-y-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold sm:text-3xl">Términos de uso</h1>
      <p className="text-neutral-600 dark:text-neutral-400">Última actualización: agosto 2026.</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Qué es Redito.ar</h2>
        <p>
          Redito.ar es un sitio informativo y de herramientas de cálculo sobre ahorro e inversión
          en Argentina. Publicamos simuladores y guías con datos de fuentes oficiales (BCRA,
          INDEC), sin cargo y sin registro.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Los cálculos son orientativos</h2>
        <p>
          Los resultados de las calculadoras y las tablas de las guías son{" "}
          <strong>estimaciones</strong> construidas con tasas de referencia del mercado, no la
          tasa que tu banco te va a ofrecer. Ningún resultado constituye asesoramiento
          financiero, ni una recomendación de compra o venta de ningún instrumento, ni una
          promesa de rentabilidad. Las decisiones de inversión son tuyas y bajo tu propio
          riesgo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Datos de terceros</h2>
        <p>
          Las tasas, cotizaciones e índices provienen de fuentes oficiales (Banco Central de la
          República Argentina, INDEC) y se actualizan con periodicidad mensual. Puede haber
          demoras o diferencias respecto de los valores al instante. No garantizamos la
          exactitud, completitud ni continuidad de esos datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Límites de responsabilidad</h2>
        <p>
          Redito.ar no se responsabiliza por pérdidas directas o indirectas derivadas del uso de
          la información o herramientas del sitio. Si necesitás asesoramiento financiero,
          consultá con un profesional matriculado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Propiedad del contenido</h2>
        <p>
          El contenido original del sitio puede citarse con enlace a la página correspondiente.
          Queda prohibida su reproducción total o sin atribución con fines comerciales.
        </p>
      </section>
    </article>
  );
}
