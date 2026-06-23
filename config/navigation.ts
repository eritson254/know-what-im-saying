export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Essays", href: "/essays" },
  { label: "Series", href: "/series" },
  { label: "Topics", href: "/topics" },
  { label: "Notes", href: "/notes" },
  { label: "Start Here", href: "/start-here" },
  { label: "About", href: "/about" },
];

export const footerReadLinks: NavLink[] = [
  { label: "Essays", href: "/essays" },
  { label: "Series", href: "/series" },
  { label: "Topics", href: "/topics" },
  { label: "Reading List", href: "/reading-list" },
];

export const footerConnectLinks: NavLink[] = [
  { label: "Newsletter", href: "/newsletter" },
  { label: "WhatsApp Channel", href: "/community" },
  { label: "Share your story", href: "/share-your-story" },
  { label: "About", href: "/about" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Contact", href: "/contact" },
];
