import type { ReactNode } from "react";

type PillVariant = "solid" | "outline";

type PillProps = {
  children: ReactNode;
  variant?: PillVariant;
  withDot?: boolean;
  className?: string;
};

export function Pill({
  children,
  variant = "solid",
  withDot = false,
  className = "",
}: PillProps) {
  const variantClasses =
    variant === "solid"
      ? "bg-pill-soft text-accent"
      : "border border-border-card text-muted-1";

  return (
    <span
      className={`inline-flex items-center gap-[9px] rounded-full px-[14px] py-[7px] font-mono text-[11px] tracking-[.14em] uppercase ${variantClasses} ${className}`}
    >
      {withDot && (
        <span className="h-[6px] w-[6px] rounded-full bg-sage" />
      )}
      {children}
    </span>
  );
}
