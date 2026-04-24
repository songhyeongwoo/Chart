"use client";

import { PRODUCT_NAME } from "@mac/domain";
import { Card, LoadingState, Sidebar, StatusBadge } from "@mac/ui";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/app/projects",
    label: "프로젝트",
    caption: "최근 작업과 재진입",
    badge: "허브",
    match: (pathname: string) => pathname === "/app/projects"
  },
  {
    href: "/app/projects/new",
    label: "새 프로젝트",
    caption: "업로드부터 시작하기",
    match: (pathname: string) => pathname === "/app/projects/new"
  },
  {
    href: "/app/projects/proj_q1-growth/upload",
    label: "데이터 입력",
    caption: "파일 확인과 초안 준비",
    match: (pathname: string) => pathname.includes("/upload")
  },
  {
    href: "/app/projects/proj_q1-growth/editor",
    label: "에디터",
    caption: "핵심 편집 작업 공간",
    badge: "핵심",
    match: (pathname: string) => pathname.includes("/editor")
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      title={`${PRODUCT_NAME} 작업공간`}
      items={navigationItems.map((item) => ({
        href: item.href,
        label: item.label,
        caption: item.caption,
        badge: item.badge,
        active: item.match(pathname)
      }))}
      footer={
        <div className="space-y-3">
          <Card variant="subtle" padding="compact" title="현재 모드">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-2">개인 작업공간</span>
              <StatusBadge label="비공개" tone="private" />
            </div>
          </Card>
          <Card variant="subtle" padding="compact" title="이번 단계 범위">
            <p className="text-sm leading-6 text-ink-2">
              인증, DB, 실제 파싱, 저장은 아직 연결하지 않았고, 이번 단계는 제품 흐름과 편집 경험 완성도에 집중합니다.
            </p>
          </Card>
          <Card variant="ghost" padding="compact" title="시스템 준비 상태">
            <LoadingState lines={2} />
          </Card>
        </div>
      }
    />
  );
}
