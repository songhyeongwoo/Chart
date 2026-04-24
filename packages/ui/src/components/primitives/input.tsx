import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
}

export function Input({ className, label, hint, error, trailing, id, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label ?? "input";

  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm font-medium tracking-[-0.01em] text-ink-2">{label}</span> : null}
      <span
        className={cn(
          "flex h-12 items-center rounded-sm border bg-surface-1 px-4 shadow-inset transition-all duration-200 ease-refined",
          error ? "border-danger/60 focus-within:border-danger" : "border-line-subtle focus-within:border-line-accent",
          "focus-within:ring-2 focus-within:ring-accent-soft/45"
        )}
      >
        <input
          id={inputId}
          className={cn(
            "w-full border-0 bg-transparent p-0 text-sm text-ink-1 outline-none placeholder:text-ink-3",
            className
          )}
          {...props}
        />
        {trailing}
      </span>
      {error ? (
        <span className="mt-2 block text-xs text-danger">{error}</span>
      ) : hint ? (
        <span className="mt-2 block text-xs text-ink-3">{hint}</span>
      ) : null}
    </label>
  );
}
