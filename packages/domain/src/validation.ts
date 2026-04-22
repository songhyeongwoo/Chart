import type { ChartType, DatasetPreview, ProjectSummary, VisualizationConfig } from "./entities";
import { MVP_CHART_TYPES } from "./product-defaults";

export function isChartType(value: string): value is ChartType {
  return MVP_CHART_TYPES.includes(value as ChartType);
}

export function isVisualizationConfig(value: unknown): value is VisualizationConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<VisualizationConfig>;
  return Boolean(candidate.chartType && isChartType(candidate.chartType) && candidate.bindings && candidate.style);
}

export function hasDatasetColumns(preview: DatasetPreview | null): preview is DatasetPreview {
  return Boolean(preview && preview.columns.length > 0);
}

export function sortProjectsByUpdatedAt(projects: ProjectSummary[]) {
  return [...projects].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

