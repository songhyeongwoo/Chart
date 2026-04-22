import type { ReactNode } from "react";
import { AppShell } from "@mac/ui";
import { AppSidebar } from "../../components/app-sidebar";
import { AppTopBar } from "../../components/app-topbar";

export default function AuthenticatedAppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell sidebar={<AppSidebar />} topBar={<AppTopBar />}>
      {children}
    </AppShell>
  );
}
