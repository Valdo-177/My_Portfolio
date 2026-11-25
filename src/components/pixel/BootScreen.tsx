"use client";

import { useEffect, useMemo, useState } from "react";

const KEY = "kdlh-booted";
const GRID = 8; // grilla de progreso 8x8
const DURATION = 1500; // ms de carga

type Phase = "loading" | "exit" | "done";

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Pantalla de carga inicial estilo pixel: contador en Geist Pixel,
 * grilla 8x8 que se llena y salida con disolución por cuadros.
 * Se muestra una vez por sesión.
 */
export default function BootScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [dims, setDims] = useState({ cols: 20, rows: 12 });

  // Orden aleatorio estable para llenar la grilla
  const fillOrder = useMemo(() => {
    const idx = Array.from({ length: GRID * GRID }, (_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    const rank = new Array(idx.length);
    idx.forEach((cell, r) => (rank[cell] = r));
    return rank as number[];
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || prefersReducedMotion()) {
      setPhase("done");
      return;
    }

    const cols = window.innerWidth < 640 ? 10 : 20;
    const size = window.innerWidth / cols;
    setDims({ cols, rows: Math.ceil(window.innerHeight / size) + 1 });

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // easing por pasos para sensación "digital"
      setProgress(Math.floor((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setPhase("exit"), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  const filled = Math.round((progress / 100) * GRID * GRID);
  const cells = dims.cols * dims.rows;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden={phase === "exit"}>
      {/* Capa de disolución pixel */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${dims.cols}, 1fr)` }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <span
            key={i}
            className="aspect-square bg-ink transition-opacity duration-0"
            style={{
              opacity: phase === "exit" ? 0 : 1,
              transitionDelay: phase === "exit" ? `${Math.random() * 650}ms` : "0ms",
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-200"
        style={{ opacity: phase === "exit" ? 0 : 1 }}
      >
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${GRID}, 10px)` }}
        >
          {fillOrder.map((rank, i) => (
            <span
              key={i}
              className={
                rank < filled
                  ? "h-[10px] w-[10px] bg-blue-bright shadow-[0_0_8px_rgba(82,168,255,0.7)]"
                  : "h-[10px] w-[10px] bg-ink-300"
              }
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-5xl tabular-nums text-white sm:text-6xl">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Inicializando portafolio<span className="animate-caret">_</span>
          </span>
        </div>
      </div>
    </div>
  );
}
