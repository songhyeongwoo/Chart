"use client";

import { useState } from "react";
import {
  toCanonicalChartType,
  toFutureChartFeatureType,
  type CanonicalChartType,
  type FutureChartFeatureType,
} from "./editor-adapters";

type CanonicalDraftText = {
  title: string;
  subtitle: string;
  caption: string;
};

export type CanonicalEditorDraftSnapshot = CanonicalDraftText & {
  chart: CanonicalChartType;
  futureChartType: FutureChartFeatureType;
};

const defaultTextByChart: Record<CanonicalChartType, CanonicalDraftText> = {
  bar: {
    title: "지역별 월평균 매출 지수",
    subtitle: "단위: 지수(100 기준) · 전년 동기 비교 · n=412",
    caption: "MAC Research, KOSIS",
  },
  line: {
    title: "월별 활성 사용자 추이",
    subtitle: "단위: 명 · 3개월 롤링 평균 · 2026 Q1",
    caption: "MAC Research, KOSIS",
  },
  donut: {
    title: "기기별 트래픽 점유율",
    subtitle: "단위: % · 2026년 1분기 평균",
    caption: "MAC Research, KOSIS",
  },
  race: {
    title: "글로벌 기업 시가총액 Top 10",
    subtitle: "단위: USD Billion · 2019 → 2025",
    caption: "MAC Research, KOSIS",
  },
};

export function useCanonicalEditorDraftState() {
  const [futureChartType, setFutureChartTypeState] = useState<FutureChartFeatureType>(
    toFutureChartFeatureType("bar"),
  );
  const [text, setText] = useState<CanonicalDraftText>(defaultTextByChart.bar);

  const chart = toCanonicalChartType(futureChartType);

  const setChart = (nextChart: CanonicalChartType) => {
    setFutureChartTypeState(toFutureChartFeatureType(nextChart));
    setText(defaultTextByChart[nextChart]);
  };

  const setFutureChartType = (nextChart: FutureChartFeatureType) => {
    const canonicalChart = toCanonicalChartType(nextChart);
    setFutureChartTypeState(nextChart);
    setText(defaultTextByChart[canonicalChart]);
  };

  const setTitle = (title: string) => setText((current) => ({ ...current, title }));
  const setSubtitle = (subtitle: string) => setText((current) => ({ ...current, subtitle }));
  const setCaption = (caption: string) => setText((current) => ({ ...current, caption }));
  const draftSnapshot: CanonicalEditorDraftSnapshot = {
    chart,
    futureChartType,
    title: text.title,
    subtitle: text.subtitle,
    caption: text.caption,
  };
  const applyDraftSnapshot = (snapshot: CanonicalEditorDraftSnapshot) => {
    setFutureChartTypeState(snapshot.futureChartType);
    setText({
      title: snapshot.title,
      subtitle: snapshot.subtitle,
      caption: snapshot.caption,
    });
  };

  return {
    chart,
    futureChartType,
    title: text.title,
    subtitle: text.subtitle,
    caption: text.caption,
    setChart,
    setFutureChartType,
    setTitle,
    setSubtitle,
    setCaption,
    draftSnapshot,
    applyDraftSnapshot,
  };
}
