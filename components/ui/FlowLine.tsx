"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type NodeData = { label: string; accent: 1 | 2 };

const NODES: NodeData[] = [
  { label: "L'idea", accent: 1 },
  { label: "Bloop", accent: 2 },
  { label: "Il posto", accent: 1 },
  { label: "La serata", accent: 2 },
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
  const col = node.accent === 1 ? "var(--accent)" : "var(--accent-2)";
  const fill = useTransform(
    progress,
    [Math.max(0, threshold - 0.14), threshold <= 0.001 ? 0.02 : threshold],
    [0, 1]
  );

  return (
    <div className="relative z-10 flex flex-col items-center gap-4">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-bg sm:h-14 sm:w-14">
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
      </span>
      <span className="eyebrow-sm whitespace-nowrap text-muted">{node.label}</span>
    </div>
  );
}

/**
 * The journey as a flow: idea → Bloop → the place → the night. A hairline
 * track fills with a solid bar as you scroll, and each node squares off
 * as the bar reaches it.
 */
export function FlowLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  const n = NODES.length;
  const markerLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const markerOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0]
  );

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <div className="relative">
        {/* Track + fill, inset to the node centres */}
        <div className="pointer-events-none absolute left-[1.375rem] right-[1.375rem] top-[1.375rem] h-px -translate-y-1/2 sm:left-7 sm:right-7 sm:top-7">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--rule)" }}
            aria-hidden
          />
          <motion.div
            style={{
              scaleX: reduce ? 1 : scrollYProgress,
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
              opacity: reduce ? 0 : markerOpacity,
              backgroundColor: "var(--fg)",
            }}
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2"
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
