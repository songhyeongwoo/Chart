import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white border border-transparent hover:bg-accent-strong shadow-soft",
  secondary:
    "bg-surface-1 text-ink-1 border border-line-subtle hover:border-line-strong",
  ghost:
    "bg-transparent text-ink-2 border border-transparent hover:bg-surface-2"
};

export function Button({
  className,
  variant = "primary",
  leadingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-all duration-200 ease-refined focus:outline-none focus:ring-2 focus:ring-accent-soft disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {leadingIcon}
      {children}
    </button>
  );
}

