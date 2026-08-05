import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { Takeaways, NextProject } from '../components/project/ProjectParts';
import '../App.css';
import './HabitTrackerDetail.css';

const GITHUB = 'https://github.com/ahmadmohsin04/Habit-Tracker-App';
const LINKEDIN = 'https://www.linkedin.com/posts/ahmad-mohsin01_flutter-dart-mobiledevelopment-activity-7377646604616552448-8AZD';

const screens = [
  {
    img: '/images/HabitTracker/hb1.jpeg',
    title: 'Splash Screen',
    theme: 'Dark',
    themeColor: '#1a1a1a',
    desc: 'Clean, minimal launch screen. Sets the tone — no noise, just the name.',
  },
  {
    img: '/images/HabitTracker/hb2.jpeg',
    title: 'Home — Light Mode',
    theme: 'Light',
    themeColor: '#f8f8f8',
    desc: 'Week navigator at the top with today highlighted. Habits listed below — tap to check off. All four marked done.',
  },
  {
    img: '/images/HabitTracker/hb3.jpeg',
    title: 'Theme Toggle',
    theme: 'Transitioning',
    themeColor: '#e0e0e0',
    desc: 'The light/dark mode switch — simple toggle between themes. Heatmap blocks visible on the right edge.',
  },
  {
    img: '/images/HabitTracker/hb4.jpeg',
    title: 'Heatmap — Dark Mode',
    theme: 'Dark',
    themeColor: '#1a1a1a',
    desc: 'Dark mode activated. Monthly heatmap in green tones shows which days habits were completed at a glance.',
  },
  {
    img: '/images/HabitTracker/hb5.jpeg',
    title: 'Home — Dark Mode',
    theme: 'Dark',
    themeColor: '#1a1a1a',
    desc: 'Full dark theme with the same clean habit list — Sleeping, Coding, Running, Debugging — all checked for the day.',
  },
];

const features = [
  {
    icon: '✅',
    title: 'Habit Management',
    desc: 'Add, rename, and delete habits with a clean minimal interface. No clutter, just your list.',
  },
  {
    icon: '📅',
    title: 'Daily Check-ins',
    desc: 'Tap to mark habits complete for the day. Week view shows your progress across the past 7 days.',
  },
  {
    icon: '🗃️',
    title: 'ISAR Database',
    desc: 'All data stored locally using ISAR — fast, offline-first, and zero cloud dependency.',
  },
  {
    icon: '🔥',
    title: 'Progress Heatmap',
    desc: 'GitHub-style monthly heatmap that turns your consistency into a satisfying visual.',
  },
  {
    icon: '🌙',
    title: 'Light & Dark Mode',
    desc: 'Full theme support with a single toggle. Both modes look equally polished.',
  },
  {
    icon: '📦',
    title: 'Open Source',
    desc: 'Full source code on GitHub — clean architecture, readable Dart, no shortcuts.',
  },
];

const HabitTrackerDetail = () => {
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
          <span className="section-tag">Flutter App · Open Source</span>
          <h1 className="detail__title">
            Habit <span className="ht-gradient">Tracker</span>
          </h1>
          <p className="detail__tagline">
            A fully functional habit tracking app built with Flutter & Dart. Track daily habits,
            visualise monthly consistency through a heatmap, and switch between light and dark
            mode — all stored locally with ISAR for a fast, offline-first experience.
          </p>

          <div className="detail__hero-actions">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ht-btn--primary"
            >
              <FaGithub size={16} />
              View on GitHub
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
            {['Flutter', 'Dart', 'ISAR Database', 'Heatmap', 'Light & Dark Mode', 'Open Source'].map((t) => (
              <span key={t} className="tag ht-tag">{t}</span>
            ))}
          </div>
        </div>

        <Takeaways
          items={[
            'Flutter and Dart app for daily habit check-ins',
            'Local ISAR database, offline-first with no cloud dependency',
            'GitHub-style heatmap shows completed days at a glance',
          ]}
        />

        {/* ─── Features ─── */}
        <div className="detail__section">
          <span className="section-tag">Features</span>
          <h2 className="detail__section-title">
            What it <span className="ht-gradient">does</span>
          </h2>
          <div className="ht-features">
            {features.map((f) => (
              <div key={f.title} className="ht-feature glass-card">
                <div className="ht-feature__icon">{f.icon}</div>
                <div className="ht-feature__title">{f.title}</div>
                <div className="ht-feature__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Gallery ─── */}
        <div className="detail__section">
          <span className="section-tag">Screens</span>
          <h2 className="detail__section-title">
            Light, dark & <span className="ht-gradient">everything in between</span>
          </h2>
          <p className="detail__section-sub">Click any screen to expand it.</p>

          <div className="ht-gallery">
            {screens.map((s, i) => (
              <div
                key={s.title}
                className="ht-gallery__item glass-card"
                onClick={() => openLightbox(i)}
              >
                <div className="ht-gallery__img-wrap">
                  <img src={s.img} alt={s.title} className="ht-gallery__img" loading="lazy" decoding="async" />
                  <div className="ht-gallery__overlay">View full screen</div>
                </div>
                <div className="ht-gallery__meta">
                  <span className={`ht-theme-badge ht-theme-badge--${s.theme.toLowerCase().replace(' ', '-')}`}>
                    {s.theme}
                  </span>
                  <div className="ht-gallery__title">{s.title}</div>
                  <div className="ht-gallery__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── GitHub CTA ─── */}
        <div className="detail__section ht-cta-section">
          <div className="ht-cta glass-card">
            <FaGithub size={32} className="ht-cta__icon" />
            <div>
              <div className="ht-cta__title">Source code is public</div>
              <div className="ht-cta__sub">
                Clean Flutter architecture, ISAR integration, and full theme support — all on GitHub.
              </div>
            </div>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ht-btn--primary ht-cta__btn"
            >
              ahmadmohsin04/Habit-Tracker-App
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
              <span className="ht-gradient">{screens[lightbox].theme}</span>
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

export default HabitTrackerDetail;
