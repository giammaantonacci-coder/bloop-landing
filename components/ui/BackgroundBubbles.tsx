"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type BubbleConfig = {
  /** final ambient anchor (Tailwind position classes) */
  pos: string;
  size: string;
  /** hero-offset factors (× viewport w/h) applied at scroll = 0 */
  fx: number;
  fy: number;
  mouse: number;
  delay: number;
  /** glossy 3D sphere gradient + shadows */
  sphere: React.CSSProperties;
  /** soft ambient blob background */
  blob: string;
  glow: string;
  float: { x: number[]; y: number[] };
};

const CORAL: BubbleConfig = {
  pos: "left-[2%] top-[6%]",
  size: "h-[20rem] w-[20rem] sm:h-[27rem] sm:w-[27rem]",
  fx: 0.15,
  fy: 0.2,
  mouse: 42,
  delay: 0.1,
  sphere: {
    background:
      "radial-gradient(circle at 34% 30%, #ffb890 0%, #f9814d 36%, #F76B3A 58%, #a83c17 100%)",
    boxShadow:
      "inset -12px -16px 44px rgba(0,0,0,0.42), inset 14px 16px 40px rgba(255,255,255,0.3), 0 44px 90px -22px rgba(247,107,58,0.55)",
  },
  blob:
    "radial-gradient(circle, rgba(247,107,58,0.9) 0%, rgba(247,107,58,0) 70%)",
  glow: "#F76B3A",
  float: { x: [0, 26, -18, 14, 0], y: [0, -22, 18, -10, 0] },
};

const LILAC: BubbleConfig = {
  pos: "left-[66%] top-[50%]",
  size: "h-[18rem] w-[18rem] sm:h-[25rem] sm:w-[25rem]",
  fx: -0.3,
  fy: -0.16,
  mouse: -36,
  delay: 0.26,
  sphere: {
    background:
      "radial-gradient(circle at 34% 30%, #dcc2ff 0%, #b085ff 38%, #A269FF 60%, #5b2ea8 100%)",
    boxShadow:
      "inset -12px -16px 44px rgba(0,0,0,0.42), inset 14px 16px 40px rgba(255,255,255,0.3), 0 44px 90px -22px rgba(162,105,255,0.55)",
  },
  blob:
    "radial-gradient(circle, rgba(162,105,255,0.85) 0%, rgba(162,105,255,0) 70%)",
  glow: "#A269FF",
  float: { x: [0, -22, 16, -20, 0], y: [0, 20, -16, 22, 0] },
};

function Bubble({
  cfg,
  t,
  smoothX,
  smoothY,
  vp,
  reduce,
}: {
  cfg: BubbleConfig;
  t: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  vp: React.MutableRefObject<{ w: number; h: number }>;
  reduce: boolean | null;
}) {
  // Position: drifts from the hero spot (t=0) to its ambient anchor (t=1),
  // plus a gentle mouse parallax.
  const driftX = useTransform(t, (v) => (1 - v) * cfg.fx * vp.current.w);
  const driftY = useTransform(t, (v) => (1 - v) * cfg.fy * vp.current.h);
  const mX = useTransform(smoothX, [-0.5, 0.5], [-cfg.mouse, cfg.mouse]);
  const mY = useTransform(smoothY, [-0.5, 0.5], [-cfg.mouse * 0.7, cfg.mouse * 0.7]);
  const x = useTransform([driftX, mX], ([a, b]: number[]) => a + b);
  const y = useTransform([driftY, mY], ([a, b]: number[]) => a + b);

  // Crossfade sharp sphere → blurred ambient blob as you scroll.
  const sharpOpacity = useTransform(t, [0, 0.5], [1, 0]);
  const sharpScale = useTransform(t, [0, 1], [1, 1.25]);
  const blobOpacity = useTransform(t, [0.15, 0.7], [0, 0.6]);

  // Subtle 3D tilt toward the cursor while the sphere is still sharp.
  const rotX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  return (
    <motion.div style={{ x, y }} className={`absolute ${cfg.pos} ${cfg.size}`}>
      {/* Landing drop on page load */}
      <motion.div
        className="relative h-full w-full"
        initial={reduce ? false : { y: -520, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 58, damping: 12, delay: cfg.delay }}
      >
        {/* Autonomous float */}
        <motion.div
          className="relative h-full w-full"
          animate={reduce ? undefined : { x: cfg.float.x, y: cfg.float.y }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ambient blurred blob (revealed on scroll) */}
          <motion.div
            aria-hidden
            style={{ opacity: blobOpacity, background: cfg.blob }}
            className="absolute -inset-[18%] rounded-full blur-2xl"
          />

          {/* Glossy 3D sphere (visible at the top) */}
          <motion.div
            aria-hidden
            style={{
              opacity: sharpOpacity,
              scale: sharpScale,
              rotateX: reduce ? 0 : rotX,
              rotateY: reduce ? 0 : rotY,
              transformPerspective: 900,
              ...cfg.sphere,
            }}
            className="relative h-full w-full rounded-full"
          >
            {/* Specular highlight */}
            <span className="absolute left-[20%] top-[16%] h-[26%] w-[26%] rounded-full bg-white/70 blur-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function BackgroundBubbles() {
  const reduce = useReducedMotion();
  const vp = useRef({ w: 1440, h: 900 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 45, damping: 22, mass: 0.7 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const { scrollY } = useScroll();
  // 0 = hero spheres, 1 = ambient background bubbles.
  const t = useTransform(scrollY, [0, 640], [0, 1]);

  useEffect(() => {
    const setVp = () => {
      vp.current = { w: window.innerWidth, h: window.innerHeight };
    };
    setVp();
    window.addEventListener("resize", setVp);

    if (reduce) return () => window.removeEventListener("resize", setVp);
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("resize", setVp);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <Bubble cfg={CORAL} t={t} smoothX={smoothX} smoothY={smoothY} vp={vp} reduce={reduce} />
      <Bubble cfg={LILAC} t={t} smoothX={smoothX} smoothY={smoothY} vp={vp} reduce={reduce} />
    </div>
  );
}
