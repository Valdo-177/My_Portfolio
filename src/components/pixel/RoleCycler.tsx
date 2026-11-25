"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "▓▒░█▚▞▖▗▘▝#%&*+=<>/\\";

interface RoleCyclerProps {
  roles: string[];
  className?: string;
  /** ms que cada rol permanece visible */
  hold?: number;
}

/** Rota entre roles con el efecto de descifrado pixel. */
export default function RoleCycler({ roles, className, hold = 2400 }: RoleCyclerProps) {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(roles[0]);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}

    const target = roles[index];
    if (reduce) {
      setOut(target);
    } else {
      let frame = 0;
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        setOut(
          target
            .split("")
            .map((ch, i) =>
              ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join("")
        );
        if (revealed >= target.length) clearInterval(timer.current);
      }, 30);
    }

    const next = setTimeout(() => setIndex((i) => (i + 1) % roles.length), hold);
    return () => {
      clearTimeout(next);
      clearInterval(timer.current);
    };
  }, [index, roles, hold]);

  return (
    <span className={className}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}
