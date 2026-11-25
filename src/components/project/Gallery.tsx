import Image from "next/image";
import type { Shot } from "@/data/gallery";
import PixelReveal from "@/components/pixel/PixelReveal";

function BrowserFrame({ shot }: { shot: Shot }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-ink-50">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5" aria-hidden>
        <span className="h-2 w-2 bg-ink-300" />
        <span className="h-2 w-2 bg-ink-300" />
        <span className="h-2 w-2 bg-ink-300" />
      </div>
      <PixelReveal className="relative aspect-[16/10] bg-ink-100" cols={16} rows={10}>
        <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover object-top" />
      </PixelReveal>
    </figure>
  );
}

function PhoneFrame({ shot }: { shot: Shot }) {
  return (
    <figure className="w-[200px] shrink-0 snap-center sm:w-[220px]">
      <div className="relative overflow-hidden rounded-[1.75rem] border-[5px] border-ink-300 bg-ink shadow-[0_0_50px_-15px_rgba(0,112,243,0.5)]" style={{ aspectRatio: "390 / 844" }}>
        <Image src={shot.src} alt={shot.alt} fill sizes="220px" className="object-cover object-top" />
      </div>
    </figure>
  );
}

export default function Gallery({ shots }: { shots: Shot[] }) {
  const desktop = shots.filter((s) => s.kind === "desktop");
  const mobile = shots.filter((s) => s.kind === "mobile");

  return (
    <div className="flex flex-col gap-10">
      {desktop.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          {desktop.map((s, i) => (
            <div key={s.src} className={i === 0 ? "lg:col-span-2" : undefined}>
              <BrowserFrame shot={s} />
            </div>
          ))}
        </div>
      )}
      {mobile.length > 0 && (
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {mobile.map((s) => (
            <PhoneFrame key={s.src} shot={s} />
          ))}
        </div>
      )}
    </div>
  );
}
