import { EditorWorkspaceClient } from "../../../../../components/editor-workspace-client";

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <EditorWorkspaceClient projectId={projectId} />;
}
