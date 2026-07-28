/**
 * Photo slots.
 *
 * ── How to fill these in ────────────────────────────────────────────────
 * 1. Put the files in `public/photos/` (see the README there for sizes).
 * 2. Set `src` on the slot, e.g. `src: "/photos/hero.jpg"`.
 * That is the whole job — every slot is already wired into its section, and
 * a slot with no `src` falls back to a halftone mark rather than a gap.
 *
 * Every photograph is duotoned into the palette at render time, so the
 * originals do not need to be colour-matched to each other. What matters is
 * tonal range: pick frames with a clear separation of light and dark. Flat,
 * evenly lit images turn to mush once they are reduced to two colours.
 *
 * `alt` describes the picture for screen readers and is already written for
 * the intended subject — adjust it if you use a different frame.
 */

export type PhotoSlot = {
  src?: string;
  alt: string;
};

type PhotoKey =
  | "hero"
  | "problema"
  | "soluzione"
  | "bloopers"
  | "problemaDetail"
  | "soluzioneDetail"
  | "flussoDetail"
  | "visioneDetail"
  | "bloopersDetail";

// Annotated rather than inferred: without this the empty slots narrow to
// `{ alt: string }` and adding `src` later stops type-checking.
export const photos: Record<PhotoKey, PhotoSlot> = {
  hero: {
    alt: "Una piazza affollata di sera, gente che si incontra sotto i portici",
  },
  problema: {
    alt: "Una strada di città semivuota di notte, vetrine chiuse e insegne accese",
  },
  soluzione: {
    alt: "Mani che tengono un telefono mentre intorno la serata è già cominciata",
  },
  bloopers: {
    alt: "Un gruppo di persone che ride durante un concerto in un piccolo locale",
  },
  problemaDetail: {
    alt: "Volantini di eventi attaccati a un muro, sovrapposti e strappati",
  },
  soluzioneDetail: {
    alt: "Una mappa della città vista dall'alto, di notte, con le luci accese",
  },
  flussoDetail: {
    alt: "Qualcuno che attraversa la strada verso l'ingresso di un locale",
  },
  visioneDetail: {
    alt: "Una piazza vista dall'alto con le persone che la attraversano",
  },
  bloopersDetail: {
    alt: "Il pubblico di un evento ripreso da dietro, mani alzate",
  },
};
