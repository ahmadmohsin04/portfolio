import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { SwapLines, EASE } from './motion/Motion';
import './Hero.css';

const words = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  'Flutter Developer',
  'Problem Solver',
];

/* The hero rises into the gap the intro leaves behind: the curtain's
   face starts clearing at 2.15s, so this lands the words mid-reveal
   rather than stranding them behind it or leaving the page bare. */
const NAME_DELAY = 2.4;

/* Split a phrase across two rows so every arrangement occupies the
   same two-line block — the hero must not change height mid-swap. */
const twoRows = (phrase) => {
  const w = phrase.split(' ');
  const cut = Math.ceil(w.length / 2);
  return [w.slice(0, cut), w.slice(cut)];
};

const NAME_ROWS = [['Ahmad'], ['Mohsin']];

/* Name and role trade sides on every swap, and the role advances each
   time it comes back around: the reference's "same content, re-split"
   idea applied to a name and a job title. */
const PHRASES = words.flatMap((role) => [
  { left: NAME_ROWS, right: twoRows(role) },
  { left: twoRows(role), right: NAME_ROWS },
]);

const Hero = () => {
  const reduced = useReducedMotion();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section id="hero" className="hero">
      {/* The animated columns are decorative duplicates of this line —
          they carry no readable order, so the real heading lives here. */}
      <h1 className="sr-only">Ahmad Mohsin — Full Stack Developer</h1>

      <div className="hero__inner">
        <motion.div className="hero__eyebrow" {...rise(NAME_DELAY - 0.2)}>
          <span className="hero__eyebrow-dot" />
          <span className="hero__eyebrow-text">A Portfolio by</span>
        </motion.div>

        <div className="hero__display" aria-hidden="true">
          <SwapLines phrases={PHRASES} startDelay={NAME_DELAY} />
        </div>

        <motion.div className="hero__meta" {...rise(NAME_DELAY + 0.42)}>
          <p className="hero__bio">
            Software engineer exploring the full spectrum of tech — from mobile apps to scalable
            web platforms. Based in Lahore, Pakistan.
          </p>

          <div className="hero__facts">
            <p className="hero__location">Lahore, Pakistan · 2026</p>

            <div className="hero__actions">
              <a
                href="https://www.linkedin.com/in/ahmad-mohsin01"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <FaLinkedin size={15} />
                LinkedIn
              </a>
              <a href="#contact" className="btn btn--ghost" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <HiMail size={16} />
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Kinetic band, built from the same role list the typewriter uses */}
      <motion.div className="marquee hero__marquee" aria-hidden="true" {...rise(NAME_DELAY + 0.6)}>
        <div className="marquee__track">
          {[...words, ...words].map((w, i) => (
            <React.Fragment key={`${w}-${i}`}>
              <span className="marquee__item">{w}</span>
              <span className="marquee__dot" />
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <motion.button
        className="hero__scroll-cta"
        onClick={scrollToAbout}
        aria-label="Scroll down"
        {...rise(NAME_DELAY + 0.75)}
      >
        <FiArrowDown size={16} />
        <span>Scroll</span>
      </motion.button>
    </section>
  );
};

export default Hero;
