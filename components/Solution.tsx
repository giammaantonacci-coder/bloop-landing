"use client";

import { motion } from "framer-motion";

const features = [
  {
    n: "F/01",
    tag: "Discovery",
    title: "Scopri cosa pulsa",
    body: "La mappa ti mostra dove la città è viva in questo momento, zona per zona.",
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
      className="relative border-t border-white/10 py-28 sm:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.25em] text-lilac">
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
            <p className="mt-6 max-w-xl text-lg text-smoke">
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
          className="grid grid-cols-1 border-b border-white/10 md:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.article
              key={f.n}
              variants={card}
              className={`group relative flex flex-col justify-between p-8 md:p-10 ${
                i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
              }`}
            >
              {/* Left accent stripe */}
              <div
                aria-hidden
                className={`absolute left-0 top-8 h-14 w-1 transition-all duration-500 group-hover:h-24 md:top-10 ${
                  f.accent === "coral" ? "bg-coral" : "bg-lilac"
                }`}
              />

              <div className="flex items-center justify-between font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-smoke">
                <span className={f.accent === "coral" ? "text-coral" : "text-lilac"}>
                  {f.n}
                </span>
                <span>{f.tag}</span>
              </div>

              <div className="mt-16">
                <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                  {f.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-smoke sm:text-lg">
                  {f.body}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3 font-sans font-medium text-[10px] uppercase tracking-[0.25em] text-smoke transition group-hover:text-white">
                <span aria-hidden className="inline-block h-px w-6 bg-current" />
                Scopri di più
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
