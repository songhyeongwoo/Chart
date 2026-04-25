import { Link } from "react-router";
import { PageShell } from "./PageShell";

export function NotFound() {
  return (
    <PageShell>
      <div className="max-w-[1320px] mx-auto px-10 py-32 flex flex-col items-start">
        <div className="text-[10.5px] tracking-[0.18em] text-[#9AA0B1]">404</div>
        <h1 className="mt-4 font-display" style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 600 }}>
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="mt-5 text-[15px] text-[#5B6173] max-w-[520px] leading-[1.65]">
          요청하신 주소가 변경되었거나 존재하지 않습니다. 홈으로 돌아가 다시 시도해 주세요.
        </p>
        <Link to="/" className="mt-8 px-4 py-2.5 rounded-full bg-[#0B0D14] text-white text-[13px]">홈으로 돌아가기</Link>
      </div>
    </PageShell>
  );
}
