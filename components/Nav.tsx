"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useBubbles } from "./BubblesProvider";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { enabled, toggle } = useBubbles();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-deep/90 backdrop-blur-sm sm:bg-deep/85 sm:backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" aria-label="Bloop — home" className="flex items-center">
          <Logo size="sm" animated />
        </Link>

        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-sans font-semibold text-[13px] uppercase tracking-[0.2em] text-smoke md:flex">
          <Link href="/problema" className="pointer-events-auto transition hover:text-white">
            Problema
          </Link>
          <a href="/#soluzione" className="pointer-events-auto transition hover:text-white">
            Soluzione
          </a>
          <a href="/#come-funziona" className="pointer-events-auto transition hover:text-white">
            Flusso
          </a>
          <a href="/#visione" className="pointer-events-auto transition hover:text-white">
            Visione
          </a>
          <a href="/#bloopers" className="pointer-events-auto transition hover:text-white">
            Bloopers
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? "Disattiva le bolle" : "Attiva le bolle"}
            title={enabled ? "Disattiva le bolle" : "Attiva le bolle"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-smoke ring-1 ring-white/15 transition hover:text-white hover:ring-white/30"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <circle
                cx="9.5"
                cy="12"
                r="4"
                fill="#F76B3A"
                fillOpacity={enabled ? 1 : 0.35}
              />
              <circle
                cx="15"
                cy="12"
                r="4"
                fill="#A269FF"
                fillOpacity={enabled ? 1 : 0.35}
              />
              {!enabled && (
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <a
            href="https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-lilac"
          >
            Scopri Bloop
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
