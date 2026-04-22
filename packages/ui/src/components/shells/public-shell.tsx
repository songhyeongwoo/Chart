import type { ReactNode } from "react";

export interface PublicShellProps {
  nav?: ReactNode;
  children: ReactNode;
}

export function PublicShell({ nav, children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-canvas bg-mesh-glow text-ink-1">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-12 pt-5 md:px-8">
        <header className="sticky top-5 z-20 rounded-lg border border-line-subtle bg-surface-1/85 px-5 py-4 shadow-soft backdrop-blur">
          {nav}
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
