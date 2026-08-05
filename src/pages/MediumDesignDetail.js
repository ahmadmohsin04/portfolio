import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaFigma, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import '../App.css';
import './MediumDesignDetail.css';

const FIGMA_EMBED =
  'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FZS4BXedDbppIbjpyhyByTU%2FMedium-Landing-Page%3Fnode-id%3D0-1%26t%3DTCrJQZ7arFE5aEoX-1';

const FIGMA_LIVE =
  'https://www.figma.com/design/ZS4BXedDbppIbjpyhyByTU/Medium-Landing-Page?node-id=0-1&t=TCrJQZ7arFE5aEoX-1';

const LINKEDIN_POST =
  'https://www.linkedin.com/posts/ahmad-mohsin01_figma-uiux-flutterdeveloper-share-7434875421629792257-tDfR';

const tags = ['Figma', 'UI/UX', 'Web Design', 'Design Systems', 'Mobile-First'];

const highlights = [
  { icon: '🎯', label: 'Goal', desc: 'Modernise Medium\'s landing page with a cleaner, higher-converting layout while keeping its minimalist identity.' },
  { icon: '📐', label: 'Approach', desc: 'Designed entirely in Figma before touching any code — validating the full visual direction first.' },
  { icon: '📱', label: 'Responsive', desc: 'Layout built to feel equally sharp on a desktop browser and a mobile screen.' },
  { icon: '⚡', label: 'Workflow', desc: 'Part of a design-to-code pipeline with Flutter/Dart as the intended implementation layer.' },
];

const MediumDesignDetail = () => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'figma'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-page app">
      {/* Background orbs */}
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
          <span className="section-tag">UI/UX Design · Figma</span>
          <h1 className="detail__title">
            Medium <span className="gradient-text">Landing Page</span> Redesign
          </h1>
          <p className="detail__tagline">
            A fresh take on Medium's home page — sharper hierarchy, cleaner navigation, and a
            layout built for conversion without losing the platform's signature minimalism.
            Designed entirely in Figma as part of a design-before-code workflow.
          </p>

          <div className="detail__hero-actions">
            <a
              href={FIGMA_LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <FaFigma size={15} />
              Open in Figma
            </a>
            <a
              href={LINKEDIN_POST}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <FaLinkedin size={15} />
              LinkedIn Post
              <FaExternalLinkAlt size={11} />
            </a>
          </div>

          <div className="detail__tech-strip">
            {tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ─── Design viewer ─── */}
        <div className="detail__section">
          <span className="section-tag">Design</span>
          <h2 className="detail__section-title">
            The <span className="gradient-text">design</span>
          </h2>

          {/* Tab switcher */}
          <div className="md-tabs">
            <button
              className={`md-tab ${activeTab === 'preview' ? 'md-tab--active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Screenshot Preview
            </button>
            <button
              className={`md-tab ${activeTab === 'figma' ? 'md-tab--active' : ''}`}
              onClick={() => setActiveTab('figma')}
            >
              <FaFigma size={13} /> Interactive Figma
            </button>
          </div>

          {/* Screenshot tab */}
          {activeTab === 'preview' && (
            <div className="md-preview glass-card">
              {!imgError ? (
                <img
                  src="/images/medium-redesign.png"
                  alt="Medium Landing Page Redesign"
                  className="md-preview__img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="md-preview__placeholder">
                  <FaFigma size={40} className="md-preview__placeholder-icon" />
                  <p>Screenshot not found.</p>
                  <p className="md-preview__placeholder-sub">
                    Save the design image to{' '}
                    <code>public/images/medium-redesign.png</code>
                  </p>
                  <a
                    href={FIGMA_LIVE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    style={{ marginTop: '20px' }}
                  >
                    View on Figma instead
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Figma embed tab */}
          {activeTab === 'figma' && (
            <div className="md-figma-wrapper glass-card">
              <iframe
                src={FIGMA_EMBED}
                title="Medium Landing Page Redesign — Figma"
                allowFullScreen
                className="md-figma-embed"
              />
            </div>
          )}
        </div>

        {/* ─── Highlights ─── */}
        <div className="detail__section">
          <span className="section-tag">Breakdown</span>
          <h2 className="detail__section-title">
            What went <span className="gradient-text">into it</span>
          </h2>
          <div className="md-highlights">
            {highlights.map((h) => (
              <div key={h.label} className="md-highlight glass-card">
                <div className="md-highlight__icon">{h.icon}</div>
                <div className="md-highlight__label">{h.label}</div>
                <div className="md-highlight__desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default MediumDesignDetail;
