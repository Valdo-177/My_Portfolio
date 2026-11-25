/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite builds locales de prueba sin pisar el .next del servidor de desarrollo
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
