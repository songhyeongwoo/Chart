"use client";

import { useState } from "react";
import {
  canonicalColumns,
  canonicalRows,
  defaultCanonicalFieldMapping,
  getCanonicalColumnByKey,
  toFutureFieldMappingBindings,
  type CanonicalColumn,
  type CanonicalFieldMapping,
} from "./canonical-field-adapters";
import type { CanonicalParsedDataset } from "./canonical-dataset-adapters";
import { useCanonicalDataEditorState } from "./useCanonicalDataEditorState";

export function useCanonicalFieldMappingState(parsedDataset?: CanonicalParsedDataset | null) {
  const dataEditor = useCanonicalDataEditorState();
  const [mapping, setMapping] = useState<CanonicalFieldMapping>(defaultCanonicalFieldMapping);

  const columns = parsedDataset?.columns ?? canonicalColumns;
  const rows = parsedDataset?.rows ?? canonicalRows;
  const columnHeaders = columns.map((column) => column.dataKey);
  const columnNameByDataKey = Object.fromEntries(columns.map((column) => [column.dataKey, column.n]));
  const selectedColumn = columns.find((column) => column.n === dataEditor.selectedCol) ?? columns[0];
  const missingValueCount = parsedDataset?.missingValueCount ?? columns.reduce((sum, column) => sum + column.missing, 0);
  const issueCount = parsedDataset?.issueCount ?? columns.reduce((sum, column) => sum + column.issues, 0);
  const effectiveMapping = normalizeMapping(mapping, columns);

  const mappingColumns = {
    x: getCanonicalColumnByKey(columns, effectiveMapping.xFieldKey),
    y: getCanonicalColumnByKey(columns, effectiveMapping.yFieldKey),
    comparison: getCanonicalColumnByKey(columns, effectiveMapping.comparisonFieldKey),
    color: getCanonicalColumnByKey(columns, effectiveMapping.colorFieldKey),
    label: getCanonicalColumnByKey(columns, effectiveMapping.labelFieldKey),
  };

  const setMappingField = (role: keyof CanonicalFieldMapping, fieldKey: string) => {
    setMapping((current) => ({ ...current, [role]: fieldKey }));
  };
  const applyFieldMappingSnapshot = (snapshot: CanonicalFieldMapping) => {
    setMapping(snapshot);
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
    mapping: effectiveMapping,
    mappingColumns,
    futureBindings: toFutureFieldMappingBindings(effectiveMapping),
    rowCount: parsedDataset?.rowCount ?? 412,
    columnCount: parsedDataset?.columnCount ?? 7,
    sourceFilename: parsedDataset?.sourceFilename ?? "sales_2026_q1",
    hasParsedDataset: Boolean(parsedDataset),
    fieldMappingSnapshot: effectiveMapping,
    setMappingField,
    applyFieldMappingSnapshot,
  };
}

export type CanonicalFieldMappingState = ReturnType<typeof useCanonicalFieldMappingState>;

function normalizeMapping(mapping: CanonicalFieldMapping, columns: CanonicalColumn[]): CanonicalFieldMapping {
  const fallback = getDefaultMapping(columns);
  const hasKey = (key: string) => columns.some((column) => column.key === key);

  return {
    xFieldKey: hasKey(mapping.xFieldKey) ? mapping.xFieldKey : fallback.xFieldKey,
    yFieldKey: hasKey(mapping.yFieldKey) ? mapping.yFieldKey : fallback.yFieldKey,
    comparisonFieldKey: hasKey(mapping.comparisonFieldKey) ? mapping.comparisonFieldKey : fallback.comparisonFieldKey,
    colorFieldKey: hasKey(mapping.colorFieldKey) ? mapping.colorFieldKey : fallback.colorFieldKey,
    labelFieldKey: hasKey(mapping.labelFieldKey) ? mapping.labelFieldKey : fallback.labelFieldKey,
  };
}

function getDefaultMapping(columns: CanonicalColumn[]): CanonicalFieldMapping {
  const firstCategory = columns.find((column) => column.inferredType === "category") ?? columns[0];
  const numericColumns = columns.filter((column) => column.inferredType === "number");
  const firstNumber = numericColumns[0] ?? columns[1] ?? columns[0];
  const secondNumber = numericColumns[1] ?? firstNumber;
  const secondCategory = columns.find((column) => column.inferredType === "category" && column.key !== firstCategory?.key) ?? firstCategory;

  return {
    xFieldKey: firstCategory?.key ?? "",
    yFieldKey: firstNumber?.key ?? "",
    comparisonFieldKey: secondNumber?.key ?? firstNumber?.key ?? "",
    colorFieldKey: secondCategory?.key ?? firstCategory?.key ?? "",
    labelFieldKey: firstCategory?.key ?? "",
  };
}
