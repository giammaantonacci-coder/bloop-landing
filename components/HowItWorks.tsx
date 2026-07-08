"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    code: "STOP · 01",
    title: "Dimmi cosa ti piace",
    body: "Un onboarding rapido: musica, cibo, mood. Bloop capisce il tuo modo di vivere la città.",
    accent: "coral" as const,
  },
  {
    n: "02",
    code: "STOP · 02",
    title: "Guarda la città pulsare",
    body: "La mappa live si aggiorna in tempo reale. Vedi dove sta succedendo qualcosa, adesso.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    code: "STOP · 03",
    title: "Esci e vivila",
    body: "Ticket, tragitto, amici. Tutto in un flusso unico. Zero pensieri.",
    accent: "coral" as const,
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

export function HowItWorks() {
  return (
    <section
      id="come-funziona"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-coral">
              Flusso
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
              Tre fermate.
              <br />
              <span className="text-smoke">Una serata diversa.</span>
            </motion.h2>
          </div>
        </div>

        {/* Step bubbles */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.li
              key={s.code}
              variants={item}
              className="group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-bold text-deep ${
                  s.accent === "coral" ? "bg-coral" : "bg-lilac"
                }`}
                aria-hidden
              >
                {s.n}
              </span>

              <h3 className="mt-8 font-display text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-3xl">
                {s.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
