/* ─── The monogram, set again and again ───────────────────────
   Beat 2 of the opening flips the mark through a run of typographic
   specimens: the same two initials in different faces, weights and
   writing systems, the way a designer flips through a specimen book.

   The scripts are chosen to mean something rather than to be exotic —
   ا م are the initials of احمد محسن, and the Han and katakana forms
   are transliterations of A-M, not decoration.

   Each specimen holds for a fraction of a second, so what has to
   change between neighbours is the whole colour of the letterform:
   weight, contrast, or script. Two sans faces a weight apart would
   read as one specimen held twice.

   `scale` is measured, not chosen. Every face draws a different amount
   of ink at the same em — Naskh runs from the alef down through the
   meem's tail, Han fills its whole body, a Garamond italic sits well
   under its cap line — so each was measured with canvas ink metrics
   and scaled to land on Inter's cap height. Eyeballed values were out
   by up to 35%, which shows as the mark lurching between settings.  */

export const SPECIMENS = [
  {
    key: 'inter-black',
    text: 'AM',
    family: 'Inter',
    fallback: 'sans-serif',
    weight: 900,
    style: 'normal',
    tracking: '-0.045em',
    /* matches Inter cap height by definition */
    scale: 1,
    lang: 'en',
    dir: 'ltr',
  },
  {
    key: 'cormorant',
    text: 'AM',
    family: 'Cormorant Garamond',
    fallback: 'serif',
    weight: 300,
    style: 'italic',
    tracking: '0.02em',
    /* Garamond italic sits well under its cap line */
    scale: 1.14,
    lang: 'en',
    dir: 'ltr',
  },
  {
    key: 'hanzi',
    text: '艾姆',
    family: 'Noto Sans SC',
    fallback: 'sans-serif',
    weight: 900,
    style: 'normal',
    tracking: '0',
    /* Han fills its body; 0.93 optical trim applied */
    scale: 0.71,
    lang: 'zh-Hans',
    dir: 'ltr',
  },
  {
    key: 'mono',
    text: 'AM',
    family: 'JetBrains Mono',
    fallback: 'monospace',
    weight: 400,
    style: 'normal',
    tracking: '-0.02em',
    /* same cap height as Inter */
    scale: 1,
    lang: 'en',
    dir: 'ltr',
  },
  {
    key: 'arabic',
    text: 'ا م',
    family: 'Noto Naskh Arabic',
    fallback: 'serif',
    weight: 700,
    style: 'normal',
    tracking: '0',
    /* alef to the meem's tail is far taller than a cap */
    scale: 0.72,
    lang: 'ar',
    dir: 'rtl',
  },
  {
    key: 'inter-thin',
    text: 'AM',
    family: 'Inter',
    fallback: 'sans-serif',
    weight: 200,
    style: 'normal',
    tracking: '-0.02em',
    /* same cap height as Inter */
    scale: 1,
    lang: 'en',
    dir: 'ltr',
  },
  {
    key: 'katakana',
    text: 'アム',
    family: 'Noto Sans JP',
    fallback: 'sans-serif',
    weight: 700,
    style: 'normal',
    tracking: '0',
    /* kana fills its body; 0.93 optical trim applied */
    scale: 0.79,
    lang: 'ja',
    dir: 'ltr',
  },
  {
    key: 'grotesk',
    text: 'AM',
    family: 'Space Grotesk',
    fallback: 'sans-serif',
    weight: 700,
    style: 'normal',
    tracking: '-0.03em',
    /* marginally smaller cap than Inter */
    scale: 1.03,
    lang: 'en',
    dir: 'ltr',
  },
];

/* Long enough to register as a setting, short enough to feel like a flip. */
export const SPECIMEN_MS = 175;

/* CSS font shorthand, which is what document.fonts.load expects. The size
   is arbitrary — the loader matches a face, not a rendered size. */
export const specimenFont = (s, px = 56) =>
  `${s.style} ${s.weight} ${px}px "${s.family}"`;
