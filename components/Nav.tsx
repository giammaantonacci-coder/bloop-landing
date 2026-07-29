"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { useBubbles } from "./BubblesProvider";

const NAV_LINKS = [
  { n: "02", label: "Problema", href: "/problema" },
  { n: "03", label: "Soluzione", href: "/soluzione" },
  { n: "04", label: "Flusso", href: "/flusso" },
  { n: "05", label: "Visione", href: "/visione" },
  { n: "06", label: "Bloopers", href: "/bloopers" },
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

  // The bar rides over bands of every tone, so once it leaves the dark hero
  // it goes solid ink rather than translucent — legibility over paper.
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`tone-dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? "!bg-deep border-b border-white/15" : "!bg-transparent"
        }`}
      >
        <div className="shell flex items-center gap-6 py-4">
          <Link
            href="/"
            aria-label="Bloop — home"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center text-white"
          >
            <Logo size="sm" animated />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavItem
                key={l.href}
                href={l.href}
                label={l.label}
                className="eyebrow text-smoke transition hover:text-white"
              />
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              className="eyebrow-sm hidden items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-smoke transition hover:border-white/50 hover:text-white lg:inline-flex"
            >
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-coral transition-opacity"
                style={{ opacity: enabled ? 1 : 0.3 }}
              />
              {enabled ? "Bolle on" : "Bolle off"}
            </button>

            <a
              href="https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow-sm hidden items-center gap-2 rounded-full bg-coral px-6 py-3 text-deep transition hover:bg-white lg:inline-flex"
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
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
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
            className="tone-dark fixed inset-0 z-40 flex flex-col !bg-deep px-5 pb-10 pt-24 sm:px-8 lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
              className="flex flex-col"
            >
              {NAV_LINKS.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="rule-t-soft"
                >
                  <div className="flex items-baseline gap-5 py-4">
                    <span className="eyebrow-sm text-coral">{l.n}</span>
                    <NavItem
                      href={l.href}
                      label={l.label}
                      onClick={() => setOpen(false)}
                      className="display-sm text-white transition hover:text-coral"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.nav>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={enabled}
                className="eyebrow-sm inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-4 text-smoke transition hover:border-white/50 hover:text-white"
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-coral transition-opacity"
                  style={{ opacity: enabled ? 1 : 0.3 }}
                />
                {enabled ? "Bolle on" : "Bolle off"}
              </button>

              <a
                href="https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ=="
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="eyebrow-sm inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-4 text-deep transition hover:bg-white"
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
