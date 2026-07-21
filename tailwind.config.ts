import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "hsl(var(--ground))",
        surface: "hsl(var(--surface))",
        raised: "hsl(var(--raised))",
        hair: "hsl(var(--hair))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        dim: "hsl(var(--dim))",
        mint: {
          DEFAULT: "hsl(var(--mint))",
          deep: "hsl(var(--mint-deep))",
          soft: "hsl(var(--mint) / 0.10)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: { xl: "14px", "2xl": "18px" },
      maxWidth: { content: "1180px", prose: "70ch" },
      boxShadow: {
        lift: "0 18px 40px -24px hsl(var(--shadow) / 0.35)",
        deep: "0 24px 60px -28px hsl(var(--shadow) / 0.5)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        "pulse-ring": { "0%,100%": { boxShadow: "0 0 0 0 hsl(var(--mint) / 0.25)" }, "50%": { boxShadow: "0 0 0 7px transparent" } },
      },
      animation: { "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both", "pulse-ring": "pulse-ring 2.4s ease-in-out infinite" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
