import { stack } from "@/data/site";

export default function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <section id="stack" aria-label="Tecnologías" className="border-y border-line bg-ink-50">
      <div className="mask-fade-x flex overflow-hidden py-6">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap" aria-hidden={i >= stack.length}>
              <span className="font-pixel-grid text-2xl uppercase text-white/85 sm:text-3xl">{t}</span>
              <span className="h-2 w-2 bg-blue" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
