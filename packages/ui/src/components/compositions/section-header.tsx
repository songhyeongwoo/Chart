import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  compact?: boolean;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  compact = false,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-line-subtle",
        compact ? "pb-5" : "pb-7",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "items-center")}>
        {eyebrow ? (
          <p className="text-caption font-medium uppercase tracking-[0.22em] text-ink-3">{eyebrow}</p>
        ) : null}
        <h2 className={cn("mt-2 font-display text-title-1 text-ink-1", compact && "text-title-2")}>{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-body text-ink-2">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

