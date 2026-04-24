import type { ReactNode } from "react";

export interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle/80 bg-surface-1/94 px-6 py-5 backdrop-blur md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-caption font-medium uppercase tracking-[0.24em] text-ink-3">Workspace</p>
        <h2 className="mt-2 text-title-2 font-semibold tracking-[-0.03em] text-ink-1">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2 md:justify-end">{actions}</div> : null}
    </div>
  );
}
