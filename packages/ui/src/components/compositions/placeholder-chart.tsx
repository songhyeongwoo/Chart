import type { ChartType } from "@mac/domain";
import { cn } from "../../lib/cn";

export interface PlaceholderChartProps {
  chartType?: ChartType;
  className?: string;
  heightClassName?: string;
}

const bars = [28, 36, 44, 53, 61, 72];
const scatterDots = [
  [18, 72],
  [30, 58],
  [38, 67],
  [47, 44],
  [61, 52],
  [74, 30]
];

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

  return (
    <div className={cn("rounded-lg border border-line-subtle bg-surface-1 px-6 pb-6 pt-10", heightClassName, className)}>
      <div className="grid h-full grid-cols-6 items-end gap-3">
        {bars.map((height, index) => (
          <div
            key={height}
            className={cn(
              "rounded-t-sm",
              chartType === "line" || chartType === "area" ? "bg-accent/50" : "bg-accent"
            )}
            style={{
              height: `${height}%`,
              opacity: 0.66 + index * 0.04
            }}
          />
        ))}
      </div>
      {(chartType === "line" || chartType === "area") && (
        <div className="pointer-events-none -mt-[55%] h-0 w-full">
          <svg viewBox="0 0 600 220" className="h-full w-full">
            <path
              d="M10 180 C90 160, 120 140, 190 132 S300 88, 365 96 S470 42, 590 24"
              fill={chartType === "area" ? "rgba(132, 92, 70, 0.12)" : "none"}
              stroke="rgba(132, 92, 70, 0.92)"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

