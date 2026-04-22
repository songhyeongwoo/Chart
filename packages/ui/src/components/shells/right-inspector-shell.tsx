import type { ReactNode } from "react";

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
    <aside className="flex h-full flex-col rounded-lg border border-line-subtle bg-surface-1 shadow-soft">
      <div className="border-b border-line-subtle px-5 py-4">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-3">{title}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={
                index === 0
                  ? "rounded-full border border-line-strong bg-surface-2 px-3 py-1 text-xs font-medium text-ink-1"
                  : "rounded-full border border-line-subtle px-3 py-1 text-xs text-ink-3"
              }
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 px-5 py-5">{children}</div>
    </aside>
  );
}

