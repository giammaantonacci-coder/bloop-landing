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
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6 py-4 sm:px-8">
        <Link href="/" aria-label="Bloop — home" className="flex shrink-0 items-center">
          <Logo size="sm" animated />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 font-sans font-semibold text-[13px] uppercase tracking-[0.2em] text-smoke lg:flex">
          <Link href="/problema" className="transition hover:text-white">
            Problema
          </Link>
          <Link href="/soluzione" className="transition hover:text-white">
            Soluzione
          </Link>
          <a href="/#come-funziona" className="transition hover:text-white">
            Flusso
          </a>
          <a href="/#visione" className="transition hover:text-white">
            Visione
          </a>
          <a href="/#bloopers" className="transition hover:text-white">
            Bloopers
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:ml-0 ml-auto">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-smoke ring-1 ring-white/15 transition hover:text-white hover:ring-white/30 lg:inline-flex"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-coral transition-opacity"
              style={{ opacity: enabled ? 1 : 0.35 }}
            />
            {enabled ? "Disattiva bolle" : "Attiva bolle"}
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
