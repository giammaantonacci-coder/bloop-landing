import { ReactNode } from "react";
import { ArrowLink } from "./ArrowLink";
import { EditorialImage } from "./EditorialImage";
import { ScribbleName } from "./Scribble";
import { PhotoSlot } from "../photos";

export type Tone = "dark" | "light" | "accent";

type SectionProps = {
  tone?: Tone;
  id?: string;
  /** Draw a hairline across the full band width at the top. */
  ruled?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * A full-bleed horizontal band. Bands alternate ink / paper / coral down the
 * page — the alternation *is* the layout rhythm — and each one publishes its
 * palette as CSS custom properties (see `.tone-*` in globals.css) so anything
 * nested inside picks up the right foreground, rules and accents.
 *
 * Dark bands stay transparent on purpose: the fixed bubble layer shows
 * through them and is masked out by the opaque paper and coral bands.
 */
export function Section({
  tone = "dark",
  id,
  ruled = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`tone-${tone} relative ${ruled ? "rule-t" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

type SectionHeadProps = {
  /** Two-digit index printed in the left column, Swiss-style. */
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  accent?: "1" | "2";
};

/**
 * The recurring section header: a mono index + label locked to the first
 * three columns, the display title spanning the remaining nine.
 */
export function SectionHead({
  index,
  label,
  title,
  intro,
  action,
  accent = "1",
}: SectionHeadProps) {
  const accentClass = accent === "1" ? "text-accent-ink" : "text-accent-2-ink";

  return (
    <div className="grid12 gap-y-8 pb-14 sm:pb-20">
      <div className="md:col-span-3">
        <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
          <span className={`eyebrow ${accentClass}`}>{index}</span>
          <span className="eyebrow text-muted">{label}</span>
        </div>
      </div>

      <div className="md:col-span-9">
        <h2 className="display-md">{title}</h2>
        {intro && <p className="lede mt-8 max-w-2xl text-fg">{intro}</p>}
        {action && <div className="mt-10">{action}</div>}
      </div>
    </div>
  );
}

type PageHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  intro: ReactNode;
  accent?: "1" | "2";
  /** Opening plate, printed full width under the masthead. */
  photo?: PhotoSlot;
  photoCaption?: string;
  photoScribble?: ScribbleName;
  photoScribblePlace?: string;
};

/**
 * The masthead every detail page opens with: a back link, the section index
 * and label in the left columns, and the page title set at display-lg.
 * Always on ink, so the transparent top nav stays legible.
 */
export function PageHead({
  index,
  label,
  title,
  intro,
  accent = "1",
  photo,
  photoCaption,
  photoScribble = "circle",
  photoScribblePlace,
}: PageHeadProps) {
  const accentClass = accent === "1" ? "text-accent-ink" : "text-accent-2-ink";

  return (
    <Section tone="dark">
      <div className="shell pb-20 pt-32 sm:pb-28 sm:pt-40">
        <ArrowLink href="/" accent="fg" direction="back">
          Torna alla home
        </ArrowLink>

        <div className="grid12 mt-16 gap-y-8">
          <div className="md:col-span-3">
            <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
              <span className={`eyebrow ${accentClass}`}>{index}</span>
              <span className="eyebrow text-muted">{label}</span>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="display-lg">{title}</h1>
            <p className="lede mt-12 max-w-2xl text-fg">{intro}</p>
          </div>
        </div>

        {photo && (
          <div className="mt-20">
            <EditorialImage
              src={photo.src}
              alt={photo.alt}
              ratio="wide"
              tone={accent === "1" ? "coral" : "lilac"}
              index={index}
              caption={photoCaption}
              scribble={photoScribble}
              scribblePlace={photoScribblePlace}
              priority
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </Section>
  );
}

type CtaBandProps = {
  title: ReactNode;
  body?: ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string; external?: boolean };
};

/**
 * Closing band on the detail pages: a solid coral campitura with ink type
 * and a pill button. The loudest note comes last.
 */
export function CtaBand({ title, body, primary, secondary }: CtaBandProps) {
  return (
    <Section tone="accent" ruled>
      <div className="shell py-24 sm:py-32">
        <div className="grid12 gap-y-10">
          <p className="eyebrow md:col-span-3">Prossimo passo</p>
          <div className="md:col-span-9">
            <h2 className="display-md max-w-3xl">{title}</h2>
            {body && <p className="lede mt-8 max-w-xl">{body}</p>}

            <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <a href={primary.href} className="btn group">
                {primary.label}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              {secondary && (
                <a
                  href={secondary.href}
                  {...(secondary.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="link-arrow group"
                >
                  {secondary.label}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
