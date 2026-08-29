import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad y cookies",
  description:
    "Cómo tratamos los datos de los visitantes de Redito.ar y el uso de cookies publicitarias de Google AdSense.",
  alternates: { canonical: "/privacidad/" },
};

export default function PagePrivacidad() {
  return (
    <article className="prose-neutral space-y-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold sm:text-3xl">Política de privacidad y cookies</h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Última actualización: agosto 2026.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Qué datos recogemos</h2>
        <p>
          Redito.ar es un sitio de contenido estático. No pedimos registro, no almacenamos datos
          personales en servidores propios y las calculadoras funcionan por completo en tu
          navegador: los números que ingresás nunca salen de tu dispositivo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cookies y publicidad de terceros</h2>
        <p>
          Este sitio muestra publicidad de <strong>Google AdSense</strong>. Google y sus socios
          pueden usar cookies para mostrar anuncios basados en tus visitas anteriores a este u
          otros sitios web.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Podés desactivar la publicidad personalizada en{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Configuración de anuncios de Google
            </a>
            .
          </li>
          <li>
            También podés gestionar cookies desde tu navegador. Bloquear las cookies publicitarias
            no impide el uso del sitio ni de las calculadoras.
          </li>
          <li>
            Para saber cómo usa Google los datos cuando interactuás con sus servicios, consultá{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Cómo Google usa la información de sitios que usan sus servicios
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Analítica</h2>
        <p>
          Usamos herramientas de medición de tráfico (Google Search Console y estadísticas del
          hosting) que trabajan con datos agregados y no identifican personas. No vendemos ni
          compartimos datos con terceros con fines distintos a la publicidad descrita arriba.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>
          Si tenés preguntas sobre esta política, escribinos. Los datos del responsable del sitio
          están en la página{" "}
          <a href="/quienes-somos/" className="text-blue-600 hover:underline">
            Quiénes somos
          </a>
          .
        </p>
      </section>
    </article>
  );
}
