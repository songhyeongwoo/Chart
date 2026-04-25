import type { ReactNode } from "react";

export interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-line-subtle/80 bg-[linear-gradient(180deg,rgba(252,249,244,0.97),rgba(243,238,230,0.92))] px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.18em] text-ink-3">Workspace</p>
          <h2 className="mt-2 text-[1.4rem] font-semibold tracking-[-0.04em] text-ink-1">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-2">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2 xl:justify-end">{actions}</div> : null}
      </div>
    </div>
  );
}
