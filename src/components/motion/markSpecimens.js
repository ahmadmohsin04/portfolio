/* ─── The monogram, set again and again ───────────────────────
   Beat 2 of the opening flips the mark through a run of typographic
   specimens: the same two initials in different faces, weights and
   writing systems, the way a designer flips through a specimen book.

   The scripts mean something rather than being exotic — the Han and
   katakana forms transliterate A-M, they are not decoration.

   Each specimen holds for a fraction of a second, so what has to
   change between neighbours is the whole colour of the letterform:
   weight, contrast, or script. Two sans faces a weight apart would
   read as one specimen held twice — which is why the order alternates
   heavy against light and Latin against everything else.

   `scale` is measured, not chosen. Every face draws a different amount
   of ink at the same em — Han fills its whole body, a Garamond sits
   well under its cap line — so each was measured with canvas ink
   metrics and scaled to land on Inter's cap height. Eyeballed values
   were out by up to 35%, which shows as the mark lurching between
   settings.                                                        */

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
    /* Upright, not italic. The classical counterpoint to the grotesques
       around it comes from the serifs and the stroke modulation; the
       slant was doing nothing for it. Every Cormorant weight shares one
       cap height, so the scale holds whichever is used. */
    key: 'cormorant',
    text: 'AM',
    family: 'Cormorant Garamond',
    fallback: 'serif',
    weight: 700,
    style: 'normal',
    tracking: '0.02em',
    /* Garamond sits well under its cap line */
    scale: 1.14,
    lang: 'en',
    dir: 'ltr',
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
