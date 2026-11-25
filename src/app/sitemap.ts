import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/proyectos/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
