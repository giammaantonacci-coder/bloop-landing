"use client";

import { motion } from "framer-motion";

const beliefs = [
  {
    n: "01",
    tag: "La città",
    title: "Non è solo dove vivi",
    body: "È un'esperienza da vivere insieme, ogni giorno. Non uno sfondo, ma il posto in cui succedono le cose.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Il modo",
    title: "Più umano",
    body: "Vogliamo farti vivere la città con più leggerezza e meno rumore. Meno tempo a cercare, più tempo a esserci.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Il mezzo",
    title: "Tecnologia che avvicina",
    body: "Non uno schermo in più tra te e il mondo, ma un ponte verso di esso. Che poi sparisce, quando esci.",
    accent: "coral" as const,
  },
];

const principles = [
  {
    n: "01",
    tag: "Umano",
    title: "La tecnologia sparisce",
    body: "Il telefono è un mezzo, non il fine. Bloop esiste per farti alzare lo sguardo, non per tenertelo incollato.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Reale",
    title: "Fatti, non feed",
    body: "Non vogliamo il tuo tempo sullo schermo. Vogliamo le tue serate fuori, con le persone.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Insieme",
    title: "La città è collettiva",
    body: "Una città viva la fanno le persone che la vivono. Più siamo, più pulsa.",
    accent: "coral" as const,
  },
  {
    n: "04",
    tag: "Aperto",
    title: "Per tutti",
    body: "Che tu sia di qui da sempre o arrivato ieri: la città è tua. Bloop te la mette a portata.",
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

const manifestoLines = [
  ["Crediamo che la città non sia solo", "il posto in cui viviamo."],
  ["È un'esperienza", "da vivere insieme."],
];

export function VisionDetail() {
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
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                La visione
              </p>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-7xl md:text-8xl"
              >
                La città è
                <br />
                <span className="text-smoke">da vivere.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl"
              >
                Bloop non nasce per farti stare più tempo sul telefono. Nasce
                per farti vivere la città in modo più umano — dove la tecnologia
                non distrae, ma avvicina.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto centerpiece */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-[2.5rem] bg-white/[0.04] p-8 sm:p-14 md:p-20">
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15% 0px" }}
              className="space-y-8 sm:space-y-10"
            >
              {manifestoLines.map((pair, i) => (
                <motion.p
                  key={i}
                  variants={item}
                  className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl"
                >
                  {pair[0]}
                  <br />
                  <span className={i === 1 ? "highlight-lilac" : "text-white/95"}>
                    {pair[1]}
                  </span>
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three beliefs */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
                Cosa crediamo
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
                Tre convinzioni,
                <br />
                <span className="text-smoke">una direzione.</span>
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
            {beliefs.map((b) => (
              <motion.article
                key={b.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={b.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {b.n}
                  </span>
                  <span>{b.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {b.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {b.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                I principi
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
                Le regole
                <br />
                <span className="text-smoke">che non cambiano.</span>
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
            {principles.map((p) => (
              <motion.article
                key={p.n}
                variants={item}
                className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
              >
                <div className="flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-smoke">
                  <span className={p.accent === "coral" ? "text-coral" : "text-lilac"}>
                    {p.n}
                  </span>
                  <span>{p.tag}</span>
                </div>
                <h3 className="mt-14 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {p.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Signature statement */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.3em] text-smoke md:col-span-3">
              Sintesi
            </p>
            <div className="md:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-balance font-display text-3xl leading-tight sm:text-4xl md:text-5xl"
              >
                La città non ha bisogno di un&apos;altra app.{" "}
                <span className="highlight-lilac">Ha bisogno di te, fuori.</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-smoke"
              >
                <span className="text-white">— Il team Bloop</span>
                <span>2026</span>
                <a
                  href="mailto:bloopappevents@gmail.com"
                  className="transition hover:text-white"
                >
                  bloopappevents@gmail.com
                </a>
              </motion.div>
            </div>
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
              Vivi la città
              <br />
              <span className="highlight-coral">con noi.</span>
            </h2>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/#bloopers"
                className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
              >
                Unisciti ai Bloopers
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
