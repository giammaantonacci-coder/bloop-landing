import { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  speed?: "normal" | "slow";
  className?: string;
  separator?: ReactNode;
};

/**
 * Horizontal ticker. Duplicates the content twice so translateX(-50%)
 * produces a seamless loop.
 */
export function Marquee({
  items,
  speed = "normal",
  className = "",
  separator,
}: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden className="mx-6 text-coral">
      ●
    </span>
  );

  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          {it}
          {sep}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      role="presentation"
      aria-hidden
    >
      <div
        className={`flex w-max shrink-0 ${
          speed === "slow" ? "marquee-track-slow" : "marquee-track"
        }`}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
