import { mockDatasetPreview } from "@mac/data";
import {
  getChartRecommendations,
  getFieldLabel,
  getFieldRoleDescription,
  getRecommendedBindings
} from "../../../../../lib/field-mapping";
import { Button, PreviewTable, StatusBadge } from "@mac/ui";
import Link from "next/link";

export default async function UploadPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const chartRecommendations = getChartRecommendations(mockDatasetPreview);
  const recommendedBindings = getRecommendedBindings(mockDatasetPreview, "line");

  return (
    <div className="space-y-8">
      <section className="grid gap-6 border-b border-line-subtle pb-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="brand-kicker">Data Intake</p>
          <h1 className="mt-3 max-w-[17ch] text-[clamp(2.2rem,3.8vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-ink-1">
            데이터를 읽고 추천 차트로 넘깁니다
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink-2">
            파일 업로드, 인코딩, 표본 행, 열 역할을 한 번에 확인한 뒤 에디터가 빈 화면으로 열리지 않도록 첫 초안을 준비합니다.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <Link href={`/app/projects/${projectId}/editor`}>
            <Button className="w-full" size="lg">
              차트 추천으로 이동
            </Button>
          </Link>
          <Button className="w-full" size="lg" variant="secondary">
            샘플 데이터로 테스트
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-line-strong bg-surface-1/94 p-5 shadow-panel">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="brand-kicker">Upload</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink-1">CSV/XLSX 파일</h2>
                <p className="mt-2 text-sm leading-6 text-ink-2">클릭하거나 파일을 끌어와 업로드합니다. 실제 파서는 다음 단계에서 연결합니다.</p>
              </div>
              <StatusBadge label="입력 대기" tone="draft" withDot />
            </div>

            <div className="mt-5 rounded-[22px] border border-dashed border-line-accent bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(238,233,225,0.9))] px-5 py-12 text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-3">Drop file</p>
              <h3 className="mx-auto mt-3 max-w-[13ch] text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.055em] text-ink-1">
                파일을 올려
                <br />
                구조를 확인하세요
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-ink-2">.csv, .xlsx, .xls 파일을 지원하는 입력 단계로 설계했습니다.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button>파일 선택</Button>
                <Button variant="secondary">샘플 불러오기</Button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block rounded-[18px] border border-line-subtle bg-surface-2/70 px-4 py-4">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-3">CSV Encoding</span>
                <select className="mt-3 h-11 w-full rounded-md border border-line-subtle bg-surface-1 px-3 text-sm text-ink-1">
                  <option>UTF-8</option>
                  <option>EUC-KR (CP949)</option>
                  <option>자동 감지</option>
                </select>
              </label>
              <div className="rounded-[18px] border border-line-subtle bg-surface-2/70 px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3">Project</p>
                <p className="mt-3 text-sm font-medium text-ink-1">{projectId}</p>
                <p className="mt-1 text-xs text-ink-3">업로드 후 같은 프로젝트의 추천 화면으로 이어집니다.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-line-subtle bg-surface-1/88 p-5">
            <p className="brand-kicker">Recommended Handoff</p>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-ink-1">편집기로 넘어갈 기본 매핑</h2>
            <div className="mt-4 grid gap-3">
              {[
                ["가로축", getFieldLabel(mockDatasetPreview, recommendedBindings.xFieldKey)],
                ["값", getFieldLabel(mockDatasetPreview, recommendedBindings.valueFieldKey)],
                ["범례", getFieldLabel(mockDatasetPreview, recommendedBindings.seriesFieldKey)],
                ["라벨", getFieldLabel(mockDatasetPreview, recommendedBindings.labelFieldKey)]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 border-b border-line-subtle py-3 last:border-b-0">
                  <span className="text-sm text-ink-3">{label}</span>
                  <span className="min-w-0 truncate text-sm font-medium text-ink-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[28px] border border-line-strong bg-surface-1 shadow-soft">
            <PreviewTable preview={mockDatasetPreview} />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-[24px] border border-line-subtle bg-surface-1/90 p-5">
              <p className="brand-kicker">Columns</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-ink-1">열 역할 확인</h2>
              <div className="mt-4 space-y-3">
                {mockDatasetPreview.columns.map((column) => (
                  <div key={column.key} className="rounded-[16px] border border-line-subtle bg-surface-2/58 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-medium text-ink-1">{column.name}</p>
                      <span className="rounded-full border border-line-subtle bg-surface-1 px-2.5 py-1 text-[11px] text-ink-3">{column.type}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-ink-2">{getFieldRoleDescription(column)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-line-subtle bg-surface-1/90 p-5">
              <p className="brand-kicker">Recommendations</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-ink-1">추천 차트 후보</h2>
              <div className="mt-4 space-y-3">
                {chartRecommendations.map((item, index) => (
                  <div
                    key={item.label}
                    className={
                      index === 0
                        ? "rounded-[16px] border border-line-accent bg-surface-1 px-4 py-3 shadow-soft"
                        : "rounded-[16px] border border-line-subtle bg-surface-2/58 px-4 py-3"
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-ink-1">{item.label}</p>
                      <span className="metric-chip">{item.tone}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-ink-2">{item.fit}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
