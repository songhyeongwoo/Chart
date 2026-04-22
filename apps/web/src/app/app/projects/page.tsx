import { mockProjects } from "../../../lib/mock-data";
import { Button, Card, EmptyState, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default function ProjectsPage() {
  const featuredProject = mockProjects[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Project hub"
        title="Recent projects"
        description="Placeholder data is used here to validate the app shell, list rhythm, and re-entry affordances before real persistence lands."
        actions={
          <>
            <Button variant="secondary">Import later</Button>
            <Link href="/app/projects/new">
              <Button>Create project</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card
          title={featuredProject.name}
          description="Featured recent project demo"
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
            <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,255,252,0.98),rgba(244,239,232,0.85))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3">Latest canvas</p>
                  <h2 className="mt-2 text-2xl font-semibold text-ink-1">{featuredProject.name}</h2>
                </div>
                <StatusBadge label={featuredProject.chartType} tone="saved" />
              </div>
              <div className="mt-6 grid h-60 grid-cols-6 items-end gap-3 rounded-md border border-line-subtle bg-surface-1 px-6 pb-6 pt-10">
                {[28, 40, 38, 55, 71, 67].map((height, index) => (
                  <div
                    key={height}
                    className="rounded-t-md bg-accent"
                    style={{ height: `${height}%`, opacity: 0.62 + index * 0.04 }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Dataset</div>
                <div className="mt-2 text-sm font-medium text-ink-1">{featuredProject.datasetName}</div>
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Last updated</div>
                <div className="mt-2 text-sm font-medium text-ink-1">
                  {new Date(featuredProject.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="rounded-md border border-line-subtle bg-surface-2 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-ink-3">Save model</div>
                <div className="mt-2 text-sm font-medium text-ink-1">Manual save only</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Create another project" description="The first-run and repeat-create CTA should stay visible inside the hub.">
          <div className="space-y-3">
            <div className="rounded-md border border-line-subtle bg-surface-2 p-4 text-sm leading-6 text-ink-2">
              Start a new project, upload a CSV/XLSX file, then move directly into the editor scaffold.
            </div>
            <Link href="/app/projects/new">
              <Button className="w-full">Create project</Button>
            </Link>
            <Link href="/app/projects/proj_q1-growth/upload">
              <Button className="w-full" variant="secondary">
                Jump to upload demo
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            title={project.name}
            description={`${project.chartType} chart · ${project.datasetName}`}
            footer={
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-3">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={`/app/projects/${project.id}/editor`}>
                  Open project
                </Link>
              </div>
            }
          >
            <div className="flex items-center justify-between">
              <StatusBadge
                label={project.saveState === "saved" ? "Saved" : project.saveState === "unsaved" ? "Unsaved" : "Draft"}
                tone={project.saveState === "saved" ? "saved" : "draft"}
              />
              <StatusBadge label="Private" tone="private" />
            </div>
            <div className="mt-5 grid h-32 grid-cols-5 items-end gap-2 rounded-md border border-line-subtle bg-surface-2 p-4">
              {[34, 52, 47, 68, 61].map((height, index) => (
                <div
                  key={height}
                  className="rounded-t-sm bg-accent"
                  style={{ height: `${height}%`, opacity: 0.6 + index * 0.08 }}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <EmptyState
        eyebrow="Empty state placeholder"
        title="A polished zero-project state is already part of the shell."
        description="Once real persistence is added, this exact composition can become the first-run experience for new users entering the project hub."
        action={
          <Link href="/app/projects/new">
            <Button variant="secondary">Preview first-run CTA</Button>
          </Link>
        }
      />
    </div>
  );
}
