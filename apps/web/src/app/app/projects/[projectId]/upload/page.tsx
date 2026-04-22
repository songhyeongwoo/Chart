import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_MB } from "@mac/data";
import { Button, Card, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default async function UploadPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Upload flow"
        title="Dataset intake placeholder"
        description={`Project ${projectId} is ready for CSV/XLSX upload, parsing feedback, and dataset confirmation.`}
        actions={
          <>
            <StatusBadge label="No parsing yet" tone="draft" />
            <Link href={`/app/projects/${projectId}/editor`}>
              <Button>Continue to editor</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Dropzone placeholder" description="The visual contract for file intake is defined, but no upload processing is connected yet.">
          <div className="rounded-lg border border-dashed border-line-strong bg-[linear-gradient(180deg,rgba(255,255,252,0.7),rgba(244,239,232,0.92))] px-6 py-16 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-3">Accepted files</p>
            <h2 className="mt-4 font-display text-4xl text-ink-1">Drop CSV or XLSX here</h2>
            <p className="mt-3 text-sm text-ink-2">
              Files up to {MAX_FILE_SIZE_MB} MB. Supported extensions: {ACCEPTED_FILE_TYPES.join(", ")}.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="secondary">Choose file</Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-left">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Type checks</div>
                <div className="mt-2 text-sm text-ink-2">Unsupported formats stay in-step with recovery guidance.</div>
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-left">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Preview</div>
                <div className="mt-2 text-sm text-ink-2">Only sample rows should hydrate the next editor step.</div>
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-left">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Handoff</div>
                <div className="mt-2 text-sm text-ink-2">Confirmation routes into the editor with a primary visualization draft.</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Preview contract" description="This column reserves the validation and preview responsibilities of the upload step.">
          <div className="space-y-4 text-sm text-ink-2">
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Sheet selector</div>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full border border-line-strong bg-surface-1 px-3 py-1 text-xs text-ink-1">Acquisition</span>
                <span className="rounded-full border border-line-subtle px-3 py-1 text-xs text-ink-3">Overview</span>
              </div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Detected columns</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {["Month - string", "Signups - number", "Revenue - number", "Channel - string"].map((column) => (
                  <div key={column} className="rounded-md border border-line-subtle bg-surface-1 px-3 py-2 text-xs text-ink-2">
                    {column}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Preview table</div>
              <div className="mt-3 overflow-hidden rounded-md border border-line-subtle bg-surface-1">
                <div className="grid grid-cols-4 border-b border-line-subtle px-3 py-2 text-xs uppercase tracking-[0.14em] text-ink-3">
                  <span>Month</span>
                  <span>Signups</span>
                  <span>Revenue</span>
                  <span>Channel</span>
                </div>
                {[
                  ["Jan", "1240", "$18.4k", "Paid"],
                  ["Feb", "1710", "$23.2k", "Organic"],
                  ["Mar", "1980", "$28.5k", "Referral"]
                ].map((row) => (
                  <div key={row.join("-")} className="grid grid-cols-4 px-3 py-3 text-sm text-ink-2">
                    {row.map((cell) => (
                      <span key={cell}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">Unsupported file, empty file, and parse failure states live here later.</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
