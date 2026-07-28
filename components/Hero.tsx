"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <Section id="hero" tone="dark" className="isolate flex min-h-screen flex-col">
      <div className="shell flex flex-1 flex-col pt-28 sm:pt-32">
        {/* Masthead strip — mono metadata pinned to a hairline, the way a
            Swiss poster carries its imprint. */}
        <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-4">
          <p className="eyebrow text-accent-ink">Il radar degli eventi della tua città</p>
          <p className="eyebrow text-muted">Bologna · IT · MMXXVI</p>
        </div>

        {/* Headline — the whole point of the page. Flush left, tight
            leading, one line dropped into a coral block. */}
        <h1 className="display-xl mt-16 sm:mt-24">
          <motion.span className="block" {...rise(0.05)}>
            La tua città
          </motion.span>
          <motion.span className="block" {...rise(0.12)}>
            è più viva
          </motion.span>
          {/* Clearance above the marked line. At 0.88 leading the previous
              line's descenders overflow its box by ~0.055em and the mark's
              background box reaches ~0.125em above its own; 0.2em covers both
              at every step of the clamp, which a fixed margin cannot. */}
          <motion.span className="mt-[0.2em] block" {...rise(0.19)}>
            <span className="mark">di quanto pensi.</span>
          </motion.span>
        </h1>

        {/* Base of the composition: statement left, action right. */}
        <div className="grid12 mt-auto gap-y-10 pt-20 sm:pt-28">
          <motion.div className="md:col-span-3" {...rise(0.3)}>
            <p className="eyebrow text-muted">Cos&apos;è</p>
          </motion.div>

          <motion.div className="md:col-span-5" {...rise(0.34)}>
            <p className="copy text-fg">
              Bloop raccoglie tutti gli eventi della tua città in un solo posto —
              anche le chicche che vivono nei social e nelle chat — e ti aiuta a
              trovare cosa fare, stasera, vicino a te. A scegliere sei tu.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-start gap-6 md:col-span-4 md:items-end"
            {...rise(0.4)}
          >
            <a href="#soluzione" className="btn group">
              Scopri Bloop
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <ArrowLink href="#problema" accent="fg">
              Guarda perché
            </ArrowLink>
          </motion.div>
        </div>

        {/* Foot rule with the scroll cue */}
        <div className="rule-t mt-16 flex items-center justify-between py-5">
          <span className="eyebrow text-muted">
            {reduce ? "Sezione 01 — 06" : "Scroll ↓"}
          </span>
          <span className="eyebrow text-muted">01 / 06</span>
        </div>
      </div>
    </Section>
  );
}
