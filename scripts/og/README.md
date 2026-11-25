# Imágenes OG / icono

`opengraph-image.tsx` e `icon.tsx` son la fuente de `src/app/opengraph-image.png` y `src/app/icon.png`.
Se pre-renderizan a PNG porque `next/og` falla al prerenderizar en Windows con Next 14
(bug de rutas de fuentes en `@vercel/og`). En Vercel/Linux podrías moverlos de vuelta a `src/app/`.
