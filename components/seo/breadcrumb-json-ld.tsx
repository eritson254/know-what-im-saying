import { JsonLdScript } from "@/components/seo/json-ld-script";
import { siteConfig } from "@/config/site";

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.path, siteConfig.url).toString(),
        })),
      }}
    />
  );
}
