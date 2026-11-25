// Contenido generado a partir del análisis de cada repositorio (agentes de Antigravity)
// y revisado a mano. Edita libremente.

export type ProjectKind = "web" | "mobile" | "landing";

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  type: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repo: string;
  image?: string;
  /** "cover" para capturas, "icon" para íconos centrados, "phone" para capturas móviles en marco */
  imageFit: "cover" | "icon" | "phone";
  /** posición CSS del recorte (object-position) */
  imagePosition?: string;
  featured?: boolean;
}

const gh = (name: string) => `https://github.com/Valdo-177/${name}`;

export const projects: Project[] = [
  {
    slug: "galenna",
    title: "Instituto Galenna",
    kind: "web",
    type: "Plataforma médica",
    year: "2026",
    tagline: "Especialistas en endometriosis y ginecología robótica",
    description:
      "Plataforma web y portal de pacientes para un centro de alta especialidad en salud femenina. Agendamiento en línea, tests diagnósticos y un portal privado para consultar reportes clínicos.",
    highlights: [
      "Portal privado de pacientes con autenticación JWT",
      "Agendamiento de citas y tests de captación diagnóstica",
      "Full-stack en Next.js con API routes y MySQL",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MySQL", "Zustand"],
    liveUrl: "https://galenna.vercel.app",
    repo: gh("galenna"),
    image: "/projects/galenna.png",
    imageFit: "cover",
    featured: true,
  },
  {
    slug: "oraldentalplus",
    title: "Oral Dental Plus",
    kind: "landing",
    type: "Landing page",
    year: "2025",
    tagline: "Odontología integral y estética dental en Barranquilla",
    description:
      "Landing para una clínica dental con visualización 3D interactiva de implantes, tratamientos especializados y agendamiento directo por WhatsApp.",
    highlights: [
      "Modelos dentales 3D con Three.js y React Three Fiber",
      "Animaciones guiadas por scroll con Motion",
      "Agendamiento directo por WhatsApp",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "R3F", "Motion"],
    liveUrl: "https://www.oraldentalplus.com",
    repo: gh("OralDentalPlus_landing"),
    image: "/projects/oraldental.png",
    imageFit: "cover",
    imagePosition: "left center",
    featured: true,
  },
  {
    slug: "subline",
    title: "Subline",
    kind: "mobile",
    type: "App móvil · IA",
    year: "2026",
    tagline: "Subtítulos automáticos con IA, directo en el móvil",
    description:
      "App para creadores de contenido que genera subtítulos con transcripción on-device. Editor con línea de tiempo y regla para sincronizar texto y audio, sin enviar nada a servidores.",
    highlights: [
      "Transcripción local y privada con Whisper.rn",
      "Editor con timeline interactivo y RulerSlider",
      "Extracción de audio desde video",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Whisper.rn", "Jotai", "SQLite"],
    repo: gh("subline_app"),
    imageFit: "icon",
  },
  {
    slug: "rhema-notes",
    title: "Rhema Notes",
    kind: "mobile",
    type: "App móvil",
    year: "2026",
    tagline: "Notas y estudio bíblico con lectura offline",
    description:
      "App de notas y estudio devocional con la Biblia RVR1960 completa embebida en SQLite y un editor enriquecido con menciones de versículos.",
    highlights: [
      "Biblia completa en SQLite local para uso offline",
      "Editor enriquecido con inserción de versículos",
      "Cuadernos temáticos, notas fijadas y vista semanal",
    ],
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Zustand", "NativeWind"],
    repo: gh("Rhema-Notes"),
    imageFit: "icon",
  },
  {
    slug: "brote",
    title: "Brote",
    kind: "mobile",
    type: "App móvil",
    year: "2026",
    tagline: "Hábitos, alarmas y progreso diario para tu bienestar",
    description:
      "App para construir hábitos saludables con ludificación: una planta virtual que crece con tu constancia, registro de hidratación, alarmas y estadísticas de progreso.",
    highlights: [
      "Planta virtual que evoluciona con tus hábitos",
      "Alarmas y recordatorios con pantallas dedicadas",
      "Arquitectura modular en Flutter con persistencia local",
    ],
    stack: ["Flutter", "Dart", "SQLite", "Riverpod"],
    repo: gh("brote"),
    image: "/projects/brote.png",
    imageFit: "phone",
  },
  {
    slug: "stylesyncs",
    title: "StyleSync",
    kind: "web",
    type: "Web app",
    year: "2026",
    tagline: "Reservas y gestión de citas para barberías y salones",
    description:
      "Plataforma que conecta estilistas y barberos con sus clientes: reservas 24/7, panel por roles y check-in de citas con códigos QR.",
    highlights: [
      "Reservas en línea 24/7 con selección de turnos",
      "Check-in con generación y escaneo de QR",
      "Auth y estado en tiempo real con Firebase",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Zustand"],
    liveUrl: "https://stylesyncs-two.vercel.app",
    repo: gh("Stylesyncs"),
    imageFit: "icon",
  },
  {
    slug: "luxurious-flooring",
    title: "Luxurious Flooring",
    kind: "landing",
    type: "Sitio corporativo",
    year: "2026",
    tagline: "Pisos y acabados de lujo en Tulsa, Oklahoma",
    description:
      "Sitio para un contratista de remodelación y pisos de lujo en EE. UU. Servicios residenciales y comerciales con cotización directa por WhatsApp y correo.",
    highlights: [
      "Animaciones de entrada con Framer Motion",
      "Flujo de cotización a WhatsApp y email",
      "SEO completo con OpenGraph",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://luxuriousflooringllc.vercel.app",
    repo: gh("luxuriousflooringllc"),
    image: "/projects/luxurious.png",
    imageFit: "cover",
  },
  {
    slug: "ecofusion",
    title: "Ecofusion",
    kind: "landing",
    type: "Sitio corporativo",
    year: "2025",
    tagline: "Diseño y construcción sostenible con tecnología BIM",
    description:
      "Sitio corporativo para una firma de consultoría, interventoría y construcción sostenible: catálogo de obras con páginas de detalle, equipo y servicios BIM.",
    highlights: [
      "Catálogo de proyectos con rutas dinámicas y galerías",
      "Next.js App Router, React 19 y Tailwind v4",
      "Carruseles y transiciones con Framer Motion",
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ecofusion-landing.vercel.app",
    repo: gh("Ecofusion-landing"),
    image: "/projects/ecofusion.jpg",
    imageFit: "cover",
  },
];
