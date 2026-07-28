import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand constants
        coral: "#F76B3A",
        lilac: "#A269FF",
        indigo: "#282475",
        night: "#16132E",
        deep: "#0B0920",
        smoke: "#A7A5BE",
        paper: "#F2EFE7",
        ink: "#0B0920",

        // Tone-aware semantics, resolved from the `.tone-*` band a component
        // sits in, so the same markup works on ink, on paper and on coral.
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        "rule-soft": "var(--rule-soft)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-2": "var(--accent-2)",
        "accent-2-ink": "var(--accent-2-ink)",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Labels, section indices, tags — the sign-posting layer.
        label: ["var(--font-label)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Swiss discipline: everything is a rectangle. `rounded-full` stays
        // for the few genuinely circular marks (bubbles, logo dots, nodes).
        DEFAULT: "0",
        none: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "9999px",
      },
      animation: {
        "pulse-slow": "pulseSlow 2.6s ease-in-out infinite",
        "pulse-slower": "pulseSlow 2.6s ease-in-out infinite 1.3s",
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
