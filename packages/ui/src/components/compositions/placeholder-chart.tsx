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

export function PlaceholderChart({
  chartType = "bar",
  className,
  heightClassName = "h-[360px]"
}: PlaceholderChartProps) {
  if (chartType === "scatter") {
    return (
      <div className={cn("editor-grid-bg relative rounded-lg border border-line-subtle bg-surface-1", heightClassName, className)}>
        {scatterDots.map(([left, top], index) => (
          <span
            key={`${left}-${top}`}
            className="absolute size-3 rounded-full bg-accent shadow-soft"
            style={{ left: `${left}%`, top: `${top}%`, opacity: 0.7 + index * 0.04 }}
          />
        ))}
      </div>
    );
  }

  if (chartType === "donut") {
    return (
      <div className={cn("flex items-center justify-center rounded-lg border border-line-subtle bg-surface-1", heightClassName, className)}>
        <div className="relative size-52 rounded-full border-[22px] border-accent/80">
          <div className="absolute inset-[-22px] rotate-45 rounded-full border-[22px] border-transparent border-t-[#C18E68] border-r-[#6E8B7A]" />
          <div className="absolute inset-0 m-auto flex size-24 items-center justify-center rounded-full bg-surface-1 text-sm font-medium text-ink-2">
            100%
          </div>
        </div>
      </div>
    );
  }

  if (chartType === "table") {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-line-subtle bg-surface-1", heightClassName, className)}>
        <div className="grid grid-cols-4 border-b border-line-subtle bg-surface-2 px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-ink-3">
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
            className="grid grid-cols-4 border-b border-line-subtle/70 px-4 py-3 text-sm text-ink-2 last:border-b-0"
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
                  className="flex h-full items-center rounded-sm bg-accent px-3 text-xs font-medium text-ink-inverse"
                  style={{ width: `${item.width}%`, opacity: 0.96 - index * 0.12 }}
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
      <div className="grid h-full grid-cols-[44px_minmax(0,1fr)] gap-4">
        <div className="flex h-full flex-col justify-between pt-3 text-[11px] text-ink-3">
          <span>3k</span>
          <span>2k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        <div className="flex h-full flex-col">
          <div className="editor-grid-bg relative flex-1 overflow-hidden rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(248,244,238,0.92))] px-6 pb-8 pt-8">
            <div className="grid h-full grid-cols-6 items-end gap-3">
              {bars.map((height, index) => (
                <div
                  key={height}
                  className={cn(
                    "rounded-t-sm",
                    chartType === "line" || chartType === "area" ? "bg-accent/25" : "bg-accent"
                  )}
                  style={{
                    height: `${height}%`,
                    opacity: 0.66 + index * 0.04
                  }}
                />
              ))}
            </div>
            {(chartType === "line" || chartType === "area") && (
              <div className="pointer-events-none absolute inset-x-4 top-[18%] h-[58%]">
                <svg viewBox="0 0 600 220" className="h-full w-full">
                  <path
                    d="M10 180 C90 160, 120 140, 190 132 S300 88, 365 96 S470 42, 590 24"
                    fill={chartType === "area" ? "rgba(132, 92, 70, 0.14)" : "none"}
                    stroke="rgba(132, 92, 70, 0.92)"
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
