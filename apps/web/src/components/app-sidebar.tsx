"use client";

import { PRODUCT_NAME } from "@mac/domain";
import { Card, LoadingState, Sidebar, StatusBadge } from "@mac/ui";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/app/projects",
    label: "Projects",
    caption: "Recent work and re-entry",
    badge: "Hub",
    match: (pathname: string) => pathname === "/app/projects"
  },
  {
    href: "/app/projects/new",
    label: "New Project",
    caption: "Start an upload-first flow",
    match: (pathname: string) => pathname === "/app/projects/new"
  },
  {
    href: "/app/projects/proj_q1-growth/upload",
    label: "Upload",
    caption: "Dataset confirmation step",
    match: (pathname: string) => pathname.includes("/upload")
  },
  {
    href: "/app/projects/proj_q1-growth/editor",
    label: "Editor",
    caption: "Primary desktop workspace",
    badge: "Primary",
    match: (pathname: string) => pathname.includes("/editor")
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      title={`${PRODUCT_NAME} workspace`}
      items={navigationItems.map((item) => ({
        href: item.href,
        label: item.label,
        caption: item.caption,
        badge: item.badge,
        active: item.match(pathname)
      }))}
      footer={
        <div className="space-y-3">
          <Card variant="subtle" padding="compact" title="Workspace mode">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-2">Solo foundation</span>
              <StatusBadge label="Private" tone="private" />
            </div>
          </Card>
          <Card variant="subtle" padding="compact" title="Current scope">
            <p className="text-sm leading-6 text-ink-2">
              Demo shell only. Auth, DB, upload processing, and persistence are intentionally not connected yet.
            </p>
          </Card>
          <Card variant="ghost" padding="compact" title="System readiness">
            <LoadingState lines={2} />
          </Card>
        </div>
      }
    />
  );
}
