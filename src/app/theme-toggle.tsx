"use client";

import { useEffect, useState } from "react";

/** Toggle claro/oscuro. Persiste en localStorage ('tema').
 * Default: preferencia del sistema. Sin flash al cargar (script en <head>). */
export default function ThemeToggle() {
  const [tema, setTema] = useState<"light" | "dark">("light");

  // leer estado real recién en el cliente (evita mismatch de SSR/SSG)
  useEffect(() => {
    setTema(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const nuevo = tema === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nuevo === "dark");
    try {
      localStorage.setItem("tema", nuevo);
    } catch {
      /* storage bloqueado: el toggle funciona igual en la sesión */
    }
    setTema(nuevo);
  }

  return (
    <button
      type="button"
      aria-label={tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={tema === "dark" ? "Modo claro" : "Modo oscuro"}
      onClick={toggle}
      className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm transition-colors hover:border-blue-500 dark:border-neutral-700 dark:hover:border-blue-500"
    >
      {tema === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
