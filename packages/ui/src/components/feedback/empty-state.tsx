import type { ReactNode } from "react";

export interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ eyebrow, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-line-strong/60 bg-surface-2/60 px-8 py-12 text-center">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-3">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl leading-tight text-ink-1">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink-2">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

