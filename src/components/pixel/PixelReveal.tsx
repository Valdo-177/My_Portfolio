"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PixelRevealProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  rows?: number;
}

/**
 * Cubre el contenido con una grilla de cuadros negros que se
 * apagan en orden aleatorio cuando el elemento entra en pantalla.
 */
export default function PixelReveal({ children, className, cols = 14, rows = 9 }: PixelRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  const delays = useMemo(
    () => Array.from({ length: cols * rows }, () => Math.random() * 700),
    [cols, rows]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {delays.map((d, i) => (
          <span
            key={i}
            className="bg-ink-50 transition-opacity duration-0"
            style={{ opacity: shown ? 0 : 1, transitionDelay: shown ? `${d}ms` : "0ms" }}
          />
        ))}
      </div>
    </div>
  );
}
