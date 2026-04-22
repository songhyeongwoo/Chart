import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export function Card({ className, title, description, footer, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line-subtle bg-surface-1 shadow-soft",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="border-b border-line-subtle px-6 py-5">
          {title ? <h3 className="text-base font-semibold text-ink-1">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-ink-2">{description}</p> : null}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer ? <div className="border-t border-line-subtle px-6 py-4">{footer}</div> : null}
    </div>
  );
}

