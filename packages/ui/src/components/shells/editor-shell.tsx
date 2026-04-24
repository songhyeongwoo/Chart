import type { ReactNode } from "react";

export interface EditorShellProps {
  topBar: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  rail?: ReactNode;
}

export function EditorShell({ topBar, canvas, inspector, rail }: EditorShellProps) {
  return (
    <section className="flex h-full min-h-[780px] flex-col overflow-hidden rounded-xl border border-line-subtle bg-surface-2/85">
      {topBar}
      <div className="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[260px_minmax(0,1fr)_360px]">
        <div className="space-y-4 xl:block">{rail}</div>
        <div>{canvas}</div>
        <div>{inspector}</div>
      </div>
    </section>
  );
}

