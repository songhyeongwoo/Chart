import type { CanonicalChartType } from "./editor-adapters";

export type CanonicalExportStatus = "idle" | "exporting" | "success" | "error" | "unsupported";

export type CanonicalSvgExportResult =
  | { ok: true; filename: string; exportedAt: string }
  | { ok: false; status: "error" | "unsupported"; errorMessage: string };

export function buildCanonicalExportFilename({
  projectId,
  chart,
  now = new Date(),
}: {
  projectId: string;
  chart: CanonicalChartType;
  now?: Date;
}) {
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  return `mac-${sanitizeFilenamePart(projectId)}-${chart}-${date}-${time}.svg`;
}

export function findCanonicalPreviewSvg(target: HTMLElement | null) {
  return target?.querySelector("svg") ?? null;
}

export function serializeCanonicalSvg(svg: SVGSVGElement) {
  const clone = svg.cloneNode(true) as SVGSVGElement;

  if (!clone.getAttribute("xmlns")) {
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
}

export function createCanonicalSvgBlob(svgText: string) {
  return new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
}

export function downloadCanonicalBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  try {
    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}

export function exportCanonicalSvg({
  target,
  projectId,
  chart,
}: {
  target: HTMLElement | null;
  projectId: string;
  chart: CanonicalChartType;
}): CanonicalSvgExportResult {
  const svg = findCanonicalPreviewSvg(target);

  if (!svg) {
    return {
      ok: false,
      status: "error",
      errorMessage: "내보낼 SVG 차트를 찾을 수 없습니다.",
    };
  }

  try {
    const filename = buildCanonicalExportFilename({ projectId, chart });
    const svgText = serializeCanonicalSvg(svg);
    const blob = createCanonicalSvgBlob(svgText);
    downloadCanonicalBlob(blob, filename);

    return {
      ok: true,
      filename,
      exportedAt: new Date().toISOString(),
    };
  } catch {
    return {
      ok: false,
      status: "error",
      errorMessage: "브라우저 다운로드를 시작하지 못했습니다.",
    };
  }
}

function sanitizeFilenamePart(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}
