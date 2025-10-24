import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#1f513f",
        glow: "#2ef3a0"
      },
      fontFamily: {
        sans: ["var(--font-syne)", "system-ui", "sans-serif"],
        display: ["var(--font-chakra)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        stadium: "0 0 120px rgba(46, 243, 160, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
