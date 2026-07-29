import Image from "next/image";
import { Scribble, ScribbleName } from "./Scribble";

/**
 * SVG duotone filters. Rendered once, near the root, because `filter: url(#id)`
 * resolves against the current document.
 *
 * A luminance matrix flattens the photograph to grey, then a component
 * transfer remaps that single channel across two brand colours: shadows land
 * on ink, highlights on coral (or lilac). Doing it this way rather than with
 * stacked blend modes means any photograph — warm, cold, badly white
 * balanced — comes out inside the palette without being hand-graded first.
 */
export function DuotoneDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter id="duotone-coral" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0 0 0 1 0"
          />
          <feComponentTransfer>
            {/* #0B0920 → #F76B3A */}
            <feFuncR type="table" tableValues="0.043 0.969" />
            <feFuncG type="table" tableValues="0.035 0.420" />
            <feFuncB type="table" tableValues="0.125 0.227" />
          </feComponentTransfer>
        </filter>

        <filter id="duotone-lilac" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0 0 0 1 0"
          />
          <feComponentTransfer>
            {/* #0B0920 → #A269FF */}
            <feFuncR type="table" tableValues="0.043 0.635" />
            <feFuncG type="table" tableValues="0.035 0.412" />
            <feFuncB type="table" tableValues="0.125 1.000" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

const RATIOS = {
  portrait: "4 / 5",
  landscape: "3 / 2",
  square: "1 / 1",
  wide: "16 / 7",
} as const;

export type Ratio = keyof typeof RATIOS;

/**
 * Stands in until a photograph is dropped into the slot. Not a grey box: a
 * halftone field in the duotone colours, so an unfilled slot still reads as
 * part of the design rather than as something broken.
 */
function Placeholder({ tone }: { tone: "coral" | "lilac" }) {
  const fg = tone === "coral" ? "#F76B3A" : "#A269FF";
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[inherit] bg-ink">
      {/* Dot screen at a fixed pitch rather than a scaled viewBox, so the
          halftone reads at the same size in a small portrait slot and in a
          full-width strip. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${fg} 2.1px, transparent 2.3px)`,
          backgroundSize: "10px 10px",
        }}
      />
      {/* Density falloff, and a disc for a focal point. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 26%, rgba(11,9,32,0) 0%, rgba(11,9,32,0.45) 52%, rgba(11,9,32,0.95) 100%)",
        }}
      />
      <div
        className="absolute h-[42%] rounded-full"
        style={{
          aspectRatio: "1 / 1",
          right: "8%",
          bottom: "-12%",
          backgroundColor: fg,
        }}
      />
    </div>
  );
}

type EditorialImageProps = {
  /** Leave unset until the photograph exists; the slot falls back to a mark. */
  src?: string;
  alt: string;
  ratio?: Ratio;
  tone?: "coral" | "lilac";
  /** Mono index printed at the right of the caption rule. */
  index?: string;
  caption?: string;
  scribble?: ScribbleName;
  scribblePlace?: string;
  scribbleStroke?: string;
  /** Passed to next/image; set on anything above the fold. */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A photograph as this design system treats one: duotoned into the palette,
 * rounded off, annotated by hand, and captioned on a hairline like a plate in
 * a printed article.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "landscape",
  tone = "coral",
  index,
  caption,
  scribble,
  scribblePlace,
  scribbleStroke,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: EditorialImageProps) {
  const filterClass = tone === "coral" ? "duotone" : "duotone-2";

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-2xl bg-ink sm:rounded-3xl"
        style={{ aspectRatio: RATIOS[ratio] }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${filterClass}`}
          />
        ) : (
          <>
            <Placeholder tone={tone} />
            <span className="sr-only">{alt}</span>
          </>
        )}

        {scribble && (
          <Scribble
            name={scribble}
            place={scribblePlace}
            stroke={scribbleStroke}
          />
        )}
      </div>

      {(index || caption) && (
        <figcaption className="rule-t mt-3 flex items-baseline justify-between gap-6 pt-2">
          <span className="eyebrow-sm text-muted">{caption}</span>
          {index && <span className="eyebrow-sm text-accent-ink">{index}</span>}
        </figcaption>
      )}
    </figure>
  );
}
