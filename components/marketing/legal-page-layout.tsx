import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { MdxContent } from "@/components/articles/mdx-content";
import { formatDisplayDate } from "@/lib/utils/format-date";
import type { PageFrontmatter } from "@/lib/content/schema";

export function LegalPageLayout({
  page,
}: {
  page: { frontmatter: PageFrontmatter; body: string };
}) {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Legal"
        title={page.frontmatter.title}
        subtitle={page.frontmatter.description}
      />
      {page.frontmatter.updated && (
        <p className="mx-auto -mt-10 mb-2 w-full max-w-[720px] px-6 text-center font-mono text-[11px] tracking-[.1em] text-muted-4 uppercase md:px-16">
          Last updated {formatDisplayDate(page.frontmatter.updated)}
        </p>
      )}
      <MdxContent source={page.body} />
      <div className="pb-20" />
    </main>
  );
}
