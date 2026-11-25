import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// El video destacado se describe con JSON-LD (VideoObject) en el layout;
// Next 14 no soporta la extensión de video en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
