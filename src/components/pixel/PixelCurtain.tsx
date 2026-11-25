"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Transición entre páginas: una cortina de pixeles pequeños cubre la pantalla
 * en orden aleatorio, se navega y luego se retira de la misma forma.
 * Intercepta los clics en enlaces internos que cambian de ruta.
 */

type Phase = "idle" | "cover" | "hold" | "reveal";

const CELL = 28; // px aprox. por pixel
const COVER_MS = 380;
const REVEAL_MS = 420;

export default function PixelCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const pending = useRef<string | null>(null);
  const reduce = useRef(false);

  useEffect(() => {
    try {
      reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
  }, []);

  const measure = useCallback(() => {
    const cols = Math.ceil(window.innerWidth / CELL);
    const rows = Math.ceil(window.innerHeight / CELL);
    setGrid({ cols, rows });
  }, []);

  // Retardos aleatorios estables por cantidad de celdas
  const delays = useMemo(() => {
    const n = grid.cols * grid.rows;
    return Array.from({ length: n }, () => Math.random());
  }, [grid]);

  // Interceptar clics en enlaces internos
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // mismo documento (anclas)
      if (reduce.current) return; // navegación normal

      e.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      measure();
      setPhase("cover");
      router.prefetch(url.pathname);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [measure, router]);

  // Cuando termina de cubrir, navegar
  useEffect(() => {
    if (phase !== "cover") return;
    const t = setTimeout(() => {
      setPhase("hold");
      if (pending.current) router.push(pending.current);
    }, COVER_MS + 80);
    return () => clearTimeout(t);
  }, [phase, router]);

  // Al cambiar de ruta, retirar la cortina
  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setPhase("reveal"), 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => {
      setPhase("idle");
      pending.current = null;
    }, REVEAL_MS + 80);
    return () => clearTimeout(t);
  }, [phase]);

  // Seguridad: si la navegación no cambia la ruta, no dejar la pantalla tapada
  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setPhase("reveal"), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle" || grid.cols === 0) return null;

  const covering = phase === "cover" || phase === "hold";
  const span = covering ? COVER_MS : REVEAL_MS;

  return (
    <div
      aria-hidden
      className="pointer-events-auto fixed inset-0 z-[90] grid"
      style={{ gridTemplateColumns: `repeat(${grid.cols}, ${CELL}px)`, gridAutoRows: `${CELL}px` }}
    >
      {delays.map((d, i) => (
        <span
          key={i}
          className="bg-ink"
          style={{
            opacity: covering ? 1 : 0,
            transition: `opacity 0ms linear ${Math.round(d * span)}ms`,
            animation: phase === "cover" ? `curtain-in 0ms linear ${Math.round(d * span)}ms both` : undefined,
            boxShadow: d > 0.94 ? "inset 0 0 0 100px rgba(82,168,255,0.85)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
