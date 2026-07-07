import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import type { ProductFrontmatter } from "@/lib/content/schema";

const typeLabel: Record<ProductFrontmatter["type"], string> = {
  ebook: "Ebook",
  workbook: "Workbook",
  guide: "Guide",
  plan: "Plan",
};

export function ProductCard({
  product,
}: {
  product: { slug: string; frontmatter: ProductFrontmatter };
}) {
  const isComingSoon = product.frontmatter.status === "coming-soon";

  return (
    <Link
      href={`/resources/${product.slug}`}
      className="flex flex-col no-underline hover:opacity-[.78]"
    >
      <div className="mb-[10px] flex items-center gap-2">
        <Pill>{typeLabel[product.frontmatter.type]}</Pill>
        {isComingSoon && <Pill variant="outline">Coming Soon</Pill>}
      </div>
      <h3 className="mb-[10px] font-serif text-[24px] leading-[1.12] font-medium text-ink-strong">
        {product.frontmatter.title}
      </h3>
      <p className="mb-[10px] max-w-[40ch] text-[15px] leading-[1.55] text-muted-2">
        {product.frontmatter.description}
      </p>
      {product.frontmatter.price && (
        <span className="font-mono text-[13px] text-ink-strong">
          {product.frontmatter.price}
        </span>
      )}
    </Link>
  );
}
