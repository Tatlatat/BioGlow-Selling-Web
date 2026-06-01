import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bioglow.io.vn" }],
        destination: "https://bioglow.io.vn/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
