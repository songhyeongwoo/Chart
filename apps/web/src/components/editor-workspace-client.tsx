"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { mockEditorSession } from "../lib/mock-data";
import {
  buildRecommendationCopy,
  deriveChartData,
  getBindingsForChartType,
  getFieldLabel,
  getFieldRoleDescription,
  getRecommendedBindings,
  type EditorChartType,
  type EditorSortMode,
  type FieldMappingBindings
} from "../lib/field-mapping";
import {
  Button,
  Card,
  EditorShell,
  Input,
  MetricStrip,
  RightInspectorShell,
  StatusBadge,
  TopBar
} from "@mac/ui";

type ThemeKey = "classic" | "moss" | "charcoal";
type LegendPosition = "top" | "right" | "bottom";
type DensityMode = "compact" | "balanced" | "comfortable";
type AspectRatio = "16:10" | "4:3" | "1:1";

interface EditorDraftState {
  chartType: EditorChartType;
  text: {
    title: string;
    subtitle: string;
    caption: string;
  };
  bindings: FieldMappingBindings;
  data: {
    sortMode: EditorSortMode;
    topN: number;
  };
  style: {
    theme: ThemeKey;
  };
  legend: {
    show: boolean;
    position: LegendPosition;
  };
  labels: {
    showValues: boolean;
  };
  layout: {
    aspectRatio: AspectRatio;
    density: DensityMode;
  };
}

const datasetPreview = mockEditorSession.dataset;

const chartCatalog: Array<{
  value: EditorChartType;
  label: string;
  description: string;
  badge: string;
}> = [
  {
    value: "line",
    label: "선 차트",
    description: "흐름과 변화를 보여줄 때 자연스럽습니다.",
    badge: "추천"
  },
  {
    value: "bar",
    label: "막대 차트",
    description: "항목별 크기를 비교할 때 읽기 쉽습니다.",
    badge: "비교형"
  },
  {
    value: "donut",
    label: "도넛 차트",
    description: "구성 비중을 간결하게 설명할 때 적합합니다.",
    badge: "비중형"
  },
  {
    value: "racing-bar",
    label: "막대 경주",
    description: "값이 큰 순서와 순위 변화를 빠르게 보여줍니다.",
    badge: "확장"
  }
];

const themeMap: Record<
  ThemeKey,
  {
    label: string;
    description: string;
    colors: string[];
  }
> = {
  classic: {
    label: "기본 테마",
    description: "차분하고 균형 잡힌 기본값입니다.",
    colors: ["#845C46", "#A87050", "#C18E68", "#6E8B7A", "#496277", "#D1B49A"]
  },
  moss: {
    label: "모스 테마",
    description: "자연스럽고 안정적인 대비를 만듭니다.",
    colors: ["#5E756A", "#7C9487", "#A0B0A6", "#C7C2B4", "#B08868", "#D0B299"]
  },
  charcoal: {
    label: "차콜 테마",
    description: "또렷하고 명료한 발표용 대비를 만듭니다.",
    colors: ["#30343B", "#55606E", "#8A7564", "#B89E8A", "#C8C2BB", "#6F7D88"]
  }
};

const initialDraft: EditorDraftState = {
  chartType: "line",
  text: {
    title: "월별 가입자 증가 흐름",
    subtitle: "업로드한 열 구조를 바탕으로 추천된 필드 조합이 연결된 상태입니다",
    caption: "데이터 탭에서 어떤 열을 가로축, 값, 범례로 쓸지 고르면 중앙 결과와 추천 문구가 바로 바뀝니다."
  },
  bindings: datasetPreview ? getRecommendedBindings(datasetPreview, "line") : { xFieldKey: null, valueFieldKey: null, seriesFieldKey: null, labelFieldKey: null },
  data: {
    sortMode: "original",
    topN: 4
  },
  style: {
    theme: "classic"
  },
  legend: {
    show: true,
    position: "right"
  },
  labels: {
    showValues: true
  },
  layout: {
    aspectRatio: "16:10",
    density: "balanced"
  }
};

function cloneDraft(draft: EditorDraftState) {
  return JSON.parse(JSON.stringify(draft)) as EditorDraftState;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function getDensityClasses(density: DensityMode) {
  if (density === "compact") {
    return { shell: "p-4", canvas: "p-4", gap: "gap-3" };
  }

  if (density === "comfortable") {
    return { shell: "p-8", canvas: "p-6", gap: "gap-5" };
  }

  return { shell: "p-6", canvas: "p-5", gap: "gap-4" };
}

function getAspectRatioValue(aspectRatio: AspectRatio) {
  if (aspectRatio === "4:3") {
    return "4 / 3";
  }

  if (aspectRatio === "1:1") {
    return "1 / 1";
  }

  return "16 / 10";
}

function getChartToneText(chartType: EditorChartType) {
  if (chartType === "line") {
    return "추세형";
  }

  if (chartType === "bar") {
    return "비교형";
  }

  if (chartType === "donut") {
    return "비중형";
  }

  return "순위형";
}

function getBindingUiCopy(chartType: EditorChartType) {
  if (chartType === "line") {
    return {
      x: {
        label: "가로축에 보여줄 기준",
        hint: "시간 흐름이나 순서를 보여줄 열을 고릅니다."
      },
      value: {
        label: "선 높이로 보여줄 값",
        hint: "숫자 열만 선택할 수 있습니다."
      },
      series: {
        label: "색으로 나눌 기준",
        hint: "선택하면 여러 선으로 나누어 비교합니다.",
        optional: true
      }
    };
  }

  if (chartType === "bar") {
    return {
      x: {
        label: "막대를 나눌 기준",
        hint: "항목이나 범주를 보여줄 열을 고릅니다."
      },
      value: {
        label: "막대 높이로 보여줄 값",
        hint: "막대 길이나 높이를 결정하는 숫자 열입니다."
      },
      series: {
        label: "묶어서 비교할 기준",
        hint: "선택하면 같은 범주 안에서 여러 색 막대로 비교합니다.",
        optional: true
      }
    };
  }

  if (chartType === "donut") {
    return {
      x: {
        label: "조각을 나눌 기준",
        hint: "구성 비중을 나눌 항목을 고릅니다."
      },
      value: {
        label: "조각 크기를 결정할 값",
        hint: "숫자 열을 사용해 각 조각 크기를 계산합니다."
      },
      series: null
    };
  }

  return {
    x: {
      label: "순위를 매길 기준",
      hint: "항목 이름이나 범주 열을 고릅니다."
    },
    value: {
      label: "순위를 계산할 값",
      hint: "값이 큰 순서대로 막대를 정렬합니다."
    },
    series: null
  };
}

function FlowStep({
  index,
  title,
  description,
  active = false,
  complete = false
}: {
  index: number;
  title: string;
  description: string;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div className={active ? "rounded-lg border border-line-accent bg-surface-1 px-4 py-4" : "rounded-lg border border-line-subtle bg-surface-1 px-4 py-4"}>
      <div className="flex items-start gap-3">
        <span
          className={
            active
              ? "inline-flex size-8 items-center justify-center rounded-full border border-line-accent bg-surface-2 text-xs font-medium text-ink-1"
              : "inline-flex size-8 items-center justify-center rounded-full border border-line-subtle bg-surface-2 text-xs font-medium text-ink-3"
          }
        >
          {index}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-ink-1">{title}</p>
            {complete ? <StatusBadge label="완료" tone="saved" /> : active ? <StatusBadge label="진행 중" tone="live" /> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-ink-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

function InspectorSection({
  title,
  description,
  badge,
  children
}: {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <Card
      variant="subtle"
      padding="compact"
      title={title}
      description={description}
      headerActions={badge ? <StatusBadge label={badge} tone="neutral" /> : null}
    >
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

function SegmentedField<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
      <p className="text-sm font-medium text-ink-1">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={
              value === option.value
                ? "rounded-full border border-line-accent bg-surface-2 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-1"
                : "rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3 transition hover:border-line-strong hover:text-ink-1"
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-left transition hover:border-line-strong"
    >
      <div>
        <p className="text-sm font-medium text-ink-1">{label}</p>
        <p className="mt-1 text-sm leading-6 text-ink-2">{description}</p>
      </div>
      <span className={checked ? "relative inline-flex h-7 w-12 rounded-full bg-accent" : "relative inline-flex h-7 w-12 rounded-full bg-surface-3"}>
        <span
          className={
            checked
              ? "absolute right-1 top-1 inline-flex size-5 rounded-full bg-surface-1 shadow-soft"
              : "absolute left-1 top-1 inline-flex size-5 rounded-full bg-surface-1 shadow-soft"
          }
        />
      </span>
    </button>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink-1">{label}</p>
        <span className="rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-2">{value}개</span>
      </div>
      <input
        className="mt-4 h-2 w-full accent-[rgb(132,92,70)]"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-2 flex justify-between text-[11px] text-ink-3">
        <span>{min}개</span>
        <span>{max}개</span>
      </div>
    </div>
  );
}

function TextAreaField({
  label,
  value,
  hint,
  rows = 3,
  onChange
}: {
  label: string;
  value: string;
  hint?: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-2">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-sm border border-line-subtle bg-surface-1 px-4 py-3 text-sm leading-6 text-ink-1 outline-none transition placeholder:text-ink-3 focus:border-line-accent focus:ring-2 focus:ring-accent-soft/45"
      />
      {hint ? <span className="mt-2 block text-xs text-ink-3">{hint}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  hint,
  value,
  options,
  onChange,
  required = true
}: {
  label: string;
  hint: string;
  value: string | null;
  options: Array<{ value: string; label: string; description?: string }>;
  onChange: (value: string | null) => void;
  required?: boolean;
}) {
  return (
    <label className="block rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink-1">{label}</span>
        <span className="rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3">
          {required ? "필수" : "선택"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-2">{hint}</p>
      <select
        className="mt-3 h-11 w-full rounded-sm border border-line-subtle bg-surface-1 px-4 text-sm text-ink-1 outline-none transition focus:border-line-accent focus:ring-2 focus:ring-accent-soft/45"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || null)}
      >
        {!required ? <option value="">사용 안 함</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PreviewLegend({
  items,
  colors,
  position
}: {
  items: string[];
  colors: string[];
  position: LegendPosition;
}) {
  return (
    <div className={position === "right" ? "grid gap-2" : "flex flex-wrap gap-3"}>
      {items.map((item, index) => (
        <div
          key={`${item}-${position}`}
          className={
            position === "right"
              ? "flex items-center gap-2 rounded-md border border-line-subtle bg-surface-1 px-3 py-2"
              : "flex items-center gap-2 rounded-full border border-line-subtle bg-surface-1 px-3 py-2"
          }
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
          <span className="text-sm text-ink-1">{item}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({
  categories,
  series,
  colors,
  showValues
}: {
  categories: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  showValues: boolean;
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));

  return (
    <div className="h-full rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-4 pb-4 pt-6">
      <svg viewBox="0 0 620 280" className="h-full min-h-[260px] w-full">
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="24"
            x2="590"
            y1={52 + line * 55}
            y2={52 + line * 55}
            stroke="rgba(183,173,161,0.25)"
            strokeDasharray="4 6"
          />
        ))}
        {series.map((currentSeries, seriesIndex) => {
          const points = currentSeries.values.map((value, index) => {
            const x = (index / Math.max(categories.length - 1, 1)) * 540 + 34;
            const y = 232 - (value / maxValue) * 172;
            return { x, y, value };
          });

          return (
            <g key={currentSeries.label}>
              <path
                d={`M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`}
                fill="none"
                stroke={colors[seriesIndex % colors.length]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((point, pointIndex) => (
                <g key={`${currentSeries.label}-${pointIndex}`}>
                  <circle cx={point.x} cy={point.y} r="5" fill={colors[seriesIndex % colors.length]} />
                  {showValues && (series.length === 1 || pointIndex === points.length - 1) ? (
                    <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="11" fill="#4C4D53">
                      {formatNumber(point.value)}
                    </text>
                  ) : null}
                </g>
              ))}
            </g>
          );
        })}
        {categories.map((label, index) => {
          const x = (index / Math.max(categories.length - 1, 1)) * 540 + 34;
          return (
            <text key={label} x={x} y="264" textAnchor="middle" fontSize="12" fill="#7A7B82">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function BarChart({
  categories,
  series,
  colors,
  showValues
}: {
  categories: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  showValues: boolean;
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));

  return (
    <div className="grid h-full min-h-[260px] grid-cols-[repeat(auto-fit,minmax(0,1fr))] items-end gap-4 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-5 pb-5 pt-10">
      {categories.map((category, categoryIndex) => (
        <div key={category} className="flex h-full flex-col justify-end">
          <div className="flex h-full items-end justify-center gap-2">
            {series.map((currentSeries, seriesIndex) => (
              <div key={`${category}-${currentSeries.label}`} className="flex h-full w-full max-w-[46px] flex-col justify-end">
                {showValues ? <p className="mb-2 text-center text-[11px] text-ink-2">{formatNumber(currentSeries.values[categoryIndex] ?? 0)}</p> : null}
                <div
                  className="rounded-t-md"
                  style={{
                    height: `${Math.max(18, ((currentSeries.values[categoryIndex] ?? 0) / maxValue) * 220)}px`,
                    backgroundColor: colors[seriesIndex % colors.length]
                  }}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-ink-2">{category}</p>
        </div>
      ))}
    </div>
  );
}

function DonutChart({
  items,
  colors,
  showValues
}: {
  items: Array<{ label: string; value: number }>;
  colors: string[];
  showValues: boolean;
}) {
  const total = Math.max(1, items.reduce((sum, item) => sum + item.value, 0));
  let current = 0;
  const segments = items.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const start = current;
    current += percentage;
    return `${colors[index % colors.length]} ${start}% ${current}%`;
  });

  return (
    <div className="grid h-full min-h-[260px] gap-6 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
      <div className="flex justify-center">
        <div className="relative size-52 rounded-full" style={{ background: `conic-gradient(${segments.join(", ")})` }}>
          <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-surface-1">
            <span className="text-[11px] uppercase tracking-[0.14em] text-ink-3">총합</span>
            <span className="mt-2 text-xl font-semibold text-ink-1">{formatNumber(total)}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm font-medium text-ink-1">{item.label}</span>
              </div>
              <span className="text-sm text-ink-2">{Math.round((item.value / total) * 100)}%</span>
            </div>
            {showValues ? <p className="mt-2 text-sm text-ink-2">{formatNumber(item.value)}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function RacingBarChart({
  items,
  colors,
  showValues
}: {
  items: Array<{ label: string; value: number }>;
  colors: string[];
  showValues: boolean;
}) {
  const maxValue = Math.max(1, ...items.map((item) => item.value));

  return (
    <div className="grid h-full min-h-[260px] gap-4 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-5 py-5">
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-7 items-center justify-center rounded-full border border-line-subtle bg-surface-1 text-xs font-medium text-ink-2">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-ink-1">{item.label}</span>
            </div>
            {showValues ? <span className="text-sm text-ink-2">{formatNumber(item.value)}</span> : null}
          </div>
          <div className="h-11 rounded-md bg-surface-2 p-1">
            <div
              className="flex h-full items-center rounded-sm px-4 text-xs font-medium text-ink-inverse"
              style={{
                width: `${Math.max(18, (item.value / maxValue) * 100)}%`,
                backgroundColor: colors[index % colors.length]
              }}
            >
              순위 변화
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewChart({
  chartType,
  categories,
  series,
  items,
  colors,
  showValues
}: {
  chartType: EditorChartType;
  categories: string[];
  series: Array<{ label: string; values: number[] }>;
  items: Array<{ label: string; value: number }>;
  colors: string[];
  showValues: boolean;
}) {
  if (chartType === "line") {
    return <LineChart categories={categories} series={series} colors={colors} showValues={showValues} />;
  }

  if (chartType === "bar") {
    return <BarChart categories={categories} series={series} colors={colors} showValues={showValues} />;
  }

  if (chartType === "donut") {
    return <DonutChart items={items} colors={colors} showValues={showValues} />;
  }

  return <RacingBarChart items={items} colors={colors} showValues={showValues} />;
}

export function EditorWorkspaceClient({ projectId }: { projectId: string }) {
  const [draft, setDraft] = useState<EditorDraftState>(initialDraft);
  const [savedSnapshot, setSavedSnapshot] = useState<EditorDraftState>(initialDraft);
  const [savedLabel, setSavedLabel] = useState("09:15 기준 로컬 저장됨");

  if (!datasetPreview) {
    return null;
  }

  const preview = datasetPreview;

  const hasUnsavedChanges = JSON.stringify(draft) !== JSON.stringify(savedSnapshot);
  const chartDefinition = chartCatalog.find((item) => item.value === draft.chartType) ?? chartCatalog[0];
  const theme = themeMap[draft.style.theme];
  const density = getDensityClasses(draft.layout.density);
  const aspectRatio = getAspectRatioValue(draft.layout.aspectRatio);
  const bindingUiCopy = getBindingUiCopy(draft.chartType);
  const derivedData = deriveChartData(preview, draft.chartType, draft.bindings, {
    sortMode: draft.data.sortMode,
    topN: draft.data.topN
  });
  const recommendationCopy = buildRecommendationCopy(preview, draft.chartType, draft.bindings);
  const legendItems =
    draft.chartType === "donut" || draft.chartType === "racing-bar"
      ? derivedData.items.map((item) => item.label)
      : derivedData.series.map((item) => item.label);

  const categoryFieldOptions = preview.columns
    .filter((column) => column.type !== "number" && column.key !== draft.bindings.seriesFieldKey)
    .map((column) => ({
      value: column.key,
      label: column.name,
      description: getFieldRoleDescription(column)
    }));

  const numericFieldOptions = preview.columns
    .filter((column) => column.type === "number")
    .map((column) => ({
      value: column.key,
      label: column.name,
      description: getFieldRoleDescription(column)
    }));

  const seriesFieldOptions = preview.columns
    .filter((column) => column.type !== "number" && column.key !== draft.bindings.xFieldKey)
    .map((column) => ({
      value: column.key,
      label: column.name,
      description: getFieldRoleDescription(column)
    }));

  const labelFieldOptions = preview.columns.map((column) => ({
    value: column.key,
    label: column.name,
    description: getFieldRoleDescription(column)
  }));

  function updateDraft(updater: (current: EditorDraftState) => EditorDraftState) {
    setDraft((current) => updater(current));
  }

  function handleChartChange(chartType: EditorChartType) {
    updateDraft((current) => ({
      ...current,
      chartType,
      bindings: getBindingsForChartType(preview, chartType, current.bindings),
      legend: {
        ...current.legend,
        show: true
      }
    }));
  }

  function handleBindingChange(field: keyof FieldMappingBindings, value: string | null) {
    updateDraft((current) => {
      const nextBindings: FieldMappingBindings = {
        ...current.bindings,
        [field]: value
      };

      if (field === "xFieldKey" && nextBindings.seriesFieldKey === value) {
        nextBindings.seriesFieldKey = null;
      }

      if (field === "seriesFieldKey" && nextBindings.seriesFieldKey === nextBindings.xFieldKey) {
        nextBindings.seriesFieldKey = null;
      }

      if (field === "xFieldKey" && !nextBindings.labelFieldKey) {
        nextBindings.labelFieldKey = value;
      }

      return {
        ...current,
        bindings: nextBindings
      };
    });
  }

  function handleSave() {
    setSavedSnapshot(cloneDraft(draft));
    setSavedLabel(
      `${new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit"
      })} 기준 로컬 저장됨`
    );
  }

  function handleReset() {
    setDraft(cloneDraft(savedSnapshot));
  }

  return (
    <EditorShell
      topBar={
        <TopBar
          title={mockEditorSession.project.name}
          subtitle={`${projectId} · 업로드에서 감지한 열 구조를 그대로 이어 받아, 어떤 데이터를 어떤 기준으로 보여줄지 직접 고르는 편집 흐름입니다.`}
          actions={
            <>
              <StatusBadge label="비공개 프로젝트" tone="private" />
              <StatusBadge label={hasUnsavedChanges ? "저장 전 변경 있음" : "로컬 저장됨"} tone={hasUnsavedChanges ? "draft" : "saved"} withDot />
              <Button variant="tertiary" onClick={handleReset} disabled={!hasUnsavedChanges}>
                저장 상태로 되돌리기
              </Button>
              <Button onClick={handleSave}>변경 내용 저장</Button>
            </>
          }
        />
      }
      rail={
        <>
          <Card variant="subtle" title="편집 흐름" description="업로드에서 넘어온 데이터 구조와 에디터 작업이 한 흐름으로 이어집니다.">
            <div className="space-y-3">
              <FlowStep index={1} title="차트 선택" description="데이터에 맞는 차트 유형을 고르고 바꿔봅니다." complete />
              <FlowStep index={2} title="데이터 연결" description="어떤 열을 기준, 값, 범례로 쓸지 정합니다." active />
              <FlowStep index={3} title="스타일 조정" description="텍스트, 범례, 라벨, 밀도, 비율을 다듬습니다." />
              <FlowStep index={4} title="결과 확인" description="보고서와 발표에 바로 쓸 수 있는 품질인지 점검합니다." />
            </div>
          </Card>

          <Card variant="subtle" title="업로드에서 받은 데이터" description="업로드 단계에서 감지한 열 구조와 역할 후보를 그대로 보여줍니다.">
            <div className="space-y-3">
              {preview.columns.map((column) => (
                <div key={column.key} className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-1">{column.name}</p>
                    <span className="rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3">{column.type}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldRoleDescription(column)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="default" title="차트 유형" description="선택한 차트에 따라 필요한 필드 구성이 달라집니다.">
            <div className="space-y-2">
              {chartCatalog.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChartChange(option.value)}
                  className={
                    option.value === draft.chartType
                      ? "w-full rounded-md border border-line-accent bg-surface-2 px-3 py-3 text-left"
                      : "w-full rounded-md border border-line-subtle bg-surface-1 px-3 py-3 text-left transition hover:border-line-strong"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-ink-1">{option.label}</div>
                    <span
                      className={
                        option.value === draft.chartType
                          ? "rounded-full border border-line-accent bg-surface-1 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink-1"
                          : "rounded-full border border-line-subtle px-3 py-1 text-[11px] tracking-[0.12em] text-ink-3"
                      }
                    >
                      {option.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-ink-3">{option.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </>
      }
      canvas={
        <Card variant="canvas" title="결과 미리보기" description="필드 선택과 옵션 변경이 중앙 결과와 추천 문구에 즉시 반영됩니다.">
          <div className={`rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.92),rgba(239,233,225,0.76))] ${density.shell}`}>
            <div className={`flex flex-wrap items-start justify-between ${density.gap}`}>
              <div>
                <p className="text-caption uppercase tracking-[0.18em] text-ink-3">추천된 구성</p>
                <h3 className="mt-2 text-title-2 font-semibold text-ink-1">{draft.text.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-2">{recommendationCopy}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={chartDefinition.label} tone="live" />
                <StatusBadge label={getChartToneText(draft.chartType)} tone="neutral" />
              </div>
            </div>

            <div className={`mt-6 rounded-xl border border-line-strong bg-surface-1 shadow-soft ${density.canvas}`}>
              <div className={`flex flex-wrap items-start justify-between ${density.gap}`}>
                <div>
                  <p className="text-caption uppercase tracking-[0.16em] text-ink-3">시각화 제목</p>
                  <h4 className="mt-2 text-xl font-semibold text-ink-1">{draft.text.title}</h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">{draft.text.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={theme.label} tone="neutral" />
                  <StatusBadge label={draft.labels.showValues ? "값 라벨 표시" : "값 라벨 숨김"} tone={draft.labels.showValues ? "live" : "neutral"} />
                  <StatusBadge label={draft.legend.show ? `범례 ${draft.legend.position}` : "범례 숨김"} tone="neutral" />
                  <StatusBadge label={`라벨 ${getFieldLabel(preview, draft.bindings.labelFieldKey)}`} tone="neutral" />
                </div>
              </div>

              {draft.legend.show && draft.legend.position === "top" ? (
                <div className="mt-5">
                  <PreviewLegend items={legendItems} colors={theme.colors} position={draft.legend.position} />
                </div>
              ) : null}

              <div
                className={
                  draft.legend.show && draft.legend.position === "right"
                    ? "mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_220px]"
                    : "mt-6"
                }
              >
                <div className="min-w-0" style={{ aspectRatio }}>
                  <PreviewChart
                    chartType={draft.chartType}
                    categories={derivedData.categories}
                    series={derivedData.series}
                    items={derivedData.items}
                    colors={theme.colors}
                    showValues={draft.labels.showValues}
                  />
                </div>

                {draft.legend.show && draft.legend.position === "right" ? (
                  <PreviewLegend items={legendItems} colors={theme.colors} position={draft.legend.position} />
                ) : null}
              </div>

              {draft.legend.show && draft.legend.position === "bottom" ? (
                <div className="mt-5">
                  <PreviewLegend items={legendItems} colors={theme.colors} position={draft.legend.position} />
                </div>
              ) : null}

              <div className="mt-5 rounded-lg border border-line-subtle bg-surface-2 px-4 py-4">
                <p className="text-sm leading-6 text-ink-2">{draft.text.caption}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">데이터 연결</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">
                    {`${getFieldLabel(preview, draft.bindings.xFieldKey)} -> ${getFieldLabel(preview, draft.bindings.valueFieldKey)}`}
                  </p>
                  <p className="mt-1 text-xs text-ink-3">
                    범례 {getFieldLabel(preview, draft.bindings.seriesFieldKey)} · 라벨 {getFieldLabel(preview, draft.bindings.labelFieldKey)}
                  </p>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">추천 문구 기준</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{recommendationCopy}</p>
                </div>
                <div className="rounded-md border border-line-subtle bg-surface-1 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">레이아웃</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">
                    {draft.layout.aspectRatio} · {draft.layout.density === "compact" ? "촘촘하게" : draft.layout.density === "comfortable" ? "넉넉하게" : "기본"}
                  </p>
                </div>
              </div>
            </div>

            <MetricStrip
              className="mt-5"
              items={[
                { label: "보이는 항목", value: `${draft.chartType === "line" ? derivedData.categories.length : derivedData.items.length || derivedData.categories.length}개`, hint: "선택한 필드와 정렬 기준 반영" },
                { label: "합계", value: formatNumber(derivedData.totalValue), hint: "현재 보이는 결과 기준" },
                { label: "저장 상태", value: hasUnsavedChanges ? "저장 전 변경 있음" : savedLabel, hint: "local state만 반영" }
              ]}
            />
          </div>
        </Card>
      }
      inspector={
        <RightInspectorShell title="설정 패널" tabs={["데이터", "텍스트", "스타일", "범례", "레이아웃", "저장"]}>
          <InspectorSection title="데이터 탭" description="무슨 데이터를 어떤 기준으로 보여줄지 직접 고르는 핵심 단계입니다." badge={chartDefinition.label}>
            <SelectField
              label={bindingUiCopy.x.label}
              hint={bindingUiCopy.x.hint}
              value={draft.bindings.xFieldKey}
              options={categoryFieldOptions}
              onChange={(value) => handleBindingChange("xFieldKey", value)}
            />

            <SelectField
              label={bindingUiCopy.value.label}
              hint={bindingUiCopy.value.hint}
              value={draft.bindings.valueFieldKey}
              options={numericFieldOptions}
              onChange={(value) => handleBindingChange("valueFieldKey", value)}
            />

            {bindingUiCopy.series ? (
              <SelectField
                label={bindingUiCopy.series.label}
                hint={bindingUiCopy.series.hint}
                value={draft.bindings.seriesFieldKey}
                options={seriesFieldOptions}
                onChange={(value) => handleBindingChange("seriesFieldKey", value)}
                required={false}
              />
            ) : (
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                {draft.chartType === "donut"
                  ? "도넛 차트는 조각을 나눌 기준과 값을 중심으로 구성하는 것이 가장 읽기 쉽습니다."
                  : "막대 경주는 순위를 매길 기준과 값을 중심으로 보여주는 구성이 가장 자연스럽습니다."}
              </div>
            )}

            <SelectField
              label="라벨에 보여줄 이름"
              hint="값 라벨을 켰을 때 어떤 이름을 함께 읽을지 정합니다."
              value={draft.bindings.labelFieldKey}
              options={labelFieldOptions}
              onChange={(value) => handleBindingChange("labelFieldKey", value)}
              required={false}
            />

            <SegmentedField
              label="정렬 방식"
              value={draft.data.sortMode}
              options={[
                { value: "original", label: "원본 순서" },
                { value: "value-desc", label: "값 큰 순" },
                { value: "name", label: "이름 순" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  data: {
                    ...current.data,
                    sortMode: value
                  }
                }))
              }
            />

            {draft.chartType !== "line" ? (
              <RangeField
                label="Top N 범위"
                value={draft.data.topN}
                min={3}
                max={6}
                onChange={(value) =>
                  updateDraft((current) => ({
                    ...current,
                    data: {
                      ...current.data,
                      topN: value
                    }
                  }))
                }
              />
            ) : (
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                선 차트는 보통 흐름 전체를 보는 것이 자연스러워 Top N 대신 가로축과 구분 기준 조합이 더 중요합니다.
              </div>
            )}
          </InspectorSection>

          <InspectorSection title="텍스트" description="제목과 설명도 결과물의 일부로 함께 다듬습니다.">
            <Input
              label="제목"
              value={draft.text.title}
              onChange={(event) =>
                updateDraft((current) => ({
                  ...current,
                  text: {
                    ...current.text,
                    title: event.target.value
                  }
                }))
              }
            />
            <Input
              label="부제목"
              value={draft.text.subtitle}
              onChange={(event) =>
                updateDraft((current) => ({
                  ...current,
                  text: {
                    ...current.text,
                    subtitle: event.target.value
                  }
                }))
              }
            />
            <TextAreaField
              label="설명 / 캡션"
              value={draft.text.caption}
              hint="결과물 하단 설명 영역에 바로 반영됩니다."
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  text: {
                    ...current.text,
                    caption: value
                  }
                }))
              }
            />
          </InspectorSection>

          <InspectorSection title="스타일" description="눈에 보이는 차이를 빠르게 조정하는 설정입니다.">
            <SegmentedField
              label="색상 테마"
              value={draft.style.theme}
              options={[
                { value: "classic", label: "기본" },
                { value: "moss", label: "모스" },
                { value: "charcoal", label: "차콜" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  style: {
                    ...current.style,
                    theme: value
                  }
                }))
              }
            />
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">현재 테마 설명</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{theme.description}</p>
              <div className="mt-3 flex gap-2">
                {theme.colors.slice(0, 5).map((color) => (
                  <span key={color} className="h-7 flex-1 rounded-sm border border-white/60" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
            <ToggleField
              label="값 라벨 표시"
              description="차트 위나 옆에 숫자를 직접 보여줍니다."
              checked={draft.labels.showValues}
              onChange={(checked) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    showValues: checked
                  }
                }))
              }
            />
          </InspectorSection>

          <InspectorSection title="범례" description="차트가 복잡해 보이지 않도록 범례 표시와 위치를 조정합니다.">
            <ToggleField
              label="범례 표시"
              description="색과 항목의 대응 관계를 함께 보여줍니다."
              checked={draft.legend.show}
              onChange={(checked) =>
                updateDraft((current) => ({
                  ...current,
                  legend: {
                    ...current.legend,
                    show: checked
                  }
                }))
              }
            />
            <SegmentedField
              label="범례 위치"
              value={draft.legend.position}
              options={[
                { value: "top", label: "상단" },
                { value: "right", label: "오른쪽" },
                { value: "bottom", label: "하단" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  legend: {
                    ...current.legend,
                    position: value
                  }
                }))
              }
            />
          </InspectorSection>

          <InspectorSection title="레이아웃" description="결과물의 비율과 밀도를 바꾸면 같은 데이터도 다른 인상을 줍니다.">
            <SegmentedField
              label="캔버스 비율"
              value={draft.layout.aspectRatio}
              options={[
                { value: "16:10", label: "16:10" },
                { value: "4:3", label: "4:3" },
                { value: "1:1", label: "1:1" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  layout: {
                    ...current.layout,
                    aspectRatio: value
                  }
                }))
              }
            />
            <SegmentedField
              label="캔버스 밀도"
              value={draft.layout.density}
              options={[
                { value: "compact", label: "촘촘하게" },
                { value: "balanced", label: "기본" },
                { value: "comfortable", label: "넉넉하게" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  layout: {
                    ...current.layout,
                    density: value
                  }
                }))
              }
            />
          </InspectorSection>

          <Card variant="subtle" padding="compact" title="로컬 저장 상태">
            <p className="text-sm leading-6 text-ink-2">
              지금 바뀌는 필드 매핑과 추천 문구, 차트 결과는 모두 local state로 연결되어 있습니다. 이후 실제 persistence가 붙으면 이 상태 구조를 그대로 저장 스냅샷으로 넘기기 쉽게 구성했습니다.
            </p>
            <div className="mt-4 rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm text-ink-2">{savedLabel}</div>
          </Card>
        </RightInspectorShell>
      }
    />
  );
}
