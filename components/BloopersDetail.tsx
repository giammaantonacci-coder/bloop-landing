"use client";

import { motion } from "framer-motion";
import { Marquee } from "./ui/Marquee";
import { BlooperLevels } from "./ui/BlooperLevels";
import { Section, SectionHead, PageHead, CtaBand } from "./ui/Section";
import { photos } from "./photos";

const perks = [
  "Vieni ricondiviso",
  "Anteprima al lancio",
  "Le chicche prima",
  "Contest con i partner",
  "Il tuo nome in giro",
  "Conti nella community",
];

const steps = [
  {
    n: "01",
    tag: "Segnala",
    title: "Sai di una cosa bella?",
    body: "Un link, un flyer, uno screen. Taggami #Bloop dalle tue serate o scrivimi in DM. Bastano pochi secondi.",
  },
  {
    n: "02",
    tag: "Pubblico",
    title: "Bloop la verifica e la pubblica",
    body: "Il team controlla che sia tutto giusto e la fa scoprire a tutti. Niente gatekeeping.",
  },
  {
    n: "03",
    tag: "Riconoscimento",
    title: "Vieni ricondiviso, col tuo nome",
    body: "Chi l'ha fatta scoprire viene citato. Più segnali, prima entri.",
  },
];

const rewards = [
  {
    n: "01",
    tag: "Riconoscimento",
    title: "Vieni ricondiviso col tuo nome",
    body: "Chi l'ha fatta scoprire viene citato. Il tuo nome gira insieme all'evento — «me l'hai fatta scoprire tu».",
  },
  {
    n: "02",
    tag: "Anteprima",
    title: "Provi la città prima di tutti",
    body: "I primi in lista entrano prima. Quando Bloop apre, lo sai tu per primo/a.",
  },
  {
    n: "03",
    tag: "Contest",
    title: "Bloop ti porta agli eventi",
    body: "Ogni tanto Bloop regala ingressi e drink offerti dai partner. Segnali, partecipi, magari vinci.",
  },
  {
    n: "04",
    tag: "Community",
    title: "Conti davvero",
    body: "Più segnali, più la mappa è viva. La città la costruiamo insieme.",
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

export function BloopersDetail() {
  return (
    <>
      <PageHead
        index="06"
        label="Community"
        title={
          <>
            <span className="block">Diventa un</span>
            <span className="mark-line">
              <span className="mark">Blooper.</span>
            </span>
          </>
        }
        intro="La città la fanno le persone che la vivono. Segnala gli eventi che mancano — quelli che vivono nei social e nelle chat — e Bloop li fa scoprire a tutti. Vieni ricondiviso, col tuo nome."
        photo={photos.bloopersDetail}
        photoCaption="Chi la fa scoprire, viene citato"
        photoScribble="burst"
        photoScribblePlace="right-[12%] top-[12%] w-[13%]"
      />

      {/* Perks ticker — a rule-bound band, set in display weight */}
      <Section tone="dark">
        <div className="rule-t rule-b py-6">
          <Marquee
            items={perks.map((p) => (
              <span
                key={p}
                className="font-display text-2xl font-extrabold uppercase tracking-[-0.03em] text-fg sm:text-4xl"
              >
                {p}
              </span>
            ))}
          />
        </div>
      </Section>

      {/* How it works */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="06.1"
            label="Come funziona"
            title={
              <>
                Tre passi.
                <br />
                <span className="text-muted">Zero sbatti.</span>
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

      {/* Levels */}
      <Section tone="dark" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="06.2"
            label="I livelli"
            accent="2"
            title={
              <>
                Più segnali,
                <br />
                <span className="text-muted">più sali.</span>
              </>
            }
          />

          <BlooperLevels />
        </div>
      </Section>

      {/* Rewards */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="06.3"
            label="I premi"
            title={
              <>
                Cosa sblocchi
                <br />
                <span className="text-muted">salendo.</span>
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
            {rewards.map((r, i) => (
              <motion.article
                key={r.n}
                variants={item}
                className={`rule-b-soft flex flex-col py-10 sm:py-14 sm:pr-10 ${
                  i % 2 === 1 ? "sm:rule-l-soft sm:pl-10" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-accent-ink">{r.n}</span>
                  <span className="eyebrow-sm text-muted">{r.tag}</span>
                </div>
                <h3 className="display-sm mt-12">{r.title}</h3>
                <p className="copy mt-5 max-w-md text-fg">{r.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      <CtaBand
        title="Pronto a far pulsare la città?"
        body="Manda la tua prima segnalazione in DM su Instagram o via email. Rispondiamo a tutti."
        primary={{
          href: "mailto:bloopappevents@gmail.com?subject=Diventa%20Blooper",
          label: "Diventa Blooper",
        }}
        secondary={{
          href: "https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ==",
          label: "Seguici su Instagram",
          external: true,
        }}
      />
    </>
  );
}
