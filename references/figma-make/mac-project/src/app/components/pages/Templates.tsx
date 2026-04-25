import { PageShell, PageHeader } from "./PageShell";

const TEMPLATES = [
  { k: "report", name: "발표용 리포트", tag: "프레젠테이션", desc: "분기 매출 · KPI · 성장 지표를 슬라이드 톤으로 구성합니다." },
  { k: "invest", name: "투자 리포트", tag: "IR · 재무", desc: "재무 추이와 비중 분석을 정제된 톤으로 정리합니다." },
  { k: "marketing", name: "마케팅 대시보드", tag: "퍼포먼스", desc: "캠페인 성과와 채널 비교를 한 화면에 담습니다." },
  { k: "public", name: "공공데이터 분석", tag: "리서치", desc: "지역 · 인구 · 시계열 데이터를 명료하게 표현합니다." },
  { k: "newsletter", name: "뉴스레터 차트", tag: "콘텐츠", desc: "본문에 어울리는 가독성 높은 차트 세트를 제공합니다." },
  { k: "ops", name: "운영 리뷰", tag: "내부 보고", desc: "주간 · 월간 운영 지표를 정형화된 양식으로 보여줍니다." },
];

export function Templates() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="TEMPLATES"
        title="템플릿으로 더 빠르게."
        desc="자주 쓰는 보고 양식을 템플릿으로 정리했습니다. 데이터만 바꿔 끼우면 발표용 차트가 됩니다. 템플릿은 곧 순차적으로 추가됩니다."
      />
      <div className="max-w-[1320px] mx-auto px-10 pb-24 grid grid-cols-3 gap-5">
        {TEMPLATES.map((t) => (
          <div key={t.k} className="rounded-2xl border border-[#E5E7EC] bg-white overflow-hidden">
            <div className="h-[180px] bg-gradient-to-br from-[#F5F6F8] to-[#EAEBEF] relative">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#0B0D14 1px, transparent 1px), linear-gradient(90deg, #0B0D14 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute bottom-3 left-4 text-[10.5px] tracking-[0.16em] text-[#5B6173]">{t.tag.toUpperCase()}</div>
            </div>
            <div className="p-5">
              <div style={{ fontSize: 17, letterSpacing: "-0.02em", fontWeight: 600 }}>{t.name}</div>
              <p className="mt-2 text-[13px] text-[#5B6173] leading-[1.55]">{t.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FBF3E2] text-[#9A6B00]">준비 중</span>
                <span className="text-[11.5px] text-[#9AA0B1]">곧 공개</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
