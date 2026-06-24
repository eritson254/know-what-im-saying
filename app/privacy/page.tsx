import { notFound } from "next/navigation";
import { LegalPageLayout } from "@/components/marketing/legal-page-layout";
import { getPageBySlug } from "@/lib/content/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "What this site collects, what it doesn't, and how the few things it does collect are used.",
  pathname: "/privacy",
});

export default function PrivacyPage() {
  const page = getPageBySlug("privacy");
  if (!page) notFound();

  return <LegalPageLayout page={page} />;
}
