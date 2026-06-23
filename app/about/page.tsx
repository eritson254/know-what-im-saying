import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { MdxContent } from "@/components/articles/mdx-content";
import { getPageBySlug } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "A place for thoughtful writing about life, psychology, love, work, technology, culture, and the things we are all quietly trying to figure out.",
  pathname: "/about",
});

export default function AboutPage() {
  const page = getPageBySlug("about");
  if (!page) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="About"
        title="About Know What I'm Saying?"
        subtitle={page.frontmatter.description}
      />
      <MdxContent source={page.body} />
    </main>
  );
}
