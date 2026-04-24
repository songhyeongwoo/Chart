"use client";

import { Button, StatusBadge, TopBar } from "@mac/ui";
import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname.includes("/editor")) {
    return {
      title: "차트 편집기",
      subtitle: "중앙 캔버스에서 결과물을 보며 제목, 라벨, 축, 범례, 색상, 레이아웃을 직접 다듬는 작업 화면입니다."
    };
  }

  if (pathname.includes("/upload")) {
    return {
      title: "데이터 입력",
      subtitle: "열 구조와 표본 행을 먼저 확인하고, 추천 차트 초안을 정리한 뒤 에디터로 넘기는 관문입니다."
    };
  }

  if (pathname === "/app/projects/new") {
    return {
      title: "새 프로젝트",
      subtitle: "복잡한 설정 없이 프로젝트 맥락을 정하고 바로 업로드 단계로 이어집니다."
    };
  }

  return {
    title: "프로젝트 허브",
    subtitle: "최근 작업을 다시 열고, 업로드로 돌아가고, 새 차트를 시작하는 흐름을 한 화면에서 정리합니다."
  };
}

export function AppTopBar() {
  const pathname = usePathname();
  const copy = getTitle(pathname);

  return (
    <TopBar
      title={copy.title}
      subtitle={copy.subtitle}
      actions={
        <>
          <StatusBadge label="한국어 중심" tone="neutral" />
          <StatusBadge label="로컬 상태 편집" tone="draft" withDot />
          <Button variant="secondary" size="sm">
            디자인 시스템
          </Button>
        </>
      }
    />
  );
}
