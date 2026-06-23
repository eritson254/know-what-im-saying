type PlaceholderVariant = "paper" | "band";

const variantStripes: Record<PlaceholderVariant, [string, string]> = {
  paper: ["var(--color-placeholder-a)", "var(--color-placeholder-b)"],
  band: ["var(--color-placeholder-band-a)", "var(--color-placeholder-band-b)"],
};

export function PlaceholderImage({
  label,
  aspectRatio = "4 / 3",
  variant = "paper",
  className = "",
}: {
  label: string;
  aspectRatio?: string;
  variant?: PlaceholderVariant;
  className?: string;
}) {
  const [stripeA, stripeB] = variantStripes[variant];

  return (
    <div
      className={`flex items-center justify-center rounded-[2px] ${className}`}
      style={{
        aspectRatio,
        backgroundImage: `repeating-linear-gradient(135deg, ${stripeA} 0 11px, ${stripeB} 11px 22px)`,
      }}
    >
      <span className="font-mono text-[10px] tracking-[.1em] text-[#9A9C8B] uppercase">
        {label}
      </span>
    </div>
  );
}
