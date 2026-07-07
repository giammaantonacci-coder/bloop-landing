type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
};

const SIZES: Record<NonNullable<LogoProps["size"]>, { text: string; dot: string; gap: string }> = {
  sm: { text: "text-2xl", dot: "h-4 w-4", gap: "gap-[2px]" },
  md: { text: "text-4xl", dot: "h-6 w-6", gap: "gap-[3px]" },
  lg: { text: "text-6xl", dot: "h-10 w-10", gap: "gap-[4px]" },
  xl: { text: "text-8xl", dot: "h-16 w-16", gap: "gap-[6px]" },
};

/**
 * The bloop wordmark: "bl" + coral dot + lilac dot + "p".
 * The two dots stand in for the "oo" and pulse in alternation.
 */
export function Logo({ size = "md", animated = false, className = "" }: LogoProps) {
  const s = SIZES[size];
  return (
    <span
      className={`inline-flex items-center ${s.gap} font-display font-bold lowercase leading-none ${s.text} ${className}`}
      aria-label="bloop"
    >
      <span>bl</span>
      <span
        aria-hidden
        className={`inline-block rounded-full bg-coral ${s.dot} ${
          animated ? "motion-safe:animate-pulse-slow" : ""
        }`}
        style={{ boxShadow: "0 0 24px rgba(255,92,104,0.55)" }}
      />
      <span
        aria-hidden
        className={`inline-block rounded-full bg-lilac ${s.dot} ${
          animated ? "motion-safe:animate-pulse-slower" : ""
        }`}
        style={{ boxShadow: "0 0 24px rgba(162,105,255,0.55)" }}
      />
      <span>p</span>
    </span>
  );
}
