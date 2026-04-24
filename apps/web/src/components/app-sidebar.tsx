"use client";

import { PRODUCT_NAME } from "@mac/domain";
import { Sidebar } from "@mac/ui";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/app/projects",
    label: "프로젝트",
    caption: "최근 작업과 재진입 흐름",
    badge: "허브",
    match: (pathname: string) => pathname === "/app/projects"
  },
  {
    href: "/app/projects/new",
    label: "새 프로젝트",
    caption: "업로드부터 새로 시작",
    match: (pathname: string) => pathname === "/app/projects/new"
  },
  {
    href: "/app/projects/proj_q1-growth/upload",
    label: "데이터 입력",
    caption: "구조 확인과 추천 준비",
    match: (pathname: string) => pathname.includes("/upload")
  },
  {
    href: "/app/projects/proj_q1-growth/editor",
    label: "에디터",
    caption: "차트 캔버스와 inspector",
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
        <div className="space-y-3 rounded-[24px] border border-white/8 bg-white/4 px-4 py-4 text-sm text-white/72">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/42">Current Mode</p>
            <p className="mt-2 text-sm font-medium text-white">개인 작업공간 · 비공개</p>
          </div>
          <div className="border-t border-white/8 pt-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/42">This Build</p>
            <p className="mt-2 leading-6">인증, DB, 실제 export는 아직 연결하지 않고, 제품 장면과 편집 경험 완성도에 집중합니다.</p>
          </div>
        </div>
      }
    />
  );
}
