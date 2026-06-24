"use client";

import { track } from "@vercel/analytics";

export function CheckoutButton({
  externalCheckoutUrl,
  productSlug,
  className = "",
}: {
  externalCheckoutUrl: string | null;
  productSlug: string;
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
      onClick={() => track("product_cta_clicked", { product: productSlug })}
      className={`inline-flex items-center justify-center rounded-[2px] bg-accent px-7 py-[13px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover ${className}`}
    >
      Get it now
    </a>
  );
}
