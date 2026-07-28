/**
 * Photo slots.
 *
 * ── How to change a picture ─────────────────────────────────────────────
 * 1. Put the file in `public/photos/` (see the README there for sizes).
 * 2. Point `src` at it, e.g. `src: "/photos/hero.jpg"`.
 * That is the whole job — every slot is already wired into its section, and
 * a slot with no `src` falls back to a halftone rather than a gap.
 *
 * Every photograph is duotoned into the palette at render time, so the
 * originals do not need to be colour-matched to each other. What matters is
 * tonal range: pick frames with a clear separation of light and dark. Flat,
 * evenly lit images turn to mush once they are reduced to two colours.
 *
 * The files in `public/photos/` are already cut to the aspect ratio of the
 * slot they fill. Replacing one with a differently shaped image is fine —
 * it will be cropped with `object-cover` — but the subject may drift out of
 * frame, so cut it to the ratio in the README instead.
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

// Annotated rather than inferred: without this an empty slot narrows to
// `{ alt: string }` and adding `src` later stops type-checking.
export const photos: Record<PhotoKey, PhotoSlot> = {
  hero: {
    src: "/photos/hero.jpg",
    alt: "Una ragazza in maglietta Bloop sulle spalle di qualcuno, in mezzo al pubblico di un festival",
  },
  problema: {
    src: "/photos/problema.jpg",
    alt: "Un gruppo di persone sedute sull'erba lungo il canale al tramonto, che chiacchierano",
  },
  soluzione: {
    src: "/photos/soluzione.jpg",
    alt: "Un prato visto dall'alto, pieno di teli da picnic e di persone, con un telo Bloop al centro",
  },
  bloopers: {
    src: "/photos/bloopers.jpg",
    alt: "Quattro amiche che ridono attorno a un tavolino di un locale, accanto a un braccio tatuato Bloop",
  },
  problemaDetail: {
    src: "/photos/problema-detail.jpg",
    alt: "Due ragazze che urlano di gioia verso l'obiettivo, riprese dal basso in mezzo a un gruppo",
  },
  soluzioneDetail: {
    src: "/photos/soluzione-detail.jpg",
    alt: "Dettaglio dall'alto di un prato con teli stesi e persone, con un telo Bloop",
  },
  flussoDetail: {
    src: "/photos/flusso-detail.jpg",
    alt: "Il pubblico di un festival visto da dietro, con una ragazza in maglietta Bloop che balla sulle spalle",
  },
  visioneDetail: {
    src: "/photos/visione-detail.jpg",
    alt: "Un ponte sul canale con la riva affollata di gente seduta, inquadrato tra le foglie",
  },
  bloopersDetail: {
    src: "/photos/bloopers-detail.jpg",
    alt: "Un tavolino di un locale con dadi, bicchieri e mani tatuate Bloop che giocano",
  },
};
