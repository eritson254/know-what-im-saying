import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ProductCard } from "@/components/products/product-card";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { getAllProducts } from "@/lib/content/products";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Resources",
  description: "Practical companions for the questions you are already carrying.",
  pathname: "/resources",
});

export default function ResourcesPage() {
  const products = getAllProducts();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Resources"
        title="Resources"
        subtitle="Practical companions for the questions you are already carrying."
      />

      {products.length > 0 ? (
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-16">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-[560px] px-6 pb-20 text-center md:px-16">
          <PlaceholderImage
            label="resources coming soon"
            aspectRatio="16 / 9"
            className="mb-9"
          />
          <h2 className="mb-3 font-serif text-[26px] leading-[1.15] font-medium text-ink-strong">
            The first resource is still being written.
          </h2>
          <p className="mx-auto mb-9 max-w-[44ch] text-[16px] leading-[1.6] text-muted-2">
            Guides, workbooks, and reflection tools are on the way. Leave your
            email and you&rsquo;ll be the first to know when something is
            ready.
          </p>
          <NewsletterForm className="mx-auto max-w-[440px]" location="resources" />
          <p className="mt-4 text-[13px] leading-[1.5] text-muted-4">
            No spam. Unsubscribe anytime.
          </p>
        </section>
      )}
    </main>
  );
}
