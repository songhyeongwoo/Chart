import { PRODUCT_DEFAULTS } from "@mac/domain";
import { Button, Card, EmptyState, MetricStrip, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="New project"
        title="Create a project shell"
        description="This staging step stays intentionally light. The next meaningful moment is dataset upload, not metadata ceremony."
        actions={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button size="lg">Continue to upload</Button>
          </Link>
        }
      />

      <MetricStrip
        items={[
          { label: "Visualization model", value: "Single primary" },
          { label: "Privacy", value: "Private by default" },
          { label: "Editor support", value: "Desktop-first" }
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card variant="canvas" title="Project setup placeholder" description="Real mutation is intentionally deferred. This page exists to clarify the product handoff, not to invent fake complexity.">
          <div className="space-y-4 text-sm text-ink-2">
            <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
              Primary visualization exposure: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.visualizationExposure}</span>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
              Save contract: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.saveModel}</span>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
              Sharing in MVP: <span className="font-medium text-ink-1">{String(PRODUCT_DEFAULTS.sharingInMvp)}</span>
            </div>
          </div>
        </Card>

        <Card variant="subtle" title="Guardrails" description="Fixed product decisions are visible in the UI, not buried in docs only.">
          <div className="space-y-3">
            <StatusBadge label="Magic link auth" tone="neutral" />
            <StatusBadge label="Private by default" tone="private" />
            <StatusBadge label="Desktop-first editor" tone="live" />
          </div>
        </Card>
      </div>

      <EmptyState
        eyebrow="Next handoff"
        title="Upload follows immediately after project creation."
        description="The future create-project action can redirect into the dataset upload route with a new project id, without changing the page rhythm."
        action={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button variant="secondary">See upload skeleton</Button>
          </Link>
        }
      />
    </div>
  );
}
