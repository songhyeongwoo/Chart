"use client";

import { useState } from "react";

export type CanonicalSelectedCell = { r: number; c: string };
export type CanonicalDataEncoding = "UTF-8" | "EUC-KR";

export function useCanonicalDataEditorState() {
  const [selectedCol, setSelectedCol] = useState("매출");
  const [selectedCell, setSelectedCell] = useState<CanonicalSelectedCell | null>({ r: 4, c: "전년" });
  const [encoding, setEncoding] = useState<CanonicalDataEncoding>("UTF-8");

  return {
    selectedCol,
    setSelectedCol,
    selectedCell,
    setSelectedCell,
    encoding,
    setEncoding,
  };
}
