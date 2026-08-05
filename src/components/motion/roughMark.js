/* ─── A hand-drawn pass over the AM monogram ──────────────────
   The reference plays eleven frames of drawn artwork through its
   loader. We have no artwork, so the frames are generated.

   The letters are held as stroke skeletons rather than outlines,
   because a sketch of a letter is drawn with strokes — nobody
   inks a contour and fills it. A and M are entirely straight
   lines, so there is no curve fitting to do: each segment is
   redrawn twice with its points jittered, which is how rough.js
   fakes a pen doubling back over a line.

   A different jitter per frame makes the sketch boil the way
   inked animation does. That boil is most of the effect — a
   single static rough frame just looks like a wonky logo.       */

/* Seeded on purpose. Math.random would reshuffle every frame on
   every React re-render, so the sketch would flicker at random
   instead of cycling through a fixed, repeatable loop. */
const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* Skeletons on a 112 x 72 field, cap height 4 → 68. */
const STROKES = [
  /* A */
  [[4, 68], [24, 4]],
  [[24, 4], [44, 68]],
  [[12, 46], [36, 46]],
  /* M */
  [[56, 68], [56, 4]],
  [[56, 4], [82, 44]],
  [[82, 44], [108, 4]],
  [[108, 68], [108, 4]],
];

export const ROUGH_VIEWBOX = '0 0 112 72';

/* Two overlapping passes per segment, each bowed by a jittered midpoint.
   The midpoint moves further than the ends do — a drawn line wanders in
   the middle and still arrives roughly where it was aimed. */
const roughSegment = (rand, [x1, y1], [x2, y2], amp) => {
  const j = (k = 1) => ((rand() * 2 - 1) * amp * k).toFixed(2);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return [0, 1]
    .map(
      () =>
        `M${+x1 + +j()} ${+y1 + +j()}` +
        `Q${+mx + +j(1.9)} ${+my + +j(1.9)} ` +
        `${+x2 + +j()} ${+y2 + +j()}`
    )
    .join(' ');
};

export const roughFrames = (count = 8, amp = 2.1, seed = 20260805) =>
  Array.from({ length: count }, (_, i) => {
    const rand = mulberry32(seed + i * 977);
    return STROKES.map(([a, b]) => roughSegment(rand, a, b, amp)).join(' ');
  });
