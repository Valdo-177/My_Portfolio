import { ArrowUp } from "lucide-react";
import Clock from "@/components/ui/Clock";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col gap-6 py-8 font-mono text-[11px] uppercase tracking-[0.16em] text-dim sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="flex items-center gap-2">
          Barranquilla <Clock className="text-muted tabular-nums" />
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <a href={site.links.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Instagram</a>
          <a href={site.links.youtube} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">YouTube</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
          <a href="/blog" className="transition-colors hover:text-white">Blog</a>
        </span>
        <a href="#top" className="flex items-center gap-2 text-muted transition-colors hover:text-white">
          Volver arriba <ArrowUp size={12} />
        </a>
      </div>
      {/* Wordmark gigante */}
      <div className="overflow-hidden" aria-hidden>
        <div className="container">
          <div className="select-none whitespace-nowrap font-pixel-grid text-[19vw] uppercase leading-[0.75] text-white/[0.06] lg:text-[15rem]">
            {site.shortName}
          </div>
        </div>
      </div>
    </footer>
  );
}
