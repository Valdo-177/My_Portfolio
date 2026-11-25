// Capturas de cada proyecto (tomadas de los sitios en vivo y de los diseños de las apps).

export interface Shot {
  src: string;
  kind: "desktop" | "mobile";
  alt: string;
}

const web = (slug: string, title: string, desktop: number, mobile: number): Shot[] => [
  ...Array.from({ length: desktop }, (_, i) => ({
    src: `/projects/${slug}/desktop-${i + 1}.jpg`,
    kind: "desktop" as const,
    alt: `${title}: vista de escritorio ${i + 1}`,
  })),
  ...Array.from({ length: mobile }, (_, i) => ({
    src: `/projects/${slug}/mobile-${i + 1}.jpg`,
    kind: "mobile" as const,
    alt: `${title}: vista móvil ${i + 1}`,
  })),
];

export const gallery: Record<string, Shot[]> = {
  galenna: web("galenna", "Instituto Galenna", 3, 2),
  oraldentalplus: web("oraldentalplus", "Oral Dental Plus", 3, 2),
  "luxurious-flooring": web("luxurious-flooring", "Luxurious Flooring", 3, 2),
  ecofusion: web("ecofusion", "Ecofusion", 3, 2),
  stylesyncs: web("stylesyncs", "StyleSync", 2, 2),
  brote: web("brote", "Brote", 0, 6),
  // TODO: agrega capturas de Subline y Rhema Notes en /public/projects/<slug>/mobile-N.jpg
  subline: [],
  "rhema-notes": [],
};
