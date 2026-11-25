import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import ScrambleText from "@/components/pixel/ScrambleText";
import { site } from "@/data/site";

export default function Contact() {
  const links = [
    site.email && { href: `mailto:${site.email}`, label: "Email", value: site.email, icon: Mail },
    { href: site.links.github, label: "GitHub", value: "@Valdo-177", icon: Github },
    site.links.linkedin && { href: site.links.linkedin, label: "LinkedIn", value: "Conectemos", icon: Linkedin },
    { href: site.links.instagram, label: "Instagram", value: site.social.instagramHandle, icon: Instagram },
    { href: site.links.youtube, label: "YouTube", value: site.social.youtubeHandle, icon: Youtube },
  ].filter(Boolean) as { href: string; label: string; value: string; icon: typeof Mail }[];

  const primary = site.email ? `mailto:${site.email}` : site.links.github;

  return (
    <section id="contacto" className="relative scroll-mt-16 overflow-hidden border-t border-line">
      <div className="absolute inset-0 bg-dots mask-radial" aria-hidden />
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/15 blur-[120px]" aria-hidden />

      <div className="container relative py-28 sm:py-40">
        <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-blue-bright">[06]</span>
          <span className="h-px w-8 bg-line" />
          Contacto
        </span>

        <a href={primary} target={site.email ? undefined : "_blank"} rel="noreferrer" className="group mt-8 block w-fit">
          <h2 className="font-pixel text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.95] tracking-tight">
            <ScrambleText text="¿Tienes un" />
            <br />
            <span className="inline-flex items-center gap-4 text-blue-bright text-glow">
              <ScrambleText text="proyecto?" delay={150} />
              <ArrowUpRight className="h-[0.6em] w-[0.6em] transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2" />
            </span>
          </h2>
        </a>

        <p className="mt-8 max-w-lg text-pretty text-lg text-muted">
          Cuéntame la idea. Respondo rápido y sin rodeos: alcance, tiempos y cómo lo construiríamos.
        </p>

        <ul
          className={`mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line ${
            links.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : links.length === 2 ? "sm:grid-cols-2" : "max-w-md"
          }`}
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex h-full items-center justify-between gap-4 bg-ink p-6 transition-colors hover:bg-ink-100"
              >
                <span className="flex items-center gap-4">
                  <l.icon size={20} strokeWidth={1.5} className="text-muted transition-colors group-hover:text-blue-bright" />
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{l.label}</span>
                    <span className="break-all text-white">{l.value}</span>
                  </span>
                </span>
                <ArrowUpRight size={16} className="text-dim transition-colors group-hover:text-white" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
