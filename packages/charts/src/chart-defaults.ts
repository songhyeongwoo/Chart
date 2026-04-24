import type { ChartType, VisualizationConfig } from "@mac/domain";

export function createPlaceholderVisualizationConfig(chartType: ChartType): VisualizationConfig {
  return {
    chartType,
    bindings: {
      x: chartType === "scatter" ? "acquisition_cost" : "month",
      y: chartType === "donut" ? undefined : "signups",
      label: chartType === "donut" ? "channel" : undefined,
      color: chartType === "donut" ? "channel" : "region"
    },
    style: {
      palette: "mac-default",
      density: "balanced",
      emphasis: "editorial"
    },
    axes: {
      x: {
        show: chartType !== "donut"
      },
      y: {
        show: chartType !== "donut"
      }
    },
    legend: {
      show: chartType === "donut" || chartType === "scatter"
    },
    labels: {
      show: chartType === "bar" || chartType === "donut"
    },
    layout: {
      padding: "comfortable",
      aspectRatio: "16:10"
    }
  };
}

