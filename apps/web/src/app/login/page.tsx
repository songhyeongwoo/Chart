import { AUTH_MODE } from "@mac/domain";
import { Button, Card, Input, PublicShell, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../../components/public-nav";

export default function LoginPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl items-center py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-3">Auth scaffold</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink-1">
              Magic link sign-in, kept intentionally quiet and direct.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink-2">
              Real auth is not wired yet. This page establishes the final product tone, spacing, and state model for
              the email magic link flow.
            </p>
            <div className="mt-6">
              <StatusBadge label={AUTH_MODE} tone="private" />
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">State model</div>
                <div className="mt-2 text-sm text-ink-2">idle, sending, sent, expired, invalid</div>
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Access policy</div>
                <div className="mt-2 text-sm text-ink-2">Projects remain private until sharing exists.</div>
              </div>
            </div>
          </div>

          <Card
            title="Continue with email"
            description="Enter the address you will use to access private projects and return links."
            footer={<p className="text-xs text-ink-3">Placeholder only. No delivery, verification, or session creation yet.</p>}
          >
            <div className="space-y-4">
              <label className="block text-sm text-ink-2">
                Email
                <Input className="mt-2" placeholder="name@company.com" type="email" />
              </label>
              <Button className="w-full">Send magic link</Button>
              <div className="rounded-md border border-line-subtle bg-surface-2 px-4 py-3 text-sm text-ink-2">
                States reserved: idle, sending, sent, invalid email, expired token.
              </div>
              <Link className="text-sm text-accent transition hover:text-accent-strong" href="/app/projects">
                Skip to app shell demo
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}
