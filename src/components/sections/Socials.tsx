import Image from "next/image";
import { ArrowUpRight, Instagram, Play, Youtube } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { getLatestVideos } from "@/lib/youtube";
import { site } from "@/data/site";
import { channels } from "@/data/channels";

const fmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric" });

// Patrón dot-matrix para la tarjeta de Instagram (una cámara en 9x9)
const CAM = [
  "011111110",
  "100000001",
  "100011001",
  "100100101",
  "100100101",
  "100011001",
  "100000001",
  "011111110",
  "000000000",
];

export default async function Socials() {
  const videos = await getLatestVideos(4);

  return (
    <section id="redes" className="container scroll-mt-16 py-24 sm:py-32">
      <SectionHeader
        index="03"
        label="Fuera del código"
        title="Redes"
        description="Detrás de cámaras, procesos, episodios y experimentos. Aquí es donde publico lo que voy creando."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
        {/* Instagram */}
        <Reveal className="h-full">
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-lg border border-line bg-ink-50 p-6 transition-colors hover:border-blue/60 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-transparent" aria-hidden />
            <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="flex items-center gap-2">
                <Instagram size={16} className="text-blue-bright" /> Instagram
              </span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>

            <div className="relative my-8 grid w-fit grid-cols-9 gap-[5px] self-center" aria-hidden>
              {CAM.join("")
                .split("")
                .map((on, i) => (
                  <span
                    key={i}
                    className={
                      on === "1"
                        ? "h-4 w-4 bg-white transition-colors duration-500 group-hover:bg-blue-bright sm:h-5 sm:w-5"
                        : "h-4 w-4 bg-white/[0.05] sm:h-5 sm:w-5"
                    }
                    style={{ transitionDelay: `${(i % 9) * 25}ms` }}
                  />
                ))}
            </div>

            <div className="relative">
              <p className="font-pixel text-3xl uppercase">{site.social.instagramHandle}</p>
              <p className="mt-2 max-w-xs text-sm text-muted">
                Reels, procesos de edición y lo que pasa detrás de cada proyecto.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors group-hover:bg-blue-bright group-hover:text-white">
                Seguir en Instagram
              </span>
            </div>
          </a>
        </Reveal>

        {/* YouTube */}
        <Reveal delay={0.08} className="h-full">
          <div className="flex h-full flex-col rounded-lg border border-line bg-ink-50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="flex items-center gap-2">
                <Youtube size={16} className="text-blue-bright" /> YouTube <span className="hidden text-dim sm:inline">· {site.social.youtubeHandle}</span>
              </span>
              <a
                href={site.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-white transition-colors hover:text-blue-bright"
              >
                Ver canal <ArrowUpRight size={14} />
              </a>
            </div>

            {videos.length > 0 ? (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {videos.map((v) => (
                  <li key={v.id}>
                    <a href={v.url} target="_blank" rel="noreferrer" className="group block">
                      <div className="relative aspect-video overflow-hidden rounded-md border border-line bg-ink-100">
                        <Image
                          src={v.thumbnail}
                          alt={v.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover grayscale-[30%] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                        />
                        <span className="dither absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" aria-hidden />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur transition-colors group-hover:bg-blue">
                            <Play size={16} className="translate-x-px" />
                          </span>
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm font-medium text-white group-hover:text-blue-bright">{v.title}</p>
                      {v.published && (
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                          {fmt.format(new Date(v.published))}
                        </p>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <a
                href={site.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex flex-1 items-center justify-center rounded-md border border-dashed border-line p-10 text-sm text-muted hover:text-white"
              >
                Mira los videos en el canal →
              </a>
            )}
            <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              También grabo y edito en{" "}
              {channels.map((c, i) => (
                <span key={c.handle}>
                  {i > 0 && " · "}
                  <a href={c.url} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-blue-bright">
                    {c.name}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
