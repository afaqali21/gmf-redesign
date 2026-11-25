import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every WordPress URL ends in "/" (e.g. /web-design/). Keep them identical.
  trailingSlash: true,
  images: {
    // Serve modern formats; next/image picks the smallest the browser supports.
    formats: ["image/avif", "image/webp"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
