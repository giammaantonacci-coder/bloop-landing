"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const COL = { coral: "#F76B3A", lilac: "#A269FF" } as const;

const TU = { x: 350, y: 236 };

// Events scattered around — present, but fleeting and out of reach.
const EVENTS = [
  { x: 112, y: 54, c: "lilac", delay: 0.0 },
  { x: 250, y: 104, c: "coral", delay: 0.5 },
  { x: 406, y: 40, c: "lilac", delay: 0.9 },
  { x: 560, y: 84, c: "coral", delay: 0.25 },
  { x: 632, y: 158, c: "lilac", delay: 0.7 },
  { x: 150, y: 166, c: "coral", delay: 1.1 },
] as const;

// A few "reach" lines that stretch from TU toward an event but stop short.
const REACH_TARGETS = [EVENTS[1], EVENTS[3], EVENTS[2]];
const reachEnd = (e: { x: number; y: number }, f = 0.6) => ({
  x: TU.x + f * (e.x - TU.x),
  y: TU.y + f * (e.y - TU.y),
});

/**
 * The "problem" visual: a searcher (TU) surrounded by scattered events
 * that flicker in and out, while faint reach-lines stretch toward them
 * and never quite connect — the friction of finding/reaching what's out
 * there. Deliberately unresolved, unlike the bridge on the other pages.
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
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 7"
              animate={
                animate
                  ? { strokeDashoffset: [0, -24], opacity: [0.15, 0.5, 0.15] }
                  : undefined
              }
              transition={{
                strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              }}
              style={{ opacity: 0.3 }}
            />
          );
        })}

        {/* Scattered events — flickering, hard to catch */}
        {EVENTS.map((e, i) => (
          <motion.circle
            key={`ev-${i}`}
            cx={e.x}
            cy={e.y}
            r="9"
            fill={COL[e.c]}
            animate={animate ? { opacity: [1, 0.2, 1], scale: [1, 0.85, 1] } : undefined}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: e.delay,
            }}
            style={{ transformOrigin: `${e.x}px ${e.y}px`, opacity: reduce ? 0.7 : 1 }}
          />
        ))}

        {/* Searching rings from TU */}
        {animate &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={TU.x}
              cy={TU.y}
              fill="none"
              stroke={COL.coral}
              strokeWidth="2"
              initial={{ r: 16, opacity: 0.5 }}
              animate={{ r: 90, opacity: 0 }}
              transition={{
                duration: 2.7,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.9,
              }}
            />
          ))}

        {/* TU node */}
        <circle
          cx={TU.x}
          cy={TU.y}
          r="16"
          fill={COL.coral}
          style={{ filter: "drop-shadow(0 0 14px rgba(247,107,58,0.7))" }}
        />
        <text
          x={TU.x}
          y={TU.y + 5}
          textAnchor="middle"
          className="font-sans"
          fontSize="12"
          fontWeight="700"
          fill="#0B0920"
        >
          TU
        </text>
      </svg>

      <div className="mt-3 flex items-center justify-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
        <span>Cerchi</span>
        <span aria-hidden className="text-smoke/40">·</span>
        <span>non trovi</span>
        <span aria-hidden className="text-smoke/40">·</span>
        <span className="text-coral">ti perdi</span>
      </div>
    </div>
  );
}
