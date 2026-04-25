import { CanonicalEditorRoute } from "../../../components/canonical/CanonicalRoutes";

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <CanonicalEditorRoute projectId={projectId} />;
}
