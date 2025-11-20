import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gráficas Diamante",
  description: "Más de 50 años impactando marcas con impresiones elegantes, innovadoras y distintivas. Especialistas en cajas plegadizas, catálogos, material POP y más.",
  keywords: ["imprenta", "impresión offset", "impresión digital", "cajas plegadizas", "catálogos", "Medellín", "Colombia"],
  authors: [{ name: "Gráficas Diamante" }],
  icons: {
    icon: "/images/logos/logo-pestana.png",
    apple: "/images/logos/logo-pestana.png",
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
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
