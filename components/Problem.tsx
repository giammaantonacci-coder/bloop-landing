"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { BridgeConnector } from "./ui/BridgeConnector";
import { Section, SectionHead } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";
import { EditorialImage } from "./ui/EditorialImage";
import { photos } from "./photos";

type Stat = {
  value: number;
  suffix?: string;
  custom?: string;
  label: string;
  source: string;
  index: string;
};

const stats: Stat[] = [
  {
    value: 86,
    suffix: "%",
    label: "delle cose belle in città non le trovi cercando dove guardi di solito",
    source: "Fuori dal tuo radar",
    index: "01",
  },
  {
    value: 69,
    suffix: "%",
    label: "scopre gli eventi solo per passaparola o per caso sui social",
    source: "Passaparola & social",
    index: "02",
  },
  {
    value: 0,
    custom: "1/3",
    label: "degli eventi non arriva a chi vorrebbe esserci",
    source: "Persi per strada",
    index: "03",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Problem() {
  return (
    <Section id="problema" tone="light">
      <div className="shell py-24 sm:py-32">
        <SectionHead
          index="02"
          label="Problema"
          title={
            <>
              Quanto ti perdi
              <br />
              <span className="text-muted">della tua città?</span>
            </>
          }
          action={<ArrowLink href="/problema">Approfondisci il problema</ArrowLink>}
        />

        {/* Stat table — three cells on one hairline field. The numerals are
            set as large as the headline so the data reads as typography. */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="rule-t grid grid-cols-1 md:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.li
              key={s.index}
              variants={item}
              className={`rule-b-soft flex flex-col justify-between py-10 md:py-14 md:pr-8 ${
                i > 0 ? "md:rule-l-soft md:pl-8" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-accent-ink">{s.index}</span>
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

        {/* Plate: a wide strip that breaks the run of type without
            interrupting the column field. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-24"
        >
          <EditorialImage
            src={photos.problema.src}
            alt={photos.problema.alt}
            ratio="wide"
            index="02"
            caption="La città che non vedi"
            scribble="arrow"
            scribblePlace="right-[8%] top-[18%] w-[26%]"
            sizes="100vw"
          />
        </motion.div>

        {/* Synthesis */}
        <div className="grid12 mt-24 gap-y-6">
          <p className="eyebrow text-muted md:col-span-3">Sintesi</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="statement md:col-span-9"
          >
            Le cose belle ci sono.{" "}
            <span className="mark">Basta sapere dove cercarle.</span>
          </motion.p>
        </div>

        <div className="mt-20">
          <BridgeConnector />
        </div>
      </div>
    </Section>
  );
}
