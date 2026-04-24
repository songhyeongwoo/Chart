import type { ReactNode } from "react";

export interface EditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  rail?: ReactNode;
}

export function EditorShell({ topBar, canvas, inspector, rail }: EditorShellProps) {
  return (
    <section className="editor-stage flex h-full min-h-[820px] flex-col rounded-[28px] border border-line-strong shadow-panel">
      {topBar}
      <div className="grid flex-1 grid-cols-1 gap-5 p-5 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[292px_minmax(0,1fr)_388px]">
        <div className="space-y-4">{rail}</div>
        <div className="min-w-0">{canvas}</div>
        <div className="min-w-0 lg:col-span-2 xl:col-span-1">{inspector}</div>
      </div>
    </section>
  );
}
