import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
        {/* Preload recursos críticos para mejorar LCP y FCP */}
        <link rel="preload" href="/images/hero/video-poster.jpg" as="image" type="image/jpeg" />
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
