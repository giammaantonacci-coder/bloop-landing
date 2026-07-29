"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Section } from "./ui/Section";

type DigitSpec = {
  char: string;
  color: string;
  left: string;
  top: string;
  rot: number;
  float: number;
};

// Three flat digits, draggable. No gradients, no glow — solid colour blocks
// the way a Swiss poster would set an oversized numeral. They take the tone's
// readable accents: flat coral on paper only reaches 2.6:1.
const DIGITS: DigitSpec[] = [
  { char: "4", color: "var(--accent-ink)", left: "6%", top: "14%", rot: -4, float: 3.4 },
  { char: "0", color: "var(--accent-2-ink)", left: "36%", top: "22%", rot: 3, float: 4.1 },
  { char: "4", color: "var(--accent-ink)", left: "64%", top: "12%", rot: -2, float: 3.7 },
];

function Digit({
  spec,
  reduce,
  bounds,
}: {
  spec: DigitSpec;
  reduce: boolean | null;
  bounds: React.RefObject<HTMLDivElement>;
}) {
  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.16}
      dragConstraints={bounds}
      whileDrag={{ scale: 1.04 }}
      className="absolute z-10 cursor-grab active:z-20 active:cursor-grabbing"
      style={{ left: spec.left, top: spec.top, touchAction: "none" }}
    >
      <motion.span
        animate={
          reduce
            ? undefined
            : { y: [0, -14, 0], rotate: [spec.rot, spec.rot + 2, spec.rot] }
        }
        transition={{ duration: spec.float, repeat: Infinity, ease: "easeInOut" }}
        className="block select-none font-display font-extrabold leading-none tracking-[-0.06em]"
        style={{
          fontSize: "clamp(6rem, 19vw, 14rem)",
          color: spec.color,
        }}
      >
        {spec.char}
      </motion.span>
    </motion.div>
  );
}

export function NotFound404() {
  const reduce = useReducedMotion();
  const bounds = useRef<HTMLDivElement>(null);

  return (
    <Section tone="light" className="flex min-h-screen flex-col overflow-hidden">
      <div ref={bounds} className="absolute inset-0" aria-hidden={false}>
        {DIGITS.map((spec, i) => (
          <Digit key={i} spec={spec} reduce={reduce} bounds={bounds} />
        ))}
      </div>

      {/* Message — pinned to the lower band, above the digits */}
      <div className="pointer-events-none relative z-20 mt-auto w-full">
        <div className="shell pb-16 pt-10">
          <div className="rule-t grid12 gap-y-8 pt-6">
            <div className="md:col-span-3">
              <span className="eyebrow text-accent-ink">Errore 404</span>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="display-md max-w-3xl"
              >
                <span className="block">Questa pagina non è</span>
                <span className="mark-line">
                  <span className="mark">sul radar.</span>
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="copy mt-8 max-w-xl text-muted"
              >
                L&apos;hai presa un po&apos; larga. I numeri però puoi
                trascinarli dove vuoi — poi torna alla home.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
                className="pointer-events-auto mt-10"
              >
                <Link href="/" className="btn group">
                  Torna alla home
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
