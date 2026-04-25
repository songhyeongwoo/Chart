"use client";

import { useState } from "react";
import {
  canonicalColumns,
  canonicalRows,
  defaultCanonicalFieldMapping,
  getCanonicalColumnByKey,
  toFutureFieldMappingBindings,
  type CanonicalFieldMapping,
} from "./canonical-field-adapters";
import { useCanonicalDataEditorState } from "./useCanonicalDataEditorState";

export function useCanonicalFieldMappingState() {
  const dataEditor = useCanonicalDataEditorState();
  const [mapping, setMapping] = useState<CanonicalFieldMapping>(defaultCanonicalFieldMapping);

  const columns = canonicalColumns;
  const rows = canonicalRows;
  const columnHeaders = columns.map((column) => column.dataKey);
  const columnNameByDataKey = Object.fromEntries(columns.map((column) => [column.dataKey, column.n]));
  const selectedColumn = columns.find((column) => column.n === dataEditor.selectedCol) ?? columns[0];
  const missingValueCount = columns.reduce((sum, column) => sum + column.missing, 0);
  const issueCount = columns.reduce((sum, column) => sum + column.issues, 0);

  const mappingColumns = {
    x: getCanonicalColumnByKey(columns, mapping.xFieldKey),
    y: getCanonicalColumnByKey(columns, mapping.yFieldKey),
    comparison: getCanonicalColumnByKey(columns, mapping.comparisonFieldKey),
    color: getCanonicalColumnByKey(columns, mapping.colorFieldKey),
    label: getCanonicalColumnByKey(columns, mapping.labelFieldKey),
  };

  const setMappingField = (role: keyof CanonicalFieldMapping, fieldKey: string) => {
    setMapping((current) => ({ ...current, [role]: fieldKey }));
  };

  return {
    ...dataEditor,
    columns,
    rows,
    columnHeaders,
    columnNameByDataKey,
    selectedColumn,
    missingValueCount,
    issueCount,
    mapping,
    mappingColumns,
    futureBindings: toFutureFieldMappingBindings(mapping),
    setMappingField,
  };
}

export type CanonicalFieldMappingState = ReturnType<typeof useCanonicalFieldMappingState>;
