import { PRODUCT_DEFAULTS } from "@mac/domain";
import { Button, Card, Input, MetricStrip, PageHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="새 프로젝트"
        title="프로젝트를 가볍게 정하고 바로 데이터 입력으로 넘어갑니다"
        description="복잡한 생성 폼보다, 첫 시각화를 빨리 만드는 흐름이 먼저 보이도록 새 프로젝트 단계를 재구성했습니다."
        actions={
          <Link href="/app/projects/proj_q1-growth/upload">
            <Button size="lg">데이터 입력으로 계속</Button>
          </Link>
        }
      />

      <MetricStrip
        items={[
          { label: "다음 단계", value: "파일 업로드", hint: "새 프로젝트 후 바로 이동" },
          { label: "공개 범위", value: "비공개 기본값", hint: "외부 공유는 이후 단계" },
          { label: "편집 환경", value: "데스크톱 우선", hint: "에디터 완성도 기준 유지" }
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card
          variant="canvas"
          title="프로젝트 기본 정보"
          description="이 단계는 메타데이터를 많이 입력하는 곳이 아니라, 업로드와 에디터로 넘어가기 전 최소한의 맥락만 정리하는 곳입니다."
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <Input label="프로젝트 이름" defaultValue="1분기 성장 흐름" hint="프로젝트 허브와 에디터 상단에 같은 이름으로 표시됩니다." />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
                  <p className="text-caption uppercase tracking-[0.16em] text-ink-3">이번 작업의 목적</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["보고서용", "발표용", "SNS용"].map((item, index) => (
                      <span
                        key={item}
                        className={
                          index === 0
                            ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-1"
                            : "rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
                  <p className="text-caption uppercase tracking-[0.16em] text-ink-3">기본 결과 톤</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["차분하게", "강조형", "설명형"].map((item, index) => (
                      <span
                        key={item}
                        className={
                          index === 0
                            ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-1"
                            : "rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(239,233,225,0.82))] px-5 py-5">
                <p className="text-caption uppercase tracking-[0.16em] text-ink-3">생성 후 바로 이어지는 흐름</p>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      step: "1. 데이터 입력",
                      description: "CSV/XLSX 파일을 올리고 표본 데이터와 열 구조를 확인합니다."
                    },
                    {
                      step: "2. 차트 선택",
                      description: "데이터에 맞는 차트 후보를 추천하고, 원하는 유형을 고릅니다."
                    },
                    {
                      step: "3. 옵션 조정",
                      description: "제목, 색상, 축, 범례, 라벨, 레이아웃을 같은 화면에서 다듬습니다."
                    }
                  ].map((item) => (
                    <div key={item.step} className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
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
                  <div className="rounded-md border border-line-subtle bg-surface-1 px-3 py-3">프로젝트 이름</div>
                  <div className="rounded-md border border-line-subtle bg-surface-1 px-3 py-3">결과물의 기본 톤</div>
                  <div className="rounded-md border border-line-subtle bg-surface-1 px-3 py-3">이후 편집 흐름의 시작점</div>
                </div>
              </Card>

              <Card variant="subtle" padding="compact" title="바로 다음 화면">
                <p className="text-sm leading-6 text-ink-2">프로젝트를 만든 뒤에는 업로드 화면에서 데이터 표본과 차트 추천 후보를 먼저 보게 됩니다.</p>
                <Link href="/app/projects/proj_q1-growth/upload">
                  <Button className="mt-4 w-full" variant="secondary">
                    업로드 화면 미리 보기
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </Card>

        <Card variant="subtle" title="프로젝트 기본값" description="고정된 제품 원칙도 화면 안에서 바로 읽히도록 남겨둡니다.">
          <div className="space-y-3">
            <StatusBadge label="이메일 로그인 예정" tone="neutral" />
            <StatusBadge label="비공개 기본값" tone="private" />
            <StatusBadge label="데스크톱 우선 편집" tone="live" />
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              시각화 노출: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.visualizationExposure}</span>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              저장 모델: <span className="font-medium text-ink-1">{PRODUCT_DEFAULTS.saveModel}</span>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              MVP 공유: <span className="font-medium text-ink-1">{String(PRODUCT_DEFAULTS.sharingInMvp)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
