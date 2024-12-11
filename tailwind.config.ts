import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        highlight: "#d4ff4d",
      },
      fontFamily: {
        "geist-sans": ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
        "circular-web": ["var(--font-circular-web)"],
        "robert-regular": ["var(--font-robert-regular)"],
        zentry: ["var(--font-zentry)"],
        general: ["var(--font-general)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
