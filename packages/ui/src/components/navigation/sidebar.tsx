import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SidebarItem {
  href: string;
  label: string;
  caption?: string;
  active?: boolean;
  badge?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  footer?: ReactNode;
}

export function Sidebar({ items, title = "Workspace", footer }: SidebarProps) {
  return (
    <aside className="flex h-full min-h-[calc(100vh-2rem)] w-full flex-col rounded-xl border border-line-strong bg-surface-1/96 px-4 py-5 shadow-panel">
      <div className="mb-6 border-b border-line-subtle/80 px-2 pb-4">
        <p className="text-caption font-medium uppercase tracking-[0.24em] text-ink-3">{title}</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-lg border px-4 py-3.5 transition-all duration-200 ease-refined",
              item.active
                ? "border-line-accent bg-surface-2 text-ink-1 shadow-soft"
                : "border-transparent text-ink-2 hover:border-line-subtle hover:bg-surface-2/70"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium tracking-[-0.01em]">{item.label}</div>
              {item.badge ? (
                <span className="rounded-full border border-line-subtle bg-surface-1/88 px-2.5 py-0.5 text-[10px] tracking-[0.08em] text-ink-3">
                  {item.badge}
                </span>
              ) : null}
            </div>
            {item.caption ? <div className="mt-1 text-xs leading-5 text-ink-3">{item.caption}</div> : null}
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-4">{footer}</div>
    </aside>
  );
}
