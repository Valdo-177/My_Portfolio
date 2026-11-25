import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/data/posts";
import { content } from "@/content/blog";
import { site } from "@/data/site";
import PostCard from "@/components/blog/PostCard";

type Params = { params: { slug: string } };

const fmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    keywords: p.tags,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      url: `/blog/${p.slug}`,
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [site.name],
      tags: p.tags,
      images: [{ url: p.cover, alt: p.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [p.cover] },
  };
}

export default function PostPage({ params }: Params) {
  const p = getPost(params.slug);
  const c = content[params.slug];
  if (!p || !c) notFound();
  const { Component, toc, faq } = c;
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 2);
  const url = `${site.url}/blog/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: p.title,
        description: p.description,
        image: `${site.url}${p.cover}`,
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        inLanguage: "es-CO",
        keywords: p.tags.join(", "),
        mainEntityOfPage: url,
        author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
      ...(faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div className="absolute inset-0 bg-dots opacity-40 mask-radial" aria-hidden />
          <div className="container relative grid max-w-6xl py-14 sm:py-20 lg:grid-cols-[1fr_220px] lg:gap-16">
            <div className="w-full max-w-[720px] lg:mx-auto">
            <a href="/blog" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-white">
              <ArrowLeft size={14} /> Blog
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
              <span className="text-dim">·</span>
              <span>{p.readingMinutes} min de lectura</span>
              <span className="text-dim">·</span>
              <span className="text-blue-bright">{p.tags[0]}</span>
            </div>
            <h1 className="mt-5 text-balance text-[clamp(2.1rem,5vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em]">
              {p.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-muted">{p.description}</p>
            <div className="mt-8 flex items-center gap-3 text-sm">
              <span className="grid grid-cols-3 gap-[2px]" aria-hidden>
                {[1, 1, 0, 1, 0, 1, 1, 1, 0].map((on, i) => (
                  <span key={i} className={on ? "h-[5px] w-[5px] bg-blue-bright" : "h-[5px] w-[5px] bg-ink-300"} />
                ))}
              </span>
              <span className="text-white">{site.name}</span>
              <span className="text-dim">·</span>
              <span className="text-muted">Desarrollador y creador de contenido</span>
            </div>
            </div>
          </div>
        </header>

        <div className="container grid max-w-6xl gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="min-w-0 max-w-[720px] lg:mx-auto">
            <Component />
          </div>

          <aside className="hidden lg:block">
            <nav className="sticky top-24" aria-label="En este artículo">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">En este artículo</p>
              <ul className="mt-4 flex flex-col gap-2.5 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-blue-bright hover:text-white">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#reglas" className="mt-8 block rounded-md border border-blue/40 bg-blue-ink p-4 text-sm text-white transition-colors hover:border-blue-bright">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-bright">PDF gratis</span>
                <span className="mt-1 block">Recibe las reglas completas →</span>
              </a>
            </nav>
          </aside>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-line">
          <div className="container py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Sigue leyendo</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <PostCard key={o.slug} post={o} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
