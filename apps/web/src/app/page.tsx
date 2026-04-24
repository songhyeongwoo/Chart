import { MVP_CHART_TYPES } from "@mac/domain";
import { Button, Card, MetricStrip, PlaceholderChart, PublicShell, SectionHeader, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";

const workflow = [
  {
    step: "01",
    title: "데이터 업로드",
    description: "CSV/XLSX를 넣고 열 구조와 표본 행을 먼저 확인합니다."
  },
  {
    step: "02",
    title: "차트 추천",
    description: "데이터 흐름에 맞는 차트를 추천받고 바로 첫 초안을 잡습니다."
  },
  {
    step: "03",
    title: "직접 편집",
    description: "제목, 색상, 축, 범례, 라벨, 밀도를 손으로 다듬습니다."
  },
  {
    step: "04",
    title: "결과물 완성",
    description: "발표자료와 보고서에 바로 넣고 싶은 차트로 정리합니다."
  }
];

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="grid gap-8 px-1 pb-12 pt-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-start lg:pt-10">
        <div className="max-w-3xl pt-4 lg:pt-10">
          <p className="brand-kicker">Korean no-code visualization editor</p>
          <h2 className="mt-5 max-w-3xl font-display text-hero font-semibold tracking-[-0.065em] text-ink-1">
            데이터를 넣고,
            <br />
            차트를 고르고,
            <br />
            결과물을 직접 다듬는
            <br />
            한글형 편집기
          </h2>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-ink-2">
            MAC은 비전공자를 위한 한국어 중심 no-code 시각화 편집기입니다. 업로드한 데이터를 바탕으로 차트를 추천하고,
            제목, 색상, 정렬, 라벨, 축, 범례, 레이아웃을 직접 만지며 발표자료에 넣고 싶은 결과물까지 완성할 수 있게
            설계했습니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/app/projects">
              <Button size="lg">작업공간 열기</Button>
            </Link>
            <Link href="/app/projects/proj_q1-growth/editor">
              <Button size="lg" variant="secondary">
                에디터 데모 보기
              </Button>
            </Link>
          </div>
          <MetricStrip
            className="mt-8"
            items={[
              { label: "편집 시작점", value: "업로드 후 바로 초안 생성", hint: "빈 캔버스를 먼저 보여주지 않습니다." },
              { label: "핵심 차트", value: `${MVP_CHART_TYPES.length}종 + racing bar`, hint: "비교, 흐름, 비중, 순위 중심" },
              { label: "결과물 톤", value: "보고서 · 발표자료 지향", hint: "차트 자체 품질을 우선 설계" }
            ]}
          />
        </div>

        <Card
          variant="canvas"
          className="hero-spotlight overflow-hidden"
          title="업로드에서 결과물까지 같은 브랜드 경험"
          description="랜딩용 비주얼이 아니라 실제 제품 프레임을 압축해서 보여줍니다."
        >
          <div className="grid gap-4 xl:grid-cols-[148px_minmax(0,1fr)]">
            <div className="rounded-xl border border-line-subtle bg-surface-1/88 p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-3">Flow</p>
              <div className="mt-4 space-y-2">
                {workflow.map((item, index) => (
                  <div
                    key={item.step}
                    className={
                      index === 2
                        ? "rounded-lg border border-line-accent bg-surface-2 px-3 py-3"
                        : "rounded-lg border border-line-subtle bg-surface-1 px-3 py-3"
                    }
                  >
                    <p className="text-[10px] tracking-[0.14em] text-ink-3">{item.step}</p>
                    <p className="mt-1 text-sm font-medium tracking-[-0.02em] text-ink-1">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-line-strong bg-surface-1/96 p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/80 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Editor preview</p>
                  <h3 className="mt-2 text-[1.6rem] font-semibold tracking-[-0.04em] text-ink-1">1분기 성장 흐름</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-2">유입 채널별 월간 성장 데이터를 선 차트로 정리한 초안입니다.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="한국어 중심" tone="neutral" />
                  <StatusBadge label="차트 편집 중" tone="live" withDot />
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-xl border border-line-subtle bg-surface-1 p-4">
                  <PlaceholderChart chartType="line" heightClassName="h-[330px]" />
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-line-subtle bg-surface-2/88 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Inspector</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">제목 · 범례 · 라벨 · 축 · 밀도</p>
                    <p className="mt-2 text-sm leading-6 text-ink-2">결과물을 보면서 바로 조정하는 한국어 편집 패널.</p>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Output quality</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">발표자료에 넣고 싶은 캔버스 톤</p>
                    <p className="mt-2 text-sm leading-6 text-ink-2">차트, 캡션, 라벨이 따로 놀지 않게 하나의 결과물로 정리합니다.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Upload</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">열 구조 확인</p>
                </div>
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Recommend</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">차트 초안 생성</p>
                </div>
                <div className="rounded-lg border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Export-ready</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">PNG · JPG · SVG 지향</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="py-10">
        <SectionHeader
          eyebrow="Workflow"
          title="데이터에서 결과물까지, 중간이 비지 않는 편집 흐름"
          description="설명용 카드 나열이 아니라 실제 사용 흐름이 한눈에 읽히도록 구성합니다."
        />
        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Card
            variant="canvas"
            title="업로드 → 추천 → 편집 → 추출"
            description="사용자는 기능 목록을 공부하는 대신, 지금 무엇을 하고 다음에 무엇이 나오는지 화면에서 바로 이해해야 합니다."
          >
            <div className="grid gap-4 lg:grid-cols-4">
              {workflow.map((item, index) => (
                <div key={item.step} className="rounded-xl border border-line-subtle bg-surface-1/90 px-4 py-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">{item.step}</p>
                  <p className="mt-3 text-base font-semibold tracking-[-0.03em] text-ink-1">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{item.description}</p>
                  <div className="mt-4 h-px bg-line-subtle/80" />
                  <p className="mt-4 text-[11px] tracking-[0.06em] text-ink-3">
                    {index === 0
                      ? "파일 구조를 먼저 보여줍니다."
                      : index === 1
                        ? "첫 차트 초안을 자동으로 잡습니다."
                        : index === 2
                          ? "Inspector와 preview를 동시에 봅니다."
                          : "결과물 품질을 끝에서 확인합니다."}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card
            variant="subtle"
            title="MAC이 강조하는 것"
            description="복잡한 분석 툴이 아니라, 누구나 쓸 수 있는 고급 차트 편집기라는 인상을 분명히 만듭니다."
          >
            <div className="space-y-3">
              {[
                "한국어 카피와 편집 상태가 자연스럽게 읽혀야 합니다.",
                "차트 미리보기는 템플릿 샘플이 아니라 결과물처럼 보여야 합니다.",
                "랜드िंग과 앱 내부가 같은 제품이라는 확신을 줘야 합니다.",
                "에디터는 문서가 아니라 실제 작업 공간처럼 보여야 합니다."
              ].map((item) => (
                <div key={item} className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          eyebrow="Product Mock"
          title="실제 제품처럼 보이는 이유는, 차트보다 주변 UI가 앞서지 않기 때문입니다"
          description="조용한 상단 액션 바, 간결한 흐름 레일, 결과물 중심 캔버스, 세밀한 inspector가 같은 톤으로 연결됩니다."
        />
        <div className="mt-8 grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
          <Card variant="subtle" title="편집 리듬" description="작업 흐름과 데이터 맥락을 먼저 보여주고, 세부 설정은 오른쪽에서 깊게 다룹니다.">
            <div className="space-y-3">
              {[
                "좌측 레일: 프로젝트 상태와 차트 유형 전환",
                "중앙 캔버스: 결과물 자체에 집중하는 프레임",
                "우측 inspector: 차트별 옵션과 텍스트, 축, 라벨, 레이아웃 설정"
              ].map((item, index) => (
                <div
                  key={item}
                  className={index === 1 ? "rounded-xl border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1" : "rounded-xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2"}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="canvas" className="overflow-hidden" title="MAC Editor" description="차트 편집기가 문서 데모가 아니라 살아 있는 제품처럼 보이도록 재구성했습니다.">
            <div className="rounded-xl border border-line-strong bg-surface-1 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle/85 px-5 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Workspace</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-ink-1">월별 가입자 증가 흐름</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label="비공개" tone="private" />
                  <StatusBadge label="로컬 저장됨" tone="saved" withDot />
                </div>
              </div>

              <div className="grid gap-4 p-4 xl:grid-cols-[220px_minmax(0,1fr)_280px]">
                <div className="space-y-3">
                  <div className="rounded-xl border border-line-subtle bg-surface-2/88 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Flow Rail</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">차트 선택 → 데이터 연결 → 옵션 조정</p>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-sm font-medium text-ink-1">선 차트</p>
                    <p className="mt-2 text-sm leading-6 text-ink-2">흐름과 변화를 보여줄 때 자연스럽습니다.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-line-subtle bg-surface-2/72 p-4">
                  <PlaceholderChart chartType="line" heightClassName="h-[360px]" />
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Data</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">가로축, 값, 범례 연결</p>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Labels</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">값 라벨, 이름, 표기 방식</p>
                  </div>
                  <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Layout</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">비율, 밀도, 범례 위치</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-10">
        <SectionHeader
          eyebrow="Output"
          title="차트가 결과물처럼 보여야, 서비스도 실제 제품처럼 보입니다"
          description="기본 샘플 SVG처럼 느껴지지 않도록 차트별 미리보기 톤과 맥락을 정리합니다."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Card variant="canvas" title="보고서용 선 차트" description="축, 라벨, 캡션, 여백을 함께 정리해 문서에 바로 넣고 싶은 톤을 만듭니다.">
            <PlaceholderChart chartType="line" heightClassName="h-[360px]" />
          </Card>
          <Card variant="canvas" title="순위형 racing bar" description="향후 MP4/GIF 확장까지 고려해 프레임 단위에서도 강한 정체성이 남도록 설계합니다.">
            <PlaceholderChart chartType="racing-bar" heightClassName="h-[360px]" />
          </Card>
        </div>
      </section>
    </PublicShell>
  );
}
