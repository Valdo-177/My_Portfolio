"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type NavLink = { id: string; label: string; href: string; route?: string };

const LINKS: NavLink[] = [
  { id: "proyectos", label: "Proyectos", href: "/#proyectos", route: "/proyectos" },
  { id: "contenido", label: "Contenido", href: "/#contenido" },
  { id: "blog", label: "Blog", href: "/blog", route: "/blog" },
  { id: "sobre-mi", label: "Sobre mí", href: "/#sobre-mi" },
  { id: "contacto", label: "Contacto", href: "/#contacto" },
];

function Logo() {
  return (
    <a href="/" className="group flex items-center gap-3" aria-label="Inicio">
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSection("");
    if (pathname !== "/") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const isActive = (l: NavLink) =>
    pathname === "/" ? section === l.id : !!l.route && pathname.startsWith(l.route);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || pathname !== "/" ? "border-line bg-ink/75 backdrop-blur-md" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden md:block" aria-label="Principal">
          <ul className="flex items-center gap-1">
            {LINKS.map((l, i) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  className={cn(
                    "flex items-center gap-2 rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    isActive(l) ? "text-white" : "text-muted hover:text-white"
                  )}
                >
                  <span className={cn("h-[5px] w-[5px] transition-colors", isActive(l) ? "bg-blue-bright" : "bg-transparent")} />
                  <span className="text-dim">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
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
            href="/#contacto"
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
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-pixel text-3xl uppercase text-white"
                  >
                    <span className="font-mono text-xs text-blue-bright">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              <a href={site.links.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={site.links.youtube} target="_blank" rel="noreferrer">YouTube</a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
