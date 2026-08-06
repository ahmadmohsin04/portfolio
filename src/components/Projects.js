import React from 'react';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Projects.css';

/* `shot` is the hover preview. Al-Mushtaraka has no screenshot in the
   repo, so it simply renders without one — the row degrades rather than
   leaving a hole. */
const projects = [
  {
    title: 'Al-Mushtaraka',
    stack: 'React · Supabase · jsPDF',
    note: 'A production trading platform, running live with real customers.',
    link: '/projects/almushtaraka',
    lead: true,
    live: true,
  },
  {
    title: 'Codebase Cartographer',
    stack: 'Next.js · TypeScript · Anthropic API',
    link: '/projects/codebase-cartographer',
    shot: '/images/cartographer/overview.webp',
    live: true,
  },
  {
    title: 'Real-Time Stock Pipeline',
    stack: 'Python · pandas · Docker',
    link: '/projects/stock-pipeline',
    shot: '/images/stock-pipeline/dashboard.png',
    live: true,
  },
  {
    title: 'Chess Master',
    stack: 'Vanilla JS · chess.js · Stockfish',
    link: '/projects/chess-master',
    shot: '/images/chess/first.png',
    live: true,
  },
  {
    title: 'Habit Tracker',
    stack: 'Flutter · Dart · ISAR',
    link: '/projects/habit-tracker',
    shot: '/images/HabitTracker/hb1.jpeg',
  },
  {
    title: 'Crypto Wallet UI',
    stack: 'Flutter · Dart · UI/UX',
    link: '/projects/crypto-wallet',
    shot: '/images/crypto.jpeg',
  },
  {
    title: 'Komorebi',
    stack: 'Flutter · Dart · Mobile Design',
    link: '/projects/komorebi',
    shot: '/images/Komorebi/kom1.jpeg',
  },
  {
    title: 'Medium — Landing Page',
    stack: 'Figma · UI/UX · Design Systems',
    link: '/projects/medium-redesign',
    shot: '/images/medium-redesign.png',
  },
];

const Projects = () => (
  <section id="projects" className="section">
    <div className="section-inner">
      <Reveal>
        <span className="section-tag">Work</span>
      </Reveal>

      <h2 className="section-title">
        <MaskedText
          text="Things I've built"
          wordClassName={(w, i) => (i >= 2 ? 'gradient-text' : '')}
        />
      </h2>

      <Reveal delay={0.1}>
        <p className="idx__lead">
          Eight projects, newest first. Every one opens onto its own page.
        </p>
      </Reveal>

      <StaggerGroup className="idx" stagger={0.05}>
        {projects.map((p, i) => (
          <StaggerItem key={p.title}>
            <Link to={p.link} className={`idx__row ${p.lead ? 'idx__row--lead' : ''}`}>
              <span className="idx__num">{String(i + 1).padStart(2, '0')}</span>

              <span className="idx__body">
                <span className="idx__title">{p.title}</span>
                {p.note && <span className="idx__note">{p.note}</span>}
              </span>

              <span className="idx__meta">
                {p.stack}
                {p.live && <span className="idx__live">Live</span>}
              </span>

              <span className="idx__arrow">
                <FiArrowUpRight size={22} />
              </span>

              {p.shot && (
                <span className="idx__preview" aria-hidden="true">
                  <img src={p.shot} alt="" loading="lazy" decoding="async" />
                </span>
              )}
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="projects__cta" delay={0.05}>
        <a
          href="https://www.linkedin.com/in/ahmad-mohsin01"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost projects__linkedin-btn"
        >
          <FaLinkedin size={18} />
          More on LinkedIn
          <FaExternalLinkAlt size={11} />
        </a>
      </Reveal>
    </div>
  </section>
);

export default Projects;
