"use client";

import { PageShell, PageHeader } from "./PageShell";

const CASES = [
  { k: "report", title: "분기 보고서", who: "기획 · 전략", desc: "분기별 매출과 KPI 흐름을 정제된 차트로 정리해 임원 보고에 바로 사용합니다." },
  { k: "deck", title: "발표 자료", who: "마케팅 · PM", desc: "슬라이드에 어울리는 톤의 차트를 빠르게 만들고, PNG·SVG로 바로 내보냅니다." },
  { k: "newsletter", title: "뉴스레터", who: "콘텐츠 · 미디어", desc: "본문 가독성을 해치지 않는 차트로 데이터 콘텐츠의 설득력을 높입니다." },
  { k: "public", title: "공공데이터", who: "리서치 · 공공", desc: "지역·인구·시계열 데이터를 표준화된 형식으로 시각화합니다." },
  { k: "ir", title: "투자 리포트", who: "재무 · IR", desc: "재무 추이와 비중 분석을 IR 톤에 맞게 정리합니다." },
];

export function UseCases() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="USE CASES"
        title="이런 작업에 어울립니다."
        desc="MAC은 발표 자료, 뉴스레터, 공공데이터 분석, 투자 리포트까지 다양한 보고 작업에서 가장 많이 사용됩니다."
      />
      <div className="max-w-[1320px] mx-auto px-10 pb-24 grid grid-cols-2 gap-5">
        {CASES.map((c) => (
          <div key={c.k} className="rounded-2xl border border-[#E5E7EC] bg-white p-7">
            <div className="text-[10.5px] tracking-[0.18em] text-[#9AA0B1]">{c.who.toUpperCase()}</div>
            <div className="mt-3" style={{ fontSize: 22, letterSpacing: "-0.02em", fontWeight: 600 }}>{c.title}</div>
            <p className="mt-3 text-[14px] text-[#5B6173] leading-[1.6]">{c.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

