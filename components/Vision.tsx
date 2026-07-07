"use client";

import { motion } from "framer-motion";

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
      className="relative isolate overflow-hidden border-t border-white/10 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-lilac">
              Visione
            </p>
          </div>
          <div className="md:col-span-9">
            <p className="font-sans font-medium text-xs uppercase tracking-[0.25em] text-smoke">
              Manifesto / v0.1
            </p>
          </div>
        </div>

        {/* Framed editorial statement */}
        <div className="relative mt-16 border border-white/15 bg-deep/40 p-8 sm:p-14 md:p-20">
          {/* Corner tick marks */}
          <span aria-hidden className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-coral" />
          <span aria-hidden className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-coral" />
          <span aria-hidden className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-coral" />
          <span aria-hidden className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-coral" />

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
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-10 font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-smoke"
            >
              <span className="text-white">— Il team Bloop</span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span>2026</span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
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
