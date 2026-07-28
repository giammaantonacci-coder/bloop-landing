"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useBubbles } from "../BubblesProvider";

type BubbleConfig = {
  pos: string;
  size: string;
  fx: number;
  fy: number;
  mouse: number;
  delay: number;
  color: string;
  float: { x: number[]; y: number[] };
};

// Flat colour discs. No gradient, no gloss, no blur, no blend mode — the
// bubbles stay as brand marks but read as printed shapes, not 3D objects.
const CORAL: BubbleConfig = {
  pos: "left-[2%] top-[8%]",
  size: "h-[19rem] w-[19rem] sm:h-[26rem] sm:w-[26rem]",
  fx: 0.48,
  fy: 0.2,
  mouse: 34,
  delay: 0.1,
  color: "#F76B3A",
  float: { x: [0, 22, -16, 12, 0], y: [0, -18, 16, -8, 0] },
};

const LILAC: BubbleConfig = {
  pos: "left-[66%] top-[52%]",
  size: "h-[16rem] w-[16rem] sm:h-[23rem] sm:w-[23rem]",
  fx: 0.08,
  fy: -0.16,
  mouse: -28,
  delay: 0.26,
  color: "#A269FF",
  float: { x: [0, -18, 14, -16, 0], y: [0, 16, -14, 18, 0] },
};

type Motion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
};

function useBubbleMotion(
  cfg: BubbleConfig,
  t: MotionValue<number>,
  smoothX: MotionValue<number>,
  smoothY: MotionValue<number>,
  vp: React.MutableRefObject<{ w: number; h: number }>
): Motion {
  const driftX = useTransform(t, (v) => (1 - v) * cfg.fx * vp.current.w);
  const driftY = useTransform(t, (v) => (1 - v) * cfg.fy * vp.current.h);
  const mX = useTransform(smoothX, [-0.5, 0.5], [-cfg.mouse, cfg.mouse]);
  const mY = useTransform(smoothY, [-0.5, 0.5], [-cfg.mouse * 0.7, cfg.mouse * 0.7]);
  const x = useTransform([driftX, mX], ([a, b]: number[]) => a + b);
  const y = useTransform([driftY, mY], ([a, b]: number[]) => a + b);
  // They fade out as the hero scrolls away rather than melting into a blob.
  const opacity = useTransform(t, [0, 0.75], [1, 0.14]);
  const scale = useTransform(t, [0, 1], [1, 1.12]);
  return { x, y, opacity, scale };
}

const SHARDS = Array.from({ length: 8 });

function Burst({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.span
        className="absolute rounded-full border"
        style={{ borderColor: color }}
        initial={{ width: "38%", height: "38%", opacity: 0.9 }}
        animate={{ width: "125%", height: "125%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {SHARDS.map((_, i) => {
        const ang = (i / SHARDS.length) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-2.5 w-2.5"
            style={{ background: color }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(ang) * 170,
              y: Math.sin(ang) * 170,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

function BubbleVisual({
  cfg,
  m,
  alive,
  cycle,
  reduce,
  isMobile,
}: {
  cfg: BubbleConfig;
  m: Motion;
  alive: boolean;
  cycle: number;
  reduce: boolean | null;
  isMobile: boolean;
}) {
  return (
    // On narrow screens the discs land behind the hero paragraph, where a
    // full-strength fill drops white body copy to ~3.5:1. Held back to 45%
    // there, the copy clears 9:1 and the disc still reads as a disc.
    <motion.div
      style={{ x: m.x, y: m.y, willChange: "transform" }}
      className={`absolute opacity-[0.45] md:opacity-100 ${cfg.pos} ${cfg.size}`}
    >
      <AnimatePresence>
        {alive ? (
          <motion.div
            key={`disc-${cycle}`}
            className="relative h-full w-full"
            initial={reduce ? false : { y: -520, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 58, damping: 14, delay: cfg.delay }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={
                reduce
                  ? undefined
                  : isMobile
                  ? {
                      x: cfg.float.x.map((v) => v * 0.5),
                      y: cfg.float.y.map((v) => v * 0.5),
                    }
                  : { x: cfg.float.x, y: cfg.float.y }
              }
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                aria-hidden
                style={{
                  opacity: m.opacity,
                  scale: m.scale,
                  backgroundColor: cfg.color,
                }}
                className="h-full w-full rounded-full"
              />
            </motion.div>
          </motion.div>
        ) : (
          <Burst key={`burst-${cycle}`} color={cfg.color} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BubbleHit({
  cfg,
  m,
  active,
  onPop,
}: {
  cfg: BubbleConfig;
  m: Motion;
  active: boolean;
  onPop: () => void;
}) {
  return (
    <motion.div style={{ x: m.x, y: m.y }} className={`absolute ${cfg.pos} ${cfg.size}`}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        aria-label="Fai scoppiare la bolla"
        onClick={onPop}
        style={{ pointerEvents: active ? "auto" : "none" }}
        className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
      />
    </motion.div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function BackgroundBubbles() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { enabled } = useBubbles();
  const vp = useRef({ w: 1440, h: 900 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 45, damping: 22, mass: 0.7 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const { scrollY } = useScroll();
  const t = useTransform(scrollY, [0, 640], [0, 1]);

  const coral = useBubbleMotion(CORAL, t, smoothX, smoothY, vp);
  const lilac = useBubbleMotion(LILAC, t, smoothX, smoothY, vp);

  // Bubbles are only poppable near the top so their hit targets never block
  // clicks on content further down the page.
  const [nearTop, setNearTop] = useState(true);
  const [bubbles, setBubbles] = useState({
    coral: { alive: true, cycle: 0 },
    lilac: { alive: true, cycle: 0 },
  });

  const pop = (which: "coral" | "lilac") => {
    setBubbles((s) => {
      if (!s[which].alive) return s;
      return { ...s, [which]: { ...s[which], alive: false } };
    });
    window.setTimeout(() => {
      setBubbles((s) => ({
        ...s,
        [which]: { alive: true, cycle: s[which].cycle + 1 },
      }));
    }, 2600);
  };

  useEffect(() => {
    if (!enabled) return;
    const setVp = () => {
      vp.current = { w: window.innerWidth, h: window.innerHeight };
    };
    const onScroll = () => setNearTop(window.scrollY < 260);
    setVp();
    onScroll();
    window.addEventListener("resize", setVp);
    window.addEventListener("scroll", onScroll, { passive: true });

    const cleanup = () => {
      window.removeEventListener("resize", setVp);
      window.removeEventListener("scroll", onScroll);
    };
    if (reduce) return cleanup;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, reduce, enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Visuals — behind content, and masked out by the opaque paper and
          coral bands further down the page. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <BubbleVisual
          cfg={CORAL}
          m={coral}
          alive={bubbles.coral.alive}
          cycle={bubbles.coral.cycle}
          reduce={reduce}
          isMobile={isMobile}
        />
        <BubbleVisual
          cfg={LILAC}
          m={lilac}
          alive={bubbles.lilac.alive}
          cycle={bubbles.lilac.cycle}
          reduce={reduce}
          isMobile={isMobile}
        />
      </div>

      {/* Hit targets — above content, but only active near the top */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <BubbleHit
          cfg={CORAL}
          m={coral}
          active={nearTop && bubbles.coral.alive}
          onPop={() => pop("coral")}
        />
        <BubbleHit
          cfg={LILAC}
          m={lilac}
          active={nearTop && bubbles.lilac.alive}
          onPop={() => pop("lilac")}
        />
      </div>
    </>
  );
}
