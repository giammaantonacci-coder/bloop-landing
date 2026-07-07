"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    code: "STOP · 01",
    title: "Dimmi cosa ti piace",
    body: "Un onboarding rapido: musica, cibo, mood. Bloop capisce il tuo modo di vivere la città.",
    accent: "coral" as const,
  },
  {
    code: "STOP · 02",
    title: "Guarda la città pulsare",
    body: "La mappa live si aggiorna in tempo reale. Vedi dove sta succedendo qualcosa, adesso.",
    accent: "lilac" as const,
  },
  {
    code: "STOP · 03",
    title: "Esci e vivila",
    body: "Ticket, tragitto, amici. Tutto in un flusso unico. Zero pensieri.",
    accent: "coral" as const,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.7], [0, 1]);

  return (
    <section
      id="come-funziona"
      className="relative border-t border-white/10 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 md:grid-cols-12">
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

        {/* Timeline */}
        <div ref={ref} className="relative mt-20">
          {/* Rail */}
          <div
            className="absolute left-4 top-2 bottom-2 w-px bg-white/15 sm:left-6"
            aria-hidden
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-4 top-2 bottom-2 w-px bg-coral sm:left-6"
          />

          <ol className="space-y-16 sm:space-y-20">
            {steps.map((s, i) => (
              <motion.li
                key={s.code}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                className="relative grid grid-cols-1 gap-6 pl-14 sm:grid-cols-12 sm:gap-8 sm:pl-20"
              >
                {/* Station marker — square, sharp */}
                <span
                  className="absolute left-4 top-3 -translate-x-1/2 sm:left-6"
                  aria-hidden
                >
                  <span
                    className={`block h-4 w-4 border-2 ${
                      s.accent === "coral"
                        ? "border-coral bg-deep"
                        : "border-lilac bg-deep"
                    }`}
                  />
                </span>

                <div className="sm:col-span-3">
                  <p
                    className={`font-sans font-medium text-[11px] uppercase tracking-[0.3em] ${
                      s.accent === "coral" ? "text-coral" : "text-lilac"
                    }`}
                  >
                    {s.code}
                  </p>
                </div>

                <div className="sm:col-span-9">
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-4xl md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
