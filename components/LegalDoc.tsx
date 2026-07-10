import Link from "next/link";
import { ReactNode } from "react";
import { Footer } from "./Footer";

export function LegalDoc({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10">
      <section className="mx-auto max-w-3xl px-6 pt-36 pb-24 sm:px-8 sm:pt-44">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-smoke transition hover:text-white"
        >
          <span aria-hidden>←</span> Torna alla home
        </Link>

        <p className="mt-12 font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-coral">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-smoke">
          Ultimo aggiornamento: {updated}
        </p>

        <div
          className="mt-14 space-y-10 text-base leading-relaxed text-white/90 [&_a]:text-coral [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
        >
          {children}
        </div>
      </section>
      <Footer />
    </main>
  );
}
