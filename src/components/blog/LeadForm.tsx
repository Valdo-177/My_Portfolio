"use client";

import { useState } from "react";
import { ArrowRight, Check, FileText } from "lucide-react";
import PixelLoader from "@/components/pixel/PixelLoader";

type State = "idle" | "sending" | "sent" | "error";

/** Formulario: pide el correo y el servidor envía el PDF de reglas. */
export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const website = (new FormData(e.currentTarget).get("website") as string) || "";
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/reglas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "No pude enviar el correo.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo falló.");
      setState("error");
    }
  };

  return (
    <aside id="reglas" className="relative my-14 scroll-mt-24 overflow-hidden rounded-lg border border-blue/40 bg-blue-ink p-6 sm:p-8">
      <div className="absolute inset-0 bg-dots-blue opacity-30 mask-radial" aria-hidden />
      <div className="relative">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-bright">
          <FileText size={14} /> PDF gratis · 13 páginas
        </div>
        <h3 className="mt-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Las reglas completas para automatizar Alight Motion con cualquier agente de IA
        </h3>
        <p className="mt-3 max-w-xl text-muted">
          Estructura del archivo, tiempos y keyframes, formas, texto, cámara 3D, efectos confirmados y la lista
          de verificación que paso antes de entregar. Te llega al correo.
        </p>

        {state === "sent" ? (
          <p className="mt-6 flex items-center gap-3 rounded-md border border-blue/40 bg-black/40 p-4 text-white" role="status">
            <Check size={18} className="text-blue-bright" /> Listo. Revisa tu bandeja (y spam) en unos minutos.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="lead-email" className="sr-only">Correo electrónico</label>
            <input
              id="lead-email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-md border border-line bg-black/60 px-4 text-white placeholder:text-dim focus:border-blue-bright focus:outline-none"
            />
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-blue px-6 font-medium text-white transition-colors hover:bg-blue-glow disabled:opacity-70"
            >
              {state === "sending" ? (
                <>
                  <PixelLoader cell={3} gap={1} /> Enviando
                </>
              ) : (
                <>
                  Enviarme el PDF <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
        {state === "error" && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          Solo uso tu correo para enviarte el archivo. Nada de spam.
        </p>
      </div>
    </aside>
  );
}
