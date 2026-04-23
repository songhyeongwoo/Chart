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
        <div key={item.label} className="panel-muted px-4 py-4">
          <p className="text-caption uppercase tracking-[0.18em] text-ink-3">{item.label}</p>
          <div className="mt-3 text-lg font-semibold text-ink-1">{item.value}</div>
          {item.hint ? <p className="mt-1 text-sm leading-6 text-ink-2">{item.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}

