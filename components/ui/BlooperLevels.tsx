"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type TierData = { threshold: number; n: string; label: string; accent: 1 | 2 };

const TIERS: TierData[] = [
  { threshold: 0, n: "1", label: "Explorer", accent: 1 },
  { threshold: 0.5, n: "2", label: "Insider", accent: 2 },
  { threshold: 1, n: "3", label: "Legend", accent: 1 },
];

function Tier({ tier, progress }: { tier: TierData; progress: MotionValue<number> }) {
  // The disc keeps the graphic colour; the numeral drawn on the paper
  // behind it takes the deepened one, which the flat coral cannot carry
  // at 14px.
  const col = tier.accent === 1 ? "var(--accent)" : "var(--accent-2)";
  const ink = tier.accent === 1 ? "var(--accent-ink)" : "var(--accent-2-ink)";
  const fill = useTransform(
    progress,
    [
      Math.max(0, tier.threshold - 0.16),
      tier.threshold <= 0.001 ? 0.03 : tier.threshold,
    ],
    [0, 1]
  );
  const emptyOpacity = useTransform(fill, [0, 1], [1, 0]);

  return (
    <div className="relative z-10 flex flex-col items-center gap-4">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-bg">
        <span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: col }}
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: col, opacity: fill }}
          aria-hidden
        />
        <motion.span
          style={{ opacity: emptyOpacity, color: ink }}
          className="absolute font-label text-sm font-medium"
        >
          {tier.n}
        </motion.span>
        <motion.span
          style={{ opacity: fill }}
          className="absolute font-label text-sm font-medium text-bg"
        >
          {tier.n}
        </motion.span>
      </span>
      <span className="eyebrow-sm text-muted">{tier.label}</span>
    </div>
  );
}

/**
 * Level track: a bar fills as you scroll, tier marks square off as it reaches
 * them, and the points counter climbs — the reward loop, made tangible.
 */
export function BlooperLevels() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });
  const [pts, setPts] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPts(Math.round(Math.min(1, Math.max(0, v)) * 1500));
  });

  return (
    <div ref={ref}>
      <div className="grid12 gap-y-6 items-end">
        <p className="eyebrow text-muted md:col-span-3">I tuoi punti</p>
        <p className="font-display text-[clamp(4rem,10vw,8rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-accent-ink md:col-span-9 tabular-nums">
          {reduce ? "1500" : pts}
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-3xl">
        {/* Track */}
        <div
          className="absolute left-7 right-7 top-7 h-px -translate-y-1/2"
          style={{ backgroundColor: "var(--rule)" }}
          aria-hidden
        />
        {/* Fill */}
        <motion.div
          style={{
            scaleX: reduce ? 1 : scrollYProgress,
            transformOrigin: "left",
            backgroundColor: "var(--accent)",
          }}
          className="absolute left-7 right-7 top-7 h-px -translate-y-1/2"
          aria-hidden
        />
        {/* Tiers */}
        <div className="relative flex justify-between">
          {TIERS.map((t) => (
            <Tier key={t.n} tier={t} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
