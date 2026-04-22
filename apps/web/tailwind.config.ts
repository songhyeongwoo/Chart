import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: {
          1: "rgb(var(--color-surface-1) / <alpha-value>)",
          2: "rgb(var(--color-surface-2) / <alpha-value>)",
          3: "rgb(var(--color-surface-3) / <alpha-value>)"
        },
        ink: {
          1: "rgb(var(--color-ink-1) / <alpha-value>)",
          2: "rgb(var(--color-ink-2) / <alpha-value>)",
          3: "rgb(var(--color-ink-3) / <alpha-value>)"
        },
        line: {
          subtle: "rgb(var(--color-line-subtle) / <alpha-value>)",
          strong: "rgb(var(--color-line-strong) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
          strong: "rgb(var(--color-accent-strong) / <alpha-value>)"
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        panel: "var(--shadow-panel)"
      },
      transitionTimingFunction: {
        refined: "var(--motion-ease)"
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem"
      },
      backgroundImage: {
        "mesh-glow": "radial-gradient(circle at top, rgb(var(--color-accent-soft) / 0.28), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;

