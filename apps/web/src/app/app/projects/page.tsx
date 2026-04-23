import { mockProjects } from "../../../lib/mock-data";
import {
  Button,
  Card,
  EmptyState,
  MetricStrip,
  PageHeader,
  PlaceholderChart,
  StatusBadge
} from "@mac/ui";
import Link from "next/link";

export default function ProjectsPage() {
  const featuredProject = mockProjects[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Project hub"
        title="Recent projects"
        description="The hub should make repeat work feel inevitable: clear re-entry, visible next actions, and a graceful first-run state."
        actions={
          <>
            <Button variant="tertiary">Import later</Button>
            <Link href="/app/projects/new">
              <Button>Create project</Button>
            </Link>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "Recent projects", value: String(mockProjects.length) },
          { label: "Primary model", value: "1 visualization / project" },
          { label: "Save contract", value: "Manual only" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card
          variant="canvas"
          title={featuredProject.name}
          description="Featured recent project"
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <StatusBadge label="Primary visualization" tone="live" />
                <StatusBadge label="Private" tone="private" />
              </div>
              <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={`/app/projects/${featuredProject.id}/editor`}>
                Resume editing
              </Link>
            </div>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(239,233,225,0.8))] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-caption uppercase tracking-[0.18em] text-ink-3">Latest canvas</p>
                  <h2 className="mt-2 text-title-2 font-semibold text-ink-1">{featuredProject.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-2">A calm re-entry surface for the work users most likely want to continue.</p>
                </div>
                <StatusBadge label={featuredProject.chartType} tone="saved" withDot />
              </div>
              <div className="mt-6">
                <PlaceholderChart chartType={featuredProject.chartType} heightClassName="h-[260px]" />
              </div>
            </div>
            <div className="space-y-3">
              <Card variant="subtle" padding="compact" title="Dataset">
                <p className="text-sm text-ink-1">{featuredProject.datasetName}</p>
              </Card>
              <Card variant="subtle" padding="compact" title="Last updated">
                <p className="text-sm text-ink-1">{new Date(featuredProject.updatedAt).toLocaleDateString()}</p>
              </Card>
              <Card variant="subtle" padding="compact" title="Project state">
                <div className="flex items-center gap-2">
                  <StatusBadge label={featuredProject.saveState} tone="saved" />
                  <StatusBadge label="Ready to reopen" tone="neutral" />
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Card variant="subtle" title="Create another project" description="The hub keeps the next action obvious without turning into a marketing dashboard.">
          <div className="space-y-3">
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              Start from upload, inspect a dataset, and land directly in the primary visualization workspace.
            </div>
            <Link href="/app/projects/new">
              <Button className="w-full" size="lg">
                Create project
              </Button>
            </Link>
            <Link href="/app/projects/proj_q1-growth/upload">
              <Button className="w-full" variant="tertiary" size="lg">
                Preview upload flow
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            variant="default"
            title={project.name}
            description={`${project.chartType} chart · ${project.datasetName}`}
            footer={
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-3">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={`/app/projects/${project.id}/editor`}>
                  Open
                </Link>
              </div>
            }
          >
            <div className="flex items-center justify-between">
              <StatusBadge
                label={project.saveState === "saved" ? "Saved" : project.saveState === "unsaved" ? "Unsaved" : "Draft"}
                tone={project.saveState === "saved" ? "saved" : "draft"}
                withDot
              />
              <StatusBadge label="Private" tone="private" />
            </div>
            <div className="mt-5">
              <PlaceholderChart chartType={project.chartType} heightClassName="h-[156px]" />
            </div>
          </Card>
        ))}
      </div>

      <EmptyState
        eyebrow="First-run state"
        title="The zero-project experience is already designed as part of the hub."
        description="Once persistence is connected, this same layout can become the entry state for new users without introducing a different visual language."
        action={
          <Link href="/app/projects/new">
            <Button variant="secondary">Preview first-run CTA</Button>
          </Link>
        }
        secondaryAction={<Button variant="ghost">See empty-state rules</Button>}
      />
    </div>
  );
}
