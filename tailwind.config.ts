import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#1a1a1a",
        "surface-light": "#2a2a2a",
        primary: "#8b5cf6",
        "primary-hover": "#7c3aed",
        foreground: "#ffffff",
        muted: "#a1a1aa",
        "muted-foreground": "#71717a",
        border: "#27272a",
        accent: "#8b5cf6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
