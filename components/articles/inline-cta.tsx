import Link from "next/link";

export function InlineCta({
  heading = "New essays, quietly delivered.",
  description = "Get the next installment on WhatsApp.",
  ctaLabel = "Join channel",
  href = "/community",
}: {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <div className="my-11 flex flex-col items-start gap-5 rounded-[4px] border border-border-soft bg-surface px-7 py-[30px] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-1 font-serif text-[22px] text-ink">{heading}</div>
        <div className="text-[15px] text-muted-2">{description}</div>
      </div>
      <Link
        href={href}
        className="whitespace-nowrap rounded-[2px] bg-accent px-5 py-[11px] text-[14px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
