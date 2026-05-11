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
          DEFAULT: "#6B4226",
          50: "#FAF6F1",
          100: "#F5EFE6",
          200: "#E8D9C5",
          500: "#8B5A36",
          600: "#6B4226",
          700: "#52301A",
          900: "#2A1F17",
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
          DEFAULT: "#2A1F17",
          muted: "#6B5B4F",
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
        card: "0 1px 3px rgba(42, 31, 23, 0.06), 0 1px 2px rgba(42, 31, 23, 0.04)",
        "card-hover":
          "0 10px 25px -10px rgba(107, 66, 38, 0.18), 0 4px 10px -3px rgba(107, 66, 38, 0.10)",
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
