import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚀 Genera una versión estática lista para Firebase Hosting
  output: "export",

  // 🔧 Evita que Next optimice imágenes (Firebase las servirá directamente)
  images: {
    unoptimized: true,
  },

  // (opcional) elimina console.logs y mejora build
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
