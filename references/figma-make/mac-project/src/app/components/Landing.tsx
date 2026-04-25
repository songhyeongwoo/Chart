import { ArrowRight, ArrowUpRight, Check, ChevronRight, Database, Download, Play, Search, Sparkles, Wand2 } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "./Logo";
import {
  BarChart, RacingBar,
  MiniSpark, MapChartMini, MetricCardMini, PALETTES,
} from "./Charts";

export function Landing({ onEnter }: { onEnter: (s: "workspace" | "editor") => void }) {
  return (
    <div className="min-h-screen w-full bg-[#FBFBF8] text-[#0B0D14]">
      <FoldA onEnter={onEnter} />
      <WorkflowSection onEnter={onEnter} />
      <FlowJourney />
      <RecommendShowcase onEnter={onEnter} />
      <GalleryShowcase />
      <EditorShowcase onEnter={onEnter} />
      <TrustSection />
      <FooterCTA onEnter={onEnter} />
    </div>
  );
}

function TopNav({ dark = false, onEnter }: { dark?: boolean; onEnter: (s: "workspace") => void }) {
  const sub = dark ? "text-[#9AA0B1]" : "text-[#5B6173]";
  const border = dark ? "border-white/10" : "border-[#E5E7EC]";
  return (
    <div className={`flex items-center justify-between px-10 py-5 border-b ${border}`}>
      <div className="flex items-center gap-10">
        <Logo dark={dark} />
        <nav className={`flex items-center gap-6 text-[13px] ${sub}`}>
          <Link to="/" className="hover:opacity-80">제품</Link>
          <Link to="/gallery" className="hover:opacity-80">차트 갤러리</Link>
          <Link to="/templates" className="hover:opacity-80">템플릿</Link>
          <Link to="/use-cases" className="hover:opacity-80">활용 사례</Link>
          <Link to="/pricing" className="hover:opacity-80">요금</Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <button className={`px-3.5 py-2 text-[13px] ${sub} hover:opacity-80`}>로그인</button>
        <button
          onClick={() => onEnter("workspace")}
          className={`px-4 py-2 rounded-full text-[13px] flex items-center gap-1.5 ${
            dark ? "bg-white text-[#0B0D14]" : "bg-[#0B0D14] text-white"
          }`}
        >
          무료로 시작하기 <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* FOLD A — Dark premium studio */
function FoldA({ onEnter }: { onEnter: (s: "workspace" | "editor") => void }) {
  return (
    <div className="bg-[#0B0D14] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full" style={{ background: "radial-gradient(circle, rgba(31,63,255,0.22), transparent 60%)" }} />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,106,61,0.16), transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>
      <div className="relative">
        <TopNav dark onEnter={onEnter} />
        <div className="max-w-[1320px] mx-auto px-10 pt-16 pb-24 grid grid-cols-12 gap-10">
          <div className="col-span-5 pt-6">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-3 py-1 text-[11px] text-[#9AA0B1] tracking-[0.14em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B6EFF]" /> MAC STUDIO · 한국어 데이터 시각화
            </div>
            <h1 className="mt-7 font-display" style={{ fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.042em", fontWeight: 600 }}>
              데이터를 차트로,<br />바로 완성하세요.
            </h1>
            <p className="mt-7 text-[18px] leading-[1.6] text-[#C7CAD2] max-w-[460px]">
              엑셀과 CSV를 그대로 올리면 MAC이 어울리는 차트를 추천합니다. 색상과 라벨을 다듬고 발표용 이미지로 바로 내보내세요.
            </p>
            <div className="mt-9 flex items-center gap-3">
              <button onClick={() => onEnter("workspace")} className="px-5 py-3.5 rounded-full bg-white text-[#0B0D14] text-[14px] flex items-center gap-2">
                시작하기 <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onEnter("editor")} className="px-5 py-3.5 rounded-full border border-white/20 text-white text-[14px] flex items-center gap-2 hover:bg-white/5">
                샘플 데이터로 시작 <Play className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-7 flex items-center gap-5 text-[12px] text-[#8A90A2]">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> 신용카드 없이 시작</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> CSV · XLSX</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> 한국어 인터페이스</span>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-[460px]">
              {[
                { n: "12+", l: "차트 유형" },
                { n: "14", l: "팔레트 프리셋" },
                { n: "PNG · MP4", l: "내보내기 포맷" },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/10 pl-4">
                  <div className="font-mono-num text-[22px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>{s.n}</div>
                  <div className="text-[11px] text-[#8A90A2] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7">
            <DarkEditorMock />
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkEditorMock() {
  return (
    <div className="rounded-[20px] border border-white/12 bg-[#13151C] shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0F1118]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="text-[11px] text-[#9AA0B1] font-mono-num">2026년 1분기 · 지역별 매출.csv</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#5B6173]">●  자동 저장됨</span>
          <button className="px-2.5 py-1 rounded-md bg-white text-[#0B0D14] text-[11px] flex items-center gap-1">
            <Download className="w-3 h-3" /> 내보내기
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-3 border-r border-white/8 p-3">
          <div className="text-[9px] tracking-[0.18em] text-[#5B6173] mb-2">데이터셋</div>
          <div className="rounded-lg border border-white/8 p-2.5 bg-white/[0.02]">
            <div className="text-[11px] text-white">2026_q1_sales.csv</div>
            <div className="text-[9px] text-[#5B6173] mt-1 font-mono-num">7열 · 124행 · UTF-8</div>
          </div>
          <div className="mt-4 text-[9px] tracking-[0.18em] text-[#5B6173] mb-2">감지된 열</div>
          <div className="space-y-1">
            {[
              { n: "지역", t: "범주" },
              { n: "월", t: "시간" },
              { n: "매출", t: "수치" },
              { n: "전년대비", t: "수치" },
              { n: "채널", t: "범주" },
            ].map((c) => (
              <div key={c.n} className="flex items-center justify-between text-[10.5px] py-1 px-2 rounded hover:bg-white/[0.04]">
                <span className="text-white/90">{c.n}</span>
                <span className="text-[9px] text-[#5B6173] tracking-wide">{c.t}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[9px] tracking-[0.18em] text-[#5B6173] mb-2">차트 유형</div>
          <div className="grid grid-cols-3 gap-1.5">
            {["막대", "선", "도넛", "영역", "산점", "레이싱"].map((t, i) => (
              <button key={t} className={`text-[10px] py-2 rounded border ${i === 0 ? "border-[#5B6EFF] bg-[#5B6EFF]/15 text-white" : "border-white/8 text-[#9AA0B1] hover:bg-white/[0.04]"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="col-span-6 p-5 bg-[#0F1118]">
          <div className="rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] text-[#0B0D14]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>지역별 분기 매출</div>
                <div className="text-[11px] text-[#5B6173] mt-1">2026년 1분기 · 단위 십억원</div>
              </div>
              <div className="text-[10px] text-[#8A90A2] tracking-[0.12em]">MAC STUDIO</div>
            </div>
            <BarChart className="w-full h-[300px] mt-3" palette={PALETTES.basicBlue.colors} />
            <div className="mt-3 text-[10px] text-[#8A90A2]">출처 · 사내 매출 데이터 · 2026.04</div>
          </div>
        </div>
        <div className="col-span-3 border-l border-white/8 p-3">
          <div className="text-[9px] tracking-[0.18em] text-[#5B6173] mb-2">색상</div>
          <div className="flex items-center justify-between text-[11px] text-white mb-2">기본 블루</div>
          <div className="flex gap-1 mb-3">
            {PALETTES.basicBlue.colors.map((c) => <span key={c} className="flex-1 h-5 rounded" style={{ background: c }} />)}
          </div>
          <div className="space-y-1.5">
            {(["basicBlue", "softNavy", "sharpContrast", "reportClassic"] as const).map((k, i) => (
              <button key={k} className={`w-full text-left text-[10.5px] py-1.5 px-2 rounded flex items-center gap-2 ${i === 0 ? "bg-white/[0.06] text-white" : "text-[#9AA0B1] hover:bg-white/[0.03]"}`}>
                <span className="flex gap-0.5">
                  {PALETTES[k].colors.slice(0, 4).map((c) => <span key={c} className="w-2 h-3 rounded-[1px]" style={{ background: c }} />)}
                </span>
                {PALETTES[k].name}
              </button>
            ))}
          </div>
          <div className="mt-4 text-[9px] tracking-[0.18em] text-[#5B6173] mb-2">라벨</div>
          <div className="space-y-2 text-[10.5px]">
            <Row label="값 라벨"><Toggle on /></Row>
            <Row label="범례"><Toggle on /></Row>
            <Row label="격자"><Toggle /></Row>
          </div>
          <button className="mt-4 w-full py-2 rounded-md bg-white text-[#0B0D14] text-[11px] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3" /> 추천 차트 보기
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between"><span className="text-[#9AA0B1]">{label}</span>{children}</div>;
}
function Toggle({ on = false }: { on?: boolean }) {
  return <span className={`w-7 h-4 rounded-full relative inline-block ${on ? "bg-[#5B6EFF]" : "bg-white/12"}`}><span className={`absolute top-0.5 ${on ? "left-3.5" : "left-0.5"} w-3 h-3 rounded-full bg-white transition-all`} /></span>;
}

/* FOLD B — Clean white centered */
function FoldB({ onEnter }: { onEnter: (s: "workspace" | "editor") => void }) {
  return (
    <div className="relative bg-[#FBFBF8] overflow-hidden">
      <TopNav onEnter={onEnter} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#E1E3E8 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(circle at center, black 30%, transparent 75%)" }} />
      </div>
      <div className="relative max-w-[1320px] mx-auto px-10 pt-20 pb-28">
        <ChartFloat className="absolute left-6 top-10 w-[230px] -rotate-[3deg]" title="월간 매출 추이" sub="2026년 1–12월" tag="추이" tone="line" />
        <ChartFloat className="absolute left-2 top-[280px] w-[210px] rotate-[2deg]" title="채널 구성" sub="모바일 우세" tag="구성" tone="donut" />
        <ChartFloat className="absolute right-6 top-8 w-[240px] rotate-[3deg]" title="기업 시가총액" sub="2024년 기준" tag="순위" tone="race" />
        <ChartFloat className="absolute right-0 top-[290px] w-[220px] -rotate-[2deg]" title="지역별 분포" sub="국내 17개 시도" tag="지도" tone="map" />
        <ChartFloat className="absolute left-12 bottom-[40px] w-[200px] rotate-[1.5deg]" title="응답자 분포" sub="설문 N=2,418" tag="분포" tone="scatter" />
        <ChartFloat className="absolute right-12 bottom-[60px] w-[210px] -rotate-[1deg]" title="이번 달 매출" sub="실시간 집계" tag="지표" tone="metric" />

        <div className="relative max-w-[760px] mx-auto text-center pt-10">
          <div className="inline-flex items-center gap-2 border border-[#E1E3E8] bg-white rounded-full px-3 py-1 text-[11px] text-[#5B6173] tracking-[0.12em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" /> 한국어 데이터 시각화 스튜디오
          </div>
          <h1 className="mt-7 font-display" style={{ fontSize: 78, lineHeight: 1.05, letterSpacing: "-0.042em", fontWeight: 600 }}>
            엑셀 데이터로<br />발표용 차트를 만드세요.
          </h1>
          <p className="mt-7 mx-auto max-w-[560px] text-[18px] leading-[1.65] text-[#3D4253]">
            데이터 업로드부터 차트 추천, 상세 편집, 발표용 이미지 내보내기까지 한 번의 흐름으로 완성합니다.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <button onClick={() => onEnter("workspace")} className="px-5 py-3.5 rounded-full bg-[#0B0D14] text-white text-[14px] flex items-center gap-2 hover:bg-[#1A1D28]">
              시작하기 <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onEnter("editor")} className="px-5 py-3.5 rounded-full border border-[#0B0D14]/15 text-[#0B0D14] text-[14px] flex items-center gap-2 hover:bg-white">
              샘플 데이터로 시작 <Play className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-7 text-[12px] text-[#5B6173]">
            신용카드 없이 시작 · CSV · XLSX 지원 · 한국어 인터페이스
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartFloat({ className = "", title, sub, tag, tone }: { className?: string; title: string; sub: string; tag: string; tone: "line" | "donut" | "race" | "map" | "scatter" | "metric" | "bar" }) {
  return (
    <div className={`hidden lg:block ${className}`}>
      <div className="rounded-xl border border-[#E5E7EC] bg-white shadow-[0_18px_40px_-20px_rgba(11,13,20,0.18)] overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-[#F0F1F4] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#0B0D14]" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</div>
            <div className="text-[9px] text-[#8A90A2] mt-0.5 font-mono-num">{sub}</div>
          </div>
          <span className="text-[8.5px] text-[#5B6173] border border-[#E5E7EC] rounded-full px-1.5 py-0.5 tracking-wide">{tag}</span>
        </div>
        <div className="h-[110px] bg-[#FBFBF8]">
          {tone === "line" && <MiniSpark type="line" color="#1F3FFF" />}
          {tone === "bar" && <MiniSpark type="bar" color="#1F3FFF" />}
          {tone === "donut" && <MiniSpark type="donut" palette={PALETTES.reportClassic.colors} />}
          {tone === "race" && <MiniSpark type="race" palette={PALETTES.sharpContrast.colors} />}
          {tone === "scatter" && <MiniSpark type="scatter" color="#6A3FD4" />}
          {tone === "map" && <MapChartMini color="#1F3FFF" />}
          {tone === "metric" && <MetricCardMini color="#25A18E" />}
        </div>
      </div>
    </div>
  );
}

/* FOLD C — Editorial chart gallery */
function FoldC({ onEnter }: { onEnter: (s: "workspace" | "editor") => void }) {
  return (
    <div className="bg-[#FBFBF8] relative">
      <TopNav onEnter={onEnter} />
      <div className="max-w-[1320px] mx-auto px-10 pt-12 pb-20 grid grid-cols-12 gap-8">
        <div className="col-span-2 space-y-3 pt-4">
          <div className="text-[10px] tracking-[0.18em] text-[#8A90A2] mb-2">차트 갤러리</div>
          {[
            { n: "막대", tone: "bar" as const, p: PALETTES.basicBlue.colors[0] },
            { n: "선", tone: "line" as const, p: PALETTES.softNavy.colors[0] },
            { n: "도넛", tone: "donut" as const, p: PALETTES.reportClassic.colors[0] },
            { n: "영역", tone: "area" as const, p: PALETTES.softGreen.colors[0] },
            { n: "산점도", tone: "scatter" as const, p: PALETTES.purpleFocus.colors[0] },
            { n: "레이싱", tone: "race" as const, p: PALETTES.sharpContrast.colors[0] },
            { n: "지도", tone: "map" as const, p: PALETTES.warmOrange.colors[2] },
            { n: "지표", tone: "metric" as const, p: PALETTES.dataJournal.colors[0] },
          ].map((t) => (
            <div key={t.n} className="rounded-lg border border-[#E5E7EC] bg-white overflow-hidden">
              <div className="h-[58px] bg-[#FBFBF8]">
                {t.tone === "map" ? <MapChartMini color={t.p} /> :
                 t.tone === "metric" ? <MetricCardMini color={t.p} /> :
                 <MiniSpark type={t.tone} color={t.p} palette={PALETTES.sharpContrast.colors} />}
              </div>
              <div className="px-2.5 py-1.5 text-[10.5px] text-[#3D4253] flex items-center justify-between">
                {t.n}<span className="text-[9px] text-[#8A90A2]">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-7">
          <div className="pt-6">
            <div className="inline-flex items-center gap-2 text-[11px] text-[#5B6173] tracking-[0.14em]">
              <span className="w-6 h-px bg-[#0B0D14]" /> ISSUE 04 · 2026 · MAC STUDIO
            </div>
            <h1 className="mt-5 font-display" style={{ fontSize: 88, lineHeight: 1.0, letterSpacing: "-0.045em", fontWeight: 600 }}>
              데이터로 말하는<br />가장 빠른 방법.
            </h1>
            <p className="mt-7 max-w-[560px] text-[18px] leading-[1.65] text-[#3D4253]">
              MAC은 한국어 데이터 시각화 스튜디오입니다. 엑셀을 업로드하면 어울리는 차트를 추천하고, 발표용 이미지로 바로 내보냅니다.
            </p>
            <div className="mt-9 flex items-center gap-3">
              <button onClick={() => onEnter("workspace")} className="px-5 py-3.5 rounded-full bg-[#0B0D14] text-white text-[14px] flex items-center gap-2">
                시작하기 <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onEnter("editor")} className="px-5 py-3.5 rounded-full border border-[#0B0D14]/15 text-[#0B0D14] text-[14px] flex items-center gap-2 hover:bg-white">
                샘플 데이터로 시작 <Play className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => onEnter("workspace")} className="px-3 py-3 text-[13px] text-[#3D4253] flex items-center gap-1.5 hover:underline">
                작업공간 보기 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-9 grid grid-cols-4 gap-6 max-w-[640px]">
              {[
                { l: "01", t: "데이터 가져오기", d: "엑셀 · CSV" },
                { l: "02", t: "차트 추천", d: "구조 분석 기반" },
                { l: "03", t: "상세 편집", d: "색상 · 라벨 · 축" },
                { l: "04", t: "내보내기", d: "PNG · MP4" },
              ].map((s) => (
                <div key={s.l} className="border-t border-[#0B0D14]/10 pt-3">
                  <div className="text-[10px] text-[#8A90A2] font-mono-num tracking-wider">{s.l}</div>
                  <div className="text-[12.5px] text-[#0B0D14] mt-1" style={{ fontWeight: 500 }}>{s.t}</div>
                  <div className="text-[10.5px] text-[#5B6173] mt-0.5">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <div className="rounded-2xl border border-[#E5E7EC] bg-white p-4 shadow-[0_24px_60px_-30px_rgba(11,13,20,0.25)]">
            <div className="flex items-center justify-between">
              <div className="text-[10.5px] text-[#5B6173]">표지 차트</div>
              <span className="text-[9px] text-[#8A90A2] font-mono-num">FEATURED</span>
            </div>
            <div className="text-[14.5px] text-[#0B0D14] mt-1.5" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>2026년 시가총액 상위 10</div>
            <div className="text-[10.5px] text-[#8A90A2] mt-0.5">단위 · 십억 USD</div>
            <RacingBar className="w-full h-[360px] mt-2" palette={PALETTES.sharpContrast.colors} year={2024} />
            <div className="text-[9.5px] text-[#8A90A2] mt-1">출처 · MAC STUDIO 샘플 데이터</div>
          </div>
          <div className="rounded-2xl border border-[#E5E7EC] bg-white p-3">
            <div className="text-[10.5px] text-[#5B6173]">최근 사용된 팔레트</div>
            <div className="mt-2 space-y-1.5">
              {(["sharpContrast", "reportClassic", "softNavy"] as const).map((k) => (
                <div key={k} className="flex items-center gap-2">
                  <div className="flex flex-1 gap-0.5">
                    {PALETTES[k].colors.slice(0, 5).map((c) => <span key={c} className="flex-1 h-3.5 rounded-[2px]" style={{ background: c }} />)}
                  </div>
                  <span className="text-[10px] text-[#3D4253] w-[88px] text-right">{PALETTES[k].name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Workflow product preview */
function WorkflowSection({ onEnter }: { onEnter: (s: "workspace" | "editor") => void }) {
  return (
    <div className="border-t border-[#E5E7EC] bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-24">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] tracking-[0.18em] text-[#8A90A2]">PRODUCT</div>
            <h2 className="mt-2 font-display text-[40px]" style={{ letterSpacing: "-0.03em", fontWeight: 600 }}>
              한 번의 흐름으로 차트가 완성됩니다.
            </h2>
          </div>
          <button onClick={() => onEnter("editor")} className="text-[13px] flex items-center gap-1.5 text-[#0B0D14] hover:underline">
            에디터 미리보기 <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="mt-10 rounded-[20px] border border-[#E5E7EC] overflow-hidden bg-[#FBFBF8] shadow-[0_24px_60px_-30px_rgba(11,13,20,0.18)]">
          <div className="grid grid-cols-4 border-b border-[#E5E7EC]">
            {[
              { n: "01", t: "데이터 가져오기", d: "CSV · XLSX 업로드" },
              { n: "02", t: "데이터 확인", d: "감지된 열 · 인코딩" },
              { n: "03", t: "차트 편집", d: "유형 · 색상 · 라벨" },
              { n: "04", t: "내보내기", d: "PNG · JPG · SVG · MP4" },
            ].map((s, i) => (
              <div key={s.n} className={`px-5 py-4 ${i === 2 ? "bg-white" : ""} ${i < 3 ? "border-r border-[#E5E7EC]" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="font-mono-num text-[10px] tracking-wider text-[#8A90A2]">{s.n}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${i === 2 ? "bg-[#1F3FFF]" : "bg-[#C7CAD2]"}`} />
                </div>
                <div className="text-[14px] mt-1.5" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>{s.t}</div>
                <div className="text-[11px] text-[#5B6173] mt-0.5">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-3 border-r border-[#E5E7EC] bg-white p-4">
              <div className="text-[10px] tracking-[0.16em] text-[#8A90A2] mb-2">데이터 미리보기</div>
              <div className="rounded-lg border border-[#E5E7EC] overflow-hidden">
                <div className="grid grid-cols-3 text-[10px] font-mono-num bg-[#FBFBF8] border-b border-[#E5E7EC]">
                  {["지역", "월", "매출"].map((h) => <div key={h} className="px-2 py-1.5 text-[#5B6173] border-r last:border-r-0 border-[#E5E7EC]">{h}</div>)}
                </div>
                {[
                  ["서울", "01", "1,284"],
                  ["경기", "01", "986"],
                  ["부산", "01", "642"],
                  ["인천", "01", "521"],
                  ["대구", "01", "418"],
                  ["대전", "01", "324"],
                ].map((r, i) => (
                  <div key={i} className={`grid grid-cols-3 text-[10.5px] font-mono-num ${i % 2 ? "bg-[#FBFBF8]" : ""}`}>
                    {r.map((c, j) => <div key={j} className="px-2 py-1.5 text-[#0B0D14] border-r last:border-r-0 border-[#F0F1F4]">{c}</div>)}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[10px] tracking-[0.16em] text-[#8A90A2] mb-1.5">감지된 열</div>
              <div className="flex flex-wrap gap-1">
                {[
                  { n: "지역", t: "범주" },
                  { n: "월", t: "시간" },
                  { n: "매출", t: "수치" },
                  { n: "전년대비", t: "수치" },
                ].map((c) => (
                  <span key={c.n} className="inline-flex items-center gap-1 text-[10px] border border-[#E5E7EC] rounded-md px-1.5 py-0.5">
                    {c.n} <span className="text-[#8A90A2] text-[9px]">{c.t}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-6 p-6">
              <div className="rounded-xl border border-[#E5E7EC] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14.5px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>지역별 분기 매출</div>
                    <div className="text-[10.5px] text-[#5B6173] mt-0.5">2026년 1분기 · 단위 십억원</div>
                  </div>
                  <div className="text-[10px] text-[#8A90A2] tracking-[0.12em]">MAC STUDIO</div>
                </div>
                <BarChart className="w-full h-[280px] mt-2" palette={PALETTES.basicBlue.colors} />
                <div className="text-[10px] text-[#8A90A2] mt-1">출처 · 사내 매출 데이터 · 2026.04</div>
              </div>
            </div>
            <div className="col-span-3 border-l border-[#E5E7EC] bg-white p-4">
              <div className="text-[10px] tracking-[0.16em] text-[#8A90A2] mb-2">차트 유형</div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {["막대", "선", "도넛", "영역", "산점", "레이싱"].map((t, i) => (
                  <button key={t} className={`text-[10px] py-2 rounded border ${i === 0 ? "border-[#1F3FFF] bg-[#1F3FFF]/8 text-[#1F3FFF]" : "border-[#E5E7EC] text-[#3D4253] hover:bg-[#FBFBF8]"}`}>{t}</button>
                ))}
              </div>
              <button className="w-full text-[10.5px] text-[#5B6173] border border-dashed border-[#C7CAD2] py-1.5 rounded mb-4">더 많은 차트 →</button>
              <div className="text-[10px] tracking-[0.16em] text-[#8A90A2] mb-2">팔레트</div>
              <div className="space-y-1.5">
                {(["basicBlue", "sharpContrast", "reportClassic"] as const).map((k, i) => (
                  <button key={k} className={`w-full flex items-center gap-2 py-1.5 px-2 rounded text-left ${i === 0 ? "bg-[#FBFBF8]" : ""}`}>
                    <span className="flex gap-0.5">
                      {PALETTES[k].colors.slice(0, 5).map((c) => <span key={c} className="w-2 h-3.5 rounded-[1px]" style={{ background: c }} />)}
                    </span>
                    <span className="text-[10.5px]">{PALETTES[k].name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5E7EC]">
                <button className="w-full py-2 rounded-md bg-[#0B0D14] text-white text-[11px] flex items-center justify-center gap-1.5">
                  <Download className="w-3 h-3" /> 발표용 이미지로 내보내기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Flow journey */
function FlowJourney() {
  const steps = [
    { t: "데이터 가져오기", d: "CSV와 XLSX를 끌어 놓으면 인코딩과 열 형식을 자동으로 인식합니다.", status: "데이터 구조 분석 완료", icon: <Database className="w-4 h-4" />, ui: <FlowFragmentUpload /> },
    { t: "차트 추천",     d: "데이터의 특성에 맞는 차트를 적합도와 함께 제안합니다.",                    status: "추천 차트 4개 생성", icon: <Sparkles className="w-4 h-4" />, ui: <FlowFragmentRecommend /> },
    { t: "상세 편집",     d: "색상, 라벨, 축, 범례를 한 화면에서 정돈된 인터페이스로 편집합니다.",        status: "색상 팔레트 적용",    icon: <Wand2 className="w-4 h-4" />,    ui: <FlowFragmentEdit /> },
    { t: "내보내기",       d: "발표 슬라이드, 보고서, 영상 자료까지 그대로 사용할 수 있습니다.",          status: "발표용 이미지로 내보내기", icon: <Download className="w-4 h-4" />, ui: <FlowFragmentExport /> },
  ];
  return (
    <div className="border-t border-[#E5E7EC] bg-[#FBFBF8]">
      <div className="max-w-[1320px] mx-auto px-10 py-24">
        <div className="text-[11px] tracking-[0.18em] text-[#8A90A2]">WORKFLOW</div>
        <h2 className="mt-2 font-display text-[40px] max-w-[760px]" style={{ letterSpacing: "-0.03em", fontWeight: 600 }}>
          업로드부터 발표까지, 끊기지 않는 하나의 흐름.
        </h2>
        <div className="mt-12 relative">
          <div className="absolute left-0 right-0 top-[34px] h-px bg-gradient-to-r from-transparent via-[#0B0D14]/15 to-transparent hidden lg:block" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.t} className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-[68px] h-[68px] rounded-full bg-white border border-[#E5E7EC] flex items-center justify-center shadow-[0_8px_24px_-12px_rgba(11,13,20,0.15)]">
                    <div className="w-[52px] h-[52px] rounded-full bg-[#0B0D14] text-white flex items-center justify-center">{s.icon}</div>
                  </div>
                  <div className="font-mono-num text-[11px] text-[#8A90A2] tracking-wider">단계 0{i + 1}</div>
                </div>
                <div className="mt-5 text-[18px]" style={{ fontWeight: 600, letterSpacing: "-0.015em" }}>{s.t}</div>
                <p className="mt-2 text-[13px] leading-[1.65] text-[#3D4253] max-w-[280px]">{s.d}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] text-[#0B0D14] bg-white border border-[#E5E7EC] rounded-full px-2.5 py-1">
                  <Check className="w-3 h-3 text-[#25A18E]" /> {s.status}
                </div>
                <div className="mt-5">{s.ui}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowFragmentUpload() {
  return (
    <div className="rounded-xl border border-[#E5E7EC] bg-white p-3.5">
      <div className="border border-dashed border-[#C7CAD2] rounded-lg p-3 text-center">
        <div className="text-[11px] text-[#0B0D14]" style={{ fontWeight: 500 }}>파일을 끌어 놓거나 선택</div>
        <div className="text-[10px] text-[#8A90A2] mt-1">CSV · XLSX · 최대 50MB</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10.5px]">
        <span className="text-[#3D4253]">2026_q1_sales.xlsx</span>
        <span className="text-[#8A90A2] font-mono-num">7열 · 124행</span>
      </div>
    </div>
  );
}
function FlowFragmentRecommend() {
  return (
    <div className="rounded-xl border border-[#E5E7EC] bg-white p-3.5">
      {[
        { n: "그룹 막대", p: 96, pal: PALETTES.basicBlue.colors },
        { n: "선 추이", p: 88, pal: PALETTES.softNavy.colors },
        { n: "도넛 구성", p: 74, pal: PALETTES.reportClassic.colors },
      ].map((r, i) => (
        <div key={r.n} className={`flex items-center justify-between py-1.5 ${i ? "border-t border-[#F0F1F4]" : ""}`}>
          <div className="flex items-center gap-2">
            <span className="flex gap-0.5">{r.pal.slice(0, 4).map((c) => <span key={c} className="w-1.5 h-3.5 rounded-[1px]" style={{ background: c }} />)}</span>
            <span className="text-[11px]">{r.n}</span>
          </div>
          <span className="text-[10px] text-[#5B6173] font-mono-num">적합도 {r.p}</span>
        </div>
      ))}
    </div>
  );
}
function FlowFragmentEdit() {
  return (
    <div className="rounded-xl border border-[#E5E7EC] bg-white p-3.5">
      <div className="text-[10px] text-[#8A90A2] mb-2">색상 팔레트</div>
      <div className="flex gap-1 mb-3">
        {PALETTES.basicBlue.colors.map((c) => <span key={c} className="flex-1 h-5 rounded" style={{ background: c }} />)}
      </div>
      <div className="flex items-center justify-between text-[10.5px]"><span className="text-[#3D4253]">값 라벨 표시</span><LightToggle on /></div>
      <div className="flex items-center justify-between text-[10.5px] mt-2"><span className="text-[#3D4253]">격자선</span><LightToggle /></div>
    </div>
  );
}
function LightToggle({ on = false }: { on?: boolean }) {
  return <span className={`w-7 h-4 rounded-full relative inline-block ${on ? "bg-[#0B0D14]" : "bg-[#E1E3E8]"}`}><span className={`absolute top-0.5 ${on ? "left-3.5" : "left-0.5"} w-3 h-3 rounded-full bg-white`} /></span>;
}
function FlowFragmentExport() {
  return (
    <div className="rounded-xl border border-[#E5E7EC] bg-white p-3.5">
      {[
        { n: "PNG · 2x", d: "발표용 고해상도", on: true },
        { n: "SVG", d: "벡터 편집", on: false },
        { n: "MP4", d: "레이싱 차트 영상", on: false },
      ].map((e, i) => (
        <div key={e.n} className={`flex items-center justify-between py-1.5 ${i ? "border-t border-[#F0F1F4]" : ""}`}>
          <div>
            <div className="text-[11px]" style={{ fontWeight: 500 }}>{e.n}</div>
            <div className="text-[9.5px] text-[#8A90A2]">{e.d}</div>
          </div>
          <span className={`w-3 h-3 rounded-full ${e.on ? "bg-[#0B0D14]" : "border border-[#C7CAD2]"}`} />
        </div>
      ))}
    </div>
  );
}

/* Recommend */
function RecommendShowcase({ onEnter }: { onEnter: (s: "editor") => void }) {
  const recs = [
    { n: "그룹 막대", p: 96, why: "범주형 두 시점을 비교할 때 적합합니다.", pal: PALETTES.basicBlue, type: "bar" as const },
    { n: "선 추이", p: 88, why: "시간에 따른 변화를 보여줄 때 적합합니다.", pal: PALETTES.softNavy, type: "line" as const },
    { n: "도넛 구성", p: 74, why: "전체 대비 비율을 보여줄 때 사용합니다.", pal: PALETTES.reportClassic, type: "donut" as const },
    { n: "레이싱 바", p: 68, why: "순위 변화를 영상으로 보여줄 때 좋습니다.", pal: PALETTES.sharpContrast, type: "race" as const },
  ];
  return (
    <div className="border-t border-[#E5E7EC] bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="text-[11px] tracking-[0.18em] text-[#8A90A2]">RECOMMEND</div>
            <h2 className="mt-2 font-display text-[40px]" style={{ letterSpacing: "-0.03em", fontWeight: 600 }}>
              데이터에 어울리는 차트를 먼저 보여 드립니다.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#3D4253]">
              MAC은 업로드된 데이터의 열 구조와 분포를 분석해 가장 적합한 차트를 적합도와 함께 제안합니다. 추천을 비교해 보고 마음에 드는 차트로 바로 편집을 시작하세요.
            </p>
            <div className="mt-6 rounded-xl border border-[#E5E7EC] p-4 bg-[#FBFBF8]">
              <div className="text-[10.5px] text-[#5B6173] mb-1.5">감지된 데이터 구조</div>
              <ul className="text-[12px] text-[#0B0D14] space-y-1">
                <li>· 범주 2개 · 수치 3개 · 시간 1개</li>
                <li>· 결측치 0% · 이상치 1.2%</li>
                <li>· 권장 단위 · 십억 원</li>
              </ul>
            </div>
            <button onClick={() => onEnter("editor")} className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[#0B0D14] hover:underline">
              차트 갤러리에서 더 보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="col-span-8">
            <div className="rounded-2xl border border-[#E5E7EC] bg-[#FBFBF8] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[14px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>데이터에 어울리는 차트</div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#5B6173]">
                  <Search className="w-3 h-3" /> 차트 검색
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recs.map((r, i) => (
                  <div key={r.n} className={`rounded-xl border bg-white p-3 ${i === 0 ? "border-[#0B0D14] shadow-[0_18px_40px_-24px_rgba(11,13,20,0.3)]" : "border-[#E5E7EC]"}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-[12.5px]" style={{ fontWeight: 500 }}>{r.n}</div>
                      <div className="text-[10px] text-[#5B6173] font-mono-num">적합도 {r.p}</div>
                    </div>
                    <div className="mt-2 h-[110px] bg-[#FBFBF8] rounded-lg overflow-hidden">
                      <MiniSpark type={r.type} color={r.pal.colors[0]} palette={r.pal.colors} />
                    </div>
                    <p className="mt-2 text-[10.5px] text-[#5B6173] leading-[1.5]">{r.why}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {r.pal.colors.slice(0, 5).map((c) => <span key={c} className="w-2 h-3.5 rounded-[1px]" style={{ background: c }} />)}
                      </div>
                      <button onClick={() => onEnter("editor")} className="text-[10.5px] text-[#0B0D14] flex items-center gap-1 hover:underline">
                        이 차트로 편집하기 <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Gallery */
function GalleryShowcase() {
  const groups = [
    { n: "비교", code: "01", desc: "범주별 값을 한눈에 비교", t: [{ n: "막대", live: true }, { n: "그룹 막대", live: true }, { n: "누적 막대", live: true }], tone: "bar" as const, pal: PALETTES.basicBlue.colors },
    { n: "추이", code: "02", desc: "시간에 따른 변화를 추적", t: [{ n: "선", live: true }, { n: "다중 선", live: true }, { n: "영역", live: false }], tone: "line" as const, pal: PALETTES.softNavy.colors },
    { n: "구성", code: "03", desc: "전체 대비 비중 보여주기", t: [{ n: "도넛", live: true }, { n: "파이", live: false }, { n: "트리맵", live: false }], tone: "donut" as const, pal: PALETTES.reportClassic.colors },
    { n: "분포", code: "04", desc: "데이터의 흩어짐과 밀도", t: [{ n: "산점도", live: false }, { n: "히트맵", live: false }, { n: "박스 플롯", live: false }], tone: "scatter" as const, pal: PALETTES.purpleFocus.colors },
    { n: "지도", code: "05", desc: "지역별 수치를 시각화", t: [{ n: "시도별 지도", live: false }, { n: "권역별 지도", live: false }], tone: "map" as const, pal: PALETTES.warmOrange.colors },
    { n: "순위 · 애니메이션", code: "06", desc: "시간에 따른 순위 변화", t: [{ n: "레이싱 바", live: true }, { n: "타임라인", live: false }], tone: "race" as const, pal: PALETTES.sharpContrast.colors },
  ];
  return (
    <div className="border-t border-[#E5E7EC] bg-[#FBFBF8]">
      <div className="max-w-[1320px] mx-auto px-10 py-24">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] tracking-[0.18em] text-[#8A90A2]">CHART GALLERY</div>
            <h2 className="mt-2 font-display text-[40px] max-w-[760px]" style={{ letterSpacing: "-0.03em", fontWeight: 600 }}>
              4개로 끝나지 않는, 확장되는 차트 시스템.
            </h2>
            <p className="mt-4 text-[14px] text-[#3D4253] max-w-[600px] leading-[1.7]">
              비교, 추이, 구성, 분포, 지도, 순위, 지표까지 목적별로 정리된 차트 갤러리. 새로운 차트는 같은 편집기 안에서 그대로 추가됩니다.
            </p>
          </div>
          <div className="text-[11px] text-[#5B6173] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25A18E]" /> 사용 가능 ·
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7CAD2] ml-1" /> 준비 중
          </div>
        </div>
        <div className="mt-12 grid grid-cols-4 gap-4">
          {groups.map((g, i) => (
            <div
              key={g.n}
              className={`rounded-2xl border border-[#E5E7EC] bg-white overflow-hidden flex flex-col ${i === 0 || i === 5 ? "lg:col-span-2" : ""}`}
              style={{ boxShadow: "0 18px 40px -28px rgba(11,13,20,0.18)" }}
            >
              <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.18em] text-[#8A90A2] font-mono-num">{g.code}</div>
                  <div className="mt-1.5 text-[16px]" style={{ fontWeight: 600, letterSpacing: "-0.015em" }}>{g.n}</div>
                  <div className="text-[11.5px] text-[#5B6173] mt-1">{g.desc}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9.5px] text-[#3D4253] font-mono-num">{g.t.filter((x) => x.live).length}/{g.t.length}</span>
                  <div className="flex gap-0.5">
                    {g.pal.slice(0, 5).map((c) => <span key={c} className="w-1.5 h-3 rounded-[1px]" style={{ background: c }} />)}
                  </div>
                </div>
              </div>
              <div className="px-5">
                <GalleryPreview tone={g.tone} palette={g.pal} wide={i === 0 || i === 5} />
              </div>
              <div className="px-5 pt-3 pb-4 mt-auto border-t border-[#F0F1F4]">
                <div className="space-y-1">
                  {g.t.map((c) => (
                    <div key={c.n} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.live ? "bg-[#25A18E]" : "bg-[#C7CAD2]"}`} />
                        <span className={c.live ? "text-[#0B0D14]" : "text-[#8A90A2]"}>{c.n}</span>
                      </div>
                      <span className={`text-[9.5px] font-mono-num tracking-wider ${c.live ? "text-[#3D4253]" : "text-[#8A90A2]"}`}>
                        {c.live ? "사용 가능" : "준비 중"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryPreview({ tone, palette, wide }: { tone: "bar" | "line" | "donut" | "scatter" | "map" | "race" | "metric"; palette: string[]; wide?: boolean }) {
  const h = wide ? 168 : 132;
  return (
    <div className="rounded-xl border border-[#F0F1F4] bg-[#FBFBF8] overflow-hidden">
      <div className="px-3 py-2 border-b border-[#F0F1F4] flex items-center justify-between">
        <span className="text-[10px] text-[#5B6173]" style={{ fontWeight: 500 }}>미리보기</span>
        <span className="font-mono-num text-[9px] text-[#8A90A2] tracking-wider">SAMPLE · 2026</span>
      </div>
      <div className="p-3" style={{ height: h }}>
        {tone === "bar" && <PreviewBar palette={palette} />}
        {tone === "line" && <PreviewLine palette={palette} />}
        {tone === "donut" && <PreviewDonut palette={palette} />}
        {tone === "scatter" && <PreviewScatter palette={palette} />}
        {tone === "map" && <PreviewMap palette={palette} />}
        {tone === "race" && <PreviewRace palette={palette} />}
        {tone === "metric" && <PreviewMetric palette={palette} />}
      </div>
    </div>
  );
}

function PreviewBar({ palette }: { palette: string[] }) {
  const data = [72, 58, 44, 36, 28, 20, 14];
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full">
      {[0, 25, 50, 75].map((g) => <line key={g} x1="22" x2="236" y1={108 - g} y2={108 - g} stroke="#EEF0F4" strokeDasharray={g === 0 ? "" : "2 3"} />)}
      <line x1="22" x2="236" y1="108" y2="108" stroke="#D5D8DF" />
      {[0, 25, 50, 75].map((g) => <text key={g} x="18" y={111 - g} textAnchor="end" fontSize="7" fill="#8A90A2" className="font-mono-num">{g}</text>)}
      {data.map((v, i) => (
        <g key={i}>
          <rect x={28 + i * 30} y={108 - v} width={20} height={v} rx={2} fill={palette[0]} opacity={1 - i * 0.08} />
          <text x={38 + i * 30} y={118} textAnchor="middle" fontSize="7" fill="#8A90A2">{["서울","경기","부산","인천","대구","대전","광주"][i]}</text>
        </g>
      ))}
    </svg>
  );
}
function PreviewLine({ palette }: { palette: string[] }) {
  const s1 = [18, 24, 22, 30, 36, 34, 44, 50, 56, 64, 70, 76];
  const s2 = [12, 16, 18, 22, 26, 30, 34, 40, 46, 50, 54, 60];
  const x = (i: number) => 22 + (i * 214) / 11;
  const y = (v: number) => 108 - v * 1.2;
  const path = (a: number[]) => a.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full">
      {[0, 30, 60, 90].map((g) => <line key={g} x1="22" x2="236" y1={108 - g * 1.2} y2={108 - g * 1.2} stroke="#EEF0F4" strokeDasharray={g === 0 ? "" : "2 3"} />)}
      <path d={`${path(s1)} L 236,108 L 22,108 Z`} fill={palette[0]} opacity="0.15" />
      <path d={path(s1)} fill="none" stroke={palette[0]} strokeWidth="1.6" />
      <path d={path(s2)} fill="none" stroke={palette[2] || palette[1]} strokeWidth="1.4" strokeDasharray="3 3" />
      {[0, 3, 6, 9, 11].map((i) => <circle key={i} cx={x(i)} cy={y(s1[i])} r="1.6" fill="#fff" stroke={palette[0]} strokeWidth="1.2" />)}
    </svg>
  );
}
function PreviewDonut({ palette }: { palette: string[] }) {
  const data = [38, 24, 18, 12, 8];
  const total = 100;
  let acc = 0;
  const r = 32, R = 50, cx = 70, cy = 60;
  const arcs = data.map((v, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += v;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
    return <path key={i} d={`M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z`} fill={palette[i % palette.length]} />;
  });
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full">
      {arcs}
      <circle cx={cx} cy={cy} r={r - 1} fill="#fff" />
      <text x={cx} y={cy + 1} textAnchor="middle" fontSize="14" fill="#0B0D14" className="font-mono-num" fontWeight="600">62%</text>
      {["모바일","데스크톱","태블릿","앱","기타"].map((l, i) => (
        <g key={l} transform={`translate(140, ${20 + i * 18})`}>
          <rect width="8" height="8" rx="1" fill={palette[i % palette.length]} />
          <text x="14" y="7" fontSize="8.5" fill="#0B0D14">{l}</text>
          <text x="92" y="7" textAnchor="end" fontSize="8.5" fill="#5B6173" className="font-mono-num">{data[i]}%</text>
        </g>
      ))}
    </svg>
  );
}
function PreviewScatter({ palette }: { palette: string[] }) {
  const pts = Array.from({ length: 32 }, (_, i) => [22 + ((i * 19) % 210), 12 + ((i * 13 + 7) % 88), 1.5 + ((i * 7) % 4)]);
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full">
      {[0, 25, 50, 75].map((g) => <line key={g} x1="22" x2="236" y1={108 - g} y2={108 - g} stroke="#EEF0F4" />)}
      {pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={palette[i % palette.length]} opacity="0.7" />)}
    </svg>
  );
}
function PreviewMap({ palette }: { palette: string[] }) {
  return (
    <svg viewBox="0 0 240 120" className="w-full h-full">
      <path d="M70 14 L120 18 L150 32 L160 56 L150 84 L168 96 L160 110 L120 110 L96 100 L80 80 L62 70 L52 50 L52 28 Z" fill={palette[1]} opacity="0.18" stroke={palette[1]} strokeWidth="1" />
      <path d="M84 30 L114 28 L132 42 L128 64 L102 68 L82 56 Z" fill={palette[2]} opacity="0.55" />
      <path d="M104 70 L142 76 L150 96 L120 96 L98 84 Z" fill={palette[1]} opacity="0.85" />
      <circle cx="124" cy="58" r="3" fill="#FF6A3D" />
      <text x="200" y="38" fontSize="8.5" fill="#0B0D14" fontWeight="500">서울</text>
      <text x="200" y="50" fontSize="7" fill="#8A90A2" className="font-mono-num">+18%</text>
      <text x="200" y="76" fontSize="8.5" fill="#0B0D14" fontWeight="500">경기</text>
      <text x="200" y="88" fontSize="7" fill="#8A90A2" className="font-mono-num">+12%</text>
    </svg>
  );
}
function PreviewRace({ palette }: { palette: string[] }) {
  const data = [{ n: "삼성전자", v: 0.92 }, { n: "TSMC", v: 0.78 }, { n: "SK하이닉스", v: 0.66 }, { n: "NVIDIA", v: 0.54 }, { n: "현대차", v: 0.42 }, { n: "LG에너지", v: 0.32 }];
  return (
    <svg viewBox="0 0 240 168" className="w-full h-full">
      <text x="232" y="42" textAnchor="end" fontSize="44" fill="#EEF0F4" fontWeight="700" className="font-mono-num" letterSpacing="-2">2024</text>
      {data.map((d, i) => (
        <g key={d.n}>
          <text x="6" y={26 + i * 20} fontSize="8" fill={i < 2 ? "#0B0D14" : "#8A90A2"} className="font-mono-num">{String(i + 1).padStart(2, "0")}</text>
          <text x="56" y={26 + i * 20} textAnchor="end" fontSize="8.5" fill="#0B0D14" fontWeight="500">{d.n}</text>
          <rect x="60" y={18 + i * 20} width={d.v * 150} height={11} rx={1.5} fill={palette[i % palette.length]} />
          <rect x={60 + d.v * 150} y={18 + i * 20} width={6} height={11} rx={1} fill={palette[i % palette.length]} opacity="0.25" />
          <text x={68 + d.v * 150} y={26 + i * 20} fontSize="8" fill="#0B0D14" className="font-mono-num">{Math.round(d.v * 1240)}</text>
        </g>
      ))}
      <line x1="6" x2="234" y1="156" y2="156" stroke="#E5E7EC" />
      <line x1="6" x2="170" y1="156" y2="156" stroke={palette[0]} strokeWidth="1.6" />
      {[2019, 2021, 2023, 2025].map((y, i) => <text key={y} x={6 + i * 76} y="166" fontSize="7" fill="#8A90A2" className="font-mono-num">{y}</text>)}
    </svg>
  );
}
function PreviewMetric({ palette }: { palette: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {[
        { l: "월간 매출", v: "₩2.41B", d: "+18.2%", up: true },
        { l: "신규 사용자", v: "12,840", d: "+24.5%", up: true },
        { l: "리텐션", v: "62.4%", d: "+1.2pt", up: true },
        { l: "이탈률", v: "3.1%", d: "−0.4pt", up: false },
      ].map((m, i) => (
        <div key={m.l} className="rounded-md bg-white border border-[#F0F1F4] px-2 py-1.5 flex flex-col justify-between">
          <div className="text-[8.5px] text-[#8A90A2]">{m.l}</div>
          <div>
            <div className="text-[13px] text-[#0B0D14] font-mono-num" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>{m.v}</div>
            <div className="text-[8.5px] font-mono-num" style={{ color: m.up ? palette[0] : "#D4183D" }}>{m.up ? "▲" : "▼"} {m.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Editor showcase — racing bar */
function EditorShowcase({ onEnter }: { onEnter: (s: "editor") => void }) {
  return (
    <div className="border-t border-[#E5E7EC] bg-[#0B0D14] text-white">
      <div className="max-w-[1320px] mx-auto px-10 py-24">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-4 pt-4">
            <div className="text-[11px] tracking-[0.18em] text-[#9AA0B1]">EDITOR · RACING BAR</div>
            <h2 className="mt-3 font-display text-[44px]" style={{ letterSpacing: "-0.032em", fontWeight: 600, lineHeight: 1.1 }}>
              순위 변화도<br />영상처럼 완성하세요.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#C7CAD2] max-w-[360px]">
              레이싱 바는 시간에 따른 순위 변화를 보여 주는 차트입니다. 연도 표시, 타임라인, 재생 속도까지 한 편집기 안에서 다듬어 발표용 영상으로 그대로 내보냅니다.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-[12px]">
              {[
                "표시할 순위 · 상위 10",
                "재생 속도 · 1.0×",
                "타임라인 표시 · 켜짐",
                "연도 표시 · 켜짐",
                "값 라벨 · 켜짐",
                "MP4 · 1080p · 30fps",
              ].map((t) => (
                <div key={t} className="border border-white/10 rounded-md px-2.5 py-2 text-[#C7CAD2]">{t}</div>
              ))}
            </div>
            <button onClick={() => onEnter("editor")} className="mt-7 px-4 py-3 rounded-full bg-white text-[#0B0D14] text-[13px] flex items-center gap-1.5 w-fit">
              레이싱 바 편집기 열기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="col-span-8">
            <div className="rounded-[20px] border border-white/10 bg-[#13151C] p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[14.5px]" style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>2026년 시가총액 상위 10</div>
                  <div className="text-[11px] text-[#9AA0B1] mt-0.5">단위 · 십억 USD · 출처 · MAC STUDIO 샘플</div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#C7CAD2]">
                  <button className="w-8 h-8 rounded-full bg-white text-[#0B0D14] flex items-center justify-center"><Play className="w-3.5 h-3.5" /></button>
                  <span className="font-mono-num">1.0×</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-5">
                <RacingBar className="w-full h-[420px]" palette={PALETTES.sharpContrast.colors} year={2024} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10.5px] text-[#9AA0B1] font-mono-num">
                <span>● MP4 내보내기 가능</span>
                <span>2019 → 2025 · 6.0초</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustSection() {
  const customers = ["삼성전자", "토스", "우아한형제들", "네이버", "라인", "쿠팡", "당근", "야놀자"];
  return (
    <div className="border-t border-[#E5E7EC] bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        <div className="text-[11px] tracking-[0.18em] text-[#8A90A2] text-center">국내 데이터 팀이 MAC을 사용합니다</div>
        <div className="mt-6 grid grid-cols-8 gap-6 items-center">
          {customers.map((c) => (
            <div key={c} className="text-center text-[14px] text-[#3D4253]" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterCTA({ onEnter }: { onEnter: (s: "workspace") => void }) {
  return (
    <div className="bg-[#FBFBF8] border-t border-[#E5E7EC]">
      <div className="max-w-[1320px] mx-auto px-10 py-20 text-center">
        <h2 className="font-display text-[52px] max-w-[820px] mx-auto" style={{ letterSpacing: "-0.035em", fontWeight: 600, lineHeight: 1.1 }}>
          지금 가진 데이터로,<br />발표용 차트를 시작하세요.
        </h2>
        <div className="mt-9 flex items-center justify-center gap-3">
          <button onClick={() => onEnter("workspace")} className="px-5 py-3.5 rounded-full bg-[#0B0D14] text-white text-[14px] flex items-center gap-2">
            시작하기 <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => onEnter("workspace")} className="px-5 py-3.5 rounded-full border border-[#0B0D14]/15 text-[#0B0D14] text-[14px]">
            작업공간 보기
          </button>
        </div>
        <div className="mt-16 pt-8 border-t border-[#E5E7EC] flex items-center justify-between text-[11px] text-[#8A90A2]">
          <Logo />
          <div className="flex items-center gap-6">
            <a>제품</a><a>차트 갤러리</a><a>요금</a><a>개인정보</a><a>약관</a>
          </div>
          <div className="font-mono-num">© 2026 MAC Studio</div>
        </div>
      </div>
    </div>
  );
}
