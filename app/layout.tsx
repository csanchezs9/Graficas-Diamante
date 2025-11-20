import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";

// Lazy load componentes no críticos para reducir bundle inicial
const Footer = dynamic(() => import("@/components/layout/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gráficas Diamante",
  description: "Más de 50 años impactando marcas con impresiones elegantes, innovadoras y distintivas. Especialistas en cajas plegadizas, catálogos, material POP y más.",
  keywords: ["imprenta", "impresión offset", "impresión digital", "cajas plegadizas", "catálogos", "Medellín", "Colombia"],
  authors: [{ name: "Gráficas Diamante" }],
  icons: {
    icon: "/images/logos/logo-pestana.webp",
    apple: "/images/logos/logo-pestana.webp",
  },
  openGraph: {
    title: "Gráficas Diamante - Impresiones de Alta Calidad",
    description: "Más de 50 años de experiencia en soluciones gráficas",
    type: "website",
    locale: "es_CO",
    siteName: "Gráficas Diamante",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Preconnect para Google Fonts - reduce latencia */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical CSS inline para above-the-fold */}
        <style dangerouslySetInnerHTML={{__html: `
          body{margin:0;padding:0;min-height:100vh}
          *{box-sizing:border-box}
          .min-h-screen{min-height:100vh}
          .relative{position:relative}
          .absolute{position:absolute}
          .inset-0{top:0;right:0;bottom:0;left:0}
          .overflow-hidden{overflow:hidden}
          .flex{display:flex}
          .items-center{align-items:center}
          .justify-center{justify-content:center}
          .w-full{width:100%}
          .h-full{height:100%}
          .object-cover{object-fit:cover}
          .bg-black{background-color:#000}
          .bg-white{background-color:#fff}
          .text-white{color:#fff}
        `}} />

        {/* Preload recursos críticos para mejorar LCP y FCP */}
        <link rel="preload" href="/images/hero/video-poster.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/logos/logo-principal.webp" as="image" type="image/webp" />
      </head>
      <body className="antialiased">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
