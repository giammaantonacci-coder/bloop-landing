"use client";

import { motion } from "framer-motion";
import { Section, SectionHead, PageHead } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

const beliefs = [
  {
    n: "01",
    tag: "La città",
    title: "Non è solo dove vivi",
    body: "È un'esperienza da vivere insieme, ogni giorno. Non uno sfondo, ma il posto in cui succedono le cose.",
  },
  {
    n: "02",
    tag: "Il modo",
    title: "Più umano",
    body: "Vivere la città con più leggerezza e meno rumore. Meno tempo a cercare, più tempo a esserci.",
  },
  {
    n: "03",
    tag: "Il mezzo",
    title: "Tecnologia che avvicina",
    body: "Non uno schermo in più tra te e il mondo, ma un ponte verso di esso. Che poi sparisce, quando esci.",
  },
];

const principles = [
  {
    n: "01",
    title: "La tecnologia sparisce",
    body: "Il telefono è un mezzo, non il fine. Bloop esiste per farti alzare lo sguardo, non per tenertelo incollato.",
  },
  {
    n: "02",
    title: "Fatti, non feed",
    body: "Non conta il tuo tempo sullo schermo. Contano le tue serate fuori, con le persone.",
  },
  {
    n: "03",
    title: "La città è collettiva",
    body: "Una città viva la fanno le persone che la vivono. Più siamo, più pulsa.",
  },
  {
    n: "04",
    title: "Per tutti",
    body: "Che tu sia di qui da sempre o arrivato ieri: la città è tua. Bloop te la mette a portata.",
  },
];

const manifesto = [
  { text: "Crediamo che la città non sia", highlight: false },
  { text: "solo il posto in cui viviamo.", highlight: false },
  { text: "È un'esperienza", highlight: false },
  { text: "da vivere insieme.", highlight: true },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const line = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

const block = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function VisionDetail() {
  return (
    <>
      <PageHead
        index="05"
        label="La visione"
        accent="2"
        title={
          <>
            La città è
            <br />
            <span className="text-muted">da vivere.</span>
          </>
        }
        intro="Bloop non nasce per farti stare più tempo sul telefono. Nasce per farti vivere la città in modo più umano — dove la tecnologia non distrae, ma avvicina."
      />

      {/* Manifesto — full coral campitura */}
      <Section tone="accent" ruled>
        <div className="shell py-28 sm:py-40">
          <div className="rule-b flex items-baseline justify-between pb-4">
            <span className="eyebrow">Manifesto</span>
            <span className="eyebrow">Bloop — 2026</span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="mt-16 sm:mt-24"
          >
            {manifesto.map((l, i) => (
              <motion.p key={i} variants={line} className="display-lg">
                {l.highlight ? (
                  <span className="mark-line">
                    <span className="mark">{l.text}</span>
                  </span>
                ) : (
                  l.text
                )}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Beliefs — stacked editorial rows */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead index="05.1" label="Cosa crediamo" title="Tre convinzioni." />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t"
          >
            {beliefs.map((b) => (
              <motion.div
                key={b.n}
                variants={block}
                className="grid12 rule-b-soft gap-y-5 py-12 md:py-20"
              >
                <div className="md:col-span-3">
                  <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
                    <span className="eyebrow text-accent-ink">{b.n}</span>
                    <span className="eyebrow text-muted">{b.tag}</span>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="display-md">{b.title}</h3>
                  <p className="lede mt-8 max-w-2xl text-fg">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="dark" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="05.2"
            label="I principi"
            accent="2"
            title={
              <>
                Le regole
                <br />
                <span className="text-muted">che non cambiano.</span>
              </>
            }
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t grid grid-cols-1 sm:grid-cols-2"
          >
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                variants={block}
                className={`rule-b-soft py-10 sm:py-14 sm:pr-10 ${
                  i % 2 === 1 ? "sm:rule-l-soft sm:pl-10" : ""
                }`}
              >
                <span className="eyebrow text-accent-2-ink">{p.n}</span>
                <h3 className="display-sm mt-10">{p.title}</h3>
                <p className="copy mt-5 max-w-md text-fg">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Signature + close */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <div className="grid12 gap-y-6">
            <p className="eyebrow text-muted md:col-span-3">Sintesi</p>
            <div className="md:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="statement"
              >
                La città non ha bisogno di un&apos;altra app.{" "}
                <span className="mark-2">Ha bisogno di te, fuori.</span>
              </motion.p>

              <div className="rule-t mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-6">
                <span className="eyebrow text-fg">— Il team Bloop</span>
                <span className="eyebrow text-muted">2026</span>
                <a
                  href="mailto:bloopappevents@gmail.com"
                  className="eyebrow text-muted underline underline-offset-4 transition hover:text-fg"
                >
                  bloopappevents@gmail.com
                </a>
              </div>

              <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <a href="/bloopers" className="btn group">
                  Unisciti ai Bloopers
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <ArrowLink href="/" accent="fg" direction="back">
                  Torna alla home
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
