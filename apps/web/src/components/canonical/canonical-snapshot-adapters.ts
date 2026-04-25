import type { CanonicalFieldMapping } from "./canonical-field-adapters";
import type { CanonicalDatasetSnapshot } from "./useCanonicalDatasetState";
import type { CanonicalEditorDraftSnapshot } from "./useCanonicalEditorDraftState";
import type { CanonicalEditorViewSnapshot } from "./useCanonicalEditorViewState";
import type { CanonicalChartControlsSnapshot } from "./useCanonicalChartControlsState";

export type CanonicalEditorSnapshot = {
  version: 1;
  projectId: string;
  draft: CanonicalEditorDraftSnapshot;
  view: CanonicalEditorViewSnapshot;
  fieldMapping: CanonicalFieldMapping;
  chartControls: CanonicalChartControlsSnapshot;
  dataset: CanonicalDatasetSnapshot;
};

export type StoredCanonicalEditorSnapshot = {
  savedAt: string;
  snapshot: CanonicalEditorSnapshot;
};

export function getCanonicalSnapshotStorageKey(projectId: string) {
  return `canonical-editor:${projectId}`;
}

export function toStorableCanonicalEditorSnapshot(snapshot: CanonicalEditorSnapshot): CanonicalEditorSnapshot {
  const parsedDataset = snapshot.dataset.parsedDataset;

  if (!parsedDataset) {
    return snapshot;
  }

  return {
    ...snapshot,
    dataset: {
      ...snapshot.dataset,
      parsedDataset: {
        ...parsedDataset,
        rows: parsedDataset.rows.slice(0, 100),
      },
    },
  };
}

export function parseStoredCanonicalEditorSnapshot(rawValue: string | null): StoredCanonicalEditorSnapshot | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredCanonicalEditorSnapshot;
    if (parsed?.snapshot?.version !== 1 || typeof parsed.savedAt !== "string") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function serializeCanonicalSnapshot(snapshot: CanonicalEditorSnapshot) {
  return JSON.stringify(toStorableCanonicalEditorSnapshot(snapshot));
}

export function formatCanonicalSavedLabel(savedAt: string | null, hasUnsavedChanges: boolean) {
  if (hasUnsavedChanges) {
    return "변경 있음";
  }

  if (!savedAt) {
    return "로컬 초안";
  }

  return `${new Date(savedAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  })} 기준 로컬 저장됨`;
}
