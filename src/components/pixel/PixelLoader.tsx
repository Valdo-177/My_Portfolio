import { cn } from "@/lib/utils";

// Orden en espiral para la grilla 3x3 (índices de celda)
const SPIRAL_3 = [0, 1, 2, 5, 8, 7, 6, 3, 4];

interface PixelLoaderProps {
  /** tamaño de cada celda en px */
  cell?: number;
  gap?: number;
  /** grilla NxN (3 o 4) */
  grid?: 3 | 4;
  className?: string;
  /** duración del ciclo completo en segundos */
  speed?: number;
  label?: string;
}

/** Square loader estilo dot-matrix: celdas que parpadean en espiral. */
export default function PixelLoader({
  cell = 6,
  gap = 2,
  grid = 3,
  className,
  speed = 1.2,
  label = "Cargando",
}: PixelLoaderProps) {
  const total = grid * grid;
  const order =
    grid === 3
      ? SPIRAL_3
      : [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 5, 6, 10, 9];

  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-grid shrink-0", className)}
      style={{
        gridTemplateColumns: `repeat(${grid}, ${cell}px)`,
        gap,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const step = order.indexOf(i);
        return (
          <span
            key={i}
            className="block bg-blue-bright animate-pixel-blink"
            style={{
              width: cell,
              height: cell,
              animationDuration: `${speed}s`,
              animationDelay: `${(step / total) * speed}s`,
            }}
          />
        );
      })}
    </span>
  );
}
