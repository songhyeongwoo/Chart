import { Button, PlaceholderChart, PublicShell, SectionHeader } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../components/public-nav";

const heroSignals = [
  "CSV/XLSX를 올리면 차트 초안을 먼저 보여줍니다.",
  "제목, 라벨, 축, 범례, 색을 한국어로 직접 다듬습니다.",
  "보고서와 발표자료에 바로 넣을 결과물 톤으로 정리합니다."
];

const outputGallery = [
  {
    chartType: "line" as const,
    eyebrow: "Line Output",
    title: "증감 흐름을 발표용 톤으로 정리",
    description: "핵심 지점 라벨, 얇은 그리드, 보조 카피까지 포함해 보고서 화면처럼 보여줍니다."
  },
  {
    chartType: "bar" as const,
    eyebrow: "Bar Output",
    title: "비교 장면이 또렷한 막대 차트",
    description: "정렬, Top N, 막대 밀도와 값 라벨이 함께 읽히도록 프레이밍했습니다."
  },
  {
    chartType: "donut" as const,
    eyebrow: "Donut Output",
    title: "구성비가 가볍지 않게 보이는 도넛",
    description: "조각, 중심 메시지, 범례 카드가 한 결과물 안에서 통일된 리듬을 가집니다."
  },
  {
    chartType: "racing-bar" as const,
    eyebrow: "Racing Output",
    title: "움직임을 예고하는 racing bar",
    description: "지금은 정적 프리뷰지만 MP4/GIF 확장으로 이어질 시간감이 보이도록 설계했습니다."
  }
];

function HeroWorkspaceScene() {
  return (
    <div className="hero-stage hero-grid grain-mask relative min-h-[620px] overflow-hidden rounded-[36px] border border-white/10 p-5 md:p-6">
      <span className="hero-orb left-[-4%] top-[-10%] h-44 w-44 bg-[#45657b]/30" />
      <span className="hero-orb right-[6%] top-[8%] h-56 w-56 bg-[#c18e68]/20" />
      <span className="hero-orb bottom-[-14%] left-[36%] h-72 w-72 bg-white/6" />

      <div className="scene-panel flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-white/78">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/48">MAC Workspace</p>
          <p className="mt-1 text-sm font-medium text-white">업로드에서 결과물까지 이어지는 편집 장면</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="dark-chip">한글 편집</span>
          <span className="dark-chip">추천 초안 반영</span>
          <span className="dark-chip">PNG · SVG 준비</span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[190px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="scene-panel px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">Data Stream</p>
            <div className="mt-4 space-y-3">
              {[
                ["업로드", "growth_q2.xlsx"],
                ["권장 차트", "Line · Bar"],
                ["주요 필드", "월 / 가입자 수 / 채널"],
                ["상태", "편집 가능"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] border border-white/10 bg-white/6 px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/38">{label}</p>
                  <p className="mt-2 text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scene-float px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/44">Flow</p>
            <div className="mt-3 space-y-2.5">
              {["업로드", "추천", "편집", "내보내기"].map((step, index) => (
                <div
                  key={step}
                  className={
                    index === 2
                      ? "rounded-[16px] border border-white/22 bg-white/14 px-3 py-2.5 text-sm text-white"
                      : "rounded-[16px] border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/66"
                  }
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="workspace-void rounded-[32px] border border-white/8 p-4 shadow-[0_36px_90px_rgba(0,0,0,0.35)] md:p-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_272px]">
            <div className="scene-panel-light px-5 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/70 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Presentation Canvas</p>
                  <h3 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.045em] text-ink-1">분기별 성장 흐름</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
                    채널별 증가폭을 바로 발표용 차트로 다듬고, 제목과 라벨을 캔버스에서 함께 조정하는 화면입니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="metric-chip">선 차트</span>
                  <span className="metric-chip">16:10 캔버스</span>
                </div>
              </div>

              <div className="mt-5 rounded-[26px] border border-line-strong/75 bg-[linear-gradient(180deg,rgba(255,253,249,1),rgba(245,240,232,0.96))] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ink-3">Quarterly Subscribers</p>
                    <p className="mt-1 text-sm text-ink-2">광고, 자연 유입, 추천 채널의 증감 흐름</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="metric-chip">라벨 강조</span>
                    <span className="metric-chip">그리드 표시</span>
                  </div>
                </div>

                <svg viewBox="0 0 680 360" className="mt-5 h-[320px] w-full">
                  {[0, 1, 2, 3].map((index) => (
                    <line
                      key={index}
                      x1="72"
                      x2="640"
                      y1={68 + index * 62}
                      y2={68 + index * 62}
                      stroke={index === 3 ? "rgba(173,165,154,0.46)" : "rgba(173,165,154,0.2)"}
                      strokeDasharray={index === 3 ? undefined : "5 10"}
                    />
                  ))}
                  <polyline
                    fill="none"
                    stroke="#233845"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="88,232 182,214 276,186 370,196 464,158 558,132 632,118"
                  />
                  <polyline
                    fill="none"
                    stroke="#c18e68"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="88,262 182,252 276,234 370,218 464,194 558,168 632,154"
                  />
                  {[
                    ["1월", 88, 232, "34%"],
                    ["2월", 182, 214, ""],
                    ["3월", 276, 186, "52%"],
                    ["4월", 370, 196, ""],
                    ["5월", 464, 158, "61%"],
                    ["6월", 558, 132, ""],
                    ["7월", 632, 118, "68%"]
                  ].map(([label, x, y, value]) => (
                    <g key={label}>
                      <circle cx={x} cy={y} r="5" fill="#233845" />
                      <circle cx={x} cy={y} r="10" fill="transparent" stroke="rgba(35,56,69,0.14)" strokeWidth="1.8" />
                      <text x={x} y="318" textAnchor="middle" fontSize="12" fill="#8A847C">
                        {label}
                      </text>
                      {value ? (
                        <text x={x} y={Number(y) - 18} textAnchor="middle" fontSize="12" fill="#58626c">
                          {value}
                        </text>
                      ) : null}
                    </g>
                  ))}
                  <text x="42" y="72" fontSize="11" fill="#948d84">
                    3,000
                  </text>
                  <text x="42" y="196" fontSize="11" fill="#948d84">
                    2,000
                  </text>
                  <text x="42" y="318" fontSize="11" fill="#948d84">
                    1,000
                  </text>
                </svg>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="metric-chip">신규 유입</span>
                  <span className="metric-chip">브랜드 검색</span>
                  <span className="metric-chip">보고서 캡션 포함</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="scene-float px-4 py-4 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">Inspector</p>
                    <p className="mt-2 text-sm font-medium">선 차트 스타일</p>
                  </div>
                  <span className="dark-chip">실시간 반영</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ["제목/부제목", "보고서 톤으로 정리"],
                    ["포인트 표시", "핵심 지점만 강조"],
                    ["선 굵기", "균형"],
                    ["축/그리드", "표시"],
                    ["범례 위치", "오른쪽"],
                    ["팔레트", "Studio Slate"]
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className={
                        index === 1
                          ? "rounded-[18px] border border-white/24 bg-white/16 px-3 py-3"
                          : "rounded-[18px] border border-white/10 bg-white/6 px-3 py-3"
                      }
                    >
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/42">{label}</p>
                      <p className="mt-1.5 text-sm text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="scene-panel px-4 py-4 text-white/82">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">Export Surface</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["PNG", "JPG", "SVG", "MP4", "GIF"].map((format, index) => (
                    <span
                      key={format}
                      className={
                        index < 3
                          ? "dark-chip border-white/14 bg-white/12 text-white"
                          : "dark-chip text-white/56"
                      }
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/66">정적 내보내기는 지금의 결과물 톤을 유지하고, motion export는 racing bar 확장으로 이어집니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingEditorScene() {
  return (
    <div className="workspace-shell overflow-hidden rounded-[34px] border border-line-strong/80 p-5 shadow-panel md:p-6">
      <div className="rounded-[28px] border border-line-subtle bg-surface-1/84 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Editor First Screen</p>
            <p className="mt-1 text-sm font-medium text-ink-1">작업 맥락, 차트 캔버스, inspector가 한 장면으로 붙는 화면</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="metric-chip">저장 상태</span>
            <span className="metric-chip">미리보기</span>
            <span className="metric-chip">내보내기 확장</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)_320px]">
        <div className="workspace-void rounded-[28px] border border-white/8 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/42">Flow Rail</p>
          <div className="mt-4 space-y-3">
            {[
              ["데이터", "월 / 가입자 / 채널 연결"],
              ["추천", "선 차트 초안 반영"],
              ["편집", "제목, 색상, 라벨 조정"],
              ["완성", "보고서/발표용 결과물"]
            ].map(([title, copy], index) => (
              <div
                key={title}
                className={
                  index === 2
                    ? "rounded-[18px] border border-white/20 bg-white/16 px-3 py-3"
                    : "rounded-[18px] border border-white/10 bg-white/6 px-3 py-3"
                }
              >
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1.5 text-xs leading-5 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-paper rounded-[30px] border border-line-strong/75 px-5 py-5 shadow-[0_26px_72px_rgba(20,22,20,0.12)]">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/70 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Chart Canvas</p>
              <h3 className="mt-2 text-[1.58rem] font-semibold tracking-[-0.04em] text-ink-1">분기별 성장 흐름</h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">중앙 결과물이 가장 먼저 보이도록 캔버스 프레임과 주변 UI의 톤 차이를 크게 벌렸습니다.</p>
            </div>
            <span className="metric-chip">선 차트</span>
          </div>

          <div className="mt-5">
            <PlaceholderChart chartType="line" heightClassName="h-[420px]" />
          </div>
        </div>

        <div className="workspace-shell rounded-[30px] border border-line-strong/75 p-4 shadow-soft">
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Inspector</p>
          <div className="mt-4 grid gap-3">
            {[
              ["제목 · 부제목 · 캡션", "문서형 텍스트 계층"],
              ["포인트 표시 · 선 굵기", "line 전용 옵션"],
              ["축 · 그리드 · 범례", "읽기 구조 조정"],
              ["라벨 방식 · 밀도 · 굵기", "보고서 톤 제어"],
              ["팔레트", "Studio / Moss / Charcoal"],
              ["비율 · 밀도", "16:10 / 4:3 / 1:1"]
            ].map(([label, value], index) => (
              <div
                key={label}
                className={
                  index === 1
                    ? "rounded-[20px] border border-line-accent bg-surface-1 px-4 py-4 shadow-soft"
                    : "rounded-[20px] border border-line-subtle bg-surface-1/94 px-4 py-4"
                }
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">{label}</p>
                <p className="mt-1.5 text-sm font-medium text-ink-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <section className="pb-16 pt-6">
        <div className="hero-spotlight overflow-hidden rounded-[42px] px-6 py-8 shadow-[0_54px_140px_rgba(14,17,22,0.24)] md:px-8 md:py-10 xl:px-10 xl:py-12">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-center">
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="brand-chip">Korean No-Code Visualization Editor</span>
                <span className="brand-chip">Chart Draft to Final Output</span>
              </div>

              <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-white/50">데이터를 올리고, 결과물을 다듬는 작업대</p>
              <h2 className="mt-4 max-w-[10ch] font-display text-hero font-semibold tracking-[-0.07em] text-white">
                초안은 빠르게,
                <br />
                차트는 내 손으로.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[1.02rem] leading-7 text-white/72">
                CSV와 XLSX를 올리면 맞는 차트를 먼저 제안하고, 제목과 라벨, 축과 범례, 색과 밀도를 한국어로 직접 다듬는 차트 편집기입니다.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/app/projects">
                  <Button size="lg">작업공간 열기</Button>
                </Link>
                <Link href="/app/projects/proj_q1-growth/editor">
                  <Button size="lg" variant="secondary">
                    에디터 먼저 보기
                  </Button>
                </Link>
              </div>

              <div className="mt-10 space-y-3">
                {heroSignals.map((signal, index) => (
                  <div
                    key={signal}
                    className={
                      index === 1
                        ? "rounded-[22px] border border-white/16 bg-white/10 px-4 py-3 text-sm leading-6 text-white"
                        : "rounded-[22px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/68"
                    }
                  >
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <HeroWorkspaceScene />
          </div>
        </div>
      </section>

      <section className="py-16">
        <SectionHeader
          eyebrow="Output Gallery"
          title="내보내고 싶은 차트가 먼저 보이도록"
          description="MAC의 핵심 가치는 기능 목록이 아니라 결과물입니다. line, bar, donut, racing bar를 모두 export-ready 샘플처럼 다시 구성했습니다."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
          <article className="gallery-paper overflow-hidden rounded-[34px] border border-line-strong px-5 py-5 shadow-panel md:px-6 md:py-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-subtle/70 pb-5">
              <div>
                <p className="brand-kicker">{outputGallery[0].eyebrow}</p>
                <h3 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-ink-1">{outputGallery[0].title}</h3>
                <p className="mt-3 max-w-[42rem] text-body leading-7 text-ink-2">{outputGallery[0].description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="metric-chip">발표용 캔버스</span>
                <span className="metric-chip">핵심 포인트 라벨</span>
                <span className="metric-chip">캡션 포함</span>
              </div>
            </div>

            <div className="mt-6">
              <PlaceholderChart chartType="line" heightClassName="h-[520px]" />
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
            <article className="brand-panel-strong overflow-hidden px-5 py-5 md:px-6">
              <p className="brand-kicker">{outputGallery[2].eyebrow}</p>
              <div className="mt-3">
                <PlaceholderChart chartType="donut" heightClassName="h-[390px]" />
              </div>
              <div className="mt-4 border-t border-line-subtle/70 pt-4">
                <p className="text-lg font-semibold tracking-[-0.03em] text-ink-1">{outputGallery[2].title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">{outputGallery[2].description}</p>
              </div>
            </article>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <article className="brand-panel overflow-hidden px-4 py-4">
                <p className="brand-kicker">{outputGallery[1].eyebrow}</p>
                <div className="mt-3">
                  <PlaceholderChart chartType="bar" heightClassName="h-[320px]" />
                </div>
                <p className="mt-4 text-base font-semibold tracking-[-0.03em] text-ink-1">{outputGallery[1].title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">{outputGallery[1].description}</p>
              </article>

              <article className="brand-panel overflow-hidden px-4 py-4">
                <p className="brand-kicker">{outputGallery[3].eyebrow}</p>
                <div className="mt-3">
                  <PlaceholderChart chartType="racing-bar" heightClassName="h-[320px]" />
                </div>
                <p className="mt-4 text-base font-semibold tracking-[-0.03em] text-ink-1">{outputGallery[3].title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-2">{outputGallery[3].description}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-8 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
          <div>
            <p className="brand-kicker">Editor Proof</p>
            <h2 className="mt-3 text-title-1 font-semibold tracking-[-0.05em] text-ink-1">차트를 수정하는 도구처럼 보여야 합니다</h2>
            <p className="mt-4 text-body leading-7 text-ink-2">
              에디터는 설명 카드가 아니라 작업 공간이어야 합니다. 가운데는 결과물, 오른쪽은 조정 패널, 왼쪽은 데이터 맥락과 작업 흐름이 되도록 구조를 다시 잡았습니다.
            </p>
            <div className="mt-7 space-y-3">
              {[
                "중앙 chart canvas가 가장 크게 보이도록 프레임과 대비를 재구성했습니다.",
                "inspector는 chart type에 따라 다른 옵션이 바로 드러나는 구조로 바뀝니다.",
                "저장 상태와 미리보기, 내보내기 의도를 상단 액션 바에 함께 올렸습니다."
              ].map((item, index) => (
                <div
                  key={item}
                  className={
                    index === 1
                      ? "rounded-[24px] border border-line-accent bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-1 shadow-soft"
                      : "rounded-[24px] border border-line-subtle bg-surface-1/86 px-4 py-4 text-sm leading-6 text-ink-2"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <LandingEditorScene />
        </div>
      </section>
    </PublicShell>
  );
}
