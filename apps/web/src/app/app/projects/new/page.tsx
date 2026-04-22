import { PRODUCT_DEFAULTS } from "@mac/domain";
import { Button, Card, EmptyState, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="New project"
        title="Create a project shell"
        description="This route holds the pre-upload staging step. In MVP, the product still reveals one primary visualization per project."
        actions={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button>Continue to upload</Button>
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card title="Project setup placeholder" description="Real mutation is intentionally deferred. This page establishes the shape of the new-project handoff.">
          <div className="space-y-4 text-sm text-ink-2">
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              Primary visualization exposure: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.visualizationExposure}</span>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              Save contract: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.saveModel}</span>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              Sharing in MVP: <span className="font-medium text-ink-1">{String(PRODUCT_DEFAULTS.sharingInMvp)}</span>
            </div>
          </div>
        </Card>

        <Card title="Guardrails" description="Decisions now fixed in the source-of-truth docs.">
          <div className="space-y-3">
            <StatusBadge label="Magic link auth" tone="private" />
            <StatusBadge label="Private by default" tone="private" />
            <StatusBadge label="Desktop-first editor" tone="private" />
          </div>
        </Card>
      </div>

      <EmptyState
        eyebrow="Next handoff"
        title="Upload follows immediately after project creation."
        description="The actual project creation action can later redirect into the dataset upload route with a newly issued project id."
        action={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button variant="secondary">See upload skeleton</Button>
          </Link>
        }
      />
    </div>
  );
}
