"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type BalloonSpec = {
  src: string;
  alt: string;
  aspect: string;
  left: string;
  top: string;
  rot: number;
  float: number;
  flip?: boolean;
};

const BALLOONS: BalloonSpec[] = [
  { src: "/balloons/four.webp", alt: "4", aspect: "417 / 559", left: "3%", top: "13%", rot: -6, float: 3.4 },
  { src: "/balloons/zero.webp", alt: "0", aspect: "409 / 537", left: "38%", top: "20%", rot: 4, float: 4.1 },
  { src: "/balloons/four.webp", alt: "4", aspect: "417 / 559", left: "70%", top: "11%", rot: -3, float: 3.7 },
];

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
        style={{ transform: spec.flip ? "scaleX(-1)" : undefined }}
      >
        {/* Real 3D chrome balloon render */}
        <img
          src={spec.src}
          alt={spec.alt}
          draggable={false}
          className="block select-none"
          style={{
            height: "clamp(7rem, 24vw, 18rem)",
            width: "auto",
            aspectRatio: spec.aspect,
            filter: "drop-shadow(0 30px 55px rgba(150,180,205,0.35))",
          }}
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
