"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
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
type LabelMode = "value" | "name" | "both" | "hidden";
type LabelDensity = "minimal" | "balanced" | "detailed";
type LabelNumberFormat = "number" | "compact" | "percent";
type InspectorTab = "data" | "style" | "axes" | "legend" | "labels" | "layout";
type TooltipAlign = "left" | "center" | "right";
type TooltipPlacement = "top" | "bottom";

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
    mode: LabelMode;
    density: LabelDensity;
    numberFormat: LabelNumberFormat;
    prefix: string;
    suffix: string;
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

const inspectorTabs: Array<{ value: InspectorTab; label: string; description: string }> = [
  { value: "data", label: "Data", description: "필드 연결" },
  { value: "style", label: "Style", description: "톤과 색" },
  { value: "axes", label: "Axes", description: "축 읽기" },
  { value: "legend", label: "Legend", description: "범례" },
  { value: "labels", label: "Labels", description: "내부 텍스트" },
  { value: "layout", label: "Layout", description: "캔버스" }
];

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
    mode: "both",
    density: "balanced",
    numberFormat: "number",
    prefix: "",
    suffix: ""
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

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildTooltipSummary({
  eyebrow,
  label,
  value,
  detail
}: {
  eyebrow?: string;
  label: string;
  value?: string;
  detail?: string;
}) {
  return [eyebrow, label, value, detail].filter(Boolean).join(" · ");
}

function getVisibleTickIndexes(
  totalCount: number,
  density: LabelDensity,
  chartType: "line" | "bar"
) {
  if (totalCount <= 0) {
    return new Set<number>();
  }

  const targetCount =
    density === "detailed" ? totalCount : density === "minimal" ? (chartType === "line" ? 3 : 4) : chartType === "line" ? 4 : 5;
  const step = Math.max(1, Math.ceil(totalCount / Math.max(targetCount, 1)));
  const indexes = new Set<number>();

  for (let index = 0; index < totalCount; index += step) {
    indexes.add(index);
  }

  indexes.add(totalCount - 1);
  indexes.add(0);
  return indexes;
}

function getTopValueIndexes(values: number[], limit: number) {
  return new Set(
    values
      .map((value, index) => ({ index, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, Math.max(1, limit))
      .map((item) => item.index)
  );
}

function getLineLabelIndexes(values: number[], density: LabelDensity) {
  if (values.length === 0) {
    return new Set<number>();
  }

  const limit = getChartLabelLimit(density, values.length, "line");
  const lastIndex = values.length - 1;
  const maxValue = Math.max(...values, 1);
  const minGap = density === "minimal" ? 2 : 1;
  const candidates = values
    .map((value, index) => {
      const previous = values[index - 1] ?? value;
      const next = values[index + 1] ?? value;
      const volatility = Math.abs(value - previous) + Math.abs(next - value);
      const edgeBoost = index === 0 || index === lastIndex ? maxValue * 0.45 : 0;
      const turningPointBoost =
        index > 0 && index < lastIndex && ((value >= previous && value >= next) || (value <= previous && value <= next))
          ? maxValue * 0.35
          : 0;

      return {
        index,
        score: value + volatility * 0.8 + edgeBoost + turningPointBoost
      };
    })
    .sort((a, b) => b.score - a.score);

  const selected = new Set<number>([lastIndex]);

  for (const candidate of candidates) {
    if (selected.size >= limit) {
      break;
    }

    const farEnough = Array.from(selected).every((index) => Math.abs(index - candidate.index) >= minGap);
    if (farEnough || candidate.index === lastIndex) {
      selected.add(candidate.index);
    }
  }

  if (selected.size < limit) {
    candidates.slice(0, limit).forEach((candidate) => selected.add(candidate.index));
  }

  return selected;
}

function splitTooltipLine(value: string, maxChars: number) {
  const normalized = value.trim();

  if (normalized.length <= maxChars) {
    return [normalized];
  }

  const segments: string[] = [];
  let current = "";

  normalized.split(/\s+/).forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxChars) {
      current = candidate;
      return;
    }

    if (current) {
      segments.push(current);
      current = "";
    }

    if (word.length <= maxChars) {
      current = word;
      return;
    }

    let remainder = word;
    while (remainder.length > maxChars) {
      segments.push(`${remainder.slice(0, maxChars - 1)}…`);
      remainder = remainder.slice(maxChars - 1);
    }
    current = remainder;
  });

  if (current) {
    segments.push(current);
  }

  return segments;
}

function truncateLabel(value: string, maxLength = 12) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(1, maxLength - 1))}…`;
}

function getChartLabelLimit(density: LabelDensity, totalCount: number, chartType: EditorChartType) {
  if (density === "detailed") {
    return totalCount;
  }

  if (density === "minimal") {
    return chartType === "line" ? Math.min(2, totalCount) : Math.min(3, totalCount);
  }

  return chartType === "line" ? Math.min(4, totalCount) : Math.min(5, totalCount);
}

function getLabelText(
  name: string,
  value: number,
  labels: EditorDraftState["labels"],
  totalValue?: number
) {
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const formattedValue = formatLabelValue(value, labels, totalValue);

  if (showName && showValue) {
    return `${name} · ${formattedValue}`;
  }

  if (showName) {
    return name;
  }

  return formattedValue;
}

function formatLabelValue(value: number, labels: EditorDraftState["labels"], totalValue?: number) {
  const raw =
    labels.numberFormat === "percent" && totalValue
      ? `${Math.round((value / Math.max(totalValue, 1)) * 100)}%`
      : labels.numberFormat === "compact"
        ? new Intl.NumberFormat("ko-KR", { notation: "compact", maximumFractionDigits: 1 }).format(value)
        : formatNumber(value);

  return `${labels.prefix}${raw}${labels.suffix}`;
}

function shouldShowLabelName(mode: LabelMode) {
  return mode === "name" || mode === "both";
}

function shouldShowLabelValue(mode: LabelMode) {
  return mode === "value" || mode === "both";
}

function getLabelModeBadge(mode: LabelMode) {
  if (mode === "value") {
    return "값 라벨";
  }

  if (mode === "name") {
    return "이름 라벨";
  }

  if (mode === "both") {
    return "값 + 이름";
  }

  return "라벨 숨김";
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

function ControlGroup({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4">
      <p className="text-sm font-medium text-ink-1">{title}</p>
      <p className="mt-1 text-sm leading-6 text-ink-2">{description}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
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

function PreviewTooltip({
  eyebrow,
  label,
  value,
  detail,
  align = "center",
  children,
  wrapperClassName,
  triggerClassName
}: {
  eyebrow?: string;
  label: string;
  value?: string;
  detail?: string;
  align?: TooltipAlign;
  children: ReactNode;
  wrapperClassName?: string;
  triggerClassName?: string;
}) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [position, setPosition] = useState<{
    placement: TooltipPlacement;
    style: CSSProperties;
  }>({
    placement: "top",
    style: { transform: "translate(0px, -9999px)" }
  });
  const isOpen = hovered || focused;
  const summary = buildTooltipSummary({ eyebrow, label, value, detail });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) {
      return;
    }

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) {
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const boundary =
        (triggerRef.current.closest("[data-preview-tooltip-boundary]") as HTMLElement | null)?.getBoundingClientRect() ?? document.body.getBoundingClientRect();
      const preferredX =
        align === "left"
          ? 0
          : align === "right"
            ? triggerRect.width - tooltipRect.width
            : (triggerRect.width - tooltipRect.width) / 2;
      const minX = boundary.left - triggerRect.left + 8;
      const maxX = boundary.right - triggerRect.left - tooltipRect.width - 8;
      const x = maxX >= minX ? clamp(preferredX, minX, maxX) : preferredX;
      const preferBottom = triggerRect.top - boundary.top < tooltipRect.height + 20 && boundary.bottom - triggerRect.bottom > tooltipRect.height + 12;
      const preferredY = preferBottom ? triggerRect.height + 10 : -tooltipRect.height - 10;
      const minY = boundary.top - triggerRect.top + 8;
      const maxY = boundary.bottom - triggerRect.top - tooltipRect.height - 8;
      const y = maxY >= minY ? clamp(preferredY, minY, maxY) : preferredY;

      setPosition({
        placement: preferBottom ? "bottom" : "top",
        style: {
          transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`
        }
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, detail, isOpen, label, value]);

  return (
    <span className={cx("relative inline-flex min-w-0 max-w-full align-middle", wrapperClassName)}>
      <span
        ref={triggerRef}
        tabIndex={0}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-label={summary}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
          if (event.key === "Escape") {
            setHovered(false);
            setFocused(false);
            event.currentTarget.blur();
          }
        }}
        className={cx(
          "inline-flex min-w-0 max-w-full cursor-help rounded-sm outline-none transition focus-visible:ring-2 focus-visible:ring-accent-soft/60 focus-visible:ring-offset-2",
          triggerClassName
        )}
      >
        {children}
      </span>
      <span
        id={tooltipId}
        ref={tooltipRef}
        role="tooltip"
        aria-hidden={!isOpen}
        className={cx(
          "pointer-events-none absolute left-0 top-0 z-30 w-max min-w-[170px] max-w-[260px] rounded-lg border border-line-subtle bg-surface-1/95 px-3 py-2 text-left shadow-soft backdrop-blur transition duration-100 ease-refined",
          position.placement === "bottom" ? "origin-top" : "origin-bottom",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        style={position.style}
      >
        {eyebrow ? <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-3">{eyebrow}</span> : null}
        <span className="mt-0.5 block whitespace-normal text-xs font-medium leading-5 text-ink-1">{label}</span>
        {value ? <span className="mt-1 block whitespace-normal text-xs leading-5 text-ink-2">{value}</span> : null}
        {detail ? <span className="mt-1 block whitespace-normal text-[11px] leading-4 text-ink-3">{detail}</span> : null}
      </span>
    </span>
  );
}

function SvgPointTooltip({
  tooltipId,
  x,
  y,
  rows
}: {
  tooltipId: string;
  x: number;
  y: number;
  rows: string[];
}) {
  const wrappedRows = rows.flatMap((row, rowIndex) =>
    splitTooltipLine(row, rowIndex === 0 ? 18 : 24).map((segment, segmentIndex) => ({
      key: `${rowIndex}-${segmentIndex}`,
      text: segment,
      rowIndex
    }))
  );
  const maxLength = Math.max(...wrappedRows.map((row) => row.text.length), 10);
  const width = clamp(maxLength * 6.3 + 28, 120, 236);
  const height = wrappedRows.length * 15 + 18;
  const tooltipX = clamp(x - width / 2, 12, 620 - width - 12);
  const preferBottom = y - height - 16 < 12 && 280 - y > height + 18;
  const tooltipY = clamp(preferBottom ? y + 18 : y - height - 16, 12, 280 - height - 12);

  return (
    <g
      id={tooltipId}
      role="tooltip"
      className="pointer-events-none opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100"
      transform={`translate(${tooltipX} ${tooltipY})`}
    >
      <rect width={width} height={height} rx="10" fill="rgba(255,252,248,0.98)" stroke="rgba(183,173,161,0.55)" />
      {wrappedRows.map((row, index) => (
        <text
          key={row.key}
          x="12"
          y={18 + index * 15}
          fontSize={row.rowIndex === 0 ? "11" : "10"}
          fontWeight={row.rowIndex === 0 ? "600" : "400"}
          fill={row.rowIndex === 0 ? "#3E3F44" : "#6F7077"}
        >
          {row.text}
        </text>
      ))}
    </g>
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
              ? "flex min-w-0 items-center gap-2 rounded-md border border-line-subtle bg-surface-1 px-3 py-2"
              : "flex min-w-0 items-center gap-2 rounded-full border border-line-subtle bg-surface-1 px-3 py-2"
          }
        >
          <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
          <PreviewTooltip eyebrow="범례" label={item} detail="색으로 구분되는 항목입니다." align={position === "right" ? "left" : "center"}>
            <span className="truncate text-sm text-ink-1">{truncateLabel(item, position === "right" ? 18 : 14)}</span>
          </PreviewTooltip>
        </div>
      ))}
    </div>
  );
}

function LineChart({
  categories,
  categoryLabels,
  series,
  colors,
  totalValue,
  labels
}: {
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const combinedValues = categories.map((_, index) => series.reduce((sum, currentSeries) => sum + (currentSeries.values[index] ?? 0), 0));
  const highlightedIndexes = getLineLabelIndexes(combinedValues, labels.density);
  const axisLabelIndexes = new Set([
    ...getVisibleTickIndexes(categories.length, labels.density, "line"),
    ...Array.from(highlightedIndexes)
  ]);
  const dominantSeriesByIndex = categories.map((_, categoryIndex) =>
    series.reduce(
      (bestIndex, currentSeries, seriesIndex) =>
        (currentSeries.values[categoryIndex] ?? 0) > (series[bestIndex]?.values[categoryIndex] ?? 0) ? seriesIndex : bestIndex,
      0
    )
  );

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
              {points.map((point, pointIndex) => {
                const pointName = categoryLabels[pointIndex] ?? categories[pointIndex];
                const pointValue = formatLabelValue(point.value, labels, totalValue);
                const labelText = getLabelText(pointName, point.value, labels, totalValue);
                const tooltipId = `line-point-tooltip-${seriesIndex}-${pointIndex}`;
                const isLastPoint = pointIndex === points.length - 1;
                const isDominantSeries = dominantSeriesByIndex[pointIndex] === seriesIndex;
                const showPointLabel =
                  labels.mode !== "hidden" &&
                  (isLastPoint || highlightedIndexes.has(pointIndex)) &&
                  (series.length === 1 || isLastPoint || isDominantSeries || labels.density === "detailed");
                const labelOffset =
                  point.y < 86 ? 18 : series.length > 1 && !isLastPoint ? (seriesIndex % 2 === 0 ? -14 : 18) : -14;

                return (
                  <g key={`${currentSeries.label}-${pointIndex}`} className="group">
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="12"
                      fill="transparent"
                      tabIndex={0}
                      aria-describedby={tooltipId}
                      aria-label={buildTooltipSummary({
                        eyebrow: pointName,
                        label: currentSeries.label !== pointName ? `구분 ${currentSeries.label}` : "핵심 포인트",
                        value: `값 ${pointValue}`,
                        detail: "포커스하면 전체 라벨과 값을 확인할 수 있습니다."
                      })}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="9"
                      fill="transparent"
                      stroke="rgba(132,92,70,0.28)"
                      strokeWidth="2"
                      className="opacity-0 transition-opacity duration-100 group-focus-within:opacity-100"
                    />
                    <circle cx={point.x} cy={point.y} r="5" fill={colors[seriesIndex % colors.length]} />
                    {showPointLabel ? (
                      <text x={point.x} y={clamp(point.y + labelOffset, 20, 248)} textAnchor="middle" fontSize="10.5" fill="#4C4D53">
                        {truncateLabel(labelText, showName && showValue ? 18 : 12)}
                      </text>
                    ) : null}
                    <SvgPointTooltip
                      tooltipId={tooltipId}
                      x={point.x}
                      y={point.y}
                      rows={[
                        pointName,
                        `값 ${pointValue}`,
                        currentSeries.label !== pointName ? `구분 ${currentSeries.label}` : "핵심 포인트"
                      ]}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
        {categories.map((label, index) => {
          const x = (index / Math.max(categories.length - 1, 1)) * 540 + 34;
          return (
            <g key={label}>
              <line x1={x} x2={x} y1="240" y2="246" stroke="rgba(183,173,161,0.35)" />
              {axisLabelIndexes.has(index) ? (
                <text x={x} y="264" textAnchor="middle" fontSize="12" fill="#7A7B82">
                  {truncateLabel(categoryLabels[index] ?? label, categories.length > 5 ? 8 : 10)}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BarChart({
  categories,
  categoryLabels,
  series,
  colors,
  totalValue,
  labels
}: {
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, categories.length, "bar");
  const categoryTotals = categories.map((_, categoryIndex) =>
    series.reduce((sum, currentSeries) => sum + (currentSeries.values[categoryIndex] ?? 0), 0)
  );
  const priorityCategoryIndexes = getTopValueIndexes(categoryTotals, labelLimit);
  const axisLabelIndexes = getVisibleTickIndexes(categories.length, labels.density, "bar");
  const dominantSeriesByCategory = categories.map((_, categoryIndex) =>
    series.reduce(
      (bestIndex, currentSeries, seriesIndex) =>
        (currentSeries.values[categoryIndex] ?? 0) > (series[bestIndex]?.values[categoryIndex] ?? 0) ? seriesIndex : bestIndex,
      0
    )
  );

  return (
    <div className="grid h-full min-h-[260px] grid-cols-[repeat(auto-fit,minmax(0,1fr))] items-end gap-4 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-5 pb-5 pt-10">
      {categories.map((category, categoryIndex) => {
        const axisLabel = categoryLabels[categoryIndex] ?? category;
        const showAxisLabel = axisLabelIndexes.has(categoryIndex);

        return (
        <div key={category} className="flex h-full flex-col justify-end">
          <div className="flex h-full items-end justify-center gap-2">
            {series.map((currentSeries, seriesIndex) => {
              const currentValue = currentSeries.values[categoryIndex] ?? 0;
              const barHeight = Math.max(18, (currentValue / maxValue) * 220);
              const isPriorityCategory = priorityCategoryIndexes.has(categoryIndex);
              const canHighlightBar =
                labels.density === "detailed" || series.length === 1 || dominantSeriesByCategory[categoryIndex] === seriesIndex;
              const shouldShowBarName = labels.mode !== "hidden" && showName && isPriorityCategory && canHighlightBar && (!showAxisLabel || series.length > 1);
              const shouldShowBarValue =
                labels.mode !== "hidden" &&
                showValue &&
                isPriorityCategory &&
                canHighlightBar &&
                (barHeight >= (shouldShowBarName ? 52 : 34) || labels.density === "detailed");

              return (
              <div key={`${category}-${currentSeries.label}`} className="flex h-full w-full max-w-[46px] flex-col justify-end">
                {shouldShowBarName || shouldShowBarValue ? (
                  <div className="mb-2 text-center text-[11px] leading-4 text-ink-2">
                    {shouldShowBarName ? (
                      <PreviewTooltip
                        eyebrow="막대 라벨"
                        label={axisLabel}
                        value={showValue ? formatLabelValue(currentValue, labels, totalValue) : undefined}
                        detail={series.length > 1 ? currentSeries.label : "막대 끝에 표시되는 항목입니다."}
                      >
                        <span className="block truncate font-medium text-ink-1">{truncateLabel(axisLabel, 10)}</span>
                      </PreviewTooltip>
                    ) : null}
                    {shouldShowBarValue ? (
                      <PreviewTooltip
                        eyebrow="값"
                        label={formatLabelValue(currentValue, labels, totalValue)}
                        detail={axisLabel}
                      >
                        <span className="block">{formatLabelValue(currentValue, labels, totalValue)}</span>
                      </PreviewTooltip>
                    ) : null}
                  </div>
                ) : null}
                <PreviewTooltip
                  eyebrow={series.length > 1 ? currentSeries.label : "막대"}
                  label={axisLabel}
                  value={formatLabelValue(currentValue, labels, totalValue)}
                  detail={series.length > 1 ? `${currentSeries.label} 기준 비교 막대` : "값 비교를 위한 막대입니다."}
                  wrapperClassName="flex h-full w-full"
                  triggerClassName="flex h-full w-full items-end rounded-t-md"
                >
                  <span
                    className="block w-full rounded-t-md"
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: colors[seriesIndex % colors.length]
                    }}
                  />
                </PreviewTooltip>
              </div>
            )})}
          </div>
          {showAxisLabel ? (
            <PreviewTooltip eyebrow="축 라벨" label={axisLabel} detail="가로축에서 항목을 구분합니다.">
              <span className="mt-3 block truncate text-center text-sm text-ink-2">
                {truncateLabel(axisLabel, categories.length > 5 ? 9 : 11)}
              </span>
            </PreviewTooltip>
          ) : (
            <span className="mt-3 block h-5" aria-hidden="true" />
          )}
        </div>
      )})}
    </div>
  );
}

function DonutChart({
  items,
  colors,
  labels
}: {
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  labels: EditorDraftState["labels"];
}) {
  const total = Math.max(1, items.reduce((sum, item) => sum + item.value, 0));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, items.length, "donut");
  const priorityIndexes = getTopValueIndexes(items.map((item) => item.value), labelLimit);
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
            {labels.mode !== "hidden" ? (
              <span className="mt-1 max-w-[120px] text-center text-[11px] leading-4 text-ink-3">
                {showName && showValue ? "이름과 비중 표시" : showName ? "조각 이름 표시" : "값 중심 표시"}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => {
          const share = Math.round((item.value / total) * 100);
          const isPriority = priorityIndexes.has(index) || share >= (labels.density === "minimal" ? 22 : 16);

          return (
          <div
            key={item.label}
            className={cx(
              "rounded-md border border-line-subtle bg-surface-1 px-4 py-3",
              isPriority ? "border-line-strong shadow-soft" : null
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <PreviewTooltip
                  eyebrow="도넛 조각"
                  label={showName ? item.displayLabel : item.label}
                  value={formatLabelValue(item.value, labels, total)}
                  detail={`${share}% 비중`}
                  align="left"
                >
                  <span className="max-w-[150px] truncate text-sm font-medium text-ink-1">
                    {truncateLabel(showName ? item.displayLabel : item.label, 18)}
                  </span>
                </PreviewTooltip>
              </div>
              {labels.mode !== "hidden" && showValue && (isPriority || labels.density === "detailed") ? (
                <span className={isPriority ? "text-sm font-medium text-ink-1" : "text-sm text-ink-2"}>
                  {formatLabelValue(item.value, labels, total)}
                </span>
              ) : null}
            </div>
            {labels.mode !== "hidden" && showName && showValue && isPriority ? (
              <p className="mt-2 text-sm text-ink-2">{share}% · {formatNumber(item.value)}</p>
            ) : labels.mode !== "hidden" && isPriority ? (
              <p className="mt-2 text-[11px] leading-5 text-ink-3">{share}% 비중</p>
            ) : null}
          </div>
        )})}
      </div>
    </div>
  );
}

function RacingBarChart({
  items,
  colors,
  totalValue,
  labels
}: {
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
}) {
  const maxValue = Math.max(1, ...items.map((item) => item.value));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, items.length, "racing-bar");
  const priorityIndexes = getTopValueIndexes(items.map((item) => item.value), labelLimit);

  return (
    <div className="grid h-full min-h-[260px] gap-4 rounded-lg border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(248,244,238,0.92))] px-5 py-5">
      {items.map((item, index) => {
        const widthPercentage = Math.max(18, (item.value / maxValue) * 100);
        const isPriority = priorityIndexes.has(index);
        const showHeaderValue =
          labels.mode !== "hidden" && showValue && (isPriority || widthPercentage < (showName && showValue ? 58 : 38));
        const canFitDenseText = widthPercentage >= (showName && showValue ? 58 : showName ? 40 : 26);
        const canFitCompactText = widthPercentage >= (showName && showValue ? 46 : showName ? 32 : 22);
        const showInlineLabel =
          labels.mode !== "hidden" &&
          isPriority &&
          (labels.density === "detailed" ? canFitCompactText : canFitDenseText);
        const inlineText =
          !showInlineLabel
            ? ""
            : showName && showValue
              ? `${index + 1}위 · ${truncateLabel(showName ? item.displayLabel : item.label, 14)} · ${formatLabelValue(item.value, labels, totalValue)}`
              : showName
                ? `${index + 1}위 · ${truncateLabel(showName ? item.displayLabel : item.label, 18)}`
                : `${index + 1}위 · ${formatLabelValue(item.value, labels, totalValue)}`;

        return (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-7 items-center justify-center rounded-full border border-line-subtle bg-surface-1 text-xs font-medium text-ink-2">
                {index + 1}
              </span>
              <PreviewTooltip
                eyebrow={`${index + 1}위`}
                label={showName ? item.displayLabel : item.label}
                value={formatLabelValue(item.value, labels, totalValue)}
                detail="순위 막대의 이름과 값입니다."
                align="left"
              >
                <span className="max-w-[180px] truncate text-sm font-medium text-ink-1">
                  {truncateLabel(showName ? item.displayLabel : item.label, 20)}
                </span>
              </PreviewTooltip>
            </div>
            {showHeaderValue ? (
              <span className="text-sm text-ink-2">{formatLabelValue(item.value, labels, totalValue)}</span>
            ) : null}
          </div>
          <div className="h-11 rounded-md bg-surface-2 p-1">
            <PreviewTooltip
              eyebrow={`${index + 1}위`}
              label={showName ? item.displayLabel : item.label}
              value={formatLabelValue(item.value, labels, totalValue)}
              detail={`${Math.round((item.value / Math.max(totalValue, 1)) * 100)}% 비중`}
              align="left"
              wrapperClassName="flex h-full"
              triggerClassName="flex h-full min-w-0 items-center rounded-sm px-4 text-xs font-medium text-ink-inverse"
            >
              <span
                className="flex h-full min-w-0 items-center rounded-sm px-4 text-xs font-medium text-ink-inverse"
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: colors[index % colors.length]
                }}
              >
                <span className="truncate">{inlineText}</span>
              </span>
            </PreviewTooltip>
          </div>
        </div>
      )})}
    </div>
  );
}

function PreviewChart({
  chartType,
  categories,
  categoryLabels,
  series,
  items,
  colors,
  totalValue,
  labels
}: {
  chartType: EditorChartType;
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
}) {
  if (chartType === "line") {
    return <LineChart categories={categories} categoryLabels={categoryLabels} series={series} colors={colors} totalValue={totalValue} labels={labels} />;
  }

  if (chartType === "bar") {
    return <BarChart categories={categories} categoryLabels={categoryLabels} series={series} colors={colors} totalValue={totalValue} labels={labels} />;
  }

  if (chartType === "donut") {
    return <DonutChart items={items} colors={colors} labels={labels} />;
  }

  return <RacingBarChart items={items} colors={colors} totalValue={totalValue} labels={labels} />;
}

export function EditorWorkspaceClient({ projectId }: { projectId: string }) {
  const [draft, setDraft] = useState<EditorDraftState>(initialDraft);
  const [savedSnapshot, setSavedSnapshot] = useState<EditorDraftState>(initialDraft);
  const [savedLabel, setSavedLabel] = useState("09:15 기준 로컬 저장됨");
  const [activeInspectorTab, setActiveInspectorTab] = useState<InspectorTab>("data");

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
      ? derivedData.items.map((item) => item.displayLabel)
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

            <div
              data-preview-tooltip-boundary
              className={`mt-6 rounded-xl border border-line-strong bg-surface-1 shadow-soft ${density.canvas}`}
            >
              <div className={`flex flex-wrap items-start justify-between ${density.gap}`}>
                <div>
                  <p className="text-caption uppercase tracking-[0.16em] text-ink-3">시각화 제목</p>
                  <h4 className="mt-2 text-xl font-semibold text-ink-1">{draft.text.title}</h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">{draft.text.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={theme.label} tone="neutral" />
                  <StatusBadge label={getLabelModeBadge(draft.labels.mode)} tone={draft.labels.mode === "hidden" ? "neutral" : "live"} />
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
                    categoryLabels={derivedData.categoryLabels}
                    series={derivedData.series}
                    items={derivedData.items}
                    colors={theme.colors}
                    totalValue={derivedData.totalValue}
                    labels={draft.labels}
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
        <RightInspectorShell
          title="설정 패널"
          tabs={inspectorTabs}
          activeTab={activeInspectorTab}
          onTabChange={(tab) => setActiveInspectorTab(tab as InspectorTab)}
        >
          {activeInspectorTab === "data" ? (
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
          ) : null}

          {activeInspectorTab === "labels" ? (
          <InspectorSection title="Labels" description="차트 안에 직접 새겨지는 이름과 값을 조절합니다. 라벨 필드를 바꾸면 본문 텍스트도 즉시 달라집니다." badge={getLabelModeBadge(draft.labels.mode)}>
            <ControlGroup title="라벨 기준" description="차트 안에서 어떤 이름을 읽게 할지 먼저 정합니다. 긴 이름은 화면에서는 줄이고, hover로 전체를 확인합니다.">
            <SelectField
              label="라벨 필드"
              hint="막대 옆 이름, 도넛 조각 이름, 순위 이름으로 사용할 필드를 고릅니다."
              value={draft.bindings.labelFieldKey}
              options={labelFieldOptions}
              onChange={(value) => handleBindingChange("labelFieldKey", value)}
              required={false}
            />
            </ControlGroup>

            <ControlGroup title="보여주는 양" description="값, 이름, 둘 다, 숨김 중에서 결과물의 정보 밀도를 고릅니다.">
            <SegmentedField
              label="라벨 표시"
              value={draft.labels.mode}
              options={[
                { value: "value", label: "값만" },
                { value: "name", label: "이름만" },
                { value: "both", label: "값 + 이름" },
                { value: "hidden", label: "숨기기" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    mode: value
                  }
                }))
              }
            />

            <SegmentedField
              label="표시 밀도"
              value={draft.labels.density}
              options={[
                { value: "minimal", label: "핵심만" },
                { value: "balanced", label: "균형" },
                { value: "detailed", label: "자세히" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    density: value
                  }
                }))
              }
            />
            </ControlGroup>

            <ControlGroup title="숫자 읽기" description="숫자가 너무 길거나 보고서 톤과 맞지 않을 때 짧게 줄이거나 비중으로 바꿉니다.">
            <SegmentedField
              label="자리수 / 표기"
              value={draft.labels.numberFormat}
              options={[
                { value: "number", label: "전체 숫자" },
                { value: "compact", label: "짧게" },
                { value: "percent", label: "비중" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    numberFormat: value
                  }
                }))
              }
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="접두 텍스트"
                value={draft.labels.prefix}
                placeholder="예: 약 "
                onChange={(event) =>
                  updateDraft((current) => ({
                    ...current,
                    labels: {
                      ...current.labels,
                      prefix: event.target.value
                    }
                  }))
                }
              />
              <Input
                label="접미 텍스트"
                value={draft.labels.suffix}
                placeholder="예: 명"
                onChange={(event) =>
                  updateDraft((current) => ({
                    ...current,
                    labels: {
                      ...current.labels,
                      suffix: event.target.value
                    }
                  }))
                }
              />
            </div>
            </ControlGroup>

            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              {draft.chartType === "bar"
                ? "막대 차트는 막대 끝에 값을, 축 아래에는 이름을 나눠 보여줘 비교가 빨리 읽히게 합니다."
                : draft.chartType === "donut"
                  ? "도넛 차트는 조각 이름과 비중을 범례 카드와 함께 맞춰 보여줘 구성비를 쉽게 읽게 합니다."
                  : draft.chartType === "racing-bar"
                    ? "막대 경주는 순위, 이름, 값을 한 줄 안에 압축해 지금 누가 앞서는지 바로 보이게 합니다."
                    : "선 차트는 모든 포인트에 라벨을 붙이지 않고 핵심 포인트만 골라 흐름을 해치지 않게 합니다."}
            </div>
          </InspectorSection>
          ) : null}

          {activeInspectorTab === "style" ? (
          <>
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
          </InspectorSection>
          </>
          ) : null}

          {activeInspectorTab === "axes" ? (
          <InspectorSection title="Axes" description="가로축과 값 축이 무엇을 말하는지 한눈에 확인합니다." badge="읽기 기준">
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">가로축 / 항목 기준</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldLabel(preview, draft.bindings.xFieldKey)}</p>
              <p className="mt-2 text-xs leading-5 text-ink-3">
                차트 안에서 항목을 나누는 기준입니다. 긴 이름은 미리보기에서 말줄임 처리하고, 마우스를 올리면 전체 이름을 확인할 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">값 축 / 크기 기준</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldLabel(preview, draft.bindings.valueFieldKey)}</p>
              <p className="mt-2 text-xs leading-5 text-ink-3">
                막대 길이, 선 높이, 도넛 조각 크기를 만드는 숫자입니다. Labels 탭의 표기 방식과 함께 결과물에 반영됩니다.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">구분 기준</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldLabel(preview, draft.bindings.seriesFieldKey)}</p>
              <p className="mt-2 text-xs leading-5 text-ink-3">
                선 차트와 막대 차트에서 색 또는 범례로 나눠 읽는 기준입니다. 필요 없다면 Data 탭에서 비워둘 수 있습니다.
              </p>
            </div>
          </InspectorSection>
          ) : null}

          {activeInspectorTab === "legend" ? (
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
          ) : null}

          {activeInspectorTab === "layout" ? (
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
          ) : null}

          {activeInspectorTab === "layout" ? (
          <Card variant="subtle" padding="compact" title="로컬 저장 상태">
            <p className="text-sm leading-6 text-ink-2">
              지금 바뀌는 필드 매핑과 추천 문구, 차트 결과는 모두 local state로 연결되어 있습니다. 이후 실제 persistence가 붙으면 이 상태 구조를 그대로 저장 스냅샷으로 넘기기 쉽게 구성했습니다.
            </p>
            <div className="mt-4 rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm text-ink-2">{savedLabel}</div>
          </Card>
          ) : null}
        </RightInspectorShell>
      }
    />
  );
}
