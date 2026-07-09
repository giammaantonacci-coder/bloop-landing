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

type TierData = { threshold: number; n: string; label: string; accent: "coral" | "lilac" };

const TIERS: TierData[] = [
  { threshold: 0, n: "1", label: "Explorer", accent: "coral" },
  { threshold: 0.5, n: "2", label: "Insider", accent: "lilac" },
  { threshold: 1, n: "3", label: "Legend", accent: "coral" },
];

function Tier({
  tier,
  progress,
}: {
  tier: TierData;
  progress: MotionValue<number>;
}) {
  const col = tier.accent === "coral" ? "#F76B3A" : "#A269FF";
  const fill = useTransform(
    progress,
    [Math.max(0, tier.threshold - 0.16), tier.threshold <= 0.001 ? 0.03 : tier.threshold],
    [0, 1]
  );
  const scale = useTransform(fill, [0, 0.6, 1], [0.82, 1.14, 1]);
  const glow = useTransform(
    fill,
    [0, 1],
    ["0 0 0px rgba(0,0,0,0)", `0 0 28px ${col}aa`]
  );
  const emptyOpacity = useTransform(fill, [0, 1], [1, 0]);

  return (
    <div className="relative z-10 flex flex-col items-center gap-4">
      <motion.span
        style={{ scale, boxShadow: glow }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-deep"
      >
        <span
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: col, opacity: 0.35 }}
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: col, opacity: fill }}
          aria-hidden
        />
        <motion.span
          style={{ opacity: emptyOpacity }}
          className="absolute font-display text-xl font-bold"
        >
          <span style={{ color: col }}>{tier.n}</span>
        </motion.span>
        <motion.span
          style={{ opacity: fill }}
          className="absolute font-display text-xl font-bold text-deep"
        >
          {tier.n}
        </motion.span>
      </motion.span>
      <span
        className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: col }}
      >
        {tier.label}
      </span>
    </div>
  );
}

/**
 * Gamified level track: an XP bar fills as you scroll, tier badges light
 * up as it reaches them, and the points counter climbs — the reward loop,
 * made tangible.
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
      <div className="text-center">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
          I tuoi punti
        </p>
        <p className="mt-3 font-display text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none tracking-[-0.03em] text-coral tabular-nums">
          {reduce ? "1500" : pts}
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-3xl">
        {/* Track */}
        <div className="absolute left-8 right-8 top-8 h-1 -translate-y-1/2 rounded-full bg-white/10" aria-hidden />
        {/* Fill */}
        <motion.div
          style={{ scaleX: reduce ? 1 : scrollYProgress, transformOrigin: "left" }}
          className="absolute left-8 right-8 top-8 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-coral to-lilac"
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
