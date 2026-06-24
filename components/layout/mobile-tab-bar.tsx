"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Newspaper,
  Menu as MenuIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Essays", href: "/essays", icon: Newspaper },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div
        data-pagefind-ignore
        className="fixed inset-x-0 bottom-0 z-40 flex flex-col items-center md:hidden"
      >
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className="flex h-6 w-12 items-center justify-center rounded-t-full border border-b-0 border-border bg-paper text-muted-3"
        >
          {collapsed ? (
            <ChevronUp size={16} strokeWidth={1.8} />
          ) : (
            <ChevronDown size={16} strokeWidth={1.8} />
          )}
        </button>

        <nav
          className={`flex w-full items-center justify-around overflow-hidden border-t border-border bg-paper transition-[max-height,padding] duration-200 ${
            collapsed ? "max-h-0 py-0" : "max-h-20 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))]"
          }`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-1 flex-col items-center gap-1 font-mono text-[10px] tracking-[.04em] uppercase no-underline ${
                  isActive ? "text-accent-text" : "text-muted-3"
                }`}
              >
                <Icon size={19} strokeWidth={1.6} />
                {tab.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-1 flex-col items-center gap-1 font-mono text-[10px] tracking-[.04em] text-muted-3 uppercase"
          >
            <MenuIcon size={19} strokeWidth={1.6} />
            Menu
          </button>
        </nav>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
