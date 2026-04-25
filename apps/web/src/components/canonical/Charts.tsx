"use client";

// MAC chart primitives — export-ready, plot-area-first.

export const PALETTES: Record<string, { name: string; colors: string[]; category: "basic" | "report" | "brand" | "mood" | "advanced" }> = {
  basicBlue:   { name: "기본 블루",       colors: ["#1F3FFF", "#5B6EFF", "#9AA6FF", "#C7CEFF", "#E3E7FF"], category: "basic" },
  softNavy:    { name: "차분한 블루",     colors: ["#0B2A86", "#2E4AB0", "#5A76D6", "#8DA4E8", "#C3D0F2"], category: "basic" },
  sharpContrast:{name: "선명한 대비",     colors: ["#0B0D14", "#1F3FFF", "#FF6A3D", "#25A18E", "#F2B705"], category: "basic" },
  warmOrange:  { name: "웜 오렌지",       colors: ["#6A1D00", "#C2703A", "#E26A2C", "#F2A76B", "#F9D5B4"], category: "mood" },
  softGreen:   { name: "소프트 그린",     colors: ["#1F6B44", "#2E9A5E", "#57C27D", "#9BDBB1", "#D6F0DF"], category: "mood" },
  purpleFocus: { name: "퍼플 포커스",     colors: ["#2B1055", "#4A23A8", "#6A3FD4", "#8A64E8", "#C7B0EE"], category: "mood" },
  monoGrey:    { name: "모노 그레이",     colors: ["#0B0D14", "#3D4253", "#5B6173", "#8A90A2", "#C7CAD2"], category: "report" },
  reportClassic:{name: "리포트 클래식",   colors: ["#0B2A86", "#C2703A", "#3E8B6E", "#8A6A12", "#5B6173"], category: "report" },
  presentationSharp:{name: "프레젠테이션 선명", colors: ["#0B0D14", "#1F3FFF", "#FF3366", "#F2B705", "#25A18E"], category: "report" },
  dataJournal: { name: "데이터 저널",     colors: ["#2C3E50", "#1F3FFF", "#E26A2C", "#25A18E", "#8A6CC7"], category: "report" },
  newsroom:    { name: "뉴스룸 톤",       colors: ["#112233", "#2B5D85", "#56A3A6", "#E9B44C", "#D76F3D"], category: "report" },
  darkReport:  { name: "다크 리포트",     colors: ["#E5E7EC", "#9AA6FF", "#F2A76B", "#7CD1A5", "#D4B6E8"], category: "mood" },
  socialCard:  { name: "소셜 카드",       colors: ["#FF3366", "#FFB400", "#00C2A8", "#5B6CFF", "#8E44AD"], category: "brand" },
  brandCustom: { name: "브랜드 커스텀",   colors: ["#0B0D14", "#1F3FFF", "#FF6A3D", "#F7F7F4", "#C7CAD2"], category: "brand" },
  // advanced / sequential
  seqBlue:     { name: "순차 블루",       colors: ["#E1E8FF", "#B9C6FF", "#8AA0FF", "#5A6EFF", "#1F3FFF", "#0B2A86"], category: "advanced" },
  seqOrange:   { name: "순차 오렌지",     colors: ["#FBD8B8", "#F9B282", "#F1864A", "#E2591F", "#B8380A"], category: "advanced" },
  seqTeal:     { name: "순차 틸",         colors: ["#C2F0EC", "#7FDAD5", "#33C0BB", "#1D9B98", "#0C3B3A"], category: "advanced" },
};

export type PaletteKey = keyof typeof PALETTES;

export type CanonicalBarDatum = {
  label: string;
  value: number;
  comparisonValue?: number;
};

export type CanonicalLineSeries = {
  label: string;
  values: number[];
  dashed?: boolean;
};

export type CanonicalLineData = {
  categories: string[];
  series: CanonicalLineSeries[];
  max?: number;
};

export type CanonicalDonutDatum = {
  label: string;
  value: number;
  groupLabel?: string;
};

export type CanonicalRaceDatum = {
  label: string;
  value: number;
  flag?: string;
};

const defaultBarData: CanonicalBarDatum[] = [
  { label: "서울", value: 92, comparisonValue: 78 },
  { label: "경기", value: 86, comparisonValue: 70 },
  { label: "부산", value: 78, comparisonValue: 62 },
  { label: "인천", value: 64, comparisonValue: 54 },
  { label: "대구", value: 52, comparisonValue: 48 },
  { label: "대전", value: 41, comparisonValue: 38 },
  { label: "광주", value: 33, comparisonValue: 30 },
  { label: "울산", value: 22, comparisonValue: 20 },
];

const defaultLineData: CanonicalLineData = {
  categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  series: [
    { label: "전체", values: [22, 28, 26, 34, 40, 38, 46, 52, 60, 58, 66, 74] },
    { label: "모바일", values: [18, 20, 24, 22, 28, 32, 30, 36, 40, 44, 48, 54] },
    { label: "신규", values: [10, 14, 18, 16, 22, 20, 26, 30, 32, 34, 38, 42], dashed: true },
  ],
  max: 80,
};

const defaultDonutData: CanonicalDonutDatum[] = [
  { label: "모바일", value: 38, groupLabel: "주요 채널" },
  { label: "데스크톱", value: 24, groupLabel: "보조 채널" },
  { label: "태블릿", value: 18, groupLabel: "성장 채널" },
  { label: "앱", value: 12, groupLabel: "테스트" },
  { label: "기타", value: 8, groupLabel: "기타" },
];

const defaultRaceData: CanonicalRaceDatum[] = [
  { label: "삼성전자", value: 94, flag: "🇰🇷" },
  { label: "TSMC", value: 86, flag: "🇹🇼" },
  { label: "SK하이닉스", value: 78, flag: "🇰🇷" },
  { label: "NVIDIA", value: 70, flag: "🇺🇸" },
  { label: "현대자동차", value: 63, flag: "🇰🇷" },
  { label: "LG에너지", value: 55, flag: "🇰🇷" },
  { label: "네이버", value: 46, flag: "🇰🇷" },
  { label: "카카오", value: 38, flag: "🇰🇷" },
  { label: "셀트리온", value: 31, flag: "🇰🇷" },
  { label: "포스코", value: 25, flag: "🇰🇷" },
];

export function BarChart({
  className = "",
  palette,
  data,
  showAxis = true,
  showGrid = true,
  showLegend = true,
  topN,
}: {
  className?: string;
  palette?: string[];
  data?: CanonicalBarDatum[];
  showAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  topN?: number;
}) {
  const p = palette ?? PALETTES.basicBlue.colors;
  const chartData = (data ?? defaultBarData).slice(0, topN ?? (data ?? defaultBarData).length);
  const max = 100;
  const w = 760, h = 360, pad = { l: 46, r: 24, t: 10, b: 46 };
  const groupW = (w - pad.l - pad.r) / chartData.length;
  const bw = (groupW - 12) / 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      {showGrid && [0, 25, 50, 75, 100].map((g) => {
        const y = pad.t + (h - pad.t - pad.b) * (1 - g / max);
        return (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke={g === 0 ? "#D5D8DF" : "#EEF0F4"} strokeDasharray={g === 0 ? "" : "2 3"} />
            {showAxis && <text x={pad.l - 10} y={y + 3} textAnchor="end" fontSize="10" fill="#8A90A2" className="font-mono-num">{g}</text>}
          </g>
        );
      })}
      {chartData.map((d, i) => {
        const x = pad.l + i * groupW + 6;
        const bh1 = (h - pad.t - pad.b) * (d.value / max);
        const bh2 = (h - pad.t - pad.b) * ((d.comparisonValue ?? d.value * 0.84) / max);
        return (
          <g key={d.label}>
            <rect x={x} y={h - pad.b - bh1} width={bw} height={bh1} rx={3} fill={p[0]} />
            <rect x={x + bw + 2} y={h - pad.b - bh2} width={bw} height={bh2} rx={3} fill={p[2]} opacity={0.9} />
            {showAxis && <text x={x + bw + 1} y={h - pad.b + 18} textAnchor="middle" fontSize="11" fill="#3D4253">{d.label}</text>}
          </g>
        );
      })}
      {showLegend && <g transform={`translate(${pad.l}, ${h - 14})`}>
        <rect width="10" height="10" rx="2" fill={p[0]} />
        <text x="16" y="9" fontSize="10.5" fill="#3D4253">2026.01</text>
        <rect x="76" width="10" height="10" rx="2" fill={p[2]} opacity={0.9} />
        <text x="92" y="9" fontSize="10.5" fill="#3D4253">2025.01</text>
      </g>}
    </svg>
  );
}

export function LineChart({
  className = "",
  palette,
  data,
  showAxis = true,
  showGrid = true,
  showLegend = true,
}: {
  className?: string;
  palette?: string[];
  data?: CanonicalLineData;
  showAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
}) {
  const p = palette ?? PALETTES.basicBlue.colors;
  const w = 760, h = 360, pad = { l: 46, r: 68, t: 20, b: 44 };
  const chartData = data ?? defaultLineData;
  const [s1, s2, s3] = chartData.series;
  const max = chartData.max ?? Math.max(1, ...chartData.series.flatMap((series) => series.values));
  const xAt = (i: number, len: number) => pad.l + (i * (w - pad.l - pad.r)) / (len - 1);
  const yAt = (v: number) => pad.t + (h - pad.t - pad.b) * (1 - v / max);
  const path = (arr: number[]) =>
    arr.map((v, i) => {
      if (i === 0) return `M${xAt(i, arr.length)},${yAt(v)}`;
      const xp = xAt(i - 1, arr.length), yp = yAt(arr[i - 1]);
      const xc = xAt(i, arr.length), yc = yAt(v);
      const cx = (xp + xc) / 2;
      return `C${cx},${yp} ${cx},${yc} ${xc},${yc}`;
    }).join(" ");
  const months = chartData.categories;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <defs>
        <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={p[0]} stopOpacity="0.2" />
          <stop offset="100%" stopColor={p[0]} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showGrid && [0, 20, 40, 60, 80].map((g) => {
        const y = yAt(g);
        return (
          <g key={g}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke={g === 0 ? "#D5D8DF" : "#EEF0F4"} strokeDasharray={g === 0 ? "" : "2 3"} />
            {showAxis && <text x={pad.l - 10} y={y + 3} textAnchor="end" fontSize="10" fill="#8A90A2" className="font-mono-num">{g}</text>}
          </g>
        );
      })}
      <path d={`${path(s1.values)} L ${xAt(s1.values.length - 1, s1.values.length)},${h - pad.b} L ${pad.l},${h - pad.b} Z`} fill="url(#lg1)" />
      <path d={path(s1.values)} fill="none" stroke={p[0]} strokeWidth={2.6} strokeLinecap="round" />
      <path d={path(s2.values)} fill="none" stroke={p[2] || p[1]} strokeWidth={2.2} strokeLinecap="round" />
      <path d={path(s3.values)} fill="none" stroke={p[3] || p[1]} strokeWidth={2} strokeDasharray="5 5" strokeLinecap="round" />
      {months.map((m, i) => (
        showAxis && <text key={i} x={xAt(i, months.length)} y={h - 18} textAnchor="middle" fontSize="10" fill="#8A90A2" className="font-mono-num">{m}월</text>
      ))}
      {showLegend && <>
        <text x={w - pad.r + 6} y={yAt(s1.values[s1.values.length - 1]) + 3} fontSize="10" fill={p[0]} className="font-mono-num" fontWeight="500">{s1.label}</text>
        <text x={w - pad.r + 6} y={yAt(s2.values[s2.values.length - 1]) + 3} fontSize="10" fill={p[2] || p[1]} className="font-mono-num" fontWeight="500">{s2.label}</text>
        <text x={w - pad.r + 6} y={yAt(s3.values[s3.values.length - 1]) + 3} fontSize="10" fill={p[3] || p[1]} className="font-mono-num" fontWeight="500">{s3.label}</text>
      </>}
    </svg>
  );
}

export function DonutChart({ className = "", palette, data, showLegend = true }: { className?: string; palette?: string[]; data?: CanonicalDonutDatum[]; showLegend?: boolean }) {
  const p = palette ?? PALETTES.basicBlue.colors;
  const chartData = data ?? defaultDonutData;
  const total = chartData.reduce((a, b) => a + b.value, 0);
  const r = 90, R = 140, cx = 200, cy = 190;
  let acc = 0;
  const gap = 0.008;
  const arcs = chartData.map((item, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2 + gap;
    acc += item.value;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2 - gap;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
    return { d: `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z`, fill: p[i % p.length], v: item.value };
  });
  return (
    <svg viewBox="0 0 760 380" className={className}>
      {arcs.map((a, i) => <path key={i} d={a.d} fill={a.fill} />)}
      <circle cx={cx} cy={cy} r={r - 1} fill="#fff" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="12" fill="#8A90A2">모바일 이용률</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="30" fill="#0B0D14" className="font-mono-num" fontWeight="600" letterSpacing="-1">62.4%</text>
      <text x={cx} y={cy + 42} textAnchor="middle" fontSize="10.5" fill="#8A90A2">총 1,284,510명</text>
      {showLegend && chartData.map((item, i) => (
        <g key={item.label} transform={`translate(440, ${70 + i * 48})`}>
          <rect width="3" height="22" rx="1" fill={p[i % p.length]} />
          <text x="14" y="10" fontSize="11" fill="#8A90A2">{item.groupLabel ?? "채널"}</text>
          <text x="14" y="27" fontSize="13.5" fill="#0B0D14" style={{ fontWeight: 500 }}>{item.label}</text>
          <text x="220" y="22" fontSize="18" textAnchor="end" fill="#0B0D14" className="font-mono-num" style={{ fontWeight: 500 }}>{item.value}%</text>
        </g>
      ))}
    </svg>
  );
}

// Animated racing bar with year overlay + timeline
export function RacingBar({ className = "", palette, data, year = 2024, showYear = true, showTimeline = true }: { className?: string; palette?: string[]; data?: CanonicalRaceDatum[]; year?: number; showYear?: boolean; showTimeline?: boolean }) {
  const p = palette ?? PALETTES.sharpContrast.colors;
  const chartData = data ?? defaultRaceData;
  const w = 760, rowH = 30, padL = 120, padR = 60, top = 28;
  const maxBar = w - padL - padR;
  const h = top + chartData.length * rowH + (showTimeline ? 56 : 18);
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const progress = (year - 2019) / (2025 - 2019);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      {/* big year overlay */}
      {showYear && (
        <g>
          <text x={w - 24} y={top + 110} textAnchor="end" fontSize="108" fill="#EEF0F4" fontWeight="700" className="font-mono-num" letterSpacing="-4">{year}</text>
          <text x={w - 24} y={top + 130} textAnchor="end" fontSize="10" fill="#8A90A2" letterSpacing="3">YEAR</text>
        </g>
      )}
      {chartData.map((d, i) => {
        const bw = (d.value / 100) * maxBar;
        const y = top + i * rowH;
        const color = p[i % p.length];
        const isTop3 = i < 3;
        return (
          <g key={d.label}>
            <text x={22} y={y + 19} fontSize="11" fill={isTop3 ? "#0B0D14" : "#8A90A2"} className="font-mono-num" fontWeight={isTop3 ? 600 : 500}>{String(i + 1).padStart(2, "0")}</text>
            <text x={padL - 8} y={y + 19} textAnchor="end" fontSize="12" fill="#0B0D14" style={{ fontWeight: 500 }}>{d.label}</text>
            <rect x={padL} y={y + 5} width={bw} height={rowH - 10} rx={3} fill={color} />
            {/* motion ghost trail */}
            <rect x={padL + bw - 6} y={y + 5} width={6} height={rowH - 10} rx={1} fill="#000" opacity="0.25" />
            <rect x={padL + bw} y={y + 5} width={10} height={rowH - 10} rx={1} fill={color} opacity="0.18" />
            <rect x={padL + bw + 12} y={y + 5} width={6} height={rowH - 10} rx={1} fill={color} opacity="0.1" />
            <text x={padL + bw + 22} y={y + 19} fontSize="11" fill="#0B0D14" className="font-mono-num" style={{ fontWeight: 500 }}>{(d.value * 12.4).toFixed(1)}B</text>
          </g>
        );
      })}
      {/* timeline */}
      {showTimeline && (
        <g transform={`translate(0, ${h - 40})`}>
          <line x1={padL} x2={w - 24} y1={14} y2={14} stroke="#E1E3E8" strokeWidth="2" />
          <line x1={padL} x2={padL + (w - padL - 24) * progress} y1={14} y2={14} stroke={p[0]} strokeWidth="2.5" />
          {years.map((y, i) => {
            const x = padL + (w - padL - 24) * (i / (years.length - 1));
            const active = y === year;
            return (
              <g key={y}>
                <circle cx={x} cy={14} r={active ? 5 : 3} fill={active ? p[0] : "#fff"} stroke={active ? p[0] : "#C7CAD2"} strokeWidth={active ? 0 : 1.5} />
                <text x={x} y={34} textAnchor="middle" fontSize="10" fill={active ? "#0B0D14" : "#8A90A2"} className="font-mono-num" fontWeight={active ? 600 : 400}>{y}</text>
              </g>
            );
          })}
          <text x={24} y={18} fontSize="10.5" fill="#0B0D14" className="font-mono-num" fontWeight="500">{year} · {Math.round(progress * 100)}%</text>
        </g>
      )}
    </svg>
  );
}

export function MiniSpark({ color = "#1F3FFF", type = "line" as "line" | "bar" | "donut" | "race" | "area" | "scatter", palette }: { color?: string; type?: string; palette?: string[] }) {
  if (type === "bar") {
    const bars = [30, 55, 40, 72, 48, 88, 62, 54];
    return (
      <svg viewBox="0 0 200 90" className="w-full h-full">
        {[20, 40, 60].map((g) => <line key={g} x1="4" x2="196" y1={78 - (g / 100) * 68} y2={78 - (g / 100) * 68} stroke="#EEF0F4" />)}
        {bars.map((v, i) => (
          <rect key={i} x={8 + i * 24} y={78 - (v / 100) * 68} width={16} height={(v / 100) * 68} rx={2} fill={color} opacity={0.4 + (i / bars.length) * 0.6} />
        ))}
      </svg>
    );
  }
  if (type === "donut") {
    const p = palette ?? [color, "#C2703A", "#3E8B6E", "#8A6CC7"];
    return (
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <g transform="translate(100,46)">
          {[0.48, 0.28, 0.16, 0.08].map((v, i) => {
            const start = [0, 0.48, 0.76, 0.92][i];
            return <circle key={i} r="26" fill="none" stroke={p[i]} strokeWidth="12" strokeDasharray={`${v * 163.3} 163.3`} strokeDashoffset={`${-start * 163.3}`} transform="rotate(-90)" />;
          })}
          <circle r="18" fill="#fff" />
          <text textAnchor="middle" y="4" fontSize="11" fill="#0B0D14" className="font-mono-num" fontWeight="600">62%</text>
        </g>
      </svg>
    );
  }
  if (type === "race") {
    const p = palette ?? [color];
    return (
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <text x="192" y="32" textAnchor="end" fontSize="22" fill="#EEF0F4" fontWeight="700" className="font-mono-num">2024</text>
        {[0.95, 0.78, 0.62, 0.48, 0.34, 0.22].map((v, i) => (
          <g key={i}>
            <text x="6" y={16 + i * 12} fontSize="7" fill={i < 2 ? "#0B0D14" : "#8A90A2"} className="font-mono-num">{String(i + 1).padStart(2, "0")}</text>
            <rect x={22} y={8 + i * 12} width={v * 168} height={8} rx={1.5} fill={p[i % p.length]} opacity={1 - i * 0.1} />
          </g>
        ))}
      </svg>
    );
  }
  if (type === "scatter") {
    const pts = Array.from({ length: 22 }, (_, i) => [8 + (i * 11) % 180 + (i * 7) % 9, 78 - ((i * 17) % 60) - 6]);
    return (
      <svg viewBox="0 0 200 90" className="w-full h-full">
        {[20, 40, 60].map((g) => <line key={g} x1="4" x2="196" y1={78 - g} y2={78 - g} stroke="#EEF0F4" />)}
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill={color} opacity={0.55 + (i % 4) * 0.12} />)}
      </svg>
    );
  }
  if (type === "area") {
    const pts = [10, 18, 22, 20, 28, 32, 36, 40, 44, 50, 58, 64];
    const path = pts.map((v, i) => `${i === 0 ? "M" : "L"}${8 + (i * 184) / (pts.length - 1)},${78 - v}`).join(" ");
    return (
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <path d={`${path} L 192,78 L 8,78 Z`} fill={color} opacity="0.22" />
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  const pts = [8, 14, 12, 22, 18, 28, 24, 34, 30, 42, 48, 56];
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"}${8 + (i * 184) / (pts.length - 1)},${78 - v}`).join(" ");
  return (
    <svg viewBox="0 0 200 90" className="w-full h-full">
      {[20, 40, 60].map((g) => <line key={g} x1="4" x2="196" y1={78 - g} y2={78 - g} stroke="#EEF0F4" />)}
      <path d={`${path} L 192,78 L 8,78 Z`} fill={color} opacity="0.14" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((v, i) => i % 3 === 0 && <circle key={i} cx={8 + (i * 184) / (pts.length - 1)} cy={78 - v} r="1.8" fill="#fff" stroke={color} strokeWidth="1.3" />)}
    </svg>
  );
}

export function MapChartMini({ color = "#1F3FFF" }: { color?: string }) {
  return (
    <svg viewBox="0 0 200 90" className="w-full h-full">
      <path d="M70 8 L100 10 L120 22 L128 40 L120 60 L136 70 L130 80 L108 82 L90 76 L78 60 L64 56 L58 40 L56 22 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      <path d="M76 28 L92 26 L104 36 L100 52 L84 54 L74 42 Z" fill={color} opacity="0.5" />
      <path d="M94 58 L112 62 L116 74 L100 74 L90 66 Z" fill={color} opacity="0.75" />
      <circle cx="100" cy="46" r="3" fill="#FF6A3D" />
    </svg>
  );
}

export function MetricCardMini({ color = "#1F3FFF" }: { color?: string }) {
  return (
    <div className="w-full h-full p-2 flex flex-col justify-between">
      <div className="text-[9px] text-[#8A90A2]">월간 매출</div>
      <div>
        <div className="text-[22px] font-mono-num text-[#0B0D14]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>₩2.41B</div>
        <div className="text-[9px] font-mono-num" style={{ color }}>▲ 전년 대비 +18.2%</div>
      </div>
    </div>
  );
}

