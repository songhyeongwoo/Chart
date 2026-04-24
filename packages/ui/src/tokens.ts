export const designTokens = {
  color: {
    canvas: "241 236 229",
    canvasElevated: "232 226 218",
    surface1: "248 245 240",
    surface2: "238 233 225",
    surface3: "222 214 204",
    surface4: "199 189 176",
    ink1: "17 24 31",
    ink2: "79 87 97",
    ink3: "127 133 141",
    inkInverse: "246 243 238",
    lineSubtle: "211 201 188",
    lineStrong: "168 155 139",
    lineAccent: "74 83 90",
    accent: "36 48 59",
    accentSoft: "205 216 223",
    accentStrong: "16 23 29",
    success: "63 108 85",
    warning: "151 112 73",
    danger: "144 84 76",
    info: "79 106 127"
  },
  radius: {
    xs: "10px",
    sm: "14px",
    md: "20px",
    lg: "28px",
    xl: "38px"
  },
  shadow: {
    soft: "0 20px 48px rgba(18, 20, 18, 0.07)",
    panel: "0 40px 120px rgba(16, 20, 24, 0.16)",
    inset: "inset 0 1px 0 rgba(255, 255, 255, 0.58)"
  },
  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    quick: "160ms",
    normal: "240ms"
  },
  typography: {
    sans: "\"Pretendard Variable\", \"SUIT Variable\", \"Noto Sans KR\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif",
    display: "\"Pretendard Variable\", \"SUIT Variable\", \"Noto Sans KR\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", sans-serif",
    scale: {
      hero: "clamp(3rem, 5.6vw, 5.4rem)",
      display: "clamp(2.1rem, 4vw, 3.7rem)",
      title1: "clamp(1.9rem, 2.5vw, 2.7rem)",
      title2: "1.45rem",
      body: "1rem",
      caption: "0.76rem"
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
    subtle: "1px solid rgba(211, 201, 188, 0.9)",
    strong: "1px solid rgba(168, 155, 139, 1)"
  },
  chartPalette: ["#233845", "#496372", "#6A7C78", "#A17250", "#C18E68", "#DDD1C0"]
} as const;
