import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
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
   Modelled on the reference's real opening, decoded from its own
   GSAP timeline:

     t=0.00  the mark fades in alone, centred, at close to its
             final size — it never balloons and never moves
             vertically in the original
     t=1.20  it travels to its resting place in the nav,
             0.8s on power3.inOut
     after   the reference then morphs its logomark path into a
             wordmark; ours is already letterforms, so the
             travel is where our equivalent beat lands

   The mark is only modestly larger than the nav logo it becomes,
   so the move reads as a settle rather than a zoom.

   The flight is measured rather than hard-coded: the mark's own
   box and the nav logo's box are compared at mount, so the
   landing stays exact at any viewport width or type scale.    */

const EASE_IN_OUT = [0.65, 0, 0.35, 1];  /* ≈ gsap power3.inOut */

/* The mark alternates between its solid letterforms and a sketch of
   them — an outline of the same glyphs — twice before settling, then
   flies. Held in one place because the two faces, the veil and the
   hero's entrance all have to stay in step; the seconds below are the
   whole opening. */
const INTRO_MORPH  = [0, 0.55, 0.70, 0.85, 1.00, 1.15];  /* solid ↔ sketch */
const INTRO_SOLID  = [1, 1,    0,    1,    0,    1];
const INTRO_FLIGHT = 1.4;   /* mark leaves for the nav        */
const INTRO_END    = INTRO_FLIGHT + 0.8;

const morphTiming = {
  duration: INTRO_MORPH[INTRO_MORPH.length - 1],
  times: INTRO_MORPH.map((t) => t / INTRO_MORPH[INTRO_MORPH.length - 1]),
  ease: 'easeInOut',
};

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
      {/* The veil clears as the mark flies, revealing the site beneath.
          The mark is its sibling, not its child, so it doesn't fade too. */}
      <motion.div
        className="brand-intro__veil"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: INTRO_FLIGHT }}
      />
      {/* Two nested spans, one animation each: the outer carries the
          measured flight, the inner the entrance. Splitting them keeps
          both transitions single-purpose instead of one keyframe chain,
          and a transform on the inner can't disturb the outer's box —
          which is the box the flight is measured from. */}
      <motion.span
        ref={markRef}
        className="brand-intro__mark"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={flight || {}}
        transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: INTRO_FLIGHT }}
        // Guarded: without it this fires the moment the no-op initial
        // animation settles, before the flight is measured, and clears
        // the intro early.
        onAnimationComplete={() => { if (flight) finish(); }}
      >
        <motion.span
          className="brand-intro__mark-in"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          {/* The solid face sits in normal flow, so it alone defines the
              box the flight is measured from. The sketch is laid over it
              and the two cross-fade, which reads as the letterforms
              breaking down and reforming rather than blinking. */}
          <motion.span
            className="brand-intro__face"
            animate={{ opacity: INTRO_SOLID }}
            transition={morphTiming}
          >
            {mark}
          </motion.span>
          <motion.span
            className="brand-intro__face brand-intro__face--sketch"
            animate={{ opacity: INTRO_SOLID.map((o) => 1 - o) }}
            transition={morphTiming}
          >
            {mark}
          </motion.span>
        </motion.span>
      </motion.span>
    </div>
  );
};
