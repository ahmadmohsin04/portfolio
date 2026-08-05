import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Takeaways, NextProject } from '../components/project/ProjectParts';
import '../App.css';
import './CryptoDetail.css';

const GITHUB = 'https://github.com/ahmadmohsin04/crypto-wallet-ui';

const screens = [
  {
    label: 'Onboarding',
    desc: '3D floating coin assets, bold tagline, and a single CTA — sets the premium tone immediately.',
  },
  {
    label: 'Dashboard',
    desc: 'Live balance, LTV gauge, earn vs loan breakdown, and a passive income nudge — all in one view.',
  },
  {
    label: 'Loan Flow',
    desc: 'Collateral and loan amount inputs with real-time APY, liquidation price, and fee breakdown.',
  },
];

const highlights = [
  {
    icon: '🌑',
    title: 'Dark-First Design',
    desc: 'Full dark theme with deep blacks and subtle contrast — the standard for serious financial UIs.',
  },
  {
    icon: '📊',
    title: 'Data-Dense, Not Cluttered',
    desc: 'LTV gauge, balance, earn/loan stats — complex financial data laid out with visual clarity.',
  },
  {
    icon: '🪙',
    title: '3D Asset Graphics',
    desc: 'Floating 3D coin icons on the landing screen give the app a polished, premium product feel.',
  },
  {
    icon: '⚡',
    title: 'Flutter UI Precision',
    desc: 'Built entirely with Flutter & Dart — pixel-perfect layouts, custom widgets, and smooth hierarchy.',
  },
];

const CryptoDetail = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(false);

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
          <span className="section-tag">Flutter UI/UX · Financial App</span>
          <h1 className="detail__title">
            Crypto <span className="crypto-gradient">Wallet UI</span>
          </h1>
          <p className="detail__tagline">
            A sleek, dark-themed cryptocurrency wallet interface built with Flutter & Dart.
            Designed to meet the visual standards of modern fintech — clean data presentation,
            premium aesthetics, and an intuitive flow from onboarding to loan management.
          </p>

          <div className="detail__hero-actions">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn crypto-btn--primary"
            >
              <FaGithub size={16} />
              View on GitHub
              <FaExternalLinkAlt size={11} />
            </a>
          </div>

          <div className="detail__tech-strip" style={{ marginTop: '24px' }}>
            {['Flutter', 'Dart', 'UI/UX', 'Dark Theme', 'Financial Design', 'Open Source'].map((t) => (
              <span key={t} className="tag crypto-tag">{t}</span>
            ))}
          </div>
        </div>

        <Takeaways
          items={[
            'Three screens: onboarding, dashboard, loan flow',
            'Built in Flutter and Dart with custom widgets',
            'Loan inputs surface live APY and liquidation price',
          ]}
        />

        {/* ─── Full showcase ─── */}
        <div className="detail__section">
          <span className="section-tag">Preview</span>
          <h2 className="detail__section-title">
            Three screens, <span className="crypto-gradient">one vision</span>
          </h2>

          <div
            className="crypto-showcase glass-card"
            onClick={() => setLightbox(true)}
            title="Click to expand"
          >
            <img
              src="/images/crypto.jpeg"
              alt="Crypto Wallet UI — three screen showcase"
              className="crypto-showcase__img"
            />
            <div className="crypto-showcase__overlay">
              Click to expand
            </div>
          </div>

          {/* Screen labels */}
          <div className="crypto-labels">
            {screens.map((s) => (
              <div key={s.label} className="crypto-label glass-card">
                <div className="crypto-label__name">{s.label}</div>
                <div className="crypto-label__desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Highlights ─── */}
        <div className="detail__section">
          <span className="section-tag">Design Decisions</span>
          <h2 className="detail__section-title">
            What makes it <span className="crypto-gradient">stand out</span>
          </h2>
          <div className="crypto-highlights">
            {highlights.map((h) => (
              <div key={h.title} className="crypto-highlight glass-card">
                <div className="crypto-highlight__icon">{h.icon}</div>
                <div className="crypto-highlight__title">{h.title}</div>
                <div className="crypto-highlight__desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── GitHub CTA ─── */}
        <div className="detail__section" style={{ paddingTop: 0, borderTop: 'none' }}>
          <div className="crypto-cta glass-card">
            <FaGithub size={30} className="crypto-cta__icon" />
            <div>
              <div className="crypto-cta__title">Source code on GitHub</div>
              <div className="crypto-cta__sub">
                Full Flutter project — custom widgets, dark theme implementation, and financial UI components.
              </div>
            </div>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn crypto-btn--primary crypto-cta__btn"
            >
              ahmadmohsin04/crypto-wallet-ui
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
        </div>

      </div>

      {/* ─── Lightbox ─── */}
      {lightbox && (
        <div className="kom-lightbox" onClick={() => setLightbox(false)}>
          <button className="kom-lightbox__close" onClick={() => setLightbox(false)}>
            <FiX size={22} />
          </button>
          <div className="crypto-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/crypto.jpeg"
              alt="Crypto Wallet UI"
              className="crypto-lightbox__img"
            />
          </div>
        </div>
      )}

      <NextProject />

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default CryptoDetail;
