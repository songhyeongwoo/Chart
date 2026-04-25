"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "./PageShell";

type ChartItem = { name: string; ready: boolean; preview: "bar" | "hbar" | "stacked" | "group" | "line" | "area" | "stackedArea" | "step" | "donut" | "pie" | "treemap" | "scatter" | "histogram" | "box" | "mapKR" | "bubbleMap" | "race" | "ranking" | "table" | "metric" };

const CATEGORIES: { code: string; key: string; desc: string; items: ChartItem[] }[] = [
  {
    code: "01", key: "비교", desc: "값의 크기를 직접 비교할 때.",
    items: [
      { name: "막대", ready: true, preview: "bar" },
      { name: "가로 막대", ready: true, preview: "hbar" },
      { name: "그룹 막대", ready: true, preview: "group" },
      { name: "누적 막대", ready: true, preview: "stacked" },
    ],
  },
  {
    code: "02", key: "추이", desc: "시간에 따른 변화를 따라갈 때.",
    items: [
      { name: "선", ready: true, preview: "line" },
      { name: "영역", ready: true, preview: "area" },
      { name: "누적 영역", ready: true, preview: "stackedArea" },
      { name: "스텝", ready: false, preview: "step" },
    ],
  },
  {
    code: "03", key: "구성", desc: "전체 안의 비중을 보여줄 때.",
    items: [
      { name: "도넛", ready: true, preview: "donut" },
      { name: "파이", ready: true, preview: "pie" },
      { name: "트리맵", ready: false, preview: "treemap" },
    ],
  },
  {
    code: "04", key: "분포", desc: "데이터가 어떻게 흩어져 있는지.",
    items: [
      { name: "산점도", ready: true, preview: "scatter" },
      { name: "히스토그램", ready: false, preview: "histogram" },
      { name: "박스플롯", ready: false, preview: "box" },
    ],
  },
  {
    code: "05", key: "지도", desc: "지역별 차이를 한눈에.",
    items: [
      { name: "시도별 지도", ready: false, preview: "mapKR" },
      { name: "버블 지도", ready: false, preview: "bubbleMap" },
    ],
  },
  {
    code: "06", key: "순위 · 애니메이션", desc: "순위 변화를 영상처럼.",
    items: [
      { name: "레이싱 바", ready: true, preview: "race" },
      { name: "순위 변화", ready: false, preview: "ranking" },
    ],
  },
  {
    code: "07", key: "표 · 지표", desc: "숫자 자체를 보여줄 때.",
    items: [
      { name: "데이터 표", ready: false, preview: "table" },
      { name: "카드 지표", ready: false, preview: "metric" },
    ],
  },
];

export function Gallery() {
  const router = useRouter();
  const totalReady = CATEGORIES.reduce((a, c) => a + c.items.filter((i) => i.ready).length, 0);
  const totalSoon = CATEGORIES.reduce((a, c) => a + c.items.filter((i) => !i.ready).length, 0);

  return (
    <PageShell>
      <PageHeader
        eyebrow="CHART GALLERY"
        title={"모든 차트, 한 눈에."}
        desc="MAC이 지원하는 차트 유형을 카테고리별로 정리했습니다. 데이터 성격에 맞는 차트를 골라 바로 편집기로 들어가세요."
      />
      <div className="max-w-[1320px] mx-auto px-10 -mt-2 pb-6 flex items-center gap-4 text-[12px] text-[#5B6173]">
        <span className="font-mono-num">{CATEGORIES.length}개 카테고리</span>
        <span className="w-px h-3 bg-[#E5E7EC]" />
        <span><span className="font-mono-num text-[#0B0D14]">{totalReady}</span>종 사용 가능</span>
        <span className="w-px h-3 bg-[#E5E7EC]" />
        <span><span className="font-mono-num text-[#0B0D14]">{totalSoon}</span>종 준비 중</span>
      </div>

      <div className="max-w-[1320px] mx-auto px-10 pb-24 grid grid-cols-2 gap-5">
        {CATEGORIES.map((c) => (
          <div key={c.code} className="rounded-2xl border border-[#E5E7EC] bg-white p-7 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-[10.5px] tracking-[0.18em] text-[#9AA0B1] font-mono-num">{c.code}</span>
                <span style={{ fontSize: 22, letterSpacing: "-0.02em", fontWeight: 600 }}>{c.key}</span>
              </div>
              <span className="text-[11px] text-[#5B6173] font-mono-num">
                {c.items.filter((i) => i.ready).length} / {c.items.length}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-[#5B6173] leading-[1.55]">{c.desc}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {c.items.map((it) => (
                <button
                  key={it.name}
                  onClick={() => it.ready && router.push("/editor/demo-project?tab=edit")}
                  disabled={!it.ready}
                  className={`group text-left rounded-xl border ${it.ready ? "border-[#E5E7EC] hover:border-[#0B0D14] bg-white" : "border-dashed border-[#E5E7EC] bg-[#FBFBF8] cursor-not-allowed"} p-3 flex flex-col`}
                >
                  <div className={`h-[88px] rounded-lg overflow-hidden ${it.ready ? "bg-[#FBFBF8]" : "bg-white"} relative`}>
                    <ChartPreview kind={it.preview} muted={!it.ready} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[12.5px]" style={{ fontWeight: 500 }}>{it.name}</span>
                    {it.ready ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EAF2FF] text-[#1F3FFF]">사용 가능</span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FBF3E2] text-[#9A6B00]">준비 중</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push("/editor/demo-project?tab=edit")}
              className="mt-6 self-start inline-flex items-center gap-1.5 text-[12.5px] text-[#0B0D14] hover:opacity-80"
            >
              이 카테고리로 시작 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function ChartPreview({ kind, muted = false }: { kind: ChartItem["preview"]; muted?: boolean }) {
  const c1 = muted ? "#C7CAD2" : "#1F3FFF";
  const c2 = muted ? "#DDDFE5" : "#5B6EFF";
  const c3 = muted ? "#E5E7EC" : "#FF6A3D";
  const grid = muted ? "#EEF0F3" : "#E5E7EC";
  const text = muted ? "#C7CAD2" : "#9AA0B1";

  switch (kind) {
    case "bar": {
      const v = [38, 64, 50, 78, 42, 70];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          {v.map((h, i) => (
            <rect key={i} x={20 + i * 28} y={74 - h} width="18" height={h} rx="1.5" fill={i === 3 ? c3 : c1} opacity={i === 3 ? 1 : 0.9} />
          ))}
        </svg>
      );
    }
    case "hbar": {
      const v = [80, 60, 50, 36];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          {v.map((w, i) => (
            <rect key={i} x="20" y={14 + i * 16} width={w * 1.6} height="10" rx="1.5" fill={i === 0 ? c1 : c2} opacity={1 - i * 0.15} />
          ))}
        </svg>
      );
    }
    case "group": {
      const groups = [[40, 56], [60, 72], [50, 38], [70, 60]];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          {groups.map((g, i) =>
            g.map((h, j) => (
              <rect key={`${i}-${j}`} x={20 + i * 38 + j * 14} y={74 - h} width="11" height={h} rx="1.5" fill={j === 0 ? c1 : c3} opacity={j === 0 ? 0.95 : 0.85} />
            ))
          )}
        </svg>
      );
    }
    case "stacked": {
      const a = [30, 38, 26, 44, 32];
      const b = [22, 18, 30, 18, 24];
      const c = [14, 16, 12, 14, 18];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          {a.map((_, i) => {
            const x = 22 + i * 32;
            const y1 = 74 - a[i];
            const y2 = y1 - b[i];
            const y3 = y2 - c[i];
            return (
              <g key={i}>
                <rect x={x} y={y1} width="20" height={a[i]} fill={c1} rx="1.5" />
                <rect x={x} y={y2} width="20" height={b[i]} fill={c2} rx="1.5" />
                <rect x={x} y={y3} width="20" height={c[i]} fill={c3} rx="1.5" />
              </g>
            );
          })}
        </svg>
      );
    }
    case "line": {
      const pts = "12,60 36,52 60,58 84,38 108,44 132,28 156,30 180,18";
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="12" y1="74" x2="190" y2="74" stroke={grid} />
          <line x1="12" y1="50" x2="190" y2="50" stroke={grid} strokeDasharray="2 3" opacity="0.6" />
          <polyline points={pts} fill="none" stroke={c1} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="156" cy="30" r="2.5" fill={c3} />
        </svg>
      );
    }
    case "area": {
      const pts = "12,60 36,52 60,58 84,38 108,44 132,28 156,30 180,18";
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <defs>
            <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={c1} stopOpacity="0.35" />
              <stop offset="100%" stopColor={c1} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`12,74 ${pts} 180,74`} fill="url(#ar)" />
          <polyline points={pts} fill="none" stroke={c1} strokeWidth="2" />
        </svg>
      );
    }
    case "stackedArea": {
      const top = "12,30 40,26 70,34 100,22 130,28 160,18 188,22";
      const mid = "12,50 40,46 70,52 100,42 130,48 160,40 188,44";
      const bot = "12,66 40,64 70,68 100,60 130,64 160,58 188,60";
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <polygon points={`12,74 ${bot} 188,74`} fill={c3} opacity="0.85" />
          <polygon points={`${bot} ${mid.split(" ").reverse().join(" ")}`} fill={c2} opacity="0.9" />
          <polygon points={`${mid} ${top.split(" ").reverse().join(" ")}`} fill={c1} opacity="0.95" />
        </svg>
      );
    }
    case "step": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="12" y1="74" x2="190" y2="74" stroke={grid} />
          <polyline points="12,60 40,60 40,44 80,44 80,52 120,52 120,30 160,30 160,38 188,38" fill="none" stroke={c1} strokeWidth="2" strokeLinejoin="miter" />
        </svg>
      );
    }
    case "donut": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <g transform="translate(100 44)">
            <circle r="30" fill="none" stroke={c1} strokeWidth="12" strokeDasharray="80 188" transform="rotate(-90)" />
            <circle r="30" fill="none" stroke={c2} strokeWidth="12" strokeDasharray="55 188" transform="rotate(54)" />
            <circle r="30" fill="none" stroke={c3} strokeWidth="12" strokeDasharray="35 188" transform="rotate(170)" />
            <text textAnchor="middle" y="3" fontSize="10" fill={muted ? "#9AA0B1" : "#0B0D14"} className="font-mono-num">68%</text>
          </g>
        </svg>
      );
    }
    case "pie": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <g transform="translate(100 44)">
            <circle r="30" fill={c1} />
            <path d="M0 0 L30 0 A30 30 0 0 1 -9.27 28.5 Z" fill={c3} />
            <path d="M0 0 L-9.27 28.5 A30 30 0 0 1 -28.5 -9.27 Z" fill={c2} />
          </g>
        </svg>
      );
    }
    case "treemap": {
      const cells = [
        { x: 12, y: 10, w: 90, h: 64, c: c1, o: 0.95 },
        { x: 104, y: 10, w: 56, h: 30, c: c2, o: 0.9 },
        { x: 162, y: 10, w: 26, h: 30, c: c3, o: 0.85 },
        { x: 104, y: 42, w: 36, h: 32, c: c2, o: 0.7 },
        { x: 142, y: 42, w: 46, h: 32, c: c1, o: 0.55 },
      ];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          {cells.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.c} opacity={r.o} rx="2" />)}
        </svg>
      );
    }
    case "scatter": {
      const pts = [[26, 60], [38, 50], [54, 56], [70, 42], [82, 48], [96, 36], [112, 44], [126, 30], [142, 36], [156, 22], [170, 28]];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          <line x1="14" y1="14" x2="14" y2="74" stroke={grid} />
          {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2.2} fill={i % 4 === 0 ? c3 : c1} opacity="0.9" />)}
        </svg>
      );
    }
    case "histogram": {
      const v = [10, 22, 38, 56, 64, 50, 32, 18, 10];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          {v.map((h, i) => <rect key={i} x={18 + i * 19} y={74 - h} width="17" height={h} fill={c1} opacity="0.9" />)}
        </svg>
      );
    }
    case "box": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <line x1="14" y1="74" x2="190" y2="74" stroke={grid} />
          {[44, 92, 140].map((cx, i) => (
            <g key={i}>
              <line x1={cx} y1="20" x2={cx} y2="68" stroke={c1} />
              <rect x={cx - 14} y={32 + i * 4} width="28" height={26 - i * 4} fill={c1} opacity="0.18" stroke={c1} />
              <line x1={cx - 14} y1={42 + i * 2} x2={cx + 14} y2={42 + i * 2} stroke={c3} strokeWidth="1.6" />
            </g>
          ))}
        </svg>
      );
    }
    case "mapKR": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <g fill={c1} opacity="0.85">
            <path d="M70 12 L96 16 L102 28 L92 36 L78 32 Z" />
            <path d="M104 18 L130 22 L132 36 L114 40 L102 32 Z" opacity="0.7" />
            <path d="M82 36 L100 38 L108 50 L94 58 L78 50 Z" opacity="0.95" />
            <path d="M110 42 L130 42 L134 56 L116 60 L106 52 Z" opacity="0.6" />
            <path d="M88 60 L110 62 L116 74 L96 76 L82 70 Z" opacity="0.5" />
            <path d="M50 22 L68 24 L70 36 L56 42 L46 32 Z" opacity="0.4" />
          </g>
          <circle cx="96" cy="46" r="3" fill={c3} />
        </svg>
      );
    }
    case "bubbleMap": {
      const b = [[60, 36, 8], [96, 30, 12], [124, 44, 6], [88, 56, 10], [140, 60, 4], [70, 60, 5]];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <rect x="14" y="10" width="172" height="64" fill={muted ? "#F5F6F8" : "#F5F6F8"} rx="3" />
          {b.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={c1} opacity="0.55" stroke={c1} />)}
        </svg>
      );
    }
    case "race": {
      const v = [86, 70, 56, 40, 24];
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          {v.map((w, i) => (
            <g key={i}>
              <rect x="14" y={10 + i * 14} width={w * 1.7} height="10" rx="1.5" fill={i === 0 ? c3 : c1} opacity={1 - i * 0.13} />
              <text x={20 + w * 1.7} y={18 + i * 14} fontSize="8" fill={text} className="font-mono-num">{(160 - i * 22).toFixed(0)}</text>
            </g>
          ))}
        </svg>
      );
    }
    case "ranking": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          {[[12, 16, 188, 60], [12, 30, 188, 22], [12, 44, 188, 48], [12, 58, 188, 36]].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i === 0 ? c3 : c1} strokeWidth="1.6" opacity={1 - i * 0.18} />
          ))}
        </svg>
      );
    }
    case "table": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          {[10, 24, 38, 52, 66].map((y, i) => (
            <g key={i}>
              <line x1="14" y1={y} x2="186" y2={y} stroke={grid} />
              <rect x="14" y={y - 8} width="38" height="6" fill={i === 0 ? c1 : c2} opacity={i === 0 ? 1 : 0.4} rx="1" />
              <rect x="60" y={y - 8} width="58" height="6" fill={c2} opacity="0.35" rx="1" />
              <rect x="124" y={y - 8} width="46" height="6" fill={c2} opacity="0.35" rx="1" />
            </g>
          ))}
        </svg>
      );
    }
    case "metric": {
      return (
        <svg viewBox="0 0 200 88" className="w-full h-full">
          <rect x="14" y="14" width="80" height="60" rx="6" fill={muted ? "#F5F6F8" : "#F2F4FF"} />
          <rect x="106" y="14" width="80" height="60" rx="6" fill={muted ? "#F5F6F8" : "#FFF1EC"} />
          <text x="22" y="38" fontSize="9" fill={text}>매출</text>
          <text x="22" y="58" fontSize="14" fill={c1} className="font-mono-num">₩48.2M</text>
          <text x="114" y="38" fontSize="9" fill={text}>성장률</text>
          <text x="114" y="58" fontSize="14" fill={c3} className="font-mono-num">+12.4%</text>
        </svg>
      );
    }
  }
}


