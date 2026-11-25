// Creación de contenido / piezas audiovisuales.
// Copy redactado por un agente de Antigravity y ajustado a mano.

export interface ContentPiece {
  slug: string;
  title: string;
  client: string;
  format: string;
  year: string;
  duration: string; // ISO 8601 para schema.org
  durationLabel: string;
  description: string;
  roles: string[];
  tools: string[];
  src: string;
  poster: string;
}

export const contentIntro =
  "Además de código, hago contenido: guion, rodaje, edición y motion. Reels, podcasts y piezas de marca con ritmo y claridad.";

export const reels: ContentPiece[] = [
  {
    slug: "ikoodi-software-a-la-medida",
    title: "Software a la medida: señales de que lo necesitas",
    client: "Ikoodi",
    format: "Reel 9:16",
    year: "2026",
    duration: "PT48S",
    durationLabel: "0:48",
    description:
      "Talking-head de 48 segundos sobre cuándo una empresa necesita software propio en vez de soluciones genéricas. Subtítulos cinéticos palabra por palabra, íconos pixel-art y motion graphics pensados para retener.",
    roles: ["Guion y concepto", "Rodaje", "Edición", "Motion graphics"],
    tools: ["Premiere Pro", "After Effects"],
    src: "/media/ikoodi.mp4",
    poster: "/media/ikoodi-poster.jpg",
  },
];

export const capabilities = [
  {
    title: "Storytelling y guion",
    text: "Convierto conceptos técnicos en mensajes claros sin perder rigor.",
  },
  {
    title: "Edición y ritmo",
    text: "Cortes precisos, sound design y subtítulos cinéticos que sostienen la atención.",
  },
  {
    title: "Motion & pixel art",
    text: "Animaciones e íconos a medida que refuerzan cada idea en pantalla.",
  },
];
