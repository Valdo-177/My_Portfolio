import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ReelPlayer from "@/components/ui/ReelPlayer";
import PixelLoader from "@/components/pixel/PixelLoader";
import { capabilities, contentIntro, reels } from "@/data/content";
import Channels from "./Channels";

export default function Content() {
  const reel = reels[0];

  return (
    <section id="contenido" className="container scroll-mt-16 py-24 sm:py-32">
      <SectionHeader index="02" label="Creación audiovisual" title="Contenido" description={contentIntro} />

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[340px] lg:max-w-none">
          <ReelPlayer src={reel.src} poster={reel.poster} title={`${reel.title} — ${reel.client}`} />
        </Reveal>

        <div className="flex flex-col">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="flex items-center gap-2 text-blue-bright">
                <PixelLoader cell={3} gap={1} /> Destacado
              </span>
              <span className="text-dim">/</span>
              <span>{reel.client}</span>
              <span className="text-dim">/</span>
              <span>{reel.format}</span>
              <span className="text-dim">/</span>
              <span>{reel.durationLabel}</span>
            </div>
            <h3 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              {reel.title}
            </h3>
            <p className="mt-5 max-w-xl text-pretty text-muted">{reel.description}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-8 border-y border-line py-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Mi rol</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {reel.roles.map((r) => (
                    <span key={r} className="rounded border border-line bg-ink-50 px-2.5 py-1 text-sm text-white/85">
                      {r}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Herramientas</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {reel.tools.map((t) => (
                    <span key={t} className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <ul className="mt-2 flex flex-col">
            {capabilities.map((c, i) => (
              <li key={c.title} className="border-b border-line py-6">
                <Reveal delay={0.05 * i} className="grid gap-2 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-6">
                  <span className="font-mono text-xs text-blue-bright">0{i + 1}</span>
                  <h4 className="font-pixel text-xl uppercase">{c.title}</h4>
                  <p className="text-sm text-muted">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Channels />
    </section>
  );
}
