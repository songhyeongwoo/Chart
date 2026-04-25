import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface RightInspectorTab {
  value: string;
  label: string;
  description?: string;
}

export interface RightInspectorShellProps {
  title?: string;
  tabs?: Array<string | RightInspectorTab>;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: ReactNode;
}

export function RightInspectorShell({
  title = "Inspector",
  tabs = ["Data", "Style", "Axes", "Legend", "Labels", "Layout"],
  activeTab,
  onTabChange,
  children
}: RightInspectorShellProps) {
  const normalizedTabs = tabs.map((tab) =>
    typeof tab === "string"
      ? {
          value: tab,
          label: tab
        }
      : tab
  );
  const selectedTab = activeTab ?? normalizedTabs[0]?.value;

  return (
    <aside className="workspace-shell flex h-full min-h-[680px] flex-col overflow-hidden rounded-[24px] border border-line-strong shadow-[0_26px_72px_rgba(18,20,18,0.11)] xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)]">
      <div className="border-b border-line-subtle/80 px-4 py-4">
        <p className="text-caption font-medium uppercase tracking-[0.18em] text-ink-3">{title}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 xl:grid-cols-3">
          {normalizedTabs.map((tab) => {
            const isActive = tab.value === selectedTab;
            const tabClasses = cn(
              "rounded-md border px-3 py-2.5 text-left transition-all duration-200 ease-refined",
              isActive
                ? "border-line-accent bg-surface-1 text-ink-1 shadow-soft"
                : "border-line-subtle bg-surface-1/76 text-ink-3 hover:border-line-strong hover:text-ink-1"
            );

            if (!onTabChange) {
              return (
                <span key={tab.value} className={tabClasses}>
                  <span className="block text-[11px] font-medium tracking-[0.08em]">{tab.label}</span>
                  {tab.description ? <span className="mt-1 block truncate text-[11px] leading-4 text-ink-3">{tab.description}</span> : null}
                </span>
              );
            }

            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onTabChange(tab.value)}
                className={cn(tabClasses, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60")}
              >
                <span className="block text-[11px] font-medium tracking-[0.1em]">{tab.label}</span>
                {tab.description ? <span className="mt-1 block truncate text-[11px] leading-4 text-ink-3">{tab.description}</span> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">{children}</div>
    </aside>
  );
}
