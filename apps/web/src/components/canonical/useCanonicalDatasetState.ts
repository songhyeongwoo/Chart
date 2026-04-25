"use client";

import { useState } from "react";
import { parseCanonicalDatasetFile, type CanonicalParsedDataset, type CanonicalParseStatus } from "./canonical-dataset-adapters";

export type CanonicalDatasetSnapshot = {
  status: CanonicalParseStatus;
  parsedDataset: CanonicalParsedDataset | null;
  sourceFilename: string | null;
  parseError: string | null;
};

export type CanonicalDatasetState = {
  status: CanonicalParseStatus;
  parsedDataset: CanonicalParsedDataset | null;
  sourceFilename: string | null;
  parseError: string | null;
  datasetSnapshot: CanonicalDatasetSnapshot;
  parseFile: (file: File) => Promise<void>;
  applyDatasetSnapshot: (snapshot: CanonicalDatasetSnapshot) => void;
  clearDataset: () => void;
};

export function useCanonicalDatasetState(): CanonicalDatasetState {
  const [status, setStatus] = useState<CanonicalParseStatus>("idle");
  const [parsedDataset, setParsedDataset] = useState<CanonicalParsedDataset | null>(null);
  const [sourceFilename, setSourceFilename] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseFile = async (file: File) => {
    setStatus("parsing");
    setSourceFilename(file.name);
    setParseError(null);

    const result = await parseCanonicalDatasetFile(file);

    if (result.ok) {
      setParsedDataset(result.dataset);
      setStatus("ready");
      return;
    }

    setParsedDataset(null);
    setStatus(result.status);
    setParseError(result.error);
  };

  const clearDataset = () => {
    setStatus("idle");
    setParsedDataset(null);
    setSourceFilename(null);
    setParseError(null);
  };
  const applyDatasetSnapshot = (snapshot: CanonicalDatasetSnapshot) => {
    setStatus(snapshot.status);
    setParsedDataset(snapshot.parsedDataset);
    setSourceFilename(snapshot.sourceFilename);
    setParseError(snapshot.parseError);
  };

  return {
    status,
    parsedDataset,
    sourceFilename,
    parseError,
    datasetSnapshot: {
      status,
      parsedDataset,
      sourceFilename,
      parseError,
    },
    parseFile,
    applyDatasetSnapshot,
    clearDataset,
  };
}
