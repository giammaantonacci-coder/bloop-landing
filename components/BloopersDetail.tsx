"use client";

import { motion } from "framer-motion";
import { Marquee } from "./ui/Marquee";
import { BlooperLevels } from "./ui/BlooperLevels";

const perks = [
  "Accesso VIP",
  "Eventi esclusivi",
  "Ticket scontati",
  "Badge esclusivi",
  "Anteprime",
  "Priorità in lista",
];

const steps = [
  {
    n: "01",
    tag: "Segnala",
    title: "Vedi un evento che manca?",
    body: "Un link, un flyer, uno screen. Bastano pochi secondi per farcelo sapere in DM o via email.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Verifichiamo",
    title: "Il team controlla e pubblica",
    body: "Ogni segnalazione passa dal team Bloop. Se è valida, entra in app entro poche ore.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Guadagna",
    title: "Accumuli punti",
    body: "Ogni evento approvato ti fa salire di livello. Più segnali, più sblocchi.",
    accent: "coral" as const,
  },
];

const rewards = [
  {
    n: "01",
    tag: "VIP",
    title: "Accesso prioritario",
    body: "Salta la fila ed entra prima agli eventi partner. Il tuo posto è già pronto.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Esclusive",
    title: "Serate riservate",
    body: "Inviti a eventi solo per Bloopers, che non trovi da nessun'altra parte.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Sconti",
    title: "Ticket scontati",
    body: "Prezzi ridotti e drop dedicati sui biglietti degli eventi in app.",
    accent: "coral" as const,
  },
  {
    n: "04",
    tag: "Status",
    title: "Badge e livelli",
    body: "Sali di livello, sblocca badge e fatti riconoscere nella community.",
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

export function BloopersDetail() {
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
                Community
              </p>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-7xl md:text-8xl"
              >
                Diventa un{" "}
                <span className="highlight-coral">Blooper</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl"
              >
                La città la fanno le persone che la vivono. Segnala gli eventi
                che mancano, falli scoprire a tutti — e guadagna mentre lo fai.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks marquee */}
      <section className="relative py-12">
        <div className="border-y border-white/10 py-5">
          <Marquee
            items={perks.map((p) => (
              <span
                key={p}
                className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-4xl"
              >
                {p}
              </span>
            ))}
            separator={
              <span aria-hidden className="mx-6 inline-block h-2.5 w-2.5 rotate-45 bg-coral sm:mx-8" />
            }
          />
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                Come funziona
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
                Tre passi.
                <br />
                <span className="text-smoke">Zero sbatti.</span>
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

      {/* Levels — gamified */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
                I livelli
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
                Più segnali,
                <br />
                <span className="text-smoke">più sali.</span>
              </motion.h2>
            </div>
          </div>

          <BlooperLevels />
        </div>
      </section>

      {/* Rewards */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                I premi
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
                Cosa sblocchi
                <br />
                <span className="text-smoke">salendo.</span>
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
            {rewards.map((r) => (
              <motion.article
                key={r.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={r.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {r.n}
                  </span>
                  <span>{r.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {r.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {r.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
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
              Pronto a far pulsare
              <br />
              <span className="highlight-coral">la città?</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white">
              Mandaci la prima segnalazione in DM su Instagram o via email.
              Rispondiamo a tutti.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="mailto:bloopappevents@gmail.com?subject=Diventa%20Blooper"
                className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
              >
                Diventa Blooper
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-smoke transition hover:text-white"
              >
                Seguici su Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
