import { mockDatasetPreview } from "@mac/data";
import {
  getChartRecommendations,
  getFieldLabel,
  getFieldRoleDescription,
  getRecommendedBindings
} from "../../../../../lib/field-mapping";
import { Button, Card, MetricStrip, PageHeader, PreviewTable, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default async function UploadPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const chartRecommendations = getChartRecommendations(mockDatasetPreview);
  const recommendedBindings = getRecommendedBindings(mockDatasetPreview, "line");

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Upload Gate"
        title="데이터 구조를 확인하고 첫 차트 초안을 준비합니다"
        description={`${projectId} 프로젝트에 연결할 데이터를 먼저 읽고, 에디터에서 바로 결과물을 볼 수 있도록 진입 상태를 정리합니다.`}
        actions={
          <>
            <StatusBadge label="업로드 전" tone="draft" withDot />
            <Link href={`/app/projects/${projectId}/editor`}>
              <Button>이 상태로 편집 시작</Button>
            </Link>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "지원 형식", value: ".csv · .xlsx", hint: "이번 단계는 시각 흐름 검증 중심" },
          { label: "핵심 역할", value: "구조 확인과 추천", hint: "업로드 직후 빈 화면을 보여주지 않음" },
          { label: "다음 단계", value: "차트 초안 생성", hint: "편집기로 바로 handoff" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card
          variant="canvas"
          className="overflow-hidden"
          title="데이터 입력"
          description="장식적인 드롭존보다 사용자가 안심하고 다음 화면을 예상할 수 있는 구조를 우선합니다."
        >
          <div className="rounded-[24px] border border-dashed border-line-accent bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(236,231,223,0.92))] px-6 py-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Upload</p>
            <h2 className="mt-4 text-display font-semibold tracking-[-0.05em] text-ink-1">CSV 또는 XLSX 파일을 올려주세요</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body text-ink-2">
              실제 파서는 아직 연결하지 않았지만, 이 단계에서 어떤 정보를 먼저 보여주고 어떤 차트 초안으로 넘길지는 제품 수준으로
              정리했습니다.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                파일 선택
              </Button>
              <Button size="lg" variant="ghost">
                지원 형식 보기
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-line-subtle bg-surface-2/72 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Check</p>
              <p className="mt-2 text-sm font-medium text-ink-1">시트와 표본 행 확인</p>
            </div>
            <div className="rounded-2xl border border-line-subtle bg-surface-2/72 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Infer</p>
              <p className="mt-2 text-sm font-medium text-ink-1">열 역할 자동 추론</p>
            </div>
            <div className="rounded-2xl border border-line-subtle bg-surface-2/72 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Recommend</p>
              <p className="mt-2 text-sm font-medium text-ink-1">차트 후보와 첫 초안 제안</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card variant="subtle" title="업로드 후 바로 보이는 것" description="이 화면은 파일 입력 창이 아니라, 에디터 진입 전 맥락을 정리하는 관문입니다.">
            <div className="space-y-3">
              {[
                "표본 데이터와 열 구조를 먼저 확인합니다.",
                "어떤 열이 기준값과 수치값이 될지 자연어로 설명합니다.",
                "추천 차트를 먼저 보여줘 에디터가 갑자기 비어 보이지 않게 합니다."
              ].map((item, index) => (
                <div
                  key={item}
                  className={index === 2 ? "rounded-xl border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1" : "rounded-xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2"}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="subtle" title="추천 차트 후보" description="데이터 구조를 보고 어떤 방향으로 시작하면 좋은지 바로 드러냅니다.">
            <div className="space-y-3">
              {chartRecommendations.map((item, index) => (
                <div
                  key={item.label}
                  className={
                    index === 0
                      ? "rounded-xl border border-line-accent bg-surface-1 px-4 py-4"
                      : "rounded-xl border border-line-subtle bg-surface-1 px-4 py-4"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-1">{item.label}</p>
                    <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-3">
                      {item.tone}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{item.fit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
        <div className="overflow-hidden rounded-[24px] border border-line-strong bg-surface-1 shadow-soft">
          <PreviewTable preview={mockDatasetPreview} />
        </div>

        <div className="space-y-4">
          <Card variant="subtle" title="감지된 열과 역할" description="비전공자도 어느 값을 어디에 넣는지 이해할 수 있도록 역할 후보를 함께 보여줍니다.">
            <div className="space-y-3">
              {mockDatasetPreview.columns.map((column) => (
                <div key={column.key} className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-1">{column.name}</p>
                    <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-3">
                      {column.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldRoleDescription(column)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="subtle" title="에디터로 넘겨질 첫 초안" description="업로드 이후 빈 캔버스가 아니라 결과물이 먼저 보이는 상태로 넘깁니다.">
            <div className="space-y-3 text-sm leading-6 text-ink-2">
              <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">기본 차트: 선 차트</div>
              <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                데이터 연결: x축 `{getFieldLabel(mockDatasetPreview, recommendedBindings.xFieldKey)}`, 값 `
                {getFieldLabel(mockDatasetPreview, recommendedBindings.valueFieldKey)}`, 범례 `
                {getFieldLabel(mockDatasetPreview, recommendedBindings.seriesFieldKey)}`
              </div>
              <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                첫 상태: 제목, 부제목, 테마가 채워진 상태로 바로 편집기를 엽니다.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
