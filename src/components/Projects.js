import React from 'react';
import { FaLinkedin, FaExternalLinkAlt, FaArrowRight, FaFigma, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Projects.css';

const projects = [
  {
    title: 'Codebase Cartographer',
    tech: ['Next.js', 'TypeScript', 'React Flow', 'Anthropic API', 'GitHub API'],
    desc: 'Paste any public GitHub repo and get an interactive, narrated map of its architecture — a dependency graph, a guided tour, and a plain-English explanation of every file. Handles 1,000+ file repos across 8 languages.',
    link: '/projects/codebase-cartographer',
    live: 'https://codebase-cartographer-mohsin.vercel.app',
    liveLabel: 'Live Demo',
    github: 'https://github.com/ahmadmohsin04/codebase_cartographer',
    featured: false,
    type: 'tool',
  },
  {
    title: 'Al-Mushtaraka',
    tech: ['React', 'Supabase', 'jsPDF', 'React Router'],
    desc: 'A production-grade trading operations platform — multi-module system with agreements, remote signing, customer management, admin panel, and PDF generation.',
    link: '/projects/almushtaraka',
    live: 'https://www.almushtaraka.com',
    featured: true,
    type: 'web',
  },
  {
    title: 'Real-Time Stock Pipeline',
    tech: ['Python', 'pandas', 'SQLAlchemy', 'Streamlit', 'Docker'],
    desc: 'An automated data pipeline that ingests live stock prices every 60 seconds, validates and stores them, computes trading metrics, and serves it all on a live auto-refreshing dashboard. Containerized, tested, and deployed.',
    link: '/projects/stock-pipeline',
    live: 'https://stock-dashboard-qh6l.onrender.com',
    github: 'https://github.com/ahmadmohsin04/realtime-stock-pipeline',
    featured: false,
    type: 'data',
  },
  {
    title: 'Chess Master',
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'chess.js', 'Stockfish AI'],
    desc: 'A fully playable chess game — Stockfish AI at 20 skill levels, dual chess clocks, move history, and sound effects. Built as a single HTML file with zero dependencies.',
    link: '/projects/chess-master',
    live: 'https://playmasterchess.vercel.app/',
    linkedin: 'https://www.linkedin.com/posts/ahmad-mohsin01_webdevelopment-javascript-chess-ugcPost-7469432174732210176-TMF8/',
    featured: false,
    type: 'web',
  },
  {
    title: 'Habit Tracker',
    tech: ['Flutter', 'Dart', 'ISAR Database'],
    desc: 'A fully built Flutter app for tracking daily habits. Features a weekly check-in system, monthly heatmap, local ISAR storage, and full light & dark mode support. Open source on GitHub.',
    link: '/projects/habit-tracker',
    live: 'https://github.com/ahmadmohsin04/Habit-Tracker-App',
    linkedin: null,
    featured: false,
    type: 'app',
  },
  {
    title: 'Crypto Wallet UI',
    tech: ['Flutter', 'Dart', 'UI/UX'],
    desc: 'A dark-themed cryptocurrency wallet interface — onboarding, live balance dashboard with LTV gauge, and a loan management flow. Built to fintech UI standards.',
    link: '/projects/crypto-wallet',
    live: 'https://github.com/ahmadmohsin04/crypto-wallet-ui',
    linkedin: null,
    featured: false,
    type: 'design',
  },
  {
    title: 'Komorebi — Student App',
    tech: ['Flutter', 'Dart', 'UI/UX', 'Mobile Design'],
    desc: 'A student companion app with 7 screens across academics, productivity, and campus life — schedule, notes, planner, tasks, focus timer, and attendance. Backend in development.',
    link: '/projects/komorebi',
    live: null,
    linkedin: null,
    featured: false,
    type: 'design',
  },
  {
    title: 'Medium — Landing Page Redesign',
    tech: ['Figma', 'UI/UX', 'Design Systems'],
    desc: "A modern redesign of Medium's landing page — cleaner layout, sharper hierarchy, and a high-conversion feel that holds up equally well on desktop and mobile. Designed in Figma as part of a design-before-code workflow.",
    link: '/projects/medium-redesign',
    live: 'https://www.figma.com/design/ZS4BXedDbppIbjpyhyByTU/Medium-Landing-Page?node-id=0-1',
    linkedin: 'https://www.linkedin.com/posts/ahmad-mohsin01_figma-uiux-flutterdeveloper-share-7434875421629792257-tDfR',
    featured: false,
    type: 'design',
  },
];

const Projects = () => {
  return (
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
          <p className="section-subtitle">
            I focus on web development, working on production-scale applications.
          </p>
        </Reveal>

        <StaggerGroup className="projects__grid" stagger={0.06}>
          {projects.map((p) => (
            <StaggerItem
              key={p.title}
              className={`project-card glass-card ${p.featured ? 'project-card--featured' : ''} project-card--${p.type}`}
            >
              {p.featured && <div className="project-card__badge">Featured Project</div>}
              {p.type === 'web' && !p.featured && (
                <div className="project-card__badge project-card__badge--web">
                  🌐 Web App
                </div>
              )}
              {p.type === 'design' && (
                <div className="project-card__badge project-card__badge--design">
                  <FaFigma size={10} /> UI/UX Design
                </div>
              )}
              {p.type === 'app' && (
                <div className="project-card__badge project-card__badge--app">
                  📱 Flutter App
                </div>
              )}
              {p.type === 'data' && (
                <div className="project-card__badge project-card__badge--data">
                  📊 Data Engineering
                </div>
              )}
              {p.type === 'tool' && (
                <div className="project-card__badge project-card__badge--tool">
                  🧭 Developer Tool
                </div>
              )}
              <div className="project-card__body">
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-card__actions">
                {p.link && (
                  <Link to={p.link} className="btn btn--primary project-card__view-btn">
                    View Project
                    <FaArrowRight size={13} />
                  </Link>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${p.link ? 'btn--ghost' : 'btn--primary'} project-card__live-btn`}
                  >
                    {p.type === 'design'
                      ? <><FaFigma size={13} /> View Design</>
                      : <>{p.liveLabel || (p.type === 'data' ? 'Live Demo' : 'Live Site')} <FaExternalLinkAlt size={11} /></>}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost project-card__live-btn"
                  >
                    <FaGithub size={14} /> Code
                  </a>
                )}
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost project-card__live-btn"
                  >
                    <FaLinkedin size={14} /> Post
                  </a>
                )}
              </div>
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
};

export default Projects;
