/* ─── Hand-drawn passes over the AM monogram ──────────────────
   The reference plays frames of drawn artwork through its loader.
   We have no artwork, so the frames are generated.

   The letters are held as stroke skeletons rather than outlines,
   because a sketch of a letter is drawn with strokes — nobody
   inks a contour and fills it. A and M are entirely straight
   lines, so there is no curve fitting to do.

   A single treatment boiled for a second is one idea held too
   long. Instead the loop runs through several distinct TREATMENTS
   — different ways of drawing the same skeleton — a few boil
   frames each, so the mark keeps becoming something new.        */

/* Seeded on purpose. Math.random would reshuffle every frame on
   every React re-render, so the sketch would flicker at random
   instead of cycling a fixed, repeatable loop. */
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

const n2 = (v) => Math.round(v * 10) / 10;

/* One bowed pass along a segment: the midpoint wanders further than the
   ends do, because a drawn line strays in the middle and still arrives
   roughly where it was aimed. */
const pass = (rand, [x1, y1], [x2, y2], amp, bow = 1.9) => {
  const j = (k = 1) => (rand() * 2 - 1) * amp * k;
  return (
    `M${n2(x1 + j())} ${n2(y1 + j())}` +
    `Q${n2((x1 + x2) / 2 + j(bow))} ${n2((y1 + y2) / 2 + j(bow))} ` +
    `${n2(x2 + j())} ${n2(y2 + j())}`
  );
};

const lerpPt = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/* Push both ends of a segment outwards along its own direction. */
const extend = (a, b, by) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [
    [a[0] - (dx / len) * by, a[1] - (dy / len) * by],
    [b[0] + (dx / len) * by, b[1] + (dy / len) * by],
  ];
};

const perp = (a, b) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [-dy / len, dx / len];
};

const line = (p, q) => `M${n2(p[0])} ${n2(p[1])}L${n2(q[0])} ${n2(q[1])}`;

/* ─── Treatments ──────────────────────────────────────────────
   Each is a different way of drawing the same skeleton, and each has
   only ~200ms on screen — so they differ in structure and weight, not
   in detail. Anything you would have to look twice at to tell apart is
   the same treatment as far as the viewer is concerned.

   Ordered to alternate heavy against light and dense against sparse,
   so no two neighbours blur together as the loop runs.

   Adding one here lengthens the beat; the intro derives its timing
   from the frame count, so nothing else has to change.            */

const TREATMENTS = [
  {
    /* A pen going over every line twice. */
    name: 'rough-pen',
    build: (rand) => ({
      d: STROKES.map(([a, b]) => `${pass(rand, a, b, 2.1)} ${pass(rand, a, b, 2.1)}`).join(' '),
      w: 7,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* One thin, near-steady line — a quick contour. */
    name: 'hairline',
    build: (rand) => ({
      d: STROKES.map(([a, b]) => pass(rand, a, b, 0.7, 1)).join(' '),
      w: 1.6,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* Fat marker, laid down fast and wandering. */
    name: 'marker',
    build: (rand) => ({
      d: STROKES.map(([a, b]) => pass(rand, a, b, 3.2, 2.6)).join(' '),
      w: 13,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* Draughting: guide lines run past their intersections. */
    name: 'construction',
    build: (rand) => ({
      d: STROKES.map(([a, b]) => {
        const [p, q] = extend(a, b, 9);
        return pass(rand, p, q, 0.8, 1);
      }).join(' '),
      w: 2.4,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* Broken up, with pieces the pen never got to. Irregular gaps
       rather than a dash array, which would read as a plotter. */
    name: 'fragment',
    build: (rand) => ({
      d: STROKES.flatMap(([a, b]) => {
        const out = [];
        for (let i = 0; i < 4; i += 1) {
          if (rand() < 0.24) continue;
          out.push(pass(rand, lerpPt(a, b, (i + 0.1) / 4), lerpPt(a, b, (i + 0.86) / 4), 1.4, 1.2));
        }
        return out;
      }).join(' '),
      w: 6,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* Thin skeleton under perpendicular ticks — shaded, textural. */
    name: 'hatch',
    build: (rand) => ({
      d: STROKES.flatMap(([a, b]) => {
        const [px, py] = perp(a, b);
        const ticks = [];
        for (let i = 1; i <= 6; i += 1) {
          const c = lerpPt(a, b, i / 7);
          const h = 5 + rand() * 4;
          ticks.push(line([c[0] - px * h, c[1] - py * h], [c[0] + px * h, c[1] + py * h]));
        }
        return [pass(rand, a, b, 0.9, 1.1), ...ticks];
      }).join(' '),
      w: 2.2,
      dash: 'none',
      opacity: 1,
    }),
  },
  {
    /* Three passes out of register, like a print that shifted. */
    name: 'ghost',
    build: (rand) => ({
      d: [[-2.8, -1.6], [0, 0], [2.8, 1.6]]
        .flatMap(([ox, oy]) =>
          STROKES.map(([a, b]) =>
            pass(rand, [a[0] + ox, a[1] + oy], [b[0] + ox, b[1] + oy], 1, 1.3)
          )
        )
        .join(' '),
      w: 4.5,
      dash: 'none',
      opacity: 0.55,
    }),
  },
];

export const buildSequence = ({ boil = 3, seed = 20260805 } = {}) =>
  TREATMENTS.flatMap((t, ti) =>
    Array.from({ length: boil }, (_, bi) => ({
      name: t.name,
      ...t.build(mulberry32(seed + ti * 7919 + bi * 977)),
    }))
  );

export const TREATMENT_COUNT = TREATMENTS.length;
