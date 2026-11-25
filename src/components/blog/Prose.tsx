import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

/** Piezas tipográficas para los artículos del blog. */

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group mt-16 scroll-mt-24 text-balance text-2xl font-medium tracking-tight text-white sm:text-3xl">
      <a href={`#${id}`} className="flex items-start gap-3">
        <span className="mt-[0.45em] h-2 w-2 shrink-0 bg-blue-bright" aria-hidden />
        {children}
      </a>
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-10 text-lg font-medium text-white sm:text-xl">{children}</h3>;
}

export function P({ children, lead }: { children: React.ReactNode; lead?: boolean }) {
  return <p className={cn("mt-5 text-pretty", lead ? "text-lg text-white/90 sm:text-xl" : "text-[17px] leading-[1.55] text-white/75")}>{children}</p>;
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-ink-200 px-1.5 py-0.5 font-mono text-[0.88em] text-blue-bright">{children}</code>;
}

export function CodeBlock({ code, title, lang = "xml" }: { code: string; title?: string; lang?: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-lg border border-line bg-ink-50">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{title}</span>
        <span className="text-dim">{lang}</span>
      </figcaption>
      <pre className="max-h-[480px] overflow-auto p-4 text-[12.5px] leading-[1.55] text-white/85">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}

export function Video({
  src,
  poster,
  caption,
  vertical,
}: {
  src: string;
  poster: string;
  caption: string;
  vertical?: boolean;
}) {
  return (
    <figure className={cn("mt-8", vertical && "mx-auto max-w-[340px]")}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className={cn("w-full rounded-lg border border-line bg-ink-100", vertical ? "aspect-[9/16]" : "aspect-square")}
      />
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{caption}</figcaption>
    </figure>
  );
}

export function DownloadCard({ href, name, meta }: { href: string; name: string; meta: string }) {
  return (
    <a
      href={href}
      download
      className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-ink-50 p-4 transition-colors hover:border-blue/60"
    >
      <span className="flex flex-col">
        <span className="font-mono text-sm text-white">{name}</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{meta}</span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-blue-bright group-hover:bg-blue">
        <Download size={16} />
      </span>
    </a>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="mt-8 flex flex-col border-l border-line">
      {items.map((s, i) => (
        <li key={s.title} className="relative pb-8 pl-8 last:pb-0">
          <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] bg-blue-bright" aria-hidden />
          <span className="font-mono text-xs text-blue-bright">Paso 0{i + 1}</span>
          <h3 className="mt-1 text-lg font-medium text-white">{s.title}</h3>
          <p className="mt-2 text-[16px] leading-[1.6] text-white/70">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
