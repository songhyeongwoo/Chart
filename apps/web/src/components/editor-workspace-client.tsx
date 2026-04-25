"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { mockEditorSession, previewQaDatasetMap, previewQaStateLabelMap, type PreviewQaState } from "../lib/mock-data";
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
type LabelSize = "sm" | "md" | "lg";
type LabelWeight = "regular" | "medium" | "bold";
type LineWeight = "thin" | "balanced" | "bold";
type BarThickness = "slim" | "balanced" | "bold";
type DonutCenterSpace = "tight" | "balanced" | "wide";
type DonutGap = "tight" | "balanced" | "wide";
type PlaybackSpeed = "slow" | "normal" | "fast";
type InspectorTab = "data" | "style" | "axes" | "legend" | "labels" | "layout";
type TooltipAlign = "left" | "center" | "right";
type TooltipPlacement = "top" | "bottom";
type PreviewDataState = "balanced" | "empty" | "sparse" | "extreme";
type PreviewDataReason = "too-few-points" | "too-many-items" | "long-labels" | "wide-range" | "too-many-series";

interface PreviewDataDiagnostics {
  visibleCount: number;
  totalCount: number;
  hiddenCount: number;
  totalSeriesCount: number;
  longestLabelLength: number;
  maxValue: number;
  minPositiveValue: number;
  nonZeroValueCount: number;
  rangeRatio: number;
  dominantShare: number;
}

interface PreviewDataCopy {
  state: PreviewDataState;
  badge: string;
  title: string;
  description: string;
  detail: string;
  chips: string[];
}

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
  axes: {
    showAxis: boolean;
    showGrid: boolean;
  };
  legend: {
    show: boolean;
    position: LegendPosition;
  };
  labels: {
    mode: LabelMode;
    density: LabelDensity;
    numberFormat: LabelNumberFormat;
    size: LabelSize;
    weight: LabelWeight;
    prefix: string;
    suffix: string;
  };
  layout: {
    aspectRatio: AspectRatio;
    density: DensityMode;
  };
  chartOptions: {
    line: {
      showPoints: boolean;
      strokeWeight: LineWeight;
    };
    bar: {
      thickness: BarThickness;
    };
    donut: {
      centerSpace: DonutCenterSpace;
      segmentGap: DonutGap;
    };
    racingBar: {
      playSpeed: PlaybackSpeed;
    };
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
    label: "스튜디오",
    description: "짙은 슬레이트와 브론즈 톤으로 결과물을 또렷하게 정리합니다.",
    colors: ["#304752", "#51707D", "#7D8E80", "#B0835B", "#CC9B74", "#D8C4AE"]
  },
  moss: {
    label: "모스",
    description: "자연스러운 온도감과 안정적인 명암으로 설명형 차트를 만듭니다.",
    colors: ["#425D56", "#6D8579", "#91A597", "#A97A56", "#C99E77", "#D8CBB9"]
  },
  charcoal: {
    label: "차콜",
    description: "발표 슬라이드에 어울리는 선명한 대비와 무게 중심을 만듭니다.",
    colors: ["#212B31", "#455B67", "#6D7E87", "#8E705E", "#BC9275", "#D8D0C5"]
  }
};

const inspectorTabs: Array<{ value: InspectorTab; label: string; description: string }> = [
  { value: "data", label: "데이터", description: "필드 연결" },
  { value: "style", label: "스타일", description: "톤과 텍스트" },
  { value: "axes", label: "축/그리드", description: "읽기 구조" },
  { value: "legend", label: "범례", description: "정보 레이어" },
  { value: "labels", label: "라벨", description: "이름과 값" },
  { value: "layout", label: "레이아웃", description: "캔버스" }
];

const initialDraft: EditorDraftState = {
  chartType: "line",
  text: {
    title: "월별 가입자 증가 흐름",
    subtitle: "업로드한 열 구조를 바탕으로 추천된 필드 조합이 연결된 상태입니다",
    caption: "데이터 탭에서 어떤 열을 가로축, 값, 범례로 쓸지 고르면 중앙 결과와 추천 문구가 바로 바뀝니다."
  },
  bindings: getRecommendedBindings(previewQaDatasetMap.line.balanced, "line"),
  data: {
    sortMode: "original",
    topN: 4
  },
  style: {
    theme: "classic"
  },
  axes: {
    showAxis: true,
    showGrid: true
  },
  legend: {
    show: true,
    position: "right"
  },
  labels: {
    mode: "both",
    density: "balanced",
    numberFormat: "number",
    size: "md",
    weight: "medium",
    prefix: "",
    suffix: ""
  },
  layout: {
    aspectRatio: "16:10",
    density: "balanced"
  },
  chartOptions: {
    line: {
      showPoints: true,
      strokeWeight: "balanced"
    },
    bar: {
      thickness: "balanced"
    },
    donut: {
      centerSpace: "balanced",
      segmentGap: "balanced"
    },
    racingBar: {
      playSpeed: "normal"
    }
  }
};

function getQaStateTopN(chartType: EditorChartType, state: PreviewQaState) {
  if (chartType === "line") {
    return 4;
  }

  if (state === "extreme") {
    return chartType === "bar" ? 4 : 5;
  }

  if (state === "sparse") {
    return 3;
  }

  return 4;
}

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

function getRawLabelValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) {
    return "비어 있음";
  }

  return String(value);
}

function getRawNumericValue(value: string | number | boolean | null | undefined) {
  if (typeof value !== "number") {
    return 0;
  }

  return Number.isFinite(value) ? value : 0;
}

function getAxisTargetCount({
  totalCount,
  density,
  layoutDensity,
  chartType,
  longestLabelLength
}: {
  totalCount: number;
  density: LabelDensity;
  layoutDensity: DensityMode;
  chartType: "line" | "bar";
  longestLabelLength: number;
}) {
  let target =
    chartType === "line"
      ? density === "minimal"
        ? 3
        : density === "detailed"
          ? 6
          : 4
      : density === "minimal"
        ? 4
        : density === "detailed"
          ? 6
          : 5;

  if (layoutDensity === "compact") {
    target -= 1;
  }

  if (layoutDensity === "comfortable") {
    target += 1;
  }

  if (longestLabelLength >= 10) {
    target -= 1;
  }

  if (longestLabelLength >= 16) {
    target -= 1;
  }

  if (totalCount >= 8) {
    target -= 1;
  }

  return clamp(target, chartType === "line" ? 2 : 3, 7);
}

function getAxisTickIndexes({
  totalCount,
  density,
  layoutDensity,
  chartType,
  longestLabelLength
}: {
  totalCount: number;
  density: LabelDensity;
  layoutDensity: DensityMode;
  chartType: "line" | "bar";
  longestLabelLength: number;
}) {
  if (totalCount <= 0) {
    return new Set<number>();
  }

  const targetCount = getAxisTargetCount({
    totalCount,
    density,
    layoutDensity,
    chartType,
    longestLabelLength
  });
  const step = Math.max(1, Math.ceil(totalCount / Math.max(targetCount, 1)));
  const indexes = new Set<number>();

  for (let index = 0; index < totalCount; index += step) {
    indexes.add(index);
  }

  indexes.add(totalCount - 1);
  indexes.add(0);
  return indexes;
}

function getAxisLabelLimit({
  totalCount,
  density,
  layoutDensity,
  chartType,
  longestLabelLength
}: {
  totalCount: number;
  density: LabelDensity;
  layoutDensity: DensityMode;
  chartType: "line" | "bar";
  longestLabelLength: number;
}) {
  let limit =
    chartType === "line"
      ? density === "detailed"
        ? 9
        : density === "minimal"
          ? 7
          : 8
      : density === "detailed"
        ? 11
        : density === "minimal"
          ? 8
          : 9;

  if (layoutDensity === "compact") {
    limit -= 1;
  }

  if (layoutDensity === "comfortable") {
    limit += 1;
  }

  if (totalCount <= 4) {
    limit += 1;
  }

  if (longestLabelLength >= 18) {
    limit -= 1;
  }

  return clamp(limit, 6, 14);
}

function getAxisValueTicks(maxValue: number, layoutDensity: DensityMode) {
  const segmentCount = layoutDensity === "compact" ? 3 : 4;
  return Array.from({ length: segmentCount + 1 }, (_, index) => {
    const ratio = 1 - index / segmentCount;
    return Math.round(maxValue * ratio);
  });
}

function getAxisMinorTicks(ticks: number[]) {
  const minorTicks: number[] = [];

  for (let index = 0; index < ticks.length - 1; index += 1) {
    minorTicks.push(Math.round((ticks[index] + ticks[index + 1]) / 2));
  }

  return minorTicks;
}

function formatAxisValue(value: number) {
  if (value >= 10000) {
    return new Intl.NumberFormat("ko-KR", { notation: "compact", maximumFractionDigits: 1 }).format(value);
  }

  return formatNumber(value);
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

function getPrioritySeriesIndexes(series: Array<{ values: number[] }>, limit: number) {
  return new Set(
    series
      .map((item, index) => ({
        index,
        lastValue: item.values[item.values.length - 1] ?? 0,
        maxValue: Math.max(...item.values, 0)
      }))
      .sort((a, b) => b.lastValue - a.lastValue || b.maxValue - a.maxValue)
      .slice(0, Math.max(1, limit))
      .map((item) => item.index)
  );
}

function supportsExternalLegend(chartType: EditorChartType) {
  return chartType === "line" || chartType === "bar";
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

function getLabelFontSize(size: LabelSize) {
  if (size === "sm") {
    return { text: 10, axis: 10, value: "text-[10px]" };
  }

  if (size === "lg") {
    return { text: 12, axis: 12, value: "text-xs" };
  }

  return { text: 11, axis: 11, value: "text-[11px]" };
}

function getLabelFontWeight(weight: LabelWeight) {
  if (weight === "regular") {
    return { svg: 400, className: "font-normal" };
  }

  if (weight === "bold") {
    return { svg: 700, className: "font-semibold" };
  }

  return { svg: 500, className: "font-medium" };
}

function getLineStrokeWidth(weight: LineWeight) {
  if (weight === "thin") {
    return 2.5;
  }

  if (weight === "bold") {
    return 4.5;
  }

  return 3.5;
}

function getBarWidthClass(thickness: BarThickness) {
  if (thickness === "slim") {
    return "max-w-[34px]";
  }

  if (thickness === "bold") {
    return "max-w-[60px]";
  }

  return "max-w-[46px]";
}

function getDonutInnerInset(centerSpace: DonutCenterSpace) {
  if (centerSpace === "tight") {
    return "20%";
  }

  if (centerSpace === "wide") {
    return "30%";
  }

  return "24%";
}

function getDonutGapValue(gap: DonutGap) {
  if (gap === "tight") {
    return 0.6;
  }

  if (gap === "wide") {
    return 1.6;
  }

  return 1;
}

function collectPreviewDiagnostics(
  preview: NonNullable<typeof datasetPreview>,
  chartType: EditorChartType,
  bindings: FieldMappingBindings,
  derivedData: ReturnType<typeof deriveChartData>
): PreviewDataDiagnostics {
  const xFieldKey = bindings.xFieldKey;
  const seriesFieldKey = bindings.seriesFieldKey;
  const labelSource =
    chartType === "donut" || chartType === "racing-bar"
      ? derivedData.items.map((item) => item.displayLabel)
      : derivedData.categoryLabels;
  const values =
    chartType === "donut" || chartType === "racing-bar"
      ? derivedData.items.map((item) => item.value)
      : derivedData.series.flatMap((item) => item.values);
  const positiveValues = values.filter((value) => value > 0);
  const totalCategoryCount = xFieldKey
    ? new Set(preview.sampleRows.map((row) => getRawLabelValue(row[xFieldKey]))).size
    : 0;
  const visibleCount =
    chartType === "donut" || chartType === "racing-bar" ? derivedData.items.length : derivedData.categories.length;
  const totalSeriesCount =
    chartType === "line" || chartType === "bar"
      ? seriesFieldKey && seriesFieldKey !== xFieldKey
        ? Math.max(1, new Set(preview.sampleRows.map((row) => getRawLabelValue(row[seriesFieldKey]))).size)
        : Math.max(1, derivedData.series.length)
      : 1;
  const maxValue = positiveValues.length > 0 ? Math.max(...positiveValues) : 0;
  const minPositiveValue = positiveValues.length > 0 ? Math.min(...positiveValues) : 0;
  const longestLabelLength = labelSource.reduce((max, label) => Math.max(max, label.length), 0);

  return {
    visibleCount,
    totalCount: Math.max(totalCategoryCount, visibleCount),
    hiddenCount: Math.max(0, totalCategoryCount - visibleCount),
    totalSeriesCount,
    longestLabelLength,
    maxValue,
    minPositiveValue,
    nonZeroValueCount: positiveValues.length,
    rangeRatio: minPositiveValue > 0 ? maxValue / minPositiveValue : maxValue > 0 ? Number.POSITIVE_INFINITY : 1,
    dominantShare: positiveValues.length > 0 ? maxValue / Math.max(values.reduce((sum, value) => sum + Math.max(0, value), 0), 1) : 0
  };
}

function getPreviewStateCopy({
  chartType,
  xLabel,
  valueLabel,
  diagnostics
}: {
  chartType: EditorChartType;
  xLabel: string;
  valueLabel: string;
  diagnostics: PreviewDataDiagnostics;
}): PreviewDataCopy {
  const reasons: PreviewDataReason[] = [];
  const isEmpty = diagnostics.visibleCount === 0 || diagnostics.nonZeroValueCount === 0;
  const isSparse =
    !isEmpty &&
    (chartType === "line"
      ? diagnostics.visibleCount <= 3 || diagnostics.nonZeroValueCount <= 3
      : chartType === "bar"
        ? diagnostics.visibleCount <= 2 || diagnostics.nonZeroValueCount <= 2
        : chartType === "donut"
          ? diagnostics.visibleCount <= 2 || diagnostics.nonZeroValueCount <= 2
          : diagnostics.visibleCount <= 3 || diagnostics.nonZeroValueCount <= 3);
  const hasTooManyItems =
    chartType === "line"
      ? diagnostics.hiddenCount >= 2
      : chartType === "donut"
        ? diagnostics.hiddenCount >= 2
        : diagnostics.hiddenCount >= 3;
  const hasLongLabels =
    chartType === "racing-bar" ? diagnostics.longestLabelLength >= 18 : diagnostics.longestLabelLength >= 14;
  const hasWideRange =
    chartType === "donut"
      ? diagnostics.dominantShare >= 0.62 || diagnostics.rangeRatio >= 8
      : chartType === "line"
        ? diagnostics.rangeRatio >= 16
        : diagnostics.rangeRatio >= 12;
  const hasTooManySeries =
    (chartType === "line" || chartType === "bar") &&
    diagnostics.totalSeriesCount >= (chartType === "line" ? 4 : 3);

  if (hasTooManyItems) {
    reasons.push("too-many-items");
  }

  if (hasLongLabels) {
    reasons.push("long-labels");
  }

  if (hasWideRange) {
    reasons.push("wide-range");
  }

  if (hasTooManySeries) {
    reasons.push("too-many-series");
  }
  const chips = reasons.map((reason) => {
    if (reason === "too-many-items") {
      return `상위 ${diagnostics.visibleCount}개 우선`;
    }

    if (reason === "long-labels") {
      return "긴 라벨 축약";
    }

    if (reason === "wide-range") {
      return "값 편차 큼";
    }

    if (reason === "too-many-series") {
      return `시리즈 ${diagnostics.totalSeriesCount}개`;
    }

    return "항목 수 적음";
  });

  if (isEmpty) {
    if (chartType === "line") {
      return {
        state: "empty",
        badge: "값 필요",
        title: "추세를 그릴 값이 아직 연결되지 않았습니다.",
        description: `${xLabel} 흐름은 보이지만 ${valueLabel} 값이 없어, 지금은 빈 상태를 먼저 또렷하게 안내합니다.`,
        detail: "값 열을 다시 고르거나 비어 있는 행을 정리하면 선과 축이 같은 자리에서 바로 복구됩니다.",
        chips: ["값 없음", "빈 상태 안내"]
      };
    }

    if (chartType === "bar") {
      return {
        state: "empty",
        badge: "값 필요",
        title: "비교를 시작할 값이 아직 없습니다.",
        description: `${xLabel} 기준 항목은 있지만 ${valueLabel} 값이 비어 있어, 막대 대신 정돈된 안내 상태를 보여주고 있습니다.`,
        detail: "숫자 열이나 항목 기준을 다시 연결하면 비교 막대가 같은 레이아웃 안에서 바로 채워집니다.",
        chips: ["항목 없음", "비교 대기"]
      };
    }

    if (chartType === "donut") {
      return {
        state: "empty",
        badge: "값 필요",
        title: "구성 비중을 계산할 값이 아직 없습니다.",
        description: `${xLabel} 항목은 있지만 ${valueLabel}가 비어 있어, 조각을 그리기보다 빈 구성을 먼저 안내하고 있습니다.`,
        detail: "값이 들어오면 조각, 범례, 비중 안내가 같은 톤으로 함께 채워집니다.",
        chips: ["비중 없음", "구성 대기"]
      };
    }

    return {
      state: "empty",
      badge: "값 필요",
      title: "순위를 계산할 값이 아직 없습니다.",
      description: `${xLabel} 항목만 있고 ${valueLabel} 값이 없어, 막대 경주를 시작하지 않고 정돈된 대기 상태를 유지합니다.`,
      detail: "값이 들어오면 상위 순위와 막대 길이를 같은 기준으로 다시 계산합니다.",
      chips: ["순위 없음", "정렬 대기"]
    };
  }

  if (isSparse) {
    if (chartType === "line") {
      return {
        state: "sparse",
        badge: "데이터 적음",
        title: "포인트가 적어 흐름을 단정하기엔 이른 상태입니다.",
        description: "지금은 확인 가능한 구간만 또렷하게 두고, 축 눈금도 과하게 늘리지 않도록 정리했습니다.",
        detail: "기간 데이터가 더 쌓이면 추세선과 축 샘플링이 자동으로 자연스러운 밀도로 확장됩니다.",
        chips: ["대표 구간만 표시", "추세 참고용"]
      };
    }

    if (chartType === "bar") {
      return {
        state: "sparse",
        badge: "데이터 적음",
        title: "비교 가능한 항목이 아직 많지 않습니다.",
        description: "지금은 핵심 막대만 먼저 읽히도록 두고, 축과 라벨은 과장되지 않게 눌러두었습니다.",
        detail: "항목이 더 늘어나면 축 밀도와 범례 배치도 같은 제품 톤으로 함께 확장됩니다.",
        chips: ["핵심 막대 중심", "비교 참고용"]
      };
    }

    if (chartType === "donut") {
      return {
        state: "sparse",
        badge: "데이터 적음",
        title: "구성 항목이 적어 비중이 단순하게 보일 수 있습니다.",
        description: "현재는 큰 조각과 총합을 또렷하게 보여주고, 불필요한 장식은 줄였습니다.",
        detail: "구성 항목이 더 늘어나면 범례와 조각 강조도 밀도에 맞춰 자연스럽게 확장됩니다.",
        chips: ["조각 수 적음", "구성 참고용"]
      };
    }

    return {
      state: "sparse",
      badge: "데이터 적음",
      title: "순위를 읽기엔 항목 수가 아직 적습니다.",
      description: "지금은 상위 항목만 간결하게 보여주고, 막대 안 텍스트도 읽기 쉬운 수준으로 유지합니다.",
      detail: "순위 후보가 더 늘어나면 상위권 강조와 막대 폭 분배도 자동으로 조정됩니다.",
      chips: ["순위 후보 적음", "상위 결과 중심"]
    };
  }

  if (reasons.length > 0) {
    if (chartType === "line") {
      return {
        state: "extreme",
        badge: "밀도 높음",
        title: "핵심 흐름이 먼저 읽히도록 축과 라벨을 눌러두었습니다.",
        description:
          hasTooManyItems
            ? `구간 수가 많아 대표 ${diagnostics.visibleCount}개 구간만 먼저 배치하고 있습니다.`
            : "값 편차와 긴 라벨이 함께 있어, 작은 변화가 묻히지 않도록 축 위계를 다시 정리했습니다.",
        detail: "전체 이름과 값은 툴팁에서 바로 확인할 수 있고, 기간을 더 잘게 나누거나 시리즈 수를 줄이면 읽기 밀도가 더 안정됩니다.",
        chips
      };
    }

    if (chartType === "bar") {
      return {
        state: "extreme",
        badge: "밀도 높음",
        title: "비교 우선순위를 유지하도록 축과 범례를 압축했습니다.",
        description:
          hasTooManyItems
            ? `항목 수가 많아 상위 ${diagnostics.visibleCount}개 결과를 먼저 보여주고 있습니다.`
            : "긴 항목명과 큰 값 편차가 함께 있어, 막대 본문보다 축과 범례가 앞서 보이지 않게 다듬었습니다.",
        detail: "전체 항목을 모두 보려면 Top N을 넓히고, 비슷한 항목끼리 묶으면 비교가 더 또렷해집니다.",
        chips
      };
    }

    if (chartType === "donut") {
      return {
        state: "extreme",
        badge: "밀도 높음",
        title: "비중 읽기가 흐트러지지 않도록 대표 항목 중심으로 정리했습니다.",
        description:
          hasTooManyItems
            ? `항목 수가 많아 상위 ${diagnostics.visibleCount}개 비중을 먼저 보여주고 있습니다.`
            : diagnostics.dominantShare >= 0.62
              ? "한 항목 비중이 매우 커서, 나머지 조각이 묻히지 않도록 범례와 요약 정보를 함께 정리했습니다."
              : "긴 항목명과 큰 비중 차이를 함께 다루기 위해, 조각보다 보조 정보가 과하게 튀지 않도록 정돈했습니다.",
        detail: "세부 항목을 묶거나 긴 이름을 정리하면 조각과 범례가 더 균형 있게 읽힙니다.",
        chips
      };
    }

    return {
      state: "extreme",
      badge: "밀도 높음",
      title: "순위 읽기가 흐트러지지 않도록 상위 결과 중심으로 정리했습니다.",
      description:
        hasTooManyItems
          ? `항목 수가 많아 상위 ${diagnostics.visibleCount}개 결과만 먼저 표시하고 있습니다.`
          : "이름 길이와 값 편차를 함께 고려해, 막대 안 텍스트와 헤더 값을 분리해서 읽기 흐름을 지켰습니다.",
      detail: "순위가 많은 경우 상위권만 먼저 보고, 긴 이름은 짧은 라벨로 정리하면 막대 경주가 훨씬 안정적으로 읽힙니다.",
      chips
    };
  }

  return {
    state: "balanced",
    badge: "안정적",
    title: "지금 상태는 바로 공유해도 읽기 흐름이 안정적입니다.",
    description: "축, 범례, 라벨을 과하게 줄이지 않아도 핵심 정보가 자연스럽게 먼저 읽힙니다.",
    detail: "데이터 구조가 바뀌면 빈 상태, 데이터 적음, 밀도 높음 안내도 같은 제품 톤으로 이어집니다.",
    chips: []
  };
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
    <div
      className={
        active
          ? "rounded-2xl border border-line-accent bg-surface-1 px-4 py-4 shadow-soft"
          : "rounded-2xl border border-line-subtle bg-surface-1/92 px-4 py-4"
      }
    >
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
      className="rounded-[24px] border-line-strong/70 bg-[linear-gradient(180deg,rgba(250,247,242,0.98),rgba(240,234,226,0.94))]"
    >
      <div className="space-y-3.5">{children}</div>
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
    <div className="rounded-[22px] border border-line-subtle bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(243,237,229,0.92))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)]">
      <p className="text-[13px] font-semibold tracking-[-0.02em] text-ink-1">{title}</p>
      <p className="mt-1.5 text-[13px] leading-6 text-ink-2">{description}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function QaStatePanel({
  chartType,
  state,
  onChange,
  datasetName
}: {
  chartType: EditorChartType;
  state: PreviewQaState;
  onChange: (state: PreviewQaState) => void;
  datasetName: string;
}) {
  const options: PreviewQaState[] = ["balanced", "empty", "sparse", "extreme"];

  return (
    <Card
      variant="subtle"
      padding="compact"
      title="검토용 상태 패널"
      description="실제 제품 UI에는 노출되지 않는 로컬 QA 전용 전환입니다."
      headerActions={<StatusBadge label={`${chartType} · ${previewQaStateLabelMap[state]}`} tone="neutral" />}
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-line-subtle bg-surface-1 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">현재 샘플</p>
          <p className="mt-2 text-sm font-medium text-ink-1">{datasetName}</p>
          <p className="mt-1 text-xs leading-5 text-ink-3">chart type별 상태 차이를 눈으로 확인할 수 있도록 로컬 샘플만 바꿔 보여줍니다.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={
                option === state
                  ? "rounded-full border border-line-strong bg-surface-1 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-ink-1"
                  : "rounded-full border border-line-subtle bg-surface-1 px-3 py-1.5 text-[11px] tracking-[0.08em] text-ink-3 transition hover:border-line-strong hover:text-ink-1"
              }
            >
              {previewQaStateLabelMap[option]}
            </button>
          ))}
        </div>
      </div>
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
    <div className="rounded-[20px] border border-line-subtle bg-surface-1/96 px-4 py-4">
      <p className="text-[13px] font-semibold tracking-[-0.02em] text-ink-1">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={
              value === option.value
                ? "rounded-full border border-line-accent bg-accent px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] text-ink-inverse shadow-soft"
                : "rounded-full border border-line-subtle bg-surface-1 px-3.5 py-1.5 text-[11px] tracking-[0.08em] text-ink-3 transition hover:border-line-strong hover:text-ink-1"
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
      className="flex w-full items-center justify-between gap-4 rounded-[20px] border border-line-subtle bg-surface-1/96 px-4 py-4 text-left transition hover:border-line-strong"
    >
      <div>
        <p className="text-[13px] font-semibold tracking-[-0.02em] text-ink-1">{label}</p>
        <p className="mt-1 text-[13px] leading-6 text-ink-2">{description}</p>
      </div>
      <span className={checked ? "relative inline-flex h-7 w-12 rounded-full bg-accent shadow-soft" : "relative inline-flex h-7 w-12 rounded-full bg-surface-3"}>
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
    <div className="rounded-[20px] border border-line-subtle bg-surface-1/96 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold tracking-[-0.02em] text-ink-1">{label}</p>
        <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-2">{value}개</span>
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
      <span className="mb-2 block text-[13px] font-semibold tracking-[-0.02em] text-ink-2">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-line-subtle bg-surface-1 px-4 py-3 text-sm leading-6 text-ink-1 outline-none transition placeholder:text-ink-3 focus:border-line-accent focus:ring-2 focus:ring-accent-soft/45"
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
    <label className="block rounded-[20px] border border-line-subtle bg-surface-1/96 px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink-1">{label}</span>
        <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-3">
          {required ? "필수" : "선택"}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-6 text-ink-2">{hint}</p>
      <select
        className="mt-3 h-11 w-full rounded-md border border-line-subtle bg-surface-1 px-4 text-sm text-ink-1 outline-none transition focus:border-line-accent focus:ring-2 focus:ring-accent-soft/45"
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
  position,
  density,
  contextLabel
}: {
  items: string[];
  colors: string[];
  position: LegendPosition;
  density: DensityMode;
  contextLabel: string;
}) {
  const longestLabelLength = items.reduce((max, item) => Math.max(max, item.length), 0);
  const visibleCount =
    position === "right"
      ? density === "compact"
        ? 5
        : density === "comfortable"
          ? 7
          : 6
      : density === "compact"
        ? 4
        : density === "comfortable"
          ? 6
          : 5;
  const adjustedVisibleCount = clamp(visibleCount - (longestLabelLength >= 16 && position !== "right" ? 1 : 0), 3, 7);
  const visibleItems = items.slice(0, adjustedVisibleCount);
  const hiddenItems = items.slice(adjustedVisibleCount);
  const containerClassName =
    position === "right"
      ? "rounded-2xl border border-line-subtle bg-surface-2/72 px-4 py-4"
      : position === "top"
        ? "rounded-xl border border-line-subtle/80 bg-surface-2/68 px-4 py-3"
        : "rounded-xl border border-line-subtle/80 bg-surface-2/72 px-4 py-4";
  const listClassName =
    position === "right"
      ? "grid gap-2"
      : position === "top"
        ? "flex flex-wrap gap-2.5"
        : "flex flex-wrap gap-3";
  const itemClassName =
    position === "right"
      ? "flex min-w-0 items-center gap-2 rounded-md border border-line-subtle/80 bg-surface-1/95 px-3 py-2.5"
      : "flex min-w-0 items-center gap-2 rounded-full border border-line-subtle/80 bg-surface-1/95 px-3 py-2";
  const labelLimit =
    position === "right" ? (density === "comfortable" ? 22 : 18) : density === "comfortable" ? 16 : 13;

  return (
    <div className={containerClassName}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">범례</p>
          <p className="mt-1 text-xs text-ink-2">{contextLabel === "없음" ? "색상으로 구분된 항목" : `${contextLabel} 기준 구분`}</p>
        </div>
        <span className="rounded-full border border-line-subtle/80 bg-surface-1 px-2.5 py-1 text-[10px] tracking-[0.12em] text-ink-3">
          항목 {items.length}개
        </span>
      </div>

      <div className={listClassName}>
        {visibleItems.map((item, index) => (
          <div key={`${item}-${position}`} className={itemClassName}>
            <span className="size-2 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
            <PreviewTooltip eyebrow="범례" label={item} detail="색으로 구분되는 항목입니다." align={position === "right" ? "left" : "center"}>
              <span className="truncate text-[13px] leading-5 text-ink-2">{truncateLabel(item, labelLimit)}</span>
            </PreviewTooltip>
          </div>
        ))}

        {hiddenItems.length > 0 ? (
          <PreviewTooltip
            eyebrow="범례 요약"
            label={`추가 항목 ${hiddenItems.length}개`}
            detail={hiddenItems.slice(0, 4).join(", ")}
            align={position === "right" ? "left" : "center"}
          >
            <div className={cx(itemClassName, "border-dashed bg-surface-1/80")}>
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="truncate text-[13px] leading-5 text-ink-3">+{hiddenItems.length}개 더</span>
            </div>
          </PreviewTooltip>
        ) : null}
      </div>
    </div>
  );
}

function PreviewStateNotice({
  copy,
  chartType,
  compact = false
}: {
  copy: PreviewDataCopy;
  chartType: EditorChartType;
  compact?: boolean;
}) {
  const chipToneClassName = copy.state === "sparse" ? "border-line-strong/70 text-ink-2" : "border-line-strong text-ink-2";

  return (
    <div
      className={
        compact
          ? "rounded-xl border border-line-subtle bg-surface-2/88 px-4 py-4"
          : "flex h-full items-center justify-center rounded-[26px] border border-dashed border-line-strong/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(242,237,230,0.92))] px-8 py-10 shadow-inset"
      }
    >
      <div className={compact ? "min-w-0 max-w-3xl" : "mx-auto max-w-xl text-center"}>
        <div className={compact ? "min-w-0" : ""}>
          <div className={compact ? "flex items-center gap-2" : "flex flex-col items-center"}>
            {!compact ? <PreviewStateGlyph chartType={chartType} /> : null}
            <span className="rounded-full border border-line-subtle bg-surface-1 px-3 py-1 text-[10px] tracking-[0.14em] text-ink-3">
              {copy.badge}
            </span>
          </div>
          <p className={compact ? "mt-3 text-sm font-medium text-ink-1" : "mt-4 text-lg font-semibold text-ink-1"}>{copy.title}</p>
          <p className={compact ? "mt-2 text-sm leading-6 text-ink-2" : "mt-3 text-sm leading-6 text-ink-2"}>{copy.description}</p>
        </div>
        {copy.chips.length > 0 ? (
          <div className={cx("flex flex-wrap gap-2", compact ? "mt-3" : "mt-4 justify-center")}>
            {copy.chips.map((chip) => (
              <span
                key={chip}
                className={cx(
                  "rounded-full border bg-surface-1 px-2.5 py-1 text-[10px] tracking-[0.12em]",
                  chipToneClassName
                )}
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        <div className={compact ? "mt-3 rounded-lg border border-line-subtle bg-surface-1/90 px-4 py-3" : "mt-5 rounded-lg border border-line-subtle bg-surface-1/92 px-4 py-4 text-left"}>
          <p className="text-sm leading-6 text-ink-2">{copy.detail}</p>
        </div>
      </div>
    </div>
  );
}

function PreviewStateGlyph({ chartType }: { chartType: EditorChartType }) {
  if (chartType === "line") {
    return (
      <div className="relative h-12 w-20">
        <span className="absolute inset-x-1 bottom-2 border-t border-dashed border-line-strong/60" />
        <span className="absolute left-2 bottom-4 size-2 rounded-full bg-line-strong/70" />
        <span className="absolute left-8 bottom-7 size-2 rounded-full bg-line-strong/70" />
        <span className="absolute right-3 bottom-5 size-2 rounded-full bg-line-strong/70" />
        <span className="absolute left-[10px] right-[16px] top-[15px] border-t border-line-strong/60" style={{ transform: "rotate(-12deg)" }} />
      </div>
    );
  }

  if (chartType === "bar") {
    return (
      <div className="flex h-12 w-20 items-end justify-center gap-2">
        <span className="w-3 rounded-t-sm bg-line-strong/55" style={{ height: "42%" }} />
        <span className="w-3 rounded-t-sm bg-line-strong/65" style={{ height: "74%" }} />
        <span className="w-3 rounded-t-sm bg-line-strong/55" style={{ height: "58%" }} />
      </div>
    );
  }

  if (chartType === "donut") {
    return <div className="h-14 w-14 rounded-full border-[10px] border-line-strong/60 border-t-accent/60" />;
  }

  return (
    <div className="grid h-12 w-24 gap-2">
      {[52, 74, 63].map((width, index) => (
        <div key={width} className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-line-subtle bg-surface-1 text-[10px] text-ink-3">
            {index + 1}
          </span>
          <span className="h-2 rounded-full bg-line-strong/65" style={{ width: `${width}%` }} />
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
  labels,
  axes,
  lineOptions,
  layoutDensity,
  xAxisLabel,
  valueAxisLabel
}: {
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
  axes: EditorDraftState["axes"];
  lineOptions: EditorDraftState["chartOptions"]["line"];
  layoutDensity: DensityMode;
  xAxisLabel: string;
  valueAxisLabel: string;
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const combinedValues = categories.map((_, index) => series.reduce((sum, currentSeries) => sum + (currentSeries.values[index] ?? 0), 0));
  const highlightedIndexes = getLineLabelIndexes(combinedValues, labels.density);
  const longestLabelLength = categoryLabels.reduce((max, label) => Math.max(max, label.length), 0);
  const axisLabelIndexes = new Set([
    ...getAxisTickIndexes({
      totalCount: categories.length,
      density: labels.density,
      layoutDensity,
      chartType: "line",
      longestLabelLength
    }),
    ...Array.from(highlightedIndexes)
  ]);
  const axisLabelLimit = getAxisLabelLimit({
    totalCount: categories.length,
    density: labels.density,
    layoutDensity,
    chartType: "line",
    longestLabelLength
  });
  const yTicks = getAxisValueTicks(maxValue, layoutDensity);
  const minorTicks = getAxisMinorTicks(yTicks);
  const chartLeft = 72;
  const chartRight = 584;
  const chartTop = 42;
  const chartBottom = 232;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;
  const dominantSeriesByIndex = categories.map((_, categoryIndex) =>
    series.reduce(
      (bestIndex, currentSeries, seriesIndex) =>
        (currentSeries.values[categoryIndex] ?? 0) > (series[bestIndex]?.values[categoryIndex] ?? 0) ? seriesIndex : bestIndex,
      0
    )
  );
  const lastPointPrioritySeriesIndexes = getPrioritySeriesIndexes(
    series,
    series.length >= 5 ? 2 : series.length >= 4 ? 3 : series.length
  );
  const labelFont = getLabelFontSize(labels.size);
  const labelWeight = getLabelFontWeight(labels.weight);
  const strokeWidth = getLineStrokeWidth(lineOptions.strokeWeight);

  return (
    <div className="chart-paper h-full rounded-[26px] border border-line-strong/75 px-5 pb-5 pt-6 shadow-inset">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">값 축</p>
          <p className="mt-1 text-sm text-ink-2">{valueAxisLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">가로축</p>
          <p className="mt-1 text-sm text-ink-2">{xAxisLabel}</p>
        </div>
      </div>
      <svg viewBox="0 0 620 280" className="h-full min-h-[260px] w-full">
        {axes.showGrid &&
          minorTicks.map((tick) => {
          const y = chartBottom - (tick / maxValue) * chartHeight;

          return (
            <line
              key={`line-minor-${tick}`}
              x1={chartLeft}
              x2={chartRight}
              y1={y}
              y2={y}
              stroke="rgba(183,173,161,0.12)"
              strokeDasharray="2 8"
            />
          );
        })}
        {axes.showGrid &&
          yTicks.map((tick) => {
          const y = chartBottom - (tick / maxValue) * chartHeight;

          return (
            <g key={`line-major-${tick}`}>
              <line x1={chartLeft} x2={chartRight} y1={y} y2={y} stroke="rgba(183,173,161,0.24)" strokeDasharray="4 6" />
              {axes.showAxis ? <line x1={chartLeft - 6} x2={chartLeft} y1={y} y2={y} stroke="rgba(183,173,161,0.4)" /> : null}
              {axes.showAxis ? (
                <text x={chartLeft - 10} y={y + 4} textAnchor="end" fontSize={labelFont.axis} fill="#8A8780">
                {formatAxisValue(tick)}
                </text>
              ) : null}
            </g>
          );
        })}
        {axes.showAxis ? <line x1={chartLeft} x2={chartLeft} y1={chartTop} y2={chartBottom} stroke="rgba(183,173,161,0.34)" /> : null}
        {axes.showAxis ? <line x1={chartLeft} x2={chartRight} y1={chartBottom} y2={chartBottom} stroke="rgba(183,173,161,0.36)" /> : null}
        {series.map((currentSeries, seriesIndex) => {
          const points = currentSeries.values.map((value, index) => {
            const x = (index / Math.max(categories.length - 1, 1)) * chartWidth + chartLeft;
            const y = chartBottom - (value / maxValue) * chartHeight;
            return { x, y, value };
          });

          return (
            <g key={currentSeries.label}>
              <path
                d={`M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`}
                fill="none"
                stroke="rgba(255,255,255,0.62)"
                strokeWidth={strokeWidth + 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`}
                fill="none"
                stroke={colors[seriesIndex % colors.length]}
                strokeWidth={strokeWidth}
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
                const shouldShowLastPointLabel =
                  series.length <= 3 || labels.density === "detailed" || lastPointPrioritySeriesIndexes.has(seriesIndex);
                const showPointLabel =
                  labels.mode !== "hidden" &&
                  ((isLastPoint && shouldShowLastPointLabel) || (!isLastPoint && highlightedIndexes.has(pointIndex))) &&
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
                    {lineOptions.showPoints ? <circle cx={point.x} cy={point.y} r="4.5" fill={colors[seriesIndex % colors.length]} /> : null}
                    {showPointLabel ? (
                      <text
                        x={point.x}
                        y={clamp(point.y + labelOffset, 20, 248)}
                        textAnchor="middle"
                        fontSize={labelFont.text}
                        fontWeight={labelWeight.svg}
                        fill="#5D5A54"
                      >
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
          if (!axes.showAxis) {
            return null;
          }

          const x = (index / Math.max(categories.length - 1, 1)) * chartWidth + chartLeft;

          return (
            <g key={label}>
              <line x1={x} x2={x} y1={chartBottom} y2={chartBottom + (axisLabelIndexes.has(index) ? 7 : 4)} stroke="rgba(183,173,161,0.32)" />
              {axisLabelIndexes.has(index) ? (
                <g>
                  <title>{categoryLabels[index] ?? label}</title>
                  <text x={x} y="255" textAnchor="middle" fontSize={labelFont.axis} fill="#7E7B75">
                    {truncateLabel(categoryLabels[index] ?? label, axisLabelLimit)}
                  </text>
                </g>
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
  labels,
  axes,
  barOptions,
  layoutDensity,
  xAxisLabel,
  valueAxisLabel
}: {
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
  axes: EditorDraftState["axes"];
  barOptions: EditorDraftState["chartOptions"]["bar"];
  layoutDensity: DensityMode;
  xAxisLabel: string;
  valueAxisLabel: string;
}) {
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, categories.length, "bar");
  const longestLabelLength = categoryLabels.reduce((max, label) => Math.max(max, label.length), 0);
  const categoryTotals = categories.map((_, categoryIndex) =>
    series.reduce((sum, currentSeries) => sum + (currentSeries.values[categoryIndex] ?? 0), 0)
  );
  const priorityCategoryIndexes = getTopValueIndexes(categoryTotals, labelLimit);
  const axisLabelIndexes = getAxisTickIndexes({
    totalCount: categories.length,
    density: labels.density,
    layoutDensity,
    chartType: "bar",
    longestLabelLength
  });
  const axisLabelLimit = getAxisLabelLimit({
    totalCount: categories.length,
    density: labels.density,
    layoutDensity,
    chartType: "bar",
    longestLabelLength
  });
  const yTicks = getAxisValueTicks(maxValue, layoutDensity);
  const minorTicks = getAxisMinorTicks(yTicks);
  const dominantSeriesByCategory = categories.map((_, categoryIndex) =>
    series.reduce(
      (bestIndex, currentSeries, seriesIndex) =>
        (currentSeries.values[categoryIndex] ?? 0) > (series[bestIndex]?.values[categoryIndex] ?? 0) ? seriesIndex : bestIndex,
      0
    )
  );
  const labelFont = getLabelFontSize(labels.size);
  const labelWeight = getLabelFontWeight(labels.weight);

  return (
    <div className="chart-paper rounded-[26px] border border-line-strong/75 px-5 pb-5 pt-6 shadow-inset">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">값 축</p>
          <p className="mt-1 text-sm text-ink-2">{valueAxisLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-3">가로축</p>
          <p className="mt-1 text-sm text-ink-2">{xAxisLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
        <div className="relative h-[220px]">
          {axes.showAxis &&
            yTicks.map((tick) => {
            const top = `${(1 - tick / maxValue) * 100}%`;

            return (
              <span
                key={`bar-axis-${tick}`}
                className="absolute right-0 -translate-y-1/2 text-[11px] text-ink-3"
                style={{ top }}
              >
                {formatAxisValue(tick)}
              </span>
            );
          })}
        </div>

        <div className="relative min-w-0">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px]">
            {axes.showGrid &&
              minorTicks.map((tick) => {
              const top = `${(1 - tick / maxValue) * 100}%`;

              return (
                <span
                  key={`bar-minor-${tick}`}
                  className="absolute inset-x-0 border-t border-dashed border-line-subtle/60"
                  style={{ top }}
                />
              );
            })}
            {axes.showGrid &&
              yTicks.map((tick) => {
              const top = `${(1 - tick / maxValue) * 100}%`;

              return (
                <span key={`bar-major-${tick}`} className="absolute inset-x-0 border-t border-line-subtle/80" style={{ top }} />
              );
            })}
          </div>

          <div
            className="grid min-h-[260px] items-end gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.max(categories.length, 1)}, minmax(0, 1fr))` }}
          >
            {categories.map((category, categoryIndex) => {
              const axisLabel = categoryLabels[categoryIndex] ?? category;
              const showAxisLabel = axisLabelIndexes.has(categoryIndex);

              return (
                <div key={category} className="flex h-full min-w-0 flex-col justify-end">
                  <div className="flex h-[220px] items-end justify-center gap-2">
                    {series.map((currentSeries, seriesIndex) => {
                      const currentValue = currentSeries.values[categoryIndex] ?? 0;
                      const barHeight = Math.max(16, (currentValue / maxValue) * 192);
                      const isPriorityCategory = priorityCategoryIndexes.has(categoryIndex);
                      const canHighlightBar =
                        labels.density === "detailed" || series.length === 1 || dominantSeriesByCategory[categoryIndex] === seriesIndex;
                      const shouldShowBarName =
                        labels.mode !== "hidden" && showName && isPriorityCategory && canHighlightBar && (!showAxisLabel || series.length > 1);
                      const shouldShowBarValue =
                        labels.mode !== "hidden" &&
                        showValue &&
                        isPriorityCategory &&
                        canHighlightBar &&
                        (barHeight >= (shouldShowBarName ? 52 : 34) || labels.density === "detailed");

                      return (
                        <div key={`${category}-${currentSeries.label}`} className={cx("flex h-full w-full flex-col justify-end", getBarWidthClass(barOptions.thickness))}>
                          {shouldShowBarName || shouldShowBarValue ? (
                            <div className={cx("mb-2 text-center leading-4 text-ink-2", labelFont.value, labelWeight.className)}>
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
                                <PreviewTooltip eyebrow="값" label={formatLabelValue(currentValue, labels, totalValue)} detail={axisLabel}>
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
                              className="block w-full rounded-t-[14px] border border-white/25"
                              style={{
                                height: `${barHeight}px`,
                                background: `linear-gradient(180deg, ${colors[seriesIndex % colors.length]}, rgba(48,71,82,0.9))`
                              }}
                            />
                          </PreviewTooltip>
                        </div>
                      );
                    })}
                  </div>
                  {showAxisLabel && axes.showAxis ? (
                    <PreviewTooltip eyebrow="축 라벨" label={axisLabel} detail="가로축에서 항목을 구분합니다.">
                      <span className={cx("mt-3 block truncate text-center leading-5 text-ink-2", labelWeight.className, labelFont.value)}>
                        {truncateLabel(axisLabel, axisLabelLimit)}
                      </span>
                    </PreviewTooltip>
                  ) : (
                    <span className="mt-3 block h-10" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart({
  items,
  colors,
  labels,
  donutOptions
}: {
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  labels: EditorDraftState["labels"];
  donutOptions: EditorDraftState["chartOptions"]["donut"];
}) {
  const total = Math.max(1, items.reduce((sum, item) => sum + item.value, 0));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, items.length, "donut");
  const priorityIndexes = getTopValueIndexes(items.map((item) => item.value), labelLimit);
  const gapValue = getDonutGapValue(donutOptions.segmentGap);
  const innerInset = getDonutInnerInset(donutOptions.centerSpace);
  const labelWeight = getLabelFontWeight(labels.weight);
  const labelFont = getLabelFontSize(labels.size);
  let current = 0;
  const segments = items.flatMap((item, index) => {
    const percentage = (item.value / total) * 100;
    const start = current;
    current += percentage;
    const colorEnd = Math.max(start, current - gapValue);
    return [
      `${colors[index % colors.length]} ${start}% ${colorEnd}%`,
      `rgb(250 247 242) ${colorEnd}% ${current}%`
    ];
  });

  return (
    <div className="chart-paper grid h-full min-h-[260px] gap-6 rounded-[26px] border border-line-strong/75 px-6 py-6 shadow-inset lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
      <div className="flex justify-center">
        <div className="relative size-52 rounded-full shadow-soft" style={{ background: `conic-gradient(${segments.join(", ")})` }}>
          <div className="absolute flex flex-col items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(244,239,231,0.94))]" style={{ inset: innerInset }}>
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
              "rounded-[16px] border border-line-subtle bg-surface-1 px-4 py-3",
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
                  <span className={cx("max-w-[150px] truncate text-sm text-ink-1", labelWeight.className)}>
                    {truncateLabel(showName ? item.displayLabel : item.label, 18)}
                  </span>
                </PreviewTooltip>
              </div>
              {labels.mode !== "hidden" && showValue && (isPriority || labels.density === "detailed") ? (
                <span className={cx(isPriority ? "text-sm text-ink-1" : "text-sm text-ink-2", labelWeight.className, labelFont.value)}>
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
  labels,
  racingBarOptions
}: {
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
  racingBarOptions: EditorDraftState["chartOptions"]["racingBar"];
}) {
  const maxValue = Math.max(1, ...items.map((item) => item.value));
  const showName = shouldShowLabelName(labels.mode);
  const showValue = shouldShowLabelValue(labels.mode);
  const labelLimit = getChartLabelLimit(labels.density, items.length, "racing-bar");
  const priorityIndexes = getTopValueIndexes(items.map((item) => item.value), labelLimit);
  const labelWeight = getLabelFontWeight(labels.weight);

  return (
    <div className="chart-paper grid h-full min-h-[260px] gap-4 rounded-[26px] border border-line-strong/75 px-5 py-5 shadow-inset">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-line-subtle bg-surface-1 px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink-3">Timeline</p>
          <p className="mt-1 text-sm font-medium text-ink-1">현재 프레임 기준 순위</p>
        </div>
        <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1 text-[11px] tracking-[0.08em] text-ink-2">
          재생 속도 {racingBarOptions.playSpeed === "slow" ? "느리게" : racingBarOptions.playSpeed === "fast" ? "빠르게" : "기본"}
        </span>
      </div>
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
                <span className={cx("max-w-[180px] truncate text-sm text-ink-1", labelWeight.className)}>
                  {truncateLabel(showName ? item.displayLabel : item.label, 20)}
                </span>
              </PreviewTooltip>
            </div>
            {showHeaderValue ? (
              <span className="text-sm text-ink-2">{formatLabelValue(item.value, labels, totalValue)}</span>
            ) : null}
          </div>
          <div className="rounded-[16px] bg-surface-2 p-1.5">
            <PreviewTooltip
              eyebrow={`${index + 1}위`}
              label={showName ? item.displayLabel : item.label}
              value={formatLabelValue(item.value, labels, totalValue)}
              detail={`${Math.round((item.value / Math.max(totalValue, 1)) * 100)}% 비중`}
              align="left"
              wrapperClassName="flex h-full"
              triggerClassName="flex h-full min-w-0 items-center rounded-[12px] px-4 text-xs font-medium text-ink-inverse"
            >
              <span
                className="flex h-11 min-w-0 items-center rounded-[12px] px-4 text-xs font-medium text-ink-inverse"
                style={{
                  width: `${widthPercentage}%`,
                  background: `linear-gradient(90deg, ${colors[index % colors.length]}, rgba(48,71,82,0.92))`
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
  labels,
  axes,
  chartOptions,
  layoutDensity,
  xAxisLabel,
  valueAxisLabel
}: {
  chartType: EditorChartType;
  categories: string[];
  categoryLabels: string[];
  series: Array<{ label: string; values: number[] }>;
  items: Array<{ label: string; displayLabel: string; value: number }>;
  colors: string[];
  totalValue: number;
  labels: EditorDraftState["labels"];
  axes: EditorDraftState["axes"];
  chartOptions: EditorDraftState["chartOptions"];
  layoutDensity: DensityMode;
  xAxisLabel: string;
  valueAxisLabel: string;
}) {
  if (chartType === "line") {
    return (
      <LineChart
        categories={categories}
        categoryLabels={categoryLabels}
        series={series}
        colors={colors}
        totalValue={totalValue}
        labels={labels}
        axes={axes}
        lineOptions={chartOptions.line}
        layoutDensity={layoutDensity}
        xAxisLabel={xAxisLabel}
        valueAxisLabel={valueAxisLabel}
      />
    );
  }

  if (chartType === "bar") {
    return (
      <BarChart
        categories={categories}
        categoryLabels={categoryLabels}
        series={series}
        colors={colors}
        totalValue={totalValue}
        labels={labels}
        axes={axes}
        barOptions={chartOptions.bar}
        layoutDensity={layoutDensity}
        xAxisLabel={xAxisLabel}
        valueAxisLabel={valueAxisLabel}
      />
    );
  }

  if (chartType === "donut") {
    return <DonutChart items={items} colors={colors} labels={labels} donutOptions={chartOptions.donut} />;
  }

  return <RacingBarChart items={items} colors={colors} totalValue={totalValue} labels={labels} racingBarOptions={chartOptions.racingBar} />;
}

export function EditorWorkspaceClient({ projectId }: { projectId: string }) {
  const [draft, setDraft] = useState<EditorDraftState>(initialDraft);
  const [savedSnapshot, setSavedSnapshot] = useState<EditorDraftState>(initialDraft);
  const [savedLabel, setSavedLabel] = useState("09:15 기준 로컬 저장됨");
  const [activeInspectorTab, setActiveInspectorTab] = useState<InspectorTab>("data");
  const [qaState, setQaState] = useState<PreviewQaState>("balanced");

  const preview = previewQaDatasetMap[draft.chartType][qaState] ?? datasetPreview ?? previewQaDatasetMap.line.balanced;

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
  const xAxisLabel = getFieldLabel(preview, draft.bindings.xFieldKey);
  const valueAxisLabel = getFieldLabel(preview, draft.bindings.valueFieldKey);
  const recommendationCopy = buildRecommendationCopy(preview, draft.chartType, draft.bindings);
  const legendItems =
    draft.chartType === "donut" || draft.chartType === "racing-bar"
      ? derivedData.items.map((item) => item.displayLabel)
      : derivedData.series.map((item) => item.label);
  const previewDiagnostics = collectPreviewDiagnostics(preview, draft.chartType, draft.bindings, derivedData);
  const previewState = getPreviewStateCopy({
    chartType: draft.chartType,
    xLabel: xAxisLabel,
    valueLabel: valueAxisLabel,
    diagnostics: previewDiagnostics
  });
  const legendContextLabel =
    draft.chartType === "line" || draft.chartType === "bar"
      ? getFieldLabel(preview, draft.bindings.seriesFieldKey)
      : xAxisLabel;
  const canRenderExternalLegend = supportsExternalLegend(draft.chartType);
  const shouldRenderLegend = canRenderExternalLegend && draft.legend.show && previewState.state !== "empty" && legendItems.length > 0;
  const topNLabel = draft.chartType === "racing-bar" ? "순위 수" : "Top N 범위";
  const previewItemCount =
    draft.chartType === "line" ? derivedData.categories.length : derivedData.items.length || derivedData.categories.length;

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
    const nextPreview = previewQaDatasetMap[chartType][qaState] ?? preview;

    updateDraft((current) => ({
      ...current,
      chartType,
      bindings: getBindingsForChartType(nextPreview, chartType, current.bindings),
      data: {
        ...current.data,
        topN: getQaStateTopN(chartType, qaState)
      },
      legend: {
        ...current.legend,
        show: supportsExternalLegend(chartType)
      }
    }));
  }

  function handleQaStateChange(nextState: PreviewQaState) {
    const nextPreview = previewQaDatasetMap[draft.chartType][nextState] ?? preview;

    setQaState(nextState);
    updateDraft((current) => ({
      ...current,
      bindings: getBindingsForChartType(nextPreview, current.chartType, current.bindings),
      data: {
        ...current.data,
        topN: getQaStateTopN(current.chartType, nextState)
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
          subtitle={`${projectId} · 추천 초안, 데이터 연결, 상세 편집이 한 화면에서 이어지는 MAC의 실제 차트 작업 공간입니다.`}
          actions={
            <>
              <div className="mr-1 flex rounded-md border border-line-subtle bg-surface-2/76 p-1">
                {["추천 차트", "상세 편집", "데이터 수정"].map((item, index) => (
                  <span
                    key={item}
                    className={
                      index === 1
                        ? "rounded px-3 py-2 text-xs font-medium text-ink-1 shadow-inset bg-surface-1"
                        : "px-3 py-2 text-xs font-medium text-ink-3"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
              <StatusBadge label="비공개" tone="private" />
              <StatusBadge label={`표본 ${previewItemCount}개`} tone="neutral" />
              <StatusBadge label={chartDefinition.label} tone="live" />
              <StatusBadge label={hasUnsavedChanges ? "변경 있음" : "저장됨"} tone={hasUnsavedChanges ? "draft" : "saved"} withDot />
              <Button variant="tertiary" onClick={handleReset} disabled={!hasUnsavedChanges}>
                변경 취소
              </Button>
              <Button onClick={handleSave}>저장</Button>
              <Button variant="secondary">미리보기</Button>
              <Button variant="secondary">PNG/SVG</Button>
              <Button variant="tertiary">MP4</Button>
            </>
          }
        />
      }
      rail={
        <>
          <Card
            variant="canvas"
            className="workspace-shell"
            title="작업 흐름"
            description="왼쪽 rail은 설명 카드가 아니라 지금 어디까지 왔는지 바로 읽히는 짧은 작업 맥락으로 구성합니다."
          >
            <div className="space-y-3">
              <FlowStep index={1} title="차트 선택" description="라인, 막대, 도넛, racing bar를 바로 전환합니다." complete />
              <FlowStep index={2} title="데이터 연결" description="어떤 열을 기준값, 수치값, 범례로 읽을지 정합니다." active />
              <FlowStep index={3} title="세부 조정" description="텍스트, 라벨, 축, 범례, 밀도와 비율을 다듬습니다." />
              <FlowStep index={4} title="결과 확인" description="보고서와 발표 슬라이드에 넣을 톤인지 최종 점검합니다." />
            </div>
          </Card>

          <Card
            variant="subtle"
            className="workspace-shell"
            title="데이터 맥락"
            description="에디터 안에서도 업로드에서 넘어온 열 역할과 데이터 성격이 계속 보여야 합니다."
          >
            <div className="space-y-3">
              {preview.columns.map((column) => (
                <div key={column.key} className="rounded-[20px] border border-line-subtle bg-surface-1/94 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-1">{column.name}</p>
                    <span className="rounded-full border border-line-subtle bg-surface-2 px-3 py-1.5 text-[11px] tracking-[0.08em] text-ink-3">{column.type}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldRoleDescription(column)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card
            variant="default"
            className="workspace-shell"
            title="차트 유형"
            description="차트별로 inspector 언어와 결과물의 읽기 방식이 함께 바뀌도록 구조를 묶었습니다."
          >
            <div className="space-y-2">
              {chartCatalog.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChartChange(option.value)}
                  className={
                    option.value === draft.chartType
                      ? "w-full rounded-[22px] border border-line-accent bg-accent px-4 py-4 text-left text-ink-inverse shadow-soft"
                      : "w-full rounded-[22px] border border-line-subtle bg-surface-1/92 px-4 py-4 text-left transition hover:border-line-strong"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={option.value === draft.chartType ? "text-sm font-medium text-ink-inverse" : "text-sm font-medium text-ink-1"}>
                      {option.label}
                    </div>
                    <span
                      className={
                        option.value === draft.chartType
                          ? "rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-ink-inverse"
                          : "rounded-full border border-line-subtle bg-surface-2 px-3 py-1.5 text-[11px] tracking-[0.08em] text-ink-3"
                      }
                    >
                      {option.badge}
                    </span>
                  </div>
                  <p className={option.value === draft.chartType ? "mt-2 text-xs leading-5 text-ink-inverse/72" : "mt-2 text-xs leading-5 text-ink-3"}>
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <QaStatePanel chartType={draft.chartType} state={qaState} onChange={handleQaStateChange} datasetName={preview.fileName} />
        </>
      }
      canvas={
        <Card
          variant="ghost"
          padding="none"
          className="h-full"
        >
          <div className={`workspace-shell rounded-[26px] border border-line-strong/85 shadow-panel ${density.shell}`}>
            <div className={`flex flex-wrap items-start justify-between ${density.gap}`}>
              <div>
                <p className="text-caption uppercase tracking-[0.18em] text-ink-3">Presentation Canvas</p>
                <h3 className="mt-2 text-[1.72rem] font-semibold tracking-[-0.045em] text-ink-1">{draft.text.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-2">{recommendationCopy}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label={chartDefinition.label} tone="live" />
                <StatusBadge label={getChartToneText(draft.chartType)} tone="neutral" />
                <StatusBadge label={`${draft.layout.aspectRatio} 캔버스`} tone="neutral" />
                <StatusBadge label="내보내기 확장 준비" tone="neutral" />
              </div>
            </div>

            <div
              data-preview-tooltip-boundary
              className={`chart-paper sheen-border mt-5 rounded-[26px] border border-line-strong shadow-[0_34px_110px_rgba(16,20,24,0.18)] ${density.canvas}`}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle/70 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-3">Canvas mode</p>
                  <p className="mt-1 text-sm font-medium text-ink-1">발표자료에 바로 옮길 수 있는 결과물 프리뷰</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={theme.label} tone="neutral" />
                  <StatusBadge label={`QA ${previewQaStateLabelMap[qaState]}`} tone="neutral" />
                </div>
              </div>

              <div className={`flex flex-wrap items-start justify-between ${density.gap}`}>
                <div>
                  <p className="text-caption uppercase tracking-[0.16em] text-ink-3">Chart Output</p>
                  <h4 className="mt-2 text-[1.65rem] font-semibold tracking-[-0.045em] text-ink-1">{draft.text.title}</h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">{draft.text.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge label={getLabelModeBadge(draft.labels.mode)} tone={draft.labels.mode === "hidden" ? "neutral" : "live"} />
                  <StatusBadge label={canRenderExternalLegend ? (shouldRenderLegend ? `범례 ${draft.legend.position}` : "범례 숨김") : "범례 내장"} tone="neutral" />
                  <StatusBadge label={draft.axes.showGrid ? "그리드 표시" : "그리드 최소화"} tone="neutral" />
                  <StatusBadge
                    label={previewState.badge}
                    tone={previewState.state === "balanced" ? "saved" : previewState.state === "empty" ? "draft" : "neutral"}
                  />
                </div>
              </div>

              {shouldRenderLegend && draft.legend.position === "top" ? (
                <div className="mt-5">
                  <PreviewLegend
                    items={legendItems}
                    colors={theme.colors}
                    position={draft.legend.position}
                    density={draft.layout.density}
                    contextLabel={legendContextLabel}
                  />
                </div>
              ) : null}

              <div
                className={
                  shouldRenderLegend && draft.legend.position === "right"
                    ? "mt-6 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_220px]"
                    : "mt-6"
                }
              >
                <div className="min-w-0">
                  {previewState.state === "sparse" || previewState.state === "extreme" ? (
                    <div className="mb-4">
                      <PreviewStateNotice copy={previewState} chartType={draft.chartType} compact />
                    </div>
                  ) : null}

                  <div style={{ aspectRatio }}>
                    {previewState.state === "empty" ? (
                      <PreviewStateNotice copy={previewState} chartType={draft.chartType} />
                    ) : (
                      <PreviewChart
                        chartType={draft.chartType}
                        categories={derivedData.categories}
                        categoryLabels={derivedData.categoryLabels}
                        series={derivedData.series}
                        items={derivedData.items}
                        colors={theme.colors}
                        totalValue={derivedData.totalValue}
                        labels={draft.labels}
                        axes={draft.axes}
                        chartOptions={draft.chartOptions}
                        layoutDensity={draft.layout.density}
                        xAxisLabel={xAxisLabel}
                        valueAxisLabel={valueAxisLabel}
                      />
                    )}
                  </div>
                </div>

                {shouldRenderLegend && draft.legend.position === "right" ? (
                  <PreviewLegend
                    items={legendItems}
                    colors={theme.colors}
                    position={draft.legend.position}
                    density={draft.layout.density}
                    contextLabel={legendContextLabel}
                  />
                ) : null}
              </div>

              {shouldRenderLegend && draft.legend.position === "bottom" ? (
                <div className="mt-5">
                  <PreviewLegend
                    items={legendItems}
                    colors={theme.colors}
                    position={draft.legend.position}
                    density={draft.layout.density}
                    contextLabel={legendContextLabel}
                  />
                </div>
              ) : null}

              <div className="mt-5 rounded-[22px] border border-line-subtle bg-surface-2/72 px-4 py-4">
                <p className="text-sm leading-6 text-ink-2">{draft.text.caption}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">데이터 연결</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">
                    {`${getFieldLabel(preview, draft.bindings.xFieldKey)} -> ${getFieldLabel(preview, draft.bindings.valueFieldKey)}`}
                  </p>
                  <p className="mt-1 text-xs text-ink-3">
                    범례 {getFieldLabel(preview, draft.bindings.seriesFieldKey)} · 라벨 {getFieldLabel(preview, draft.bindings.labelFieldKey)}
                  </p>
                </div>
                <div className="rounded-[22px] border border-line-subtle bg-surface-2/72 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-3">추천 문구 기준</p>
                  <p className="mt-2 text-sm font-medium text-ink-1">{recommendationCopy}</p>
                </div>
                <div className="rounded-[22px] border border-line-subtle bg-surface-2/72 px-4 py-3">
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
                { label: "보이는 항목", value: `${previewItemCount}개`, hint: "선택한 필드와 정렬 기준 반영" },
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
          <InspectorSection title="데이터 연결" description="무슨 데이터를 어떤 기준으로 보여줄지 직접 고르는 핵심 단계입니다." badge={chartDefinition.label}>
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
                label={topNLabel}
                value={draft.data.topN}
                min={3}
                max={draft.chartType === "racing-bar" ? 8 : 6}
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

            <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
              {draft.chartType === "bar"
                ? "막대 차트에서는 정렬과 Top N, 막대 두께가 함께 읽기 속도를 결정합니다."
                : draft.chartType === "donut"
                  ? "도넛 차트에서는 항목 기준과 값 기준이 곧 조각 구조가 됩니다."
                  : draft.chartType === "racing-bar"
                    ? "막대 경주는 순위 수와 재생 속도 감각이 곧 결과물 인상을 만듭니다."
                    : "선 차트에서는 시간 축과 값 축의 조합이 가장 중요한 구조를 만듭니다."}
            </div>
          </InspectorSection>
          ) : null}

          {activeInspectorTab === "labels" ? (
          <InspectorSection title="라벨 설정" description="차트 안에 직접 새겨지는 이름과 값을 조절합니다. 라벨 필드를 바꾸면 본문 텍스트도 즉시 달라집니다." badge={getLabelModeBadge(draft.labels.mode)}>
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

            <ControlGroup title="라벨 톤" description="라벨 크기와 굵기를 바꿔 결과물의 정보 밀도를 조절합니다.">
            <SegmentedField
              label="라벨 크기"
              value={draft.labels.size}
              options={[
                { value: "sm", label: "작게" },
                { value: "md", label: "기본" },
                { value: "lg", label: "크게" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    size: value
                  }
                }))
              }
            />

            <SegmentedField
              label="라벨 굵기"
              value={draft.labels.weight}
              options={[
                { value: "regular", label: "기본" },
                { value: "medium", label: "중간" },
                { value: "bold", label: "강하게" }
              ]}
              onChange={(value) =>
                updateDraft((current) => ({
                  ...current,
                  labels: {
                    ...current.labels,
                    weight: value
                  }
                }))
              }
            />
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

            {draft.chartType === "line" ? (
              <ControlGroup title="선 차트 옵션" description="포인트와 선 굵기를 조절해 발표용 톤과 설명형 톤을 맞춥니다.">
                <ToggleField
                  label="포인트 표시"
                  description="핵심 포인트를 점으로 강조합니다."
                  checked={draft.chartOptions.line.showPoints}
                  onChange={(checked) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        line: {
                          ...current.chartOptions.line,
                          showPoints: checked
                        }
                      }
                    }))
                  }
                />
                <SegmentedField
                  label="선 굵기"
                  value={draft.chartOptions.line.strokeWeight}
                  options={[
                    { value: "thin", label: "얇게" },
                    { value: "balanced", label: "기본" },
                    { value: "bold", label: "강하게" }
                  ]}
                  onChange={(value) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        line: {
                          ...current.chartOptions.line,
                          strokeWeight: value
                        }
                      }
                    }))
                  }
                />
              </ControlGroup>
            ) : null}

            {draft.chartType === "bar" ? (
              <ControlGroup title="막대 차트 옵션" description="막대 두께로 비교 밀도와 무게 중심을 조절합니다.">
                <SegmentedField
                  label="막대 두께"
                  value={draft.chartOptions.bar.thickness}
                  options={[
                    { value: "slim", label: "가늘게" },
                    { value: "balanced", label: "기본" },
                    { value: "bold", label: "두껍게" }
                  ]}
                  onChange={(value) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        bar: {
                          ...current.chartOptions.bar,
                          thickness: value
                        }
                      }
                    }))
                  }
                />
              </ControlGroup>
            ) : null}

            {draft.chartType === "donut" ? (
              <ControlGroup title="도넛 차트 옵션" description="조각 간격과 중앙 공간으로 비중 차트의 분위기를 조절합니다.">
                <SegmentedField
                  label="조각 간격"
                  value={draft.chartOptions.donut.segmentGap}
                  options={[
                    { value: "tight", label: "좁게" },
                    { value: "balanced", label: "기본" },
                    { value: "wide", label: "넓게" }
                  ]}
                  onChange={(value) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        donut: {
                          ...current.chartOptions.donut,
                          segmentGap: value
                        }
                      }
                    }))
                  }
                />
                <SegmentedField
                  label="중앙 공간"
                  value={draft.chartOptions.donut.centerSpace}
                  options={[
                    { value: "tight", label: "좁게" },
                    { value: "balanced", label: "기본" },
                    { value: "wide", label: "넓게" }
                  ]}
                  onChange={(value) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        donut: {
                          ...current.chartOptions.donut,
                          centerSpace: value
                        }
                      }
                    }))
                  }
                />
              </ControlGroup>
            ) : null}

            {draft.chartType === "racing-bar" ? (
              <ControlGroup title="막대 경주 옵션" description="향후 MP4/GIF export로 이어질 재생 감각을 미리 조절합니다.">
                <SegmentedField
                  label="재생 속도"
                  value={draft.chartOptions.racingBar.playSpeed}
                  options={[
                    { value: "slow", label: "느리게" },
                    { value: "normal", label: "기본" },
                    { value: "fast", label: "빠르게" }
                  ]}
                  onChange={(value) =>
                    updateDraft((current) => ({
                      ...current,
                      chartOptions: {
                        ...current.chartOptions,
                        racingBar: {
                          ...current.chartOptions.racingBar,
                          playSpeed: value
                        }
                      }
                    }))
                  }
                />
              </ControlGroup>
            ) : null}
          </InspectorSection>
          </>
          ) : null}

          {activeInspectorTab === "axes" ? (
          <InspectorSection title="축과 그리드" description="축 제목, 눈금, 보조 격자가 데이터보다 앞서지 않도록 읽기 위계를 정리합니다." badge="읽기 기준">
            {(draft.chartType === "line" || draft.chartType === "bar") ? (
              <>
                <ToggleField
                  label="축 표시"
                  description="값 눈금과 축 라벨을 표시합니다."
                  checked={draft.axes.showAxis}
                  onChange={(checked) =>
                    updateDraft((current) => ({
                      ...current,
                      axes: {
                        ...current.axes,
                        showAxis: checked
                      }
                    }))
                  }
                />
                <ToggleField
                  label="그리드 표시"
                  description="보조선과 기준선을 유지해 값 비교를 더 쉽게 만듭니다."
                  checked={draft.axes.showGrid}
                  onChange={(checked) =>
                    updateDraft((current) => ({
                      ...current,
                      axes: {
                        ...current.axes,
                        showGrid: checked
                      }
                    }))
                  }
                />
              </>
            ) : (
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                {draft.chartType === "donut"
                  ? "도넛 차트는 축보다 조각, 범례, 라벨 밀도가 읽기 품질을 더 크게 좌우합니다."
                  : "막대 경주는 축보다 순위, 바 길이, 속도 감각이 결과물 인상을 결정합니다."}
              </div>
            )}
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">가로축 / 항목 기준</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldLabel(preview, draft.bindings.xFieldKey)}</p>
              <p className="mt-2 text-xs leading-5 text-ink-3">
                차트 안에서 항목을 나누는 기준입니다. 긴 이름은 축에서 밀도에 맞게 줄여 보여주고, 전체 이름은 툴팁으로 다시 확인할 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4">
              <p className="text-sm font-medium text-ink-1">값 축 / 크기 기준</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{getFieldLabel(preview, draft.bindings.valueFieldKey)}</p>
              <p className="mt-2 text-xs leading-5 text-ink-3">
                막대 길이, 선 높이, 도넛 조각 크기를 만드는 숫자입니다. 주요 눈금과 보조 격자도 이 값을 기준으로 같은 톤으로 정리됩니다.
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
          <InspectorSection title="범례" description="차트 본문보다 한 단계 낮은 정보 레이어로 두되, 긴 항목명과 많은 항목도 정돈되게 관리합니다.">
            {canRenderExternalLegend ? (
              <>
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
              </>
            ) : (
              <div className="rounded-lg border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                {draft.chartType === "donut"
                  ? "도넛 차트는 조각 목록이 이미 범례 역할을 함께 맡고 있어, 별도 범례를 더하지 않고 본문 밀도를 우선 정리합니다."
                  : "막대 경주는 순위, 이름, 값이 한 줄 안에서 바로 대응되므로, 별도 범례보다 본문 라벨을 또렷하게 유지하는 쪽이 읽기 좋습니다."}
              </div>
            )}
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

            {draft.chartType === "racing-bar" ? (
              <div className="rounded-xl border border-line-subtle bg-surface-1 px-4 py-4 text-sm leading-6 text-ink-2">
                현재는 정적인 프레임이지만, 이 레이아웃과 속도 설정은 향후 MP4/GIF export UI로 자연스럽게 확장될 수 있도록
                구조를 유지합니다.
              </div>
            ) : null}
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
