import { mockDatasetPreview } from "@mac/data";
import {
  Button,
  Card,
  MetricStrip,
  PageHeader,
  PreviewTable,
  StatusBadge
} from "@mac/ui";
import Link from "next/link";

export default async function UploadPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Upload flow"
        title="Dataset intake"
        description={`Project ${projectId} is ready for CSV/XLSX upload, parsing feedback, and dataset confirmation.`}
        actions={
          <>
            <StatusBadge label="No parsing yet" tone="draft" withDot />
            <Link href={`/app/projects/${projectId}/editor`}>
              <Button size="lg">Continue to editor</Button>
            </Link>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "Accepted types", value: ".csv, .xlsx" },
          { label: "Sheet model", value: "One active sheet" },
          { label: "Preview scope", value: "Sample rows only" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card variant="canvas" title="Dropzone surface" description="This step should feel trusted and operational, not ornamental.">
          <div className="rounded-lg border border-dashed border-line-accent bg-[linear-gradient(180deg,rgba(255,252,248,0.78),rgba(239,233,225,0.84))] px-6 py-16 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-ink-3">Upload dataset</p>
            <h2 className="mt-4 font-display text-display text-ink-1">Drop CSV or XLSX here</h2>
            <p className="mx-auto mt-3 max-w-2xl text-body text-ink-2">
              Files are not processed yet, but the product demo already shows how validation, preview, and editor handoff should feel.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button size="lg" variant="secondary">
                Choose file
              </Button>
              <Button size="lg" variant="ghost">
                View accepted formats
              </Button>
            </div>
          </div>
          <MetricStrip
            className="mt-4"
            items={[
              { label: "Type checks", value: "Inline recovery" },
              { label: "Column inference", value: "Visible before editor" },
              { label: "Handoff", value: "Primary visualization draft" }
            ]}
          />
        </Card>

        <div className="space-y-4">
          <Card variant="subtle" title="Detected structure" description="The upload step previews the shape of data before users commit to editing.">
            <div className="space-y-3">
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Sheet selector</p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full border border-line-accent bg-surface-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-ink-1">
                    Acquisition
                  </span>
                  <span className="rounded-full border border-line-subtle px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-ink-3">
                    Overview
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Detected columns</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {mockDatasetPreview.columns.map((column) => (
                    <div key={column.key} className="rounded-md border border-line-subtle bg-surface-2 px-3 py-2 text-xs text-ink-2">
                      {column.name} - {column.type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <PreviewTable preview={mockDatasetPreview} />
        </div>
      </div>
    </div>
  );
}
