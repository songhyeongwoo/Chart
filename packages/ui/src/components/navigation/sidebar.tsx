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
    <aside className="workspace-void flex h-full min-h-[calc(100vh-2rem)] w-full flex-col rounded-[28px] border border-white/8 px-4 py-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
      <div className="mb-6 border-b border-white/8 px-2 pb-4">
        <p className="text-caption font-medium uppercase tracking-[0.24em] text-white/42">{title}</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-md border px-4 py-3.5 transition-all duration-200 ease-refined",
              item.active
                ? "border-white/22 bg-white/16 text-white shadow-[0_18px_34px_rgba(0,0,0,0.14)]"
                : "border-white/8 bg-white/4 text-white/68 hover:border-white/16 hover:bg-white/8 hover:text-white"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium tracking-[-0.01em]">{item.label}</div>
              {item.badge ? (
                <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[10px] tracking-[0.08em] text-white/62">
                  {item.badge}
                </span>
              ) : null}
            </div>
            {item.caption ? <div className="mt-1 text-xs leading-5 text-white/46">{item.caption}</div> : null}
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-4">{footer}</div>
    </aside>
  );
}
