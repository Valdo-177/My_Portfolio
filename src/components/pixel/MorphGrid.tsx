"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Composición geométrica que se transforma entre escenas:
 * grilla de puntos → mezcla de círculos y pixeles → anillo → "K" pixelada.
 * Inspirada en heros editoriales "clean", hecha con pixeles.
 */

const N = 5; // campo de 5x5 unidades
const COUNT = 25;

type Cell = {
  x: number; // centro, en unidades (0..N)
  y: number;
  s: number; // tamaño, en unidades
  r: string; // border-radius
  c: string; // color
  o: number; // opacidad
};

const WHITE = "#ededed";
const DIM = "#262626";
const BLUE = "#52a8ff";
const DEEP = "#141414";

const circle = "50%";
const pixel = "18%";

function gridPos(i: number) {
  return { x: (i % N) + 0.5, y: Math.floor(i / N) + 0.5 };
}

// Escena 1: grilla de círculos con uno azul
const sceneGrid: Cell[] = Array.from({ length: COUNT }, (_, i) => ({
  ...gridPos(i),
  s: 0.66,
  r: circle,
  c: i === 12 ? BLUE : WHITE,
  o: 1,
}));

// Escena 2: mezcla, un círculo grande en 2x2 y algunos pixeles cuadrados
const BIG = [6, 7, 11, 12];
const SQUARES = new Set([1, 2, 8, 23]);
const sceneMix: Cell[] = Array.from({ length: COUNT }, (_, i) => {
  const p = gridPos(i);
  if (BIG.includes(i)) {
    return i === 6
      ? { x: 2, y: 2, s: 1.6, r: circle, c: WHITE, o: 1 }
      : { x: 2, y: 2, s: 0.2, r: circle, c: WHITE, o: 0 };
  }
  if (i === 0) return { x: 0.5, y: 2, s: 0.18, r: circle, c: BLUE, o: 1 };
  if (i === 20) return { ...p, s: 0.66, r: circle, c: WHITE, o: 1 };
  if (i === 24) return { x: 4.7, y: 0.2, s: 0.2, r: circle, c: WHITE, o: 1 };
  return {
    ...p,
    s: SQUARES.has(i) ? 0.82 : 0.78,
    r: SQUARES.has(i) ? pixel : circle,
    c: i === 18 ? BLUE : WHITE,
    o: 1,
  };
});

// Escena 3: anillo de puntos alrededor de un círculo grande
const RING = 16;
const sceneRing: Cell[] = Array.from({ length: COUNT }, (_, i) => {
  if (i === 12) return { x: 2.5, y: 2.5, s: 2.7, r: circle, c: DEEP, o: 1 };
  const ringIdx = i < 12 ? i : i - 1;
  if (ringIdx < RING) {
    const a = (ringIdx / RING) * Math.PI * 2 - Math.PI / 2;
    const rad = 1.85 + (ringIdx % 3 === 0 ? 0.25 : 0);
    return {
      x: 2.5 + Math.cos(a) * rad,
      y: 2.5 + Math.sin(a) * rad,
      s: ringIdx % 4 === 0 ? 0.36 : 0.54,
      r: circle,
      c: ringIdx === 5 ? BLUE : WHITE,
      o: 1,
    };
  }
  return { x: 2.5, y: 2.5, s: 0.1, r: circle, c: WHITE, o: 0 };
});

// Escena 4: "K" pixelada
const K = ["10001", "10010", "11100", "10010", "10001"].join("");
const sceneK: Cell[] = Array.from({ length: COUNT }, (_, i) => {
  const on = K[i] === "1";
  return {
    ...gridPos(i),
    s: on ? 0.8 : 0.2,
    r: on ? pixel : circle,
    c: on ? (i === 12 ? BLUE : WHITE) : DIM,
    o: 1,
  };
});

const SCENES = [sceneGrid, sceneMix, sceneRing, sceneK];
const HOLD = 2600;

const pct = (u: number) => `${(u / N) * 100}%`;

export default function MorphGrid({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), HOLD);
    return () => clearInterval(id);
  }, [reduce]);

  const cells = SCENES[scene];
  const order = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);

  return (
    <div className={cn("relative aspect-square w-full", className)} aria-hidden>
      {order.map((i) => {
        const c = cells[i];
        return (
          <motion.span
            key={i}
            className="absolute block"
            initial={false}
            animate={{
              left: pct(c.x - c.s / 2),
              top: pct(c.y - c.s / 2),
              width: pct(c.s),
              height: pct(c.s),
              borderRadius: c.r,
              backgroundColor: c.c,
              opacity: c.o,
            }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 17,
              mass: 0.9,
              delay: ((i % N) + Math.floor(i / N)) * 0.025,
            }}
            style={{
              boxShadow: c.c === BLUE ? "0 0 24px rgba(82,168,255,0.55)" : undefined,
              zIndex: c.s > 1.5 ? 0 : 1,
            }}
          />
        );
      })}
    </div>
  );
}
