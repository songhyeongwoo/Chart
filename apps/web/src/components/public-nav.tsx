import { Button } from "@mac/ui";
import Link from "next/link";

export function PublicNav() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-end gap-4">
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.22em] text-ink-3">Korean No-Code Chart Editor</p>
          <h1 className="mt-1 text-[1.48rem] font-semibold tracking-[-0.05em] text-ink-1">MAC</h1>
        </div>
        <span className="metric-chip hidden md:inline-flex">한글형 편집기</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link className="px-2 py-1 text-sm text-ink-2 transition hover:text-ink-1" href="/login">
          로그인
        </Link>
        <Link href="/app/projects">
          <Button size="sm">작업공간 열기</Button>
        </Link>
      </div>
    </div>
  );
}
