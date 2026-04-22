import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line-subtle bg-surface-1 px-4 text-sm text-ink-1 outline-none transition-colors duration-200 ease-refined placeholder:text-ink-3 focus:border-accent focus:ring-2 focus:ring-accent-soft/60",
        className
      )}
      {...props}
    />
  );
}

