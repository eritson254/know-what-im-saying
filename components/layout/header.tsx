"use client";

import { useState } from "react";
import Link from "next/link";
import { Feather, Search } from "lucide-react";
import { primaryNav } from "@/config/navigation";
import { MobileMenu } from "@/components/layout/mobile-menu";

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className="flex flex-col gap-1"
    >
      <span className="block h-[1.6px] w-5 bg-[#3b3c34]" />
      <span className="block h-[1.6px] w-5 bg-[#3b3c34]" />
      <span className="block h-[1.6px] w-5 bg-[#3b3c34]" />
    </button>
  );
}

function MobileBar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-border px-[22px] py-[18px] md:hidden">
      <Link href="/" className="flex items-center gap-[9px] no-underline">
        <Feather size={16} strokeWidth={1.6} className="text-accent" />
        <span className="font-serif text-[18px] text-ink">
          Know What I&rsquo;m Saying?
        </span>
      </Link>
      <HamburgerButton onClick={onMenuOpen} />
    </header>
  );
}

function UtilityBar({ right }: { right: React.ReactNode }) {
  return (
    <div className="hidden items-center justify-between border-b border-[#ECE7D8] px-16 py-[11px] font-mono text-[10px] tracking-[.13em] text-muted-4 uppercase md:flex">
      <span>A reading publication · est. 2026</span>
      {right}
    </div>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-[30px] text-[15px] text-[#3b3c34] md:flex">
      {primaryNav.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="no-underline hover:text-accent"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function StandardHeader() {
  return (
    <div className="hidden md:block">
      <UtilityBar right={<span className="text-accent">Issue №14 · June 2026</span>} />
      <header className="flex items-center justify-between border-b border-border px-16 py-5">
        <Link href="/" className="flex items-center gap-[11px] no-underline">
          <Feather size={20} strokeWidth={1.6} className="text-accent" />
          <span className="font-serif text-[24px] text-ink">
            Know What I&rsquo;m Saying?
          </span>
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-[18px]">
          <Search size={18} strokeWidth={1.4} className="text-[#3b3c34]" />
          <Link
            href="/newsletter"
            className="rounded-[2px] bg-accent px-[18px] py-[9px] text-[14px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
          >
            Join
          </Link>
        </div>
      </header>
    </div>
  );
}

function MastheadHeader() {
  return (
    <div className="hidden md:block">
      <UtilityBar
        right={
          <span className="flex gap-5 text-muted-4">
            <Link href="/search" className="no-underline hover:text-accent">
              Search
            </Link>
            <Link
              href="/newsletter"
              className="text-accent no-underline"
            >
              Subscribe
            </Link>
          </span>
        }
      />
      <div className="px-16 py-[46px] pb-7 text-center">
        <Feather
          size={30}
          strokeWidth={1.6}
          className="mx-auto mb-4 text-accent"
        />
        <p className="mb-[18px] font-mono text-[11px] tracking-[.28em] text-sage uppercase">
          A reading publication · est. 2026
        </p>
        <h1 className="font-serif text-[74px] leading-none font-medium tracking-[-.015em] text-ink-strong">
          Know What I&rsquo;m Saying?
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] font-serif text-[21px] leading-[1.4] text-muted-2 italic">
          Thoughtful writing for people trying to make sense of modern life.
        </p>
      </div>
      <nav className="flex items-center justify-center gap-9 border-t border-b border-border-strong px-16 py-4 font-mono text-[12px] tracking-[.12em] text-[#3b3c34] uppercase">
        {primaryNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="no-underline hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Header({
  variant = "standard",
}: {
  variant?: "standard" | "masthead";
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MobileBar onMenuOpen={() => setIsMenuOpen(true)} />
      {variant === "masthead" ? <MastheadHeader /> : <StandardHeader />}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
