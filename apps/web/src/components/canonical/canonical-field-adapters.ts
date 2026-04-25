export type CanonicalColumnType = "category" | "date" | "number";
export type CanonicalFieldRole = "x" | "y" | "comparison" | "color" | "label";

export type CanonicalColumn = {
  k: string;
  key: string;
  dataKey: string;
  n: string;
  t: string;
  c: string;
  role: string;
  issues: number;
  inferredType: CanonicalColumnType;
  unit?: string;
  format?: string;
  range?: string;
  mean?: string;
  median?: string;
  minMax?: string;
  missing: number;
};

export type CanonicalDataRow = Record<string, string | number | null>;

export type CanonicalFieldMapping = {
  xFieldKey: string;
  yFieldKey: string;
  comparisonFieldKey: string;
  colorFieldKey: string;
  labelFieldKey: string;
};

export type FutureFieldMappingBindings = {
  xFieldKey: string | null;
  valueFieldKey: string | null;
  seriesFieldKey: string | null;
  labelFieldKey: string | null;
};

export const canonicalColumns: CanonicalColumn[] = [
  { k: "A", key: "region", dataKey: "지역", n: "지역", t: "범주", c: "#1F3FFF", role: "X축", issues: 0, inferredType: "category", missing: 0 },
  { k: "B", key: "month", dataKey: "월", n: "월", t: "날짜", c: "#E26A2C", role: "시간", issues: 0, inferredType: "date", missing: 0 },
  { k: "C", key: "sales", dataKey: "매출", n: "매출", t: "숫자", c: "#25A18E", role: "Y축", issues: 0, inferredType: "number", unit: "십억원", format: "천 단위 콤마", range: "0–1,284", mean: "412", median: "324", minMax: "78 / 1,284", missing: 0 },
  { k: "D", key: "previousSales", dataKey: "전년", n: "전년 매출", t: "숫자", c: "#25A18E", role: "비교값", issues: 2, inferredType: "number", unit: "십억원", format: "천 단위 콤마", range: "0–1,086", mean: "348", median: "281", minMax: "64 / 1,086", missing: 2 },
  { k: "E", key: "growth", dataKey: "성장률", n: "성장률", t: "숫자", c: "#25A18E", role: "—", issues: 0, inferredType: "number", unit: "%", format: "퍼센트", range: "+8.3–25.4%", mean: "+15.6%", median: "+14.8%", minMax: "+8.3 / +25.4", missing: 0 },
  { k: "F", key: "category", dataKey: "카테고리", n: "카테고리", t: "범주", c: "#1F3FFF", role: "색상", issues: 0, inferredType: "category", missing: 0 },
  { k: "G", key: "brand", dataKey: "브랜드", n: "브랜드", t: "범주", c: "#1F3FFF", role: "—", issues: 1, inferredType: "category", missing: 1 },
];

export const canonicalRows: CanonicalDataRow[] = [
  { 지역: "서울", 월: "2026-01", 매출: 1284, 전년: 1086, 성장률: "+18.2%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "경기", 월: "2026-01", 매출: 986, 전년: 808, 성장률: "+22.0%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "부산", 월: "2026-01", 매출: 642, 전년: 512, 성장률: "+25.4%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "인천", 월: "2026-01", 매출: 521, 전년: 462, 성장률: "+12.8%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "대구", 월: "2026-01", 매출: 418, 전년: null, 성장률: "—", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "대전", 월: "2026-01", 매출: 324, 전년: 298, 성장률: "+8.7%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "광주", 월: "2026-01", 매출: 286, 전년: 264, 성장률: "+8.3%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "울산", 월: "2026-01", 매출: 192, 전년: 174, 성장률: "+10.3%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "세종", 월: "2026-01", 매출: 78, 전년: 64, 성장률: "+21.9%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "강원", 월: "2026-01", 매출: 142, 전년: 118, 성장률: "+20.3%", 카테고리: "리테일", 브랜드: "" },
  { 지역: "충북", 월: "2026-01", 매출: 168, 전년: 144, 성장률: "+16.7%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "충남", 월: "2026-01", 매출: 224, 전년: 198, 성장률: "+13.1%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "전북", 월: "2026-01", 매출: 158, 전년: null, 성장률: "—", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "전남", 월: "2026-01", 매출: 184, 전년: 162, 성장률: "+13.6%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "경북", 월: "2026-01", 매출: 246, 전년: 218, 성장률: "+12.8%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "경남", 월: "2026-01", 매출: 312, 전년: 274, 성장률: "+13.9%", 카테고리: "리테일", 브랜드: "MAC" },
  { 지역: "제주", 월: "2026-01", 매출: 124, 전년: 108, 성장률: "+14.8%", 카테고리: "리테일", 브랜드: "MAC" },
];

export const defaultCanonicalFieldMapping: CanonicalFieldMapping = {
  xFieldKey: "region",
  yFieldKey: "sales",
  comparisonFieldKey: "previousSales",
  colorFieldKey: "category",
  labelFieldKey: "region",
};

export function getCanonicalColumnByKey(columns: CanonicalColumn[], key: string | null | undefined) {
  return columns.find((column) => column.key === key) ?? null;
}

export function toFutureFieldMappingBindings(mapping: CanonicalFieldMapping): FutureFieldMappingBindings {
  return {
    xFieldKey: mapping.xFieldKey,
    valueFieldKey: mapping.yFieldKey,
    seriesFieldKey: mapping.colorFieldKey || null,
    labelFieldKey: mapping.labelFieldKey || mapping.xFieldKey,
  };
}
