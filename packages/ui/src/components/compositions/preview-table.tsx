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
      title="Preview table"
      description="Sample rows are shown here until real parsing and paging are connected."
    >
      <div className="overflow-hidden rounded-b-lg">
        <div
          className="grid border-b border-line-subtle bg-surface-1 px-4 py-3 text-caption uppercase tracking-[0.16em] text-ink-3"
          style={{ gridTemplateColumns: `repeat(${preview.columns.length}, minmax(0, 1fr))` }}
        >
          {preview.columns.map((column) => (
            <span key={column.key}>{column.name}</span>
          ))}
        </div>
        {preview.sampleRows.map((row, index) => (
          <div
            key={index}
            className="grid border-b border-line-subtle/70 px-4 py-3 text-sm text-ink-2 last:border-b-0"
            style={{ gridTemplateColumns: `repeat(${preview.columns.length}, minmax(0, 1fr))` }}
          >
            {preview.columns.map((column) => (
              <span key={column.key}>{String(row[column.key] ?? "")}</span>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

