import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function buildCanonicalUrl(pathname: string, canonicalUrl?: string | null) {
  return canonicalUrl ?? new URL(pathname, siteConfig.url).toString();
}

export function buildPageMetadata({
  title,
  description,
  pathname,
  canonicalUrl,
}: {
  title: string;
  description: string;
  pathname: string;
  canonicalUrl?: string | null;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(pathname, canonicalUrl),
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      title,
      description,
      url: buildCanonicalUrl(pathname, canonicalUrl),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}
