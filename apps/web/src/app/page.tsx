import { Button, PlaceholderChart, PublicShell, SectionHeader } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";

const flowSteps = [
  { label: "데이터 업로드", value: "CSV/XLSX" },
  { label: "차트 추천", value: "선 차트 초안" },
  { label: "상세 편집", value: "라벨, 축, 색상" },
  { label: "내보내기", value: "PNG/SVG 준비" }
];

const gallery = [
  {
    chartType: "line" as const,
    title: "분기별 성장 흐름",
    description: "핵심 포인트 라벨과 얇은 그리드를 더해 보고서에 바로 들어갈 톤으로 정리합니다."
  },
  {
    chartType: "donut" as const,
    title: "유입 구성비",
    description: "조각, 중앙 요약, 범례 카드를 하나의 결과물 리듬으로 묶습니다."
  },
  {
    chartType: "bar" as const,
    title: "채널별 실적 비교",
    description: "정렬, Top N, 값 라벨이 함께 읽히는 발표용 비교 장면입니다."
  },
  {
    chartType: "racing-bar" as const,
    title: "지역별 순위 프레임",
    description: "MP4/GIF 확장 전에도 시간감과 순위 변화가 보이는 프리뷰입니다."
  }
];

function HeroProductScene() {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-[#101820] p-3 shadow-[0_44px_120px_rgba(9,14,18,0.38)] xl:min-h-[620px] xl:p-4">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative grid h-full min-h-[494px] gap-3 xl:min-h-[588px] xl:grid-cols-[170px_minmax(0,1fr)_236px] xl:gap-4">
        <aside className="hidden flex-col justify-between rounded-[22px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur xl:flex">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Data</p>
            <div className="mt-4 space-y-3">
              {["growth_q2.xlsx", "6 columns", "18 rows", "UTF-8"].map((item) => (
                <div key={item} className="rounded-[16px] border border-white/10 bg-white/[0.05] px-3 py-3 text-sm font-medium text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {flowSteps.map((step, index) => (
              <div
                key={step.label}
                className={
                  index === 2
                    ? "rounded-[16px] border border-white/24 bg-white/16 px-3 py-2.5"
                    : "rounded-[16px] border border-white/10 bg-white/[0.04] px-3 py-2.5"
                }
              >
                <p className="text-[11px] text-white/48">{step.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{step.value}</p>
              </div>
            ))}
          </div>
        </aside>

        <main className="rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(239,234,226,0.96))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] xl:rounded-[24px] xl:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/80 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3">Recommended Canvas</p>
              <h3 className="mt-2 text-[1.8rem] font-semibold tracking-[-0.045em] text-ink-1">분기별 성장 흐름</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
                업로드한 열 구조를 바탕으로 추천 차트가 먼저 열리고, 결과물 안에서 바로 편집합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="metric-chip">추천 반영</span>
              <span className="metric-chip">16:10</span>
              <span className="metric-chip">저장됨</span>
            </div>
          </div>

          <div className="mt-5">
            <PlaceholderChart chartType="line" heightClassName="min-h-[360px] xl:min-h-[420px]" />
          </div>
        </main>

        <aside className="hidden rounded-[22px] border border-white/10 bg-white/[0.07] p-4 text-white backdrop-blur xl:block">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Inspector</p>
              <p className="mt-2 text-sm font-semibold">선 차트 옵션</p>
            </div>
            <span className="dark-chip">live</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["제목", "보고서 톤"],
              ["포인트", "핵심만 표시"],
              ["축/그리드", "표시"],
              ["범례", "오른쪽"],
              ["라벨", "값 + 이름"],
              ["팔레트", "Studio Slate"]
            ].map(([label, value], index) => (
              <div
                key={label}
                className={
                  index === 1
                    ? "rounded-[16px] border border-white/24 bg-white/16 px-3 py-3"
                    : "rounded-[16px] border border-white/10 bg-white/[0.05] px-3 py-3"
                }
              >
                <p className="text-[11px] text-white/46">{label}</p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[18px] border border-white/10 bg-black/18 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Export</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["PNG", "JPG", "SVG", "MP4", "GIF"].map((item, index) => (
                <span key={item} className={index < 3 ? "dark-chip bg-white/14 text-white" : "dark-chip text-white/52"}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="min-h-[calc(100vh-7rem)] pb-14 pt-6">
        <div className="grid gap-7 lg:grid-cols-[0.52fr_1fr] lg:items-center xl:grid-cols-[0.68fr_1.32fr]">
          <div className="relative z-10 max-w-[520px]">
            <p className="brand-kicker">Korean no-code chart editor</p>
            <h1 className="mt-5 max-w-[10ch] text-[clamp(2.8rem,4.7vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-ink-1">
              올리면,
              <br />
              완성까지.
            </h1>
            <p className="mt-6 max-w-[31rem] text-[1rem] leading-7 text-ink-2">
              CSV/XLSX를 올리고, 추천 차트를 고른 뒤, 한국어 inspector로 결과물을 직접 다듬습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app/projects/new">
                <Button size="lg">시작하기</Button>
              </Link>
              <Link href="/app/projects">
                <Button size="lg" variant="secondary">
                  작업공간 열기
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-5 gap-y-4 border-y border-line-subtle py-5">
              {flowSteps.map((step) => (
                <div key={step.label}>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3">{step.label}</p>
                  <p className="mt-1 text-sm font-medium text-ink-1">{step.value}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroProductScene />
        </div>
      </section>

      <section className="py-14">
        <SectionHeader
          eyebrow="Product Flow"
          title="첫 화면 이후는 바로 제품 흐름입니다"
          description="작업공간, 업로드, 추천, 에디터, 저장 관리가 끊기지 않도록 MAC의 화면 구조를 실제 편집 제품 기준으로 정리했습니다."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {flowSteps.map((step, index) => (
            <div key={step.label} className="border-t border-line-strong pt-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-3">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-ink-1">{step.label}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{step.value} 단계가 다음 화면의 기본 상태로 이어집니다.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <SectionHeader
          eyebrow="Output Gallery"
          title="결과물이 먼저 신뢰를 만듭니다"
          description="line, bar, donut, racing bar 모두 발표자료에 넣을 수 있는 프레임과 읽기 위계를 기준으로 보여줍니다."
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <article className="overflow-hidden rounded-[28px] border border-line-strong bg-surface-1/92 p-5 shadow-panel">
            <div className="border-b border-line-subtle pb-5">
              <p className="brand-kicker">Primary Output</p>
              <h3 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-ink-1">{gallery[0].title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-2">{gallery[0].description}</p>
            </div>
            <div className="mt-5">
              <PlaceholderChart chartType="line" heightClassName="min-h-[520px]" />
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
            {gallery.slice(1).map((item) => (
              <article key={item.title} className="overflow-hidden border-t border-line-strong pt-5">
                <PlaceholderChart chartType={item.chartType} heightClassName="min-h-[300px]" />
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.035em] text-ink-1">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
