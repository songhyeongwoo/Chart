import { cn } from "../../lib/cn";

type StatusTone = "saved" | "draft" | "live" | "private";

const toneClassName: Record<StatusTone, string> = {
  saved: "border border-success/20 bg-success/10 text-success",
  draft: "border border-warning/20 bg-warning/10 text-warning",
  live: "border border-accent/20 bg-accent-soft/35 text-accent-strong",
  private: "border border-line-subtle bg-surface-2 text-ink-2"
};

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
}

export function StatusBadge({ label, tone = "draft" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        toneClassName[tone]
      )}
    >
      {label}
    </span>
  );
}

