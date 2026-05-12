import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E3A8A",
          50: "#F0F4FB",
          100: "#DBE4F5",
          200: "#B6C8EB",
          500: "#3B5BC7",
          600: "#1E3A8A",
          700: "#142966",
          900: "#0B1A3D",
        },
        leaf: {
          DEFAULT: "#3F6B43",
          50: "#EEF5EF",
          500: "#3F6B43",
          700: "#2E4F31",
        },
        gold: {
          DEFAULT: "#C9A227",
          500: "#C9A227",
          600: "#A78416",
        },
        warm: {
          red: "#B5483A",
          "red-dark": "#963829",
        },
        ink: {
          DEFAULT: "#0F1626",
          muted: "#4A5468",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        base: ["1.0625rem", { lineHeight: "1.65" }],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 22, 38, 0.06), 0 1px 2px rgba(15, 22, 38, 0.04)",
        "card-hover":
          "0 10px 25px -10px rgba(30, 58, 138, 0.18), 0 4px 10px -3px rgba(30, 58, 138, 0.10)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
