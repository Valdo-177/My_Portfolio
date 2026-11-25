import PixelLoader from "@/components/pixel/PixelLoader";

export default function Loading() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center gap-4">
      <PixelLoader cell={8} gap={3} grid={4} />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Cargando</span>
    </div>
  );
}
