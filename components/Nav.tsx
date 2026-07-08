"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-deep/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <a href="#hero" aria-label="Bloop — home" className="flex items-center">
          <Logo size="sm" animated />
        </a>

        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.2em] text-smoke md:flex">
          <a href="#problema" className="pointer-events-auto transition hover:text-white">
            Problema
          </a>
          <a href="#soluzione" className="pointer-events-auto transition hover:text-white">
            Soluzione
          </a>
          <a href="#come-funziona" className="pointer-events-auto transition hover:text-white">
            Flusso
          </a>
          <a href="#visione" className="pointer-events-auto transition hover:text-white">
            Visione
          </a>
          <a href="#bloopers" className="pointer-events-auto transition hover:text-white">
            Bloopers
          </a>
        </nav>

        <a
          href="mailto:bloopappevents@gmail.com?subject=Diventa%20Blooper"
          className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-lilac"
        >
          Scopri Bloop
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
