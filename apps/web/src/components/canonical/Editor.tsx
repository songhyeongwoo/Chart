"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { PALETTES, type PaletteKey } from "./Charts";
import { CanonicalPreviewChart } from "./CanonicalPreviewChart";
import type { CanonicalEditorSnapshot } from "./canonical-snapshot-adapters";
import {
  isCanonicalChartType,
  type CanonicalAllChartType as AllChartType,
  type CanonicalChartType as ChartType,
  type CanonicalColorMode as ColorMode,
  type CanonicalEditorTab as EditorTab,
} from "./editor-adapters";
import { useCanonicalChartControlsState, type CanonicalChartControls } from "./useCanonicalChartControlsState";
import { useCanonicalDatasetState, type CanonicalDatasetState } from "./useCanonicalDatasetState";
import { useCanonicalEditorDraftState } from "./useCanonicalEditorDraftState";
import { useCanonicalEditorSnapshotState } from "./useCanonicalEditorSnapshotState";
import { useCanonicalEditorViewState } from "./useCanonicalEditorViewState";
import { useCanonicalFieldMappingState, type CanonicalFieldMappingState } from "./useCanonicalFieldMappingState";
import { ChevronLeft, Save, Play, Pause, Undo2, Redo2, Sparkles, ChevronDown, Share2, Plus, X, Type, Table, Layers, Palette, Axis3D, Grid3x3, Tag as TagIcon, Layout, Download, Eye, Check, ArrowRight, LayoutGrid, Search, Filter, AlertTriangle, RefreshCw, Wand2 } from "lucide-react";

const PRIMARY_CHARTS: { k: ChartType; l: string }[] = [
  { k: "bar", l: "막대" }, { k: "line", l: "선" }, { k: "donut", l: "도넛" }, { k: "race", l: "레이싱" },
];

const CHART_GALLERY: { group: string; items: { k: AllChartType; l: string; soon?: boolean }[] }[] = [
  { group: "비교",        items: [{ k: "bar", l: "막대" }, { k: "donut", l: "도넛" }, { k: "pie", l: "파이", soon: true }] },
  { group: "추이",        items: [{ k: "line", l: "선" }, { k: "area", l: "영역", soon: true }, { k: "timeline", l: "타임라인", soon: true }] },
  { group: "구성",        items: [{ k: "donut", l: "도넛" }, { k: "pie", l: "파이", soon: true }] },
  { group: "분포",        items: [{ k: "scatter", l: "산점도", soon: true }, { k: "heatmap", l: "히트맵", soon: true }] },
  { group: "지도",        items: [{ k: "map", l: "지도", soon: true }] },
  { group: "순위 · 애니메이션", items: [{ k: "race", l: "레이싱 바" }] },
  { group: "표 · 지표",    items: [{ k: "table", l: "표", soon: true }, { k: "metric", l: "카드 지표", soon: true }] },
];

export function Editor({ onBack, tab = "edit", onTabChange, projectId }: { onBack: () => void; tab?: EditorTab; onTabChange?: (t: EditorTab) => void; projectId?: string }) {
  const projectKey = projectId ?? "demo-project";
  const setTab = (t: EditorTab) => onTabChange?.(t);
  const {
    chart,
    setChart,
    title,
    subtitle,
    caption,
    draftSnapshot,
    applyDraftSnapshot,
  } = useCanonicalEditorDraftState();
  const datasetState = useCanonicalDatasetState();
  const fieldMapping = useCanonicalFieldMappingState(datasetState.parsedDataset);
  const chartControls = useCanonicalChartControlsState();
  const {
    exportOpen,
    setExportOpen,
    recOpen,
    setRecOpen,
    uploadOpen,
    setUploadOpen,
    galleryOpen,
    setGalleryOpen,
    colorMode,
    setColorMode,
    palette,
    setPalette,
    singleColor,
    setSingleColor,
    highlight,
    setHighlight,
    opacity,
    setOpacity,
    darkCanvas,
    setDarkCanvas,
    showKPI,
    setShowKPI,
    raceYear,
    setRaceYear,
    racePlaying,
    setRacePlaying,
    viewSnapshot,
    applyViewSnapshot,
  } = useCanonicalEditorViewState();
  const currentSnapshot = useMemo<CanonicalEditorSnapshot>(() => ({
    version: 1,
    projectId: projectKey,
    draft: draftSnapshot,
    view: viewSnapshot,
    fieldMapping: fieldMapping.fieldMappingSnapshot,
    chartControls: chartControls.chartControlsSnapshot,
    dataset: datasetState.datasetSnapshot,
  }), [
    projectKey,
    draftSnapshot,
    viewSnapshot,
    fieldMapping.fieldMappingSnapshot,
    chartControls.chartControlsSnapshot,
    datasetState.datasetSnapshot,
  ]);
  const applySnapshot = useCallback((snapshot: CanonicalEditorSnapshot) => {
    datasetState.applyDatasetSnapshot(snapshot.dataset);
    applyDraftSnapshot(snapshot.draft);
    applyViewSnapshot(snapshot.view);
    fieldMapping.applyFieldMappingSnapshot(snapshot.fieldMapping);
    chartControls.applyChartControlsSnapshot(snapshot.chartControls);
  }, [datasetState, applyDraftSnapshot, applyViewSnapshot, fieldMapping, chartControls]);
  const snapshotState = useCanonicalEditorSnapshotState({
    projectId: projectKey,
    currentSnapshot,
    applySnapshot,
  });

  return (
    <div className="h-screen bg-[#F2F2EE] text-[#0B0D14] flex flex-col overflow-hidden font-display">
      {/* Top bar */}
      <header className="h-[52px] shrink-0 bg-[#0B0D14] text-white flex items-center px-4 gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center"><ChevronLeft size={16} /></button>
        <div className="scale-90 origin-left"><Logo dark /></div>
        <div className="w-px h-5 bg-white/10 mx-1" />
        <div className="flex items-center gap-1.5 text-[12px]">
          <span className="text-white/50">매출 리포트</span>
          <span className="text-white/30">/</span>
          <span style={{ fontWeight: 500 }}>2026 Q1 지역별 매출</span>
          <span className="ml-2 inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 rounded bg-white/10 text-white/70"><span className="w-1 h-1 rounded-full" style={{ background: snapshotState.hasUnsavedChanges ? "#F2B705" : "#65C466" }} />{snapshotState.savedLabel}</span>
        </div>

        <nav className="mx-auto flex items-center gap-1 bg-white/[0.07] rounded-full p-1">
          {[
            { k: "recommend", l: "추천 차트" },
            { k: "edit", l: "상세 편집" },
            { k: "data", l: "데이터 수정" },
          ].map((t) => (
            <button key={t.k} onClick={() => { setTab(t.k as any); if (t.k === "recommend") setRecOpen(true); }}
              className={`h-7 px-3.5 rounded-full text-[11.5px] ${tab === t.k ? "bg-white text-[#0B0D14]" : "text-white/70 hover:text-white"}`}>{t.l}</button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button onClick={snapshotState.resetSnapshot} className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center"><Undo2 size={14} /></button>
          <button className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center"><Redo2 size={14} /></button>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <button onClick={() => setRecOpen(true)} className="h-8 px-3 rounded-md text-[11.5px] text-white/80 hover:bg-white/10 inline-flex items-center gap-1.5"><Sparkles size={12} className="text-[#FF6A3D]" /> 차트 추천</button>
          <button onClick={snapshotState.saveSnapshot} className="h-8 px-3 rounded-md text-[11.5px] text-white/80 hover:bg-white/10 inline-flex items-center gap-1.5"><Save size={12} /> 저장</button>
          <div className="relative">
            <button onClick={() => setExportOpen((v) => !v)} className="h-8 pl-3.5 pr-3 rounded-md bg-white text-[#0B0D14] text-[11.5px] inline-flex items-center gap-1.5" style={{ fontWeight: 500 }}>
              내보내기 <ChevronDown size={12} />
            </button>
            {exportOpen && <ExportMenu chart={chart} onClose={() => setExportOpen(false)} />}
          </div>
          <button className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center"><Share2 size={13} /></button>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <div className="flex -space-x-1.5">
            {[{l:"김",c:"#1F3FFF"},{l:"이",c:"#FF6A3D"},{l:"박",c:"#25A18E"}].map((a) => (
              <div key={a.l} className="w-6 h-6 rounded-full border-2 border-[#0B0D14] text-[9px] flex items-center justify-center text-white" style={{ background: a.c, fontWeight: 500 }}>{a.l}</div>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* Left rail */}
        <aside className="w-[232px] shrink-0 bg-[#13151C] text-white/85 border-r border-white/[0.04] overflow-y-auto">
          <div className="p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 px-1 mb-2">데이터셋</div>
            <div className="rounded-lg bg-white/[0.05] border border-white/[0.06] px-3 py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Table size={11} className="text-[#FF6A3D] shrink-0" />
                  <span className="text-[11.5px] truncate" style={{ fontWeight: 500 }}>{fieldMapping.sourceFilename}</span>
                </div>
                <span className="text-[9px] text-white/40 font-mono-num">124KB</span>
              </div>
              <div className="text-[10px] text-white/50 mt-1 font-mono-num">{fieldMapping.rowCount}행 · {fieldMapping.columnCount}열 · UTF-8</div>
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1F3FFF] text-white">연결됨</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/70">미리보기</span>
              </div>
            </div>
            <button onClick={() => setUploadOpen(true)} className="mt-2 w-full h-8 rounded-lg border border-dashed border-white/15 text-[11px] text-white/60 hover:bg-white/[0.04] inline-flex items-center justify-center gap-1.5">
              <Plus size={12} /> 다른 데이터 가져오기
            </button>
          </div>

          <div className="px-4 py-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 px-1 mb-2">페이지</div>
            {[
              { t: "지역별 매출", s: "막대", active: true, n: 1 },
              { t: "월별 추이", s: "선", n: 2 },
              { t: "카테고리 비중", s: "도넛", n: 3 },
              { t: "기업 순위 레이스", s: "레이싱", n: 4 },
            ].map((p) => (
              <div key={p.t} className={`group flex items-center gap-2 px-2 py-1.5 rounded-md mb-0.5 ${p.active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}>
                <span className="w-4 h-4 rounded-sm bg-white/10 text-[8.5px] font-mono-num flex items-center justify-center text-white/70">{p.n}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-[11.5px] truncate ${p.active ? "text-white" : "text-white/75"}`} style={{ fontWeight: p.active ? 500 : 400 }}>{p.t}</div>
                  <div className="text-[9px] text-white/40 truncate">{p.s}</div>
                </div>
              </div>
            ))}
            <button className="mt-1 w-full h-7 rounded-md text-[10.5px] text-white/50 hover:bg-white/[0.04] inline-flex items-center justify-center gap-1"><Plus size={10} /> 페이지 추가</button>
          </div>

          <div className="px-4 py-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 px-1 mb-2">열</div>
            <div className="space-y-0.5 text-[11px]">
              {[
                { n: "지역", t: "범주", c: "#8AB4FF", a: true },
                { n: "월", t: "날짜", c: "#E2A56B" },
                { n: "매출", t: "숫자", c: "#7CD1A5", a: true },
                { n: "전년 매출", t: "숫자", c: "#7CD1A5" },
                { n: "성장률", t: "숫자", c: "#7CD1A5" },
                { n: "카테고리", t: "범주", c: "#8AB4FF" },
                { n: "브랜드", t: "범주", c: "#8AB4FF" },
              ].map((f) => (
                <div key={f.n} className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${f.a ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"}`}>
                  <span className="w-1 h-3.5 rounded-full" style={{ background: f.c }} />
                  <div className="flex-1 min-w-0 text-[10.5px] text-white/85 truncate">{f.n}</div>
                  <span className="text-[8.5px] text-white/40">{f.t}</span>
                  {f.a && <span className="w-1.5 h-1.5 rounded-full bg-[#65C466]" />}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {tab === "data" ? <DataEditor onApply={() => setTab("edit")} fieldMapping={fieldMapping} /> : <>
        {/* Canvas */}
        <section className="flex-1 min-w-0 relative overflow-hidden flex flex-col" style={{ backgroundColor: "#F2F2EE" }}>
          {/* Sub toolbar */}
          <div className="h-[44px] shrink-0 px-5 flex items-center gap-2.5 border-b border-black/[0.06] bg-white">
            <div className="flex items-center gap-0.5 rounded-md bg-[#F3F4F7] p-0.5">
              {PRIMARY_CHARTS.map((c) => (
                <button key={c.k} onClick={() => setChart(c.k)} className={`h-7 px-2.5 rounded text-[10.5px] inline-flex items-center gap-1.5 ${chart === c.k ? "bg-white text-[#0B0D14] shadow-sm" : "text-[#5B6173] hover:text-[#0B0D14]"}`} style={{ fontWeight: chart === c.k ? 500 : 400 }}>
                  <ChartGlyph t={c.k} active={chart === c.k} />{c.l}
                </button>
              ))}
              <button onClick={() => setGalleryOpen(true)} className="h-7 px-2.5 rounded text-[10.5px] text-[#5B6173] hover:text-[#0B0D14] inline-flex items-center gap-1.5"><LayoutGrid size={11} /> 더 많은 차트</button>
            </div>
            <div className="w-px h-5 bg-black/10" />
            <select className="h-7 px-2 text-[10.5px] bg-white border border-black/[0.08] rounded-md text-[#3D4253]">
              <option>프레젠테이션 16:9</option><option>정사각형 1:1</option><option>세로 4:5</option><option>A4 가로</option>
            </select>
            <span className="text-[10.5px] text-[#5B6173] font-mono-num">1280 × 720</span>
            <div className="w-px h-5 bg-black/10" />
            <button onClick={() => setDarkCanvas(!darkCanvas)} className={`h-7 px-2.5 rounded-md text-[10.5px] ${darkCanvas ? "bg-[#0B0D14] text-white" : "text-[#3D4253] hover:bg-black/[0.04]"}`}>어두운 배경</button>
            <div className="ml-auto flex items-center gap-1.5 text-[10.5px] text-[#5B6173]">
              <button className="h-7 w-7 rounded hover:bg-black/[0.04] flex items-center justify-center"><Eye size={12} /></button>
              <div className="flex items-center rounded-md bg-white border border-black/[0.08]">
                <button className="h-7 w-7 text-[#5B6173]">−</button>
                <span className="px-1 font-mono-num text-[#0B0D14]">100%</span>
                <button className="h-7 w-7 text-[#5B6173]">+</button>
              </div>
              {chart === "race" && (
                <>
                  <div className="w-px h-5 bg-black/10" />
                  <button onClick={() => setRacePlaying(!racePlaying)} className="h-7 px-2.5 rounded-md bg-[#0B0D14] text-white text-[10.5px] inline-flex items-center gap-1.5">
                    {racePlaying ? <><Pause size={10} /> 정지</> : <><Play size={10} /> 재생</>}
                  </button>
                  <span className="font-mono-num text-[10.5px] text-[#0B0D14]">{raceYear}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto p-6 flex items-start justify-center">
            <CanvasCard
              chart={chart}
              title={title}
              subtitle={subtitle}
              caption={caption}
              palette={colorMode === "single" ? [singleColor, highlight, singleColor, highlight, singleColor] : PALETTES[palette].colors}
              fieldMapping={fieldMapping}
              chartControls={chartControls}
              colorMode={colorMode}
              singleColor={singleColor}
              highlight={highlight}
              opacity={opacity}
              dark={darkCanvas} showKPI={showKPI} year={raceYear}
              racePlaying={racePlaying}
            />
          </div>

          {chart === "race" && (
            <div className="px-6 pb-3">
              <div className="mx-auto max-w-[1000px] rounded-lg bg-white border border-black/[0.06] px-4 py-2.5 flex items-center gap-3">
                <button onClick={() => setRacePlaying(!racePlaying)} className="w-8 h-8 rounded-full bg-[#0B0D14] text-white flex items-center justify-center">
                  {racePlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>
                <div className="flex-1 relative h-1.5 rounded-full bg-[#E6E9F0]">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#0B0D14]" style={{ width: `${((raceYear - 2019) / 6) * 100}%` }} />
                  <input type="range" min={2019} max={2025} value={raceYear} onChange={(e) => setRaceYear(+e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="absolute -top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#0B0D14]" style={{ left: `calc(${((raceYear - 2019) / 6) * 100}% - 8px)` }} />
                  <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[9.5px] text-[#8A90A2] font-mono-num">
                    {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((y) => <span key={y} className={y === raceYear ? "text-[#0B0D14]" : ""} style={{ fontWeight: y === raceYear ? 600 : 400 }}>{y}</span>)}
                  </div>
                </div>
                <span className="text-[11px] text-[#0B0D14] font-mono-num ml-2" style={{ fontWeight: 500 }}>{raceYear}</span>
                <select className="h-7 text-[10.5px] bg-[#F3F4F7] rounded px-2 text-[#3D4253]"><option>1.0×</option><option>0.5×</option><option>2.0×</option></select>
              </div>
            </div>
          )}

          <div className="h-7 shrink-0 border-t border-black/[0.06] bg-white px-5 flex items-center text-[10px] text-[#5B6173] gap-4">
            <span className="font-mono-num">{fieldMapping.rowCount}행 · {fieldMapping.columnCount}열</span>
            <span className="w-px h-3 bg-black/10" />
            <span>팔레트 · {colorMode === "single" ? "단색" : PALETTES[palette].name}</span>
            <span className="w-px h-3 bg-black/10" />
            <span className="text-[#1F7A43]">● 연결됨</span>
            <span className="ml-auto font-mono-num">MAC Studio 1.3.0</span>
          </div>
        </section>

        {/* Inspector */}
        <aside className="w-[332px] shrink-0 bg-white border-l border-black/[0.06] overflow-y-auto">
          <Inspector
            chart={chart}
            title={title}
            subtitle={subtitle}
            caption={caption}
            fieldMapping={fieldMapping}
            chartControls={chartControls}
            colorMode={colorMode} setColorMode={setColorMode}
            palette={palette} setPalette={setPalette}
            singleColor={singleColor} setSingleColor={setSingleColor}
            highlight={highlight} setHighlight={setHighlight}
            opacity={opacity} setOpacity={setOpacity}
            showKPI={showKPI} setShowKPI={setShowKPI}
          />
        </aside>
        </>}
      </div>

      {uploadOpen && <UploadModal datasetState={datasetState} onClose={() => setUploadOpen(false)} onGoRecommend={() => { setUploadOpen(false); setRecOpen(true); }} />}
      {recOpen && <RecommendDrawer onClose={() => setRecOpen(false)} onPick={(c) => { setChart(c); setRecOpen(false); }} />}
      {galleryOpen && <ChartGallery onClose={() => setGalleryOpen(false)} onPick={(c) => { if (isCanonicalChartType(c)) setChart(c); setGalleryOpen(false); }} />}
    </div>
  );
}

/* ---------- Canvas ---------- */
function CanvasCard({
  chart,
  title,
  subtitle,
  caption,
  palette,
  fieldMapping,
  chartControls,
  colorMode,
  singleColor,
  highlight,
  opacity,
  dark,
  showKPI,
  year,
  racePlaying,
}: {
  chart: ChartType;
  title: string;
  subtitle: string;
  caption: string;
  palette: string[];
  fieldMapping: CanonicalFieldMappingState;
  chartControls: CanonicalChartControls;
  colorMode: ColorMode;
  singleColor: string;
  highlight: string;
  opacity: number;
  dark: boolean;
  showKPI: boolean;
  year: number;
  racePlaying: boolean;
}) {
  const titles = {
    bar: { kpi: "전년 대비 +12.4%" },
    line: { kpi: "피크 10월 · +38%" },
    donut: { kpi: "모바일 62.4%" },
    race: { kpi: `${year}년 기준` },
  }[chart];

  const bg = dark ? "#0B0D14" : "#fff";
  const fg = dark ? "#fff" : "#0B0D14";
  const sub = dark ? "rgba(255,255,255,0.6)" : "#8A90A2";

  return (
    <div className="w-full max-w-[1000px] rounded-xl border" style={{ background: bg, borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", boxShadow: "0 30px 60px -40px rgba(15,20,55,0.2)" }}>
      <div className="px-8 pt-7 pb-6">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-[10.5px] uppercase tracking-[0.14em]" style={{ color: sub }}>MAC Research · 2026년 1분기</div>
            <div className="mt-1.5" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.2, color: fg }}>{title}</div>
            <div className="mt-1 text-[11px]" style={{ color: sub }}>{subtitle}</div>
          </div>
          {showKPI && (
            <div className="text-right shrink-0 pl-4">
              <div className="text-[10px] uppercase tracking-[0.14em]" style={{ color: sub }}>핵심 지표</div>
              <div className="text-[15px] mt-0.5 font-mono-num" style={{ fontWeight: 600, color: "#25A18E" }}>{titles.kpi}</div>
            </div>
          )}
        </div>
        <div className="mt-5">
          <CanonicalPreviewChart
            chart={chart}
            title={title}
            subtitle={subtitle}
            caption={caption}
            fieldMapping={fieldMapping}
            chartControls={chartControls}
            palette={palette}
            colorMode={colorMode}
            singleColor={singleColor}
            highlight={highlight}
            opacity={opacity}
            darkCanvas={dark}
            showKPI={showKPI}
            raceYear={year}
            racePlaying={racePlaying}
          />
        </div>
        <div className="mt-4 pt-3 border-t flex items-center justify-between text-[10px]" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: sub }}>
          <span>출처 · {caption}</span>
          <span className="font-mono-num">made with MAC · 2026-04-24</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inspector ---------- */
type InspectorProps = {
  chart: ChartType;
  title: string;
  subtitle: string;
  caption: string;
  fieldMapping: CanonicalFieldMappingState;
  chartControls: CanonicalChartControls;
  colorMode: ColorMode; setColorMode: (c: ColorMode) => void;
  palette: PaletteKey; setPalette: (p: PaletteKey) => void;
  singleColor: string; setSingleColor: (v: string) => void;
  highlight: string; setHighlight: (v: string) => void;
  opacity: number; setOpacity: (v: number) => void;
  showKPI: boolean; setShowKPI: (v: boolean) => void;
};

function Inspector(p: InspectorProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({ title: true, data: true, type: true, color: true, options: true, labels: false, axis: false, legend: false, layout: false, export: false });
  const toggle = (k: string) => setOpen({ ...open, [k]: !open[k] });

  return (
    <div className="text-[#0B0D14]">
      <div className="px-5 pt-4 pb-3 border-b border-black/[0.06] sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2]">편집</div>
            <div className="mt-0.5 text-[14px]" style={{ fontWeight: 500 }}>
              {p.chart === "bar" ? "막대 차트" : p.chart === "line" ? "선 차트" : p.chart === "donut" ? "도넛 차트" : "레이싱 바"}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#F3F4F7] rounded-md p-0.5">
            <button className="h-6 px-2 rounded text-[10px] bg-white text-[#0B0D14]" style={{ fontWeight: 500 }}>디자인</button>
            <button className="h-6 px-2 rounded text-[10px] text-[#5B6173]">데이터</button>
          </div>
        </div>
      </div>

      <Acc icon={<Type size={12} />} title="제목 · 설명" open={open.title} onToggle={() => toggle("title")}>
        <Field label="제목" value={p.title} />
        <Field label="부제" value={p.subtitle.replace(" · 전년 동기 비교", "")} />
        <Field label="출처" value={p.caption.replace(", ", " · ")} mono />
        <Toggle label="핵심 지표 표시" on={p.showKPI} onChange={() => p.setShowKPI(!p.showKPI)} />
      </Acc>

      <Acc icon={<Layers size={12} />} title="데이터 연결" open={open.data} onToggle={() => toggle("data")}>
        <Mapping label="X축" field={p.fieldMapping.mappingColumns.x?.n ?? "지역"} type={p.fieldMapping.mappingColumns.x?.t ?? "범주"} count="8개" />
        <Mapping label="Y축" field={p.fieldMapping.mappingColumns.y?.n ?? "매출"} type={p.fieldMapping.mappingColumns.y?.t ?? "숫자"} count="0–100" />
        {p.chart === "bar" && <Mapping label="비교" field={p.fieldMapping.mappingColumns.comparison?.n ?? "전년 매출"} type={p.fieldMapping.mappingColumns.comparison?.t ?? "숫자"} />}
        {p.chart === "line" && <Mapping label="시리즈" field={p.fieldMapping.mappingColumns.color?.n ?? "카테고리"} type={p.fieldMapping.mappingColumns.color?.t ?? "범주"} count="3개" />}
        {p.chart === "race" && <Mapping label="시간 축" field="연도" type="날짜" count="2019–2025" />}
        <Mapping label="색상" field={p.fieldMapping.mappingColumns.color?.n ?? "카테고리"} type={p.fieldMapping.mappingColumns.color?.t ?? "범주"} />
        <button className="mt-2 w-full h-7 rounded-md border border-dashed border-black/15 text-[10.5px] text-[#5B6173] hover:bg-black/[0.03]">+ 열 추가</button>
      </Acc>

      <Acc icon={<Grid3x3 size={12} />} title="차트 유형" open={open.type} onToggle={() => toggle("type")}>
        <div className="grid grid-cols-4 gap-1.5">
          {PRIMARY_CHARTS.map((c) => (
            <div key={c.k} className={`h-14 rounded-md flex flex-col items-center justify-center gap-1 text-[10px] border ${p.chart === c.k ? "bg-[#0B0D14] text-white border-[#0B0D14]" : "bg-white text-[#5B6173] border-black/10 hover:border-black/25"}`}>
              <ChartGlyph t={c.k} active={p.chart === c.k} />
              <span>{c.l}</span>
            </div>
          ))}
        </div>
        <button className="mt-2 w-full h-8 rounded-md border border-black/10 text-[10.5px] text-[#3D4253] inline-flex items-center justify-center gap-1.5 hover:bg-black/[0.03]">
          <LayoutGrid size={11} /> 더 많은 차트 · 차트 갤러리
        </button>
      </Acc>

      <Acc icon={<Palette size={12} />} title="색상" open={open.color} onToggle={() => toggle("color")}>
        <ColorInspector {...p} />
      </Acc>

      <Acc icon={<Axis3D size={12} />} title={p.chart === "race" ? "레이싱 설정" : p.chart === "donut" ? "도넛 설정" : p.chart === "line" ? "선 설정" : "막대 설정"} open={open.options} onToggle={() => toggle("options")}>
        <ChartOptions chart={p.chart} controls={p.chartControls} />
      </Acc>

      <Acc icon={<TagIcon size={12} />} title="라벨" open={open.labels} onToggle={() => toggle("labels")}>
        <Row label="값 라벨" value={p.chartControls.labels.visibilityLabel} onClick={p.chartControls.cycleLabelMode} />
        <Row label="데이터 단위" value={p.chartControls.labels.formatLabel} onClick={p.chartControls.cycleLabelFormat} />
        <SlideRow label="라벨 크기" v={p.chartControls.labels.sizeRatio} value={p.chartControls.labels.sizeLabel} />
        <Toggle label="핵심 값만 강조" on={p.chartControls.labels.emphasizeKeyValues} onChange={p.chartControls.toggleKeyValueEmphasis} />
      </Acc>

      <Acc icon={<Grid3x3 size={12} />} title="축 · 그리드" open={open.axis} onToggle={() => toggle("axis")}>
        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "가로", value: "x" as const },
            { label: "세로", value: "y" as const },
            { label: "양쪽", value: "both" as const },
            { label: "없음", value: "none" as const },
          ].map((t) => <Seg key={t.label} active={p.chartControls.axes.orientation === t.value} onClick={() => p.chartControls.setAxisOrientation(t.value)}>{t.label}</Seg>)}
        </div>
        <Row label="Y축 범위" value="0 – 100" />
        <Row label="눈금 간격" value="25" />
        <Toggle label="X축 라벨 기울이기" on={p.chartControls.axes.rotateXLabels} onChange={p.chartControls.toggleRotateXLabels} />
      </Acc>

      <Acc icon={<Layout size={12} />} title="범례" open={open.legend} onToggle={() => toggle("legend")}>
        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "위", value: "top" as const },
            { label: "아래", value: "bottom" as const },
            { label: "오른쪽", value: "right" as const },
            { label: "없음", value: "none" as const },
          ].map((t) => <Seg key={t.label} active={t.value === "none" ? !p.chartControls.legend.show : p.chartControls.legend.show && p.chartControls.legend.position === t.value} onClick={() => p.chartControls.setLegendPosition(t.value)}>{t.label}</Seg>)}
        </div>
      </Acc>

      <Acc icon={<Layout size={12} />} title="레이아웃" open={open.layout} onToggle={() => toggle("layout")}>
        <Row label="여백" value={p.chartControls.layout.margin} onClick={p.chartControls.cycleMargin} />
        <Row label="캔버스 비율" value={p.chartControls.layout.aspectRatio.replace(":", " : ")} onClick={p.chartControls.cycleAspectRatio} />
      </Acc>

      <Acc icon={<Download size={12} />} title="내보내기" open={open.export} onToggle={() => toggle("export")} last>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {["PNG", "JPG", "SVG", "MP4"].map((f, i) => {
            const disabled = f === "MP4" && p.chart !== "race";
            return <button key={f} disabled={disabled} className={`h-8 rounded-md text-[10.5px] font-mono-num ${disabled ? "bg-[#F3F4F7] text-[#C7CAD2]" : i === 0 ? "bg-[#0B0D14] text-white" : "border border-black/10 text-[#3D4253]"}`}>{f}</button>;
          })}
        </div>
        <Toggle label="배경 투명" />
        <Row label="해상도" value="2× · 2560×1440" />
        <div className="text-[9.5px] text-[#8A90A2] mt-1.5">MP4·GIF는 애니메이션 차트 전용입니다.</div>
      </Acc>
    </div>
  );
}

/* ---------- Color Inspector ---------- */
function ColorInspector(p: InspectorProps) {
  const modes: { k: ColorMode; l: string }[] = [
    { k: "single", l: "단색" },
    { k: "category", l: "카테고리별" },
    { k: "sequential", l: "순차형" },
    { k: "highlight", l: "강조 색상" },
    { k: "custom", l: "직접 설정" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10.5px] text-[#5B6173]">색상 방식</span>
        <span className="text-[10px] text-[#0B0D14] px-2 py-0.5 rounded bg-[#F3F4F7]" style={{ fontWeight: 500 }}>{modes.find((m) => m.k === p.colorMode)?.l}</span>
      </div>
      <div className="grid grid-cols-5 gap-1 mb-3">
        {modes.map((m) => (
          <button key={m.k} onClick={() => p.setColorMode(m.k)} className={`h-7 rounded text-[10px] ${p.colorMode === m.k ? "bg-[#0B0D14] text-white" : "bg-[#F3F4F7] text-[#5B6173]"}`}>{m.l}</button>
        ))}
      </div>

      {p.colorMode === "single" ? (
        <SingleColorPanel c={p.singleColor} setC={p.setSingleColor} h={p.highlight} setH={p.setHighlight} o={p.opacity} setO={p.setOpacity} />
      ) : p.colorMode === "sequential" ? (
        <PalettePanel palette={p.palette} setPalette={p.setPalette} opacity={p.opacity} setOpacity={p.setOpacity} filter="advanced" />
      ) : (
        <PalettePanel palette={p.palette} setPalette={p.setPalette} opacity={p.opacity} setOpacity={p.setOpacity} filter="all" />
      )}

      <button className="mt-3 w-full h-8 rounded-md text-[10.5px] text-[#5B6173] border border-dashed border-black/15 hover:bg-black/[0.02] inline-flex items-center justify-center gap-1.5">
        고급 색상 설정 <ChevronDown size={10} />
      </button>
    </div>
  );
}

function SingleColorPanel({ c, setC, h, setH, o, setO }: { c: string; setC: (v: string) => void; h: string; setH: (v: string) => void; o: number; setO: (v: number) => void }) {
  return (
    <div className="rounded-lg border border-black/[0.06] p-3 bg-[#FBFBF8]">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] text-[#5B6173]">기본 색상</span>
        <ColorBox color={c} onChange={setC} />
      </div>
      <div className="my-3 border-t border-black/[0.05]" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10.5px] text-[#5B6173]">강조 색상 사용</span>
        <Toggle on onChange={() => {}} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] text-[#5B6173]">강조 색상</span>
        <ColorBox color={h} onChange={setH} />
      </div>
      <div className="mt-3 pt-3 border-t border-black/[0.05]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10.5px] text-[#5B6173]">투명도</span>
          <span className="text-[10.5px] font-mono-num">{Math.round(o * 100)}%</span>
        </div>
        <div className="relative h-1.5 rounded-full bg-[#EEF0F4]">
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${o * 100}%`, background: c }} />
          <input type="range" min={0} max={100} value={o * 100} onChange={(e) => setO(+e.target.value / 100)} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="absolute -top-1 w-3.5 h-3.5 rounded-full bg-white border-2" style={{ left: `calc(${o * 100}% - 7px)`, borderColor: c }} />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-black/[0.05]">
        <Toggle label="배경 투명" />
      </div>
    </div>
  );
}

function PalettePanel({ palette, setPalette, opacity, setOpacity, filter }: { palette: PaletteKey; setPalette: (p: PaletteKey) => void; opacity: number; setOpacity: (v: number) => void; filter: "all" | "advanced" }) {
  const groups: { t: string; key: "basic" | "report" | "mood" | "brand" | "advanced" }[] = filter === "advanced"
    ? [{ t: "순차형", key: "advanced" }]
    : [{ t: "기본", key: "basic" }, { t: "리포트", key: "report" }, { t: "분위기", key: "mood" }, { t: "브랜드", key: "brand" }];

  return (
    <div className="rounded-lg border border-black/[0.06] bg-[#FBFBF8] overflow-hidden">
      <div className="max-h-[320px] overflow-y-auto p-2">
        {groups.map((g) => {
          const items = (Object.keys(PALETTES) as PaletteKey[]).filter((k) => PALETTES[k].category === g.key);
          return (
            <div key={g.t} className="mb-2">
              <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] px-1.5 py-1">{g.t}</div>
              {items.map((k) => {
                const pp = PALETTES[k];
                const active = palette === k;
                return (
                  <button key={k} onClick={() => setPalette(k)} className={`w-full flex items-center gap-2 p-1.5 rounded-md text-left ${active ? "bg-white ring-1 ring-[#0B0D14]" : "hover:bg-white"}`}>
                    <div className="flex h-5 flex-1 rounded-sm overflow-hidden">
                      {pp.colors.slice(0, 6).map((c, i) => <span key={i} className="flex-1" style={{ background: c }} />)}
                    </div>
                    <span className="text-[10px] text-[#3D4253] w-20 truncate">{pp.name}</span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-[#0B0D14] text-white" : "border border-black/10"}`}>{active && <Check size={9} />}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="border-t border-black/[0.05] p-3">
        <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] mb-1.5">선택된 색상</div>
        <div className="flex items-center gap-1 mb-3">
          {PALETTES[palette].colors.map((c, i) => (
            <div key={i} className="flex-1 h-6 rounded border border-black/10 relative overflow-hidden" style={{ background: c }}>
              <span className="absolute bottom-0 left-0 right-0 text-[7.5px] text-white/95 text-center font-mono-num py-0.5 bg-black/30">{c.replace("#", "")}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10.5px] text-[#5B6173]">투명도</span>
          <span className="text-[10.5px] font-mono-num">{Math.round(opacity * 100)}%</span>
        </div>
        <div className="relative h-1.5 rounded-full bg-[#EEF0F4]">
          <div className="absolute inset-y-0 left-0 rounded-full bg-[#0B0D14]" style={{ width: `${opacity * 100}%` }} />
          <input type="range" min={0} max={100} value={opacity * 100} onChange={(e) => setOpacity(+e.target.value / 100)} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="absolute -top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0B0D14]" style={{ left: `calc(${opacity * 100}% - 7px)` }} />
        </div>
        <div className="mt-3 pt-3 border-t border-black/[0.05]">
          <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] mb-1.5">카테고리별 색상</div>
          {["서울", "경기", "부산", "인천", "대구"].map((r, i) => (
            <div key={r} className="flex items-center gap-2 py-1 text-[10.5px]">
              <span className="w-4 h-4 rounded" style={{ background: PALETTES[palette].colors[i % PALETTES[palette].colors.length] }} />
              <span className="flex-1 text-[#0B0D14]">{r}</span>
              <span className="text-[#8A90A2] font-mono-num">{PALETTES[palette].colors[i % PALETTES[palette].colors.length].toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorBox({ color, onChange }: { color: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5 h-7 pl-1 pr-2 rounded-md border border-black/[0.08] bg-white">
      <span className="w-5 h-5 rounded" style={{ background: color }} />
      <input value={color.toUpperCase()} onChange={(e) => onChange(e.target.value)} className="w-[70px] text-[10.5px] font-mono-num outline-none" />
    </div>
  );
}

/* ---------- Chart options (per type) ---------- */
function ChartOptions({ chart, controls }: { chart: ChartType; controls: CanonicalChartControls }) {
  if (chart === "bar") return (
    <div>
      <Row label="정렬" value={controls.data.sortLabel} onClick={controls.cycleSortMode} />
      <Row label="표시할 개수" value={`${controls.data.topN}개`} onClick={controls.incrementTopN} />
      <SlideRow label="막대 두께" v={0.68} value="68" />
      <SlideRow label="막대 간격" v={0.28} value="28" />
      <Toggle label="값 라벨" on={controls.labels.mode !== "hidden"} onChange={controls.toggleLabelVisibility} />
    </div>
  );
  if (chart === "line") return (
    <div>
      <SlideRow label="선 굵기" v={0.5} value="2.4" />
      <Toggle label="포인트 표시" on />
      <Toggle label="핵심 포인트 라벨" on={controls.labels.emphasizeKeyValues} onChange={controls.toggleKeyValueEmphasis} />
      <Row label="보간 방식" value="부드럽게" />
    </div>
  );
  if (chart === "donut") return (
    <div>
      <SlideRow label="조각 간격" v={0.2} value="1.2°" />
      <SlideRow label="중앙 공간" v={0.62} value="62%" />
      <Row label="값 표시" value="퍼센트" />
      <Row label="조각 라벨" value="5% 이상" />
    </div>
  );
  return (
    <div>
      <Row label="표시할 순위" value="10위까지" />
      <Row label="재생 속도" value="1.0× · 6초/년" />
      <Toggle label="타임라인 표시" on />
      <Toggle label="연도 표시" on />
      <Toggle label="막대 라벨" on />
      <Toggle label="값 라벨" on />
      <div className="mt-3 pt-3 border-t border-black/[0.05]">
        <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] mb-2">애니메이션 내보내기</div>
        <div className="grid grid-cols-2 gap-1.5">
          <button className="h-8 rounded-md bg-[#0B0D14] text-white text-[10.5px] font-mono-num">MP4</button>
          <button className="h-8 rounded-md border border-black/10 text-[#8A90A2] text-[10.5px] font-mono-num">GIF · 준비 중</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Primitives ---------- */
function Acc({ icon, title, open, onToggle, children, last }: { icon: React.ReactNode; title: string; open: boolean; onToggle: () => void; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`${last ? "" : "border-b border-black/[0.05]"}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-2 px-5 py-3">
        <span className="w-5 h-5 rounded bg-[#F3F4F7] flex items-center justify-center text-[#5B6173]">{icon}</span>
        <span className="flex-1 text-left text-[12px]" style={{ fontWeight: 500 }}>{title}</span>
        <ChevronDown size={12} className={`text-[#8A90A2] transition ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}
function Row({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[11px]">
      <span className="text-[#5B6173]">{label}</span>
      <button onClick={onClick} className="h-7 px-2 rounded-md border border-black/[0.08] bg-white text-[#0B0D14] inline-flex items-center gap-1 text-[10.5px]" style={{ fontWeight: 500 }}>{value} <ChevronDown size={9} /></button>
    </div>
  );
}
function SlideRow({ label, v, value }: { label: string; v: number; value: string }) {
  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-[#5B6173]">{label}</span>
        <span className="font-mono-num text-[10.5px] text-[#0B0D14]">{value}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-[#EEF0F4]">
        <div className="h-1.5 rounded-full bg-[#0B0D14]" style={{ width: `${v * 100}%` }} />
        <div className="absolute -top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0B0D14]" style={{ left: `calc(${v * 100}% - 7px)` }} />
      </div>
    </div>
  );
}
function Toggle({ label, on, onChange }: { label?: string; on?: boolean; onChange?: () => void }) {
  const body = (
    <button onClick={onChange} className={`w-8 h-4 rounded-full relative inline-block ${on ? "bg-[#0B0D14]" : "bg-[#D5D8DF]"}`}>
      <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition" style={{ left: on ? 18 : 2 }} />
    </button>
  );
  if (!label) return body;
  return <div className="flex items-center justify-between py-1.5 text-[11px]"><span className="text-[#5B6173]">{label}</span>{body}</div>;
}
function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="py-1">
      <div className="text-[10px] text-[#8A90A2] mb-1">{label}</div>
      <div className={`h-8 rounded-md border border-black/[0.08] bg-white px-2.5 flex items-center text-[#0B0D14] ${mono ? "font-mono-num text-[10.5px]" : "text-[11.5px]"}`} style={{ fontWeight: 500 }}>{value}</div>
    </div>
  );
}
function Mapping({ label, field, type, count }: { label: string; field: string; type: string; count?: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-10 text-[10.5px] text-[#8A90A2]">{label}</span>
      <div className="flex-1 h-8 rounded-md bg-[#F6F7F9] border border-black/[0.05] px-2 flex items-center gap-2">
        <span className="w-1 h-3.5 rounded-full bg-[#1F3FFF]" />
        <span className="text-[11px] text-[#0B0D14] truncate" style={{ fontWeight: 500 }}>{field}</span>
        <span className="ml-auto text-[9.5px] text-[#8A90A2]">{type}{count ? ` · ${count}` : ""}</span>
      </div>
    </div>
  );
}
function Seg({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick} className={`h-7 rounded text-[10.5px] ${active ? "bg-[#0B0D14] text-white" : "bg-[#F3F4F7] text-[#3D4253]"}`}>{children}</button>;
}
function ChartGlyph({ t, active }: { t: AllChartType; active: boolean }) {
  const c = active ? "#fff" : "#5B6173";
  if (t === "bar") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><rect x="0" y="5" width="2.4" height="5" /><rect x="3.8" y="2" width="2.4" height="8" /><rect x="7.6" y="4" width="2.4" height="6" /><rect x="11.4" y="0" width="2.4" height="10" /></svg>;
  if (t === "line") return <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 8 L4 4 L7 6 L10 2 L14 4" stroke={c} strokeWidth="1.4" fill="none" /></svg>;
  if (t === "donut" || t === "pie") return <svg width="12" height="10" viewBox="0 0 12 10"><circle cx="6" cy="5" r="4" stroke={c} strokeWidth={t === "pie" ? 4 : 2} fill="none" strokeDasharray="15 25" /></svg>;
  if (t === "race") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><rect x="0" y="0" width="11" height="2" /><rect x="0" y="4" width="8" height="2" /><rect x="0" y="8" width="5" height="2" /></svg>;
  if (t === "area") return <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 8 L4 4 L7 6 L10 2 L14 4 L14 10 L0 10 Z" fill={c} opacity="0.6" /></svg>;
  if (t === "scatter") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><circle cx="2" cy="7" r="1" /><circle cx="5" cy="4" r="1" /><circle cx="8" cy="6" r="1" /><circle cx="11" cy="2" r="1" /><circle cx="12" cy="8" r="1" /></svg>;
  if (t === "heatmap") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><rect x="0" y="0" width="3" height="3" opacity="0.4" /><rect x="4" y="0" width="3" height="3" opacity="0.7" /><rect x="8" y="0" width="3" height="3" opacity="0.3" /><rect x="0" y="4" width="3" height="3" opacity="0.9" /><rect x="4" y="4" width="3" height="3" opacity="0.5" /><rect x="8" y="4" width="3" height="3" opacity="0.8" /></svg>;
  if (t === "table") return <svg width="14" height="10" viewBox="0 0 14 10" stroke={c} strokeWidth="1" fill="none"><rect x="0" y="0" width="14" height="10" /><line x1="0" y1="3" x2="14" y2="3" /><line x1="5" y1="0" x2="5" y2="10" /></svg>;
  if (t === "map") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><path d="M2 1 L7 2 L12 1 L12 9 L7 8 L2 9 Z" opacity="0.6" /></svg>;
  if (t === "metric") return <svg width="14" height="10" viewBox="0 0 14 10" fill={c}><rect x="0" y="3" width="14" height="4" rx="1" /></svg>;
  return <svg width="14" height="10" viewBox="0 0 14 10"><path d="M0 5 L14 5" stroke={c} strokeWidth="1.4" /><circle cx="3" cy="5" r="1.5" fill={c} /><circle cx="10" cy="5" r="1.5" fill={c} /></svg>;
}

/* ---------- Overlays ---------- */
function ExportMenu({ chart, onClose }: { chart: ChartType; onClose: () => void }) {
  const images = [
    { f: "PNG", d: "고해상도 이미지 · 2×", primary: true },
    { f: "JPG", d: "웹용 · 품질 90" },
    { f: "SVG", d: "벡터 · 편집 가능" },
  ];
  const motion = [
    { f: "MP4", d: chart === "race" ? "1080p · 30fps" : "애니메이션 차트 전용", disabled: chart !== "race" },
    { f: "GIF", d: "준비 중", disabled: true },
  ];
  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute right-0 top-[40px] w-[320px] bg-white rounded-xl border border-black/10 overflow-hidden z-30 text-[#0B0D14]" style={{ boxShadow: "0 40px 100px -20px rgba(15,20,55,0.4)" }}>
        <div className="p-4 border-b border-black/[0.05]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[12.5px]" style={{ fontWeight: 500 }}>내보내기</div>
              <div className="text-[10.5px] text-[#8A90A2] mt-0.5">프레젠테이션 16:9 · 1280 × 720</div>
            </div>
            <div className="flex items-center gap-0.5 bg-[#F3F4F7] rounded p-0.5">
              {["1×", "2×", "3×"].map((s, i) => <button key={s} className={`h-5 px-1.5 rounded text-[9.5px] font-mono-num ${i === 1 ? "bg-white text-[#0B0D14]" : "text-[#5B6173]"}`}>{s}</button>)}
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] px-2 pt-1 pb-1">이미지</div>
          {images.map((f) => (
            <button key={f.f} className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-left hover:bg-[#F3F4F7]">
              <span className="w-9 h-9 rounded-md bg-[#0B0D14] text-white text-[10px] flex items-center justify-center font-mono-num" style={{ fontWeight: 500 }}>{f.f}</span>
              <div className="flex-1">
                <div className="text-[12px]" style={{ fontWeight: 500 }}>{f.f}로 내보내기</div>
                <div className="text-[10px] text-[#8A90A2]">{f.d}</div>
              </div>
              {f.primary && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EEF1FF] text-[#1F3FFF]">추천</span>}
            </button>
          ))}
          <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2] px-2 pt-3 pb-1">애니메이션</div>
          {motion.map((f) => (
            <button key={f.f} disabled={f.disabled} className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left ${f.disabled ? "opacity-50" : "hover:bg-[#F3F4F7]"}`}>
              <span className="w-9 h-9 rounded-md bg-[#0B0D14] text-white text-[10px] flex items-center justify-center font-mono-num">{f.f}</span>
              <div className="flex-1">
                <div className="text-[12px]" style={{ fontWeight: 500 }}>{f.f}로 내보내기</div>
                <div className="text-[10px] text-[#8A90A2]">{f.d}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="border-t border-black/[0.05] p-3 space-y-2">
          <Toggle label="배경 투명" />
          <Toggle label="그림자 포함" on />
          <Toggle label="워터마크" />
        </div>
      </div>
    </>
  );
}

function UploadModal({ datasetState, onClose, onGoRecommend }: { datasetState: CanonicalDatasetState; onClose: () => void; onGoRecommend: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parsedDataset = datasetState.parsedDataset;
  const previewColumns = parsedDataset?.columns.slice(0, 5).map((column) => [column.n, column.t]) ?? [["지역","범주"],["월","날짜"],["매출","숫자"],["전년","숫자"],["성장률","숫자"]];
  const previewRows = parsedDataset?.rows.slice(0, 3).map((row) => previewColumns.map(([column]) => String(row[column] ?? ""))) ?? [["서울", "1월", "92", "78", "+18%"], ["경기", "1월", "86", "70", "+22%"], ["부산", "1월", "78", "62", "+25%"]];
  const statusLabel = datasetState.status === "parsing"
    ? "분석 중"
    : datasetState.status === "ready"
      ? `${parsedDataset?.encoding ?? "UTF-8"} · ${parsedDataset?.rowCount ?? 0}행`
      : datasetState.status === "unsupported"
        ? "지원 대기"
        : datasetState.status === "error"
          ? "확인 필요"
          : "UTF-8 · 412행";
  const notice = datasetState.parseError ?? (parsedDataset ? `${parsedDataset.sourceFilename} · 로컬에서 ${parsedDataset.rowCount}행을 분석했습니다.` : "MAC은 개인정보가 포함된 데이터를 업로드하지 않도록 안내합니다.");
  const handleFile = (file: File | null | undefined) => {
    if (file) void datasetState.parseFile(file);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="w-[680px] bg-white rounded-2xl overflow-hidden font-display" style={{ boxShadow: "0 60px 120px -20px rgba(0,0,0,0.5)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-black/[0.06]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8A90A2]">01 · 데이터 가져오기</div>
            <div className="text-[16px] mt-1" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>파일을 올려 분석을 시작하세요</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-md hover:bg-black/[0.04] flex items-center justify-center"><X size={14} /></button>
        </div>

        <div className="grid grid-cols-[1fr_220px]">
          <div className="p-5">
            <div className="rounded-xl border-2 border-dashed border-[#0B0D14]/15 bg-gradient-to-b from-[#FBFBF8] to-white p-6 text-center" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}>
              <input ref={fileInputRef} type="file" accept=".csv,.tsv,.xlsx,.xls,text/csv,text/tab-separated-values" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              <div className="mx-auto w-10 h-10 rounded-full bg-[#1F3FFF] text-white flex items-center justify-center"><Plus size={16} /></div>
              <div className="mt-3 text-[13px]" style={{ fontWeight: 500 }}>파일을 여기에 끌어다 놓으세요</div>
              <div className="mt-1 text-[10.5px] text-[#8A90A2]">최대 20MB · CSV · XLSX · TSV · JSON</div>
              <button onClick={() => fileInputRef.current?.click()} className="mt-4 h-9 px-4 rounded-full bg-[#0B0D14] text-white text-[11.5px]" style={{ fontWeight: 500 }}>파일 선택</button>
            </div>

            <div className="mt-4 rounded-lg border border-black/[0.06] overflow-hidden">
              <div className="px-3 py-2 bg-[#F7F8FA] flex items-center justify-between text-[10.5px]">
                <span className="text-[#5B6173]">감지된 열 · {parsedDataset?.columnCount ?? 7}개</span>
                <span className="font-mono-num text-[#8A90A2]">{statusLabel}</span>
              </div>
              <table className="w-full text-[10.5px]">
                <thead className="text-[9.5px] text-[#8A90A2] bg-white">
                  <tr>{previewColumns.map(([c, tp]) => (
                    <th key={c} className="text-left px-2.5 py-1.5 font-normal border-t border-black/[0.05]">
                      {c}<span className="ml-1 text-[8.5px]" style={{ color: tp === "숫자" ? "#25A18E" : tp === "날짜" ? "#C2703A" : "#1F3FFF" }}>{tp}</span>
                    </th>
                  ))}</tr>
                </thead>
                <tbody className="font-mono-num text-[#0B0D14]">
                  {previewRows.map((row, i) => (
                    <tr key={i} className="border-t border-black/[0.04]">{row.map((v, j) => <td key={j} className="px-2.5 py-1.5">{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center gap-4 text-[10.5px]">
              <div className="flex items-center gap-2">
                <span className="text-[#5B6173]">인코딩</span>
                <div className="flex items-center rounded-md border border-black/10">
                  <button className="h-6 px-2 bg-[#0B0D14] text-white text-[9.5px] rounded-l">UTF-8</button>
                  <button className="h-6 px-2 text-[#5B6173] text-[9.5px]">EUC-KR</button>
                  <button className="h-6 px-2 text-[#5B6173] text-[9.5px] rounded-r">자동</button>
                </div>
              </div>
              <span className="text-[#5B6173]">첫 행을 헤더로 사용</span>
            </div>
          </div>

          <aside className="border-l border-black/[0.06] bg-[#FBFBF8] p-4">
            <div className="text-[10px] uppercase tracking-wider text-[#8A90A2] mb-2">샘플 데이터로 시작</div>
            <div className="space-y-1.5">
              {[{ t: "월별 매출", d: "12 × 5" }, { t: "제품별 점유율", d: "5 × 2" }, { t: "국가별 GDP", d: "20 × 3" }, { t: "시총 랭킹 7년", d: "15 × 8" }].map((s) => (
                <button key={s.t} className="w-full text-left p-2 rounded-md bg-white border border-black/[0.06] hover:border-black/20">
                  <div className="text-[11px]" style={{ fontWeight: 500 }}>{s.t}</div>
                  <div className="text-[9.5px] text-[#8A90A2] font-mono-num">{s.d}</div>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="p-4 border-t border-black/[0.06] flex items-center justify-between bg-[#FBFBF8]">
          <div className="text-[10.5px] text-[#5B6173]">{notice}</div>
          <button onClick={onGoRecommend} className="h-9 pl-4 pr-3 rounded-full bg-[#0B0D14] text-white text-[12px] inline-flex items-center gap-2" style={{ fontWeight: 500 }}>
            차트 추천 보기 <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RecommendDrawer({ onClose, onPick }: { onClose: () => void; onPick: (c: ChartType) => void }) {
  const router = useRouter();
  const recs: { c: ChartType; t: string; r: string; match: number; p: string[] }[] = [
    { c: "bar", t: "막대 차트", r: "범주별 값을 가장 명확하게 비교할 수 있습니다.", match: 96, p: PALETTES.basicBlue.colors },
    { c: "race", t: "레이싱 바", r: "시간에 따른 순위 변화를 강조해서 보여줍니다.", match: 88, p: PALETTES.sharpContrast.colors },
    { c: "line", t: "선 차트", r: "월·분기 추이가 있을 때 가장 유용합니다.", match: 74, p: PALETTES.softNavy.colors },
    { c: "donut", t: "도넛 차트", r: "전체 대비 비중을 단순하게 전달합니다.", match: 61, p: PALETTES.warmOrange.colors },
  ];
  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <aside className="absolute right-0 top-0 bottom-0 w-[460px] bg-white flex flex-col font-display" onClick={(e) => e.stopPropagation()} style={{ boxShadow: "-40px 0 80px -20px rgba(0,0,0,0.4)" }}>
        <div className="p-6 border-b border-black/[0.06] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#1F3FFF]"><Sparkles size={11} /> 추천 차트</div>
            <div className="mt-2 text-[18px]" style={{ fontWeight: 600, letterSpacing: "-0.025em" }}>데이터에 어울리는 차트</div>
            <div className="mt-1 text-[11.5px] text-[#5B6173]">sales_2026_q1 · 범주·숫자·시간 조합을 감지했습니다.</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-md hover:bg-black/[0.04] flex items-center justify-center"><X size={14} /></button>
        </div>

        <div className="px-6 py-3 border-b border-black/[0.05] flex items-center gap-2 text-[10.5px] text-[#5B6173]">
          <span className="px-2 py-1 rounded-full bg-[#F3F4F7]">범주 비교</span>
          <span className="px-2 py-1 rounded-full bg-[#F3F4F7]">시계열</span>
          <span className="px-2 py-1 rounded-full bg-[#F3F4F7]">순위 변화</span>
          <span className="ml-auto font-mono-num">{recs.length}개 추천</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {recs.map((r) => (
            <button key={r.c} onClick={() => onPick(r.c)} className="w-full text-left rounded-xl border border-black/[0.06] hover:border-[#0B0D14] p-4 transition group">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-lg bg-[#FBFBF8] border border-black/[0.05] flex items-center justify-center">
                  <ChartGlyph t={r.c} active={false} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[13.5px]" style={{ fontWeight: 500 }}>{r.t}</div>
                    <span className="text-[11px] font-mono-num text-[#1F3FFF]" style={{ fontWeight: 500 }}>추천 적합도 {r.match}%</span>
                  </div>
                  <div className="text-[11.5px] text-[#5B6173] mt-1">{r.r}</div>
                  <div className="mt-2 h-1 rounded-full bg-[#EEF0F4]"><div className="h-1 rounded-full bg-[#0B0D14]" style={{ width: `${r.match}%` }} /></div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-black/[0.04] flex items-center justify-between">
                <div className="flex gap-0.5 h-2 flex-1 rounded overflow-hidden">
                  {r.p.slice(0, 5).map((c, i) => <span key={i} className="flex-1" style={{ background: c }} />)}
                </div>
                <span className="ml-3 text-[10px] text-[#0B0D14] inline-flex items-center gap-1" style={{ fontWeight: 500 }}>이 차트로 편집하기 <ArrowRight size={11} /></span>
              </div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
          <span className="text-[10.5px] text-[#5B6173]">추천은 데이터 구조 분석에 기반합니다.</span>
          <button onClick={() => router.push("/gallery")} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-black/[0.08] text-[11px] text-[#0B0D14] hover:bg-black/[0.03]" style={{ fontWeight: 500 }}>
            <LayoutGrid size={11} /> 차트 갤러리에서 더 보기 <ArrowRight size={11} />
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ---------- Data Editor (데이터 수정) ---------- */
function DataEditor({ onApply, fieldMapping }: { onApply: () => void; fieldMapping: CanonicalFieldMappingState }) {
  const {
    columns,
    rows,
    columnHeaders: colHeaders,
    columnNameByDataKey: colNameMap,
    selectedCol,
    setSelectedCol,
    selectedCell,
    setSelectedCell,
    encoding,
    setEncoding,
    selectedColumn,
    missingValueCount,
    issueCount,
    mappingColumns,
    rowCount,
    columnCount,
    sourceFilename,
  } = fieldMapping;
  const gridTemplateColumns = `40px repeat(${columnCount}, minmax(0, 1fr))`;
  const remainingRowCount = Math.max(rowCount - rows.length, 0);
  const effectiveSelectedCol = columns.some((column) => column.n === selectedCol) ? selectedCol : selectedColumn.n;

  return (
    <>
      <section className="flex-1 min-w-0 flex flex-col bg-[#F4F5F2] overflow-hidden">
        {/* Sub toolbar */}
        <div className="h-[44px] shrink-0 px-5 flex items-center gap-2.5 border-b border-black/[0.06] bg-white">
          <div className="flex items-center gap-1.5 text-[11px] text-[#0B0D14]" style={{ fontWeight: 500 }}>
            <Table size={12} className="text-[#FF6A3D]" /> {sourceFilename}
            <span className="text-[#8A90A2] ml-1 font-mono-num">{rowCount}행 · {columnCount}열</span>
            <span className="ml-1 inline-flex rounded-md border border-black/[0.06] overflow-hidden">
              {(["UTF-8", "EUC-KR"] as const).map((e) => (
                <button key={e} onClick={() => setEncoding(e)} className={`px-1.5 h-5 text-[9.5px] font-mono-num ${encoding === e ? "bg-[#0B0D14] text-white" : "text-[#5B6173] hover:bg-black/[0.04]"}`}>{e}</button>
              ))}
            </span>
          </div>
          <div className="w-px h-5 bg-black/10" />
          <div className="relative">
            <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#8A90A2]" />
            <input placeholder="셀·열·행 검색" className="h-7 pl-6 pr-3 w-[200px] rounded-md bg-[#F3F4F7] text-[10.5px] outline-none border border-transparent focus:border-[#0B0D14]/15" />
          </div>
          <button className="h-7 px-2.5 rounded-md text-[10.5px] text-[#3D4253] hover:bg-black/[0.04] inline-flex items-center gap-1.5"><Filter size={11} /> 필터</button>
          <div className="w-px h-5 bg-black/10" />
          <div className="flex items-center gap-1 text-[10.5px] text-[#5B6173]">
            <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#65C466]" /> 정상 {rowCount - missingValueCount - (issueCount - missingValueCount)}</span>
            <span className="inline-flex items-center gap-1 ml-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" /> 결측 {missingValueCount}</span>
            <span className="inline-flex items-center gap-1 ml-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6A3D]" /> 의심 {issueCount - missingValueCount}</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="h-7 px-2.5 rounded-md text-[10.5px] text-[#3D4253] hover:bg-black/[0.04] inline-flex items-center gap-1.5"><RefreshCw size={11} /> 데이터 다시 불러오기</button>
            <button className="h-7 px-2.5 rounded-md bg-[#F3F4F7] text-[10.5px] text-[#3D4253] inline-flex items-center gap-1.5"><Plus size={11} /> 행 추가</button>
            <button className="h-7 px-2.5 rounded-md bg-[#F3F4F7] text-[10.5px] text-[#3D4253] inline-flex items-center gap-1.5"><Plus size={11} /> 열 추가</button>
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="flex-1 min-h-0 overflow-auto p-6">
          <div className="mx-auto max-w-[1100px] rounded-xl border border-black/[0.06] bg-white overflow-hidden" style={{ boxShadow: "0 24px 60px -40px rgba(15,20,55,0.18)" }}>
            {/* column letters */}
            <div className="grid bg-[#FBFBF8] border-b border-black/[0.05]" style={{ gridTemplateColumns }}>
              <div className="px-2 py-1.5 text-[9px] text-[#8A90A2] font-mono-num text-center border-r border-black/[0.05]">#</div>
              {columns.map((c) => (
                <div key={c.k} className="px-3 py-1.5 text-[9px] text-[#8A90A2] font-mono-num border-r last:border-r-0 border-black/[0.05] tracking-[0.18em]">{c.k}</div>
              ))}
            </div>
            {/* column header row */}
            <div className="grid bg-white border-b border-black/[0.06] sticky top-0" style={{ gridTemplateColumns }}>
              <div className="px-2 py-2.5 text-[9.5px] text-[#8A90A2] font-mono-num text-center border-r border-black/[0.05]"></div>
              {columns.map((c) => {
                const active = c.n === effectiveSelectedCol;
                return (
                  <button
                    key={c.n}
                    onClick={() => setSelectedCol(c.n)}
                    className={`px-3 py-2.5 text-left border-r last:border-r-0 border-black/[0.05] flex items-center gap-2 ${active ? "bg-[#EEF1FF]" : "hover:bg-[#FBFBF8]"}`}
                  >
                    <span className="w-1 h-4 rounded-full" style={{ background: c.c }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11.5px] text-[#0B0D14] truncate" style={{ fontWeight: 500 }}>{c.n}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8.5px] text-[#8A90A2] tracking-wider">{c.t}</span>
                        <span className="text-[8.5px] text-[#3D4253] bg-white border border-black/[0.06] rounded-sm px-1">{c.role}</span>
                      </div>
                    </div>
                    {c.issues > 0 && <AlertTriangle size={10} className="text-[#F2B705] shrink-0" />}
                  </button>
                );
              })}
            </div>
            {/* rows */}
            <div>
              {rows.map((r, i) => (
                <div key={i} className={`grid text-[11px] ${i % 2 ? "bg-[#FBFBF8]" : "bg-white"} hover:bg-[#EEF1FF]/50`} style={{ gridTemplateColumns }}>
                  <div className="px-2 py-2 text-[9px] text-[#8A90A2] font-mono-num text-center border-r border-black/[0.04]">{i + 1}</div>
                  {colHeaders.map((h) => {
                    const v = (r as any)[h];
                    const isMissing = v === null || v === "" || v === "—";
                    const active = effectiveSelectedCol === colNameMap[h];
                    const cellActive = selectedCell?.r === i && selectedCell?.c === h;
                    return (
                      <button
                        key={h}
                        onClick={() => { setSelectedCell({ r: i, c: h }); setSelectedCol(colNameMap[h]); }}
                        className={`text-left px-3 py-2 border-r last:border-r-0 border-black/[0.04] truncate ${["매출","전년","성장률"].includes(h) ? "font-mono-num text-right" : ""} ${cellActive ? "bg-white outline outline-2 -outline-offset-2 outline-[#1F3FFF] relative z-[1]" : active ? "bg-[#EEF1FF]/60" : ""} ${isMissing && !cellActive ? "bg-[#FFF6E5]" : ""}`}
                      >
                        {isMissing ? <span className="text-[#F2B705] font-mono-num">결측</span> : <span className="text-[#0B0D14]">{typeof v === "number" ? v.toLocaleString() : v}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
              <div className="grid border-t border-black/[0.04] bg-[#FBFBF8]" style={{ gridTemplateColumns }}>
                <div className="px-2 py-2 text-[9px] text-[#8A90A2] font-mono-num text-center border-r border-black/[0.04]">…</div>
                <div className="px-3 py-2 text-[10.5px] text-[#5B6173] font-mono-num" style={{ gridColumn: `span ${columnCount} / span ${columnCount}` }}>남은 {remainingRowCount}행 · 스크롤하여 더 보기</div>
              </div>
            </div>
          </div>
        </div>

        {/* status footer */}
        <div className="h-7 shrink-0 border-t border-black/[0.06] bg-white px-5 flex items-center text-[10px] text-[#5B6173] gap-4">
          <span className="font-mono-num">{rowCount}행 · {columnCount}열</span>
          <span className="w-px h-3 bg-black/10" />
          <span>선택한 열 · {effectiveSelectedCol}</span>
          {selectedCell && (
            <>
              <span className="w-px h-3 bg-black/10" />
              <span className="font-mono-num">선택한 셀 · R{selectedCell.r + 1} · {colNameMap[selectedCell.c] ?? selectedCell.c}</span>
            </>
          )}
          <span className="w-px h-3 bg-black/10" />
          <span className="text-[#F2B705]">⚠ 결측치 {missingValueCount}건 · 의심 {issueCount - missingValueCount}건</span>
          <span className="ml-auto font-mono-num">{encoding} · 마지막 수정 14:18</span>
        </div>
      </section>

      {/* Right data inspector */}
      <aside className="w-[332px] shrink-0 bg-white border-l border-black/[0.06] overflow-y-auto">
        <div className="px-5 pt-4 pb-3 border-b border-black/[0.06] sticky top-0 bg-white z-10">
          <div className="text-[9.5px] uppercase tracking-wider text-[#8A90A2]">데이터 검수</div>
          <div className="mt-0.5 text-[14px]" style={{ fontWeight: 500 }}>데이터 구조</div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[
              { l: "행", v: String(rowCount) },
              { l: "열", v: String(columnCount) },
              { l: "결측", v: String(missingValueCount) },
            ].map((s) => (
              <div key={s.l} className="rounded-md bg-[#F6F7F9] px-2 py-1.5">
                <div className="text-[9px] text-[#8A90A2]">{s.l}</div>
                <div className="text-[12.5px] text-[#0B0D14] font-mono-num" style={{ fontWeight: 600 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <DAcc title="선택한 열">
          <div className="rounded-lg border border-[#0B0D14]/10 bg-[#FBFBF8] p-3">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#25A18E]" />
              <div className="flex-1 min-w-0">
                <div className="text-[12px]" style={{ fontWeight: 500 }}>{effectiveSelectedCol}</div>
                <div className="text-[10px] text-[#8A90A2] mt-0.5">{selectedColumn.t} · {selectedColumn.unit ?? "값"} · {selectedColumn.range ?? "분류"}</div>
              </div>
              <button className="text-[10px] text-[#5B6173] hover:text-[#0B0D14]">이름 변경</button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-[10.5px]">
              <DStat l="평균" v={selectedColumn.mean ?? "—"} />
              <DStat l="중앙값" v={selectedColumn.median ?? "—"} />
              <DStat l="최소 / 최대" v={selectedColumn.minMax ?? "—"} />
              <DStat l="결측" v={String(selectedColumn.missing)} />
            </div>
          </div>
        </DAcc>

        <DAcc title="열 유형">
          <DRow label="유형" value={selectedColumn.t} />
          <DRow label="단위" value={selectedColumn.unit ?? "없음"} />
          <DRow label="형식" value={selectedColumn.format ?? "텍스트"} />
        </DAcc>

        <DAcc title="차트 연결">
          <DMap label="X축"    field={mappingColumns.x?.n ?? "지역"} type={mappingColumns.x?.t ?? "범주"} />
          <DMap label="Y축"    field={mappingColumns.y?.n ?? "매출"} type={mappingColumns.y?.t ?? "숫자"} highlight />
          <DMap label="비교값" field={mappingColumns.comparison?.n ?? "전년 매출"} type={mappingColumns.comparison?.t ?? "숫자"} />
          <DMap label="색상"   field={mappingColumns.color?.n ?? "카테고리"} type={mappingColumns.color?.t ?? "범주"} />
          <button className="mt-2 w-full h-7 rounded-md border border-dashed border-black/15 text-[10.5px] text-[#5B6173] hover:bg-black/[0.03]">+ 매핑 추가</button>
        </DAcc>

        <DAcc title="감지된 열">
          <div className="space-y-1">
            {columns.map((c) => (
              <div key={c.k} className="flex items-center gap-2 py-1 text-[10.5px]">
                <span className="w-1 h-3.5 rounded-full" style={{ background: c.c }} />
                <span className="text-[#0B0D14] flex-1 truncate" style={{ fontWeight: 500 }}>{c.n}</span>
                <span className="text-[#8A90A2]">{c.t}</span>
                <span className="text-[#3D4253] bg-[#F6F7F9] border border-black/[0.05] rounded-sm px-1 text-[9.5px]">{c.role}</span>
              </div>
            ))}
          </div>
        </DAcc>

        <DAcc title="결측치">
          <div className="rounded-md bg-[#FFF6E5] p-2.5">
            <div className="flex items-center justify-between text-[11px]" style={{ color: "#9A7700", fontWeight: 500 }}>
              <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" /> 총 2건 (0.5%)</span>
              <span className="font-mono-num">전년 매출</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-[9.5px] text-[#9A7700]">
              {["대구 (R5)", "전북 (R13)", "—"].map((s, i) => (
                <span key={i} className="bg-white rounded px-1.5 py-0.5 text-center font-mono-num truncate">{s}</span>
              ))}
            </div>
            <div className="mt-2 flex gap-1.5">
              <button className="h-6 px-2 rounded bg-white text-[10px] text-[#0B0D14]" style={{ fontWeight: 500 }}>0으로 채우기</button>
              <button className="h-6 px-2 rounded bg-white text-[10px] text-[#0B0D14]" style={{ fontWeight: 500 }}>평균값</button>
              <button className="h-6 px-2 rounded bg-white text-[10px] text-[#0B0D14]" style={{ fontWeight: 500 }}>행 제외</button>
            </div>
          </div>
        </DAcc>

        <DAcc title="데이터 문제">
          <div className="space-y-1.5">
            <DIssue tone="warn" title="결측치 2건" desc="대구·전북 행의 ‘전년 매출’이 비어 있습니다." action="0으로 채우기" />
            <DIssue tone="alert" title="의심값 1건" desc="강원 행의 ‘브랜드’가 빈 문자열입니다." action="값 확인" />
          </div>
        </DAcc>

        <DAcc title="자동 열 추천">
          <div className="text-[10.5px] text-[#5B6173] mb-2">데이터 구조에 맞춰 다음 매핑을 추천합니다.</div>
          <div className="rounded-lg border border-black/[0.06] bg-[#FBFBF8] p-2.5 space-y-1">
            {[
              { l: "X축",   f: "지역",   p: 96 },
              { l: "Y축",   f: "매출",   p: 92 },
              { l: "색상",  f: "카테고리", p: 81 },
              { l: "비교값", f: "전년 매출", p: 74 },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between text-[10.5px]">
                <span className="text-[#5B6173] w-12">{r.l}</span>
                <span className="flex-1 text-[#0B0D14]" style={{ fontWeight: 500 }}>{r.f}</span>
                <span className="font-mono-num text-[#1F3FFF]" style={{ fontWeight: 500 }}>{r.p}%</span>
              </div>
            ))}
          </div>
          <button className="mt-2 w-full h-8 rounded-md bg-[#F3F4F7] text-[#0B0D14] text-[10.5px] inline-flex items-center justify-center gap-1.5"><Wand2 size={11} /> 추천 매핑 적용</button>
        </DAcc>

        <div className="px-5 py-4 border-t border-black/[0.06] bg-[#FBFBF8] sticky bottom-0">
          <button onClick={onApply} className="w-full h-10 rounded-full bg-[#0B0D14] text-white text-[12px] inline-flex items-center justify-center gap-2" style={{ fontWeight: 500 }}>
            차트에 반영하기 <ArrowRight size={12} />
          </button>
          <div className="text-[9.5px] text-[#8A90A2] text-center mt-2">변경 사항은 즉시 차트에 반영됩니다.</div>
        </div>
      </aside>
    </>
  );
}

function DAcc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/[0.05]">
      <div className="px-5 pt-3.5 pb-1 text-[9.5px] uppercase tracking-wider text-[#8A90A2]">{title}</div>
      <div className="px-5 pb-4">{children}</div>
    </div>
  );
}
function DStat({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-md bg-white border border-black/[0.05] px-2 py-1.5">
      <div className="text-[9px] text-[#8A90A2]">{l}</div>
      <div className="text-[11px] text-[#0B0D14] font-mono-num" style={{ fontWeight: 500 }}>{v}</div>
    </div>
  );
}
function DRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[11px]">
      <span className="text-[#5B6173]">{label}</span>
      <span className="text-[#0B0D14]" style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}
function DMap({ label, field, type, highlight }: { label: string; field: string; type: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="w-12 text-[10.5px] text-[#8A90A2]">{label}</span>
      <div className={`flex-1 h-8 rounded-md px-2 flex items-center gap-2 border ${highlight ? "bg-[#EEF1FF] border-[#1F3FFF]/30" : "bg-[#F6F7F9] border-black/[0.05]"}`}>
        <span className={`w-1 h-3.5 rounded-full ${highlight ? "bg-[#1F3FFF]" : "bg-[#3D4253]"}`} />
        <span className="text-[11px] text-[#0B0D14] truncate" style={{ fontWeight: 500 }}>{field}</span>
        <span className="ml-auto text-[9.5px] text-[#8A90A2]">{type}</span>
      </div>
    </div>
  );
}
function DIssue({ tone, title, desc, action }: { tone: "warn" | "alert"; title: string; desc: string; action: string }) {
  const c = tone === "warn" ? { bg: "#FFF6E5", text: "#9A7700", dot: "#F2B705" } : { bg: "#FFEFE7", text: "#A03A12", dot: "#FF6A3D" };
  return (
    <div className="rounded-md p-2.5" style={{ background: c.bg }}>
      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: c.text, fontWeight: 500 }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} /> {title}
      </div>
      <div className="text-[10.5px] mt-1" style={{ color: c.text }}>{desc}</div>
      <button className="mt-2 h-6 px-2 rounded bg-white text-[10px] text-[#0B0D14]" style={{ fontWeight: 500 }}>{action}</button>
    </div>
  );
}

function ChartGallery({ onClose, onPick }: { onClose: () => void; onPick: (c: AllChartType) => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="w-[760px] max-h-[80vh] bg-white rounded-2xl overflow-hidden flex flex-col font-display" onClick={(e) => e.stopPropagation()} style={{ boxShadow: "0 60px 120px -20px rgba(0,0,0,0.5)" }}>
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8A90A2]">차트 갤러리</div>
            <div className="text-[16px] mt-1" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>용도에 맞는 차트를 선택하세요</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-md hover:bg-black/[0.04] flex items-center justify-center"><X size={14} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {CHART_GALLERY.map((g) => (
            <div key={g.group} className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-[11.5px] text-[#0B0D14]" style={{ fontWeight: 500 }}>{g.group}</div>
                <div className="flex-1 ml-3 h-px bg-black/[0.06]" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {g.items.map((it) => (
                  <button key={it.k + it.l} onClick={() => !it.soon && onPick(it.k)} disabled={it.soon} className={`relative p-3 rounded-lg border text-left ${it.soon ? "border-black/[0.05] bg-[#FBFBF8] opacity-70" : "border-black/[0.08] bg-white hover:border-[#0B0D14]"}`}>
                    <div className="h-12 rounded bg-[#FBFBF8] flex items-center justify-center">
                      <ChartGlyph t={it.k} active={false} />
                    </div>
                    <div className="mt-2 text-[11px]" style={{ fontWeight: 500 }}>{it.l}</div>
                    {it.soon && <span className="absolute top-1.5 right-1.5 text-[8.5px] px-1.5 py-0.5 rounded bg-[#F3F4F7] text-[#8A90A2]">준비 중</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


