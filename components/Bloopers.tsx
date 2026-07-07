"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "R/01",
    tag: "Segnala",
    title: "Vedi un evento che manca?",
    body: "Un link, un flyer, uno screen. Bastano pochi secondi per farcelo sapere in DM o via email.",
    reward: "+ Contributo",
  },
  {
    n: "R/02",
    tag: "Verifichiamo",
    title: "Il team controlla e pubblica.",
    body: "Ogni segnalazione passa dal team Bloop. Se è valida, entra in app entro poche ore.",
    reward: "+ Fiducia",
  },
  {
    n: "R/03",
    tag: "Guadagna",
    title: "Accumuli punti.",
    body: "Ogni evento approvato ti fa salire di livello. Più segnali, più sblocchi premi, esperienze e accessi VIP.",
    reward: "+ Punti",
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
      className="relative border-t border-white/10 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 noise opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-coral">
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
              Aiutaci a far pulsare
              <br />
              la città. Diventa un{" "}
              <span className="highlight-coral">Blooper</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="mt-6 max-w-xl text-lg text-smoke"
            >
              Bloop cresce grazie a chi vive la città. Segnala gli eventi che
              non trovi in app: ogni contributo ti fa guadagnare punti.
            </motion.p>
          </div>
        </div>

        {/* Reward loop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 border-b border-white/10 md:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              variants={card}
              className={`group relative flex flex-col justify-between p-8 md:p-10 ${
                i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
              }`}
            >
              {/* Left accent stripe */}
              <div
                aria-hidden
                className="absolute left-0 top-8 h-14 w-1 bg-coral transition-all duration-500 group-hover:h-24 md:top-10"
              />

              <div className="flex items-center justify-between font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-smoke">
                <span className="text-coral">{s.n}</span>
                <span>{s.tag}</span>
              </div>

              <div className="mt-16">
                <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-smoke">
                  {s.body}
                </p>
              </div>

              <div className="mt-10 inline-flex w-fit items-center gap-2 border border-coral/40 px-3 py-1.5 font-sans font-medium text-[10px] uppercase tracking-[0.25em] text-coral">
                {s.reward}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA row */}
        <div className="grid grid-cols-1 gap-8 pt-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-smoke">
              Come partecipare
            </p>
            <p className="mt-4 max-w-xl font-display text-2xl leading-tight sm:text-3xl">
              Mandaci una segnalazione in DM su Instagram o via email.
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
