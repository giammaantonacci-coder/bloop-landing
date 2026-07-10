"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type NodeData = { label: string; accent: "coral" | "lilac" };

const NODES: NodeData[] = [
  { label: "L'idea", accent: "coral" },
  { label: "Bloop", accent: "lilac" },
  { label: "Il posto", accent: "coral" },
  { label: "La serata", accent: "lilac" },
];

function FlowNode({
  node,
  threshold,
  progress,
}: {
  node: NodeData;
  threshold: number;
  progress: MotionValue<number>;
}) {
  const col = node.accent === "coral" ? "#F76B3A" : "#A269FF";
  const fill = useTransform(
    progress,
    [Math.max(0, threshold - 0.14), threshold <= 0.001 ? 0.02 : threshold],
    [0, 1]
  );
  const scale = useTransform(fill, [0, 0.6, 1], [0.8, 1.16, 1]);
  const glow = useTransform(
    fill,
    [0, 1],
    ["0 0 0px rgba(0,0,0,0)", `0 0 22px ${col}aa`]
  );
  const labelColor = useTransform(fill, [0, 1], ["#A7A5BE", col]);

  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <motion.span
        style={{ scale, boxShadow: glow }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-deep sm:h-14 sm:w-14"
      >
        <span
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: col, opacity: 0.35 }}
          aria-hidden
        />
        <motion.span
          className="absolute inset-[24%] rounded-full"
          style={{ backgroundColor: col, opacity: fill }}
          aria-hidden
        />
      </motion.span>
      <motion.span
        style={{ color: labelColor }}
        className="whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-[12px]"
      >
        {node.label}
      </motion.span>
    </div>
  );
}

/**
 * The journey as an actual flow: idea → Bloop → the place → the night.
 * A gradient line draws itself as you scroll, each node lights up as the
 * line reaches it, and a glowing dot rides the tip.
 */
export function FlowLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  const n = NODES.length;
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0]
  );

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <div className="relative">
        {/* Track + fill + travelling dot, inset to the node centres */}
        <div className="pointer-events-none absolute left-[1.375rem] right-[1.375rem] top-[1.375rem] h-[3px] -translate-y-1/2 sm:left-7 sm:right-7 sm:top-7">
          <div className="absolute inset-0 rounded-full bg-white/10" aria-hidden />
          <motion.div
            style={{
              scaleX: reduce ? 1 : scrollYProgress,
              transformOrigin: "left",
              willChange: "transform",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-coral via-coral to-lilac"
            aria-hidden
          />
          <motion.div
            style={{
              left: dotLeft,
              opacity: reduce ? 0 : dotOpacity,
              boxShadow: "0 0 12px 2px rgba(255,255,255,0.7)",
              willChange: "transform",
            }}
            className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            aria-hidden
          />
        </div>

        {/* Nodes */}
        <div className="relative flex items-start justify-between">
          {NODES.map((node, i) => (
            <FlowNode
              key={node.label}
              node={node}
              progress={scrollYProgress}
              threshold={n > 1 ? i / (n - 1) : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
