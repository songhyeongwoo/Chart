import type { DatasetPreview } from "@mac/domain";

export const mockDatasetPreview: DatasetPreview = {
  datasetId: "dataset-growth-q1",
  fileName: "growth-q1.xlsx",
  sheetName: "획득현황",
  columns: [
    { key: "month", name: "월", type: "string" },
    { key: "signups", name: "가입자 수", type: "number" },
    { key: "revenue", name: "매출", type: "number" },
    { key: "channel", name: "유입 채널", type: "string" }
  ],
  sampleRows: [
    { month: "1월", signups: 540, revenue: 8100, channel: "광고" },
    { month: "1월", signups: 390, revenue: 5700, channel: "자연 유입" },
    { month: "1월", signups: 310, revenue: 4600, channel: "추천" },
    { month: "2월", signups: 680, revenue: 9800, channel: "광고" },
    { month: "2월", signups: 590, revenue: 8100, channel: "자연 유입" },
    { month: "2월", signups: 440, revenue: 5300, channel: "추천" },
    { month: "3월", signups: 740, revenue: 11200, channel: "광고" },
    { month: "3월", signups: 610, revenue: 9200, channel: "자연 유입" },
    { month: "3월", signups: 630, revenue: 8150, channel: "추천" },
    { month: "4월", signups: 820, revenue: 12100, channel: "광고" },
    { month: "4월", signups: 710, revenue: 10300, channel: "자연 유입" },
    { month: "4월", signups: 610, revenue: 9300, channel: "추천" }
  ]
};
