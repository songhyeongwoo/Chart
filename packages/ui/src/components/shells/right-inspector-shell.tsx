import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface RightInspectorShellProps {
  title?: string;
  tabs?: string[];
  children: ReactNode;
}

export function RightInspectorShell({
  title = "Inspector",
  tabs = ["Data", "Style", "Axes", "Legend", "Labels", "Layout"],
  children
}: RightInspectorShellProps) {
  return (
    <aside className="flex h-full min-h-[680px] flex-col rounded-lg border border-line-subtle bg-surface-1 shadow-soft">
      <div className="border-b border-line-subtle px-5 py-4">
        <p className="text-caption uppercase tracking-[0.22em] text-ink-3">{title}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                index === 0
                  ? "border-line-accent bg-surface-2 text-ink-1"
                  : "border-line-subtle text-ink-3"
              )}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-3 px-5 py-5">{children}</div>
    </aside>
  );
}

