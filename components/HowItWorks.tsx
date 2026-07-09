"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StepData = {
  n: string;
  title: string;
  body: string;
  accent: "coral" | "lilac";
};

const steps: StepData[] = [
  {
    n: "01",
    title: "Dimmi cosa ti piace",
    body: "Un onboarding rapido: musica, cibo, mood. Bloop capisce il tuo modo di vivere la città.",
    accent: "coral",
  },
  {
    n: "02",
    title: "Guarda la città pulsare",
    body: "La mappa live si aggiorna in tempo reale. Vedi dove sta succedendo qualcosa, adesso.",
    accent: "lilac",
  },
  {
    n: "03",
    title: "Esci e vivila",
    body: "Ticket, tragitto, amici. Tutto in un flusso unico. Zero pensieri.",
    accent: "coral",
  },
];

function Step({
  step,
  index,
  threshold,
  progress,
  dotRef,
  sectionInView,
}: {
  step: StepData;
  index: number;
  threshold: number;
  progress: MotionValue<number>;
  dotRef: (el: HTMLSpanElement | null) => void;
  sectionInView: boolean;
}) {
  const reduce = useReducedMotion();
  const accent = step.accent === "coral" ? "#F76B3A" : "#A269FF";

  // Fill the dot over a short window just before the bar reaches it.
  const fill = useTransform(progress, (p) => {
    const start = Math.max(0, threshold - 0.14);
    const end = threshold <= 0.001 ? 0.03 : threshold;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  });

  const dotScale = useTransform(fill, [0, 0.7, 1], [0.8, 1.08, 1]);
  const emptyOpacity = useTransform(fill, [0, 1], [1, 0]);
  const glow = useTransform(
    fill,
    [0, 1],
    ["0 0 0px rgba(0,0,0,0)", `0 0 34px ${accent}80`]
  );

  // The card lights up as its dot is reached.
  const cardBg = useTransform(
    fill,
    [0, 1],
    ["rgba(255,255,255,0.035)", "rgba(255,255,255,0.08)"]
  );
  const cardShadow = useTransform(
    fill,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", `0 24px 70px -28px ${accent}66`]
  );
  const cardScale = useTransform(fill, [0, 1], [0.99, 1]);

  return (
    <li className="relative grid grid-cols-[3.5rem_1fr] items-center gap-5 sm:grid-cols-[4rem_1fr] sm:gap-8">
      {/* Dot on the rail */}
      <div className="relative z-10 flex justify-center">
        <motion.span
          ref={dotRef}
          style={{ scale: dotScale, boxShadow: glow }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-deep sm:h-16 sm:w-16"
        >
          {/* Pulsing halo — only visible once active */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ opacity: fill }}
            aria-hidden
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: accent }}
              animate={
                reduce || !sectionInView
                  ? undefined
                  : { scale: [1, 1.75], opacity: [0.45, 0] }
              }
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            />
          </motion.span>

          {/* Empty ring */}
          <span
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: accent, opacity: 0.35 }}
            aria-hidden
          />
          {/* Fill */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: accent, opacity: fill }}
            aria-hidden
          />
          {/* Number crossfade */}
          <motion.span
            style={{ opacity: emptyOpacity }}
            className="absolute font-display text-lg font-bold"
          >
            <span style={{ color: accent }}>{step.n}</span>
          </motion.span>
          <motion.span
            style={{ opacity: fill }}
            className="absolute font-display text-lg font-bold text-deep"
          >
            {step.n}
          </motion.span>
        </motion.span>
      </div>

      {/* Card — enters on scroll, brightens when its dot is reached */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
        style={{ backgroundColor: cardBg, boxShadow: cardShadow, scale: cardScale }}
        className="group rounded-[2rem] p-7 sm:p-9"
      >
        <div className="flex items-center gap-3">
          <span
            className="font-sans font-semibold text-[12px] uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            Fermata {step.n}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.01em] sm:text-3xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white sm:text-lg">
          {step.body}
        </p>
      </motion.div>
    </li>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotEls = useRef<(HTMLSpanElement | null)[]>([]);

  const [rail, setRail] = useState({ top: 0, height: 0 });
  const [thresholds, setThresholds] = useState<number[]>(
    steps.map((_, i) => (steps.length > 1 ? i / (steps.length - 1) : 0))
  );

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      if (!c) return;
      const cTop = c.getBoundingClientRect().top;
      const centers = dotEls.current.map((d) => {
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

  // Only run the infinite dot-halo loops while the path is actually
  // on screen, so they don't burn CPU/GPU the rest of the scroll.
  const sectionInView = useInView(containerRef, { margin: "-10% 0px" });

  // Glowing "comet" that rides the tip of the completion bar. Driven by a
  // `y` transform (not `top`) so it composites on the GPU — animating a
  // layout property here caused a repaint smear on iOS during scroll.
  // (7px = half the 14px dot, to keep it centred on the bar tip.)
  const cometY = useTransform(
    scrollYProgress,
    [0, 1],
    [rail.top - 7, rail.top + rail.height - 7]
  );
  const cometOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.97, 1],
    [0, 1, 1, 0]
  );

  return (
    <section id="come-funziona" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-sans font-semibold text-[13px] uppercase tracking-[0.25em] text-coral"
            >
              Flusso
            </motion.p>
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

        {/* Vertical path */}
        <div ref={containerRef} className="relative mt-6">
          {/* Rail track */}
          <div
            className="absolute left-[1.75rem] -ml-[1.5px] w-[3px] rounded-full bg-white/10 sm:left-8"
            style={{ top: rail.top, height: rail.height }}
            aria-hidden
          />
          {/* Completion bar */}
          <motion.div
            style={{
              top: rail.top,
              height: rail.height,
              scaleY: scrollYProgress,
              transformOrigin: "top",
              willChange: "transform",
            }}
            className="absolute left-[1.75rem] -ml-[1.5px] w-[3px] rounded-full bg-gradient-to-b from-coral via-coral to-lilac sm:left-8"
            aria-hidden
          />
          {/* Comet at the tip — box-shadow glow (no filter blur) + y transform */}
          <motion.div
            style={{
              y: cometY,
              opacity: cometOpacity,
              willChange: "transform",
              boxShadow: "0 0 14px 3px rgba(255,255,255,0.7)",
            }}
            className="absolute left-[1.75rem] top-0 z-10 -ml-[7px] h-3.5 w-3.5 rounded-full bg-white sm:left-8"
            aria-hidden
          />

          <ol className="relative space-y-5 sm:space-y-8">
            {steps.map((s, i) => (
              <Step
                key={s.n}
                step={s}
                index={i}
                progress={scrollYProgress}
                threshold={thresholds[i] ?? 0}
                dotRef={(el) => {
                  dotEls.current[i] = el;
                }}
                sectionInView={sectionInView}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
