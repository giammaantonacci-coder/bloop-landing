"use client";

import { motion } from "framer-motion";
import { Section, SectionHead } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

const features = [
  {
    n: "01",
    tag: "Un solo posto",
    title: "Tutto in un posto",
    body: "Bloop raccoglie ogni evento della città — anche le chicche che vivono nei social e nelle chat. Basta saltare da un'app all'altra.",
  },
  {
    n: "02",
    tag: "La scegli tu",
    title: "Comandi tu, non un feed",
    body: "Dici che serata cerchi e Bloop ti porta nel posto giusto, vicino a te, al momento giusto.",
  },
  {
    n: "03",
    tag: "Senza gatekeeping",
    title: "Nessuno resta fuori",
    body: "Chiunque può segnalare un evento. La visibilità non dipende da chi segui o da quanto paghi.",
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Solution() {
  return (
    <Section id="soluzione" tone="dark" ruled>
      <div className="shell py-24 sm:py-32">
        <SectionHead
          index="03"
          label="Soluzione"
          accent="2"
          title={
            <>
              <span className="block">Tutta la città,</span>
              <span className="mark-line">
                <span className="mark-2">in un solo posto.</span>
              </span>
            </>
          }
          intro="Bloop è il radar degli eventi della tua città: raccoglie tutto, ti aiuta a trovare cosa fare e ti lascia scegliere. Che tu cerchi qualcosa di preciso o voglia scoprire una chicca, lo trovi qui."
          action={
            <ArrowLink href="/soluzione" accent="2">
              Approfondisci la soluzione
            </ArrowLink>
          }
        />

        {/* Three cells divided by hairlines — no boxes, no fills. */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="rule-t grid grid-cols-1 md:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.article
              key={f.n}
              variants={card}
              className={`rule-b-soft flex flex-col py-10 md:py-14 md:pr-8 ${
                i > 0 ? "md:rule-l-soft md:pl-8" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-accent-2-ink">{f.n}</span>
                <span className="eyebrow-sm text-muted">{f.tag}</span>
              </div>

              <h3 className="display-sm mt-16">{f.title}</h3>
              <p className="copy mt-6 max-w-sm text-fg">{f.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
