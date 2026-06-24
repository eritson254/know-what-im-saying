import { notFound } from "next/navigation";
import { LegalPageLayout } from "@/components/marketing/legal-page-layout";
import { getPageBySlug } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "The basics of using this site: what's allowed, what we own, and what we don't promise.",
  pathname: "/terms",
});

export default function TermsPage() {
  const page = getPageBySlug("terms");
  if (!page) notFound();

  return <LegalPageLayout page={page} />;
}
