"use client";

import { motion } from "framer-motion";
import { FlowLine } from "./ui/FlowLine";
import { Section, SectionHead, PageHead, CtaBand } from "./ui/Section";
import { photos } from "./photos";

const steps = [
  {
    n: "01",
    tag: "Cerca",
    title: "Dici che serata cerchi",
    body: "Gente e casino, qualcosa di tranquillo, o «stupiscimi». Basta scriverlo in poche parole.",
  },
  {
    n: "02",
    tag: "Trova",
    title: "Bloop ti porta nel posto giusto",
    body: "Ti mostra dove andare, vicino a te e al momento giusto. Anche la chicca che non sapevi di volere.",
  },
  {
    n: "03",
    tag: "Vai",
    title: "Scegli e vai",
    body: "Tu scegli dove andare, Bloop ti apre la strada. Zero scroll infiniti.",
  },
];

const details = [
  {
    n: "01",
    tag: "Zero attrito",
    title: "Meno tap, più serate",
    body: "Ogni passaggio toglie frizione: niente moduli infiniti, niente dieci app aperte.",
  },
  {
    n: "02",
    tag: "Contesto",
    title: "Al momento giusto",
    body: "Bloop capisce dove sei e che ora è. I suggerimenti cambiano con la giornata.",
  },
  {
    n: "03",
    tag: "Insieme",
    title: "Con i tuoi",
    body: "Inviti gli amici, vi coordinate e partite insieme. La serata si organizza da sola.",
  },
  {
    n: "04",
    tag: "Live",
    title: "Sempre sul pezzo",
    body: "La città cambia di ora in ora. Bloop resta al passo, sempre aggiornato.",
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

export function FlowDetail() {
  return (
    <>
      <PageHead
        index="04"
        label="Il flusso"
        title={
          <>
            Dall&apos;impulso
            <br />
            <span className="text-muted">alla serata.</span>
          </>
        }
        intro="Uscire dovrebbe essere semplice. Bloop ti accompagna passo dopo passo: dici che serata cerchi, l'app ti porta nel posto giusto, tu scegli e vai. Dall'idea alla porta, senza attriti."
        photo={photos.flussoDetail}
        photoCaption="Dall'idea alla porta d'ingresso"
        photoScribble="arrow"
        photoScribblePlace="left-[10%] top-[16%] w-[26%]"
      />

      {/* Three stops */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="04.1"
            label="Tre fermate"
            title={
              <>
                Un percorso,
                <br />
                <span className="text-muted">senza pensieri.</span>
              </>
            }
          />

          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t grid grid-cols-1 md:grid-cols-3"
          >
            {steps.map((s, i) => (
              <motion.article
                key={s.n}
                variants={item}
                className={`rule-b-soft flex flex-col py-10 md:py-14 md:pr-8 ${
                  i > 0 ? "md:rule-l-soft md:pl-8" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-ink">{s.n}</span>
                  <span className="eyebrow-sm text-muted">{s.tag}</span>
                </div>
                <h3 className="display-sm mt-16">{s.title}</h3>
                <p className="copy mt-5 max-w-sm text-fg">{s.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* In detail */}
      <Section tone="dark" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="04.2"
            label="Nel dettaglio"
            accent="2"
            title={
              <>
                Curato in ogni
                <br />
                <span className="text-muted">passaggio.</span>
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
            {details.map((d, i) => (
              <motion.article
                key={d.n}
                variants={item}
                className={`rule-b-soft flex flex-col py-10 sm:py-14 sm:pr-10 ${
                  i % 2 === 1 ? "sm:rule-l-soft sm:pl-10" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-2-ink">{d.n}</span>
                  <span className="eyebrow-sm text-muted">{d.tag}</span>
                </div>
                <h3 className="display-sm mt-12">{d.title}</h3>
                <p className="copy mt-5 max-w-md text-fg">{d.body}</p>
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
              Dall&apos;idea di uscire alla porta d&apos;ingresso.{" "}
              <span className="mark">Un flusso solo.</span>
            </motion.p>
          </div>

          <div className="mt-20">
            <FlowLine />
          </div>
        </div>
      </Section>

      <CtaBand
        title="La tecnologia che ti avvicina."
        primary={{ href: "/visione", label: "Guarda la visione" }}
        secondary={{ href: "/", label: "Torna alla home" }}
      />
    </>
  );
}
