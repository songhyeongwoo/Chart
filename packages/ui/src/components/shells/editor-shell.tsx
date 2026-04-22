import type { ReactNode } from "react";

export interface EditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  rail?: ReactNode;
}

export function EditorShell({ topBar, canvas, inspector, rail }: EditorShellProps) {
  return (
    <section className="flex h-full min-h-[760px] flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface-2/60">
      {topBar}
      <div className="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[240px_minmax(0,1fr)_340px]">
        <div className="xl:block">{rail}</div>
        <div>{canvas}</div>
        <div>{inspector}</div>
      </div>
    </section>
  );
}
