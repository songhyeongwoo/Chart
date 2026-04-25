import { Logo } from "./Logo";
import { MiniSpark, PALETTES } from "./Charts";
import { Search, Plus, Folder, Clock, Star, Download, Grid3x3, ChevronRight, Settings2, MoreHorizontal, Sparkles } from "lucide-react";

type Project = {
  title: string; subtitle: string; type: "line" | "bar" | "donut" | "race" | "area" | "scatter";
  palette: string[]; status: "저장됨" | "내보냄" | "초안";
  edited: string; formats: string[]; tag: string; owner: string;
};

const projects: Project[] = [
  { title: "2026 1분기 지역별 매출", subtitle: "막대 · 전년 동기 비교", type: "bar", palette: PALETTES.basicBlue.colors, status: "내보냄", edited: "오늘", formats: ["PNG", "SVG"], tag: "매출", owner: "김재훈" },
  { title: "월별 활성 사용자 추이", subtitle: "선 · MAU 3개월 롤링", type: "line", palette: PALETTES.softNavy.colors, status: "저장됨", edited: "어제", formats: ["PNG"], tag: "프로덕트", owner: "이서연" },
  { title: "기기별 트래픽 점유율", subtitle: "도넛 · 5개 채널", type: "donut", palette: PALETTES.warmOrange.colors, status: "저장됨", edited: "2일 전", formats: ["SVG"], tag: "리서치", owner: "박지훈" },
  { title: "글로벌 시가총액 Top 10", subtitle: "레이싱 · 2019 → 2025", type: "race", palette: PALETTES.sharpContrast.colors, status: "내보냄", edited: "3일 전", formats: ["MP4"], tag: "증권", owner: "김재훈" },
  { title: "분기별 고객 만족도 추이", subtitle: "선 · NPS 지표", type: "line", palette: PALETTES.purpleFocus.colors, status: "초안", edited: "4일 전", formats: [], tag: "CX", owner: "최민지" },
  { title: "카테고리별 매출 비중", subtitle: "도넛 · 5개 카테고리", type: "donut", palette: PALETTES.reportClassic.colors, status: "저장됨", edited: "지난 주", formats: ["PNG"], tag: "매출", owner: "김재훈" },
  { title: "광고비 대비 전환율", subtitle: "산점도 · 상관 분석", type: "scatter", palette: PALETTES.newsroom.colors, status: "저장됨", edited: "지난 주", formats: ["SVG"], tag: "마케팅", owner: "이서연" },
  { title: "스타트업 투자액 레이스", subtitle: "레이싱 · 월간 순위", type: "race", palette: PALETTES.sharpContrast.colors, status: "초안", edited: "10일 전", formats: [], tag: "투자", owner: "박지훈" },
];

export function Workspace({ onOpenEditor, onBack }: { onOpenEditor: () => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#FBFBF8] text-[#0B0D14] flex font-display">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 border-r border-black/[0.06] bg-white px-5 py-6 flex flex-col">
        <button onClick={onBack}><Logo /></button>

        <div className="mt-5 mb-5">
          <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F7] px-2.5 py-1.5 text-[11px] text-[#3D4253]">
            <span className="w-5 h-5 rounded bg-[#0B0D14]" />
            <span className="flex-1 truncate" style={{ fontWeight: 500 }}>데이터랩</span>
            <ChevronRight size={12} className="text-[#8A90A2]" />
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#8A90A2] mb-2 px-2">라이브러리</div>
          <NavItem icon={<Grid3x3 size={14} />} label="내 프로젝트" active meta="42" />
          <NavItem icon={<Clock size={14} />} label="최근 작업" meta="12" />
          <NavItem icon={<Star size={14} />} label="즐겨찾기" meta="6" />
          <NavItem icon={<Download size={14} />} label="내보낸 파일" meta="18" />
          <NavItem icon={<Sparkles size={14} />} label="차트 갤러리" />
        </div>

        <div className="mt-7">
          <div className="text-[10px] uppercase tracking-wider text-[#8A90A2] mb-2 px-2 flex items-center justify-between">
            폴더 <Plus size={12} className="cursor-pointer hover:text-[#0B0D14]" />
          </div>
          {[
            { n: "매출 리포트", c: "#1F3FFF", m: 12 },
            { n: "프로덕트 분석", c: "#25A18E", m: 7 },
            { n: "증권 자료", c: "#C2703A", m: 4 },
            { n: "CX 리서치", c: "#8A6CC7", m: 3 },
            { n: "공공 데이터", c: "#0B0D14", m: 9 },
          ].map((f) => (
            <NavItem key={f.n} icon={<span className="w-2.5 h-2.5 rounded-sm" style={{ background: f.c }} />} label={f.n} meta={String(f.m)} />
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="rounded-xl border border-black/[0.06] p-3.5 mb-3 bg-white">
            <div className="text-[10.5px] text-[#8A90A2]">이번 달 사용량</div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-[18px] font-mono-num text-[#0B0D14]" style={{ fontWeight: 600 }}>128</span>
              <span className="text-[10.5px] text-[#8A90A2]">/ 200 차트</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-[#EEF0F4]"><div className="h-1 rounded-full bg-[#0B0D14]" style={{ width: "64%" }} /></div>
            <button className="mt-2.5 w-full h-7 rounded-md bg-[#0B0D14] text-white text-[10.5px]" style={{ fontWeight: 500 }}>플랜 업그레이드</button>
          </div>
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-[#1F3FFF] text-white text-[11px] flex items-center justify-center" style={{ fontWeight: 500 }}>김</div>
            <div className="flex-1">
              <div className="text-[11.5px]" style={{ fontWeight: 500 }}>김재훈</div>
              <div className="text-[10px] text-[#8A90A2]">Pro · 팀</div>
            </div>
            <Settings2 size={14} className="text-[#8A90A2]" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <div className="h-[60px] border-b border-black/[0.06] px-10 flex items-center gap-4 bg-white">
          <div className="flex items-center gap-1.5 text-[12px] text-[#5B6173]">
            <span>데이터랩</span><ChevronRight size={12} /><span className="text-[#0B0D14]">내 프로젝트</span>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-[480px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A90A2]" />
              <input placeholder="프로젝트, 차트 제목, 태그 검색" className="w-full h-9 pl-10 pr-16 rounded-full bg-[#F3F4F7] border border-transparent focus:border-[#0B0D14]/20 outline-none text-[12.5px]" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9.5px] text-[#8A90A2] font-mono-num border border-black/10 rounded px-1 py-0.5">⌘K</span>
            </div>
          </div>
          <button className="h-9 px-3.5 rounded-full text-[12.5px] text-[#3D4253] hover:bg-black/[0.04] inline-flex items-center gap-1.5"><Folder size={13} /> 새 폴더</button>
          <button onClick={onOpenEditor} className="h-9 px-4 rounded-full bg-[#0B0D14] text-white text-[12.5px] inline-flex items-center gap-1.5"><Plus size={14} /> 새 시각화 만들기</button>
        </div>

        <section className="px-10 pt-9 pb-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11.5px] text-[#5B6173] font-mono-num">2026 · 04 · 24 금요일</div>
              <h1 className="mt-2" style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                내 프로젝트 <span className="text-[#8A90A2] font-mono-num" style={{ fontSize: 20, fontWeight: 400 }}>· 42</span>
              </h1>
              <div className="mt-1.5 text-[12.5px] text-[#5B6173]">이번 주 7건 업데이트</div>
            </div>
            <div className="flex items-center gap-1.5">
              <FilterChip label="전체" active />
              <FilterChip label="저장됨" />
              <FilterChip label="내보냄" />
              <FilterChip label="초안" />
              <div className="w-px h-5 bg-black/10 mx-1" />
              <button className="h-8 px-3 rounded-full border border-black/10 bg-white text-[11.5px] text-[#3D4253]">최근 수정순</button>
            </div>
          </div>
        </section>

        <section className="px-10">
          <div className="grid grid-cols-12 gap-5">
            <FeaturedCard onOpen={onOpenEditor} />
            <RecentActivity />
          </div>
        </section>

        <section className="px-10 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: 15, fontWeight: 500 }}>모든 시각화 <span className="text-[11.5px] text-[#8A90A2] font-mono-num ml-1">8 / 42</span></h2>
            <div className="flex items-center gap-1 bg-white border border-black/[0.06] rounded-full p-0.5">
              <button className="h-7 px-2.5 rounded-full bg-[#0B0D14] text-white text-[10.5px]">그리드</button>
              <button className="h-7 px-2.5 rounded-full text-[#5B6173] text-[10.5px]">리스트</button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {projects.map((p) => <ProjectCard key={p.title} p={p} onOpen={onOpenEditor} />)}
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, meta }: { icon: React.ReactNode; label: string; active?: boolean; meta?: string }) {
  return (
    <button className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12.5px] ${active ? "bg-[#0B0D14] text-white" : "text-[#3D4253] hover:bg-black/[0.04]"}`}>
      <span className={`w-4 flex items-center justify-center ${active ? "text-white" : "text-[#8A90A2]"}`}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {meta && <span className={`text-[10px] font-mono-num ${active ? "text-white/60" : "text-[#8A90A2]"}`}>{meta}</span>}
    </button>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return <button className={`h-8 px-3.5 rounded-full text-[11.5px] ${active ? "bg-[#0B0D14] text-white" : "bg-white border border-black/[0.06] text-[#3D4253]"}`}>{label}</button>;
}

function FeaturedCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="col-span-8 rounded-2xl overflow-hidden bg-white border border-black/[0.06]" style={{ minHeight: 260 }}>
      <div className="grid grid-cols-[1fr_260px] h-full">
        <div className="p-7 flex flex-col">
          <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#8A90A2]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" /> 진행 중 리포트
          </div>
          <div className="mt-3" style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em" }}>2026 Q1 판매 실적 분석</div>
          <div className="mt-2 text-[12.5px] text-[#5B6173] max-w-[520px] leading-[1.65]">
            지역·카테고리별 매출 추세를 한 세트로 구성한 리포트입니다. 발표 자료에 바로 삽입할 수 있도록 정리되어 있습니다.
          </div>
          <div className="mt-5 flex items-center gap-5 text-[11px] text-[#5B6173]">
            <span><span className="text-[#0B0D14] font-mono-num" style={{ fontWeight: 500 }}>4</span>개 차트</span>
            <span><span className="text-[#0B0D14] font-mono-num" style={{ fontWeight: 500 }}>412</span>행 데이터</span>
            <span>편집 <span className="text-[#0B0D14]" style={{ fontWeight: 500 }}>김재훈</span></span>
            <span className="font-mono-num text-[#8A90A2]">오늘 14:14</span>
          </div>
          <div className="mt-auto pt-5 flex items-center gap-2">
            <button onClick={onOpen} className="h-10 pl-5 pr-4 rounded-full bg-[#0B0D14] text-white text-[12.5px] inline-flex items-center gap-2" style={{ fontWeight: 500 }}>
              작업공간 열기 <span className="w-6 h-6 rounded-full bg-white text-[#0B0D14] inline-flex items-center justify-center">→</span>
            </button>
            <button className="h-10 px-4 rounded-full border border-black/10 text-[#3D4253] text-[12px]">리포트 미리보기</button>
          </div>
        </div>
        <div className="border-l border-black/[0.05] bg-[#FBFBF8] p-4 flex flex-col gap-2">
          {[
            { t: "지역별 매출", s: "막대", type: "bar" as const, c: "#1F3FFF" },
            { t: "카테고리 비중", s: "도넛", type: "donut" as const, c: "#FF6A3D" },
            { t: "월별 추이", s: "선", type: "line" as const, c: "#25A18E" },
            { t: "브랜드 순위", s: "레이싱", type: "race" as const, c: "#0B0D14" },
          ].map((x) => (
            <div key={x.t} className="rounded-md bg-white border border-black/[0.05] p-2 flex items-center gap-2.5">
              <div className="w-14 h-10 rounded bg-[#FBFBF8]"><MiniSpark type={x.type} color={x.c} /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[10.5px] truncate" style={{ fontWeight: 500 }}>{x.t}</div>
                <div className="text-[9.5px] text-[#8A90A2]">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  const items = [
    { t: "도시별 매출 데이터 업로드", d: "10분 전", c: "#1F3FFF", u: "김" },
    { t: "Q1 리포트 PNG 내보냄",    d: "1시간 전", c: "#25A18E", u: "김" },
    { t: "도넛 팔레트 수정",         d: "3시간 전", c: "#C2703A", u: "이" },
    { t: "레이싱 MP4 내보냄",        d: "어제",     c: "#8A6CC7", u: "박" },
  ];
  return (
    <div className="col-span-4 rounded-2xl bg-white border border-black/[0.06] p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-[13px]" style={{ fontWeight: 500 }}>최근 활동</div>
        <span className="text-[10px] text-[#8A90A2]">이번 주</span>
      </div>
      <ul className="mt-4 space-y-3 flex-1">
        {items.map((i) => (
          <li key={i.t} className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] text-white" style={{ background: i.c, fontWeight: 500 }}>{i.u}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] truncate">{i.t}</div>
              <div className="text-[10px] text-[#8A90A2] font-mono-num">{i.d}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-black/[0.06]">
        <div className="flex items-center justify-between text-[10.5px] text-[#5B6173] mb-2">
          <span>이번 주 내보낸 파일</span><span className="text-[#0B0D14] font-mono-num" style={{ fontWeight: 500 }}>7</span>
        </div>
        <div className="flex items-end gap-1.5 h-12">
          {[40, 62, 38, 80, 54, 72, 48].map((v, i) => {
            const active = i === 3;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm" style={{ height: `${v * 0.4}px`, background: active ? "#0B0D14" : "#E6E9F0" }} />
                <span className={`text-[8.5px] ${active ? "text-[#0B0D14]" : "text-[#8A90A2]"}`}>{"월화수목금토일"[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const statusStyle =
    p.status === "내보냄" ? "text-[#1F7A43]" :
    p.status === "저장됨" ? "text-[#1F3FFF]" :
    "text-[#8A6A12]";
  const typeLabel = { bar: "막대", line: "선", donut: "도넛", race: "레이싱", area: "영역", scatter: "산점도" }[p.type];
  return (
    <button onClick={onOpen} className="group text-left rounded-xl bg-white border border-black/[0.06] hover:border-black/25 hover:-translate-y-0.5 transition overflow-hidden flex flex-col relative">
      <div className="relative aspect-[16/10] bg-[#FBFBF8] border-b border-black/[0.05] p-3.5 flex flex-col">
        <div className="flex items-start justify-between">
          <div className="text-[10px] text-[#8A90A2]">{typeLabel}</div>
          <div className="flex items-center gap-1">
            <span className={`text-[9.5px] ${statusStyle}`} style={{ fontWeight: 500 }}>● {p.status}</span>
          </div>
        </div>
        <div className="flex-1 mt-1 -mx-1">
          <MiniSpark type={p.type as any} color={p.palette[0]} palette={p.palette} />
        </div>
      </div>
      <div className="p-3.5">
        <div className="text-[12.5px] text-[#0B0D14] truncate" style={{ fontWeight: 500 }}>{p.title}</div>
        <div className="mt-0.5 text-[10.5px] text-[#8A90A2] truncate">{p.subtitle}</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-[#5B6173]">{p.edited} · {p.owner}</span>
          <div className="flex items-center gap-1">
            {p.formats.slice(0, 2).map((f) => (
              <span key={f} className="text-[8.5px] px-1.5 py-0.5 rounded text-[#5B6173] bg-[#F3F4F7] font-mono-num">{f}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
        <MoreHorizontal size={14} className="text-[#5B6173]" />
      </div>
    </button>
  );
}
