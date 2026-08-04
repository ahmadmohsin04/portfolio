import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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

/* ─── Page-load intro curtain ─────────────────────────────────
   A full-bleed panel that wipes upward off the screen, the same
   move the reference uses between its pinned sections.        */
export const Intro = ({ onDone }) => {
  const reduced = useReducedMotion();
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onDone?.();
  };

  useEffect(() => {
    if (reduced) { finish(); return undefined; }
    // Safety net: rAF is paused in background tabs, so the curtain's exit
    // animation may never run and would otherwise cover the page forever.
    // Timers keep firing when rAF doesn't, so this guarantees dismissal.
    const t = setTimeout(finish, 2600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.95, ease: EASE, delay: 0.9 }}
      onAnimationComplete={finish}
    >
      <div className="intro__inner">
        <motion.span
          className="intro__mark"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          Ahmad Mohsin
        </motion.span>
        <motion.span
          className="intro__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.05, ease: EASE, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
};
