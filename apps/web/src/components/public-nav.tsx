import { Button, StatusBadge } from "@mac/ui";
import Link from "next/link";

export function PublicNav() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-ink-3">Creative Data Studio</p>
        <h1 className="mt-1 font-display text-2xl text-ink-1">MAC</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge label="Private by default" tone="private" />
        <Link className="text-sm text-ink-2 transition hover:text-ink-1" href="/login">
          Sign in
        </Link>
        <Link href="/app/projects">
          <Button>Open app shell</Button>
        </Link>
      </div>
    </div>
  );
}

