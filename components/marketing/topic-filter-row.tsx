const filters = [
  { label: "All", href: "/essays" },
  { label: "Life", href: "/topics/life-meaning" },
  { label: "Psychology", href: "/topics/psychology-behavior" },
  { label: "Love & Relationships", href: "/topics/love-relationships" },
  { label: "Culture & Tech", href: "/topics/culture-technology" },
  { label: "Money & Work", href: "/topics/money-work-ambition" },
];

export function TopicFilterRow() {
  return (
    <div className="mb-[14px] flex flex-wrap items-center gap-[10px]">
      {filters.map((filter, index) => (
        <a
          key={filter.href}
          href={filter.href}
          className={
            index === 0
              ? "rounded-full border border-accent bg-accent px-4 py-2 font-sans text-[13px] font-semibold text-accent-foreground no-underline"
              : "rounded-full border border-border-card px-4 py-2 font-sans text-[13px] font-medium text-muted-5 no-underline hover:border-accent hover:text-accent"
          }
        >
          {filter.label}
        </a>
      ))}
    </div>
  );
}
