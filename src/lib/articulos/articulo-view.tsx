import Link from "next/link";
import { Bloque, Guia } from "./tipos";

/** Renderiza un bloque de guía. Los datos de las tablas ya vienen vivos del data layer. */
function BloqueView({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case "p":
      return <p className="leading-relaxed">{bloque.texto}</p>;
    case "h2":
      return <h2 className="pt-2 text-xl font-semibold">{bloque.texto}</h2>;
    case "ul":
      return (
        <ul className="list-disc space-y-1 pl-5">
          {bloque.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "tabla":
      return (
        <figure>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left dark:border-neutral-800">
                  {bloque.headers.map((h) => (
                    <th key={h} className="py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bloque.filas.map((fila, i) => (
                  <tr key={i} className="border-b border-neutral-100 dark:border-neutral-900">
                    {fila.map((celda, j) => (
                      <td key={j} className="py-2 pr-4">{celda}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bloque.caption && (
            <figcaption className="mt-2 text-[13px] text-neutral-600 dark:text-neutral-400">{bloque.caption}</figcaption>
          )}
        </figure>
      );
    case "calc":
      return (
        <Link
          href={bloque.href}
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {bloque.texto} →
        </Link>
      );
  }
}

/** Página de artículo completa con JSON-LD Article + FAQPage + BreadcrumbList. */
export function ArticuloView({ guia, fecha }: { guia: Guia; fecha: string }) {
  const BASE = "https://reditos.com.ar";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guia.titulo,
        description: guia.descripcion,
        datePublished: fecha,
        dateModified: fecha,
        inLanguage: "es-AR",
        mainEntityOfPage: `${BASE}/guia/${guia.slug}/`,
        author: { "@type": "Organization", name: "Redito.ar" },
        publisher: { "@type": "Organization", name: "Redito.ar" },
      },
      {
        "@type": "FAQPage",
        mainEntity: guia.faqs.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Guías", item: `${BASE}/guia/` },
          { "@type": "ListItem", position: 3, name: guia.titulo, item: `${BASE}/guia/${guia.slug}/` },
        ],
      },
    ],
  };

  return (
    <article className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header>
        <nav aria-label="Miga de pan" className="text-[13px]">
          <Link href="/guia/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Guías
          </Link>
          <span className="text-neutral-400 dark:text-neutral-600"> / {guia.titulo}</span>
        </nav>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{guia.titulo}</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{guia.descripcion}</p>
        <p className="mt-1 text-[13px] text-neutral-600 dark:text-neutral-400">
          Actualizado automáticamente con datos oficiales · {fecha}
        </p>
      </header>

      <div className="space-y-4 text-[15px] text-neutral-700 dark:text-neutral-300">
        {guia.bloques.map((b, i) => (
          <BloqueView key={i} bloque={b} />
        ))}
      </div>

      <section className="rounded-xl bg-neutral-100 p-5 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          Preguntas frecuentes
        </h2>
        <div className="mt-3 space-y-4">
          {guia.faqs.map((f) => (
            <div key={f.pregunta}>
              <h3 className="font-medium">{f.pregunta}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{f.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="flex flex-wrap gap-3">
        {guia.relacionadas.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:border-blue-400 dark:border-neutral-800"
          >
            {r.titulo} →
          </Link>
        ))}
      </nav>
    </article>
  );
}
