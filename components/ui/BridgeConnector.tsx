"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Evento → Utente, drawn as a straight rule rather than an arc: a hairline
 * track, a solid bar that extends across it as you scroll, and two square
 * terminals — the right one only fills once the bar arrives.
 *
 * Colours come from the surrounding `.tone-*` band, so it reads correctly on
 * ink, on paper and on coral.
 */
export function BridgeConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });

  const markerLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const markerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  const endFill = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <div className="relative h-14">
        {/* Track + bar, inset to the terminal centres */}
        <div className="absolute inset-x-7 top-1/2 h-px -translate-y-1/2">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--rule)" }}
            aria-hidden
          />
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
              backgroundColor: "var(--accent)",
              willChange: "transform",
            }}
            className="absolute inset-0"
            aria-hidden
          />
          <motion.span
            style={{
              left: markerLeft,
              opacity: markerOpacity,
              backgroundColor: "var(--fg)",
            }}
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          />
        </div>

        {/* Terminals */}
        <span
          className="absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2"
          style={{ backgroundColor: "var(--accent)" }}
          aria-hidden
        />
        <span
          className="absolute right-0 top-1/2 h-14 w-14 -translate-y-1/2 border"
          style={{ borderColor: "var(--accent-2)" }}
          aria-hidden
        >
          <motion.span
            className="absolute inset-0"
            style={{ backgroundColor: "var(--accent-2)", opacity: endFill }}
          />
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="eyebrow-sm text-accent-ink">Evento</span>
        <span className="eyebrow-sm text-accent-2-ink">Utente</span>
      </div>
    </div>
  );
}
