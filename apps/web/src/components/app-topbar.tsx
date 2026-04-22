"use client";

import { Button, StatusBadge, TopBar } from "@mac/ui";
import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname.includes("/editor")) {
    return {
      title: "Editor workspace",
      subtitle: "Desktop-first chart editing shell with project rail, preview canvas, and inspector."
    };
  }

  if (pathname.includes("/upload")) {
    return {
      title: "Upload flow",
      subtitle: "Structured intake step for CSV/XLSX before the editor session is hydrated."
    };
  }

  if (pathname === "/app/projects/new") {
    return {
      title: "New project",
      subtitle: "Primary entry route into the upload-first creation flow."
    };
  }

  return {
    title: "Project hub",
    subtitle: "Recent projects, create-project CTA, and re-entry patterns inside the shared app shell."
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
        <div className="flex flex-wrap items-center justify-end gap-2">
          <StatusBadge label="Magic link planned" tone="private" />
          <StatusBadge label="Manual save only" tone="draft" />
          <Button variant="secondary">Design system</Button>
        </div>
      }
    />
  );
}

