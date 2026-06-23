import type { ReactNode } from "react";

type ContainerSize = "wide" | "narrow";

const sizeClasses: Record<ContainerSize, string> = {
  wide: "max-w-[1240px]",
  narrow: "max-w-[1180px]",
};

export function Container({
  children,
  size = "wide",
  className = "",
}: {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
