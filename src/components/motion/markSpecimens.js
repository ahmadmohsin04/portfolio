/* ─── The monogram, set again and again ───────────────────────
   Beat 2 of the opening flips the mark through a run of typographic
   specimens: the same two initials in different faces, weights and
   writing systems, the way a designer flips through a specimen book.

   The scripts mean something rather than being exotic — 艾姆 and アム
   transliterate A-M, and 아모 are the initials of 아마드 모신.

   The three CJK settings are deliberately from unrelated type
   families. Noto Sans SC and Noto Sans JP were used before and read
   as one specimen shown twice: they are the same typeface design with
   different glyph coverage, so nothing changed between them but the
   script. These three are a Song-flavoured display face, a rounded
   gothic and a humanist sans — three different hands.

   They are also set light. A 900-weight Han glyph is a solid block of
   ink next to Latin caps; at 400 the setting reads as letterforms
   rather than as a dark rectangle.

   Each specimen holds for a fraction of a second, so what has to
   change between neighbours is the whole colour of the letterform:
   weight, contrast, or script. Two sans faces a weight apart would
   read as one specimen held twice — which is why the order alternates
   Latin against everything else.

   `scale` is measured, not chosen. Every face draws a different amount
   of ink at the same em, so each was measured with canvas ink metrics
   and scaled to land on Inter's cap height, then trimmed to 0.92 of
   that: CJK glyphs fill their body where Latin caps do not, so equal
   ink height still reads too large. Eyeballed values were out by up to
   35%, which shows as the mark lurching between settings.          */

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
    /* Chinese. A light Song-flavoured display face — nothing like the
       gothic used for the kana. Single weight. */
    key: 'hanzi',
    text: '艾姆',
    family: 'ZCOOL XiaoWei',
    fallback: 'serif',
    weight: 400,
    style: 'normal',
    tracking: '0',
    /* measured 0.854, trimmed to 0.92 */
    scale: 0.79,
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
    /* Japanese. Rounded gothic — soft terminals, no serifs, the
       opposite hand to the Chinese setting. Single weight. */
    key: 'kana',
    text: 'アム',
    family: 'Kosugi Maru',
    fallback: 'sans-serif',
    weight: 400,
    style: 'normal',
    tracking: '0',
    /* measured 0.891, trimmed to 0.92 */
    scale: 0.82,
    lang: 'ja',
    dir: 'ltr',
  },
  {
    /* Upright, not italic. The classical counterpoint to the grotesques
       around it comes from the serifs and the stroke modulation. Every
       Cormorant weight shares one cap height, so the scale holds
       whichever is used. */
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
    /* Korean. A humanist sans, narrower and lighter than either of the
       other two scripts. Single weight. */
    key: 'hangul',
    text: '아모',
    family: 'Gowun Dodum',
    fallback: 'sans-serif',
    weight: 400,
    style: 'normal',
    tracking: '0',
    /* measured 0.854, trimmed to 0.92 */
    scale: 0.79,
    lang: 'ko',
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
