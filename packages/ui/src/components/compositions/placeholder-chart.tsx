import type { ChartType } from "@mac/domain";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface PlaceholderChartProps {
  chartType?: ChartType | "racing-bar";
  className?: string;
  heightClassName?: string;
}

const axisLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월"];
const barValues = [46, 58, 64, 52, 72];
const lineValues = [1680, 1810, 2040, 1980, 2310, 2580, 2760];
const palette = ["#233845", "#496372", "#6A7C78", "#A17250", "#C18E68", "#DDD1C0"];

function ChartShell({
  title,
  subtitle,
  badge,
  source,
  note,
  className,
  heightClassName,
  children
}: {
  title: string;
  subtitle: string;
  badge: string;
  source: string;
  note: string;
  className?: string;
  heightClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("gallery-paper rounded-[28px] border border-line-strong/75 px-5 pb-5 pt-5 shadow-[0_22px_64px_rgba(18,20,18,0.08)]", heightClassName, className)}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-subtle/70 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Export-ready chart sample</p>
          <h3 className="mt-2 text-[1.08rem] font-semibold tracking-[-0.035em] text-ink-1">{title}</h3>
          <p className="mt-2 max-w-[32rem] text-sm leading-6 text-ink-2">{subtitle}</p>
        </div>
        <span className="metric-chip">{badge}</span>
      </div>

      <div className="mt-5">{children}</div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle/70 pt-4">
        <p className="text-[11px] text-ink-3">Source · {source}</p>
        <p className="text-[11px] text-ink-2">{note}</p>
      </div>
    </div>
  );
}

function LegendRow({ items }: { items: Array<{ label: string; color: string }> }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-surface-1/90 px-3 py-1.5 text-[11px] text-ink-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

function LinePreview() {
  const max = Math.max(...lineValues);
  const points = lineValues
    .map((value, index) => {
      const x = 68 + index * 86;
      const y = 248 - (value / max) * 170;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPath = `M 68 248 L ${lineValues
    .map((value, index) => {
      const x = 68 + index * 86;
      const y = 248 - (value / max) * 170;
      return `${x} ${y}`;
    })
    .join(" L ")} L 584 248 Z`;

  return (
    <ChartShell
      title="분기별 성장 흐름"
      subtitle="광고, 자연 유입, 추천 채널의 증가폭을 핵심 포인트 라벨과 함께 보고서용 톤으로 정리합니다."
      badge="선 차트"
      source="growth_q2.xlsx"
      note="핵심 포인트 3개 강조"
    >
      <div className="rounded-[24px] border border-line-subtle bg-surface-1/92 px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Performance View</p>
            <p className="mt-1 text-sm text-ink-2">월별 가입자 증가 흐름</p>
          </div>
          <div className="flex gap-2">
            <span className="metric-chip">라벨 표시</span>
            <span className="metric-chip">범례 오른쪽</span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_196px]">
          <div className="rounded-[20px] border border-line-subtle/80 bg-[linear-gradient(180deg,rgba(255,253,250,1),rgba(246,241,233,0.96))] px-3 py-3">
            <svg viewBox="0 0 640 320" className="h-[300px] w-full">
              {[0, 1, 2, 3].map((index) => {
                const y = 76 + index * 56;
                return (
                  <line
                    key={index}
                    x1="56"
                    x2="600"
                    y1={y}
                    y2={y}
                    stroke={index === 3 ? "rgba(173,165,154,0.38)" : "rgba(173,165,154,0.18)"}
                    strokeDasharray={index === 3 ? undefined : "5 9"}
                  />
                );
              })}
              <path d={areaPath} fill="rgba(73,99,114,0.1)" />
              <polyline fill="none" stroke="#233845" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" points={points} />
              <polyline
                fill="none"
                stroke="#c18e68"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="68,268 154,252 240,232 326,210 412,184 498,166 584,150"
              />
              {lineValues.map((value, index) => {
                const x = 68 + index * 86;
                const y = 248 - (value / max) * 170;
                const shouldLabel = index === 0 || index === 2 || index === 4 || index === lineValues.length - 1;

                return (
                  <g key={axisLabels[index]}>
                    <circle cx={x} cy={y} r="4.6" fill={palette[0]} />
                    <circle cx={x} cy={y} r="9.5" fill="transparent" stroke="rgba(35,56,69,0.14)" strokeWidth="1.5" />
                    <text x={x} y="292" textAnchor="middle" fontSize="11" fill="#857f77">
                      {axisLabels[index]}
                    </text>
                    {shouldLabel ? (
                      <text x={x} y={y - 16} textAnchor="middle" fontSize="11" fill="#58626c">
                        {Math.round((value / max) * 100)}%
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <text x="18" y="80" fontSize="11" fill="#948d84">
                3,000
              </text>
              <text x="18" y="192" fontSize="11" fill="#948d84">
                2,000
              </text>
              <text x="18" y="292" fontSize="11" fill="#948d84">
                1,000
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            <div className="rounded-[18px] border border-line-subtle bg-surface-2/78 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Inspector Snapshot</p>
              <p className="mt-2 text-sm font-medium text-ink-1">제목 · 포인트 · 범례 · 라벨</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">핵심 지점을 지목하는 문서형 컨트롤 구조.</p>
            </div>
            <div className="rounded-[18px] border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Output Note</p>
              <p className="mt-2 text-sm font-medium text-ink-1">캡션과 소스가 붙는 결과물 캔버스</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">차트 외부 정보도 같은 결과물 안에서 정리됩니다.</p>
            </div>
          </div>
        </div>

        <LegendRow
          items={[
            { label: "신규 유입", color: palette[0] },
            { label: "브랜드 검색", color: palette[3] }
          ]}
        />
      </div>
    </ChartShell>
  );
}

function BarPreview() {
  return (
    <ChartShell
      title="채널별 실적 비교"
      subtitle="정렬과 막대 밀도, 값 라벨의 균형을 맞춰 비교 차트가 가볍지 않게 읽히도록 만들었습니다."
      badge="막대 차트"
      source="channel_mix.csv"
      note="Top 5 기준"
    >
      <div className="rounded-[24px] border border-line-subtle bg-surface-1/92 px-4 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Category Comparison</p>
            <p className="mt-1 text-sm text-ink-2">성과 채널별 전환율 비교</p>
          </div>
          <span className="metric-chip">값 라벨 표시</span>
        </div>

        <div className="grid h-[280px] grid-cols-[44px_minmax(0,1fr)] gap-3">
          <div className="flex flex-col justify-between pt-3 text-[11px] text-ink-3">
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-[228px]">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={cn("absolute inset-x-0 border-t", index === 3 ? "border-line-subtle/80" : "border-dashed border-line-subtle/55")}
                  style={{ top: `${index * 25}%` }}
                />
              ))}
            </div>
            <div className="grid h-[228px] items-end gap-3" style={{ gridTemplateColumns: `repeat(${barValues.length}, minmax(0, 1fr))` }}>
              {barValues.map((value, index) => (
                <div key={index} className="flex min-w-0 flex-col justify-end">
                  <div className="mb-2 text-center text-[11px] font-medium text-ink-2">{value}%</div>
                  <div
                    className="rounded-t-[16px] border border-white/26"
                    style={{
                      height: `${value * 2.8}px`,
                      background: `linear-gradient(180deg, ${palette[index % palette.length]}, rgba(35,56,69,0.92))`
                    }}
                  />
                  <div className="mt-3 text-center text-[11px] text-ink-3">{["광고", "추천", "브랜드", "행사", "직접"][index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <LegendRow
          items={[
            { label: "광고", color: palette[0] },
            { label: "추천", color: palette[1] },
            { label: "브랜드", color: palette[3] }
          ]}
        />
      </div>
    </ChartShell>
  );
}

function DonutPreview() {
  const segments = [
    `${palette[0]} 0 31%`,
    `rgb(250 247 242) 31% 32.3%`,
    `${palette[1]} 32.3% 56%`,
    `rgb(250 247 242) 56% 57.3%`,
    `${palette[3]} 57.3% 73%`,
    `rgb(250 247 242) 73% 74.3%`,
    `${palette[4]} 74.3% 88%`,
    `rgb(250 247 242) 88% 89.3%`,
    `${palette[2]} 89.3% 100%`
  ].join(", ");

  return (
    <ChartShell
      title="유입 구성비"
      subtitle="중앙 요약, 조각 간격, 범례 카드가 하나의 결과물처럼 읽히는 도넛 샘플입니다."
      badge="도넛 차트"
      source="campaign_mix.xlsx"
      note="범례 오른쪽 정렬"
    >
      <div className="grid h-full min-h-[300px] gap-5 rounded-[24px] border border-line-subtle bg-surface-1/92 px-5 py-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
        <div className="flex items-center justify-center">
          <div className="relative size-48 rounded-full shadow-soft" style={{ background: `conic-gradient(${segments})` }}>
            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(245,240,232,0.94))]">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-3">총합</span>
              <span className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-ink-1">100%</span>
              <span className="mt-1 text-[11px] leading-4 text-ink-3">채널 구성비 요약</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            ["브랜드 검색", "31%"],
            ["광고", "24%"],
            ["추천", "18%"],
            ["행사", "14%"]
          ].map(([label, value], index) => (
            <div key={label} className="rounded-[18px] border border-line-subtle bg-surface-1 px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                  <span className="text-sm font-medium text-ink-1">{label}</span>
                </div>
                <span className="text-sm text-ink-2">{value}</span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-ink-3">라벨, 비중, 설명이 조각 카드 안에서 함께 읽히도록 정리했습니다.</p>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

function RacingBarPreview() {
  return (
    <ChartShell
      title="2026 지역별 순위 프레임"
      subtitle="정적 프리뷰 안에서도 프레임, 속도, 순위 변동의 감각이 느껴지도록 motion-ready 톤을 붙였습니다."
      badge="racing bar"
      source="regional_rank.csv"
      note="MP4 · GIF 확장 대비"
    >
      <div className="rounded-[24px] border border-line-subtle bg-surface-1/92 px-5 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-line-subtle bg-surface-2/72 px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Timeline</p>
            <p className="mt-1 text-sm font-medium text-ink-1">프레임 12 / 48</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="metric-chip">24fps 준비</span>
            <span className="metric-chip">재생 속도 조정</span>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "서울", value: "31%", width: 94 },
            { label: "부산", value: "24%", width: 76 },
            { label: "성남", value: "18%", width: 58 },
            { label: "대전", value: "13%", width: 44 }
          ].map((item, index) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-7 items-center justify-center rounded-full border border-line-subtle bg-surface-1 text-xs font-medium text-ink-2">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-ink-1">{item.label}</span>
                </div>
                <span className="text-sm text-ink-2">{item.value}</span>
              </div>
              <div className="rounded-[16px] bg-surface-2 p-1.5">
                <div
                  className="flex h-11 items-center rounded-[12px] px-4 text-xs font-medium text-ink-inverse"
                  style={{
                    width: `${item.width}%`,
                    background: `linear-gradient(90deg, ${palette[index % palette.length]}, rgba(35,56,69,0.92))`
                  }}
                >
                  <span className="truncate">{`${index + 1}위 · ${item.label} · ${item.value}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

export function PlaceholderChart({
  chartType = "bar",
  className,
  heightClassName = "h-[360px]"
}: PlaceholderChartProps) {
  if (chartType === "scatter") {
    return (
      <ChartShell
        title="분포 미리보기"
        subtitle="업로드 직후 값의 분산을 빠르게 훑어볼 수 있는 가벼운 프리뷰입니다."
        badge="산점도"
        source="sample.csv"
        note="밀도 확인용"
        className={className}
        heightClassName={heightClassName}
      >
        <div className="editor-grid-bg relative h-[280px] overflow-hidden rounded-[20px] border border-line-subtle bg-surface-1/92">
          {[
            [18, 70],
            [30, 56],
            [40, 64],
            [49, 44],
            [61, 50],
            [74, 28]
          ].map(([left, top], index) => (
            <span
              key={`${left}-${top}`}
              className="absolute size-3 rounded-full shadow-soft"
              style={{ left: `${left}%`, top: `${top}%`, opacity: 0.78 + index * 0.03, backgroundColor: palette[index % palette.length] }}
            />
          ))}
        </div>
      </ChartShell>
    );
  }

  if (chartType === "table") {
    return (
      <ChartShell
        title="표본 데이터 미리보기"
        subtitle="열 구조와 표본 행을 먼저 확인한 뒤 추천 차트로 넘어가는 업로드 관문입니다."
        badge="데이터 테이블"
        source="sample_upload.xlsx"
        note="구조 확인용"
        className={className}
        heightClassName={heightClassName}
      >
        <div className="overflow-hidden rounded-[20px] border border-line-subtle bg-surface-1/94">
          <div className="grid grid-cols-4 border-b border-line-subtle bg-surface-2 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-ink-3">
            <span>월</span>
            <span>가입자 수</span>
            <span>매출</span>
            <span>채널</span>
          </div>
          {[
            ["1월", "1,240", "18,400", "광고"],
            ["2월", "1,710", "23,200", "자연 유입"],
            ["3월", "1,980", "28,550", "추천"],
            ["4월", "2,140", "31,700", "광고"]
          ].map((row, index) => (
            <div
              key={`${row[0]}-${index}`}
              className="grid grid-cols-4 border-b border-line-subtle/70 px-4 py-3 text-sm text-ink-2 last:border-b-0 odd:bg-surface-1 even:bg-surface-2/45"
            >
              {row.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          ))}
        </div>
      </ChartShell>
    );
  }

  if (chartType === "donut") {
    return <DonutPreview />;
  }

  if (chartType === "racing-bar") {
    return <RacingBarPreview />;
  }

  if (chartType === "line" || chartType === "area") {
    return <LinePreview />;
  }

  return <BarPreview />;
}
