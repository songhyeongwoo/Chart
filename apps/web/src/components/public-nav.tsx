import { Button, StatusBadge } from "@mac/ui";
import Link from "next/link";

export function PublicNav() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-end gap-4">
        <div>
          <p className="text-caption uppercase tracking-[0.24em] text-ink-3">Creative Data Studio</p>
          <h1 className="mt-1 font-display text-title-2 text-ink-1">MAC</h1>
        </div>
        <StatusBadge label="Private by default" tone="neutral" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link className="px-2 py-1 text-sm text-ink-2 transition hover:text-ink-1" href="/login">
          Sign in
        </Link>
        <Link href="/app/projects">
          <Button size="sm">Open app shell</Button>
        </Link>
      </div>
    </div>
  );
}
