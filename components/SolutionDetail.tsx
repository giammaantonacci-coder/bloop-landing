"use client";

import { motion } from "framer-motion";
import { BridgeConnector } from "./ui/BridgeConnector";
import { Section, SectionHead, PageHead, CtaBand } from "./ui/Section";

const features = [
  {
    n: "01",
    tag: "Discovery",
    title: "Scopri cosa pulsa",
    body: "Aggreghiamo eventi e posti da più fonti in un unico posto. Niente più dieci app aperte e mille gruppi da controllare.",
  },
  {
    n: "02",
    tag: "Personal",
    title: "Su misura per te",
    body: "Dici che serata cerchi — gente, qualcosa di tranquillo, o «stupiscimi» — e Bloop ti mostra solo quello che fa per te.",
  },
  {
    n: "03",
    tag: "Flow",
    title: "Dall'idea all'ingresso",
    body: "Dall'impulso di uscire al posto giusto, senza saltare da un'app all'altra. Bloop ti accompagna fino a lì.",
  },
];

const details = [
  {
    n: "01",
    tag: "Aggregazione",
    title: "Una sola mappa",
    body: "Tutti gli eventi e i posti della città, raccolti in un solo posto e sempre aggiornati.",
  },
  {
    n: "02",
    tag: "Personalizzazione",
    title: "Ti conosce",
    body: "Più usi Bloop, più diventa preciso. I suggerimenti si adattano a te, non il contrario.",
  },
  {
    n: "03",
    tag: "Azione",
    title: "Dal vedere al fare",
    body: "Trovi qualcosa? In pochi tap hai biglietto, percorso e amici avvisati.",
  },
  {
    n: "04",
    tag: "Community",
    title: "Cresce con te",
    body: "Ogni Blooper che segnala rende la mappa più viva. La città la costruiamo insieme.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const row = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function SolutionDetail() {
  return (
    <>
      <PageHead
        index="03"
        label="La soluzione"
        accent="2"
        title={
          <>
            Il ponte tra te
            <br />
            <span className="text-muted">e la tua città.</span>
          </>
        }
        intro="Bloop raccoglie tutto quello che succede in città — anche le chicche che vivono nei social e nelle chat — e ti aiuta a trovare cosa fare. Il resto lo decidi tu."
      />

      {/* Core features — full-width editorial rows, huge outlined numerals */}
      <Section tone="light" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="03.1"
            label="Come funziona"
            title={
              <>
                Tre mosse.
                <br />
                <span className="text-muted">Una serata.</span>
              </>
            }
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                variants={row}
                className="grid12 rule-b-soft items-center gap-y-6 py-12 md:py-20"
              >
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <span
                    aria-hidden
                    className="block font-display text-[clamp(5rem,13vw,11rem)] font-extrabold leading-[0.78] tracking-[-0.06em]"
                    style={{
                      WebkitTextStroke: "1.5px var(--accent)",
                      color: "transparent",
                    }}
                  >
                    {f.n}
                  </span>
                  <p className="eyebrow mt-6 text-accent-ink">{f.tag}</p>
                </div>
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <h3 className="display-sm">{f.title}</h3>
                  <p className="copy mt-6 max-w-xl text-fg">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* In practice */}
      <Section tone="dark" ruled>
        <div className="shell py-24 sm:py-32">
          <SectionHead
            index="03.2"
            label="In pratica"
            accent="2"
            title={
              <>
                Cosa ottieni,
                <br />
                <span className="text-muted">davvero.</span>
              </>
            }
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rule-t grid grid-cols-1 sm:grid-cols-2"
          >
            {details.map((d, i) => (
              <motion.div
                key={d.n}
                variants={row}
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
              </motion.div>
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
              Gli eventi ci sono. La voglia c&apos;è.{" "}
              <span className="mark-2">Bloop è il ponte.</span>
            </motion.p>
          </div>

          <div className="mt-20">
            <BridgeConnector />
          </div>
        </div>
      </Section>

      <CtaBand
        title="Pronto a vivere la città?"
        primary={{ href: "/flusso", label: "Guarda come funziona" }}
        secondary={{ href: "/", label: "Torna alla home" }}
      />
    </>
  );
}
