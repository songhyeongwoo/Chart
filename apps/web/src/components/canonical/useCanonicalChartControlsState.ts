"use client";

import { useState } from "react";

export type CanonicalLabelMode = "value" | "name" | "both" | "hidden";
export type CanonicalLabelFormat = "number" | "compact" | "percent";
export type CanonicalLabelSize = "sm" | "md" | "lg";
export type CanonicalLabelWeight = "regular" | "medium" | "bold";
export type CanonicalLegendPosition = "top" | "right" | "bottom";
export type CanonicalLayoutAspectRatio = "16:9" | "4:3" | "1:1";
export type CanonicalLayoutDensity = "compact" | "balanced" | "comfortable";
export type CanonicalSortMode = "value-desc" | "original" | "name";

export type CanonicalChartControlsSnapshot = {
  labels: {
    mode: CanonicalLabelMode;
    format: CanonicalLabelFormat;
    size: CanonicalLabelSize;
    weight: CanonicalLabelWeight;
    emphasizeKeyValues: boolean;
  };
  axes: {
    showAxis: boolean;
    showGrid: boolean;
    orientation: "x" | "y" | "both" | "none";
    rotateXLabels: boolean;
  };
  legend: {
    show: boolean;
    position: CanonicalLegendPosition;
  };
  layout: {
    aspectRatio: CanonicalLayoutAspectRatio;
    density: CanonicalLayoutDensity;
    margin: "16px" | "24px" | "32px";
  };
  data: {
    sortMode: CanonicalSortMode;
    topN: number;
  };
};

const initialControls: CanonicalChartControlsSnapshot = {
  labels: {
    mode: "both",
    format: "number",
    size: "md",
    weight: "medium",
    emphasizeKeyValues: false,
  },
  axes: {
    showAxis: true,
    showGrid: true,
    orientation: "x",
    rotateXLabels: false,
  },
  legend: {
    show: true,
    position: "bottom",
  },
  layout: {
    aspectRatio: "16:9",
    density: "balanced",
    margin: "24px",
  },
  data: {
    sortMode: "value-desc",
    topN: 8,
  },
};

const sortLabels: Record<CanonicalSortMode, string> = {
  "value-desc": "값 내림차순",
  original: "원본 순서",
  name: "이름순",
};

const labelModeLabels: Record<CanonicalLabelMode, string> = {
  value: "값만",
  name: "이름만",
  both: "위쪽",
  hidden: "숨김",
};

const labelFormatLabels: Record<CanonicalLabelFormat, string> = {
  number: "지수",
  compact: "축약",
  percent: "퍼센트",
};

const labelSizeValues: Record<CanonicalLabelSize, { ratio: number; label: string }> = {
  sm: { ratio: 0.34, label: "10px" },
  md: { ratio: 0.5, label: "12px" },
  lg: { ratio: 0.72, label: "14px" },
};

const axisOptions = ["x", "y", "both", "none"] as const;
const legendOptions = ["top", "bottom", "right", "none"] as const;
const sortModes = ["value-desc", "original", "name"] as const;
const labelModes = ["both", "value", "name", "hidden"] as const;
const labelFormats = ["number", "compact", "percent"] as const;
const labelSizes = ["sm", "md", "lg"] as const;
const margins = ["16px", "24px", "32px"] as const;
const aspectRatios = ["16:9", "4:3", "1:1"] as const;

function nextFrom<T extends readonly string[]>(values: T, current: T[number]) {
  const index = values.indexOf(current);
  return values[(index + 1) % values.length] as T[number];
}

function toFutureAspectRatio(aspectRatio: CanonicalLayoutAspectRatio) {
  return aspectRatio === "16:9" ? "16:10" : aspectRatio;
}

export function useCanonicalChartControlsState() {
  const [controls, setControls] = useState<CanonicalChartControlsSnapshot>(initialControls);

  const setLabelMode = (mode: CanonicalLabelMode) =>
    setControls((current) => ({ ...current, labels: { ...current.labels, mode } }));
  const toggleLabelVisibility = () =>
    setLabelMode(controls.labels.mode === "hidden" ? "both" : "hidden");
  const cycleLabelMode = () => setLabelMode(nextFrom(labelModes, controls.labels.mode));
  const cycleLabelFormat = () =>
    setControls((current) => ({
      ...current,
      labels: { ...current.labels, format: nextFrom(labelFormats, current.labels.format) },
    }));
  const cycleLabelSize = () =>
    setControls((current) => ({
      ...current,
      labels: { ...current.labels, size: nextFrom(labelSizes, current.labels.size) },
    }));
  const toggleKeyValueEmphasis = () =>
    setControls((current) => ({
      ...current,
      labels: { ...current.labels, emphasizeKeyValues: !current.labels.emphasizeKeyValues },
    }));
  const setAxisOrientation = (orientation: CanonicalChartControlsSnapshot["axes"]["orientation"]) =>
    setControls((current) => ({
      ...current,
      axes: {
        ...current.axes,
        orientation,
        showAxis: orientation !== "none",
      },
    }));
  const toggleRotateXLabels = () =>
    setControls((current) => ({
      ...current,
      axes: { ...current.axes, rotateXLabels: !current.axes.rotateXLabels },
    }));
  const setLegendPosition = (position: (typeof legendOptions)[number]) =>
    setControls((current) => ({
      ...current,
      legend: {
        ...current.legend,
        position: position === "none" ? current.legend.position : position,
        show: position !== "none",
      },
    }));
  const cycleMargin = () =>
    setControls((current) => ({
      ...current,
      layout: { ...current.layout, margin: nextFrom(margins, current.layout.margin) },
    }));
  const cycleAspectRatio = () =>
    setControls((current) => ({
      ...current,
      layout: { ...current.layout, aspectRatio: nextFrom(aspectRatios, current.layout.aspectRatio) },
    }));
  const cycleSortMode = () =>
    setControls((current) => ({
      ...current,
      data: { ...current.data, sortMode: nextFrom(sortModes, current.data.sortMode) },
    }));
  const incrementTopN = () =>
    setControls((current) => ({
      ...current,
      data: { ...current.data, topN: current.data.topN >= 12 ? 4 : current.data.topN + 1 },
    }));
  const applyChartControlsSnapshot = (snapshot: CanonicalChartControlsSnapshot) => {
    setControls(snapshot);
  };

  const labelSize = labelSizeValues[controls.labels.size];

  return {
    ...controls,
    labels: {
      ...controls.labels,
      visibilityLabel: labelModeLabels[controls.labels.mode],
      formatLabel: labelFormatLabels[controls.labels.format],
      sizeRatio: labelSize.ratio,
      sizeLabel: labelSize.label,
    },
    axes: {
      ...controls.axes,
      axisOptions,
    },
    legend: {
      ...controls.legend,
      legendOptions,
    },
    data: {
      ...controls.data,
      sortLabel: sortLabels[controls.data.sortMode],
    },
    futureDraftControls: {
      labels: {
        mode: controls.labels.mode,
        density: "balanced",
        numberFormat: controls.labels.format,
        size: controls.labels.size,
        weight: controls.labels.weight,
        prefix: "",
        suffix: "",
      },
      axes: {
        showAxis: controls.axes.showAxis,
        showGrid: controls.axes.showGrid,
      },
      legend: {
        show: controls.legend.show,
        position: controls.legend.position,
      },
      layout: {
        aspectRatio: toFutureAspectRatio(controls.layout.aspectRatio),
        density: controls.layout.density,
      },
      data: {
        sortMode: controls.data.sortMode,
        topN: controls.data.topN,
      },
    },
    chartControlsSnapshot: controls,
    applyChartControlsSnapshot,
    setAxisOrientation,
    setLegendPosition,
    toggleLabelVisibility,
    toggleKeyValueEmphasis,
    toggleRotateXLabels,
    cycleLabelMode,
    cycleLabelFormat,
    cycleLabelSize,
    cycleMargin,
    cycleAspectRatio,
    cycleSortMode,
    incrementTopN,
  };
}

export type CanonicalChartControls = ReturnType<typeof useCanonicalChartControlsState>;
