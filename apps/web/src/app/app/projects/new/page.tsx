import { PRODUCT_DEFAULTS } from "@mac/domain";
import { Button, Card, Input, MetricStrip, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="New Project"
        title="프로젝트 이름을 정하고 바로 업로드로 넘어갑니다"
        description="복잡한 생성 폼을 펼치기보다, 첫 시각화를 빨리 만드는 리듬을 유지하는 것이 더 중요합니다."
        actions={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button>데이터 입력으로 계속</Button>
          </Link>
        }
      />

      <MetricStrip
        items={[
          { label: "다음 단계", value: "파일 업로드", hint: "새 프로젝트 후 바로 이동" },
          { label: "기본 공개 범위", value: "비공개", hint: "외부 공유는 이후 단계" },
          { label: "편집 기준", value: "데스크톱 우선", hint: "고급 차트 편집에 맞춘 캔버스" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <Card
          variant="canvas"
          title="프로젝트 기본 정보"
          description="메타데이터를 많이 채우기보다, 업로드와 에디터로 이어질 최소한의 제품 맥락만 정리합니다."
        >
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-4">
              <Input
                label="프로젝트 이름"
                defaultValue="1분기 성장 흐름"
                hint="프로젝트 허브와 에디터 상단에 같은 이름으로 표시됩니다."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-line-subtle bg-surface-2/72 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Output intent</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["보고서용", "발표용", "SNS용"].map((item, index) => (
                      <span
                        key={item}
                        className={
                          index === 0
                            ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-ink-1"
                            : "rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-3"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-line-subtle bg-surface-2/72 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Visual tone</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["차분하게", "선명하게", "설명형"].map((item, index) => (
                      <span
                        key={item}
                        className={
                          index === 0
                            ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-ink-1"
                            : "rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-3"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line-strong bg-surface-1 px-5 py-5 shadow-soft">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Next flow</p>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      step: "1. 데이터 입력",
                      description: "CSV/XLSX 파일을 올리고 표본 데이터와 열 구조를 확인합니다."
                    },
                    {
                      step: "2. 차트 추천",
                      description: "데이터에 맞는 차트 후보를 제안하고 첫 초안을 생성합니다."
                    },
                    {
                      step: "3. 옵션 조정",
                      description: "제목, 색상, 축, 범례, 라벨, 레이아웃을 한 화면에서 다듬습니다."
                    }
                  ].map((item) => (
                    <div key={item.step} className="rounded-xl border border-line-subtle bg-surface-2/72 px-4 py-4">
                      <p className="text-sm font-medium text-ink-1">{item.step}</p>
                      <p className="mt-2 text-sm leading-6 text-ink-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Card variant="subtle" padding="compact" title="지금 정하는 것">
                <div className="space-y-3 text-sm leading-6 text-ink-2">
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">프로젝트 이름</div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">결과물 톤</div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">업로드로 이어질 시작점</div>
                </div>
              </Card>

              <Card variant="subtle" padding="compact" title="프로젝트 기본값">
                <div className="space-y-3 text-sm leading-6 text-ink-2">
                  <StatusBadge label="비공개 기본값" tone="private" />
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">
                    시각화 노출: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.visualizationExposure}</span>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">
                    저장 모델: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.saveModel}</span>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-3">
                    MVP 공유: <span className="font-medium text-ink-1">{String(PRODUCT_DEFAULTS.sharingInMvp)}</span>
                  </div>
                </div>
              </Card>

              <Link href="/app/projects/proj_q1-growth/upload">
                <Button className="w-full" size="lg">
                  업로드 화면으로 이동
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
