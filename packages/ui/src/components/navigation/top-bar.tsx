import type { ReactNode } from "react";

export interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle bg-surface-1/80 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-2">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-ink-3">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3 md:justify-end">{actions}</div> : null}
    </div>
  );
}
