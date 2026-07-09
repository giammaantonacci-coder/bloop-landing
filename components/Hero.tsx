"use client";

import { motion, useReducedMotion } from "framer-motion";

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
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-40 sm:px-8 sm:pt-52">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans font-semibold text-[13px] uppercase tracking-[0.28em] text-smoke"
        >
          Il radar degli eventi della tua città
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          className="mt-12 font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]"
        >
          <span className="block">La tua città è più viva</span>
          <span className="mt-5 block">
            <span className="highlight-coral">di quanto pensi.</span>
          </span>
        </motion.h1>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-balance text-lg text-white sm:text-xl md:col-span-6"
          >
            Sono Bloop: l&apos;amico local che ti dice dove andare, stasera,
            vicino a te. Tutti gli eventi in un solo posto — anche le chicche
            che vivono nei social e nelle chat. Li scopri tu, non l&apos;algoritmo.
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
              Accendi il radar
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
              className="group inline-flex items-center gap-2 font-sans font-semibold text-[13px] uppercase tracking-[0.2em] text-smoke transition hover:text-white"
            >
              Guarda perché
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↓</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!reduce && (
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 pb-10 pt-16 font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-smoke sm:px-8">
          <span>Scroll ↓</span>
        </div>
      )}
    </section>
  );
}
