import { Code2, Smartphone, LayoutTemplate, Clapperboard } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import PixelLoader from "@/components/pixel/PixelLoader";

// "K" en matriz de 7x9 para el avatar pixel
const K_MATRIX = [
  "1000011",
  "1000110",
  "1001100",
  "1011000",
  "1110000",
  "1011000",
  "1001100",
  "1000110",
  "1000011",
];

const SERVICES = [
  {
    icon: Code2,
    title: "Web apps",
    text: "Plataformas full-stack con Next.js: portales de pacientes, reservas, paneles y APIs.",
  },
  {
    icon: Smartphone,
    title: "Apps móviles",
    text: "React Native, Expo y Flutter. Offline-first, SQLite local e IA on-device.",
  },
  {
    icon: LayoutTemplate,
    title: "Landings & sitios",
    text: "Sitios corporativos rápidos, con SEO, animación y foco en conversión.",
  },
  {
    icon: Clapperboard,
    title: "Contenido & video",
    text: "Guion, rodaje, edición y motion graphics para reels y piezas de marca.",
  },
];

function PixelAvatar() {
  return (
    <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-50 bg-dots">
      <div className="absolute inset-0 bg-gradient-to-br from-blue/15 via-transparent to-transparent" />
      <div className="relative grid gap-[6px]" style={{ gridTemplateColumns: "repeat(7, 1fr)" }} aria-hidden>
        {K_MATRIX.join("")
          .split("")
          .map((on, i) => (
            <span
              key={i}
              className={
                on === "1"
                  ? "h-6 w-6 bg-blue-bright shadow-[0_0_14px_rgba(82,168,255,0.6)] sm:h-8 sm:w-8"
                  : "h-6 w-6 bg-white/[0.04] sm:h-8 sm:w-8"
              }
            />
          ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span className="flex items-center gap-2">
          <PixelLoader cell={3} gap={1} /> Compilando ideas
        </span>
        <span>v.2026</span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre-mi" className="container scroll-mt-16 py-24 sm:py-32">
      <SectionHeader index="04" label="Quién soy" title="Sobre mí" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <Reveal>
          <PixelAvatar />
        </Reveal>

        <div className="flex flex-col gap-10">
          <Reveal delay={0.1}>
            <p className="text-pretty text-2xl leading-[1.2] text-white sm:text-3xl">
              Soy desarrollador web y móvil, y creador de contenido. Me gusta llevar una idea hasta producción,
              <span className="text-muted"> ya sea un producto digital o una pieza en video, cuidando cada detalle.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-2xl text-pretty text-muted">
              He construido plataformas para clínicas y centros médicos, sitios para constructoras y
              contratistas, y apps móviles que corren IA directamente en el dispositivo. Trabajo con
              TypeScript de punta a punta, y elijo la herramienta según el problema: Next.js en la web,
              React Native o Flutter en el móvil. Y cuando la idea se cuenta mejor en video, la grabo, la edito y la animo.
            </p>
          </Reveal>

          <ul className="grid border-l border-t border-line sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="group border-b border-r border-line p-6 transition-colors hover:bg-ink-50">
                <Reveal delay={0.05 * i}>
                  <div className="flex items-center justify-between">
                    <s.icon size={20} strokeWidth={1.5} className="text-blue-bright" />
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-pixel text-xl uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
