import { mockDatasetPreview } from "@mac/data";
import {
  getChartRecommendations,
  getFieldLabel,
  getFieldRoleDescription,
  getRecommendedBindings
} from "../../../../../lib/field-mapping";
import { Button, MetricStrip, PageHeader, PreviewTable, StatusBadge } from "@mac/ui";
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
        description={`${projectId} 프로젝트에 연결할 데이터를 먼저 읽고, 다음 화면에서 바로 결과물을 볼 수 있도록 추천 초안의 맥락을 정리합니다.`}
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
          { label: "지원 형식", value: ".csv · .xlsx", hint: "이 단계는 구조와 표본 확인 중심" },
          { label: "핵심 역할", value: "구조 확인과 추천", hint: "업로드 직후 빈 화면을 보여주지 않음" },
          { label: "다음 단계", value: "차트 초안 생성", hint: "편집기로 바로 handoff" }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <section className="workspace-shell overflow-hidden rounded-[34px] border border-line-strong px-5 py-5 shadow-panel md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-subtle/70 pb-5">
            <div>
              <p className="brand-kicker">Data Intake</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-ink-1">파일을 올리면 추천으로 이어지는 관문</h2>
              <p className="mt-3 max-w-[42rem] text-body leading-7 text-ink-2">
                업로드 자체보다, 어떤 구조가 들어왔고 어떤 차트 초안으로 연결될지 기대가 먼저 보이도록 장면을 다시 구성했습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="metric-chip">CSV / XLSX</span>
              <span className="metric-chip">추천 초안 준비</span>
              <span className="metric-chip">에디터 handoff</span>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[30px] border border-dashed border-line-accent bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(236,231,223,0.92))] px-6 py-14 text-center shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Upload Surface</p>
              <h3 className="mx-auto mt-4 max-w-[11ch] text-display font-semibold tracking-[-0.06em] text-ink-1">
                CSV 또는 XLSX 파일을
                <br />
                올려주세요
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-body leading-7 text-ink-2">
                실제 파서는 아직 연결하지 않았지만, 이 단계에서 어떤 정보를 먼저 보여주고 어떤 차트 초안으로 넘길지 제품 수준으로 정리했습니다.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary">
                  파일 선택
                </Button>
                <Button size="lg" variant="ghost">
                  지원 형식 보기
                </Button>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  ["Check", "시트와 표본 행 확인"],
                  ["Infer", "열 역할 자동 추론"],
                  ["Recommend", "차트 후보와 첫 초안 제안"]
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[22px] border border-line-subtle bg-surface-1/86 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">{title}</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[26px] border border-line-subtle bg-surface-1/90 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">What Happens Next</p>
                <div className="mt-4 space-y-3">
                  {[
                    "표본 데이터와 열 구조를 먼저 확인합니다.",
                    "어떤 열이 기준값과 수치값이 될지 자연어로 설명합니다.",
                    "추천 차트를 먼저 보여줘 에디터가 갑자기 비어 보이지 않게 합니다."
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={
                        index === 2
                          ? "rounded-[20px] border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1 shadow-soft"
                          : "rounded-[20px] border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2"
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-line-subtle bg-surface-1/90 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Recommended Start</p>
                <div className="mt-4 space-y-3">
                  {chartRecommendations.map((item, index) => (
                    <div
                      key={item.label}
                      className={
                        index === 0
                          ? "rounded-[20px] border border-line-accent bg-surface-1 px-4 py-4 shadow-soft"
                          : "rounded-[20px] border border-line-subtle bg-surface-1 px-4 py-4"
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-ink-1">{item.label}</p>
                        <span className="metric-chip">{item.tone}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-2">{item.fit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-[30px] border border-line-strong bg-surface-1 shadow-soft">
            <PreviewTable preview={mockDatasetPreview} />
          </div>

          <section className="brand-panel overflow-hidden px-5 py-5 shadow-soft">
            <p className="brand-kicker">Field Roles</p>
            <h3 className="mt-2 text-[1.38rem] font-semibold tracking-[-0.04em] text-ink-1">열이 어떤 역할을 맡는지 먼저 보여줍니다</h3>
            <div className="mt-4 space-y-3">
              {mockDatasetPreview.columns.map((column) => (
                <div key={column.key} className="rounded-[22px] border border-line-subtle bg-surface-1/90 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-1">{column.name}</p>
                    <span className="metric-chip">{column.type}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldRoleDescription(column)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="brand-panel overflow-hidden px-5 py-5 shadow-soft">
            <p className="brand-kicker">Editor Handoff</p>
            <h3 className="mt-2 text-[1.38rem] font-semibold tracking-[-0.04em] text-ink-1">에디터로 넘어갈 첫 초안</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-ink-2">
              <div className="rounded-[22px] border border-line-subtle bg-surface-1/90 px-4 py-4">기본 차트는 선 차트로 시작합니다.</div>
              <div className="rounded-[22px] border border-line-subtle bg-surface-1/90 px-4 py-4">
                데이터 연결은 x축 {getFieldLabel(mockDatasetPreview, recommendedBindings.xFieldKey)}, 값 {getFieldLabel(mockDatasetPreview, recommendedBindings.valueFieldKey)}, 범례 {getFieldLabel(mockDatasetPreview, recommendedBindings.seriesFieldKey)} 기준으로 정리합니다.
              </div>
              <div className="rounded-[22px] border border-line-subtle bg-surface-1/90 px-4 py-4">제목, 부제목, 기본 팔레트가 채워진 상태로 편집기에 들어갑니다.</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
