import Link from "next/link";
import { Feather } from "lucide-react";
import { primaryNav } from "@/config/navigation";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-accent text-accent-foreground transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between border-b border-white/12 px-[22px] py-[18px]">
        <div className="flex items-center gap-[9px]">
          <Feather
            size={16}
            strokeWidth={1.6}
            className="text-accent-foreground"
          />
          <span className="font-serif text-[18px] text-accent-foreground">
            Know What I&rsquo;m Saying?
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="relative h-5 w-5"
        >
          <span className="absolute left-0 top-[9px] h-[1.6px] w-5 rotate-45 bg-accent-foreground" />
          <span className="absolute left-0 top-[9px] h-[1.6px] w-5 -rotate-45 bg-accent-foreground" />
        </button>
      </div>

      <nav className="flex flex-col px-6 py-8">
        {primaryNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="border-b border-white/10 py-[14px] font-serif text-[34px] text-accent-foreground no-underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3 p-6">
        <Link
          href="/newsletter"
          className="block rounded-[2px] bg-accent-foreground py-[14px] text-center text-[15px] font-semibold text-accent no-underline"
        >
          Join the newsletter
        </Link>
        <Link
          href="/community"
          className="block rounded-[2px] border border-white/30 py-[13px] text-center text-[15px] font-semibold text-accent-foreground no-underline"
        >
          WhatsApp Channel
        </Link>
        <div className="mt-[6px] text-center font-mono text-[11px] tracking-[.08em] text-sage">
          <Link href="/search" className="no-underline text-sage">
            Search
          </Link>
          {" · "}
          <Link href="/share-your-story" className="no-underline text-sage">
            Share your story
          </Link>
        </div>
      </div>
    </div>
  );
}
