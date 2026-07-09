"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useBubbles } from "./BubblesProvider";

const NAV_LINKS = [
  { label: "Problema", href: "/problema" },
  { label: "Soluzione", href: "/soluzione" },
  { label: "Flusso", href: "/flusso" },
  { label: "Visione", href: "/visione" },
  { label: "Bloopers", href: "/#bloopers" },
];

function NavItem({
  href,
  label,
  onClick,
  className,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  // Internal routes go through <Link>; in-page hash anchors use a plain
  // <a> for reliable native scrolling.
  if (href.includes("#")) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { enabled, toggle } = useBubbles();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu (and release the scroll lock) if we grow to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-deep/90 backdrop-blur-sm sm:bg-deep/85 sm:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          aria-label="Bloop — home"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
        >
          <Logo size="sm" animated />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 font-sans font-semibold text-[13px] uppercase tracking-[0.2em] text-smoke lg:flex">
          {NAV_LINKS.map((l) => (
            <NavItem
              key={l.href}
              href={l.href}
              label={l.label}
              className="transition hover:text-white"
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
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
            className="hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-lilac lg:inline-flex"
          >
            Scopri Bloop
            <span aria-hidden>→</span>
          </a>

          {/* Burger — mobile / tablet only */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white ring-1 ring-white/15 transition hover:ring-white/30 lg:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile menu panel — sibling of the header so `fixed` maps to the
        viewport (a backdrop-filtered header would otherwise trap it). */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-deep/98 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="flex flex-col"
            >
              {NAV_LINKS.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <NavItem
                    href={l.href}
                    label={l.label}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-[-0.01em] text-white transition hover:text-coral"
                  />
                </motion.div>
              ))}
            </motion.nav>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={enabled}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-smoke ring-1 ring-white/15 transition hover:text-white hover:ring-white/30"
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
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-lilac"
              >
                Scopri Bloop
                <span aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
