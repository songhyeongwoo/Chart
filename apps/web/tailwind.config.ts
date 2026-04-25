import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        "canvas-elevated": "rgb(var(--color-canvas-elevated) / <alpha-value>)",
        surface: {
          1: "rgb(var(--color-surface-1) / <alpha-value>)",
          2: "rgb(var(--color-surface-2) / <alpha-value>)",
          3: "rgb(var(--color-surface-3) / <alpha-value>)",
          4: "rgb(var(--color-surface-4) / <alpha-value>)"
        },
        ink: {
          1: "rgb(var(--color-ink-1) / <alpha-value>)",
          2: "rgb(var(--color-ink-2) / <alpha-value>)",
          3: "rgb(var(--color-ink-3) / <alpha-value>)",
          inverse: "rgb(var(--color-ink-inverse) / <alpha-value>)"
        },
        line: {
          subtle: "rgb(var(--color-line-subtle) / <alpha-value>)",
          strong: "rgb(var(--color-line-strong) / <alpha-value>)",
          accent: "rgb(var(--color-line-accent) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
          strong: "rgb(var(--color-accent-strong) / <alpha-value>)"
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      fontSize: {
        hero: ["var(--type-hero)", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
        display: ["var(--type-display)", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        "title-1": ["var(--type-title-1)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "title-2": ["var(--type-title-2)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        body: ["var(--type-body)", { lineHeight: "1.7" }],
        caption: ["var(--type-caption)", { lineHeight: "1.5", letterSpacing: "0.02em" }]
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        panel: "var(--shadow-panel)",
        inset: "var(--shadow-inset)"
      },
      opacity: {
        8: "0.08",
        12: "0.12"
      },
      transitionTimingFunction: {
        refined: "var(--motion-ease)"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem"
      },
      backgroundImage: {
        "canvas-wash":
          "linear-gradient(180deg, rgba(255,252,248,0.86), rgba(247,244,239,0.98))",
        "hero-noise":
          "radial-gradient(circle at top left, rgba(224,206,193,0.42), transparent 36%), radial-gradient(circle at 80% 20%, rgba(209,180,154,0.22), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
