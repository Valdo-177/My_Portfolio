import type { Metadata } from "next";
import {Manrope} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Layout/Nav";
import Footer from "@/components/Layout/Footer";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keyner De la Hoz | Web & Mobile Developer",
  description:
    "Portafolio de Keyner De la Hoz, desarrollador web y móvil especializado en crear soluciones digitales innovadoras con tecnologías modernas.",
  openGraph: {
    title: "Keyner De la Hoz | Web & Mobile Developer",
    description:
      "Bienvenido al portafolio de Keyner De la Hoz. Descubre proyectos destacados, experiencia en desarrollo web y móvil, y soluciones tecnológicas hechas a medida.",
    type: "website",
    images: {
      url: "https://firebasestorage.googleapis.com/v0/b/unidotaciones-f49fc.appspot.com/o/Preview_keyner.png?alt=media&token=7bfa5e45-3a44-40ab-b328-812b5a5d08af",
      width: 1200,
      height: 630,
      alt: "Vista previa del portafolio de Keyner De la Hoz",
    },
    siteName: "Keyner De la Hoz Portfolio",
    locale: "es_ES", // O "en_US" si el portafolio está en inglés.
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyner De la Hoz | Web & Mobile Developer",
    description:
      "Explora el portafolio de Keyner De la Hoz, desarrollador web y móvil con pasión por crear soluciones digitales impactantes.",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/unidotaciones-f49fc.appspot.com/o/Preview_keyner.png?alt=media&token=7bfa5e45-3a44-40ab-b328-812b5a5d08af",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased bg-bgPrimary text-white`}
      >
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
