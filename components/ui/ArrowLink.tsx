import Link from "next/link";
import { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** "1" = coral, "2" = lilac, "fg" = plain foreground. */
  accent?: "1" | "2" | "fg";
  direction?: "forward" | "back";
  className?: string;
};

/**
 * Mono, underlined, rule-thin link with a directional arrow. The underline is
 * a real 1px border so it lines up with the hairline grid.
 */
export function ArrowLink({
  href,
  children,
  accent = "1",
  direction = "forward",
  className = "",
}: ArrowLinkProps) {
  const color =
    accent === "1"
      ? "text-accent-ink"
      : accent === "2"
      ? "text-accent-2-ink"
      : "text-muted";

  const inner = (
    <>
      {direction === "back" && (
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">
          ←
        </span>
      )}
      {children}
      {direction === "forward" && (
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  const cls = `link-arrow group ${color} hover:text-fg ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
