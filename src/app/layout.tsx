import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle } from "geist/font/pixel";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BootScreen from "@/components/pixel/BootScreen";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";

const TITLE = "Keyner De la Hoz | Desarrollador Web, Móvil y Filmmaker";
const DESCRIPTION =
  "Desarrollador web y móvil, filmmaker y creador de contenido en Barranquilla, Colombia. Productos con Next.js, React Native y Flutter, y video con ritmo y motion.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: "%s | Keyner De la Hoz" },
  description: DESCRIPTION,
  applicationName: "Keyner De la Hoz",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Keyner De la Hoz",
    "desarrollador web Barranquilla",
    "desarrollador móvil Colombia",
    "desarrollador Next.js Colombia",
    "desarrollador React Native",
    "desarrollador Flutter Colombia",
    "filmmaker Barranquilla",
    "editor de video Colombia",
    "creador de contenido Barranquilla",
    "producción audiovisual Barranquilla",
    "motion graphics",
    "web developer Colombia",
    "mobile app developer Colombia",
    "full-stack TypeScript",
    "landing pages Colombia",
    "portafolio desarrollador",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Keyner De la Hoz",
    title: "Keyner De la Hoz — Desarrollador Web, Móvil y Filmmaker en Colombia",
    description:
      "Desarrollo web full-stack, apps móviles con IA, filmmaking, edición de video y creación de contenido desde Barranquilla, Colombia.",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Código y contenido: desarrollo web y móvil, filmmaking y edición de video.",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = [
    GeistSans.variable,
    GeistMono.variable,
    GeistPixelSquare.variable,
    GeistPixelGrid.variable,
    GeistPixelCircle.variable,
  ].join(" ");

  return (
    <html lang="es-CO" className={fonts}>
      <body>
        <JsonLd />
        <BootScreen />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
