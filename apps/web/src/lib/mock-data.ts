import { createPlaceholderVisualizationConfig } from "@mac/charts";
import type { EditorSessionPayload, ProjectSummary } from "@mac/domain";
import { sortProjectsByUpdatedAt } from "@mac/domain";
import { mockDatasetPreview } from "@mac/data";

export const mockProjects: ProjectSummary[] = sortProjectsByUpdatedAt([
  {
    id: "proj_q1-growth",
    name: "1분기 성장 흐름",
    chartType: "line",
    datasetName: "growth-q1.xlsx",
    updatedAt: "2026-04-23T09:15:00.000Z",
    saveState: "saved"
  },
  {
    id: "proj_channel-mix",
    name: "유입 채널 비중",
    chartType: "donut",
    datasetName: "channel_mix.csv",
    updatedAt: "2026-04-22T16:40:00.000Z",
    saveState: "unsaved"
  },
  {
    id: "proj_pipeline-health",
    name: "캠페인 성과 비교",
    chartType: "bar",
    datasetName: "pipeline_health.xlsx",
    updatedAt: "2026-04-21T11:05:00.000Z",
    saveState: "draft"
  }
]);

export const mockEditorSession: EditorSessionPayload = {
  project: {
    id: "proj_q1-growth",
    name: "1분기 성장 흐름",
    updatedAt: "2026-04-23T09:15:00.000Z"
  },
  dataset: mockDatasetPreview,
  visualization: {
    id: "viz_q1-growth",
    chartType: "line",
    title: "월별 가입자 증가 흐름",
    config: createPlaceholderVisualizationConfig("line"),
    updatedAt: "2026-04-23T09:15:00.000Z"
  }
};
