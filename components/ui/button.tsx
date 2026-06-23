import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "default" | "sm";

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  outline:
    "border-[1.5px] border-accent text-accent hover:bg-accent hover:text-accent-foreground",
  ghost:
    "text-ink border-b-[1.5px] border-border-card hover:border-accent rounded-none px-0 py-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-[26px] py-[14px] text-[16px]",
  sm: "px-[18px] py-[9px] text-[14px]",
};

export function Button({
  href,
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center font-semibold transition-colors"
      : "inline-flex items-center justify-center rounded-[2px] font-semibold transition-colors";

  const sizing = variant === "ghost" ? "text-[16px]" : sizeClasses[size];

  return (
    <Link
      href={href}
      className={`${base} ${sizing} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
