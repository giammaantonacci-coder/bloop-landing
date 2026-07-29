"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHead } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

type StepData = {
  n: string;
  title: string;
  body: string;
};

const steps: StepData[] = [
  {
    n: "01",
    title: "Dici che serata cerchi",
    body: "Gente e casino, qualcosa di tranquillo, o «stupiscimi». Basta scriverlo in poche parole.",
  },
  {
    n: "02",
    title: "Bloop ti porta nel posto giusto",
    body: "Ti mostra dove andare, vicino a te e al momento giusto. Anche la chicca che non sapevi di volere.",
  },
  {
    n: "03",
    title: "Scegli e vai",
    body: "Tu scegli dove andare, Bloop ti apre la strada. Zero scroll infiniti.",
  },
];

function Step({
  step,
  index,
  threshold,
  progress,
  markerRef,
}: {
  step: StepData;
  index: number;
  threshold: number;
  progress: MotionValue<number>;
  markerRef: (el: HTMLSpanElement | null) => void;
}) {
  // The marker fills over a short window just before the rail reaches it.
  const fill = useTransform(progress, (p) => {
    const start = Math.max(0, threshold - 0.14);
    const end = threshold <= 0.001 ? 0.03 : threshold;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  });

  const emptyOpacity = useTransform(fill, [0, 1], [1, 0]);

  return (
    <li className="rule-t-soft grid grid-cols-[3rem_1fr] gap-5 py-10 sm:grid-cols-[4rem_1fr] sm:gap-10 sm:py-14">
      {/* Bubble marker sitting on the rail */}
      <div className="relative z-10">
        <span
          ref={markerRef}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-bg sm:h-14 sm:w-14"
        >
          {/* Outline, then a solid coral fill wipes in over it */}
          <span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "var(--accent)" }}
            aria-hidden
          />
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "var(--accent)", opacity: fill }}
            aria-hidden
          />
          <motion.span
            style={{ opacity: emptyOpacity }}
            className="absolute font-label text-xs font-medium tracking-[0.1em] text-accent-ink"
          >
            {step.n}
          </motion.span>
          <motion.span
            style={{ opacity: fill }}
            className="absolute font-label text-xs font-medium tracking-[0.1em] text-bg"
          >
            {step.n}
          </motion.span>
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
        className="grid12 gap-y-4"
      >
        <p className="eyebrow text-muted md:col-span-3">Fermata {step.n}</p>
        <div className="md:col-span-9">
          <h3 className="display-sm">{step.title}</h3>
          <p className="copy mt-5 max-w-xl text-fg">{step.body}</p>
        </div>
      </motion.div>
    </li>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerEls = useRef<(HTMLSpanElement | null)[]>([]);

  const [rail, setRail] = useState({ top: 0, height: 0 });
  const [thresholds, setThresholds] = useState<number[]>(
    steps.map((_, i) => (steps.length > 1 ? i / (steps.length - 1) : 0))
  );

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      if (!c) return;
      const cTop = c.getBoundingClientRect().top;
      const centers = markerEls.current.map((d) => {
        if (!d) return 0;
        const r = d.getBoundingClientRect();
        return r.top - cTop + r.height / 2;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      const height = Math.max(1, last - first);
      setRail({ top: first, height });
      setThresholds(centers.map((v) => (v - first) / height));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <Section id="come-funziona" tone="light" ruled>
      <div className="shell py-24 sm:py-32">
        <SectionHead
          index="04"
          label="Flusso"
          title={
            <>
              Tre fermate.
              <br />
              <span className="text-muted">Una serata diversa.</span>
            </>
          }
          action={<ArrowLink href="/flusso">Approfondisci il flusso</ArrowLink>}
        />

        <div ref={containerRef} className="relative">
          {/* Rail track — a 1px hairline, and a solid coral bar that fills it */}
          <div
            className="absolute left-6 w-px sm:left-7"
            style={{
              top: rail.top,
              height: rail.height,
              backgroundColor: "var(--rule)",
            }}
            aria-hidden
          />
          <motion.div
            style={{
              top: rail.top,
              height: rail.height,
              scaleY: scrollYProgress,
              transformOrigin: "top",
              backgroundColor: "var(--accent)",
              willChange: "transform",
            }}
            className="absolute left-6 w-px sm:left-7"
            aria-hidden
          />

          <ol className="relative">
            {steps.map((s, i) => (
              <Step
                key={s.n}
                step={s}
                index={i}
                progress={scrollYProgress}
                threshold={thresholds[i] ?? 0}
                markerRef={(el) => {
                  markerEls.current[i] = el;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
