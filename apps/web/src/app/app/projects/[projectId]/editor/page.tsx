import { chartTypeOptions } from "@mac/charts";
import { mockEditorSession } from "../../../../../lib/mock-data";
import {
  Button,
  Card,
  EditorShell,
  MetricStrip,
  PlaceholderChart,
  RightInspectorShell,
  StatusBadge,
  TopBar
} from "@mac/ui";

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <EditorShell
      topBar={
        <TopBar
          title="Primary visualization workspace"
          subtitle={`${projectId} - ${mockEditorSession.visualization?.title ?? "Untitled visualization"}`}
          actions={
            <>
              <StatusBadge label="Private project" tone="private" />
              <StatusBadge label="Unsaved draft" tone="draft" withDot />
              <Button variant="tertiary">Preview share state</Button>
              <Button>Save changes</Button>
            </>
          }
        />
      }
      rail={
        <>
          <Card variant="subtle" title="Project context" description="The left rail carries stable context rather than secondary feature noise.">
            <div className="space-y-3">
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Dataset</p>
                <p className="mt-2 text-sm font-medium text-ink-1">{mockEditorSession.dataset?.fileName}</p>
              </div>
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Sheet</p>
                <p className="mt-2 text-sm font-medium text-ink-1">{mockEditorSession.dataset?.sheetName}</p>
              </div>
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Mode</p>
                <p className="mt-2 text-sm font-medium text-ink-1">Primary visualization</p>
              </div>
            </div>
          </Card>
          <Card variant="default" title="Chart types" description="Switching remains direct and legible, even in placeholder mode.">
            <div className="space-y-2">
              {chartTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={
                    option.value === mockEditorSession.visualization?.chartType
                      ? "rounded-md border border-line-accent bg-surface-2 px-3 py-3"
                      : "rounded-md border border-line-subtle px-3 py-3"
                  }
                >
                  <div className="text-sm font-medium text-ink-1">{option.label}</div>
                  <div className="mt-1 text-xs leading-5 text-ink-3">{option.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      }
      canvas={
        <Card
          variant="canvas"
          title="Preview canvas"
          description="Rendering remains mocked, but layout, spacing, hierarchy, and state design should already feel launch-ready."
        >
          <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.92),rgba(239,233,225,0.76))] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-caption uppercase tracking-[0.18em] text-ink-3">Dataset</p>
                <h3 className="mt-2 text-title-2 font-semibold text-ink-1">{mockEditorSession.dataset?.fileName}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  The central preview should read like a working document, not a collection of demo boxes.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={mockEditorSession.visualization?.chartType ?? "line"} tone="live" />
                <StatusBadge label="Manual save" tone="neutral" />
              </div>
            </div>
            <div className="mt-6">
              <PlaceholderChart chartType={mockEditorSession.visualization?.chartType} heightClassName="h-[420px]" />
            </div>
            <MetricStrip
              className="mt-5"
              items={[
                { label: "Bindings", value: "month -> signups" },
                { label: "Style", value: "Editorial default" },
                { label: "State", value: "Unsaved local draft" }
              ]}
            />
          </div>
        </Card>
      }
      inspector={
        <RightInspectorShell>
          <Card variant="subtle" padding="compact" title="Data mapping">
            <p className="text-sm leading-6 text-ink-2">x: month, y: signups, color: region. Semantic slots remain visible even before real forms are connected.</p>
          </Card>
          <Card variant="subtle" padding="compact" title="Style controls">
            <p className="text-sm leading-6 text-ink-2">Palette, typography, density, stroke, and surface treatments live here with the same visual discipline as the rest of the product.</p>
          </Card>
          <Card variant="subtle" padding="compact" title="Axes and layout">
            <p className="text-sm leading-6 text-ink-2">Scale, ticks, legend, labels, and spacing tabs reserve their final structure without feeling like raw scaffolding.</p>
          </Card>
          <Card variant="subtle" padding="compact" title="Save contract">
            <p className="text-sm leading-6 text-ink-2">Local preview changes are immediate. Persistence is intentionally not connected yet, but the save/status language is already defined.</p>
          </Card>
        </RightInspectorShell>
      }
    />
  );
}
