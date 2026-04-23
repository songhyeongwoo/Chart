import { MVP_CHART_TYPES } from "@mac/domain";
import {
  Button,
  Card,
  MetricStrip,
  PlaceholderChart,
  PublicShell,
  SectionHeader,
  StatusBadge
} from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="grid gap-8 px-1 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:py-18">
        <div className="max-w-3xl">
          <p className="text-caption uppercase tracking-[0.28em] text-ink-3">No-code visualization workspace</p>
          <h2 className="mt-5 max-w-3xl font-display text-hero text-ink-1">
            Turn structured data into composed, presentation-ready charts.
          </h2>
          <p className="mt-6 max-w-2xl text-body text-ink-2">
            MAC is designed as a premium creative SaaS product: a no-code environment for shaping charts with calm,
            precise controls instead of brittle spreadsheets or overdesigned builders.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/app/projects">
              <Button size="lg">Open the product shell</Button>
            </Link>
            <Link href="/app/projects/proj_q1-growth/editor">
              <Button size="lg" variant="tertiary">
                View editor demo
              </Button>
            </Link>
          </div>
          <MetricStrip
            className="mt-8"
            items={[
              { label: "Chart set", value: `${MVP_CHART_TYPES.length} core types`, hint: "bar, line, area, scatter, donut, table" },
              { label: "Save model", value: "Manual first", hint: "Autosave intentionally deferred" },
              { label: "Privacy", value: "Private by default", hint: "Sharing stays outside MVP" }
            ]}
          />
        </div>

        <Card
          variant="canvas"
          title="A single language across marketing and product"
          description="The landing page uses the same surfaces, type rhythm, and restraint as the internal app shell."
        >
          <div className="grid gap-4 xl:grid-cols-[128px_1fr]">
            <div className="rounded-lg border border-line-subtle bg-surface-2 p-3">
              {MVP_CHART_TYPES.map((chartType, index) => (
                <div
                  key={chartType}
                  className={
                    index === 1
                      ? "mb-2 rounded-md border border-line-accent bg-surface-1 px-3 py-2 text-sm font-medium text-ink-1"
                      : "mb-2 rounded-md border border-transparent px-3 py-2 text-sm text-ink-3 last:mb-0"
                  }
                >
                  {chartType}
                </div>
              ))}
            </div>
            <div className="space-y-4 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(239,233,225,0.7))] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-caption uppercase tracking-[0.18em] text-ink-3">Live demo surface</p>
                  <h3 className="mt-2 text-title-2 font-semibold text-ink-1">Growth Momentum</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-2">A premium placeholder that still behaves like a product frame, not a hero gimmick.</p>
                </div>
                <StatusBadge label="Saved draft" tone="saved" withDot />
              </div>
              <PlaceholderChart chartType="line" heightClassName="h-[320px]" />
              <MetricStrip
                items={[
                  { label: "Dataset", value: "growth-q1.xlsx" },
                  { label: "Visualization", value: "Primary line chart" },
                  { label: "State", value: "Ready for re-entry" }
                ]}
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="pb-12 pt-8">
        <SectionHeader
          eyebrow="Why it feels different"
          title="Less dashboard noise. More editorial control."
          description="The product tone favors quiet confidence: clear hierarchy, dependable status feedback, and elegant defaults that make raw data look intentional."
          compact
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Upload without ceremony",
              description: "The intake step is direct, trusted, and structured around data confirmation rather than generic drag-and-drop theatrics."
            },
            {
              title: "A composed editing workspace",
              description: "The editor shows hierarchy immediately: project context on the left, preview in the middle, and inspector logic on the right."
            },
            {
              title: "Persistent project rhythm",
              description: "The hub, save model, and state language are built so repeated use feels calm and dependable."
            }
          ].map((feature) => (
            <Card key={feature.title} variant="subtle" title={feature.title} description={feature.description}>
              <p className="text-sm leading-6 text-ink-2">
                The current implementation keeps behavior mocked, but the interaction model and visual system are already aligned with the final product direction.
              </p>
            </Card>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
