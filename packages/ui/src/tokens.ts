export const designTokens = {
  color: {
    canvas: "247 244 239",
    canvasElevated: "241 236 229",
    surface1: "255 252 248",
    surface2: "248 244 238",
    surface3: "239 233 225",
    surface4: "230 223 213",
    ink1: "28 29 32",
    ink2: "76 77 83",
    ink3: "122 123 130",
    inkInverse: "250 247 243",
    lineSubtle: "219 212 203",
    lineStrong: "183 173 161",
    lineAccent: "158 129 112",
    accent: "132 92 70",
    accentSoft: "224 206 193",
    accentStrong: "94 62 46",
    success: "78 119 101",
    warning: "162 117 73",
    danger: "148 84 78",
    info: "80 109 136"
  },
  radius: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "22px",
    xl: "28px"
  },
  shadow: {
    soft: "0 10px 30px rgba(32, 24, 18, 0.04)",
    panel: "0 18px 60px rgba(32, 24, 18, 0.06)",
    inset: "inset 0 1px 0 rgba(255, 255, 255, 0.5)"
  },
  motion: {
    ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    quick: "160ms",
    normal: "220ms"
  },
  typography: {
    sans: "\"Avenir Next\", \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif",
    display: "\"Iowan Old Style\", \"Palatino Linotype\", \"Book Antiqua\", serif",
    scale: {
      hero: "clamp(3.8rem, 8vw, 6.8rem)",
      display: "clamp(2.7rem, 5vw, 4.6rem)",
      title1: "2rem",
      title2: "1.5rem",
      body: "0.975rem",
      caption: "0.75rem"
    }
  },
  spacing: {
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem"
  },
  border: {
    subtle: "1px solid rgba(219, 212, 203, 0.9)",
    strong: "1px solid rgba(183, 173, 161, 1)"
  },
  chartPalette: ["#845C46", "#A87050", "#C18E68", "#6E8B7A", "#496277", "#D1B49A"]
} as const;
