import type { ReactNode } from "react";

export interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-line-subtle/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.97),rgba(244,239,232,0.94))] px-6 py-5 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.24em] text-ink-3">Workspace</p>
          <h2 className="mt-2 text-title-2 font-semibold tracking-[-0.03em] text-ink-1">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-2">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2 lg:justify-end">{actions}</div> : null}
      </div>
    </div>
  );
}
