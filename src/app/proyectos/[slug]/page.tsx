import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { cases } from "@/data/cases";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import Gallery from "@/components/project/Gallery";
import ScrambleText from "@/components/pixel/ScrambleText";
import PixelLoader from "@/components/pixel/PixelLoader";
import Reveal from "@/components/ui/Reveal";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  const shots = gallery[p.slug] ?? [];
  const image = shots.find((s) => s.kind === "desktop")?.src ?? p.image;
  return {
    title: `${p.title}: ${p.tagline}`,
    description: p.description,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: {
      title: `${p.title} · Caso de estudio`,
      description: p.description,
      url: `/proyectos/${p.slug}`,
      type: "article",
      ...(image ? { images: [{ url: image, alt: p.title }] } : {}),
    },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{children}</span>;
}

export default function ProjectPage({ params }: Params) {
  const index = projects.findIndex((x) => x.slug === params.slug);
  if (index < 0) notFound();
  const p = projects[index];
  const c = cases[p.slug];
  const shots = gallery[p.slug] ?? [];
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: p.title,
        headline: p.tagline,
        description: c?.overview ?? p.description,
        dateCreated: p.year,
        url: `${site.url}/proyectos/${p.slug}`,
        keywords: p.stack.join(", "),
        creator: { "@id": `${site.url}/#person` },
        ...(shots[0] ? { image: shots.map((s) => `${site.url}${s.src}`) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name: "Proyectos", item: `${site.url}/#proyectos` },
          { "@type": "ListItem", position: 3, name: p.title, item: `${site.url}/proyectos/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Encabezado */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-dots opacity-50 mask-radial" aria-hidden />
        <div className="container relative py-14 sm:py-20">
          <a href="/#proyectos" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-white">
            <ArrowLeft size={14} /> Proyectos
          </a>

          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-blue-bright">/{String(index + 1).padStart(2, "0")}</span>
            <span>{p.type}</span>
            <span className="text-dim">·</span>
            <span>{p.year}</span>
          </div>

          <h1 className="mt-4 font-pixel text-[clamp(2.6rem,9vw,6.5rem)] uppercase leading-[0.9] tracking-tight">
            <ScrambleText text={p.title} />
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted sm:text-xl">{p.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.liveUrl ? (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-blue px-5 text-sm font-medium text-white transition-colors hover:bg-blue-glow"
              >
                Ver en vivo <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span className="inline-flex h-11 items-center gap-3 rounded-md border border-line px-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                <PixelLoader cell={3} gap={1} /> {p.kind === "mobile" ? "App en desarrollo" : "Proyecto privado"}
              </span>
            )}
            <a href="/#contacto" className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-medium text-white transition-colors hover:border-white/30">
              ¿Quieres algo así?
            </a>
          </div>

          {/* Ficha */}
          <dl className="mt-14 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
            {[
              { k: "Plataforma", v: c?.platform ?? p.type },
              { k: "Año", v: p.year },
              { k: "Rol", v: c?.role.slice(0, 2).join(" · ") ?? "Desarrollo" },
              { k: "Stack", v: p.stack.slice(0, 3).join(" · ") },
            ].map((m) => (
              <div key={m.k} className="flex flex-col gap-2 border-b border-r border-line p-4 sm:p-5">
                <dt><Label>{m.k}</Label></dt>
                <dd className="text-sm text-white">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Resumen / reto / solución */}
      {c && (
        <section className="container grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Label>Resumen</Label>
            <p className="mt-4 text-pretty text-xl leading-[1.3] text-white sm:text-[1.75rem]">{c.overview}</p>
          </Reveal>
          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="flex items-center gap-3 font-pixel text-xl uppercase">
                <span className="h-2 w-2 bg-blue-bright" /> El reto
              </h2>
              <p className="mt-3 text-pretty text-muted">{c.challenge}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="flex items-center gap-3 font-pixel text-xl uppercase">
                <span className="h-2 w-2 bg-blue-bright" /> La solución
              </h2>
              <p className="mt-3 text-pretty text-muted">{c.solution}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Mi rol</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.role.map((r) => (
                  <li key={r} className="rounded border border-line bg-ink-50 px-2.5 py-1 text-sm text-white/85">{r}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Galería */}
      <section className="border-t border-line bg-ink-50/40">
        <div className="container py-16 sm:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <Label>Capturas</Label>
              <h2 className="mt-3 font-pixel text-3xl uppercase sm:text-4xl">La plataforma</h2>
            </div>
            {shots.length > 0 && <span className="font-mono text-xs text-dim">{String(shots.length).padStart(2, "0")} vistas</span>}
          </div>
          {shots.length > 0 ? (
            <Gallery shots={shots} />
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line py-16 text-center">
              <PixelLoader cell={6} gap={2} grid={4} />
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Capturas próximamente</p>
            </div>
          )}
        </div>
      </section>

      {/* Funcionalidades */}
      {c && (
        <section className="container py-16 sm:py-24">
          <Label>Funcionalidades</Label>
          <h2 className="mt-3 font-pixel text-3xl uppercase sm:text-4xl">Qué hace</h2>
          <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f, i) => (
              <li key={f.title} className="border-b border-r border-line p-6">
                <span className="font-mono text-xs text-blue-bright">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Herramientas */}
      {c && (
        <section className="border-t border-line">
          <div className="container grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_2fr]">
            <div>
              <Label>Stack</Label>
              <h2 className="mt-3 font-pixel text-3xl uppercase sm:text-4xl">Herramientas</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {c.tools.map((t) => (
                <li key={t.name} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <span className="font-mono text-sm text-white">{t.name}</span>
                  <span className="text-sm text-muted">{t.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Siguiente */}
      <a href={`/proyectos/${next.slug}`} className="group block border-t border-line">
        <div className="container flex items-center justify-between gap-6 py-14 sm:py-20">
          <div>
            <Label>Siguiente proyecto</Label>
            <p className="mt-3 font-pixel text-3xl uppercase transition-colors group-hover:text-blue-bright sm:text-5xl">{next.title}</p>
            <p className="mt-2 text-sm text-muted">{next.tagline}</p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-blue-bright group-hover:bg-blue">
            <ArrowRight size={20} />
          </span>
        </div>
      </a>
    </main>
  );
}
