import { notFound } from "next/navigation";
import { LegalPageLayout } from "@/components/marketing/legal-page-layout";
import { getPageBySlug } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Editorial Policy",
  description: "How this publication writes, sources stories, and corrects itself when it gets something wrong.",
  pathname: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  const page = getPageBySlug("editorial-policy");
  if (!page) notFound();

  return <LegalPageLayout page={page} />;
}
