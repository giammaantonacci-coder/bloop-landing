"use client";

import { motion } from "framer-motion";
import { Section, SectionHead } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

const steps = [
  {
    n: "01",
    tag: "Segnala",
    title: "Sai di una cosa bella?",
    body: "Un link, un flyer, uno screen. Taggami #Bloop dalle tue serate o scrivimi in DM. Bastano pochi secondi.",
    reward: "Segnalazione",
  },
  {
    n: "02",
    tag: "Pubblico",
    title: "Bloop la verifica e la pubblica",
    body: "Il team controlla che sia tutto giusto e la fa scoprire a tutti. Niente gatekeeping: entra chiunque abbia qualcosa di buono.",
    reward: "Fiducia",
  },
  {
    n: "03",
    tag: "Riconoscimento",
    title: "Vieni ricondiviso, col tuo nome",
    body: "Chi l'ha fatta scoprire viene citato. Più segnali, prima entri: i primi provano la città in anteprima.",
    reward: "Anteprima",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Bloopers() {
  return (
    <Section id="bloopers" tone="dark">
      <div className="shell py-24 sm:py-32">
        <SectionHead
          index="06"
          label="Community"
          title={
            <>
              <span className="block">Aiutaci a mappare la città.</span>
              <span className="mark-line">
                Diventa un <span className="mark">Blooper</span>.
              </span>
            </>
          }
          intro="La città la fanno le persone che la vivono. Segnala gli eventi che mancano — quelli che vivono nei social e nelle chat — e Bloop li fa scoprire a tutti."
          action={<ArrowLink href="/bloopers">Scopri come funziona</ArrowLink>}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="rule-t grid grid-cols-1 md:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              variants={card}
              className={`rule-b-soft flex flex-col justify-between py-10 md:py-14 md:pr-8 ${
                i > 0 ? "md:rule-l-soft md:pl-8" : ""
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-ink">{s.n}</span>
                  <span className="eyebrow-sm text-muted">{s.tag}</span>
                </div>
                <h3 className="display-sm mt-16">{s.title}</h3>
                <p className="copy mt-5 max-w-sm text-fg">{s.body}</p>
              </div>

              <p className="eyebrow-sm mt-10 inline-flex w-fit border border-rule px-3 py-2 text-accent-2-ink">
                + {s.reward}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA row */}
        <div className="grid12 mt-20 gap-y-10 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-muted">Come partecipare</p>
            <p className="statement mt-6 max-w-2xl">
              Manda la tua prima segnalazione in DM su Instagram o via email.
              Rispondiamo a tutti.
            </p>
          </div>

          <div className="md:col-span-4 md:flex md:justify-end">
            <a
              href="mailto:bloopappevents@gmail.com?subject=Diventa%20Blooper"
              className="btn group"
            >
              Diventa Blooper
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
