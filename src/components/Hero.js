import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { MaskedText, EASE } from './motion/Motion';
import './Hero.css';

const words = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  'Flutter Developer',
  'Problem Solver',
];

const TYPING_SPEED   = 110;
const DELETING_SPEED = 55;
const PAUSE_AFTER    = 2000;
const PAUSE_BEFORE   = 350;

/* The name rises as the intro curtain clears the screen. */
const NAME_DELAY = 1.05;

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const reduced = useReducedMotion();

  const timerRef    = useRef(null);
  const textRef     = useRef('');
  const wordIdxRef  = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = words[wordIdxRef.current];
      if (!deletingRef.current) {
        textRef.current = current.slice(0, textRef.current.length + 1);
        setDisplayText(textRef.current);
        if (textRef.current === current) {
          deletingRef.current = true;
          timerRef.current = setTimeout(tick, PAUSE_AFTER);
        } else {
          timerRef.current = setTimeout(tick, TYPING_SPEED);
        }
      } else {
        textRef.current = current.slice(0, textRef.current.length - 1);
        setDisplayText(textRef.current);
        if (textRef.current === '') {
          deletingRef.current = false;
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
          timerRef.current = setTimeout(tick, PAUSE_BEFORE);
        } else {
          timerRef.current = setTimeout(tick, DELETING_SPEED);
        }
      }
    };
    timerRef.current = setTimeout(tick, reduced ? 300 : 1900);

    return () => clearTimeout(timerRef.current);
  }, [reduced]);

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
      <div className="hero__inner">
        <motion.div className="hero__eyebrow" {...rise(NAME_DELAY - 0.2)}>
          <span className="hero__eyebrow-dot" />
          <span className="hero__eyebrow-text">A Portfolio by</span>
        </motion.div>

        {/* Stacked display type, revealed one masked line at a time */}
        <h1 className="hero__name">
          <MaskedText
            text="Ahmad Mohsin"
            block
            animateOnMount
            delay={NAME_DELAY}
            stagger={0.11}
            duration={0.95}
            wordClassName={(w) => (w === 'Mohsin' ? 'hero__name-line--accent' : '')}
          />
        </h1>

        <motion.div className="hero__meta" {...rise(NAME_DELAY + 0.42)}>
          <div className="hero__typewriter">
            <span className="hero__type-text">{displayText}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </div>

          <div className="hero__facts">
            <p className="hero__bio">
              Software engineer exploring the full spectrum of tech — from mobile apps to scalable
              web platforms. Based in Lahore, Pakistan.
            </p>

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
