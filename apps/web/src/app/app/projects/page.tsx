import { chartTypeLabelMap } from "@mac/charts";
import { mockProjects } from "../../../lib/mock-data";
import { Button, PlaceholderChart, StatusBadge } from "@mac/ui";
import Link from "next/link";

const saveStateLabelMap = {
  saved: "로컬 저장됨",
  unsaved: "변경 있음",
  draft: "초안"
} as const;

const saveStateToneMap = {
  saved: "saved",
  unsaved: "draft",
  draft: "neutral"
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(date));
}

export default function ProjectsPage() {
  const featuredProject = mockProjects[0];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 border-b border-line-subtle pb-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="brand-kicker">My Projects</p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(2.3rem,4vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-ink-1">
            다시 열 작업물이 먼저 보이는 허브
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink-2">
            저장된 시각화, 업로드 단계, 최근 수정 상태를 한 화면에서 확인하고 다음 편집으로 바로 진입합니다.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 sm:flex-row xl:flex-col">
          <Link href={`/app/projects/${featuredProject.id}/upload`}>
            <Button className="w-full">새 시각화 만들기</Button>
          </Link>
          <Link href="/app/projects/new">
            <Button className="w-full" variant="secondary">
              새 프로젝트
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <div className="rounded-[24px] border border-line-subtle bg-surface-1/88 px-4 py-4">
            <label className="text-[11px] uppercase tracking-[0.16em] text-ink-3" htmlFor="project-search">
              Search
            </label>
            <input
              id="project-search"
              className="mt-3 h-11 w-full rounded-md border border-line-subtle bg-surface-1 px-3 text-sm text-ink-1 outline-none focus:border-line-accent"
              placeholder="프로젝트 검색"
            />
          </div>
          <nav className="space-y-2">
            {["내 프로젝트", "최근 작업", "초안", "내보내기 가능"].map((item, index) => (
              <a
                key={item}
                href="#project-grid"
                className={
                  index === 0
                    ? "block rounded-md bg-accent px-4 py-3 text-sm font-medium text-ink-inverse"
                    : "block rounded-md border border-line-subtle bg-surface-1/72 px-4 py-3 text-sm text-ink-2 hover:border-line-strong hover:text-ink-1"
                }
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-6">
          <section className="grid gap-5 rounded-[28px] border border-line-strong bg-surface-1/94 p-5 shadow-panel xl:grid-cols-[minmax(0,1.2fr)_320px]">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="brand-kicker">Resume</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-ink-1">{featuredProject.name}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-2">
                    최근 저장된 캔버스와 inspector 상태를 유지한 채 에디터로 다시 들어갑니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={chartTypeLabelMap[featuredProject.chartType]} tone="live" />
                  <StatusBadge label={saveStateLabelMap[featuredProject.saveState]} tone={saveStateToneMap[featuredProject.saveState]} withDot />
                </div>
              </div>
              <div className="mt-5">
                <PlaceholderChart chartType={featuredProject.chartType} heightClassName="min-h-[430px]" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-[20px] border border-line-subtle bg-surface-2/68 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3">Dataset</p>
                <p className="mt-2 text-base font-semibold text-ink-1">{featuredProject.datasetName}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">최근 수정 {formatDate(featuredProject.updatedAt)}</p>
              </div>
              <Link href={`/app/projects/${featuredProject.id}/editor`}>
                <Button className="w-full">에디터 열기</Button>
              </Link>
              <Link href={`/app/projects/${featuredProject.id}/upload`}>
                <Button className="w-full" variant="secondary">
                  데이터 다시 확인
                </Button>
              </Link>
              <div className="mt-auto rounded-[20px] border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                PNG, JPG, SVG 내보내기는 정적 차트에서 준비되고, racing bar는 MP4/GIF 확장을 위한 UI만 먼저 잡아둡니다.
              </div>
            </div>
          </section>

          <section id="project-grid" className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="brand-kicker">Visualizations</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink-1">저장된 시각화</h2>
              </div>
              <select className="h-11 rounded-md border border-line-subtle bg-surface-1 px-3 text-sm text-ink-2">
                <option>최근 수정순</option>
                <option>차트 유형별</option>
                <option>초안만 보기</option>
              </select>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {mockProjects.map((project) => {
                const primaryHref = project.saveState === "draft" ? `/app/projects/${project.id}/upload` : `/app/projects/${project.id}/editor`;

                return (
                  <Link
                    key={project.id}
                    href={primaryHref}
                    className="group overflow-hidden rounded-[24px] border border-line-subtle bg-surface-1/92 shadow-soft transition hover:-translate-y-0.5 hover:border-line-strong"
                  >
                    <div className="h-[250px] overflow-hidden border-b border-line-subtle bg-surface-2/60 p-3">
                      <PlaceholderChart chartType={project.chartType} heightClassName="min-h-[220px]" />
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge label={chartTypeLabelMap[project.chartType]} tone="neutral" />
                        <StatusBadge label={saveStateLabelMap[project.saveState]} tone={saveStateToneMap[project.saveState]} withDot />
                      </div>
                      <h3 className="mt-3 truncate text-lg font-semibold tracking-[-0.035em] text-ink-1">{project.name}</h3>
                      <p className="mt-1 truncate text-sm text-ink-2">{project.datasetName}</p>
                      <p className="mt-3 text-xs text-ink-3">최근 수정 {formatDate(project.updatedAt)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
