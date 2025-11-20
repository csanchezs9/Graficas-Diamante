import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'graficasdiamante.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // Optimización de tamaños de imagen para reducir bandwidth
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // Optimizaciones de compilación (NO afectan renderizado)
  compiler: {
    // Remover console.log en producción para reducir bundle size
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimizar imports de paquetes grandes
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Remover header X-Powered-By para seguridad
  poweredByHeader: false,

  // Headers de cache para mejorar performance
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
