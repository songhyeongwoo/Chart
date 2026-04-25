"use client";

import { useState, type RefObject } from "react";
import { exportCanonicalSvg, type CanonicalExportStatus } from "./canonical-export-adapters";
import type { CanonicalChartType } from "./editor-adapters";

export type CanonicalExportState = {
  status: CanonicalExportStatus;
  lastExportedAt: string | null;
  lastFilename: string | null;
  errorMessage: string | null;
  exportSvg: () => void;
  markUnsupported: (format: string) => void;
};

export function useCanonicalExportState({
  projectId,
  chart,
  targetRef,
}: {
  projectId: string;
  chart: CanonicalChartType;
  targetRef: RefObject<HTMLElement | null>;
}): CanonicalExportState {
  const [status, setStatus] = useState<CanonicalExportStatus>("idle");
  const [lastExportedAt, setLastExportedAt] = useState<string | null>(null);
  const [lastFilename, setLastFilename] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const exportSvg = () => {
    setStatus("exporting");
    setErrorMessage(null);

    const result = exportCanonicalSvg({
      target: targetRef.current,
      projectId,
      chart,
    });

    if (result.ok) {
      setStatus("success");
      setLastExportedAt(result.exportedAt);
      setLastFilename(result.filename);
      return;
    }

    setStatus(result.status);
    setErrorMessage(result.errorMessage);
  };

  const markUnsupported = (format: string) => {
    setStatus("unsupported");
    setErrorMessage(`${format} export는 아직 연결하지 않았습니다.`);
  };

  return {
    status,
    lastExportedAt,
    lastFilename,
    errorMessage,
    exportSvg,
    markUnsupported,
  };
}
