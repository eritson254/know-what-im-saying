import { JsonLdScript } from "@/components/seo/json-ld-script";
import { siteConfig } from "@/config/site";

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  imagePath,
  canonicalUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string | null;
  imagePath: string;
  canonicalUrl: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        dateModified: dateModified ?? datePublished,
        image: new URL(imagePath, siteConfig.url).toString(),
        author: { "@type": "Person", name: "Guest Author" },
        publisher: { "@type": "Organization", name: siteConfig.name },
        mainEntityOfPage: canonicalUrl,
      }}
    />
  );
}
