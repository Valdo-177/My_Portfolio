import type { Metadata } from "next";
import { posts } from "@/data/posts";
import PostCard from "@/components/blog/PostCard";
import ScrambleText from "@/components/pixel/ScrambleText";
import PixelLoader from "@/components/pixel/PixelLoader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog: desarrollo, IA y creación de contenido",
  description:
    "Artículos de Keyner De la Hoz sobre desarrollo web y móvil, inteligencia artificial aplicada, motion graphics, Alight Motion y creación de contenido.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog · Keyner De la Hoz", url: "/blog", type: "website" },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [first, ...rest] = sorted;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de Keyner De la Hoz",
    url: `${site.url}/blog`,
    inLanguage: "es-CO",
    author: { "@id": `${site.url}/#person` },
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-dots opacity-50 mask-radial" aria-hidden />
        <div className="container relative py-16 sm:py-24">
          <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <PixelLoader cell={3} gap={1} /> Notas · experimentos · procesos
          </span>
          <h1 className="mt-6 font-pixel text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88] tracking-tight">
            <ScrambleText text="Blog" />
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            Lo que aprendo construyendo productos y creando contenido: IA aplicada, motion, código y flujos de trabajo.
          </p>
        </div>
      </header>

      <section className="container py-14 sm:py-20">
        {first && <PostCard post={first} large />}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
        <p className="mt-14 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-dim">
          <span className="h-[6px] w-[6px] animate-pixel-blink bg-blue-bright" /> Más artículos en camino
        </p>
      </section>
    </main>
  );
}
