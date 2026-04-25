import type { ReactNode } from "react";

export interface EditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  rail?: ReactNode;
}

export function EditorShell({ topBar, canvas, inspector, rail }: EditorShellProps) {
  return (
    <section className="editor-stage flex h-full min-h-[860px] flex-col overflow-hidden rounded-[28px] border border-line-strong shadow-panel">
      {topBar}
      <div className="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_360px] 2xl:grid-cols-[220px_minmax(0,1fr)_388px]">
        <div className="min-w-0 space-y-4">{rail}</div>
        <div className="min-w-0">{canvas}</div>
        <div className="min-w-0 lg:col-span-2 xl:col-span-1">{inspector}</div>
      </div>
    </section>
  );
}
