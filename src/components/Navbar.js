import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import {
  EASE,
  NAV_ENTER_AT,
  NAV_ENTER_DUR,
  NAV_ENTER_STEP,
  NAV_RISE_AT,
  NAV_RISE_DUR,
} from './motion/Motion';
import './Navbar.css';

/* Present while the panel is in the air, gone by the time it is placed.
   Three keyframes rather than two so it holds through the fast part of
   the travel and collapses over the last stretch, instead of thinning out
   from the very first frame. */
const SHADOW_LIFTED = '0px 32px 64px rgba(0, 0, 0, 0.14)';
const SHADOW_FLAT   = '0px 0px 0px rgba(0, 0, 0, 0)';
const SHADOW_KEYS   = [SHADOW_LIFTED, SHADOW_LIFTED, SHADOW_FLAT];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'YouTube', href: '#youtube' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ brandHidden = false, animateIn = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();

  const lastY = useRef(0);
  const [settled, setSettled] = useState(!animateIn);

  /* The whole height of the screen, so the panel genuinely starts below
     the bottom edge rather than merely low on it. Captured once — a
     resize mid-flight is not worth chasing for a one-shot opening. */
  const riseFrom = useRef(typeof window === 'undefined' ? 800 : window.innerHeight).current;

  /* The bar assembles around the mark as it arrives: each item lifts into
     place one step behind the last. Only during an opening — arriving
     from a project page, the nav is simply already there.

     Per-item delays rather than a stagger container on purpose. The list
     itself carries a CSS transform on mobile (it slides off-canvas), and
     a variant container would put an inline transform on the same element
     and take the menu with it. */
  const enter = (i) =>
    animateIn && !reduced
      ? {
          /* Small to big. A 7px lift was too slight to register against
             everything else moving — the bar has to visibly grow into
             place, the way the reference's pill widens as its links
             arrive. Each item starts under-scaled and a little to the
             right, then settles left into its slot. */
          initial: { opacity: 0, scale: 0.72, x: 14 },
          animate: { opacity: 1, scale: 1, x: 0 },
          transition: { duration: NAV_ENTER_DUR, ease: EASE, delay: NAV_ENTER_AT + i * NAV_ENTER_STEP },
        }
      : {};

  /* Safety net, the same one the intro carries. These items start at
     opacity 0 and are lifted by an animation clock that only advances on
     animation frames — which a background tab does not get. Opened in a
     background tab, the whole bar would sit invisible until the tab was
     focused. Timers keep running when frames don't, so this hands the
     items back to CSS once the entrance is long past. */
  useEffect(() => {
    if (!animateIn || settled) return undefined;
    const done =
      (NAV_ENTER_AT + (navLinks.length + 1) * NAV_ENTER_STEP + NAV_ENTER_DUR) * 1000 + 1200;
    const t = setTimeout(() => setSettled(true), done);
    return () => clearTimeout(t);
  }, [animateIn, settled]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Retract on the way down, return on the way up. The 6px floor
      // ignores trackpad jitter and momentum wobble, which would
      // otherwise flip the bar back and forth mid-scroll.
      if (Math.abs(y - lastY.current) > 6) {
        setRetracted(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // The mobile menu is position:fixed inside this bar, and any transform
  // here would turn the bar into its containing block — so the retract is
  // suppressed while the menu is open.
  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${
        retracted && !menuOpen ? 'navbar--retracted' : ''
      } ${settled ? 'navbar--settled' : ''}`}
    >
      {/* The bar is a panel in its own right, and it is flown into place
          rather than faded in: it starts below the bottom edge of the
          screen and travels the full height up to the top, carrying its
          contents with it. No opacity in the move — it is a physical
          arrival, and fading it would undo that.

          The shadow exists only while it is in the air. It is carried on
          the element rather than in the stylesheet precisely so it can
          be animated to nothing, and it collapses over the last part of
          the travel so the panel is flat by the time it is placed. */}
      <motion.div
        className="navbar__inner"
        initial={animateIn && !reduced ? { y: riseFrom, boxShadow: SHADOW_LIFTED } : false}
        animate={animateIn && !reduced ? { y: 0, boxShadow: SHADOW_KEYS } : undefined}
        transition={{
          y: { duration: NAV_RISE_DUR, ease: EASE, delay: NAV_RISE_AT },
          boxShadow: {
            duration: NAV_RISE_DUR,
            delay: NAV_RISE_AT,
            times: [0, 0.55, 1],
            ease: 'easeOut',
          },
        }}
      >
        <a
          href="#hero"
          className={`navbar__logo ${brandHidden ? 'navbar__logo--pending' : ''}`}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          AM
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link, i) => (
            <motion.li key={link.label} {...enter(i)}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="navbar__actions">
          <motion.button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            {...enter(navLinks.length)}
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </motion.button>

          <motion.button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            {...enter(navLinks.length + 1)}
          >
            <span />
            <span />
            <span />
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
