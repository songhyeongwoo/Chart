"use client";

import { Button, StatusBadge, TopBar } from "@mac/ui";
import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname.includes("/editor")) {
    return {
      title: "Primary visualization workspace",
      subtitle: "A desktop-first editing surface with a restrained command bar, project rail, preview canvas, and inspector."
    };
  }

  if (pathname.includes("/upload")) {
    return {
      title: "Dataset intake",
      subtitle: "A trusted upload step that previews structure and preserves the handoff into the editor."
    };
  }

  if (pathname === "/app/projects/new") {
    return {
      title: "New project setup",
      subtitle: "A lightweight staging step before upload creates the first project context."
    };
  }

  return {
    title: "Project hub",
    subtitle: "Recent work, clear re-entry, and a visible path into the next project."
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
          <StatusBadge label="Magic link planned" tone="neutral" />
          <StatusBadge label="Manual save only" tone="draft" withDot />
          <Button variant="tertiary" size="sm">
            UI system
          </Button>
        </>
      }
    />
  );
}
