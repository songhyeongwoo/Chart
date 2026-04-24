import type { DatasetPreview, FieldType } from "@mac/domain";

export type EditorChartType = "line" | "bar" | "donut" | "racing-bar";
export type EditorSortMode = "original" | "value-desc" | "name";

export interface FieldMappingBindings {
  xFieldKey: string | null;
  valueFieldKey: string | null;
  seriesFieldKey: string | null;
  labelFieldKey: string | null;
}

export interface ChartRecommendation {
  chartType: EditorChartType;
  label: string;
  tone: string;
  fit: string;
  bindings: FieldMappingBindings;
}

export interface DerivedCartesianSeries {
  label: string;
  values: number[];
}

export interface DerivedCategoricalItem {
  label: string;
  displayLabel: string;
  value: number;
}

export interface DerivedChartData {
  categories: string[];
  categoryLabels: string[];
  series: DerivedCartesianSeries[];
  items: DerivedCategoricalItem[];
  legendItems: string[];
  totalValue: number;
}

const categoryPreference = {
  time: ["월", "일", "날짜", "date", "time", "기간"],
  segment: ["채널", "구분", "카테고리", "분류", "region", "segment", "group"],
  label: ["이름", "항목", "label", "title"]
};

const numericPreference = {
  primary: ["가입", "sign", "count", "수", "volume", "value"],
  secondary: ["매출", "revenue", "amount", "sales"]
};

function normalizeName(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function matchesKeyword(name: string, keywords: string[]) {
  const normalized = normalizeName(name);
  return keywords.some((keyword) => normalized.includes(normalizeName(keyword)));
}

function isCategoryField(type: FieldType) {
  return type === "string" || type === "date" || type === "boolean";
}

function isNumericField(type: FieldType) {
  return type === "number";
}

function getCategoryFields(preview: DatasetPreview) {
  return preview.columns.filter((column) => isCategoryField(column.type));
}

function getNumericFields(preview: DatasetPreview) {
  return preview.columns.filter((column) => isNumericField(column.type));
}

function choosePreferredField(
  fields: DatasetPreview["columns"],
  groups: string[][],
  excludeKeys: string[] = []
) {
  const filtered = fields.filter((field) => !excludeKeys.includes(field.key));

  for (const keywords of groups) {
    const match = filtered.find((field) => matchesKeyword(field.name, keywords));
    if (match) {
      return match;
    }
  }

  return filtered[0];
}

export function getFieldLabel(preview: DatasetPreview | null, fieldKey: string | null | undefined) {
  if (!preview || !fieldKey) {
    return "없음";
  }

  return preview.columns.find((column) => column.key === fieldKey)?.name ?? fieldKey;
}

export function getFieldRoleDescription(column: DatasetPreview["columns"][number]) {
  if (column.type === "number") {
    if (matchesKeyword(column.name, numericPreference.secondary)) {
      return "값 후보 · 금액이나 규모를 보여주는 값으로 적합";
    }

    return "값 후보 · 막대 높이, 선 변화, 조각 크기로 바로 쓰기 좋음";
  }

  if (matchesKeyword(column.name, categoryPreference.time)) {
    return "흐름 기준 후보 · 시간 순서나 변화 흐름을 보여줄 때 적합";
  }

  if (matchesKeyword(column.name, categoryPreference.segment)) {
    return "구분 기준 후보 · 항목을 나눠 비교하거나 범례로 쓰기 좋음";
  }

  return "라벨 후보 · 항목 이름이나 설명을 보여줄 때 쓰기 좋음";
}

export function getRecommendedBindings(preview: DatasetPreview, chartType: EditorChartType): FieldMappingBindings {
  const categoryFields = getCategoryFields(preview);
  const numericFields = getNumericFields(preview);

  const timeField = choosePreferredField(categoryFields, [categoryPreference.time]);
  const segmentField = choosePreferredField(categoryFields, [categoryPreference.segment], timeField ? [timeField.key] : []);
  const labelField = choosePreferredField(categoryFields, [categoryPreference.label], []);
  const primaryNumeric =
    choosePreferredField(numericFields, [numericPreference.primary, numericPreference.secondary]) ?? numericFields[0];

  if (chartType === "line") {
    const xField = timeField ?? categoryFields[0] ?? null;
    const seriesField = segmentField ?? null;

    return {
      xFieldKey: xField?.key ?? null,
      valueFieldKey: primaryNumeric?.key ?? null,
      seriesFieldKey: seriesField?.key ?? null,
      labelFieldKey: xField?.key ?? labelField?.key ?? null
    };
  }

  if (chartType === "donut") {
    const xField = segmentField ?? categoryFields[0] ?? null;

    return {
      xFieldKey: xField?.key ?? null,
      valueFieldKey: primaryNumeric?.key ?? null,
      seriesFieldKey: null,
      labelFieldKey: xField?.key ?? labelField?.key ?? null
    };
  }

  const xField = segmentField ?? categoryFields[0] ?? null;

  return {
    xFieldKey: xField?.key ?? null,
    valueFieldKey: primaryNumeric?.key ?? null,
    seriesFieldKey: chartType === "bar" ? timeField?.key ?? null : null,
    labelFieldKey: xField?.key ?? labelField?.key ?? null
  };
}

export function getBindingsForChartType(
  preview: DatasetPreview,
  chartType: EditorChartType,
  current?: FieldMappingBindings
) {
  const recommended = getRecommendedBindings(preview, chartType);
  const columnsByKey = new Map(preview.columns.map((column) => [column.key, column]));

  const xField =
    current?.xFieldKey && columnsByKey.get(current.xFieldKey) && isCategoryField(columnsByKey.get(current.xFieldKey)!.type)
      ? current.xFieldKey
      : recommended.xFieldKey;

  const valueField =
    current?.valueFieldKey && columnsByKey.get(current.valueFieldKey) && isNumericField(columnsByKey.get(current.valueFieldKey)!.type)
      ? current.valueFieldKey
      : recommended.valueFieldKey;

  const supportsSeries = chartType === "line" || chartType === "bar";
  const seriesField =
    supportsSeries &&
    current?.seriesFieldKey &&
    columnsByKey.get(current.seriesFieldKey) &&
    isCategoryField(columnsByKey.get(current.seriesFieldKey)!.type) &&
    current.seriesFieldKey !== xField
      ? current.seriesFieldKey
      : supportsSeries
        ? recommended.seriesFieldKey
        : null;

  const labelField =
    current?.labelFieldKey && columnsByKey.get(current.labelFieldKey)
      ? current.labelFieldKey
      : recommended.labelFieldKey;

  return {
    xFieldKey: xField,
    valueFieldKey: valueField,
    seriesFieldKey: seriesField,
    labelFieldKey: labelField
  };
}

export function buildRecommendationCopy(
  preview: DatasetPreview,
  chartType: EditorChartType,
  bindings: FieldMappingBindings
) {
  const xLabel = getFieldLabel(preview, bindings.xFieldKey);
  const valueLabel = getFieldLabel(preview, bindings.valueFieldKey);
  const seriesLabel = bindings.seriesFieldKey ? getFieldLabel(preview, bindings.seriesFieldKey) : null;

  if (chartType === "line") {
    return seriesLabel
      ? `${xLabel} 흐름에 따라 ${valueLabel} 변화를 보여주는 선 차트입니다. ${seriesLabel}별로 나누어 비교하기 좋습니다.`
      : `${xLabel} 흐름에 따라 ${valueLabel} 변화를 보여주는 선 차트입니다.`;
  }

  if (chartType === "bar") {
    return seriesLabel
      ? `${xLabel}별 ${valueLabel}를 비교하는 막대 차트입니다. ${seriesLabel} 기준으로 구분해 읽기 좋습니다.`
      : `${xLabel}별 ${valueLabel}를 비교하는 막대 차트입니다.`;
  }

  if (chartType === "donut") {
    return `${xLabel}별 ${valueLabel} 비중을 한눈에 보는 도넛 차트입니다. 범례와 조각 크기로 구성을 빠르게 읽을 수 있습니다.`;
  }

  return `${xLabel} 순위를 ${valueLabel} 기준으로 보여주는 막대 경주 차트입니다. 값이 큰 항목부터 흐름을 확인하기 좋습니다.`;
}

export function getChartRecommendations(preview: DatasetPreview): ChartRecommendation[] {
  return [
    {
      chartType: "line",
      label: "선 차트",
      tone: "추천",
      fit: buildRecommendationCopy(preview, "line", getRecommendedBindings(preview, "line")),
      bindings: getRecommendedBindings(preview, "line")
    },
    {
      chartType: "bar",
      label: "막대 차트",
      tone: "대안",
      fit: buildRecommendationCopy(preview, "bar", getRecommendedBindings(preview, "bar")),
      bindings: getRecommendedBindings(preview, "bar")
    },
    {
      chartType: "donut",
      label: "도넛 차트",
      tone: "비중형",
      fit: buildRecommendationCopy(preview, "donut", getRecommendedBindings(preview, "donut")),
      bindings: getRecommendedBindings(preview, "donut")
    },
    {
      chartType: "racing-bar",
      label: "막대 경주",
      tone: "확장",
      fit: buildRecommendationCopy(preview, "racing-bar", getRecommendedBindings(preview, "racing-bar")),
      bindings: getRecommendedBindings(preview, "racing-bar")
    }
  ];
}

function getNumericValue(value: string | number | boolean | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  return 0;
}

function getLabelValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) {
    return "비어 있음";
  }

  return String(value);
}

function getDisplayLabelValue(row: DatasetPreview["sampleRows"][number], labelFieldKey: string | null, fallbackFieldKey: string) {
  return getLabelValue(row[labelFieldKey ?? fallbackFieldKey]);
}

function sortCategories<T extends { label: string; value: number }>(items: T[], sortMode: EditorSortMode) {
  const copy = [...items];

  if (sortMode === "value-desc") {
    return copy.sort((a, b) => b.value - a.value);
  }

  if (sortMode === "name") {
    return copy.sort((a, b) => a.label.localeCompare(b.label, "ko"));
  }

  return copy;
}

export function deriveChartData(
  preview: DatasetPreview,
  chartType: EditorChartType,
  bindings: FieldMappingBindings,
  options: { sortMode: EditorSortMode; topN: number }
): DerivedChartData {
  const rows = preview.sampleRows;
  const xFieldKey = bindings.xFieldKey ?? preview.columns[0]?.key ?? null;
  const valueFieldKey = bindings.valueFieldKey ?? getNumericFields(preview)[0]?.key ?? null;
  const seriesFieldKey = bindings.seriesFieldKey;
  const labelFieldKey =
    bindings.labelFieldKey && preview.columns.some((column) => column.key === bindings.labelFieldKey)
      ? bindings.labelFieldKey
      : xFieldKey;

  if (!xFieldKey || !valueFieldKey) {
    return {
      categories: [],
      categoryLabels: [],
      series: [],
      items: [],
      legendItems: [],
      totalValue: 0
    };
  }

  if (chartType === "donut" || chartType === "racing-bar") {
    const grouped = new Map<string, number>();
    const displayLabels = new Map<string, string>();

    rows.forEach((row) => {
      const label = getLabelValue(row[xFieldKey]);
      const displayLabel = getDisplayLabelValue(row, labelFieldKey, xFieldKey);
      const value = getNumericValue(row[valueFieldKey]);
      grouped.set(label, (grouped.get(label) ?? 0) + value);
      if (!displayLabels.has(label)) {
        displayLabels.set(label, displayLabel);
      }
    });

    const items = sortCategories(
      Array.from(grouped.entries()).map(([label, value]) => ({
        label,
        displayLabel: displayLabels.get(label) ?? label,
        value
      })),
      options.sortMode
    ).slice(0, Math.max(1, options.topN));

    return {
      categories: items.map((item) => item.label),
      categoryLabels: items.map((item) => item.displayLabel),
      series: [],
      items,
      legendItems: items.map((item) => item.label),
      totalValue: items.reduce((sum, item) => sum + item.value, 0)
    };
  }

  const categoryOrder: string[] = [];
  const categorySeen = new Set<string>();
  const categoryLabels = new Map<string, string>();

  rows.forEach((row) => {
    const category = getLabelValue(row[xFieldKey]);
    if (!categorySeen.has(category)) {
      categorySeen.add(category);
      categoryOrder.push(category);
      categoryLabels.set(category, getDisplayLabelValue(row, labelFieldKey, xFieldKey));
    }
  });

  const hasSeries =
    Boolean(seriesFieldKey) && seriesFieldKey !== xFieldKey && preview.columns.some((column) => column.key === seriesFieldKey);

  const seriesKeys = hasSeries
    ? Array.from(
        new Set(rows.map((row) => getLabelValue(row[seriesFieldKey as string])))
      )
    : [getFieldLabel(preview, valueFieldKey)];

  const matrix = new Map<string, Map<string, number>>();

  seriesKeys.forEach((seriesKey) => {
    matrix.set(seriesKey, new Map(categoryOrder.map((category) => [category, 0])));
  });

  rows.forEach((row) => {
    const category = getLabelValue(row[xFieldKey]);
    const seriesKey = hasSeries ? getLabelValue(row[seriesFieldKey as string]) : getFieldLabel(preview, valueFieldKey);
    const value = getNumericValue(row[valueFieldKey]);
    const categoryMap = matrix.get(seriesKey) ?? new Map<string, number>();
    categoryMap.set(category, (categoryMap.get(category) ?? 0) + value);
    matrix.set(seriesKey, categoryMap);
  });

  const categoryTotals = categoryOrder.map((category) => ({
    label: category,
    value: seriesKeys.reduce((sum, seriesKey) => sum + (matrix.get(seriesKey)?.get(category) ?? 0), 0)
  }));

  const sortedCategories = sortCategories(categoryTotals, options.sortMode).map((item) => item.label);
  const visibleCategories =
    chartType === "line"
      ? sortedCategories
      : sortedCategories.slice(0, Math.max(1, Math.min(options.topN, sortedCategories.length)));

  const series = seriesKeys.map((seriesKey) => ({
    label: seriesKey,
    values: visibleCategories.map((category) => matrix.get(seriesKey)?.get(category) ?? 0)
  }));

  const totalValue = series.reduce(
    (sum, current) => sum + current.values.reduce((seriesSum, value) => seriesSum + value, 0),
    0
  );

  return {
    categories: visibleCategories,
    categoryLabels: visibleCategories.map((category) => categoryLabels.get(category) ?? category),
    series,
    items: [],
    legendItems: hasSeries ? seriesKeys : [getFieldLabel(preview, valueFieldKey)],
    totalValue
  };
}
