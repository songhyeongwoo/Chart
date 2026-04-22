import type { DatasetPreview } from "@mac/domain";

export const mockDatasetPreview: DatasetPreview = {
  datasetId: "dataset-growth-q1",
  fileName: "growth-q1.xlsx",
  sheetName: "Acquisition",
  columns: [
    { key: "month", name: "Month", type: "string" },
    { key: "signups", name: "Signups", type: "number" },
    { key: "revenue", name: "Revenue", type: "number" },
    { key: "channel", name: "Channel", type: "string" }
  ],
  sampleRows: [
    { month: "Jan", signups: 1240, revenue: 18400, channel: "Paid" },
    { month: "Feb", signups: 1710, revenue: 23200, channel: "Organic" },
    { month: "Mar", signups: 1980, revenue: 28550, channel: "Referral" }
  ]
};

