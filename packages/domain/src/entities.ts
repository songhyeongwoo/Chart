export type AuthMode = "email-magic-link";
export type SaveMode = "manual-only";
export type PrivacyMode = "private-only";
export type EditorSupport = "desktop-first";
export type VisualizationExposure = "single-primary";
export type ChartType = "bar" | "line" | "area" | "scatter" | "donut" | "table";
export type FieldType = "string" | "number" | "date" | "boolean" | "unknown";
export type ProjectStatus = "draft" | "active" | "archived";
export type SaveState = "saved" | "unsaved" | "draft";

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Workspace {
  id: string;
  ownerUserId: string;
  name: string;
  slug: string;
  type: "personal";
  createdAt: string;
}

export interface DatasetField {
  id: string;
  datasetId: string;
  name: string;
  key: string;
  inferredType: FieldType;
  nullable: boolean;
  position: number;
}

export interface Dataset {
  id: string;
  projectId: string;
  sourceFileName: string;
  sourceFileType: "csv" | "xlsx";
  sheetName?: string;
  rowCount: number;
  columnCount: number;
  schemaVersion: number;
  createdAt: string;
}

export interface DatasetPreview {
  datasetId: string;
  fileName: string;
  sheetName?: string;
  columns: Array<{
    key: string;
    name: string;
    type: FieldType;
  }>;
  sampleRows: Array<Record<string, string | number | boolean | null>>;
}

export interface VisualizationConfig {
  chartType: ChartType;
  bindings: {
    x?: string;
    y?: string;
    series?: string;
    label?: string;
    color?: string;
  };
  style: Record<string, unknown>;
  axes?: Record<string, unknown>;
  legend?: Record<string, unknown>;
  labels?: Record<string, unknown>;
  layout?: Record<string, unknown>;
}

export interface Visualization {
  id: string;
  projectId: string;
  datasetId?: string;
  chartType: ChartType;
  title: string;
  configVersion: number;
  savedConfig: VisualizationConfig;
  updatedAt: string;
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  status: ProjectStatus;
  latestVisualizationId?: string;
  latestDatasetId?: string;
  lastOpenedAt?: string;
  updatedAt: string;
  createdAt: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  chartType: ChartType;
  datasetName: string;
  updatedAt: string;
  saveState: SaveState;
}

export interface SavedVersion {
  id: string;
  visualizationId: string;
  versionNumber: number;
  savedConfig: VisualizationConfig;
  createdAt: string;
  createdBy: string;
}

export interface UploadJob {
  id: string;
  projectId: string;
  status: "idle" | "processing" | "completed" | "failed";
  errorCode?: string;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface EditorSessionPayload {
  project: {
    id: string;
    name: string;
    updatedAt: string;
  };
  dataset: DatasetPreview | null;
  visualization: {
    id: string;
    chartType: ChartType;
    title: string;
    config: VisualizationConfig;
    updatedAt: string;
  } | null;
}

