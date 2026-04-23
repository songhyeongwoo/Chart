import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  align?: "left" | "center";
}

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  secondaryAction,
  align = "center"
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-line-strong/70 bg-surface-2/90 px-8 py-12",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {eyebrow ? (
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-title-1 text-ink-1">{title}</h2>
      <p className={cn("mt-3 max-w-xl text-body text-ink-2", align === "center" && "mx-auto")}>{description}</p>
      {(action || secondaryAction) && (
        <div className={cn("mt-6 flex flex-wrap gap-3", align === "center" ? "justify-center" : "justify-start")}>
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

