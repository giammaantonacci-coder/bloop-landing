"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    n: "01",
    tag: "Segnala",
    title: "Sai di una cosa bella?",
    body: "Un link, un flyer, uno screen. Taggami #Bloop dalle tue serate o scrivimi in DM. Bastano pochi secondi.",
    reward: "+ Segnalazione",
  },
  {
    n: "02",
    tag: "Pubblico",
    title: "Bloop la verifica e la pubblica",
    body: "Il team controlla che sia tutto giusto e la fa scoprire a tutti. Niente gatekeeping: entra chiunque abbia qualcosa di buono.",
    reward: "+ Fiducia",
  },
  {
    n: "03",
    tag: "Riconoscimento",
    title: "Vieni ricondiviso, col tuo nome",
    body: "Chi l'ha fatta scoprire viene citato. Più segnali, prima entri: i primi provano la città in anteprima.",
    reward: "+ Anteprima",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Bloopers() {
  return (
    <section
      id="bloopers"
      className="relative py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-coral">
              Community
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
              Aiutaci a mappare
              <br />
              la città. Diventa un{" "}
              <span className="highlight-coral">Blooper</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="mt-6 max-w-xl text-lg text-white"
            >
              La città la fanno le persone che la vivono. Segnala gli eventi che
              mancano — quelli che vivono nei social e nelle chat — e Bloop li fa
              scoprire a tutti.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="mt-8"
            >
              <Link
                href="/bloopers"
                className="group inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-coral transition hover:text-white"
              >
                Scopri come funziona
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Reward loop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.article
              key={s.n}
              variants={card}
              className="glow-border group relative flex flex-col justify-between rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-coral">
                {s.tag}
              </p>

              <div className="mt-16">
                <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white">
                  {s.body}
                </p>
              </div>

              <div className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-lilac/15 px-4 py-2 font-sans font-semibold text-[12px] uppercase tracking-[0.25em] text-lilac">
                {s.reward}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA row */}
        <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-smoke">
              Come partecipare
            </p>
            <p className="mt-4 max-w-xl font-display text-2xl leading-tight sm:text-3xl">
              Manda la tua prima segnalazione in DM su Instagram o via email.
              Rispondiamo a tutti.
            </p>
          </div>

          <div className="flex md:col-span-4 md:justify-end">
            <a
              href="mailto:bloopappevents@gmail.com?subject=Diventa%20Blooper"
              className="group inline-flex items-center gap-3 rounded-full bg-coral px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
            >
              Diventa Blooper
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
