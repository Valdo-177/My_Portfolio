import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/data/posts";

const fmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function PostCard({ post, large = false }: { post: PostMeta; large?: boolean }) {
  return (
    <article className={`group relative grid overflow-hidden rounded-lg border border-line bg-ink-50 transition-colors hover:border-blue/60 ${large ? "md:grid-cols-[1.1fr_1fr]" : ""}`}>
      <div className={`relative overflow-hidden bg-ink-100 ${large ? "aspect-[16/10] md:aspect-auto md:min-h-[340px]" : "aspect-[16/10]"}`}>
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="dither absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-0" aria-hidden />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
          <time dateTime={post.date}>{fmt.format(new Date(post.date))}</time>
          <span>·</span>
          <span>{post.readingMinutes} min de lectura</span>
        </div>
        <h3 className={`text-balance font-medium tracking-tight text-white ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </a>
        </h3>
        <p className="text-pretty text-sm text-muted">{post.description}</p>
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{t}</li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors group-hover:text-blue-bright">
          Leer artículo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
