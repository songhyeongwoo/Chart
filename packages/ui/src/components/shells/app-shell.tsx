import type { ReactNode } from "react";

export interface AppShellProps {
  sidebar: ReactNode;
  topBar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, topBar, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink-1">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">{sidebar}</div>
        <div className="flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface-1 shadow-panel">
          {topBar}
          <div className="flex-1 overflow-auto px-6 py-6 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
