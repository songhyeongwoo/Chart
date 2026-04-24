import type { ReactNode } from "react";

export interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle bg-surface-1/90 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">Workspace</p>
        <h2 className="mt-1 text-title-2 font-semibold text-ink-1">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-2">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2 md:justify-end">{actions}</div> : null}
    </div>
  );
}

