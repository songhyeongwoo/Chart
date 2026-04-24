import type { ChartType } from "@mac/domain";

export const chartTypeLabelMap: Record<ChartType, string> = {
  bar: "막대 차트",
  line: "선 차트",
  area: "영역 차트",
  scatter: "산점도",
  donut: "도넛 차트",
  table: "표"
};

export const chartTypeOptions: Array<{
  value: ChartType;
  label: string;
  description: string;
}> = [
  { value: "bar", label: chartTypeLabelMap.bar, description: "항목 간 차이를 쉽고 또렷하게 비교합니다." },
  { value: "line", label: chartTypeLabelMap.line, description: "시간 흐름이나 순서형 변화를 자연스럽게 보여줍니다." },
  { value: "area", label: chartTypeLabelMap.area, description: "추세와 누적감을 함께 전달할 때 적합합니다." },
  { value: "scatter", label: chartTypeLabelMap.scatter, description: "관계와 분포를 확인할 때 사용합니다." },
  { value: "donut", label: chartTypeLabelMap.donut, description: "구성 비중을 간결하게 보여줍니다." },
  { value: "table", label: chartTypeLabelMap.table, description: "원본 값을 그대로 확인해야 할 때 유용합니다." }
];
