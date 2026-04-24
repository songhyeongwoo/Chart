import { chartTypeLabelMap } from "@mac/charts";
import { mockProjects } from "../../../lib/mock-data";
import { Button, Card, MetricStrip, PageHeader, PlaceholderChart, StatusBadge } from "@mac/ui";
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
        description="최근 작업을 다시 열고, 업로드 단계로 돌아가고, 새 차트를 시작하는 흐름을 하나의 화면 안에서 정리합니다."
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
          { label: "최근 프로젝트", value: `${mockProjects.length}개`, hint: "재진입과 신규 시작을 한 화면에서 관리" },
          { label: "작업 흐름", value: "프로젝트 → 업로드 → 에디터", hint: "중간 화면이 비지 않게 연결" },
          { label: "핵심 기준", value: "차트 결과물 중심", hint: "메뉴보다 작업 맥락이 먼저 보이도록 구성" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)]">
        <Card
          variant="canvas"
          className="overflow-hidden"
          title="계속 작업할 프로젝트"
          description="가장 최근 작업을 카드가 아니라 실제 결과물 프레임에 가깝게 보여줍니다."
        >
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
            <div className="rounded-xl border border-line-strong bg-surface-1 p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/80 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Resume</p>
                  <h2 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.04em] text-ink-1">{featuredProject.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-2">
                    업로드에서 가져온 데이터 구조와 편집 설정이 이어진 상태로 다시 진입할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={chartTypeLabelMap[featuredProject.chartType]} tone="live" />
                  <StatusBadge label={saveStateLabelMap[featuredProject.saveState]} tone={saveStateToneMap[featuredProject.saveState]} withDot />
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-line-subtle bg-surface-2/72 p-4">
                <PlaceholderChart chartType={featuredProject.chartType} heightClassName="h-[300px]" />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Dataset</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{featuredProject.datasetName}</p>
                </div>
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Chart</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{chartTypeLabelMap[featuredProject.chartType]}</p>
                </div>
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Next</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">편집 계속</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Card variant="subtle" padding="compact" title="바로 이어서 편집">
                <p className="text-sm leading-6 text-ink-2">현재 차트 상태와 로컬 저장 스냅샷을 유지한 채 에디터로 돌아갑니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/editor`}>
                  <Button className="mt-4 w-full">에디터 열기</Button>
                </Link>
              </Card>

              <Card variant="subtle" padding="compact" title="업로드 단계 다시 보기">
                <p className="text-sm leading-6 text-ink-2">파일 구조와 추천 차트 후보를 다시 확인한 뒤 편집기로 넘길 수 있습니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/upload`}>
                  <Button className="mt-4 w-full" variant="tertiary">
                    데이터 입력으로 이동
                  </Button>
                </Link>
              </Card>

              <Card variant="subtle" padding="compact" title="제품 톤">
                <p className="text-sm leading-6 text-ink-2">
                  허브는 관리 페이지가 아니라 작업 재진입 허브처럼 보여야 합니다. 그래서 숫자보다 현재 결과물과 다음 행동이 먼저
                  보이도록 정리했습니다.
                </p>
              </Card>
            </div>
          </div>
        </Card>

        <Card
          variant="subtle"
          title="새 작업 시작"
          description="처음 들어온 사람도 지금 어디서 출발하면 되는지 바로 이해할 수 있어야 합니다."
        >
          <div className="space-y-3">
            {[
              {
                title: "프로젝트 이름 정하기",
                description: "최소한의 맥락만 정하고 바로 업로드 단계로 넘어갑니다."
              },
              {
                title: "데이터 확인하기",
                description: "열 구조와 표본 행을 보고 차트 추천 초안을 받습니다."
              },
              {
                title: "차트 편집 시작",
                description: "제목, 라벨, 범례, 축, 밀도, 비율을 한 화면에서 조정합니다."
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className={index === 1 ? "rounded-xl border border-line-accent bg-surface-1 px-4 py-4" : "rounded-xl border border-line-subtle bg-surface-1 px-4 py-4"}
              >
                <p className="text-sm font-medium text-ink-1">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">{item.description}</p>
              </div>
            ))}
            <Link href="/app/projects/new">
              <Button className="mt-2 w-full" size="lg">
                새 프로젝트 만들기
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {mockProjects.map((project) => {
          const primaryHref =
            project.saveState === "draft" ? `/app/projects/${project.id}/upload` : `/app/projects/${project.id}/editor`;

          return (
            <Card
              key={project.id}
              variant="default"
              title={project.name}
              description={`${chartTypeLabelMap[project.chartType]} · ${project.datasetName}`}
              footer={
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink-3">최근 수정 {formatDate(project.updatedAt)}</span>
                  <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={primaryHref}>
                    {project.saveState === "draft" ? "업로드 이어서" : "에디터 열기"}
                  </Link>
                </div>
              }
            >
              <div className="flex items-center justify-between gap-3">
                <StatusBadge label={saveStateLabelMap[project.saveState]} tone={saveStateToneMap[project.saveState]} withDot />
                <StatusBadge label="비공개" tone="private" />
              </div>
              <div className="mt-5 rounded-xl border border-line-subtle bg-surface-2/72 p-3">
                <PlaceholderChart chartType={project.chartType} heightClassName="h-[180px]" />
              </div>
              <div className="mt-4 rounded-xl border border-line-subtle bg-surface-2/72 px-4 py-3 text-sm leading-6 text-ink-2">
                {project.saveState === "draft"
                  ? "아직 업로드와 구조 확인 단계에 머물러 있습니다. 차트 추천 이후 에디터로 연결할 수 있습니다."
                  : "차트 편집 상태가 잡혀 있어 제목, 라벨, 범례, 레이아웃을 바로 이어서 다듬을 수 있습니다."}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
