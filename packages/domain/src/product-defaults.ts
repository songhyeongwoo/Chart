import type {
  AuthMode,
  ChartType,
  EditorSupport,
  PrivacyMode,
  SaveMode,
  VisualizationExposure
} from "./entities";

export const PRODUCT_NAME = "MAC";

export const AUTH_MODE: AuthMode = "email-magic-link";
export const MVP_CHART_TYPES: ChartType[] = [
  "bar",
  "line",
  "area",
  "scatter",
  "donut",
  "table"
];
export const SAVE_MODEL: SaveMode = "manual-only";
export const VISUALIZATION_EXPOSURE: VisualizationExposure = "single-primary";
export const PRIVACY_MODE: PrivacyMode = "private-only";
export const SHARING_IN_MVP = false;
export const PUBLISH_IN_MVP = false;
export const EDITOR_SUPPORT: EditorSupport = "desktop-first";

export const PRODUCT_DEFAULTS = {
  authMode: AUTH_MODE,
  chartTypes: MVP_CHART_TYPES,
  saveModel: SAVE_MODEL,
  visualizationExposure: VISUALIZATION_EXPOSURE,
  privacyMode: PRIVACY_MODE,
  sharingInMvp: SHARING_IN_MVP,
  publishInMvp: PUBLISH_IN_MVP,
  editorSupport: EDITOR_SUPPORT
} as const;

