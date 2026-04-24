import { cn } from "../../lib/cn";
import { StateDot } from "./state-dot";

type StatusTone = "saved" | "draft" | "live" | "private" | "neutral" | "attention";

const toneClassName: Record<StatusTone, string> = {
  saved: "border border-success/20 bg-success/10 text-success",
  draft: "border border-warning/20 bg-warning/10 text-warning",
  live: "border border-accent/16 bg-accent-soft/45 text-accent-strong",
  private: "border border-line-subtle bg-surface-2 text-ink-2",
  neutral: "border border-line-subtle bg-surface-1 text-ink-2",
  attention: "border border-danger/15 bg-danger/10 text-danger"
};

const dotTone: Record<StatusTone, "saved" | "live" | "attention" | "muted"> = {
  saved: "saved",
  draft: "attention",
  live: "live",
  private: "muted",
  neutral: "muted",
  attention: "attention"
};

export interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  withDot?: boolean;
}

export function StatusBadge({ label, tone = "draft", withDot = false }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.06em]",
        toneClassName[tone]
      )}
    >
      {withDot ? <StateDot tone={dotTone[tone]} /> : null}
      {label}
    </span>
  );
}
