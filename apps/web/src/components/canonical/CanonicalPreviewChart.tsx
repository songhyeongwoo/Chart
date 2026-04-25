"use client";

import { BarChart, DonutChart, LineChart, RacingBar, type CanonicalBarDatum, type CanonicalDonutDatum, type CanonicalLineData, type CanonicalRaceDatum } from "./Charts";
import type { CanonicalChartType, CanonicalColorMode } from "./editor-adapters";
import type { CanonicalChartControls } from "./useCanonicalChartControlsState";
import type { CanonicalFieldMappingState } from "./useCanonicalFieldMappingState";

export type CanonicalPreviewDataset = {
  bar: CanonicalBarDatum[];
  line: CanonicalLineData;
  donut: CanonicalDonutDatum[];
  race: CanonicalRaceDatum[];
  fieldKeys: {
    xFieldKey: string;
    yFieldKey: string;
    comparisonFieldKey: string;
    colorFieldKey: string;
    labelFieldKey: string;
  };
};

export type CanonicalPreviewChartProps = {
  chart: CanonicalChartType;
  title: string;
  subtitle: string;
  caption: string;
  fieldMapping: CanonicalFieldMappingState;
  chartControls: CanonicalChartControls;
  palette: string[];
  colorMode: CanonicalColorMode;
  singleColor: string;
  highlight: string;
  opacity: number;
  darkCanvas: boolean;
  showKPI: boolean;
  raceYear: number;
  racePlaying: boolean;
  previewData?: CanonicalPreviewDataset;
};

const canonicalMockPreviewData = {
  bar: [
    { label: "서울", value: 92, comparisonValue: 78 },
    { label: "경기", value: 86, comparisonValue: 70 },
    { label: "부산", value: 78, comparisonValue: 62 },
    { label: "인천", value: 64, comparisonValue: 54 },
    { label: "대구", value: 52, comparisonValue: 48 },
    { label: "대전", value: 41, comparisonValue: 38 },
    { label: "광주", value: 33, comparisonValue: 30 },
    { label: "울산", value: 22, comparisonValue: 20 },
  ],
  line: {
    categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    series: [
      { label: "전체", values: [22, 28, 26, 34, 40, 38, 46, 52, 60, 58, 66, 74] },
      { label: "모바일", values: [18, 20, 24, 22, 28, 32, 30, 36, 40, 44, 48, 54] },
      { label: "신규", values: [10, 14, 18, 16, 22, 20, 26, 30, 32, 34, 38, 42], dashed: true },
    ],
    max: 80,
  },
  donut: [
    { label: "모바일", value: 38, groupLabel: "주요 채널" },
    { label: "데스크톱", value: 24, groupLabel: "보조 채널" },
    { label: "태블릿", value: 18, groupLabel: "성장 채널" },
    { label: "앱", value: 12, groupLabel: "테스트" },
    { label: "기타", value: 8, groupLabel: "기타" },
  ],
  race: [
    { label: "삼성전자", value: 94, flag: "🇰🇷" },
    { label: "TSMC", value: 86, flag: "🇹🇼" },
    { label: "SK하이닉스", value: 78, flag: "🇰🇷" },
    { label: "NVIDIA", value: 70, flag: "🇺🇸" },
    { label: "현대자동차", value: 63, flag: "🇰🇷" },
    { label: "LG에너지", value: 55, flag: "🇰🇷" },
    { label: "네이버", value: 46, flag: "🇰🇷" },
    { label: "카카오", value: 38, flag: "🇰🇷" },
    { label: "셀트리온", value: 31, flag: "🇰🇷" },
    { label: "포스코", value: 25, flag: "🇰🇷" },
  ],
} satisfies Omit<CanonicalPreviewDataset, "fieldKeys">;

export function buildCanonicalMockPreviewData(fieldMapping: CanonicalFieldMappingState): CanonicalPreviewDataset {
  return {
    ...canonicalMockPreviewData,
    fieldKeys: {
      xFieldKey: fieldMapping.mapping.xFieldKey,
      yFieldKey: fieldMapping.mapping.yFieldKey,
      comparisonFieldKey: fieldMapping.mapping.comparisonFieldKey,
      colorFieldKey: fieldMapping.mapping.colorFieldKey,
      labelFieldKey: fieldMapping.mapping.labelFieldKey,
    },
  };
}

export function CanonicalPreviewChart(props: CanonicalPreviewChartProps) {
  const data = props.previewData ?? buildCanonicalMockPreviewData(props.fieldMapping);
  const showAxis = props.chartControls.axes.showAxis;
  const showGrid = props.chartControls.axes.showGrid;
  const showLegend = props.chartControls.legend.show;
  const topN = props.chartControls.data.topN;

  const commonProps = {
    className: "w-full",
    palette: props.palette,
  };

  if (props.chart === "line") {
    return (
      <div className="w-full" style={{ opacity: props.opacity }}>
        <LineChart {...commonProps} data={data.line} showAxis={showAxis} showGrid={showGrid} showLegend={showLegend} />
      </div>
    );
  }

  if (props.chart === "donut") {
    return (
      <div className="w-full" style={{ opacity: props.opacity }}>
        <DonutChart {...commonProps} data={data.donut} showLegend={showLegend} />
      </div>
    );
  }

  if (props.chart === "race") {
    return (
      <div className="w-full" style={{ opacity: props.opacity }}>
        <RacingBar
          {...commonProps}
          data={data.race}
          year={props.raceYear}
          showYear={props.chartControls.labels.mode !== "hidden"}
          showTimeline={showLegend}
        />
      </div>
    );
  }

  return (
    <div className="w-full" style={{ opacity: props.opacity }}>
      <BarChart
        {...commonProps}
        data={data.bar}
        showAxis={showAxis}
        showGrid={showGrid}
        showLegend={showLegend}
        topN={topN}
      />
    </div>
  );
}
