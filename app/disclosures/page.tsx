import { notFound } from "next/navigation";
import { LegalPageLayout } from "@/components/marketing/legal-page-layout";
import { getPageBySlug } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Disclosures",
  description: "Where money is concerned: what relationships exist today, and how future ones will be disclosed.",
  pathname: "/disclosures",
});

export default function DisclosuresPage() {
  const page = getPageBySlug("disclosures");
  if (!page) notFound();

  return <LegalPageLayout page={page} />;
}
