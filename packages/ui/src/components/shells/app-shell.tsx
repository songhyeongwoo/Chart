import type { ReactNode } from "react";

export interface AppShellProps {
  sidebar: ReactNode;
  topBar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, topBar, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink-1">
      <div className="mx-auto grid min-h-screen max-w-[1760px] grid-cols-1 gap-4 p-4 xl:grid-cols-[284px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">{sidebar}</div>
        <div className="workspace-shell flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[28px] border border-line-strong shadow-panel">
          {topBar}
          <div className="flex-1 overflow-auto bg-[linear-gradient(180deg,rgba(250,247,242,0.9),rgba(240,235,228,0.76))] px-5 py-6 md:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
