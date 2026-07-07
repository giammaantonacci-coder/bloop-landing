"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "./ui/Marquee";

const marqueeItems = [
  "GO OUT",
  "LIVE THE CITY",
  "REAL-TIME CITY PULSE",
  "BLOOP / 2026",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen flex-col overflow-hidden"
    >
      {/* Background: fine noise */}
      <div className="pointer-events-none absolute inset-0 noise opacity-40" aria-hidden />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-32 sm:px-8 sm:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans font-medium text-[11px] uppercase tracking-[0.28em] text-smoke"
        >
          Real-time city pulse platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          className="mt-10 font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]"
        >
          <span className="block sm:whitespace-nowrap">La tua città pulsa</span>
          <span className="mt-3 block">
            <span className="highlight-coral">Vivila.</span>
          </span>
        </motion.h1>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-balance text-lg text-smoke sm:text-xl md:col-span-6"
          >
            Bloop ti mostra tutto quello che succede intorno a te, in tempo
            reale. Eventi, zone vive, esperienze — tutto in un&apos;unica app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center md:col-span-6 md:justify-end"
          >
            <a
              href="#soluzione"
              className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
            >
              Diventa un Blooper
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#problema"
              className="group inline-flex items-center gap-2 font-sans font-medium text-xs uppercase tracking-[0.2em] text-smoke transition hover:text-white"
            >
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-smoke transition group-hover:w-10 group-hover:bg-white"
              />
              Guarda perché
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative z-10 mt-24 border-y border-white/10 bg-deep py-3">
        <Marquee
          items={marqueeItems.map((t) => (
            <span
              key={t}
              className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl"
            >
              {t}
            </span>
          ))}
          separator={
            <span aria-hidden className="mx-6 inline-block h-2 w-2 rotate-45 bg-coral" />
          }
        />
      </div>

      {/* Scroll indicator */}
      {!reduce && (
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5 font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-smoke sm:px-8">
          <span>Scroll ↓</span>
        </div>
      )}
    </section>
  );
}
