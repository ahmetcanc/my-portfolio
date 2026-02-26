import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',      // Statik dosyaların (HTML/CSS/JS) oluşturulmasını sağlar
  images: {
    unoptimized: true,   // GitHub Pages'da resimlerin hata vermemesi için gereklidir
  },
};
 
export default nextConfig;
