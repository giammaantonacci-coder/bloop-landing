type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
};

const SIZES: Record<
  NonNullable<LogoProps["size"]>,
  { text: string; dot: string; gap: string }
> = {
  sm: { text: "text-2xl", dot: "h-[0.85em] w-[0.85em]", gap: "gap-[2px]" },
  md: { text: "text-4xl", dot: "h-[0.85em] w-[0.85em]", gap: "gap-[3px]" },
  lg: { text: "text-6xl", dot: "h-[0.85em] w-[0.85em]", gap: "gap-[4px]" },
  xl: { text: "text-8xl", dot: "h-[0.85em] w-[0.85em]", gap: "gap-[6px]" },
};

/**
 * The bloop wordmark: "bl" + coral dot + lilac dot + "p". Flat colour, no
 * glow — the two dots stand in for the "oo" and blink in alternation.
 */
export function Logo({ size = "md", animated = false, className = "" }: LogoProps) {
  const s = SIZES[size];
  return (
    <span
      className={`inline-flex items-center ${s.gap} font-display text-current font-extrabold lowercase leading-none tracking-[-0.05em] ${s.text} ${className}`}
      aria-label="bloop"
    >
      <span>bl</span>
      <span
        aria-hidden
        className={`inline-block rounded-full bg-coral ${s.dot} ${
          animated ? "motion-safe:animate-pulse-slow" : ""
        }`}
      />
      <span
        aria-hidden
        className={`inline-block rounded-full bg-lilac ${s.dot} ${
          animated ? "motion-safe:animate-pulse-slower" : ""
        }`}
      />
      <span>p</span>
    </span>
  );
}
