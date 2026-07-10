"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type BalloonSpec = {
  char: string;
  color: "coral" | "lilac";
  left: string;
  top: string;
  rot: number;
  float: number;
};

const BALLOONS: BalloonSpec[] = [
  { char: "4", color: "coral", left: "10%", top: "12%", rot: -6, float: 3.4 },
  { char: "0", color: "lilac", left: "39%", top: "20%", rot: 5, float: 4.1 },
  { char: "4", color: "coral", left: "67%", top: "10%", rot: -3, float: 3.7 },
];

const GRAD = {
  coral:
    "radial-gradient(circle at 34% 28%, #ffc7a3 0%, #f9814d 42%, #F76B3A 62%, #a83c17 100%)",
  lilac:
    "radial-gradient(circle at 34% 28%, #e2ccff 0%, #b085ff 42%, #A269FF 62%, #5b2ea8 100%)",
};

const GLOW = {
  coral: "drop-shadow(0 24px 50px rgba(247,107,58,0.5))",
  lilac: "drop-shadow(0 24px 50px rgba(162,105,255,0.5))",
};

function Balloon({
  spec,
  reduce,
  bounds,
}: {
  spec: BalloonSpec;
  reduce: boolean | null;
  bounds: React.RefObject<HTMLDivElement>;
}) {
  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.16}
      dragConstraints={bounds}
      whileDrag={{ scale: 1.06 }}
      whileTap={{ scale: 1.04 }}
      className="absolute z-10 cursor-grab active:z-20 active:cursor-grabbing"
      style={{ left: spec.left, top: spec.top, touchAction: "none" }}
    >
      {/* Idle float — drag transforms compose on the parent */}
      <motion.div
        animate={
          reduce
            ? undefined
            : { y: [0, -16, 0], rotate: [spec.rot, spec.rot + 3, spec.rot] }
        }
        transition={{ duration: spec.float, repeat: Infinity, ease: "easeInOut" }}
        className="relative select-none"
      >
        {/* String */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[80%] h-24 w-px -translate-x-1/2 bg-white/25"
        />
        {/* 3D balloon digit */}
        <span
          className="block font-display font-extrabold leading-none"
          style={{
            fontSize: "clamp(6rem, 19vw, 13rem)",
            backgroundImage: GRAD[spec.color],
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: GLOW[spec.color],
          }}
        >
          {spec.char}
        </span>
        {/* Specular highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[24%] top-[14%] h-5 w-5 rounded-full bg-white/70 blur-md"
        />
      </motion.div>
    </motion.div>
  );
}

export function NotFound404() {
  const reduce = useReducedMotion();
  const bounds = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={bounds}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-40" aria-hidden />

      {/* Draggable balloons */}
      {BALLOONS.map((spec, i) => (
        <Balloon key={i} spec={spec} reduce={reduce} bounds={bounds} />
      ))}

      {/* Message — pinned to the lower area, above the balloons */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-3xl px-6 pb-16 pt-10 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral"
        >
          Errore 404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl"
        >
          Questa pagina non è{" "}
          <span className="highlight-coral">sul radar.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
          className="mt-5 max-w-xl text-lg text-white"
        >
          L&apos;hai presa un po&apos; larga. I palloncini però puoi spostarli
          dove vuoi — poi torna alla home.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="pointer-events-auto mt-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
          >
            Torna alla home
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
