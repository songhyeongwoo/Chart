import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type CardVariant = "default" | "subtle" | "canvas" | "ghost";
type CardPadding = "none" | "compact" | "comfortable";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: ReactNode;
  headerActions?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
}

const variantClassName: Record<CardVariant, string> = {
  default: "rounded-xl border border-line-subtle bg-surface-1/96 shadow-soft",
  subtle: "rounded-xl border border-line-subtle bg-surface-2/90 shadow-inset",
  canvas: "rounded-xl border border-line-strong bg-surface-1 shadow-panel",
  ghost: "border border-transparent bg-transparent shadow-none"
};

const paddingClassName: Record<CardPadding, string> = {
  none: "p-0",
  compact: "px-4 py-4",
  comfortable: "px-6 py-5"
};

export function Card({
  className,
  title,
  description,
  footer,
  headerActions,
  variant = "default",
  padding = "comfortable",
  children,
  ...props
}: CardProps) {
  const bodyHasInset = padding !== "none";

  return (
    <div className={cn(variantClassName[variant], className)} {...props}>
      {(title || description || headerActions) && (
        <div className="flex items-start justify-between gap-4 border-b border-line-subtle/85 px-6 py-5">
          <div>
            {title ? <h3 className="text-[1.02rem] font-semibold tracking-[-0.02em] text-ink-1">{title}</h3> : null}
            {description ? <p className="mt-1.5 max-w-2xl text-sm leading-6 text-ink-2">{description}</p> : null}
          </div>
          {headerActions}
        </div>
      )}
      <div className={cn(bodyHasInset && paddingClassName[padding])}>{children}</div>
      {footer ? <div className="border-t border-line-subtle/85 px-6 py-4">{footer}</div> : null}
    </div>
  );
}
