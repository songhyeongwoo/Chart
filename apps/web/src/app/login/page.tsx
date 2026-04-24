import { AUTH_MODE } from "@mac/domain";
import { Button, Card, Input, MetricStrip, PublicShell, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../../components/public-nav";

export default function LoginPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <p className="text-caption uppercase tracking-[0.22em] text-ink-3">Authentication</p>
            <h1 className="mt-4 max-w-2xl font-display text-display text-ink-1">
              Quiet, direct entry into a private visualization workspace.
            </h1>
            <p className="mt-5 max-w-xl text-body text-ink-2">
              The login surface should not feel like a separate marketing artifact. It inherits the same spacing,
              surfaces, and tone as the product it leads into.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <StatusBadge label={AUTH_MODE} tone="neutral" />
              <StatusBadge label="Private project access" tone="private" />
            </div>
            <MetricStrip
              className="mt-8"
              items={[
                { label: "Auth mode", value: "Magic link" },
                { label: "Session scope", value: "Not wired yet" },
                { label: "Product tone", value: "Editorial and minimal" }
              ]}
            />
          </div>

          <Card
            variant="canvas"
            title="Continue with email"
            description="Enter the address you will use to access private projects and return links."
            footer={
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-ink-3">Placeholder only. Delivery, verification, and session creation are still mocked.</p>
                <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href="/app/projects">
                  Skip to app shell
                </Link>
              </div>
            }
          >
            <div className="space-y-5">
              <Input
                label="Email"
                placeholder="name@company.com"
                type="email"
                hint="Magic link delivery is not active yet. This field exists to establish the final auth surface."
              />
              <Button className="w-full" size="lg">
                Send magic link
              </Button>
              <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4 text-sm leading-6 text-ink-2">
                Reserved states: idle, sending, sent, invalid email, expired token. The visual system for these states should feel as careful as the editor itself.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}
