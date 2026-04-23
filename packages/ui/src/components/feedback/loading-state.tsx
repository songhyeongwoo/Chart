import { cn } from "../../lib/cn";

export interface LoadingStateProps {
  lines?: number;
  className?: string;
}

export function LoadingState({ lines = 3, className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-3 rounded-full bg-surface-3/90",
            index === 0 ? "w-11/12" : index === lines - 1 ? "w-7/12" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

