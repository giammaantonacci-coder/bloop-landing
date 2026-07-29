"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Section } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";
import { EditorialImage } from "./ui/EditorialImage";
import { photos } from "./photos";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <Section id="hero" tone="dark" className="isolate flex min-h-screen flex-col">
      <div className="shell flex flex-1 flex-col pt-24 sm:pt-28">
        {/* Masthead strip — mono metadata pinned to a hairline, the way a
            Swiss poster carries its imprint. */}
        <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-4">
          <p className="eyebrow text-accent-ink">Il radar degli eventi della tua città</p>
          <p className="eyebrow text-muted">Bologna · IT · MMXXVI</p>
        </div>

        {/* Headline — the whole point of the page. Flush left, tight
            leading, one line dropped into a coral block. */}
        <h1 className="display-xl mt-12 sm:mt-16">
          <motion.span className="block" {...rise(0.05)}>
            La tua città
          </motion.span>
          <motion.span className="block" {...rise(0.12)}>
            è più viva
          </motion.span>
          {/* `.mark-line` rather than an ad-hoc margin: it carries the leading
              the coral box needs, so the phrase can wrap on a narrow screen
              without the second line landing on the first. */}
          <motion.span className="mark-line" {...rise(0.19)}>
            <span className="mark">di quanto pensi.</span>
          </motion.span>
        </h1>

        {/* Base of the composition: statement and action left, plate right. */}
        <div className="grid12 mt-auto gap-y-12 pt-14 sm:pt-20">
          <motion.div className="md:col-span-3" {...rise(0.3)}>
            <p className="eyebrow text-muted">Cos&apos;è</p>
          </motion.div>

          <motion.div className="md:col-span-5" {...rise(0.34)}>
            <p className="copy text-fg">
              Bloop raccoglie tutti gli eventi della tua città in un solo posto —
              anche le chicche che vivono nei social e nelle chat — e ti aiuta a
              trovare cosa fare, stasera, vicino a te. A scegliere sei tu.
            </p>

            {/* Two audiences, two actions: come and look, or come and take
                part. The ghost pill keeps the second from competing with the
                first. "Diventa Blooper" points at the page rather than
                straight at the mail client — from a cold hero that is a jump,
                and the page closes with the same call anyway. */}
            <div className="mt-8 flex flex-col items-start gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#soluzione" className="btn group">
                  Scopri Bloop
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <Link href="/bloopers" className="btn-ghost group">
                  Diventa Blooper
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
              <ArrowLink href="#problema" accent="fg">
                Guarda perché
              </ArrowLink>
            </div>
          </motion.div>

          <motion.div className="md:col-span-4" {...rise(0.42)}>
            <EditorialImage
              src={photos.hero.src}
              alt={photos.hero.alt}
              ratio="landscape"
              index="01"
              caption="Stasera, vicino a te"
              scribble="circle"
              scribblePlace="left-[24%] top-[8%] w-[46%]"
              priority
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </motion.div>
        </div>

        {/* Foot rule with the scroll cue */}
        <div className="rule-t mt-10 flex items-center justify-between py-5">
          <span className="eyebrow text-muted">
            {reduce ? "Sezione 01 — 06" : "Scroll ↓"}
          </span>
          <span className="eyebrow text-muted">01 / 06</span>
        </div>
      </div>
    </Section>
  );
}
