import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { buildSequence, ROUGH_VIEWBOX } from './roughMark';
import './Motion.css';

/* ============================================================
   Motion primitives.

   The reference site (tinywins.com) builds nearly everything
   from three moves:
     1. masked line reveal — a word sits below an overflow:hidden
        edge and rises into place, staggered
     2. staggered fade + rise on scroll entry
     3. Lenis-driven smooth scrolling underneath it all
   ============================================================ */

/* Shared curve — matches the reference's slow-out feel */
export const EASE = [0.22, 1, 0.36, 1];

/* ─── Lenis smooth scroll ─────────────────────────────────── */
export const useSmoothScroll = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Keep the existing in-page anchor navigation working.
    const onAnchor = (e) => {
      const el = e.detail;
      if (el) lenis.scrollTo(el, { offset: -80 });
    };
    window.addEventListener('lenis:scrollto', onAnchor);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('lenis:scrollto', onAnchor);
      lenis.destroy();
    };
  }, [reduced]);
};

/* ─── Masked word reveal ──────────────────────────────────────
   Each word is clipped by its own overflow:hidden box and
   translated up from below. `block` puts one word per line,
   which is how the reference stacks its display type.        */
export const MaskedText = ({
  text,
  block = false,
  delay = 0,
  stagger = 0.07,
  duration = 0.85,
  animateOnMount = false,
  className = '',
  wordClassName = () => '',
}) => {
  const reduced = useReducedMotion();
  const wordList = String(text).split(' ').filter(Boolean);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.4 } };

  return (
    <motion.span
      className={`mask ${block ? 'mask--block' : ''} ${className}`}
      initial="hidden"
      {...trigger}
    >
      {wordList.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          {/* A real space between words keeps textContent readable for
              screen readers and crawlers — don't fake it with margin. */}
          {i > 0 && ' '}
          <span className="mask__line">
            <motion.span
              className={`mask__word ${wordClassName(word, i)}`}
              variants={{
                hidden: { y: '108%' },
                show: {
                  y: '0%',
                  transition: { duration, ease: EASE, delay: delay + i * stagger },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        </React.Fragment>
      ))}
    </motion.span>
  );
};

/* ─── Scroll reveal: fade + small rise ───────────────────── */
export const Reveal = ({
  children,
  delay = 0,
  y = 24,
  duration = 0.55,
  className = '',
  as = 'div',
}) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
};

/* ─── Staggered container for grids/lists ─────────────────────
   Guidance from the motion kit: keep per-item stagger small and
   don't stagger more than ~8 children before it feels laggy.  */
export const StaggerGroup = ({ children, className = '', stagger = 0.08, delay = 0 }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '', y = 26 }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Two-column phrase swapper ───────────────────────────────
   The reference's signature top-of-page move: one line of copy
   split across a left and a right column, which periodically
   re-splits itself into a different arrangement.

   Timings are lifted from the reference's own GSAP timeline
   rather than eyeballed — outgoing words leave at yPercent -105
   over 0.5s on an ease-in, incoming words arrive from +105 over
   1s on an expo-out, and the two never overlap.

   The clip is per ROW, not per word: a multi-word row wipes as a
   single band, which is what keeps the edge straight.           */

export const EASE_IN  = [0.32, 0, 0.67, 0];  /* ≈ gsap power3.in */
export const EASE_OUT = [0.16, 1, 0.3, 1];   /* ≈ gsap expo.out  */

const SWAP_WORD = {
  hidden: { y: '105%' },
  show:   { y: '0%',    transition: { duration: 1,   ease: EASE_OUT } },
  exit:   { y: '-105%', transition: { duration: 0.5, ease: EASE_IN } },
};

const SwapSide = ({ rows, side }) => (
  <div className={`swap__side swap__side--${side}`}>
    {rows.map((row, r) => (
      <span className="swap__row" key={`${row.join('-')}-${r}`}>
        {row.map((word, w) => (
          <motion.span className="swap__word" key={`${word}-${w}`} variants={SWAP_WORD}>
            {word}
          </motion.span>
        ))}
      </span>
    ))}
  </div>
);

export const SwapLines = ({ phrases, interval = 5100, startDelay = 0, className = '' }) => {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  // startDelay holds the very first reveal until the intro curtain has
  // cleared. Every swap after that follows straight on from the exit,
  // the way the reference does it — so the delay must not persist.
  const started = useRef(false);
  useEffect(() => { started.current = true; }, []);

  useEffect(() => {
    if (reduced || phrases.length < 2) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [reduced, phrases.length, interval]);

  const phrase = phrases[i] || phrases[0];

  // Under reduced motion the copy still has to be there — it just
  // stops moving, and stops cycling on a timer.
  if (reduced) {
    return (
      <div className={`swap ${className}`}>
        <SwapSide rows={phrase.left} side="left" />
        <SwapSide rows={phrase.right} side="right" />
      </div>
    );
  }

  // The reference spreads its stagger over a fixed total rather than
  // a fixed per-word step, so a long phrase doesn't drift out of time
  // with a short one. Divide the same budget by the words present.
  const count = [...phrase.left, ...phrase.right].reduce((n, row) => n + row.length, 0);
  const spread = Math.max(1, count - 1);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i}
        className={`swap ${className}`}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.4 / spread,
              delayChildren: started.current ? 0 : startDelay,
            },
          },
          exit: { transition: { staggerChildren: 0.2 / spread } },
        }}
      >
        <SwapSide rows={phrase.left} side="left" />
        <SwapSide rows={phrase.right} side="right" />
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Page-load brand intro ───────────────────────────────────
   The reference's loader is a z-200 overlay staged in four beats,
   read off its DOM:

     1. a black backdrop fills the screen
     2. a 300x197 frame centred on it plays the logo becoming a
        rough drawing and coming back — eleven stacked <img> frames
        cross-toggled at 75ms, a flipbook of hand-drawn artwork
     3. a white panel parked at translateY(-100%) slides down and
        wipes the screen from black to white, the logo turning from
        white to black as it passes
     4. only then does the logo travel to the nav

   Beat 2 is artwork we don't have, so it is drawn from the glyphs
   instead: an accent line sweeps across the mark and converts it
   to an outline of itself as it passes, then sweeps back. The line
   is a child of the wipe, pinned to its right edge, so it rides
   the boundary and the two can never drift apart.

   Beat 3 is the piece that makes the whole thing read. The curtain
   carries the mark in its final colour, counter-translated so it
   holds still while the panel moves over it — so the colour flip
   is done by the curtain's own edge rather than a timed cross-fade
   that could fall out of step with it.

   The flight is measured rather than hard-coded: the mark's own
   box and the nav logo's box are compared at mount, so the landing
   stays exact at any viewport width or type scale.

   Seconds from mount. Held in one place because the two marks, the
   curtain, the backdrop and the hero's entrance all keep step.  */

const EASE_IN_OUT = [0.65, 0, 0.35, 1];  /* ≈ gsap power3.inOut */

/* Beat 2: the solid letterforms hand over to the drawn ones and back.
   The window is derived from the flipbook rather than fixed, so it holds
   the sketch for exactly one full pass through the treatments — adding
   another treatment lengthens the beat instead of truncating the loop,
   and everything downstream shifts with it. */
const ROUGH_FRAMES = buildSequence({ boil: 3 });
const ROUGH_FPS_MS = 67;

const SKETCH_IN   = 0.45;
const SKETCH_OUT  = SKETCH_IN + (ROUGH_FRAMES.length * ROUGH_FPS_MS) / 1000;
const SKETCH_END  = SKETCH_OUT + 0.14;

const SKETCH_AT   = [0, SKETCH_IN - 0.13, SKETCH_IN, SKETCH_OUT, SKETCH_END];
const SOLID_FADE  = [1, 1, 0, 0, 1];
const SKETCH_FADE = [0, 0, 1, 1, 0];

const CURTAIN_AT   = SKETCH_END + 0.15;       /* white panel starts down   */
const CURTAIN_DUR  = 0.55;
const CURTAIN_LAND = CURTAIN_AT + CURTAIN_DUR;
const INTRO_FLIGHT = CURTAIN_LAND + 0.1;      /* mark leaves for the nav   */
const INTRO_FLIGHT_DUR = 0.7;
const INTRO_END    = INTRO_FLIGHT + INTRO_FLIGHT_DUR;

/* Exported so the hero rises into the reveal rather than guessing at it —
   the two stayed in step by hand before, which is exactly the kind of
   coupling that drifts the moment a beat is retimed. */
export const INTRO_REVEAL_AT = INTRO_FLIGHT + 0.25;

const sketchTiming = {
  duration: SKETCH_AT[SKETCH_AT.length - 1],
  times: SKETCH_AT.map((t) => t / SKETCH_AT[SKETCH_AT.length - 1]),
  ease: 'easeInOut',
};

const curtainTiming = { duration: CURTAIN_DUR, delay: CURTAIN_AT, ease: EASE_IN_OUT };

/* The flipbook. Frames are generated once at module load, so this only
   ever swaps which path is mounted and what it's stroked with.

   It starts on the beat the sketch becomes visible, not at mount —
   otherwise the loop is already part-way through by the time anyone
   sees it, and the run would begin on an arbitrary treatment instead
   of the one chosen to open. */
const RoughMark = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let id;
    const start = setTimeout(() => {
      id = setInterval(
        () => setFrame((n) => (n + 1) % ROUGH_FRAMES.length),
        ROUGH_FPS_MS
      );
    }, SKETCH_IN * 1000);

    return () => { clearTimeout(start); clearInterval(id); };
  }, []);

  const f = ROUGH_FRAMES[frame];

  return (
    <svg className="brand-intro__rough" viewBox={ROUGH_VIEWBOX} aria-hidden="true" focusable="false">
      <path
        d={f.d}
        strokeWidth={f.w}
        strokeDasharray={f.dash === 'none' ? undefined : f.dash}
        opacity={f.opacity}
      />
    </svg>
  );
};

/* The mark's two faces: the real letterforms, and the drawn ones. Only
   the solid face sits in normal flow, so it alone defines the box the
   flight is measured from — the sketch is laid over it and deliberately
   overshoots, the way a drawn line runs past its corner. */
const MarkFaces = ({ mark, sketch }) =>
  sketch ? (
    <>
      <motion.span
        className="brand-intro__face"
        animate={{ opacity: SOLID_FADE }}
        transition={sketchTiming}
      >
        {mark}
      </motion.span>
      <motion.span
        className="brand-intro__sketch"
        animate={{ opacity: SKETCH_FADE }}
        transition={sketchTiming}
      >
        <RoughMark />
      </motion.span>
    </>
  ) : (
    <span className="brand-intro__face">{mark}</span>
  );

export const BrandIntro = ({ mark = 'AM', target = '.navbar__logo', onDone }) => {
  const reduced = useReducedMotion();
  const markRef = useRef(null);
  const [flight, setFlight] = useState(null);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onDone?.();
  };

  useLayoutEffect(() => {
    if (reduced) return;
    const dest = document.querySelector(target);
    const el = markRef.current;
    if (!dest || !el) return;

    const d = dest.getBoundingClientRect();
    const m = el.getBoundingClientRect();
    if (!d.width || !m.width) return;

    // Centre to centre, because the scale is applied about the centre.
    // Both boxes hold the same glyphs in the same face, so the width
    // ratio is the type-size ratio and no font metrics are needed.
    setFlight({
      x: (d.left + d.width / 2) - (m.left + m.width / 2),
      y: (d.top + d.height / 2) - (m.top + m.height / 2),
      scale: d.width / m.width,
    });
  }, [reduced, target]);

  useEffect(() => {
    if (reduced) { finish(); return undefined; }
    // Safety net: rAF is paused in background tabs, so the flight may
    // never run and would leave the veil covering the page. Timers keep
    // firing when rAF doesn't, so this guarantees the intro clears.
    const t = setTimeout(finish, INTRO_END * 1000 + 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="brand-intro" aria-hidden="true">
      {/* Beats 1 and 2: the mark sketching itself on the dark ground.
          Both are dropped the instant the curtain has covered them —
          they're behind it by then, so nothing is seen to go, and they
          can't reappear when the curtain's face fades away. */}
      <motion.div
        className="brand-intro__under"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.01, delay: CURTAIN_LAND }}
      >
        <div className="brand-intro__stage" />
        <motion.span
          className="brand-intro__mark brand-intro__mark--invert"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >
          <MarkFaces mark={mark} sketch />
        </motion.span>
      </motion.div>

      {/* Beat 3: the curtain. Its face travels with it; its contents are
          counter-translated by exactly as much, so the mark inside holds
          still on screen while the panel sweeps down over it. The colour
          flip is therefore the curtain's own edge, frame-accurate by
          construction rather than by a timing that has to be kept true. */}
      <motion.div
        className="brand-intro__curtain"
        initial={{ y: '-100%' }}
        animate={{ y: '0%' }}
        transition={curtainTiming}
      >
        <motion.div
          className="brand-intro__curtain-face"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: INTRO_FLIGHT }}
        />
        <motion.div
          className="brand-intro__curtain-inner"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={curtainTiming}
        >
          {/* Beat 4. This is the copy that flies, so this is the copy the
              flight measures — it and the nav logo are the same colour on
              the same ground, so the handoff at the end is invisible. */}
          <motion.span
            ref={markRef}
            className="brand-intro__mark"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={flight || {}}
            transition={{ duration: INTRO_FLIGHT_DUR, ease: EASE_IN_OUT, delay: INTRO_FLIGHT }}
            // Guarded: without it this fires the moment the no-op initial
            // animation settles, before the flight is measured, and clears
            // the intro early.
            onAnimationComplete={() => { if (flight) finish(); }}
          >
            <MarkFaces mark={mark} />
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};
