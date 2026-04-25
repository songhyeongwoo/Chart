"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatCanonicalSavedLabel,
  getCanonicalSnapshotStorageKey,
  parseStoredCanonicalEditorSnapshot,
  serializeCanonicalSnapshot,
  toStorableCanonicalEditorSnapshot,
  type CanonicalEditorSnapshot,
  type StoredCanonicalEditorSnapshot,
} from "./canonical-snapshot-adapters";

type UseCanonicalEditorSnapshotStateParams = {
  projectId: string;
  currentSnapshot: CanonicalEditorSnapshot;
  applySnapshot: (snapshot: CanonicalEditorSnapshot) => void;
};

export function useCanonicalEditorSnapshotState({
  projectId,
  currentSnapshot,
  applySnapshot,
}: UseCanonicalEditorSnapshotStateParams) {
  const storageKey = getCanonicalSnapshotStorageKey(projectId);
  const initialSnapshotRef = useRef(toStorableCanonicalEditorSnapshot(currentSnapshot));
  const applySnapshotRef = useRef(applySnapshot);
  const [savedSnapshot, setSavedSnapshot] = useState<CanonicalEditorSnapshot>(initialSnapshotRef.current);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  applySnapshotRef.current = applySnapshot;

  useEffect(() => {
    const storedSnapshot = loadStoredSnapshot(storageKey);

    if (storedSnapshot) {
      setSavedSnapshot(storedSnapshot.snapshot);
      setSavedAt(storedSnapshot.savedAt);
      applySnapshotRef.current(storedSnapshot.snapshot);
    } else {
      setSavedSnapshot(initialSnapshotRef.current);
      setSavedAt(null);
    }

    setHasHydrated(true);
  }, [storageKey]);

  const currentSerialized = useMemo(
    () => serializeCanonicalSnapshot(currentSnapshot),
    [currentSnapshot],
  );
  const savedSerialized = useMemo(
    () => serializeCanonicalSnapshot(savedSnapshot),
    [savedSnapshot],
  );
  const hasUnsavedChanges = hasHydrated && currentSerialized !== savedSerialized;

  const saveSnapshot = () => {
    const savedAtValue = new Date().toISOString();
    const nextSnapshot = toStorableCanonicalEditorSnapshot(currentSnapshot);
    const storedValue: StoredCanonicalEditorSnapshot = {
      savedAt: savedAtValue,
      snapshot: nextSnapshot,
    };

    setSavedSnapshot(nextSnapshot);
    setSavedAt(savedAtValue);
    saveStoredSnapshot(storageKey, storedValue);
  };

  const resetSnapshot = () => {
    applySnapshot(savedSnapshot ?? initialSnapshotRef.current);
  };

  return {
    storageKey,
    savedAt,
    savedLabel: formatCanonicalSavedLabel(savedAt, hasUnsavedChanges),
    hasUnsavedChanges,
    hasHydrated,
    saveSnapshot,
    resetSnapshot,
  };
}

function loadStoredSnapshot(storageKey: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return parseStoredCanonicalEditorSnapshot(window.localStorage.getItem(storageKey));
}

function saveStoredSnapshot(storageKey: string, snapshot: StoredCanonicalEditorSnapshot) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
}
