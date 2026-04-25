import type { CanonicalColumn, CanonicalColumnType, CanonicalDataRow } from "./canonical-field-adapters";

export type CanonicalParseStatus = "idle" | "parsing" | "ready" | "error" | "unsupported";

export type CanonicalParsedColumn = CanonicalColumn & {
  uniqueCount: number;
  sampleValues: string[];
};

export type CanonicalParsedDataset = {
  sourceFilename: string;
  encoding: "UTF-8";
  columns: CanonicalParsedColumn[];
  rows: CanonicalDataRow[];
  rowCount: number;
  columnCount: number;
  missingValueCount: number;
  issueCount: number;
  parseStatus: CanonicalParseStatus;
  parseError: string | null;
};

export type CanonicalDatasetParseResult =
  | { ok: true; dataset: CanonicalParsedDataset }
  | { ok: false; status: Exclude<CanonicalParseStatus, "idle" | "parsing" | "ready">; error: string };

const typeColors: Record<CanonicalColumnType, string> = {
  category: "#1F3FFF",
  date: "#E26A2C",
  number: "#25A18E",
};

const typeLabels: Record<CanonicalColumnType, string> = {
  category: "범주",
  date: "날짜",
  number: "숫자",
};

export function parseCanonicalCsvText(text: string, sourceFilename = "sample.csv", delimiter = ","): CanonicalParsedDataset {
  const rows = parseDelimitedRows(text.replace(/^\uFEFF/, ""), delimiter);
  const nonEmptyRows = rows.filter((row) => row.some((cell) => cell.trim() !== ""));

  if (nonEmptyRows.length < 2) {
    throw new Error("헤더와 최소 1개 이상의 데이터 행이 필요합니다.");
  }

  const headers = makeUniqueHeaders(nonEmptyRows[0]);
  const body = nonEmptyRows.slice(1);
  const columnProfiles = headers.map((header, index) => profileColumn(header, index, body.map((row) => row[index] ?? "")));
  const dataRows: CanonicalDataRow[] = body.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header.dataKey, normalizeCell(row[index] ?? "")])),
  );
  const missingValueCount = columnProfiles.reduce((sum, column) => sum + column.missing, 0);
  const issueCount = columnProfiles.reduce((sum, column) => sum + column.issues, 0);

  return {
    sourceFilename,
    encoding: "UTF-8",
    columns: columnProfiles,
    rows: dataRows,
    rowCount: dataRows.length,
    columnCount: columnProfiles.length,
    missingValueCount,
    issueCount,
    parseStatus: "ready",
    parseError: null,
  };
}

export async function parseCanonicalDatasetFile(file: File): Promise<CanonicalDatasetParseResult> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (extension === "xlsx" || extension === "xls") {
    return {
      ok: false,
      status: "unsupported",
      error: "XLSX는 adapter boundary만 준비되어 있습니다. 현재 의존성 없이 CSV/TSV를 먼저 지원합니다.",
    };
  }

  if (extension !== "csv" && extension !== "tsv" && file.type !== "text/csv") {
    return {
      ok: false,
      status: "unsupported",
      error: "현재 Phase 6에서는 CSV/TSV 파일만 로컬 파싱합니다.",
    };
  }

  try {
    const text = await file.text();
    const delimiter = extension === "tsv" ? "\t" : ",";
    return { ok: true, dataset: parseCanonicalCsvText(text, file.name, delimiter) };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      error: error instanceof Error ? error.message : "파일을 읽는 중 알 수 없는 오류가 발생했습니다.",
    };
  }
}

function parseDelimitedRows(text: string, delimiter: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(field);
      field = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (inQuotes) {
    throw new Error("따옴표가 닫히지 않은 CSV입니다.");
  }

  return rows;
}

function makeUniqueHeaders(rawHeaders: string[]) {
  const seen = new Map<string, number>();

  return rawHeaders.map((rawHeader, index) => {
    const trimmed = rawHeader.trim() || `Column ${index + 1}`;
    const count = seen.get(trimmed) ?? 0;
    seen.set(trimmed, count + 1);
    const name = count === 0 ? trimmed : `${trimmed}_${count + 1}`;
    return {
      name,
      dataKey: name,
      key: toColumnKey(name, index),
    };
  });
}

function profileColumn(header: { name: string; dataKey: string; key: string }, index: number, values: string[]): CanonicalParsedColumn {
  const samples = values.map((value) => value.trim()).filter(Boolean);
  const missing = values.filter((value) => value.trim() === "").length;
  const inferredType = inferColumnType(samples);
  const numericValues = samples.map(toNumber).filter((value): value is number => value !== null);
  const uniqueCount = new Set(samples).size;
  const role = getDefaultRole(inferredType, index);

  return {
    k: toColumnLetter(index),
    key: header.key,
    dataKey: header.dataKey,
    n: header.name,
    t: typeLabels[inferredType],
    c: typeColors[inferredType],
    role,
    issues: missing,
    inferredType,
    unit: inferredType === "number" ? "값" : undefined,
    format: inferredType === "number" ? "숫자" : inferredType === "date" ? "날짜" : "텍스트",
    range: getColumnRange(inferredType, samples, numericValues),
    mean: numericValues.length ? formatNumber(numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length) : undefined,
    median: numericValues.length ? formatNumber(getMedian(numericValues)) : undefined,
    minMax: numericValues.length ? `${formatNumber(Math.min(...numericValues))} / ${formatNumber(Math.max(...numericValues))}` : undefined,
    missing,
    uniqueCount,
    sampleValues: samples.slice(0, 5),
  };
}

function inferColumnType(samples: string[]): CanonicalColumnType {
  if (samples.length === 0) {
    return "category";
  }

  const numberCount = samples.filter((value) => toNumber(value) !== null).length;
  const dateCount = samples.filter(isDateLike).length;

  if (numberCount / samples.length >= 0.7) {
    return "number";
  }

  if (dateCount / samples.length >= 0.7) {
    return "date";
  }

  return "category";
}

function normalizeCell(value: string): string | number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return toNumber(trimmed) ?? trimmed;
}

function toNumber(value: string) {
  const normalized = value.replace(/,/g, "").replace(/%$/, "").trim();
  if (!/^[-+]?\d*\.?\d+$/.test(normalized)) {
    return null;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function isDateLike(value: string) {
  return /^\d{4}[-/.]\d{1,2}([-/.\s]\d{1,2})?$/.test(value.trim());
}

function getColumnRange(type: CanonicalColumnType, samples: string[], numericValues: number[]) {
  if (type === "number" && numericValues.length) {
    return `${formatNumber(Math.min(...numericValues))}–${formatNumber(Math.max(...numericValues))}`;
  }

  if (type === "category") {
    return `${new Set(samples).size}개 고유값`;
  }

  return samples.length ? `${samples[0]}–${samples[samples.length - 1]}` : undefined;
}

function getMedian(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(value);
}

function toColumnKey(name: string, index: number) {
  const key = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return key || `column-${index + 1}`;
}

function toColumnLetter(index: number) {
  let value = index + 1;
  let label = "";

  while (value > 0) {
    const remainder = (value - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    value = Math.floor((value - 1) / 26);
  }

  return label;
}

function getDefaultRole(type: CanonicalColumnType, index: number) {
  if (index === 0) {
    return "X축";
  }

  if (type === "number" && index === 1) {
    return "Y축";
  }

  if (type === "number") {
    return "값";
  }

  if (type === "date") {
    return "시간";
  }

  return "—";
}
