import type { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle pb-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.22em] text-ink-3">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 font-display text-4xl leading-none text-ink-1">{title}</h1>
        {description ? <p className="mt-3 text-sm leading-6 text-ink-2">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

