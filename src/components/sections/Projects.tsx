"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects, type ProjectKind } from "@/data/projects";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | ProjectKind; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile" },
  { id: "landing", label: "Landings" },
];

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const featured = projects.filter((p) => p.featured);
  const rest = useMemo(
    () => (filter === "all" ? projects.filter((p) => !p.featured) : projects.filter((p) => p.kind === filter)),
    [filter]
  );

  return (
    <section id="proyectos" className="container scroll-mt-16 py-24 sm:py-32">
      <SectionHeader
        index="01"
        label="Trabajo seleccionado"
        title="Proyectos"
        description="Productos reales para clínicas, constructoras, creadores y emprendedores. Web, móvil y todo lo que hay en medio."
      >
        <div role="tablist" aria-label="Filtrar proyectos" className="flex flex-wrap gap-1 rounded-md border border-line bg-ink-50 p-1">
          {FILTERS.map((f) => {
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.kind === f.id).length;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "flex items-center gap-2 rounded px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                  filter === f.id ? "bg-white text-black" : "text-muted hover:text-white"
                )}
              >
                {f.label}
                <span className={cn("text-[10px]", filter === f.id ? "text-blue" : "text-dim")}>{count}</span>
              </button>
            );
          })}
        </div>
      </SectionHeader>

      {filter === "all" && (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} featured />
          ))}
        </div>
      )}

      <motion.div layout className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rest.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
