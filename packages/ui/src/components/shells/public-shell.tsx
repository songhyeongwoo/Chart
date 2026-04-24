import type { ReactNode } from "react";

export interface PublicShellProps {
  nav?: ReactNode;
  children: ReactNode;
}

export function PublicShell({ nav, children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink-1">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 pb-16 pt-4 md:px-8">
        <header className="sticky top-4 z-20 rounded-xl border border-line-subtle/80 bg-surface-1/88 px-5 py-4 shadow-soft backdrop-blur">
          {nav}
        </header>
        <main className="flex-1 pt-6">{children}</main>
      </div>
    </div>
  );
}
