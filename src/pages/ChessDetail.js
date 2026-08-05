import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { Takeaways, NextProject } from '../components/project/ProjectParts';
import '../App.css';
import './ChessDetail.css';

const LIVE     = 'https://playmasterchess.vercel.app/';
const LINKEDIN = 'https://www.linkedin.com/posts/ahmad-mohsin01_webdevelopment-javascript-chess-ugcPost-7469432174732210176-TMF8/';

const screens = [
  {
    img: '/images/chess/first.png',
    label: 'Home',
    title: 'Landing Screen',
    desc: 'Crown icon, skill-level picker, and a clean entry point — one click to start a game.',
  },
  {
    img: '/images/chess/second.png',
    label: 'Game',
    title: 'Live Board',
    desc: 'Full chessboard with dual chess clocks, move history panel, and legal-move dot indicators.',
  },
  {
    img: '/images/chess/third.png',
    label: 'Result',
    title: 'End Screen',
    desc: 'Win, loss, or draw — a clean result summary with captured pieces and a rematch prompt.',
  },
];

const features = [
  {
    icon: '♟',
    title: 'Stockfish AI',
    desc: '20 configurable skill levels — from casual blunders at level 1 to near-perfect grandmaster play at level 20.',
  },
  {
    icon: '📄',
    title: 'Single HTML File',
    desc: 'No npm. No build step. 1700+ lines in one file — open in any browser and it works immediately.',
  },
  {
    icon: '📱',
    title: 'Mobile-Optimised',
    desc: 'Board-sizing formula fills any screen without scrolling. Clocks restructured as CSS Grid siblings for clean mobile reordering.',
  },
  {
    icon: '🔊',
    title: 'Sound Engine',
    desc: 'Move and capture sounds generated via Web Audio API — distinct tones, no audio files required.',
  },
  {
    icon: '♔',
    title: 'Full Rules',
    desc: 'Castling, en passant, promotion, checkmate, stalemate, and all draw conditions handled correctly by chess.js.',
  },
  {
    icon: '⏱',
    title: 'Dual Timers',
    desc: 'Per-side chess clocks driven by a single 100ms interval. Timeout is a loss condition, not a freeze.',
  },
];

const ChessDetail = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i - 1 + screens.length) % screens.length);
  const nextImg = () => setLightbox((i) => (i + 1) % screens.length);

  return (
    <div className="detail-page app">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Topbar */}
      <div className="detail__topbar">
        <div className="detail__topbar-inner">
          <button className="detail__back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} />
            Back to Portfolio
          </button>
        </div>
      </div>

      <div className="detail__content">

        {/* ─── Hero ─── */}
        <div className="detail__hero">
          <span className="section-tag">Web App · Vanilla JS</span>
          <h1 className="detail__title">
            Chess <span className="chess-gradient">Master</span>
          </h1>
          <p className="detail__tagline">
            A fully playable chess game — Stockfish AI at 20 skill levels, dual chess clocks, move
            history, sound effects, and full mobile support. Built as a single HTML file with zero
            dependencies and deployed live on Vercel.
          </p>

          <div className="detail__hero-actions">
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn chess-btn--primary"
            >
              ♟ Play Now
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <FaLinkedin size={15} />
              LinkedIn Post
              <FaExternalLinkAlt size={11} />
            </a>
          </div>

          <div className="detail__tech-strip" style={{ marginTop: '24px' }}>
            {['HTML5', 'CSS3', 'Vanilla JS', 'chess.js', 'Stockfish AI', 'Web Workers', 'Vercel'].map((t) => (
              <span key={t} className="tag chess-tag">{t}</span>
            ))}
          </div>
        </div>

        <Takeaways
          items={[
            '20 Stockfish skill levels, beginner to grandmaster',
            '1700+ lines, one HTML file, zero build step',
            'Runs in any browser — no install, no account',
          ]}
        />

        {/* ─── Features ─── */}
        <div className="detail__section">
          <span className="section-tag">Features</span>
          <h2 className="detail__section-title">
            What it <span className="chess-gradient">does</span>
          </h2>
          <div className="chess-features">
            {features.map((f) => (
              <div key={f.title} className="chess-feature glass-card">
                <div className="chess-feature__icon">{f.icon}</div>
                <div className="chess-feature__title">{f.title}</div>
                <div className="chess-feature__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Gallery ─── */}
        <div className="detail__section">
          <span className="section-tag">Screens</span>
          <h2 className="detail__section-title">
            From opening to <span className="chess-gradient">checkmate</span>
          </h2>
          <p className="detail__section-sub">Click any screen to expand it.</p>

          <div className="chess-gallery">
            {screens.map((s, i) => (
              <div
                key={s.title}
                className="chess-gallery__item glass-card"
                onClick={() => openLightbox(i)}
              >
                <div className="chess-gallery__img-wrap">
                  <img src={s.img} alt={s.title} className="chess-gallery__img" loading="lazy" decoding="async" />
                  <div className="chess-gallery__overlay">View full screen</div>
                </div>
                <div className="chess-gallery__meta">
                  <span className="chess-screen-badge">{s.label}</span>
                  <div className="chess-gallery__title">{s.title}</div>
                  <div className="chess-gallery__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Live CTA ─── */}
        <div className="detail__section chess-cta-section">
          <div className="chess-cta glass-card">
            <div className="chess-cta__icon">♚</div>
            <div>
              <div className="chess-cta__title">Live on Vercel</div>
              <div className="chess-cta__sub">
                Play directly in the browser — no install, no account. Just chess.
              </div>
            </div>
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn chess-btn--primary chess-cta__btn"
            >
              playmasterchess.vercel.app
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
        </div>

      </div>

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div className="kom-lightbox" onClick={closeLightbox}>
          <button className="kom-lightbox__close" onClick={closeLightbox}>
            <FiX size={22} />
          </button>
          <button
            className="kom-lightbox__nav kom-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            ‹
          </button>
          <div className="kom-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={screens[lightbox].img}
              alt={screens[lightbox].title}
              className="kom-lightbox__img"
            />
            <div className="kom-lightbox__caption">
              <span className="chess-gradient">{screens[lightbox].label}</span>
              {' · '}
              {screens[lightbox].title}
            </div>
          </div>
          <button
            className="kom-lightbox__nav kom-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            ›
          </button>
        </div>
      )}

      <NextProject />

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default ChessDetail;
