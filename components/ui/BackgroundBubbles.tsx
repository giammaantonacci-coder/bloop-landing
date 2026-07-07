"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

/**
 * Two prominent bubbles that ALWAYS stay on screen. They combine three
 * layers of motion:
 *   - autonomous "floating" (inner motion.div, animates on its own)
 *   - mouse parallax (outer motion.div, follows cursor with spring lag)
 *   - scroll parallax (clamped to ±100px so they never leave the viewport)
 * Rendered via `mix-blend-screen` so they can be vibrant without ever
 * darkening text, and with `pointer-events-none` so clicks pass through.
 */
export function BackgroundBubbles() {
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 45, damping: 22, mass: 0.7 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduce]);

  // Coral: mouse lean + clamped scroll drift (up, max 100px)
  const coralMouseX = useTransform(smoothX, [-0.5, 0.5], [-160, 160]);
  const coralMouseY = useTransform(smoothY, [-0.5, 0.5], [-110, 110]);
  const coralScrollY = useTransform(scrollY, [0, 4000], [0, -100]); // clamp default
  const coralY = useTransform<number, number>(
    [coralMouseY, coralScrollY] as MotionValue<number>[],
    ([m, s]) => m + s
  );

  // Lilac: opposite mouse lean + clamped scroll drift (down, max 100px)
  const lilacMouseX = useTransform(smoothX, [-0.5, 0.5], [140, -140]);
  const lilacMouseY = useTransform(smoothY, [-0.5, 0.5], [90, -90]);
  const lilacScrollY = useTransform(scrollY, [0, 4000], [0, 100]);
  const lilacY = useTransform<number, number>(
    [lilacMouseY, lilacScrollY] as MotionValue<number>[],
    ([m, s]) => m + s
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden mix-blend-screen"
      aria-hidden
    >
      {/* Coral — outer handles mouse + scroll, inner handles autonomous drift */}
      <motion.div
        style={{ x: coralMouseX, y: coralY }}
        className="absolute left-[6%] top-[12%]"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 30, -20, 15, 0],
                  y: [0, -25, 20, -10, 0],
                  scale: [1, 1.08, 0.98, 1.05, 1],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="h-[26rem] w-[26rem] rounded-full bg-coral/70 blur-3xl"
        />
      </motion.div>

      {/* Lilac — different rhythm so they never sync up */}
      <motion.div
        style={{ x: lilacMouseX, y: lilacY }}
        className="absolute right-[8%] top-[55%]"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  x: [0, -25, 15, -20, 0],
                  y: [0, 20, -18, 25, 0],
                  scale: [1, 1.1, 0.95, 1.06, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="h-[24rem] w-[24rem] rounded-full bg-lilac/65 blur-3xl"
        />
      </motion.div>
    </div>
  );
}
