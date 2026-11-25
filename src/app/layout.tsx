import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle } from "geist/font/pixel";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import BootScreen from "@/components/pixel/BootScreen";

const PREVIEW =
  "https://firebasestorage.googleapis.com/v0/b/unidotaciones-f49fc.appspot.com/o/Preview_keyner.png?alt=media&token=7bfa5e45-3a44-40ab-b328-812b5a5d08af";

export const metadata: Metadata = {
  title: "Keyner De la Hoz | Web & Mobile Developer",
  description:
    "Portafolio de Keyner De la Hoz, desarrollador web y móvil. Productos con Next.js, React Native, Flutter y más.",
  openGraph: {
    title: "Keyner De la Hoz | Web & Mobile Developer",
    description:
      "Proyectos destacados en desarrollo web y móvil: landings, plataformas médicas, apps con IA on-device y más.",
    type: "website",
    images: { url: PREVIEW, width: 1200, height: 630, alt: "Portafolio de Keyner De la Hoz" },
    siteName: "Keyner De la Hoz",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyner De la Hoz | Web & Mobile Developer",
    description: "Desarrollador web y móvil. Mira los proyectos.",
    images: [PREVIEW],
  },
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
    <html lang="es" className={fonts}>
      <body>
        <BootScreen />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
