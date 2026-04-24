import { cn } from "../../lib/cn";

export interface StateDotProps {
  tone?: "saved" | "live" | "attention" | "muted";
}

const toneClassName = {
  saved: "bg-success",
  live: "bg-accent",
  attention: "bg-warning",
  muted: "bg-line-strong"
} as const;

export function StateDot({ tone = "muted" }: StateDotProps) {
  return <span className={cn("inline-flex size-2 rounded-full", toneClassName[tone])} />;
}

