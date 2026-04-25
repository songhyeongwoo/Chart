export const canonicalChartTypes = ["bar", "line", "donut", "race"] as const;
export type CanonicalChartType = (typeof canonicalChartTypes)[number];

export type CanonicalAllChartType =
  | CanonicalChartType
  | "area"
  | "pie"
  | "scatter"
  | "heatmap"
  | "table"
  | "map"
  | "metric"
  | "timeline";

export type CanonicalColorMode = "single" | "category" | "sequential" | "highlight" | "custom";
export type CanonicalEditorTab = "recommend" | "edit" | "data";

export type FutureChartFeatureType = "bar" | "line" | "donut" | "racing-bar";

export function isCanonicalChartType(value: unknown): value is CanonicalChartType {
  return typeof value === "string" && canonicalChartTypes.includes(value as CanonicalChartType);
}

export function toFutureChartFeatureType(chart: CanonicalChartType): FutureChartFeatureType {
  return chart === "race" ? "racing-bar" : chart;
}

export function toCanonicalChartType(chart: FutureChartFeatureType | string | null | undefined): CanonicalChartType {
  if (chart === "racing-bar" || chart === "race") {
    return "race";
  }

  if (isCanonicalChartType(chart)) {
    return chart;
  }

  return "bar";
}

export function toCanonicalEditorTab(tab: string | null | undefined): CanonicalEditorTab {
  if (tab === "recommend" || tab === "data" || tab === "edit") {
    return tab;
  }

  return "edit";
}
