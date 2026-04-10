import React, { useState, useEffect } from 'react';
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

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = isDeleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

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
