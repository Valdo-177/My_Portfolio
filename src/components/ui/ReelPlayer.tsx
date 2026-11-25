"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReelPlayerProps {
  src: string;
  poster: string;
  title: string;
  className?: string;
}

/** Reproductor vertical 9:16: autoplay silenciado al entrar en pantalla, controles mínimos. */
export default function ReelPlayer({ src, poster, title, className }: ReelPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.45 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  const SEGMENTS = 24;
  const filled = Math.round(progress * SEGMENTS);

  return (
    <div className={cn("group relative overflow-hidden rounded-2xl border border-line bg-ink-100", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
        }}
        onClick={toggle}
        className="aspect-[9/16] h-full w-full cursor-pointer object-cover"
      />

      {/* Barra de progreso pixel */}
      <div className="pointer-events-none absolute inset-x-4 top-4 flex gap-[3px]" aria-hidden>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <span key={i} className={cn("h-[3px] flex-1 transition-colors", i < filled ? "bg-white" : "bg-white/25")} />
        ))}
      </div>

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-16">
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur transition-colors hover:border-blue-bright"
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-px" />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur transition-colors hover:border-blue-bright"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {muted ? "Sonido" : "Silenciar"}
        </button>
      </div>
    </div>
  );
}
