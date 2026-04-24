import { createPlaceholderVisualizationConfig } from "@mac/charts";
import type { DatasetPreview, EditorSessionPayload, ProjectSummary } from "@mac/domain";
import { sortProjectsByUpdatedAt } from "@mac/domain";
import { mockDatasetPreview } from "@mac/data";
import type { EditorChartType } from "./field-mapping";

export type PreviewQaState = "balanced" | "empty" | "sparse" | "extreme";

const qaColumns: DatasetPreview["columns"] = [
  { key: "period", name: "기간", type: "string" },
  { key: "segment", name: "항목", type: "string" },
  { key: "value", name: "성과 수", type: "number" },
  { key: "revenue", name: "매출", type: "number" }
];

function createQaPreview(
  datasetId: string,
  fileName: string,
  sheetName: string,
  sampleRows: DatasetPreview["sampleRows"]
): DatasetPreview {
  return {
    datasetId,
    fileName,
    sheetName,
    columns: qaColumns,
    sampleRows
  };
}

const lineQaSamples: Record<PreviewQaState, DatasetPreview> = {
  balanced: createQaPreview("qa-line-balanced", "qa-line-balanced.xlsx", "line-balanced", [
    { period: "1월", segment: "광고", value: 420, revenue: 6300 },
    { period: "1월", segment: "자연 유입", value: 360, revenue: 5400 },
    { period: "1월", segment: "추천", value: 250, revenue: 3900 },
    { period: "2월", segment: "광고", value: 510, revenue: 7600 },
    { period: "2월", segment: "자연 유입", value: 405, revenue: 6100 },
    { period: "2월", segment: "추천", value: 300, revenue: 4550 },
    { period: "3월", segment: "광고", value: 560, revenue: 8450 },
    { period: "3월", segment: "자연 유입", value: 438, revenue: 6620 },
    { period: "3월", segment: "추천", value: 332, revenue: 4990 },
    { period: "4월", segment: "광고", value: 620, revenue: 9300 },
    { period: "4월", segment: "자연 유입", value: 470, revenue: 7050 },
    { period: "4월", segment: "추천", value: 360, revenue: 5450 },
    { period: "5월", segment: "광고", value: 690, revenue: 10200 },
    { period: "5월", segment: "자연 유입", value: 510, revenue: 7680 },
    { period: "5월", segment: "추천", value: 388, revenue: 5870 },
    { period: "6월", segment: "광고", value: 740, revenue: 10940 },
    { period: "6월", segment: "자연 유입", value: 560, revenue: 8420 },
    { period: "6월", segment: "추천", value: 420, revenue: 6320 }
  ]),
  empty: createQaPreview("qa-line-empty", "qa-line-empty.xlsx", "line-empty", [
    { period: "1월", segment: "광고", value: 0, revenue: 0 },
    { period: "2월", segment: "광고", value: 0, revenue: 0 },
    { period: "3월", segment: "광고", value: 0, revenue: 0 },
    { period: "4월", segment: "광고", value: 0, revenue: 0 }
  ]),
  sparse: createQaPreview("qa-line-sparse", "qa-line-sparse.xlsx", "line-sparse", [
    { period: "1월", segment: "광고", value: 510, revenue: 7700 },
    { period: "4월", segment: "광고", value: 560, revenue: 8120 }
  ]),
  extreme: createQaPreview("qa-line-extreme", "qa-line-extreme.xlsx", "line-extreme", [
    { period: "2026년 1월 첫째 주", segment: "광고", value: 18, revenue: 240 },
    { period: "2026년 1월 첫째 주", segment: "자연 유입", value: 24, revenue: 360 },
    { period: "2026년 1월 첫째 주", segment: "브랜드 검색", value: 14, revenue: 210 },
    { period: "2026년 1월 첫째 주", segment: "CRM 재방문", value: 220, revenue: 3300 },
    { period: "2026년 1월 첫째 주", segment: "파트너십 리퍼럴 채널", value: 3200, revenue: 47200 },
    { period: "2026년 2월 둘째 주", segment: "광고", value: 16, revenue: 220 },
    { period: "2026년 2월 둘째 주", segment: "자연 유입", value: 28, revenue: 410 },
    { period: "2026년 2월 둘째 주", segment: "브랜드 검색", value: 18, revenue: 260 },
    { period: "2026년 2월 둘째 주", segment: "CRM 재방문", value: 260, revenue: 3950 },
    { period: "2026년 2월 둘째 주", segment: "파트너십 리퍼럴 채널", value: 5400, revenue: 79800 },
    { period: "2026년 3월 셋째 주", segment: "광고", value: 22, revenue: 300 },
    { period: "2026년 3월 셋째 주", segment: "자연 유입", value: 26, revenue: 390 },
    { period: "2026년 3월 셋째 주", segment: "브랜드 검색", value: 21, revenue: 320 },
    { period: "2026년 3월 셋째 주", segment: "CRM 재방문", value: 310, revenue: 4600 },
    { period: "2026년 3월 셋째 주", segment: "파트너십 리퍼럴 채널", value: 8700, revenue: 129000 },
    { period: "2026년 4월 넷째 주", segment: "광고", value: 19, revenue: 280 },
    { period: "2026년 4월 넷째 주", segment: "자연 유입", value: 31, revenue: 470 },
    { period: "2026년 4월 넷째 주", segment: "브랜드 검색", value: 23, revenue: 340 },
    { period: "2026년 4월 넷째 주", segment: "CRM 재방문", value: 360, revenue: 5300 },
    { period: "2026년 4월 넷째 주", segment: "파트너십 리퍼럴 채널", value: 12300, revenue: 181000 }
  ])
};

const barQaSamples: Record<PreviewQaState, DatasetPreview> = {
  balanced: createQaPreview("qa-bar-balanced", "qa-bar-balanced.xlsx", "bar-balanced", [
    { period: "1분기", segment: "신규 회원", value: 420, revenue: 6200 },
    { period: "2분기", segment: "신규 회원", value: 510, revenue: 7600 },
    { period: "1분기", segment: "활성 고객", value: 690, revenue: 10400 },
    { period: "2분기", segment: "활성 고객", value: 760, revenue: 11300 },
    { period: "1분기", segment: "재구매 고객", value: 280, revenue: 5100 },
    { period: "2분기", segment: "재구매 고객", value: 360, revenue: 6500 },
    { period: "1분기", segment: "휴면 복귀", value: 130, revenue: 2200 },
    { period: "2분기", segment: "휴면 복귀", value: 175, revenue: 2920 }
  ]),
  empty: createQaPreview("qa-bar-empty", "qa-bar-empty.xlsx", "bar-empty", [
    { period: "1분기", segment: "신규 회원", value: 0, revenue: 0 },
    { period: "2분기", segment: "신규 회원", value: 0, revenue: 0 },
    { period: "1분기", segment: "활성 고객", value: 0, revenue: 0 },
    { period: "2분기", segment: "활성 고객", value: 0, revenue: 0 }
  ]),
  sparse: createQaPreview("qa-bar-sparse", "qa-bar-sparse.xlsx", "bar-sparse", [
    { period: "1분기", segment: "핵심 고객", value: 280, revenue: 4300 },
    { period: "2분기", segment: "핵심 고객", value: 330, revenue: 5010 }
  ]),
  extreme: createQaPreview("qa-bar-extreme", "qa-bar-extreme.xlsx", "bar-extreme", [
    { period: "1분기", segment: "장기 유지 고객군", value: 120, revenue: 1800 },
    { period: "2분기", segment: "장기 유지 고객군", value: 160, revenue: 2450 },
    { period: "3분기", segment: "장기 유지 고객군", value: 220, revenue: 3300 },
    { period: "4분기", segment: "장기 유지 고객군", value: 310, revenue: 4690 },
    { period: "1분기", segment: "가격 민감 고위험 이탈군", value: 18, revenue: 260 },
    { period: "2분기", segment: "가격 민감 고위험 이탈군", value: 24, revenue: 350 },
    { period: "3분기", segment: "가격 민감 고위험 이탈군", value: 35, revenue: 520 },
    { period: "4분기", segment: "가격 민감 고위험 이탈군", value: 42, revenue: 640 },
    { period: "1분기", segment: "프리미엄 업셀 전환 후보", value: 980, revenue: 15200 },
    { period: "2분기", segment: "프리미엄 업셀 전환 후보", value: 1240, revenue: 18800 },
    { period: "3분기", segment: "프리미엄 업셀 전환 후보", value: 1500, revenue: 22600 },
    { period: "4분기", segment: "프리미엄 업셀 전환 후보", value: 1780, revenue: 26900 },
    { period: "1분기", segment: "오프라인 행사 유입 리드", value: 88, revenue: 1350 },
    { period: "2분기", segment: "오프라인 행사 유입 리드", value: 130, revenue: 1980 },
    { period: "3분기", segment: "오프라인 행사 유입 리드", value: 210, revenue: 3150 },
    { period: "4분기", segment: "오프라인 행사 유입 리드", value: 280, revenue: 4200 },
    { period: "1분기", segment: "셀프서브 체험판 사용자", value: 12, revenue: 180 },
    { period: "2분기", segment: "셀프서브 체험판 사용자", value: 14, revenue: 210 },
    { period: "3분기", segment: "셀프서브 체험판 사용자", value: 17, revenue: 260 },
    { period: "4분기", segment: "셀프서브 체험판 사용자", value: 20, revenue: 300 },
    { period: "1분기", segment: "지역 파트너 재판매 파이프라인", value: 460, revenue: 6900 },
    { period: "2분기", segment: "지역 파트너 재판매 파이프라인", value: 740, revenue: 11100 },
    { period: "3분기", segment: "지역 파트너 재판매 파이프라인", value: 980, revenue: 14700 },
    { period: "4분기", segment: "지역 파트너 재판매 파이프라인", value: 1320, revenue: 19800 }
  ])
};

const donutQaSamples: Record<PreviewQaState, DatasetPreview> = {
  balanced: createQaPreview("qa-donut-balanced", "qa-donut-balanced.xlsx", "donut-balanced", [
    { period: "2026 상반기", segment: "광고", value: 420, revenue: 6200 },
    { period: "2026 상반기", segment: "자연 유입", value: 310, revenue: 4600 },
    { period: "2026 상반기", segment: "추천", value: 190, revenue: 2900 },
    { period: "2026 상반기", segment: "브랜드 검색", value: 160, revenue: 2440 },
    { period: "2026 상반기", segment: "행사", value: 110, revenue: 1700 }
  ]),
  empty: createQaPreview("qa-donut-empty", "qa-donut-empty.xlsx", "donut-empty", [
    { period: "2026 상반기", segment: "광고", value: 0, revenue: 0 },
    { period: "2026 상반기", segment: "자연 유입", value: 0, revenue: 0 },
    { period: "2026 상반기", segment: "추천", value: 0, revenue: 0 }
  ]),
  sparse: createQaPreview("qa-donut-sparse", "qa-donut-sparse.xlsx", "donut-sparse", [
    { period: "2026 상반기", segment: "광고", value: 520, revenue: 7800 },
    { period: "2026 상반기", segment: "자연 유입", value: 460, revenue: 6900 }
  ]),
  extreme: createQaPreview("qa-donut-extreme", "qa-donut-extreme.xlsx", "donut-extreme", [
    { period: "2026 상반기", segment: "브랜드 인지도 캠페인", value: 12200, revenue: 182000 },
    { period: "2026 상반기", segment: "검색 광고", value: 740, revenue: 11000 },
    { period: "2026 상반기", segment: "콘텐츠 제휴", value: 520, revenue: 7800 },
    { period: "2026 상반기", segment: "뉴스레터 재유입", value: 420, revenue: 6400 },
    { period: "2026 상반기", segment: "오프라인 행사 부스 방문", value: 280, revenue: 4300 },
    { period: "2026 상반기", segment: "인플루언서 공동 세션", value: 190, revenue: 2950 },
    { period: "2026 상반기", segment: "장기 제휴 리퍼럴 프로그램", value: 150, revenue: 2400 },
    { period: "2026 상반기", segment: "가격 비교 플랫폼", value: 120, revenue: 1850 },
    { period: "2026 상반기", segment: "파트너 온보딩 키트", value: 94, revenue: 1490 },
    { period: "2026 상반기", segment: "기타 직접 입력", value: 58, revenue: 940 }
  ])
};

const racingQaSamples: Record<PreviewQaState, DatasetPreview> = {
  balanced: createQaPreview("qa-racing-balanced", "qa-racing-balanced.xlsx", "racing-balanced", [
    { period: "현재", segment: "서울", value: 880, revenue: 13200 },
    { period: "현재", segment: "부산", value: 760, revenue: 11400 },
    { period: "현재", segment: "대구", value: 650, revenue: 9750 },
    { period: "현재", segment: "인천", value: 580, revenue: 8700 },
    { period: "현재", segment: "광주", value: 440, revenue: 6600 }
  ]),
  empty: createQaPreview("qa-racing-empty", "qa-racing-empty.xlsx", "racing-empty", [
    { period: "현재", segment: "서울", value: 0, revenue: 0 },
    { period: "현재", segment: "부산", value: 0, revenue: 0 },
    { period: "현재", segment: "대구", value: 0, revenue: 0 }
  ]),
  sparse: createQaPreview("qa-racing-sparse", "qa-racing-sparse.xlsx", "racing-sparse", [
    { period: "현재", segment: "서울", value: 620, revenue: 9300 },
    { period: "현재", segment: "부산", value: 540, revenue: 8110 }
  ]),
  extreme: createQaPreview("qa-racing-extreme", "qa-racing-extreme.xlsx", "racing-extreme", [
    { period: "현재", segment: "프리미엄 구독 확장 지역", value: 16400, revenue: 246000 },
    { period: "현재", segment: "수도권 테스트베드", value: 9200, revenue: 138000 },
    { period: "현재", segment: "장기 리텐션 회복 지역", value: 2480, revenue: 37200 },
    { period: "현재", segment: "신규 파트너 공동 영업권", value: 1320, revenue: 19800 },
    { period: "현재", segment: "오프라인 세미나 후속 전환군", value: 640, revenue: 9700 },
    { period: "현재", segment: "앱스토어 자연 유입", value: 320, revenue: 4880 },
    { period: "현재", segment: "직접 입력 기타 지역", value: 180, revenue: 2760 },
    { period: "현재", segment: "가격 민감 재활성 구간", value: 74, revenue: 1090 },
    { period: "현재", segment: "파일럿 운영 지역", value: 22, revenue: 340 }
  ])
};

export const previewQaStateLabelMap: Record<PreviewQaState, string> = {
  balanced: "Balanced",
  empty: "Empty",
  sparse: "Sparse",
  extreme: "Extreme"
};

export const previewQaDatasetMap: Record<EditorChartType, Record<PreviewQaState, DatasetPreview>> = {
  line: lineQaSamples,
  bar: barQaSamples,
  donut: donutQaSamples,
  "racing-bar": racingQaSamples
};

export const mockProjects: ProjectSummary[] = sortProjectsByUpdatedAt([
  {
    id: "proj_q1-growth",
    name: "1분기 성장 흐름",
    chartType: "line",
    datasetName: "growth-q1.xlsx",
    updatedAt: "2026-04-23T09:15:00.000Z",
    saveState: "saved"
  },
  {
    id: "proj_channel-mix",
    name: "유입 채널 비중",
    chartType: "donut",
    datasetName: "channel_mix.csv",
    updatedAt: "2026-04-22T16:40:00.000Z",
    saveState: "unsaved"
  },
  {
    id: "proj_pipeline-health",
    name: "캠페인 성과 비교",
    chartType: "bar",
    datasetName: "pipeline_health.xlsx",
    updatedAt: "2026-04-21T11:05:00.000Z",
    saveState: "draft"
  }
]);

export const mockEditorSession: EditorSessionPayload = {
  project: {
    id: "proj_q1-growth",
    name: "1분기 성장 흐름",
    updatedAt: "2026-04-23T09:15:00.000Z"
  },
  dataset: mockDatasetPreview,
  visualization: {
    id: "viz_q1-growth",
    chartType: "line",
    title: "월별 가입자 증가 흐름",
    config: createPlaceholderVisualizationConfig("line"),
    updatedAt: "2026-04-23T09:15:00.000Z"
  }
};
