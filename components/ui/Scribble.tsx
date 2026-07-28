"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hand-drawn marks laid over the photography — the felt-tip annotation a
 * picture editor would make on a contact sheet.
 *
 * The paths are deliberately imperfect: circles overshoot where they close,
 * lines drift off true, arrowheads sit slightly askew. Perfect geometry would
 * read as another piece of the Swiss grid instead of as a human mark, which
 * is the whole point of the layer.
 *
 * Each mark draws itself in on scroll, like it is being written.
 */

export type ScribbleName =
  | "circle"
  | "arrow"
  | "underline"
  | "burst"
  | "pin"
  | "star";

type Path = { d: string; width?: number };

type Mark = {
  viewBox: string;
  paths: Path[];
  /** Default placement inside the image frame. */
  place: string;
};

const MARKS: Record<ScribbleName, Mark> = {
  // A ring thrown around the subject, closing past where it started.
  circle: {
    viewBox: "0 0 200 164",
    paths: [
      {
        d: "M170 46C161 20 121 6 88 9 45 13 12 40 10 78c-2 40 37 74 87 76 50 2 90-25 94-63 3-30-13-56-41-70",
      },
    ],
    place: "left-[8%] top-[10%] w-[58%]",
  },

  // A curved arrow with a slightly crooked head.
  arrow: {
    viewBox: "0 0 180 110",
    paths: [
      { d: "M8 12c46-7 104 12 138 58" },
      { d: "M146 70l-26-13" },
      { d: "M146 70l3-30" },
    ],
    place: "right-[10%] top-[12%] w-[42%]",
  },

  // Two passes of underscore, the second not quite tracking the first.
  underline: {
    viewBox: "0 0 200 34",
    paths: [
      { d: "M5 11c58-8 138-6 190 3" },
      { d: "M10 23c62-7 142-5 184 2", width: 2.4 },
    ],
    place: "bottom-[12%] left-[10%] w-[62%]",
  },

  // Short radiating strokes — a "pop" around something worth noticing.
  burst: {
    viewBox: "0 0 120 120",
    paths: [
      { d: "M60 6v22" },
      { d: "M60 92v22" },
      { d: "M6 60h22" },
      { d: "M92 60h22" },
      { d: "M22 22l16 16" },
      { d: "M82 82l16 16" },
      { d: "M98 22L82 38" },
      { d: "M38 82l-16 16" },
    ],
    place: "right-[14%] top-[16%] w-[26%]",
  },

  // A map pin, drawn rather than iconographic.
  pin: {
    viewBox: "0 0 84 108",
    paths: [
      {
        d: "M42 100S13 62 13 38C13 19 26 6 42 6s29 12 29 31c0 24-29 63-29 63Z",
      },
      { d: "M42 45c7 0 12-5 12-11s-5-11-12-11-12 5-12 11 5 11 12 11Z", width: 2.4 },
    ],
    place: "right-[16%] top-[10%] w-[16%]",
  },

  // Four-point sparkle, struck twice.
  star: {
    viewBox: "0 0 80 80",
    paths: [
      { d: "M40 6c3 20 11 29 33 32-22 3-30 12-33 34-3-22-11-31-33-34 22-3 30-12 33-32Z" },
    ],
    place: "left-[12%] bottom-[14%] w-[18%]",
  },
};

type ScribbleProps = {
  name: ScribbleName;
  /** Overrides the mark's default placement classes. */
  place?: string;
  stroke?: string;
  className?: string;
  /** Staggers the draw-in when several marks share a frame. */
  delay?: number;
};

export function Scribble({
  name,
  place,
  stroke = "#FFFFFF",
  className = "",
  delay = 0,
}: ScribbleProps) {
  const reduce = useReducedMotion();
  const mark = MARKS[name];

  return (
    <motion.svg
      viewBox={mark.viewBox}
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px" }}
      className={`pointer-events-none absolute ${place ?? mark.place} ${className}`}
    >
      {mark.paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke={stroke}
          strokeWidth={p.width ?? 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
            shown: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: delay + i * 0.12,
                },
                opacity: { duration: 0.01, delay: delay + i * 0.12 },
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
