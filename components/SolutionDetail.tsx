"use client";

import { motion } from "framer-motion";
import { BridgeConnector } from "./ui/BridgeConnector";

const COL = { coral: "#F76B3A", lilac: "#A269FF" } as const;

const features = [
  {
    n: "01",
    tag: "Discovery",
    title: "Scopri cosa pulsa",
    body: "Aggreghiamo eventi e posti da più fonti in un unico posto. Niente più dieci app aperte e mille gruppi da controllare.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Personal",
    title: "Su misura per te",
    body: "Dici che serata cerchi — gente, qualcosa di tranquillo, o «stupiscimi» — e Bloop ti mostra solo quello che fa per te.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Flow",
    title: "Dall'idea all'ingresso",
    body: "Dall'impulso di uscire al posto giusto, senza saltare da un'app all'altra. Bloop ti accompagna fino a lì.",
    accent: "coral" as const,
  },
];

const details = [
  {
    n: "01",
    tag: "Aggregazione",
    title: "Una sola mappa",
    body: "Tutti gli eventi e i posti della città, raccolti in un solo posto e sempre aggiornati.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "Personalizzazione",
    title: "Ti conosce",
    body: "Più usi Bloop, più diventa preciso. I suggerimenti si adattano a te, non il contrario.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Azione",
    title: "Dal vedere al fare",
    body: "Trovi qualcosa? In pochi tap hai biglietto, percorso e amici avvisati.",
    accent: "coral" as const,
  },
  {
    n: "04",
    tag: "Community",
    title: "Cresce con te",
    body: "Ogni Blooper che segnala rende la mappa più viva. La città la costruiamo insieme.",
    accent: "lilac" as const,
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const row = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function SolutionDetail() {
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
                La soluzione
              </p>
            </div>
            <div className="md:col-span-9">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                className="text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-7xl md:text-8xl"
              >
                Il ponte tra te
                <br />
                <span className="text-smoke">e la tua città.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white sm:text-xl"
              >
                Bloop raccoglie tutto quello che succede in città — anche le
                chicche che vivono nei social e nelle chat — e ti aiuta a
                trovare cosa fare. Il resto lo decidi tu.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Core features — alternating editorial rows */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
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
                Tre mosse.
                <br />
                <span className="text-smoke">Una serata.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-6 border-t border-white/10"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                variants={row}
                className="grid grid-cols-1 items-center gap-6 border-b border-white/10 py-12 md:grid-cols-12 md:gap-10 md:py-16"
              >
                <div
                  className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <span
                    aria-hidden
                    className="block font-display text-[clamp(4.5rem,12vw,10rem)] font-bold leading-[0.8] tracking-tighter"
                    style={{
                      WebkitTextStroke: `1.5px ${COL[f.accent]}`,
                      color: "transparent",
                    }}
                  >
                    {f.n}
                  </span>
                  <p
                    className="mt-4 font-sans text-[12px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: COL[f.accent] }}
                  >
                    {f.tag}
                  </p>
                </div>
                <div
                  className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl md:text-5xl">
                    {f.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white sm:text-lg">
                    {f.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* In practice — numbered list */}
      <section className="relative px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-lilac">
                In pratica
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
                Cosa ottieni,
                <br />
                <span className="text-smoke">davvero.</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2"
          >
            {details.map((d) => (
              <motion.div
                key={d.n}
                variants={row}
                className="flex gap-6 border-t border-white/10 py-8"
              >
                <span
                  className="font-display text-3xl font-bold leading-none"
                  style={{ color: COL[d.accent] }}
                >
                  {d.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-3xl">
                    {d.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-white sm:text-lg">
                    {d.body}
                  </p>
                </div>
              </motion.div>
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
              <span className="highlight-lilac">Bloop è il ponte.</span>
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
              Pronto a vivere
              <br />
              <span className="highlight-coral">la città?</span>
            </h2>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/flusso"
                className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-deep transition hover:bg-white"
              >
                Guarda come funziona
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
