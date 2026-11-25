"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

function Logo() {
  return (
    <a href="#inicio" className="group flex items-center gap-3" aria-label="Inicio">
      <span className="grid grid-cols-3 gap-[2px]" aria-hidden>
        {[1, 1, 0, 1, 0, 1, 1, 1, 0].map((on, i) => (
          <span
            key={i}
            className={cn(
              "h-[5px] w-[5px] transition-colors duration-300",
              on ? "bg-white group-hover:bg-blue-bright" : "bg-ink-300"
            )}
          />
        ))}
      </span>
      <span className="font-pixel text-lg tracking-wide">{site.shortName}</span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-line bg-ink/75 backdrop-blur-md" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden md:block" aria-label="Principal">
          <ul className="flex items-center gap-1">
            {LINKS.map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "flex items-center gap-2 rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    active === l.id ? "text-white" : "text-muted hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "h-[5px] w-[5px] transition-colors",
                      active === l.id ? "bg-blue-bright" : "bg-transparent"
                    )}
                  />
                  <span className="text-dim">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {site.available && (
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping bg-blue-bright opacity-60" />
                <span className="relative h-2 w-2 bg-blue-bright" />
              </span>
              Disponible
            </span>
          )}
          <a
            href="#contacto"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-blue-bright hover:text-white"
          >
            Hablemos
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line md:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col border-line bg-ink p-6 sm:max-w-sm">
            <SheetTitle className="font-pixel text-2xl font-normal text-white">Menú</SheetTitle>
            <SheetDescription className="sr-only">Navegación del sitio</SheetDescription>
            <ul className="mt-8 flex flex-col">
              {LINKS.map((l, i) => (
                <li key={l.id} className="border-b border-line">
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-pixel text-3xl uppercase text-white"
                  >
                    <span className="font-mono text-xs text-blue-bright">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
