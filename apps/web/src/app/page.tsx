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
    description: "데이터 흐름에 맞는 차트를 추천받고 첫 초안을 바로 만듭니다."
  },
  {
    step: "03",
    title: "직접 편집",
    description: "제목, 색상, 범례, 라벨, 축, 밀도를 한글 UI에서 다듬습니다."
  },
  {
    step: "04",
    title: "결과물 완성",
    description: "발표자료와 보고서에 바로 넣고 싶은 차트로 정리합니다."
  }
];

const landingHighlights = [
  "업로드 직후 빈 화면이 아니라 첫 차트 초안을 보여줍니다.",
  "비전공자도 읽히는 한국어 카피와 조밀한 inspector를 제공합니다.",
  "템플릿 샘플이 아니라 실제 결과물처럼 보이는 차트 톤을 지향합니다."
];

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="grid gap-8 px-1 pb-12 pt-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start xl:pt-8">
        <div className="max-w-3xl pt-4 xl:pt-10">
          <div className="flex flex-wrap gap-2">
            <span className="brand-chip">업로드 → 추천 → 편집 → 결과물</span>
            <span className="brand-chip">한글형 no-code 차트 편집기</span>
          </div>

          <p className="brand-kicker mt-7">Presentation-ready chart workflow</p>
          <h2 className="mt-5 max-w-3xl font-display text-hero font-semibold tracking-[-0.065em] text-ink-1">
            데이터를 올리면
            <br />
            차트 초안이 먼저 나오고,
            <br />
            결과물은 내가 직접 다듬는
            <br />
            한글형 시각화 편집기
          </h2>
          <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-ink-2">
            MAC은 비전공자도 바로 사용할 수 있는 한국어 중심 no-code 시각화 편집기입니다. 업로드한 데이터를 바탕으로 차트를
            추천하고, 제목과 색상, 축과 범례, 라벨과 밀도를 손으로 다듬어 발표자료에 넣고 싶은 결과물까지 완성하게 돕습니다.
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

          <div className="mt-8 grid gap-3 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="rounded-2xl border border-line-strong bg-surface-1/96 px-5 py-4 shadow-soft">
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">First impression</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.03em] text-ink-1">랜딩에서 바로 써보고 싶은 제품감</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">기능 설명보다 결과물과 편집 흐름이 먼저 보이도록 구성했습니다.</p>
            </div>
            <div className="rounded-2xl border border-line-subtle bg-surface-2/78 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Core charts</p>
              <p className="mt-3 text-base font-semibold tracking-[-0.03em] text-ink-1">{`${MVP_CHART_TYPES.length}종 + racing bar`}</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">비교, 흐름, 비중, 순위 중심.</p>
            </div>
            <div className="rounded-2xl border border-line-subtle bg-surface-2/78 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Output tone</p>
              <p className="mt-3 text-base font-semibold tracking-[-0.03em] text-ink-1">보고서 · 발표자료 지향</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">차트 자체 품질을 먼저 설계합니다.</p>
            </div>
          </div>
        </div>

        <Card
          variant="canvas"
          className="hero-spotlight sheen-border overflow-hidden"
          title="실제 제품 흐름을 압축한 hero mock"
          description="장식용 일러스트 대신 업로드, 추천, 편집, 결과물이 같은 톤으로 이어지는 제품형 장면을 보여줍니다."
        >
          <div className="hero-stage rounded-[26px] border border-line-strong/75 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line-subtle/80 bg-surface-1/86 px-4 py-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">MAC Workspace Preview</p>
                <p className="mt-1 text-sm font-medium text-ink-1">업로드에서 결과물까지 한 번에 보이는 편집 흐름</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge label="한글형 편집기" tone="neutral" />
                <StatusBadge label="차트 편집 중" tone="live" withDot />
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
              <div className="rounded-2xl border border-line-subtle bg-surface-1/92 p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Flow</p>
                <div className="mt-4 space-y-2.5">
                  {workflow.map((item, index) => (
                    <div
                      key={item.step}
                      className={
                        index === 2
                          ? "rounded-xl border border-line-accent bg-surface-2 px-3 py-3 shadow-soft"
                          : "rounded-xl border border-line-subtle bg-surface-1 px-3 py-3"
                      }
                    >
                      <p className="text-[10px] tracking-[0.16em] text-ink-3">{item.step}</p>
                      <p className="mt-1.5 text-sm font-medium text-ink-1">{item.title}</p>
                      <p className="mt-1.5 text-[12px] leading-5 text-ink-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-[24px] border border-line-strong bg-surface-1/98 p-5 shadow-panel">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/80 pb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Chart canvas</p>
                    <h3 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.04em] text-ink-1">1분기 성장 흐름</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-2">
                      업로드한 유입 채널별 월간 성장 데이터를 선 차트로 추천받고, 바로 발표용 톤으로 다듬는 장면입니다.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge label="추천 반영" tone="saved" withDot />
                    <StatusBadge label="로컬 편집 유지" tone="private" />
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
                  <div className="chart-paper rounded-[24px] border border-line-strong/80 p-4 shadow-soft">
                    <PlaceholderChart chartType="line" heightClassName="h-[360px]" />
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-line-subtle bg-surface-2/82 px-4 py-4">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Inspector</p>
                      <p className="mt-2 text-sm font-medium text-ink-1">제목 · 범례 · 라벨 · 축 · 밀도</p>
                      <p className="mt-2 text-sm leading-6 text-ink-2">결과물을 보면서 바로 조정하는 고급 no-code 제어 패널.</p>
                    </div>
                    <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Output tone</p>
                      <p className="mt-2 text-sm font-medium text-ink-1">발표자료에 넣고 싶은 캔버스 품질</p>
                      <p className="mt-2 text-sm leading-6 text-ink-2">차트와 캡션, 범례와 라벨이 따로 놀지 않게 정리합니다.</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  {workflow.map((item) => (
                    <div key={item.step} className="rounded-xl border border-line-subtle bg-surface-2/72 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">{item.step}</p>
                      <p className="mt-2 text-sm font-medium text-ink-1">{item.title}</p>
                    </div>
                  ))}
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
          description="설명용 카드 나열이 아니라 실제 사용 흐름이 자연스럽게 읽히도록 화면 리듬을 정리했습니다."
        />
        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
          <Card
            variant="canvas"
            title="업로드 → 추천 → 편집 → 발표자료용 결과물"
            description="사용자는 기능 목록을 공부하는 대신, 지금 무엇을 하고 다음에 무엇이 나오는지 화면에서 바로 이해해야 합니다."
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="space-y-3">
                {workflow.map((item, index) => (
                  <div
                    key={item.step}
                    className={
                      index === 2
                        ? "rounded-2xl border border-line-accent bg-surface-1 px-5 py-5 shadow-soft"
                        : "rounded-2xl border border-line-subtle bg-surface-1/92 px-5 py-5"
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">{item.step}</p>
                        <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-ink-1">{item.title}</p>
                      </div>
                      {index === 0 ? <StatusBadge label="진입" tone="neutral" /> : index === 2 ? <StatusBadge label="핵심 화면" tone="live" /> : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-2">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-line-strong bg-surface-1/96 p-4 shadow-soft">
                <PlaceholderChart chartType="bar" heightClassName="h-[420px]" />
              </div>
            </div>
          </Card>

          <Card variant="subtle" title="이번 visual direction의 기준" description="MAC이 관리자 페이지나 AI 템플릿처럼 보이지 않기 위해 지켜야 할 원칙입니다.">
            <div className="space-y-3">
              {landingHighlights.map((item, index) => (
                <div
                  key={item}
                  className={
                    index === 1
                      ? "rounded-2xl border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1"
                      : "rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2"
                  }
                >
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
          description="조용한 상단 액션 바, 간결한 흐름 레일, 결과물 중심 캔버스, 조밀한 inspector가 같은 톤으로 연결됩니다."
        />
        <div className="mt-8 grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
          <Card variant="subtle" title="편집 리듬" description="작업 흐름과 데이터 맥락을 먼저 보여주고, 세부 설정은 오른쪽에서 깊게 다룹니다.">
            <div className="space-y-3">
              {[
                "좌측 레일: 업로드에서 넘어온 흐름과 데이터 맥락을 정리합니다.",
                "중앙 캔버스: 결과물 자체에 집중하게 만드는 프레임입니다.",
                "우측 inspector: 차트별 옵션과 텍스트, 축, 라벨, 레이아웃을 조절합니다."
              ].map((item, index) => (
                <div
                  key={item}
                  className={
                    index === 1
                      ? "rounded-2xl border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1"
                      : "rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card variant="canvas" className="overflow-hidden" title="MAC Editor" description="차트 편집기가 문서 데모가 아니라 실제 작업 도구처럼 보이도록 프레임과 위계를 정리했습니다.">
            <div className="rounded-[24px] border border-line-strong bg-surface-1 shadow-soft">
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
                  <div className="rounded-2xl border border-line-subtle bg-surface-2/88 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Flow Rail</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">차트 선택 → 데이터 연결 → 옵션 조정</p>
                  </div>
                  <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-sm font-medium text-ink-1">선 차트</p>
                    <p className="mt-2 text-sm leading-6 text-ink-2">흐름과 변화를 보여줄 때 가장 자연스럽습니다.</p>
                  </div>
                </div>

                <div className="chart-paper rounded-[24px] border border-line-strong/80 p-4">
                  <PlaceholderChart chartType="line" heightClassName="h-[380px]" />
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Data</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">가로축, 값, 범례 연결</p>
                  </div>
                  <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Labels</p>
                    <p className="mt-2 text-sm font-medium text-ink-1">값 라벨, 이름, 표기 방식</p>
                  </div>
                  <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-4">
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
          description="기본 샘플 SVG처럼 느껴지지 않도록 차트별 미리보기 톤과 캔버스 문맥을 함께 정리합니다."
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
