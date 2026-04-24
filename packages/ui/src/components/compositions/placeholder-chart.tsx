import type { ChartType } from "@mac/domain";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface PlaceholderChartProps {
  chartType?: ChartType | "racing-bar";
  className?: string;
  heightClassName?: string;
}

const axisLabels = ["1월", "2월", "3월", "4월", "5월", "6월"];
const barValues = [34, 46, 58, 54, 72, 68];
const lineValues = [1680, 1820, 2050, 1980, 2380, 2640];
const palette = ["#304752", "#51707D", "#6C8174", "#B0835B", "#CC9B74", "#D8C4AE"];

function ChartShell({
  title,
  description,
  badge,
  className,
  heightClassName,
  children
}: {
  title: string;
  description: string;
  badge: string;
  className?: string;
  heightClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("chart-paper rounded-[22px] border border-line-strong/75 px-5 pb-5 pt-5 shadow-inset", heightClassName, className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Presentation-ready preview</p>
          <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-ink-1">{title}</p>
          <p className="mt-1 text-xs leading-5 text-ink-2">{description}</p>
        </div>
        <span className="rounded-full border border-line-subtle bg-surface-1/92 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-2">{badge}</span>
      </div>
      {children}
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
      const x = 64 + index * 102;
      const y = 230 - (value / max) * 156;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPath = `M 64 230 L ${lineValues
    .map((value, index) => {
      const x = 64 + index * 102;
      const y = 230 - (value / max) * 156;
      return `${x} ${y}`;
    })
    .join(" L ")} L 574 230 Z`;

  return (
    <ChartShell title="1분기 성장 흐름" description="광고, 자연 유입, 추천 채널의 월간 증가 흐름을 바로 발표용 톤으로 정리합니다." badge="선 차트">
      <div className="rounded-[20px] border border-line-subtle bg-surface-1/92 px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_178px]">
          <div className="rounded-[18px] border border-line-subtle/80 bg-[linear-gradient(180deg,rgba(255,253,250,1),rgba(246,241,233,0.96))] px-3 py-3">
            <svg viewBox="0 0 620 280" className="h-[280px] w-full">
              {[0, 1, 2, 3].map((index) => {
                const y = 56 + index * 44;
                return (
                  <line
                    key={index}
                    x1="56"
                    x2="586"
                    y1={y}
                    y2={y}
                    stroke={index === 3 ? "rgba(175,166,154,0.36)" : "rgba(175,166,154,0.18)"}
                    strokeDasharray={index === 3 ? undefined : "4 8"}
                  />
                );
              })}
              <path d={areaPath} fill="rgba(81,112,125,0.12)" />
              <polyline fill="none" stroke="#304752" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} />
              <polyline
                fill="none"
                stroke="rgba(176,131,91,0.86)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="64,188 166,176 268,164 370,152 472,124 574,112"
              />
              {lineValues.map((value, index) => {
                const x = 64 + index * 102;
                const y = 230 - (value / max) * 156;
                return (
                  <g key={axisLabels[index]}>
                    <circle cx={x} cy={y} r="5.5" fill={palette[0]} />
                    <circle cx={x} cy={y} r="10" fill="transparent" stroke="rgba(48,71,82,0.16)" strokeWidth="1.5" />
                    <text x={x} y="258" textAnchor="middle" fontSize="11" fill="#7B7973">
                      {axisLabels[index]}
                    </text>
                    {index === axisLabels.length - 1 ? (
                      <text x={x + 14} y={y - 12} fontSize="11" fill="#4A545C">
                        {new Intl.NumberFormat("ko-KR").format(value)}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              <text x="14" y="60" fontSize="11" fill="#8B877F">
                3k
              </text>
              <text x="14" y="146" fontSize="11" fill="#8B877F">
                2k
              </text>
              <text x="14" y="232" fontSize="11" fill="#8B877F">
                1k
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            <div className="rounded-[18px] border border-line-subtle bg-surface-2/78 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Inspector snapshot</p>
              <p className="mt-2 text-sm font-medium text-ink-1">제목 · 범례 · 라벨 · 그리드</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">결과물을 보면서 바로 조정하는 제품형 컨트롤 톤.</p>
            </div>
            <div className="rounded-[18px] border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Output note</p>
              <p className="mt-2 text-sm font-medium text-ink-1">보고서 캡션이 붙는 차트 캔버스</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">차트와 캡션, 보조 정보가 하나의 결과물처럼 정리됩니다.</p>
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
    <ChartShell title="채널별 실적 비교" description="비교가 한눈에 읽히도록 막대 밀도와 축 여백을 발표용으로 정리합니다." badge="막대 차트">
      <div className="rounded-[20px] border border-line-subtle bg-surface-1/92 px-4 py-4">
        <div className="grid h-[280px] grid-cols-[44px_minmax(0,1fr)] gap-3">
          <div className="flex flex-col justify-between pt-3 text-[11px] text-ink-3">
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-[220px]">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={cn("absolute inset-x-0 border-t", index === 3 ? "border-line-subtle/80" : "border-dashed border-line-subtle/55")}
                  style={{ top: `${index * 25}%` }}
                />
              ))}
            </div>
            <div className="grid h-[220px] items-end gap-3" style={{ gridTemplateColumns: `repeat(${barValues.length}, minmax(0, 1fr))` }}>
              {barValues.map((value, index) => (
                <div key={axisLabels[index]} className="flex min-w-0 flex-col justify-end">
                  <div className="mb-2 text-center text-[11px] font-medium text-ink-2">{value}%</div>
                  <div
                    className="rounded-t-[14px]"
                    style={{
                      height: `${value * 2.4}px`,
                      background: `linear-gradient(180deg, ${palette[index % palette.length]}, rgba(48,71,82,0.88))`
                    }}
                  />
                  <div className="mt-3 text-center text-[11px] text-ink-3">{axisLabels[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LegendRow items={axisLabels.slice(0, 4).map((label, index) => ({ label, color: palette[index % palette.length] }))} />
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
    <ChartShell title="유입 구성비" description="도넛 조각과 범례 카드가 같은 톤으로 묶여 구성비가 더 정제되어 보입니다." badge="도넛 차트">
      <div className="grid h-full min-h-[300px] gap-5 rounded-[20px] border border-line-subtle bg-surface-1/92 px-5 py-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
        <div className="flex items-center justify-center">
          <div className="relative size-48 rounded-full shadow-soft" style={{ background: `conic-gradient(${segments})` }}>
            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(245,240,232,0.94))]">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-3">총합</span>
              <span className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-ink-1">100%</span>
              <span className="mt-1 text-[11px] leading-4 text-ink-3">보고서용 구성비</span>
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
            <div key={label} className="rounded-[16px] border border-line-subtle bg-surface-1 px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                  <span className="text-sm font-medium text-ink-1">{label}</span>
                </div>
                <span className="text-sm text-ink-2">{value}</span>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-ink-3">범례와 차트 안쪽 메시지가 같은 흐름으로 읽히도록 정리합니다.</p>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

function RacingBarPreview() {
  return (
    <ChartShell title="2026 지역별 순위 프레임" description="지금은 정적 프리뷰지만, 향후 MP4/GIF로 이어질 수 있는 motion-ready 정체성을 암시합니다." badge="racing bar">
      <div className="rounded-[20px] border border-line-subtle bg-surface-1/92 px-5 py-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-line-subtle bg-surface-2/72 px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Timeline</p>
            <p className="mt-1 text-sm font-medium text-ink-1">프레임 12 / 48</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[11px] text-ink-2">24fps 준비</span>
            <span className="rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[11px] text-ink-2">재생 감각 포함</span>
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
                    background: `linear-gradient(90deg, ${palette[index % palette.length]}, rgba(48,71,82,0.92))`
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
      <ChartShell title="분포 미리보기" description="항목별 분포를 간단히 훑어보는 장면입니다." badge="산점도" className={className} heightClassName={heightClassName}>
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
      <ChartShell title="표본 데이터 미리보기" description="업로드 직후 열 구조와 표본 행을 먼저 확인하는 관문입니다." badge="데이터 테이블" className={className} heightClassName={heightClassName}>
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
