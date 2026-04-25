import { createBrowserRouter, useNavigate, useParams, useSearchParams, Outlet } from "react-router";
import { Landing } from "./components/Landing";
import { Workspace } from "./components/Workspace";
import { Editor } from "./components/Editor";
import { Gallery } from "./components/pages/Gallery";
import { Templates } from "./components/pages/Templates";
import { Pricing } from "./components/pages/Pricing";
import { UseCases } from "./components/pages/UseCases";
import { NotFound } from "./components/pages/NotFound";

function LandingRoute() {
  const navigate = useNavigate();
  return (
    <Landing
      onEnter={(s) => {
        if (s === "workspace") navigate("/workspace");
        else navigate("/editor/demo-project?tab=edit");
      }}
    />
  );
}

function WorkspaceRoute() {
  const navigate = useNavigate();
  return (
    <Workspace
      onOpenEditor={() => navigate("/editor/demo-project?tab=edit")}
      onBack={() => navigate("/")}
    />
  );
}

function EditorRoute() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const tab = raw === "recommend" || raw === "data" ? raw : "edit";
  const id = projectId || "demo-project";
  return (
    <Editor
      key={id}
      projectId={id}
      tab={tab}
      onTabChange={(t) => {
        const next = new URLSearchParams(params);
        next.set("tab", t);
        setParams(next, { replace: true });
      }}
      onBack={() => navigate("/workspace")}
    />
  );
}

export const router = createBrowserRouter([
  { path: "/",                    Component: LandingRoute },
  { path: "/workspace",           Component: WorkspaceRoute },
  { path: "/editor/:projectId",   Component: EditorRoute },
  { path: "/editor",              Component: EditorRoute },
  { path: "/gallery",             Component: Gallery },
  { path: "/templates",           Component: Templates },
  { path: "/pricing",             Component: Pricing },
  { path: "/use-cases",           Component: UseCases },
  { path: "*",                    Component: NotFound },
]);

export { Outlet };
