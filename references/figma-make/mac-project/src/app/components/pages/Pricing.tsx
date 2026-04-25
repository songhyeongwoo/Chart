import { Check } from "lucide-react";
import { useNavigate } from "react-router";
import { PageShell, PageHeader } from "./PageShell";

const PLANS = [
  {
    k: "free", name: "무료", price: "₩0", per: "/ 월",
    desc: "가볍게 시작하는 개인 사용자를 위해.",
    features: ["프로젝트 3개", "기본 차트 유형 12종", "PNG 내보내기", "한국어 폰트 기본 세트"],
    cta: "무료로 시작하기", variant: "light",
  },
  {
    k: "pro", name: "Pro", price: "₩19,000", per: "/ 월",
    desc: "발표·리포트 작업을 자주 하는 실무자에게.",
    features: ["프로젝트 무제한", "전체 차트 유형", "SVG · PDF 내보내기", "브랜드 색상 팔레트", "버전 히스토리 90일"],
    cta: "Pro 시작하기", highlight: true, variant: "dark",
  },
  {
    k: "team", name: "Team", price: "₩39,000", per: "/ 인 / 월",
    desc: "팀 단위로 데이터 시각화를 운영할 때.",
    features: ["팀 워크스페이스", "공유 템플릿", "권한 관리", "감사 로그", "전담 지원"],
    cta: "팀 도입 문의", variant: "light",
  },
];

export function Pricing() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <PageHeader
        eyebrow="PRICING"
        title="필요한 만큼만, 명확하게."
        desc="개인부터 팀까지. 데이터 시각화 작업의 규모에 따라 선택할 수 있도록 단순한 세 단계로 정리했습니다."
      />
      <div className="max-w-[1180px] mx-auto px-10 pb-24 grid grid-cols-3 gap-5">
        {PLANS.map((p) => {
          const dark = p.variant === "dark";
          return (
            <div
              key={p.k}
              className={`rounded-2xl p-7 border ${dark ? "bg-[#0B0D14] text-white border-[#0B0D14]" : "bg-white border-[#E5E7EC]"} flex flex-col`}
            >
              {p.highlight && (
                <div className="text-[10.5px] tracking-[0.18em] text-[#5B6EFF] mb-3">RECOMMENDED</div>
              )}
              <div style={{ fontSize: 18, letterSpacing: "-0.02em", fontWeight: 600 }}>{p.name}</div>
              <p className={`mt-2 text-[13px] leading-[1.55] ${dark ? "text-[#C7CAD2]" : "text-[#5B6173]"}`}>{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-mono-num" style={{ fontSize: 36, letterSpacing: "-0.02em", fontWeight: 600 }}>{p.price}</span>
                <span className={`text-[12.5px] ${dark ? "text-[#9AA0B1]" : "text-[#9AA0B1]"}`}>{p.per}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px]">
                    <Check className={`w-3.5 h-3.5 mt-1 ${dark ? "text-[#5B6EFF]" : "text-[#1F3FFF]"}`} />
                    <span className={dark ? "text-[#E2E4EA]" : "text-[#0B0D14]"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/workspace")}
                className={`mt-7 px-4 py-2.5 rounded-full text-[13px] ${dark ? "bg-white text-[#0B0D14]" : "bg-[#0B0D14] text-white"}`}
              >
                {p.cta}
              </button>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
