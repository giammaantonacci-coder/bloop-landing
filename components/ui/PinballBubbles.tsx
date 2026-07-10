"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useBubbles } from "../BubblesProvider";

type Spec = { size: number; flip?: boolean };

// Small chrome balls that drift, bounce off the walls and each other,
// and shoot away when you tap them — pinball as page entertainment.
const SPECS: Spec[] = [
  { size: 88 },
  { size: 64, flip: true },
  { size: 54 },
  { size: 78, flip: true },
  { size: 48 },
];

type Ball = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number; // cruising speed it eases back to
};

export function PinballBubbles() {
  const reduce = useReducedMotion();
  const { enabled } = useBubbles();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;
    const els = Array.from(
      container.querySelectorAll<HTMLElement>("[data-ball]")
    );

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const balls: Ball[] = els.map((el) => {
      const r = el.offsetWidth / 2;
      const base = 70 + Math.random() * 70;
      const ang = Math.random() * Math.PI * 2;
      return {
        el,
        r,
        base,
        x: r + Math.random() * (W() - 2 * r),
        y: r + Math.random() * (H() - 2 * r),
        vx: Math.cos(ang) * base,
        vy: Math.sin(ang) * base,
      };
    });

    const place = (b: Ball) => {
      b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
    };
    balls.forEach((b) => {
      place(b);
      b.el.style.opacity = "1";
    });

    // Reduced motion: drop them in place and stop.
    if (reduce) return;

    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      const w = W();
      const h = H();

      for (const b of balls) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Walls
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx);
        } else if (b.x + b.r > w) {
          b.x = w - b.r;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy = Math.abs(b.vy);
        } else if (b.y + b.r > h) {
          b.y = h - b.r;
          b.vy = -Math.abs(b.vy);
        }

        // Ease speed back toward cruising so taps give a temporary burst.
        const sp = Math.hypot(b.vx, b.vy) || 1;
        const ns = sp + (b.base - sp) * 0.015;
        b.vx = (b.vx / sp) * ns;
        b.vy = (b.vy / sp) * ns;
      }

      // Ball-to-ball elastic collisions (equal mass).
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i];
          const c = balls[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const min = a.r + c.r;
          if (dist < min) {
            const nx = dx / dist;
            const ny = dy / dist;
            const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
            if (rel < 0) {
              a.vx += rel * nx;
              a.vy += rel * ny;
              c.vx -= rel * nx;
              c.vy -= rel * ny;
            }
            const overlap = (min - dist) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            c.x += nx * overlap;
            c.y += ny * overlap;
          }
        }
      }

      for (const b of balls) place(b);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Tap a ball → it shoots away in a random direction with a glow flash.
    const cleanups = balls.map((b) => {
      const onHit = (e: Event) => {
        e.stopPropagation();
        const speed = 320 + Math.random() * 160;
        const ang = Math.random() * Math.PI * 2;
        b.vx = Math.cos(ang) * speed;
        b.vy = Math.sin(ang) * speed;
        b.el.style.filter = "brightness(1.5)";
        window.setTimeout(() => {
          b.el.style.filter = "";
        }, 160);
      };
      b.el.addEventListener("pointerdown", onHit);
      return () => b.el.removeEventListener("pointerdown", onHit);
    });

    const onResize = () => {
      const w = W();
      const h = H();
      for (const b of balls) {
        b.x = Math.min(Math.max(b.r, b.x), w - b.r);
        b.y = Math.min(Math.max(b.r, b.y), h - b.r);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      window.removeEventListener("resize", onResize);
    };
  }, [reduce, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {SPECS.map((s, i) => (
        <button
          key={i}
          data-ball
          type="button"
          tabIndex={-1}
          aria-label="Bolla"
          className="pointer-events-auto absolute left-0 top-0 cursor-pointer opacity-0 transition-[filter] duration-150 will-change-transform"
          style={{ width: s.size, height: s.size }}
        >
          <img
            src="/balloons/ball1.webp"
            alt=""
            draggable={false}
            className="pointer-events-none h-full w-full object-contain"
            style={{
              transform: s.flip ? "scaleX(-1)" : undefined,
              filter: "drop-shadow(0 8px 18px rgba(150,180,205,0.4))",
            }}
          />
        </button>
      ))}
    </div>
  );
}
