"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "▓▒░█▚▞▖▗▘▝#%&*+=<>/\\";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms por carácter revelado */
  speed?: number;
  delay?: number;
  /** re-animar al pasar el mouse */
  hover?: boolean;
}

/** Texto que se "descifra" desde glifos pixel al entrar en pantalla. */
export default function ScrambleText({
  text,
  className,
  speed = 28,
  delay = 0,
  hover = false,
}: ScrambleTextProps) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const run = () => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (reduce) return setOut(text);

    clearInterval(timer.current);
    let frame = 0;
    const total = text.length;
    timer.current = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || i < revealed) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (revealed >= total) {
        clearInterval(timer.current);
        setOut(text);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setTimeout(run, delay);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={hover ? run : undefined}
    >
      <span aria-hidden>{out}</span>
    </span>
  );
}
