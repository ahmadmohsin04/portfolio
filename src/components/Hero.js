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
      <div className={`hero__content ${mounted ? 'hero__content--visible' : ''}`}>
        <div className="hero__greeting">Hello, I'm</div>

        <h1 className="hero__name">
          Ahmad <span className="gradient-text">Mohsin</span>
        </h1>

        <div className="hero__typewriter">
          <span className="hero__type-text">{displayText}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </div>

        <p className="hero__bio">
          Software engineer exploring the full spectrum of tech — from mobile apps to scalable
          web platforms. Based in Lahore, Pakistan.
        </p>

        <div className="hero__actions">
          <a
            href="https://www.linkedin.com/in/ahmad-mohsin01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            <FaLinkedin size={16} />
            LinkedIn
          </a>
          <a href="#contact" className="btn btn--ghost" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <HiMail size={17} />
            Get in Touch
          </a>
        </div>
      </div>

      <button className="hero__scroll-cta" onClick={scrollToAbout} aria-label="Scroll down">
        <FiArrowDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
