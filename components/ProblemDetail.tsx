"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { MissedEvents } from "./ui/MissedEvents";
import { Section, SectionHead, PageHead, CtaBand } from "./ui/Section";

type Stat = {
  n: string;
  value: number;
  suffix?: string;
  custom?: string;
  label: string;
  source: string;
};

const stats: Stat[] = [
  {
    n: "01",
    value: 86,
    suffix: "%",
    label: "della giornata la passiamo chiusi in casa",
    source: "Indoor time index",
  },
  {
    n: "02",
    value: 69,
    suffix: "%",
    label: "delle persone scopre eventi solo tramite passaparola",
    source: "Word-of-mouth survey",
  },
  {
    n: "03",
    value: 0,
    custom: "1/3",
    label: "eventi locali non raggiunge il proprio pubblico",
    source: "Local reach study",
  },
];

const causes = [
  {
    n: "01",
    tag: "Frammentazione",
    title: "L'informazione è sparsa",
    body: "Instagram, gruppi, volantini, mille siti diversi. Nessuno ha il quadro completo di cosa succede stasera.",
  },
  {
    n: "02",
    tag: "Passaparola",
    title: "Scopri solo se conosci",
    body: "Le cose belle girano tra chi è già nel giro. Chi è nuovo in città, o vuole cambiare abitudini, resta tagliato fuori.",
  },
  {
    n: "03",
    tag: "Reach",
    title: "Gli organizzatori non arrivano",
    body: "Chi crea esperienze fatica a farsi trovare: budget marketing quasi zero e visibilità organica sempre più bassa.",
  },
  {
    n: "04",
    tag: "Effetto",
    title: "La città si spegne",
    body: "Il risultato: locali mezzi vuoti, serate perse e la sensazione, sbagliata, che «non ci sia mai niente da fare».",
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ProblemDetail() {
  return (
    <>
      <PageHead
        index="02"
        label="Il problema"
        title={
          <>
            Ci stiamo perdendo
            <br />
            <span className="text-muted">la città.</span>
          </>
        }
        intro="Ogni giorno, intorno a te, succede molto più di quello che vedi. Il problema non è che manchino gli eventi — è che vivono sparsi ovunque e le chicche si perdono."
      />

      {/* Numbers */}
      <Section tone="light" ruled>
        <div className="shell py-20 sm:py-28">
          <div className="rule-b mb-14 flex items-baseline justify-between pb-4">
            <span className="eyebrow text-muted">I numeri</span>
            <span className="eyebrow text-muted">03 rilevazioni</span>
          </div>

          <motion.ul
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t grid grid-cols-1 md:grid-cols-3"
          >
            {stats.map((s, i) => (
              <motion.li
                key={s.n}
                variants={item}
                className={`rule-b-soft flex flex-col justify-between py-10 md:py-14 md:pr-8 ${
                  i > 0 ? "md:rule-l-soft md:pl-8" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-ink">{s.n}</span>
                  <span className="eyebrow-sm text-muted">{s.source}</span>
                </div>
                <p className="mt-14 font-display text-[clamp(4rem,9vw,7.5rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-accent-ink">
                  {s.custom ? (
                    s.custom
                  ) : (
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  )}
                </p>
                <p className="copy mt-8 max-w-xs text-fg">{s.label}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Section>

      {/* Causes */}
      <Section tone="dark" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="02.1"
            label="Le cause"
            accent="2"
            title={
              <>
                Quattro crepe
                <br />
                <span className="text-muted">nello stesso muro.</span>
              </>
            }
          />

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t grid grid-cols-1 sm:grid-cols-2"
          >
            {causes.map((c, i) => (
              <motion.article
                key={c.n}
                variants={item}
                className={`rule-b-soft flex flex-col py-10 sm:py-14 sm:pr-10 ${
                  i % 2 === 1 ? "sm:rule-l-soft sm:pl-10" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-2-ink">{c.n}</span>
                  <span className="eyebrow-sm text-muted">{c.tag}</span>
                </div>
                <h3 className="display-sm mt-14">{c.title}</h3>
                <p className="copy mt-5 max-w-md text-fg">{c.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Synthesis */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <div className="grid12 gap-y-6">
            <p className="eyebrow text-muted md:col-span-3">Sintesi</p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="statement md:col-span-9"
            >
              Gli eventi sono tutti intorno a te.{" "}
              <span className="mark">Ma fuori dal tuo radar.</span>
            </motion.p>
          </div>

          <div className="mt-20">
            <MissedEvents />
          </div>
        </div>
      </Section>

      <CtaBand
        title={
          <>
            Il problema ha una forma precisa.
            <br />
            E anche la soluzione.
          </>
        }
        primary={{ href: "/soluzione", label: "Scopri come Bloop lo risolve" }}
        secondary={{ href: "/", label: "Torna alla home" }}
      />
    </>
  );
}
