import { MVP_CHART_TYPES, PRODUCT_NAME } from "@mac/domain";
import { Button, Card, PublicShell, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";

const featureCards = [
  {
    title: "Upload to first chart",
    description: "A premium no-code path from CSV/XLSX input to polished chart scaffolds."
  },
  {
    title: "One unified system",
    description: "Landing, dashboard, upload flow, and editor all share the same visual language."
  },
  {
    title: "Save and re-entry",
    description: "Projects remain private by default and reopen into the same saved visualization state."
  }
];

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="grid gap-8 px-2 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-3">No-code visualization workspace</p>
          <h2 className="mt-5 font-display text-6xl leading-[0.95] text-ink-1 md:text-7xl">
            Build refined charts from raw data without leaving the creative flow.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-2">
            {PRODUCT_NAME} is scaffolded as a premium data visualization product: upload structured data, shape a chart
            in a focused editor, and come back to the same saved project later.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/app/projects">
              <Button>Get started</Button>
            </Link>
            <Link href="/app/projects/proj_q1-growth/editor">
              <Button variant="secondary">View editor demo</Button>
            </Link>
            <StatusBadge label="Private by default" tone="private" />
          </div>
        </div>

        <Card className="overflow-hidden bg-surface-1/95">
          <div className="grid gap-4 md:grid-cols-[120px_1fr]">
            <div className="space-y-3 rounded-md border border-line-subtle bg-surface-2 p-4">
              {MVP_CHART_TYPES.map((chartType, index) => (
                <div
                  key={chartType}
                  className={
                    index === 1
                      ? "rounded-md border border-line-strong bg-surface-1 px-3 py-2 text-sm font-medium text-ink-1"
                      : "rounded-md border border-transparent px-3 py-2 text-sm text-ink-3"
                  }
                >
                  {chartType}
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,255,252,0.96),rgba(244,239,232,0.86))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3">Preview</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink-1">Growth Momentum</h3>
                </div>
                <StatusBadge label="Saved draft" tone="saved" />
              </div>
              <div className="mt-6 grid h-72 grid-cols-6 items-end gap-3 rounded-md border border-line-subtle bg-surface-1 px-6 pb-6 pt-10">
                {[28, 36, 42, 54, 63, 76].map((height, index) => (
                  <div
                    key={height}
                    className="rounded-t-md bg-accent/85"
                    style={{
                      height: `${height}%`,
                      opacity: 0.72 + index * 0.04
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Dataset</div>
                  <div className="mt-2 text-sm font-medium text-ink-1">growth-q1.xlsx</div>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Visualization</div>
                  <div className="mt-2 text-sm font-medium text-ink-1">Line · Primary</div>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Save model</div>
                  <div className="mt-2 text-sm font-medium text-ink-1">Manual only</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 pb-10 md:grid-cols-3">
        {featureCards.map((card) => (
          <Card key={card.title} title={card.title} description={card.description}>
            <p className="text-sm leading-6 text-ink-2">
              Placeholder-first scaffold so architecture, shell, and UI language are stable before backend and chart
              behavior land.
            </p>
          </Card>
        ))}
      </section>
    </PublicShell>
  );
}
