import { chartTypeOptions } from "@mac/charts";
import { mockEditorSession } from "../../../../../lib/mock-data";
import { Button, Card, EditorShell, RightInspectorShell, StatusBadge, TopBar } from "@mac/ui";

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <EditorShell
      topBar={
        <TopBar
          title="Editor workspace"
          subtitle={`${projectId} - ${mockEditorSession.visualization?.title ?? "Untitled visualization"}`}
          actions={
            <>
              <StatusBadge label="Private project" tone="private" />
              <StatusBadge label="Manual save only" tone="private" />
              <StatusBadge label="Unsaved changes placeholder" tone="draft" />
              <Button>Save</Button>
            </>
          }
        />
      }
      rail={
        <Card title="Chart types" description="Primary visualization remains singular in the MVP UI, but chart type switching is preserved.">
          <div className="space-y-2">
            {chartTypeOptions.map((option) => (
              <div
                key={option.value}
                className={
                  option.value === mockEditorSession.visualization?.chartType
                    ? "rounded-md border border-line-strong bg-surface-2 px-3 py-3"
                    : "rounded-md border border-line-subtle px-3 py-3"
                }
              >
                <div className="text-sm font-medium text-ink-1">{option.label}</div>
                <div className="mt-1 text-xs leading-5 text-ink-3">{option.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-line-subtle bg-surface-2 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Project data</div>
            <div className="mt-3 space-y-2 text-sm text-ink-2">
              <div className="flex items-center justify-between">
                <span>Dataset</span>
                <span className="font-medium text-ink-1">{mockEditorSession.dataset?.fileName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rows</span>
                <span className="font-medium text-ink-1">3 previewed</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mode</span>
                <span className="font-medium text-ink-1">Primary visualization</span>
              </div>
            </div>
          </div>
        </Card>
      }
      canvas={
        <Card
          title="Preview canvas placeholder"
          description="Real chart rendering is intentionally excluded. This panel validates the editor composition and canvas affordances."
        >
          <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,255,252,0.9),rgba(244,239,232,0.85))] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-3">Dataset</p>
                <h3 className="mt-2 text-xl font-semibold text-ink-1">{mockEditorSession.dataset?.fileName}</h3>
              </div>
              <StatusBadge label={mockEditorSession.visualization?.chartType ?? "line"} tone="live" />
            </div>
            <div className="mt-6 grid h-[420px] grid-cols-6 items-end gap-4 rounded-md border border-line-subtle bg-surface-1 px-8 pb-10 pt-12">
              {[32, 45, 41, 63, 58, 76].map((height, index) => (
                <div
                  key={height}
                  className="rounded-t-md bg-accent"
                  style={{
                    height: `${height}%`,
                    opacity: 0.62 + index * 0.05
                  }}
                />
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm text-ink-2">
                Binding slots placeholder
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm text-ink-2">
                Axis and legend preview placeholder
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm text-ink-2">
                Save state feedback placeholder
              </div>
            </div>
          </div>
        </Card>
      }
      inspector={
        <RightInspectorShell>
          <div className="space-y-3">
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-sm font-medium text-ink-1">Data mapping</div>
              <div className="mt-2 text-sm text-ink-2">x: month, y: signups, color: region</div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-sm font-medium text-ink-1">Style controls</div>
              <div className="mt-2 text-sm text-ink-2">Palette, typography, density, and surface treatment placeholders.</div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-sm font-medium text-ink-1">Axes and layout</div>
              <div className="mt-2 text-sm text-ink-2">Scale, ticks, legend, labels, and spacing tabs reserve their final structure here.</div>
            </div>
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
              <div className="text-sm font-medium text-ink-1">Save contract</div>
              <div className="mt-2 text-sm text-ink-2">Local preview changes are immediate. Persistence is intentionally not connected in this demo shell.</div>
            </div>
          </div>
        </RightInspectorShell>
      }
    />
  );
}
