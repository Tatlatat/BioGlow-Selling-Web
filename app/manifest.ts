import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdf8f3",
    theme_color: "#5a3f2a",
    icons: [
      // Chrome Android cần 192x192 cho tab switcher + Add to Home Screen
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Maskable variant cho Android adaptive icon (cắt 10% safe zone)
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      // iOS Safari
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
