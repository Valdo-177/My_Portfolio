"use client";

import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import PixelReveal from "@/components/pixel/PixelReveal";
import ScrambleText from "@/components/pixel/ScrambleText";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function Corners() {
  const base = "absolute h-3 w-3 border-blue-bright opacity-0 transition-all duration-300 group-hover:opacity-100";
  return (
    <span aria-hidden>
      <span className={cn(base, "left-2 top-2 border-l-2 border-t-2 group-hover:left-3 group-hover:top-3")} />
      <span className={cn(base, "right-2 top-2 border-r-2 border-t-2 group-hover:right-3 group-hover:top-3")} />
      <span className={cn(base, "bottom-2 left-2 border-b-2 border-l-2 group-hover:bottom-3 group-hover:left-3")} />
      <span className={cn(base, "bottom-2 right-2 border-b-2 border-r-2 group-hover:bottom-3 group-hover:right-3")} />
    </span>
  );
}

function Media({ project, featured }: { project: Project; featured: boolean }) {
  if (!project.image) {
    // Monograma pixel para proyectos sin imagen
    const initials = project.title
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
    return (
      <div className="flex h-full w-full items-center justify-center bg-dots-blue">
        <span className="font-pixel-circle text-[7rem] uppercase leading-none text-blue-bright text-glow transition-transform duration-500 group-hover:scale-105">
          {initials}
        </span>
      </div>
    );
  }

  if (project.imageFit === "phone") {
    return (
      <div className="flex h-full w-full items-end justify-center overflow-hidden bg-dots-blue">
        <div className="relative h-[115%] translate-y-[14%] rounded-[1.6rem] border-[5px] border-ink-300 bg-ink shadow-[0_0_60px_-10px_rgba(0,112,243,0.5)] transition-transform duration-500 group-hover:translate-y-[8%]" style={{ aspectRatio: "390 / 844" }}>
          <Image
            src={project.image}
            alt={`Captura de ${project.title}`}
            fill
            sizes="220px"
            className="rounded-[1.25rem] object-cover object-top"
          />
        </div>
      </div>
    );
  }

  if (project.imageFit === "icon") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-dots">
        <Image
          src={project.image}
          alt={`Ícono de ${project.title}`}
          width={160}
          height={160}
          className="h-28 w-28 rounded-[28%] shadow-[0_20px_60px_-10px_rgba(0,112,243,0.45)] transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32"
        />
      </div>
    );
  }

  return (
    <>
      <Image
        src={project.image}
        alt={`Vista de ${project.title}`}
        fill
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        style={{ objectPosition: project.imagePosition ?? "center top" }}
        className="object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
      />
      {/* Trama de puntos que se desvanece al hover */}
      <span className="dither absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" aria-hidden />
    </>
  );
}

export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-ink-50 transition-colors duration-300 hover:border-blue/60">
      <PixelReveal className={cn("relative bg-ink-100", featured ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Media project={project} featured={featured} />
        <Corners />
        <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted backdrop-blur">
          {project.type}
        </span>
        <span className="absolute right-3 top-3 font-pixel text-sm text-white/70">
          /{String(index + 1).padStart(2, "0")}
        </span>
      </PixelReveal>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-pixel text-2xl uppercase leading-tight sm:text-3xl">
              <ScrambleText text={project.title} hover />
            </h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
          <span className="shrink-0 font-mono text-xs text-dim">{project.year}</span>
        </div>

        {featured && (
          <>
            <p className="text-pretty text-sm leading-relaxed text-white/75">{project.description}</p>
            <ul className="flex flex-col gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-muted">
                  <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-blue-bright" />
                  {h}
                </li>
              ))}
            </ul>
          </>
        )}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded border border-line bg-ink px-2 py-1 font-mono text-[11px] text-muted"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-line pt-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors hover:text-blue-bright"
            >
              <span className="h-[6px] w-[6px] bg-blue-bright" />
              Ver en vivo
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-dim">
              <span className="h-[6px] w-[6px] animate-pixel-blink bg-blue-bright" />
              {project.kind === "mobile" ? "En desarrollo" : "Privado"}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim"
            title="El código fuente es privado"
          >
            <Lock size={11} /> Repo privado
          </span>
        </div>
      </div>
    </article>
  );
}
