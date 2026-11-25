import { ArrowDownRight, Github } from "lucide-react";
import DotField from "@/components/pixel/DotField";
import PixelLoader from "@/components/pixel/PixelLoader";
import ScrambleText from "@/components/pixel/ScrambleText";
import Clock from "@/components/ui/Clock";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function Hero() {
  const stats = [
    { k: "Proyectos", v: String(projects.length).padStart(2, "0") },
    { k: "Enfoque", v: "WEB+MOBILE" },
    { k: "Base", v: "BAQ·CO" },
  ];

  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* Fondo */}
      <div className="absolute inset-0">
        <DotField className="mask-fade-b" />
        <div className="absolute left-1/2 top-[38%] h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/20 blur-[120px]" />
      </div>

      <div className="container relative flex flex-1 flex-col justify-center py-16">
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <PixelLoader cell={4} gap={2} />
          <span>{site.role}</span>
          <span className="text-dim">/</span>
          <span>{site.location}</span>
        </div>

        <h1 className="font-pixel uppercase leading-[0.86] tracking-tight">
          <span className="block text-[clamp(3.25rem,13vw,10.5rem)]">
            <ScrambleText text="Keyner" speed={34} />
          </span>
          <span className="block text-[clamp(3.25rem,13vw,10.5rem)] text-blue-bright text-glow">
            <ScrambleText text="De la Hoz" speed={34} delay={180} />
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-lg text-muted sm:text-xl">
          Construyo productos web y móviles de punta a punta: desde plataformas médicas y apps con IA
          on-device hasta landings que convierten.{" "}
          <span className="text-white">Diseño, código y detalle.</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#proyectos"
            className="group inline-flex h-12 items-center gap-3 rounded-md bg-blue px-6 font-medium text-white transition-all hover:bg-blue-glow hover:glow-blue"
          >
            Ver proyectos
            <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-3 rounded-md border border-line bg-ink/60 px-6 font-medium text-white backdrop-blur transition-colors hover:border-white/30"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>

      {/* Barra de estado inferior */}
      <div className="relative border-t border-line bg-ink/60 backdrop-blur">
        <div className="container grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`flex flex-col gap-1 border-line py-5 pr-4 odd:border-r even:pl-4 md:border-r md:pl-6 md:first:pl-0 ${
                i >= 2 ? "max-md:border-t" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{s.k}</span>
              <span className="font-pixel text-xl sm:text-2xl">{s.v}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1 border-line py-5 pl-4 max-md:border-t md:pl-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Hora local</span>
            <Clock className="font-pixel text-xl tabular-nums text-blue-bright sm:text-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
