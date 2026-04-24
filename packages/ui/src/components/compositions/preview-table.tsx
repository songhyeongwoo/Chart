import type { DatasetPreview } from "@mac/domain";
import { Card } from "../primitives/card";

export interface PreviewTableProps {
  preview: DatasetPreview;
}

export function PreviewTable({ preview }: PreviewTableProps) {
  return (
    <Card
      variant="subtle"
      padding="none"
      title="데이터 미리보기"
      description="열 구조와 표본 행을 먼저 확인하고, 추천 차트로 자연스럽게 넘어갈 수 있어야 합니다."
    >
      <div className="overflow-x-auto rounded-b-lg">
        <div className="min-w-[720px]">
          <div
            className="grid border-b border-line-subtle bg-surface-1 px-4 py-3 text-caption uppercase tracking-[0.18em] text-ink-3"
            style={{ gridTemplateColumns: `repeat(${preview.columns.length}, minmax(120px, 1fr))` }}
          >
            {preview.columns.map((column) => (
              <span key={column.key} className="truncate pr-3">
                {column.name}
              </span>
            ))}
          </div>
          {preview.sampleRows.map((row, index) => (
            <div
              key={index}
              className="grid border-b border-line-subtle/70 px-4 py-3 text-sm text-ink-2 last:border-b-0 odd:bg-surface-1 even:bg-surface-2/45"
              style={{ gridTemplateColumns: `repeat(${preview.columns.length}, minmax(120px, 1fr))` }}
            >
              {preview.columns.map((column) => (
                <span key={column.key} className="truncate pr-3">
                  {String(row[column.key] ?? "")}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
