"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const lines = [
  ["Crediamo che la città non sia solo", "il posto in cui viviamo."],
  ["È un'esperienza", "da vivere insieme."],
  ["Bloop nasce per farci vivere la città", "in modo più umano —"],
  ["dove la tecnologia non distrae,", "ma avvicina."],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Vision() {
  return (
    <section
      id="visione"
      className="relative isolate overflow-hidden py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-lilac">
              Visione
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-smoke">
              Manifesto
            </p>
            <Link
              href="/visione"
              className="group mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-lilac transition hover:text-white"
            >
              Approfondisci la visione
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Editorial statement bubble */}
        <div className="relative mt-8 rounded-[2.5rem] bg-white/[0.04] p-8 sm:p-14 md:p-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="space-y-8 sm:space-y-10"
          >
            {lines.map((pair, i) => (
              <motion.p
                key={i}
                variants={line}
                className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl"
              >
                {pair[0]}
                <br />
                <span className={i === 1 ? "highlight-coral" : "text-white/95"}>
                  {pair[1]}
                </span>
              </motion.p>
            ))}

            <motion.div
              variants={line}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-10 font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-smoke"
            >
              <span className="text-white">— Il team Bloop</span>
              <span>2026</span>
              <a
                href="mailto:bloopappevents@gmail.com"
                className="transition hover:text-white"
              >
                bloopappevents@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
