import { chartTypeLabelMap } from "@mac/charts";
import { mockProjects } from "../../../lib/mock-data";
import { Button, MetricStrip, PageHeader, PlaceholderChart, StatusBadge } from "@mac/ui";
import Link from "next/link";

const saveStateLabelMap = {
  saved: "로컬 저장됨",
  unsaved: "저장 전 변경 있음",
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
      <PageHeader
        eyebrow="Project Hub"
        title="다음 작업이 바로 보이는 프로젝트 허브"
        description="최근 결과물을 다시 열고, 업로드 단계로 돌아가고, 새 차트를 시작하는 흐름을 카드 묶음이 아니라 작업 재진입 장면으로 정리합니다."
        actions={
          <>
            <Link href={`/app/projects/${featuredProject.id}/upload`}>
              <Button variant="secondary">데이터 입력 보기</Button>
            </Link>
            <Link href="/app/projects/new">
              <Button>새 프로젝트 시작</Button>
            </Link>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "최근 프로젝트", value: `${mockProjects.length}개`, hint: "다시 열기와 신규 시작을 한 화면에서 정리" },
          { label: "작업 흐름", value: "프로젝트 → 업로드 → 에디터", hint: "중간 화면이 비지 않게 연결" },
          { label: "핵심 기준", value: "결과물 우선", hint: "메뉴보다 차트와 다음 행동이 먼저 보이도록 구성" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
        <section className="workspace-shell overflow-hidden rounded-[34px] border border-line-strong px-5 py-5 shadow-panel md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/70 pb-5">
            <div>
              <p className="brand-kicker">Resume Project</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-ink-1">{featuredProject.name}</h2>
              <p className="mt-3 max-w-[42rem] text-body leading-7 text-ink-2">
                업로드에서 연결된 데이터 구조와 편집 상태를 유지한 채, 가장 먼저 결과물 캔버스가 보이는 화면으로 다시 진입합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={chartTypeLabelMap[featuredProject.chartType]} tone="live" />
              <StatusBadge label={saveStateLabelMap[featuredProject.saveState]} tone={saveStateToneMap[featuredProject.saveState]} withDot />
              <StatusBadge label="비공개" tone="private" />
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-[28px] border border-line-strong/75 bg-surface-1/96 px-5 py-5 shadow-soft">
              <PlaceholderChart chartType={featuredProject.chartType} heightClassName="h-[420px]" />
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-line-subtle bg-surface-1/92 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Current Dataset</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-ink-1">{featuredProject.datasetName}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">최근 저장 스냅샷이 유지된 상태로 다시 들어갈 수 있습니다.</p>
              </div>

              <div className="rounded-[24px] border border-line-subtle bg-surface-1/92 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Next Action</p>
                <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-ink-1">에디터에서 바로 이어서 편집</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">제목, 라벨, 범례, 레이아웃을 마지막 상태에서 이어갑니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/editor`}>
                  <Button className="mt-4 w-full">에디터 열기</Button>
                </Link>
              </div>

              <div className="rounded-[24px] border border-line-subtle bg-surface-2/78 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Back To Upload</p>
                <p className="mt-2 text-sm font-medium text-ink-1">파일 구조와 추천 후보 다시 보기</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">데이터 확인 단계부터 다시 점검한 뒤 편집기로 넘길 수 있습니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/upload`}>
                  <Button className="mt-4 w-full" variant="tertiary">
                    데이터 입력으로 이동
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="brand-panel-strong overflow-hidden px-5 py-5">
          <p className="brand-kicker">Quick Start</p>
          <h3 className="mt-2 text-[1.6rem] font-semibold tracking-[-0.045em] text-ink-1">새 작업은 짧고 명확하게 시작</h3>
          <p className="mt-3 text-sm leading-6 text-ink-2">처음 들어온 사람도 어디서 출발하면 되는지 바로 이해할 수 있어야 합니다.</p>

          <div className="mt-6 space-y-3">
            {[
              ["프로젝트 이름 정하기", "최소한의 맥락만 정하고 바로 업로드 단계로 넘어갑니다."],
              ["데이터 확인하기", "열 구조와 표본 행을 보고 추천 차트 초안을 받습니다."],
              ["차트 편집 시작", "제목, 라벨, 범례, 축, 밀도, 비율을 한 화면에서 조정합니다."]
            ].map(([title, description], index) => (
              <div
                key={title}
                className={
                  index === 1
                    ? "rounded-[24px] border border-line-accent bg-surface-1 px-4 py-4 shadow-soft"
                    : "rounded-[24px] border border-line-subtle bg-surface-1/92 px-4 py-4"
                }
              >
                <p className="text-sm font-medium text-ink-1">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">{description}</p>
              </div>
            ))}
          </div>

          <Link href="/app/projects/new">
            <Button className="mt-5 w-full" size="lg">
              새 프로젝트 만들기
            </Button>
          </Link>
        </section>
      </div>

      <section className="brand-panel overflow-hidden px-5 py-5 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-subtle/70 pb-4">
          <div>
            <p className="brand-kicker">Recent Entries</p>
            <h3 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-ink-1">최근 프로젝트 목록</h3>
          </div>
          <p className="text-sm text-ink-2">카드 반복 대신 상태와 다음 행동이 한 줄에서 읽히도록 압축했습니다.</p>
        </div>

        <div className="mt-4 space-y-3">
          {mockProjects.map((project) => {
            const primaryHref = project.saveState === "draft" ? `/app/projects/${project.id}/upload` : `/app/projects/${project.id}/editor`;

            return (
              <div key={project.id} className="grid gap-3 rounded-[24px] border border-line-subtle bg-surface-1/90 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold tracking-[-0.03em] text-ink-1">{project.name}</p>
                    <StatusBadge label={chartTypeLabelMap[project.chartType]} tone="neutral" />
                    <StatusBadge label={saveStateLabelMap[project.saveState]} tone={saveStateToneMap[project.saveState]} withDot />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{project.datasetName} · 최근 수정 {formatDate(project.updatedAt)}</p>
                </div>
                <Link href={primaryHref}>
                  <Button variant="tertiary">{project.saveState === "draft" ? "업로드 이어서" : "에디터 열기"}</Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
