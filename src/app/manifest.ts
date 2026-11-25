import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Keyner De la Hoz — Portafolio",
    short_name: "KDLH",
    description: "Desarrollador web y móvil, filmmaker y creador de contenido.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/icon.png", sizes: "64x64", type: "image/png" }],
  };
}
