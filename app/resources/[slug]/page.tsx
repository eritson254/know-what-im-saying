import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { MdxContent } from "@/components/articles/mdx-content";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import {
  RelatedReadingBand,
  type RelatedReadingItem,
} from "@/components/articles/related-reading-band";
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

function CheckoutButton({
  externalCheckoutUrl,
  className = "",
}: {
  externalCheckoutUrl: string | null;
  className?: string;
}) {
  if (!externalCheckoutUrl) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-[2px] border-[1.5px] border-border-strong px-7 py-[13px] text-[16px] font-semibold text-muted-3 ${className}`}
      >
        Coming Soon
      </span>
    );
  }

  return (
    <a
      href={externalCheckoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-[2px] bg-accent px-7 py-[13px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover ${className}`}
    >
      Get it now
    </a>
  );
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
      <Header />

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-14 pb-16 md:px-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <PlaceholderImage label="product cover" aspectRatio="4 / 5" />
          <div>
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
            />
          </div>
        </div>
      </section>

      <MdxContent source={product.body} />

      <RelatedReadingBand heading="Related essays" items={relatedItems} />

      <section className="mx-auto w-full max-w-[640px] px-6 py-16 text-center md:px-16">
        <CheckoutButton
          externalCheckoutUrl={product.frontmatter.externalCheckoutUrl}
        />
      </section>
    </main>
  );
}
