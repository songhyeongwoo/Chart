export const designTokens = {
  color: {
    canvas: "248 246 242",
    surface1: "255 255 252",
    surface2: "244 239 232",
    surface3: "236 229 220",
    ink1: "28 28 31",
    ink2: "88 88 94",
    ink3: "129 129 136",
    lineSubtle: "216 208 197",
    lineStrong: "179 168 153",
    accent: "156 99 74",
    accentSoft: "227 204 189",
    accentStrong: "116 70 50",
    success: "70 120 98",
    warning: "170 113 65"
  },
  radius: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  shadow: {
    soft: "0 10px 30px rgba(39, 26, 16, 0.05)",
    panel: "0 16px 50px rgba(39, 26, 16, 0.08)"
  },
  motion: {
    ease: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  },
  typography: {
    sans: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif",
    display: "\"Iowan Old Style\", \"Palatino Linotype\", \"Book Antiqua\", serif"
  },
  chartPalette: ["#9C634A", "#C88662", "#E0B08D", "#6E8B7A", "#3E5A73", "#B7A38F"]
} as const;

