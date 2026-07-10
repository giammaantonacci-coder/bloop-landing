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
  glow: string;
  flip: boolean;
  float: { x: number[]; y: number[] };
};

const CORAL: BubbleConfig = {
  pos: "left-[2%] top-[6%]",
  size: "h-[20rem] w-[20rem] sm:h-[27rem] sm:w-[27rem]",
  fx: 0.48,
  fy: 0.2,
  mouse: 42,
  delay: 0.1,
  glow: "rgba(247,107,58,0.6)",
  flip: false,
  float: { x: [0, 26, -18, 14, 0], y: [0, -22, 18, -10, 0] },
};

const LILAC: BubbleConfig = {
  pos: "left-[66%] top-[50%]",
  size: "h-[18rem] w-[18rem] sm:h-[25rem] sm:w-[25rem]",
  fx: 0.08,
  fy: -0.16,
  mouse: -36,
  delay: 0.26,
  glow: "rgba(162,105,255,0.55)",
  flip: true,
  float: { x: [0, -22, 16, -20, 0], y: [0, 20, -16, 22, 0] },
};

type Motion = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  sharpOpacity: MotionValue<number>;
  sharpScale: MotionValue<number>;
  blobOpacity: MotionValue<number>;
  rotX: MotionValue<number>;
  rotY: MotionValue<number>;
};

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
  const sharpOpacity = useTransform(t, [0, 0.55], [1, 0]);
  const sharpScale = useTransform(t, [0, 1], [1, 1.2]);
  const blobOpacity = useTransform(t, [0.15, 0.7], [0.28, 0]);
  const rotX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  return { x, y, sharpOpacity, sharpScale, blobOpacity, rotX, rotY };
}

const SHARDS = Array.from({ length: 8 });

function Burst({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.span
        className="absolute rounded-full border-2"
        style={{ borderColor: color }}
        initial={{ width: "38%", height: "38%", opacity: 0.85 }}
        animate={{ width: "125%", height: "125%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {SHARDS.map((_, i) => {
        const ang = (i / SHARDS.length) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full"
            style={{ background: color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(ang) * 170,
              y: Math.sin(ang) * 170,
              opacity: 0,
              scale: 0.2,
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
    <motion.div
      style={{ x: m.x, y: m.y, willChange: "transform" }}
      className={`absolute ${cfg.pos} ${cfg.size}`}
    >
      <AnimatePresence>
        {alive ? (
          <motion.div
            key={`sphere-${cycle}`}
            className="relative h-full w-full"
            initial={reduce ? false : { y: -520, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 58, damping: 12, delay: cfg.delay }}
          >
            <motion.div
              className={`relative h-full w-full ${cfg.flip ? "-scale-x-100" : ""}`}
              animate={
                reduce
                  ? undefined
                  : isMobile
                  ? { x: cfg.float.x.map((v) => v * 0.5), y: cfg.float.y.map((v) => v * 0.5) }
                  : { x: cfg.float.x, y: cfg.float.y }
              }
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Ambient brand-tinted bloom behind the chrome ball */}
              <motion.div
                aria-hidden
                style={{
                  opacity: m.blobOpacity,
                  background: `radial-gradient(circle, ${cfg.glow} 0%, rgba(0,0,0,0) 70%)`,
                }}
                className="absolute -inset-[16%] rounded-full blur-2xl sm:mix-blend-screen"
              />
              {/* Real 3D chrome ball render — tilt only where a cursor exists */}
              <motion.img
                src="/balloons/ball1.webp"
                alt=""
                draggable={false}
                aria-hidden
                style={{
                  opacity: m.sharpOpacity,
                  scale: m.sharpScale,
                  rotateX: reduce || isMobile ? 0 : m.rotX,
                  rotateY: reduce || isMobile ? 0 : m.rotY,
                  transformPerspective: isMobile ? undefined : 900,
                  filter: isMobile
                    ? "drop-shadow(0 16px 30px rgba(0,0,0,0.5))"
                    : "drop-shadow(0 34px 60px rgba(150,180,205,0.4))",
                }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
        ) : (
          <Burst key={`burst-${cycle}`} color={cfg.glow} />
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

  // Bubbles are only poppable while in the hero state so their hit targets
  // never block clicks on content further down the page.
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
    // Respawn after the burst has cleared.
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
      {/* Visuals — behind content */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <BubbleVisual cfg={CORAL} m={coral} alive={bubbles.coral.alive} cycle={bubbles.coral.cycle} reduce={reduce} isMobile={isMobile} />
        <BubbleVisual cfg={LILAC} m={lilac} alive={bubbles.lilac.alive} cycle={bubbles.lilac.cycle} reduce={reduce} isMobile={isMobile} />
      </div>

      {/* Hit targets — above content, but only active near the top */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <BubbleHit cfg={CORAL} m={coral} active={nearTop && bubbles.coral.alive} onPop={() => pop("coral")} />
        <BubbleHit cfg={LILAC} m={lilac} active={nearTop && bubbles.lilac.alive} onPop={() => pop("lilac")} />
      </div>
    </>
  );
}
