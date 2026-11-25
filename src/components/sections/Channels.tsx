import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { channels } from "@/data/channels";
import { getLatestVideos } from "@/lib/youtube";

/** Canales de YouTube donde grabo y/o edito. Va dentro de la sección Contenido. */
export default async function Channels() {
  const data = await Promise.all(
    channels.map(async (c) => ({ channel: c, videos: await getLatestVideos(3, c.channelId) }))
  );

  return (
    <div className="mt-20">
      <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Podcasts y canales</span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">Donde grabo y edito</h3>
        </div>
        <p className="max-w-sm text-sm text-muted">Episodios en los que estoy detrás de cámara y en la línea de tiempo.</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {data.map(({ channel: c, videos }, ci) => (
          <Reveal key={c.handle} delay={ci * 0.08} className="h-full">
            <article className="flex h-full flex-col rounded-lg border border-line bg-ink-50 p-6">
              <header className="flex items-start justify-between gap-4">
                <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                  <Image
                    src={c.avatar}
                    alt={`Logo de ${c.name}`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border border-line object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="text-lg font-medium text-white transition-colors group-hover:text-blue-bright">{c.name}</span>
                    <span className="font-mono text-[11px] text-dim">{c.handle}</span>
                  </span>
                </a>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${c.name} en YouTube`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-blue-bright hover:bg-blue"
                >
                  <ArrowUpRight size={15} />
                </a>
              </header>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {c.roles.map((r) => (
                  <span key={r} className="flex items-center gap-2 rounded border border-blue/40 bg-blue-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-bright">
                    <span className="h-[5px] w-[5px] bg-blue-bright" /> {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">{c.description}</p>

              {videos.length > 0 && (
                <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                  {videos.map((v) => (
                    <li key={v.id}>
                      <a href={v.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-3">
                        <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded border border-line bg-ink-100">
                          <Image src={v.thumbnail} alt={v.title} fill sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                            <Play size={14} />
                          </span>
                        </span>
                        <span className="line-clamp-2 text-sm text-white/85 transition-colors group-hover:text-blue-bright">{v.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
