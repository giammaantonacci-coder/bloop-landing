"use client";

import { motion } from "framer-motion";
import { BridgeConnector } from "./ui/BridgeConnector";

const steps = [
  {
    n: "01",
    tag: "Onboarding",
    title: "Dimmi cosa ti piace",
    body: "Un onboarding rapido: musica, cibo, mood. In pochi tap Bloop capisce il tuo modo di vivere la città.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Discovery",
    title: "Guarda la città pulsare",
    body: "La mappa live si aggiorna in tempo reale. Vedi dove sta succedendo qualcosa, adesso, vicino a te.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Esperienza",
    title: "Esci e vivila",
    body: "Ticket, tragitto, amici. Tutto in un flusso unico. Dall'idea alla porta d'ingresso, zero pensieri.",
    accent: "coral" as const,
  },
];

const details = [
  {
    n: "01",
    tag: "Zero attrito",
    title: "Meno tap, più serate",
    body: "Ogni passaggio toglie frizione: niente moduli infiniti, niente dieci app aperte.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Contesto",
    title: "Al momento giusto",
    body: "Bloop capisce dove sei e che ora è. I suggerimenti cambiano con la giornata.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Insieme",
    title: "Con i tuoi",
    body: "Inviti gli amici, vi coordinate e partite insieme. La serata si organizza da sola.",
    accent: "coral" as const,
  },
  {
    n: "04",
    tag: "Live",
    title: "In tempo reale",
    body: "La città cambia di ora in ora. Bloop resta al passo, sempre aggiornato.",
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

export function FlowDetail() {
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
                Il flusso
              </p>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-7xl md:text-8xl"
              >
                Dall&apos;impulso
                <br />
                <span className="text-smoke">alla serata.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl"
              >
                Uscire dovrebbe essere semplice. Bloop ti accompagna passo dopo
                passo: dal capire cosa ti va, a viverlo davvero. Senza attriti.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                Tre fermate
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
                Un percorso,
                <br />
                <span className="text-smoke">senza pensieri.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {steps.map((s) => (
              <motion.article
                key={s.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={s.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {s.n}
                  </span>
                  <span>{s.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {s.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* In detail */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
                Nel dettaglio
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
                Curato in ogni
                <br />
                <span className="text-smoke">passaggio.</span>
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
            {details.map((d) => (
              <motion.article
                key={d.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={d.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {d.n}
                  </span>
                  <span>{d.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {d.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {d.body}
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
              Dall&apos;idea di uscire alla porta d&apos;ingresso.{" "}
              <span className="highlight-coral">Un flusso solo.</span>
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
              La tecnologia che
              <br />
              <span className="highlight-lilac">ti avvicina.</span>
            </h2>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/#visione"
                className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
              >
                Guarda la visione
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
