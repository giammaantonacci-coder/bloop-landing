import Link from "next/link";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Section } from "./ui/Section";
import { ArrowLink } from "./ui/ArrowLink";

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
    <main id="main-content" className="relative z-10">
      {/* Masthead on ink */}
      <Section tone="dark">
        <div className="shell pb-16 pt-32 sm:pt-40">
          <ArrowLink href="/" accent="fg" direction="back">
            Torna alla home
          </ArrowLink>

          <div className="grid12 mt-16 gap-y-8">
            <div className="md:col-span-3">
              <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
                <span className="eyebrow text-accent-ink">00</span>
                <span className="eyebrow text-muted">{eyebrow}</span>
              </div>
            </div>
            <div className="md:col-span-9">
              <h1 className="display-lg">{title}</h1>
              <p className="eyebrow mt-8 text-muted">
                Ultimo aggiornamento: {updated}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Body on paper — long-form reading gets the light ground */}
      <Section tone="light" ruled>
        <div className="shell py-20 sm:py-28">
          <div className="grid12">
            <div className="md:col-span-8 md:col-start-4">
              <div className="space-y-10 text-[1.0625rem] leading-[1.65] text-fg [&_a]:text-accent-ink [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.03em] [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                {children}
              </div>

              <div className="rule-t mt-20 pt-6">
                <Link href="/" className="eyebrow text-muted transition hover:text-fg">
                  ← Torna alla home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
