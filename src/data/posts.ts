export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  updated?: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  readingMinutes: number;
}

export const posts: PostMeta[] = [
  {
    slug: "alight-motion-inteligencia-artificial-xml",
    title: "Alight Motion con inteligencia artificial: animaciones escritas en XML",
    description:
      "Cómo hago que un agente de IA escriba proyectos completos de Alight Motion en XML. Resultado, paso a paso, XML descargables y las reglas que uso.",
    date: "2026-11-24",
    tags: ["Alight Motion", "Inteligencia artificial", "Motion graphics", "XML"],
    cover: "/blog/alight-motion-ia/muestrario-poster.jpg",
    coverAlt: "Fotograma de Muestrario Geist: la palabra CARGA en tipografía pixel animada",
    readingMinutes: 7,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
