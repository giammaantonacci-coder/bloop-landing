"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    n: "01",
    tag: "Un solo posto",
    title: "Tutto in un posto",
    body: "Bloop raccoglie ogni evento della città — anche le chicche che vivono nei social e nelle chat. Basta saltare da un'app all'altra.",
    accent: "coral" as const,
  },
  {
    n: "02",
    tag: "La scegli tu",
    title: "Te lo dico io, non l'algoritmo",
    body: "Dici che serata cerchi e Bloop ti porta nel posto giusto, vicino a te, al momento giusto. A scegliere sei tu.",
    accent: "lilac" as const,
  },
  {
    n: "03",
    tag: "Senza gatekeeping",
    title: "Nessuno resta fuori",
    body: "Chiunque può segnalare un evento. La visibilità non dipende da chi segui o da quanto paghi.",
    accent: "coral" as const,
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Solution() {
  return (
    <section
      id="soluzione"
      className="relative py-28 sm:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-lilac">
              Soluzione
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
              Tutta la città,
              <br />
              <span className="highlight-lilac">in un solo posto.</span>
            </motion.h2>
            <p className="mt-6 max-w-xl text-lg text-white">
              Bloop è il radar degli eventi della tua città: raccoglie tutto, ti
              aiuta a trovare cosa fare e ti lascia scegliere. Che tu cerchi
              qualcosa di preciso o voglia scoprire una chicca, lo trovi qui.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mt-8"
            >
              <Link
                href="/soluzione"
                className="group inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-lilac transition hover:text-white"
              >
                Approfondisci la soluzione
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {features.map((f) => (
            <motion.article
              key={f.n}
              variants={card}
              className="glow-border group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <p
                className={`font-sans text-[12px] font-semibold uppercase tracking-[0.3em] ${
                  f.accent === "coral" ? "text-coral" : "text-lilac"
                }`}
              >
                {f.tag}
              </p>

              <div className="mt-16">
                <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {f.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white sm:text-lg">
                  {f.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
