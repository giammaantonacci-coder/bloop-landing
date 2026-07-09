"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { BridgeConnector } from "./ui/BridgeConnector";

type Stat = {
  value: number;
  suffix?: string;
  custom?: string;
  label: string;
  source: string;
  index: string;
};

const stats: Stat[] = [
  {
    value: 86,
    suffix: "%",
    label: "della giornata la passiamo chiusi in casa",
    source: "Indoor time index",
    index: "01",
  },
  {
    value: 69,
    suffix: "%",
    label: "delle persone scopre eventi solo tramite passaparola",
    source: "Word-of-mouth survey",
    index: "02",
  },
  {
    value: 0,
    custom: "1/3",
    label: "eventi locali non raggiunge il proprio pubblico",
    source: "Local reach study",
    index: "03",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Problem() {
  return (
    <section
      id="problema"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-coral">
              Problema
            </p>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-balance font-display text-4xl font-bold leading-[1] tracking-[-0.02em] sm:text-6xl md:text-7xl"
            >
              Quanto ti perdi
              <br />
              <span className="text-smoke">della tua città?</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mt-8"
            >
              <Link
                href="/problema"
                className="group inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-coral transition hover:text-white"
              >
                Approfondisci il problema
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats bubbles */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.li
              key={s.index}
              variants={item}
              className="glow-border group relative flex flex-col justify-between rounded-[2rem] bg-white/[0.04] p-8 py-12 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                {s.source}
              </p>

              <p className="mt-12 font-display text-[clamp(4.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.03em] text-coral">
                {s.custom ? (
                  s.custom
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>

              <p className="mt-8 max-w-xs text-base leading-relaxed text-white sm:text-lg">
                {s.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Closer */}
        <div className="mt-20">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.3em] text-smoke md:col-span-3">
              Sintesi
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-balance font-display text-3xl leading-tight sm:text-4xl md:col-span-9 md:text-5xl"
            >
              Gli eventi ci sono. La voglia c&apos;è.{" "}
              <span className="highlight-coral">Manca il ponte.</span>
            </motion.p>
          </div>

          <div className="mt-16">
            <BridgeConnector />
          </div>
        </div>
      </div>
    </section>
  );
}
