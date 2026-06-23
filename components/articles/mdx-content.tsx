import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/articles/mdx-components";

export function MdxContent({ source }: { source: string }) {
  return (
    <article className="article-prose mx-auto max-w-[720px] px-6 pt-10 text-[18px] leading-[1.8] text-[#2c2e26] md:pt-12 md:text-[19px]">
      <MDXRemote source={source} components={mdxComponents} />
    </article>
  );
}
