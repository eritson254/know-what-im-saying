import type { ReactNode } from "react";

export function ClosingLine({ children }: { children: ReactNode }) {
  return (
    <p className="mb-10 font-serif text-[24px] leading-[1.4] text-[#2c3a30] md:text-[26px]">
      {children}
    </p>
  );
}
