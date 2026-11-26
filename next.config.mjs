/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Оптимизация изображений: WebP/AVIF + разрешённые сторонние домены
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  experimental: {
    // Трясём дерево для иконок -> меньше JS в бандле
    optimizePackageImports: ['lucide-react'],
  },
  // Редиректы для ЧПУ и консистентности локалки
  async redirects() {
    return [
      { source: '/uslugi/remont-minsk', destination: '/uslugi/remont-pod-klyuch', permanent: true },
      { source: '/uslugi/remont-gomel', destination: '/uslugi/remont-pod-klyuch', permanent: true },
      { source: '/contacts', destination: '/kontakty', permanent: true },
      { source: '/about', destination: '/o-nas', permanent: true },
      { source: '/o-kompanii', destination: '/o-nas', permanent: true },
    ];
  },
  output: 'export',
  basePath: '/Remont-project',
  assetPrefix: '/Remont-project/',
};

export default nextConfig;