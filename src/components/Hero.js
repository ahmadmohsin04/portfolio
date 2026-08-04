import React, { useState, useEffect, useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
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

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [mounted, setMounted] = useState(false);

  const timerRef    = useRef(null);
  const textRef     = useRef('');
  const wordIdxRef  = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    setMounted(true);

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
    timerRef.current = setTimeout(tick, 600);

    return () => clearTimeout(timerRef.current);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className={`hero__inner ${mounted ? 'hero__inner--visible' : ''}`}>
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          <span className="hero__eyebrow-text">A Portfolio by</span>
        </div>

        {/* Stacked display type — the signature of this layout */}
        <h1 className="hero__name">
          <span className="hero__name-line">Ahmad</span>
          <span className="hero__name-line hero__name-line--accent">Mohsin</span>
        </h1>

        <div className="hero__meta">
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
        </div>
      </div>

      {/* Kinetic band, built from the same role list the typewriter uses */}
      <div className="marquee hero__marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...words, ...words].map((w, i) => (
            <React.Fragment key={`${w}-${i}`}>
              <span className="marquee__item">{w}</span>
              <span className="marquee__dot" />
            </React.Fragment>
          ))}
        </div>
      </div>

      <button className="hero__scroll-cta" onClick={scrollToAbout} aria-label="Scroll down">
        <FiArrowDown size={16} />
        <span>Scroll</span>
      </button>
    </section>
  );
};

export default Hero;
