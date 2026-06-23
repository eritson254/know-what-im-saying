import type { ComponentProps } from "react";
import { InlineCta } from "@/components/articles/inline-cta";
import { ClosingLine } from "@/components/articles/closing-line";

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-12 mb-5 font-serif text-[28px] leading-[1.15] font-medium text-ink md:text-[34px]"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-10 mb-4 font-serif text-[24px] leading-[1.2] font-medium text-ink"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mb-7" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-10 border-l-[3px] border-sage pl-7 font-serif text-[26px] leading-[1.3] text-emphasis-text md:text-[30px]"
      {...props}
    />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-accent-text underline" {...props} />
  ),
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  InlineCta,
  ClosingLine,
};
