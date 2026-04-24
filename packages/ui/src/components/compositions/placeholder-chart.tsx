import type { ChartType } from "@mac/domain";
import { cn } from "../../lib/cn";

export interface PlaceholderChartProps {
  chartType?: ChartType | "racing-bar";
  className?: string;
  heightClassName?: string;
}

const bars = [28, 36, 44, 53, 61, 72];
const horizontalBars = [
  { label: "광고", value: "31%", width: 92 },
  { label: "자연 유입", value: "24%", width: 76 },
  { label: "추천", value: "18%", width: 58 },
  { label: "이벤트", value: "13%", width: 44 }
];
const scatterDots = [
  [18, 72],
  [30, 58],
  [38, 67],
  [47, 44],
  [61, 52],
  [74, 30]
];
const axisLabels = ["1월", "2월", "3월", "4월", "5월", "6월"];
const palette = ["#304752", "#51707D", "#7D8E80", "#B0835B", "#CC9B74", "#D8C4AE"];

export function PlaceholderChart({
  chartType = "bar",
  className,
  heightClassName = "h-[360px]"
}: PlaceholderChartProps) {
  if (chartType === "scatter") {
    return (
      <div className={cn("editor-grid-bg relative overflow-hidden rounded-lg border border-line-subtle bg-surface-1", heightClassName, className)}>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-line-subtle/70 px-5 py-3 text-[11px] tracking-[0.12em] text-ink-3">
          <span>분포 미리보기</span>
          <span>산점도</span>
        </div>
        {scatterDots.map(([left, top], index) => (
          <span
            key={`${left}-${top}`}
            className="absolute size-3 rounded-full shadow-soft"
            style={{ left: `${left}%`, top: `${top}%`, opacity: 0.7 + index * 0.04, backgroundColor: palette[index % palette.length] }}
          />
        ))}
      </div>
    );
  }

  if (chartType === "donut") {
    return (
      <div className={cn("grid items-center rounded-lg border border-line-subtle bg-surface-1 px-6 py-6 lg:grid-cols-[220px_minmax(0,1fr)]", heightClassName, className)}>
        <div className="flex items-center justify-center">
          <div
            className="relative size-44 rounded-full"
            style={{
              background:
                "conic-gradient(#304752 0 31%, rgb(250 247 242) 31% 32.2%, #51707D 32.2% 56%, rgb(250 247 242) 56% 57.2%, #B0835B 57.2% 74%, rgb(250 247 242) 74% 75.2%, #CC9B74 75.2% 88%, rgb(250 247 242) 88% 89.2%, #7D8E80 89.2% 100%)"
            }}
          >
            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-surface-1">
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-3">총합</span>
              <span className="mt-2 text-xl font-semibold text-ink-1">100%</span>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            ["브랜드 검색", "31%"],
            ["광고", "24%"],
            ["추천", "18%"],
            ["행사", "14%"]
          ].map(([label, value], index) => (
            <div key={label} className="rounded-md border border-line-subtle bg-surface-2/65 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                  <span className="text-sm font-medium text-ink-1">{label}</span>
                </div>
                <span className="text-sm text-ink-2">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chartType === "table") {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-line-subtle bg-surface-1", heightClassName, className)}>
        <div className="grid grid-cols-4 border-b border-line-subtle bg-surface-2 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-ink-3">
          <span>월</span>
          <span>가입자 수</span>
          <span>매출</span>
          <span>채널</span>
        </div>
        {[
          ["1월", "1,240", "18,400", "광고"],
          ["2월", "1,710", "23,200", "자연 유입"],
          ["3월", "1,980", "28,550", "추천"],
          ["4월", "2,140", "31,700", "광고"]
        ].map((row, index) => (
          <div
            key={`${row[0]}-${index}`}
            className="grid grid-cols-4 border-b border-line-subtle/70 px-4 py-3 text-sm text-ink-2 last:border-b-0 odd:bg-surface-1 even:bg-surface-2/45"
          >
            {row.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (chartType === "racing-bar") {
    return (
      <div className={cn("rounded-lg border border-line-subtle bg-surface-1 px-5 py-5", heightClassName, className)}>
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-line-subtle/80 pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Animation-ready</p>
            <p className="mt-1 text-sm font-medium text-ink-1">2026 지역별 순위 프레임</p>
          </div>
          <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-2">24fps 준비</span>
        </div>
        <div className="space-y-4">
          {horizontalBars.map((item, index) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-line-subtle bg-surface-2 text-[11px] font-medium text-ink-2">
                    {index + 1}
                  </span>
                  <span className="font-medium text-ink-1">{item.label}</span>
                </div>
                <span className="text-ink-2">{item.value}</span>
              </div>
              <div className="h-10 rounded-md bg-surface-2 p-1">
                <div
                  className="flex h-full items-center rounded-sm px-3 text-xs font-medium text-ink-inverse"
                  style={{ width: `${item.width}%`, opacity: 0.96 - index * 0.12, backgroundColor: palette[index % palette.length] }}
                >
                  점유율
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-line-subtle bg-surface-1 px-5 pb-5 pt-6", heightClassName, className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">추천 차트</p>
          <p className="mt-1 text-sm font-medium text-ink-1">{chartType === "line" ? "성장 흐름" : "비교 차트"}</p>
        </div>
        <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-2">발표용 캔버스</span>
      </div>
      <div className="grid h-full grid-cols-[44px_minmax(0,1fr)] gap-4">
        <div className="flex h-full flex-col justify-between pt-3 text-[11px] text-ink-3">
          <span>3k</span>
          <span>2k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        <div className="flex h-full flex-col">
          <div className="editor-grid-bg relative flex-1 overflow-hidden rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(242,237,230,0.92))] px-6 pb-8 pt-8">
            <div className="grid h-full grid-cols-6 items-end gap-3">
              {bars.map((height, index) => (
                <div
                  key={height}
                  className={cn("rounded-t-sm")}
                  style={{
                    height: `${height}%`,
                    opacity: 0.72 + index * 0.04,
                    backgroundColor: chartType === "line" || chartType === "area" ? `${palette[1]}22` : palette[index % palette.length]
                  }}
                />
              ))}
            </div>
            {(chartType === "line" || chartType === "area") && (
              <div className="pointer-events-none absolute inset-x-4 top-[18%] h-[58%]">
                <svg viewBox="0 0 600 220" className="h-full w-full">
                  <path
                    d="M10 180 C90 160, 120 140, 190 132 S300 88, 365 96 S470 42, 590 24"
                    fill={chartType === "area" ? "rgba(81, 112, 125, 0.16)" : "none"}
                    stroke="rgba(48, 71, 82, 0.92)"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-3 grid grid-cols-6 gap-3 text-center text-[11px] text-ink-3">
            {axisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
