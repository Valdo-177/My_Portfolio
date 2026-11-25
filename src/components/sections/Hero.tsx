import { ArrowRight, ArrowDown } from "lucide-react";
import MorphGrid from "@/components/pixel/MorphGrid";
import RoleCycler from "@/components/pixel/RoleCycler";
import Clock from "@/components/ui/Clock";
import { site } from "@/data/site";

function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-dots opacity-40 mask-radial" aria-hidden />
      <div className="absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-blue/10 blur-[140px]" aria-hidden />

      <div className="container relative grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* Texto */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex w-full items-start justify-center gap-6 lg:max-w-[38rem] lg:justify-between">
            <Asterisk className="h-9 w-9 animate-[spin_14s_linear_infinite] text-blue-bright" />
            <span className="hidden pt-1 text-right font-mono lg:block text-[10px] uppercase tracking-[0.2em] text-muted">
              Código & contenido
              <br />
              {site.location}
            </span>
          </div>

          <h1 className="mt-8 font-sans text-[clamp(3rem,9vw,7.25rem)] font-medium uppercase leading-[0.92] tracking-[-0.045em]">
            <span className="flex items-center justify-center gap-[0.18em] lg:justify-start">
              Keyner
              <span className="inline-block h-[0.16em] w-[0.16em] translate-y-[0.02em] bg-blue-bright shadow-[0_0_18px_rgba(82,168,255,0.7)]" />
            </span>
            <span className="block">De la Hoz</span>
          </h1>

          <div className="mt-8 flex items-center gap-3 font-mono text-base text-white sm:text-lg">
            <span className="text-blue-bright">&gt;</span>
            <RoleCycler roles={site.roles} className="min-h-[1.5em]" />
            <span className="-ml-1 inline-block h-[1.1em] w-[0.55em] animate-caret bg-blue-bright" aria-hidden />
          </div>

          <p className="mt-6 hidden max-w-md text-pretty text-[15px] text-muted sm:block">{site.intro}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-3 border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-blue-bright hover:text-blue-bright"
            >
              Ver proyectos
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contenido"
              className="group inline-flex items-center gap-3 border-b border-white/15 pb-1 text-sm font-medium text-muted transition-colors hover:border-white hover:text-white"
            >
              Ver contenido
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Composición */}
        <div className="mx-auto hidden w-full max-w-[500px] lg:block">
          <MorphGrid />
        </div>
      </div>

      {/* Pie del hero */}
      <div className="container relative flex items-end justify-center pb-8 sm:justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        <span className="hidden sm:block">
          Hora local · <Clock className="tabular-nums text-muted" />
        </span>
        <a href="#proyectos" className="flex flex-col items-center gap-3 text-muted transition-colors hover:text-white sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scan_1.8s_ease-in-out_infinite] bg-blue-bright" />
          </span>
        </a>
        <span className="hidden items-center gap-2 sm:flex">
          <ArrowDown size={12} /> {site.available ? "Disponible para proyectos" : "Portafolio 2026"}
        </span>
      </div>
    </section>
  );
}
