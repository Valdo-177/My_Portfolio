import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      // Interlineado más compacto que el default de Tailwind
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.3rem" }],
        base: ["1rem", { lineHeight: "1.45rem" }],
        lg: ["1.125rem", { lineHeight: "1.6rem" }],
        xl: ["1.25rem", { lineHeight: "1.7rem" }],
        "2xl": ["1.5rem", { lineHeight: "1.9rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.2rem" }],
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-geist-pixel-square)", "var(--font-geist-mono)", "monospace"],
        "pixel-grid": ["var(--font-geist-pixel-grid)", "var(--font-geist-mono)", "monospace"],
        "pixel-circle": ["var(--font-geist-pixel-circle)", "var(--font-geist-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#000000",
          50: "#0a0a0a",
          100: "#111111",
          200: "#1a1a1a",
          300: "#262626",
        },
        line: "rgba(255,255,255,0.09)",
        muted: "#8f8f8f",
        dim: "#575757",
        blue: {
          DEFAULT: "#0070f3",
          bright: "#52a8ff",
          glow: "#3291ff",
          deep: "#0a1f3d",
          ink: "#06101f",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pixel-blink": {
          "0%, 100%": { opacity: "0.12" },
          "50%": { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "caret": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "scan": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100%)" },
        },
      },
      animation: {
        "pixel-blink": "pixel-blink 1.2s steps(2, jump-none) infinite",
        marquee: "marquee 40s linear infinite",
        caret: "caret 1s steps(1) infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
