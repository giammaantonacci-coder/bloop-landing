"use client";

import { motion } from "framer-motion";

const features = [
  {
    n: "F/01",
    tag: "Discovery",
    title: "Scopri cosa pulsa",
    body: "Aggreghiamo eventi e posti da più fonti, in un unico posto. Niente più ricerche infinite.",
    accent: "coral" as const,
  },
  {
    n: "F/02",
    tag: "Personal",
    title: "Eventi su misura",
    body: "L'AI impara i tuoi gusti e ti suggerisce solo quello che ti interessa davvero.",
    accent: "lilac" as const,
  },
  {
    n: "F/03",
    tag: "Flow",
    title: "Dall'idea all'ingresso",
    body: "Ticket, indicazioni, trasporto: tutto dentro l'app, zero friction.",
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
              Bloop è il <span className="highlight-lilac">battito</span>
              <br />
              della tua città
            </motion.h2>
            <p className="mt-6 max-w-xl text-lg text-white">
              Un&apos;unica app per trasformare la voglia di uscire in
              un&apos;esperienza reale — dalla scoperta alla porta d&apos;ingresso.
            </p>
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
              className="group relative flex flex-col rounded-[2rem] bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.07] md:p-10"
            >
              <div className="flex items-center justify-between font-sans font-semibold text-[12px] uppercase tracking-[0.3em] text-smoke">
                <span className={f.accent === "coral" ? "text-coral" : "text-lilac"}>
                  {f.n}
                </span>
                <span>{f.tag}</span>
              </div>

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
