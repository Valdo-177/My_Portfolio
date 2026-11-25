/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite builds locales de prueba sin pisar el .next del servidor de desarrollo
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  experimental: {
    // El PDF de reglas se lee en el servidor para adjuntarlo por correo
    outputFileTracingIncludes: {
      "/api/reglas": ["./private/**/*"],
    },
  },
};

export default nextConfig;
