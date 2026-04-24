import { chartTypeLabelMap } from "@mac/charts";
import { mockProjects } from "../../../lib/mock-data";
import { Button, Card, MetricStrip, PageHeader, PlaceholderChart, StatusBadge } from "@mac/ui";
import Link from "next/link";

const flowSteps = ["차트 선택", "데이터 입력", "옵션 조정", "결과 확인"];

const saveStateLabelMap = {
  saved: "저장됨",
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
        eyebrow="프로젝트 허브"
        title="다음 시각화를 바로 이어서 시작하는 작업 공간"
        description="최근 작업을 다시 열고, 새 프로젝트를 만들고, 업로드에서 에디터로 자연스럽게 들어가는 흐름을 한 화면 안에 정리했습니다."
        actions={
          <>
            <Link href="/app/projects/proj_q1-growth/upload">
              <Button variant="tertiary">샘플 데이터 보기</Button>
            </Link>
            <Link href="/app/projects/new">
              <Button>새 프로젝트 만들기</Button>
            </Link>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "최근 작업", value: `${mockProjects.length}개`, hint: "가장 최근 편집 순" },
          { label: "진입 흐름", value: "프로젝트 -> 업로드 -> 에디터", hint: "단계가 끊기지 않도록 설계" },
          { label: "저장 방식", value: "수동 저장", hint: "현재 단계에서는 의도적으로 단순화" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <Card
          variant="canvas"
          title="가장 최근 작업"
          description="허브에서 다시 들어왔을 때 어디서부터 이어야 하는지 바로 보이도록 구성했습니다."
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <StatusBadge label={chartTypeLabelMap[featuredProject.chartType]} tone="live" />
                <StatusBadge label="비공개 프로젝트" tone="private" />
              </div>
              <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={`/app/projects/${featuredProject.id}/editor`}>
                편집 이어서 열기
              </Link>
            </div>
          }
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(239,233,225,0.8))] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-caption uppercase tracking-[0.18em] text-ink-3">다음으로 열릴 프로젝트</p>
                  <h2 className="mt-2 text-title-2 font-semibold text-ink-1">{featuredProject.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-2">
                    업로드를 끝낸 뒤 차트 유형과 설정을 다듬는 중심 작업이 바로 이어지도록, 최근 작업의 다음 액션을 카드 안에 함께 보여줍니다.
                  </p>
                </div>
                <StatusBadge label={saveStateLabelMap[featuredProject.saveState]} tone={saveStateToneMap[featuredProject.saveState]} withDot />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {flowSteps.map((step, index) => (
                  <span
                    key={step}
                    className={
                      index === 2
                        ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-1"
                        : "rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3"
                    }
                  >
                    {index + 1}. {step}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <PlaceholderChart chartType={featuredProject.chartType} heightClassName="h-[260px]" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">데이터</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{featuredProject.datasetName}</p>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">차트</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{chartTypeLabelMap[featuredProject.chartType]}</p>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">다음 단계</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">옵션 조정 이어서</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Card variant="subtle" padding="compact" title="현재 다음 액션">
                <p className="text-sm leading-6 text-ink-2">최근 작업은 에디터에서 다시 열고, 아직 초안인 프로젝트는 업로드 단계부터 이어서 시작할 수 있게 분기합니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/editor`}>
                  <Button className="mt-4 w-full">편집 이어서 열기</Button>
                </Link>
              </Card>

              <Card variant="subtle" padding="compact" title="업로드에서 이어 열기">
                <p className="text-sm leading-6 text-ink-2">파일부터 다시 확인하고 싶다면 업로드 화면으로 돌아가 같은 프로젝트 안에서 이어집니다.</p>
                <Link href={`/app/projects/${featuredProject.id}/upload`}>
                  <Button className="mt-4 w-full" variant="tertiary">
                    데이터 입력으로 이동
                  </Button>
                </Link>
              </Card>

              <Card variant="subtle" padding="compact" title="제품 언어">
                <p className="text-sm leading-6 text-ink-2">
                  데이터 전문가가 아니어도 이해할 수 있는 표현으로 단계와 상태를 안내합니다. 메뉴 이름도 기능 중심이 아니라 작업 흐름 중심으로 정리했습니다.
                </p>
              </Card>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card variant="subtle" title="새 시각화 시작" description="설명보다 작업이 먼저 보이도록, 진입 경로를 단순하게 잡았습니다.">
            <div className="space-y-3">
              {[
                {
                  title: "1. 프로젝트 이름 정하기",
                  description: "길게 설정하지 않고 이름과 기본 목적만 정한 뒤 바로 데이터 입력으로 넘어갑니다."
                },
                {
                  title: "2. 데이터 입력하기",
                  description: "CSV/XLSX를 올리고 표본 데이터를 확인한 다음, 차트 추천과 함께 에디터로 이동합니다."
                },
                {
                  title: "3. 에디터에서 다듬기",
                  description: "차트 선택, 데이터 연결, 옵션 조정, 결과 확인이 같은 화면 안에서 이어집니다."
                }
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                  <p className="text-sm font-medium text-ink-1">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{item.description}</p>
                </div>
              ))}
              <Link href="/app/projects/new">
                <Button className="w-full" size="lg">
                  프로젝트 만들고 시작하기
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="subtle" title="허브에서 개선한 기준" description="처음 들어온 사용자도 다음 행동이 한눈에 보여야 합니다.">
            <div className="space-y-3 text-sm leading-6 text-ink-2">
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">최근 작업은 바로 열기, 초안은 업로드 재진입, 새 작업은 새 프로젝트로 명확히 분기합니다.</div>
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">차트 이름보다 프로젝트의 현재 단계와 다음 액션을 먼저 보여줍니다.</div>
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">허브가 랜딩 카드 모음처럼 보이지 않도록, 실제 작업 맥락 중심의 정보만 남겼습니다.</div>
            </div>
          </Card>
        </div>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-3">최근 수정 {formatDate(project.updatedAt)}</span>
                  <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href={primaryHref}>
                    {project.saveState === "draft" ? "업로드 이어서" : "에디터 열기"}
                  </Link>
                </div>
              }
            >
              <div className="flex items-center justify-between">
                <StatusBadge label={saveStateLabelMap[project.saveState]} tone={saveStateToneMap[project.saveState]} withDot />
                <StatusBadge label="비공개" tone="private" />
              </div>
              <div className="mt-5">
                <PlaceholderChart chartType={project.chartType} heightClassName="h-[156px]" />
              </div>
              <div className="mt-4 rounded-md border border-line-subtle bg-surface-2 px-4 py-3 text-sm leading-6 text-ink-2">
                {project.saveState === "draft"
                  ? "아직 데이터 확인 단계입니다. 업로드에서 표본과 열 구성을 먼저 확인합니다."
                  : "에디터에서 제목, 범례, 축, 레이아웃을 이어서 다듬을 수 있습니다."}
              </div>
            </Card>
          );
        })}
      </div>

      <Card
        variant="subtle"
        title="첫 프로젝트 사용자도 같은 흐름으로 들어옵니다"
        description="비어 있는 상태를 따로 분리하지 않고, 이 허브 자체가 첫 진입과 재진입을 모두 처리하도록 구성했습니다."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-sm leading-6 text-ink-2">
            이후 실제 persistence가 연결되면, 최근 작업 카드만 비워진 채 같은 구조를 유지한 채 `새 프로젝트 만들기`와 샘플 데이터 시작만 더 강조하면 됩니다.
          </p>
          <Link href="/app/projects/new">
            <Button variant="secondary">첫 프로젝트 흐름 보기</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
