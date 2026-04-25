"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Editor } from "./Editor";
import { Landing } from "./Landing";
import { Workspace } from "./Workspace";

type EditorTab = "recommend" | "edit" | "data";

export function CanonicalLandingRoute() {
  const router = useRouter();

  return (
    <Landing
      onEnter={(screen) => {
        if (screen === "workspace") {
          router.push("/workspace");
          return;
        }

        router.push("/editor/demo-project?tab=edit");
      }}
    />
  );
}

export function CanonicalWorkspaceRoute() {
  const router = useRouter();

  return (
    <Workspace
      onOpenEditor={() => router.push("/editor/demo-project?tab=edit")}
      onBack={() => router.push("/")}
    />
  );
}

export function CanonicalEditorRoute({ projectId = "demo-project" }: { projectId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab");
  const tab: EditorTab = rawTab === "recommend" || rawTab === "data" ? rawTab : "edit";

  return (
    <Editor
      key={projectId}
      projectId={projectId}
      tab={tab}
      onTabChange={(nextTab) => router.replace(`/editor/${projectId}?tab=${nextTab}`)}
      onBack={() => router.push("/workspace")}
    />
  );
}
