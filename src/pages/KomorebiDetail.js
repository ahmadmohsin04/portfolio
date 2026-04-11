import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import '../App.css';
import './KomorebiDetail.css';

const screens = [
  {
    img: '/images/Komorebi/kom1.jpeg',
    title: 'Schedule',
    category: 'Academics',
    color: '#7c6ff7',
    desc: 'Weekly class timetable with day-by-day navigation, attendance tracking per class, and a quick-add shortcut.',
  },
  {
    img: '/images/Komorebi/kom2.jpeg',
    title: 'Notes',
    category: 'Academics',
    color: '#f43f8e',
    desc: 'Subject-filtered note cards — jot, organise, and retrieve notes per course without the clutter.',
  },
  {
    img: '/images/Komorebi/kom4.jpeg',
    title: 'Planner',
    category: 'Academics',
    color: '#9b5cf6',
    desc: 'Weekly goal planner to lay out study objectives, due dates, and active plans at a glance.',
  },
  {
    img: '/images/Komorebi/kom3.jpeg',
    title: 'Tasks',
    category: 'Productivity',
    color: '#f59e0b',
    desc: 'Filterable task list by type — assignments, quizzes, class activities — with completion tracking and due dates.',
  },
  {
    img: '/images/Komorebi/kom6.jpeg',
    title: 'Focus',
    category: 'Productivity',
    color: '#fbbf24',
    desc: 'Pomodoro-style focus timer to help students stay in the zone. Tracks focus time and streak per session.',
  },
  {
    img: '/images/Komorebi/kom5.jpeg',
    title: 'Attendance',
    category: 'Campus Life',
    color: '#6366f1',
    desc: 'Overall and per-subject attendance overview with visual progress bars and class count breakdown.',
  },
];

const modules = [
  {
    icon: '📚',
    label: 'Academics',
    color: '#7c6ff7',
    items: ['Schedule', 'Notes', 'Planner'],
  },
  {
    icon: '⚡',
    label: 'Productivity',
    color: '#f59e0b',
    items: ['Tasks', 'Focus Timer'],
  },
  {
    icon: '🎓',
    label: 'Campus Life',
    color: '#6366f1',
    items: ['Attendance', 'Digital Card'],
  },
];

const KomorebiDetail = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null); // index of active screen

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i - 1 + screens.length) % screens.length);
  const nextImg = () => setLightbox((i) => (i + 1) % screens.length);

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
          <span className="section-tag">Mobile App Design · Flutter / Dart</span>
          <h1 className="detail__title">
            <span className="gradient-text">Komorebi</span>
          </h1>
          <p className="detail__tagline">
            A student companion app designed to bring clarity to campus life. Komorebi
            consolidates academics, productivity, and campus essentials into one clean,
            colour-coded interface — purpose-built for the way students actually work.
          </p>

          <div className="kom-coming-soon">
            <span className="kom-coming-soon__dot" />
            Backend in development — full release coming soon
          </div>

          <div className="detail__tech-strip" style={{ marginTop: '24px' }}>
            {['Flutter', 'Dart', 'UI/UX', 'Mobile Design', 'Figma'].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ─── Module overview ─── */}
        <div className="detail__section">
          <span className="section-tag">Structure</span>
          <h2 className="detail__section-title">
            7 screens, <span className="gradient-text">3 pillars</span>
          </h2>
          <p className="detail__section-sub">
            Every screen belongs to one of three core pillars of student life.
          </p>
          <div className="kom-modules">
            {modules.map((m) => (
              <div key={m.label} className="kom-module glass-card" style={{ '--accent': m.color }}>
                <div className="kom-module__icon">{m.icon}</div>
                <div className="kom-module__label">{m.label}</div>
                <ul className="kom-module__list">
                  {m.items.map((item) => (
                    <li key={item}>
                      <span className="kom-module__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Screen gallery ─── */}
        <div className="detail__section">
          <span className="section-tag">Screens</span>
          <h2 className="detail__section-title">
            A look <span className="gradient-text">inside</span>
          </h2>
          <p className="detail__section-sub">Click any screen to expand it.</p>

          <div className="kom-gallery">
            {screens.map((s, i) => (
              <div
                key={s.title}
                className="kom-gallery__item glass-card"
                onClick={() => openLightbox(i)}
                style={{ '--accent': s.color }}
              >
                <div className="kom-gallery__img-wrap">
                  <img src={s.img} alt={s.title} className="kom-gallery__img" loading="lazy" decoding="async" />
                  <div className="kom-gallery__overlay">
                    <span>View full screen</span>
                  </div>
                </div>
                <div className="kom-gallery__meta">
                  <span className="kom-gallery__category" style={{ color: s.color }}>
                    {s.category}
                  </span>
                  <div className="kom-gallery__title">{s.title}</div>
                  <div className="kom-gallery__desc">{s.desc}</div>
                </div>
              </div>
            ))}
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
              <span style={{ color: screens[lightbox].color }}>
                {screens[lightbox].category}
              </span>
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

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default KomorebiDetail;
