import { AUTH_MODE } from "@mac/domain";
import { Button, Input, PublicShell, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../../components/public-nav";

export default function LoginPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="brand-kicker">Workspace Access</p>
          <h1 className="mt-4 max-w-[11ch] text-[clamp(2.8rem,4.8vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-ink-1">
            작업공간으로
            <br />
            바로 들어가기.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink-2">
            로그인은 편집 흐름을 끊지 않는 짧은 관문입니다. 비공개 프로젝트와 로컬 편집 상태를 이어서 확인합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <StatusBadge label={AUTH_MODE} tone="neutral" />
            <StatusBadge label="비공개 작업공간" tone="private" />
            <StatusBadge label="목업 인증" tone="draft" withDot />
          </div>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-line-strong bg-surface-1/96 shadow-panel">
          <div className="border-b border-line-subtle px-6 py-5">
            <p className="brand-kicker">Magic Link</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-ink-1">이메일로 계속</h2>
            <p className="mt-2 text-sm leading-6 text-ink-2">실제 발송은 아직 연결하지 않았습니다. 최종 인증 화면을 위한 입력 상태만 검증합니다.</p>
          </div>
          <div className="space-y-5 px-6 py-6">
            <Input label="이메일" placeholder="name@company.com" type="email" hint="개인 작업공간과 비공개 프로젝트를 불러올 주소입니다." />
            <Button className="w-full" size="lg">
              매직 링크 받기
            </Button>
            <div className="rounded-[18px] border border-line-subtle bg-surface-2/72 px-4 py-4 text-sm leading-6 text-ink-2">
              준비된 상태: 기본, 발송 중, 형식 오류, 만료 토큰. 지금은 작업공간 진입 톤과 폼 레이아웃을 확인합니다.
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle px-6 py-4">
            <p className="text-xs text-ink-3">테스트 중에는 인증 없이 앱을 열 수 있습니다.</p>
            <Link className="text-sm font-medium text-accent hover:text-accent-strong" href="/app/projects">
              바로 앱 보기
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
