import { cn } from "../../lib/cn";

export interface MetricStripItem {
  label: string;
  value: string;
  hint?: string;
}

export interface MetricStripProps {
  items: MetricStripItem[];
  className?: string;
}

export function MetricStrip({ items, className }: MetricStripProps) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-[24px] border border-line-subtle bg-surface-1/84 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.48)]">
          <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">{item.label}</p>
          <div className="mt-3 text-[1.2rem] font-semibold tracking-[-0.035em] text-ink-1">{item.value}</div>
          {item.hint ? <p className="mt-1.5 text-sm leading-6 text-ink-2">{item.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}
