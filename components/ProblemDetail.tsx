"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { BridgeConnector } from "./ui/BridgeConnector";

type Stat = {
  value: number;
  suffix?: string;
  custom?: string;
  label: string;
  source: string;
};

const stats: Stat[] = [
  {
    value: 86,
    suffix: "%",
    label: "della giornata la passiamo chiusi in casa",
    source: "Indoor time index",
  },
  {
    value: 69,
    suffix: "%",
    label: "delle persone scopre eventi solo tramite passaparola",
    source: "Word-of-mouth survey",
  },
  {
    value: 0,
    custom: "1/3",
    label: "eventi locali non raggiunge il proprio pubblico",
    source: "Local reach study",
  },
];

const causes = [
  {
    n: "01",
    tag: "Frammentazione",
    title: "L'informazione è sparsa",
    body: "Instagram, gruppi, volantini, mille siti diversi. Nessuno ha il quadro completo di cosa succede stasera.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Passaparola",
    title: "Scopri solo se conosci",
    body: "Le cose belle girano tra chi è già nel giro. Chi è nuovo in città, o vuole cambiare abitudini, resta tagliato fuori.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Reach",
    title: "Gli organizzatori non arrivano",
    body: "Chi crea esperienze fatica a farsi trovare: budget marketing quasi zero e visibilità organica sempre più bassa.",
    accent: "coral" as const,
  },
  {
    n: "04",
    tag: "Effetto",
    title: "La città si spegne",
    body: "Il risultato: locali mezzi vuoti, serate perse e la sensazione, sbagliata, che «non ci sia mai niente da fare».",
    accent: "lilac" as const,
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function ProblemDetail() {
  return (
    <>
      {/* Header */}
      <section className="relative px-6 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-smoke transition hover:text-white"
          >
            <span aria-hidden>←</span> Torna alla home
          </motion.a>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
                Il problema
              </p>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-7xl md:text-8xl"
              >
                Ci stiamo perdendo
                <br />
                <span className="text-smoke">la città.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl"
              >
                Ogni giorno, intorno a te, succede molto più di quello che vedi.
                Il problema non è la mancanza di eventi — è che non arrivano a te.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.li
              key={s.source}
              variants={item}
              className="glow-border group relative flex flex-col justify-between rounded-[2rem] bg-white/[0.04] p-8 py-12 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                {s.source}
              </p>
              <p className="mt-12 font-display text-[clamp(4.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.03em] text-coral">
                {s.custom ? s.custom : <AnimatedCounter value={s.value} suffix={s.suffix} />}
              </p>
              <p className="mt-8 max-w-xs text-base leading-relaxed text-white sm:text-lg">
                {s.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Causes */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                Le cause
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
                Quattro crepe
                <br />
                <span className="text-smoke">nello stesso muro.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {causes.map((c) => (
              <motion.article
                key={c.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={c.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {c.n}
                  </span>
                  <span>{c.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {c.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bridge statement */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.3em] text-smoke md:col-span-3">
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
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glow-border relative overflow-hidden rounded-[2.5rem] bg-white/[0.04] p-10 sm:p-16"
          >
            <h2 className="max-w-2xl text-balance font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              Il problema ha una forma precisa.
              <br />
              <span className="highlight-lilac">E anche la soluzione.</span>
            </h2>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/#soluzione"
                className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
              >
                Scopri come Bloop lo risolve
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="/"
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-smoke transition hover:text-white"
              >
                Torna alla home
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
