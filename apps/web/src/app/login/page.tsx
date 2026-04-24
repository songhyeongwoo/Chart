import { AUTH_MODE } from "@mac/domain";
import { Button, Card, Input, MetricStrip, PublicShell, StatusBadge } from "@mac/ui";
import Link from "next/link";
import { PublicNav } from "../../components/public-nav";

export default function LoginPage() {
  return (
    <PublicShell nav={<PublicNav />}>
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center py-12">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <p className="text-caption uppercase tracking-[0.22em] text-ink-3">Authentication</p>
            <h1 className="mt-4 max-w-2xl font-display text-display text-ink-1">
              비공개 시각화 작업공간으로
              <br />
              조용하고 자연스럽게 들어가는 로그인 화면
            </h1>
            <p className="mt-5 max-w-xl text-body text-ink-2">
              로그인 화면도 별도 마케팅 페이지처럼 느껴지지 않아야 합니다. 에디터와 같은 여백, 같은 표면 질감, 같은 톤으로
              연결해 제품 경험이 끊기지 않게 구성했습니다.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <StatusBadge label={AUTH_MODE} tone="neutral" />
              <StatusBadge label="비공개 프로젝트 접근" tone="private" />
            </div>
            <MetricStrip
              className="mt-8"
              items={[
                { label: "인증 방식", value: "매직 링크", hint: "이메일 기반 진입 흐름" },
                { label: "세션 상태", value: "아직 목업 단계", hint: "실제 연결 전 UI 검증" },
                { label: "제품 톤", value: "에디터와 같은 질감", hint: "분리된 화면처럼 보이지 않게 유지" }
              ]}
            />
          </div>

          <Card
            variant="canvas"
            title="이메일로 계속"
            description="비공개 프로젝트에 들어갈 때 사용할 이메일 주소를 입력합니다."
            footer={
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-ink-3">현재는 시각 QA용 목업입니다. 발송, 검증, 세션 생성은 아직 연결되지 않았습니다.</p>
                <Link className="text-sm font-medium text-accent transition hover:text-accent-strong" href="/app/projects">
                  바로 앱 보기
                </Link>
              </div>
            }
          >
            <div className="space-y-5">
              <Input
                label="이메일"
                placeholder="name@company.com"
                type="email"
                hint="매직 링크 발송은 아직 연결되지 않았습니다. 최종 로그인 표면을 다듬기 위한 입력 필드입니다."
              />
              <Button className="w-full" size="lg">
                매직 링크 받기
              </Button>
              <div className="rounded-lg border border-line-subtle bg-surface-2 px-4 py-4 text-sm leading-6 text-ink-2">
                준비된 상태: 기본, 전송 중, 발송 완료, 이메일 형식 오류, 만료 토큰. 이 상태들 역시 에디터만큼 세심한 톤으로
                읽혀야 합니다.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}
