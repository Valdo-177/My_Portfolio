import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import PostCard from "@/components/blog/PostCard";
import { posts } from "@/data/posts";

export default function BlogTeaser() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);
  if (!latest.length) return null;

  return (
    <section id="blog" className="container scroll-mt-16 py-24 sm:py-32">
      <SectionHeader index="05" label="Notas y procesos" title="Blog">
        <a href="/blog" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-white">
          Ver todos <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </SectionHeader>
      <div className="mt-10">
        {latest.length === 1 ? (
          <PostCard post={latest[0]} large />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
