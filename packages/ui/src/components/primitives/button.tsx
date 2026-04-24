import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
}

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-accent text-ink-inverse shadow-soft hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:ring-accent-soft",
  secondary:
    "border border-line-strong bg-surface-1 text-ink-1 hover:-translate-y-0.5 hover:bg-surface-2 focus-visible:ring-accent-soft",
  tertiary:
    "border border-line-subtle bg-surface-2/88 text-ink-1 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-1 focus-visible:ring-accent-soft",
  ghost:
    "border border-transparent bg-transparent text-ink-2 hover:bg-surface-2/75 hover:text-ink-1 focus-visible:ring-accent-soft"
};

const sizeClassName: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-4.5 text-sm",
  lg: "h-12 px-5.5 text-sm"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  leadingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-[-0.01em] transition-all duration-200 ease-refined focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-45",
        variant === "ghost" ? "" : "shadow-inset",
        variantClassName[variant],
        sizeClassName[size],
        className
      )}
      {...props}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
