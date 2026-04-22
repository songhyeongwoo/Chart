import type { ChartType } from "@mac/domain";

export const chartTypeOptions: Array<{
  value: ChartType;
  label: string;
  description: string;
}> = [
  { value: "bar", label: "Bar", description: "Compare categories with strong default hierarchy." },
  { value: "line", label: "Line", description: "Reveal trends over time or ordered sequences." },
  { value: "area", label: "Area", description: "Show cumulative movement with more visual weight." },
  { value: "scatter", label: "Scatter", description: "Explore relationship and distribution patterns." },
  { value: "donut", label: "Donut", description: "Communicate proportional breakdowns with restraint." },
  { value: "table", label: "Table", description: "Offer a reliable fallback for raw inspection." }
];

