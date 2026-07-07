import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { MdxContent } from "@/components/articles/mdx-content";
import { Pill } from "@/components/ui/pill";
import {
  RelatedReadingBand,
  type RelatedReadingItem,
} from "@/components/articles/related-reading-band";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { CheckoutButton } from "@/components/products/checkout-button";
import {
  getAllProducts,
  getProductBySlug,
  getEssaysForProduct,
} from "@/lib/content/products";
import { getTopicBySlug } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

const typeLabel: Record<string, string> = {
  ebook: "Ebook",
  workbook: "Workbook",
  guide: "Guide",
  plan: "Plan",
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return buildPageMetadata({
    title: product.frontmatter.title,
    description: product.frontmatter.description,
    pathname: `/resources/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedEssays = getEssaysForProduct(product.slug);
  const relatedItems: RelatedReadingItem[] = relatedEssays.map((essay) => ({
    label: getTopicBySlug(essay.frontmatter.topic)?.label ?? essay.frontmatter.topic,
    title: essay.frontmatter.title,
    description: essay.frontmatter.description,
    href: `/essays/${essay.slug}`,
    readingTime: essay.readingTime,
  }));

  return (
    <main className="flex flex-1 flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Resources", path: "/resources" },
          { name: product.frontmatter.title, path: `/resources/${product.slug}` },
        ]}
      />
      <Header />

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-14 pb-16 md:px-16 md:pt-20">
        <div className="max-w-[640px]">
          <div className="mb-4">
            <Pill>{typeLabel[product.frontmatter.type]}</Pill>
          </div>
          <h1 className="mb-4 font-serif text-[40px] leading-[1.08] font-medium text-ink-strong md:text-[48px]">
            {product.frontmatter.title}
          </h1>
          <p className="mb-6 max-w-[44ch] text-[17px] leading-[1.6] text-muted-2">
            {product.frontmatter.description}
          </p>
          {product.frontmatter.price && (
            <p className="mb-7 font-mono text-[16px] text-ink-strong">
              {product.frontmatter.price}
            </p>
          )}
          <CheckoutButton
            externalCheckoutUrl={product.frontmatter.externalCheckoutUrl}
            productSlug={product.slug}
          />
        </div>
      </section>

      <MdxContent source={product.body} />

      <RelatedReadingBand heading="Related essays" items={relatedItems} />

      <section className="mx-auto w-full max-w-[640px] px-6 py-16 text-center md:px-16">
        <CheckoutButton
          externalCheckoutUrl={product.frontmatter.externalCheckoutUrl}
          productSlug={product.slug}
        />
      </section>
    </main>
  );
}
