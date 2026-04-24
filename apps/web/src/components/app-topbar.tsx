"use client";

import { Button, StatusBadge, TopBar } from "@mac/ui";
import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname.includes("/editor")) {
    return {
      title: "시각화 에디터",
      subtitle: "차트 선택, 데이터 확인, 옵션 조정, 결과 확인이 한 화면 안에서 이어지는 편집 공간입니다."
    };
  }

  if (pathname.includes("/upload")) {
    return {
      title: "데이터 입력",
      subtitle: "파일 구조를 먼저 확인하고, 편집기로 넘겨질 첫 차트 초안을 준비합니다."
    };
  }

  if (pathname === "/app/projects/new") {
    return {
      title: "새 프로젝트",
      subtitle: "복잡한 설정 없이 프로젝트 이름을 정하고 바로 데이터 입력으로 이어집니다."
    };
  }

  return {
    title: "프로젝트 허브",
    subtitle: "최근 작업을 다시 열고, 새 시각화를 시작하는 흐름이 한눈에 보이도록 정리합니다."
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
          <Button variant="tertiary" size="sm">
            디자인 시스템
          </Button>
        </>
      }
    />
  );
}
