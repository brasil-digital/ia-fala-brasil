import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Quem vem do app Fala Brasil cai direto no Detecta Fake (o utm segue junto).
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "utm_source", value: "fala_brasil_app" }],
        destination: "/aprender/detecta-fake",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
        ],
      },
    ];
  },
};

export default nextConfig;
