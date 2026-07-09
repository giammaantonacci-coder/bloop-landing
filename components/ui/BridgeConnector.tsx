"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Quadratic bezier control points for the bridge deck (viewBox units).
const P0 = { x: 60, y: 128 };
const P1 = { x: 350, y: 18 };
const P2 = { x: 640, y: 128 };
const PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

function bezier(t: number, a: number, b: number, c: number) {
  const mt = 1 - t;
  return mt * mt * a + 2 * mt * t * b + t * t * c;
}

/**
 * A bridge that draws itself as you scroll, connecting an "Evento" node
 * (already lit — the events exist) to an "Utente" node that lights up
 * only once the deck is fully drawn, with a glowing dot riding the arc.
 */
export function BridgeConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  const dotX = useTransform(scrollYProgress, (t) => bezier(t, P0.x, P1.x, P2.x));
  const dotY = useTransform(scrollYProgress, (t) => bezier(t, P0.y, P1.y, P2.y));
  const dotOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  const rightScale = useTransform(scrollYProgress, [0.85, 1], [0.55, 1]);
  const rightOpacity = useTransform(scrollYProgress, [0.8, 1], [0.4, 1]);
  const rightGlow = useTransform(
    scrollYProgress,
    [0.85, 1],
    [
      "drop-shadow(0 0 0px rgba(162,105,255,0))",
      "drop-shadow(0 0 12px rgba(162,105,255,0.85))",
    ]
  );

  return (
    <div ref={ref} className="mx-auto max-w-2xl">
      <svg viewBox="0 0 700 150" className="aspect-[700/150] w-full" aria-hidden>
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F76B3A" />
            <stop offset="100%" stopColor="#A269FF" />
          </linearGradient>
        </defs>

        {/* Faint track, always visible */}
        <path
          d={PATH}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Deck that draws in with scroll */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#bridgeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />

        {/* Evento — already there from the start */}
        <circle cx={P0.x} cy={P0.y} r="15" fill="#F76B3A" />

        {/* Utente — lights up once the bridge reaches it */}
        <motion.circle
          cx={P2.x}
          cy={P2.y}
          r="15"
          fill="#A269FF"
          style={{ scale: rightScale, opacity: rightOpacity, filter: rightGlow }}
        />

        {/* Traveling dot */}
        <motion.circle
          cx={dotX}
          cy={dotY}
          r="8"
          fill="#ffffff"
          style={{ opacity: dotOpacity }}
        />
      </svg>

      <div className="mt-3 flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.3em]">
        <span className="text-coral">Evento</span>
        <span className="text-lilac">Utente</span>
      </div>
    </div>
  );
}
