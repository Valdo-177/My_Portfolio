import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { reels } from "@/data/content";

/** Datos estructurados schema.org: Person, WebSite, proyectos y videos. */
export default function JsonLd() {
  const url = site.url;
  const sameAs = [site.links.github, site.links.linkedin].filter(Boolean);

  const graph = [
    {
      "@type": "Person",
      "@id": `${url}/#person`,
      name: site.name,
      alternateName: site.shortName,
      url,
      image: `${url}/opengraph-image`,
      jobTitle: ["Desarrollador Web y Móvil", "Filmmaker", "Editor de Video", "Creador de Contenido"],
      description:
        "Desarrollador web y móvil (Next.js, React Native, Flutter), filmmaker y creador de contenido en Barranquilla, Colombia.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barranquilla",
        addressRegion: "Atlántico",
        addressCountry: "CO",
      },
      knowsAbout: [
        "Desarrollo web",
        "Desarrollo de aplicaciones móviles",
        "Next.js",
        "React",
        "React Native",
        "Flutter",
        "TypeScript",
        "Three.js",
        "Edición de video",
        "Filmmaking",
        "Motion graphics",
        "Creación de contenido",
      ],
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: "Keyner De la Hoz",
      inLanguage: "es-CO",
      publisher: { "@id": `${url}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${url}/#proyectos`,
      name: "Proyectos de Keyner De la Hoz",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          description: p.description,
          dateCreated: p.year,
          keywords: p.stack.join(", "),
          creator: { "@id": `${url}/#person` },
          ...(p.liveUrl ? { url: p.liveUrl } : {}),
          ...(p.image ? { image: `${url}${p.image}` } : {}),
        },
      })),
    },
    ...reels.map((r) => ({
      "@type": "VideoObject",
      "@id": `${url}/#${r.slug}`,
      name: r.title,
      description: r.description,
      thumbnailUrl: `${url}${r.poster}`,
      contentUrl: `${url}${r.src}`,
      uploadDate: `${r.year}-01-01`,
      duration: r.duration,
      inLanguage: "es",
      creator: { "@id": `${url}/#person` },
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
