import Link from "next/link";
import {
  footerConnectLinks,
  footerLegalLinks,
  footerReadLinks,
} from "@/config/navigation";

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3 text-[14px]">
      <span className="mb-1 font-mono text-[11px] tracking-[.12em] text-muted-4 uppercase">
        {heading}
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-[#3b3c34] no-underline hover:text-accent"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border-strong px-6 py-12 md:px-16 md:py-[60px] md:pb-[46px]">
      <div className="mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-12">
        <div>
          <div className="mb-3 font-serif text-[30px] text-ink-strong">
            Know What I&rsquo;m Saying?
          </div>
          <p className="max-w-[34ch] text-[15px] leading-[1.65] text-muted-2">
            A publication about life, psychology, love, technology, and the
            stories people carry.
          </p>
        </div>
        <FooterColumn heading="Read" links={footerReadLinks} />
        <FooterColumn heading="Connect" links={footerConnectLinks} />
        <FooterColumn heading="Legal" links={footerLegalLinks} />
      </div>
      <div className="mx-auto mt-10 flex max-w-[1240px] flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] tracking-[.08em] text-muted-4 uppercase md:flex-row md:justify-between">
        <span>© 2026 Know What I&rsquo;m Saying?</span>
        <span>Made for slow afternoons</span>
      </div>
    </footer>
  );
}
