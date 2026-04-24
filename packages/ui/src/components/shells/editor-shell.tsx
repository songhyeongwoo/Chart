import type { ReactNode } from "react";

export interface EditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  rail?: ReactNode;
}

export function EditorShell({ topBar, canvas, inspector, rail }: EditorShellProps) {
  return (
    <section className="flex h-full min-h-[820px] flex-col overflow-hidden rounded-xl border border-line-strong bg-surface-2/86 shadow-panel">
      {topBar}
      <div className="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[280px_minmax(0,1fr)_380px]">
        <div className="space-y-4 xl:block">{rail}</div>
        <div>{canvas}</div>
        <div>{inspector}</div>
      </div>
    </section>
  );
}
