"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

const lines = [
  ["Immaginiamo una città", "visibile a 360 gradi."],
  ["Dove nessun evento va perso,", "e nessuno resta fuori"],
  ["solo perché non sapeva", "che stesse succedendo."],
  ["La scopri tu,", "non l'algoritmo."],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

/**
 * The manifesto band: a solid coral campitura with ink type. It's the single
 * loudest beat on the page — no rules, no columns, just the statement.
 */
export function Vision() {
  return (
    <Section id="visione" tone="accent">
      <div className="shell py-24 sm:py-32">
        <div className="rule-b flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pb-4">
          <span className="eyebrow">05 — Visione</span>
          <span className="eyebrow">Manifesto</span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-16 sm:mt-24"
        >
          {lines.map((pair, i) => (
            <motion.p
              key={i}
              variants={line}
              className="display-md mt-6 first:mt-0"
            >
              <span className="block">{pair[0]}</span>
              {i === 3 ? (
                <span className="mark-line">
                  <span className="mark">{pair[1]}</span>
                </span>
              ) : (
                <span className="block">{pair[1]}</span>
              )}
            </motion.p>
          ))}
        </motion.div>

        <div className="rule-t mt-20 grid12 gap-y-6 pt-6">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 md:col-span-9">
            <span className="eyebrow">— Il team Bloop</span>
            <span className="eyebrow">2026</span>
            <a
              href="mailto:bloopappevents@gmail.com"
              className="eyebrow underline underline-offset-4"
            >
              bloopappevents@gmail.com
            </a>
          </div>
          <div className="md:col-span-3 md:text-right">
            <ArrowLink href="/visione" accent="1">
              Approfondisci
            </ArrowLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
