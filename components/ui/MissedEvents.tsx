"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const TU = { x: 350, y: 236 };

// Events scattered around — present, but fleeting and out of reach.
const EVENTS = [
  { x: 112, y: 54, a: 2, delay: 0.0 },
  { x: 250, y: 104, a: 1, delay: 0.5 },
  { x: 406, y: 40, a: 2, delay: 0.9 },
  { x: 560, y: 84, a: 1, delay: 0.25 },
  { x: 632, y: 158, a: 2, delay: 0.7 },
  { x: 150, y: 166, a: 1, delay: 1.1 },
] as const;

// A few "reach" lines that stretch from TU toward an event but stop short.
const REACH_TARGETS = [EVENTS[1], EVENTS[3], EVENTS[2]];
const reachEnd = (e: { x: number; y: number }, f = 0.6) => ({
  x: TU.x + f * (e.x - TU.x),
  y: TU.y + f * (e.y - TU.y),
});

const SIZE = 18;

/**
 * The "problem" visual: a searcher (TU) surrounded by scattered events that
 * flicker in and out, while dashed reach-lines stretch toward them and never
 * connect. Squares, hairlines and flat colour — deliberately unresolved.
 *
 * Colours are inherited from the surrounding `.tone-*` band.
 */
export function MissedEvents() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const animate = inView && !reduce;

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <svg viewBox="0 0 700 280" className="aspect-[700/280] w-full" aria-hidden>
        {/* Reach lines — dashed, stretching but stopping short */}
        {REACH_TARGETS.map((e, i) => {
          const end = reachEnd(e);
          return (
            <motion.line
              key={`reach-${i}`}
              x1={TU.x}
              y1={TU.y}
              x2={end.x}
              y2={end.y}
              stroke="var(--rule)"
              strokeWidth="1"
              strokeDasharray="4 8"
              animate={
                animate
                  ? { strokeDashoffset: [0, -24], opacity: [0.4, 1, 0.4] }
                  : undefined
              }
              transition={{
                strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" },
                opacity: {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                },
              }}
              style={{ opacity: 0.7 }}
            />
          );
        })}

        {/* Scattered events — flickering squares, hard to catch */}
        {EVENTS.map((e, i) => (
          <motion.rect
            key={`ev-${i}`}
            x={e.x - SIZE / 2}
            y={e.y - SIZE / 2}
            width={SIZE}
            height={SIZE}
            fill={e.a === 1 ? "var(--accent)" : "var(--accent-2)"}
            animate={animate ? { opacity: [1, 0.15, 1] } : undefined}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: e.delay,
            }}
            style={{ opacity: reduce ? 0.7 : 1 }}
          />
        ))}

        {/* Searching rings from TU — squared off */}
        {animate &&
          [0, 1, 2].map((i) => (
            <motion.rect
              key={`ring-${i}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              initial={{ x: TU.x - 20, y: TU.y - 20, width: 40, height: 40, opacity: 0.6 }}
              animate={{
                x: TU.x - 100,
                y: TU.y - 100,
                width: 200,
                height: 200,
                opacity: 0,
              }}
              transition={{
                duration: 2.7,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.9,
              }}
            />
          ))}

        {/* TU node */}
        <rect
          x={TU.x - 22}
          y={TU.y - 22}
          width={44}
          height={44}
          fill="var(--accent)"
        />
        <text
          x={TU.x}
          y={TU.y + 5}
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          letterSpacing="1.5"
          fill="var(--bg)"
          style={{ fontFamily: "var(--font-label), system-ui, sans-serif" }}
        >
          TU
        </text>
      </svg>

      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="eyebrow-sm text-muted">Cerchi</span>
        <span aria-hidden className="eyebrow-sm text-muted">
          /
        </span>
        <span className="eyebrow-sm text-muted">non trovi</span>
        <span aria-hidden className="eyebrow-sm text-muted">
          /
        </span>
        <span className="eyebrow-sm text-accent-ink">ti perdi</span>
      </div>
    </div>
  );
}
