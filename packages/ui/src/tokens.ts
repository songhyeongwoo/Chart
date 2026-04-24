export const designTokens = {
  color: {
    canvas: "244 240 233",
    canvasElevated: "236 231 223",
    surface1: "250 247 242",
    surface2: "242 237 230",
    surface3: "231 223 213",
    surface4: "214 203 190",
    ink1: "25 31 37",
    ink2: "78 86 94",
    ink3: "122 128 135",
    inkInverse: "247 244 238",
    lineSubtle: "219 210 198",
    lineStrong: "184 171 154",
    lineAccent: "92 86 76",
    accent: "52 67 76",
    accentSoft: "212 220 225",
    accentStrong: "28 39 47",
    success: "71 106 87",
    warning: "150 111 76",
    danger: "145 85 79",
    info: "82 105 121"
  },
  radius: {
    xs: "10px",
    sm: "14px",
    md: "18px",
    lg: "24px",
    xl: "32px"
  },
  shadow: {
    soft: "0 16px 40px rgba(31, 30, 26, 0.05)",
    panel: "0 34px 90px rgba(24, 24, 20, 0.09)",
    inset: "inset 0 1px 0 rgba(255, 255, 255, 0.52)"
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
      hero: "clamp(3.15rem, 6vw, 5.65rem)",
      display: "clamp(2.25rem, 4vw, 4rem)",
      title1: "clamp(1.8rem, 2.5vw, 2.45rem)",
      title2: "1.375rem",
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
    subtle: "1px solid rgba(219, 210, 198, 0.9)",
    strong: "1px solid rgba(184, 171, 154, 1)"
  },
  chartPalette: ["#304752", "#51707D", "#7D8E80", "#B0835B", "#CC9B74", "#D8C4AE"]
} as const;
