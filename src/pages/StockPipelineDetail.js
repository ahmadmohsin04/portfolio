import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaGithub, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';
import '../App.css';
import './StockPipelineDetail.css';

const LIVE     = 'https://stock-dashboard-qh6l.onrender.com';
const GITHUB   = 'https://github.com/ahmadmohsin04/realtime-stock-pipeline';
const YOUTUBE  = 'https://www.youtube.com/watch?v=HT6rHe7N0Zs';
const YT_EMBED = 'https://www.youtube.com/embed/HT6rHe7N0Zs';

const stats = [
  { value: '4',    label: 'Tickers polled live' },
  { value: '60s',  label: 'Ingestion cycle' },
  { value: '2',    label: 'Storage layers' },
  { value: 'CI',   label: 'On every push' },
];

const pipeline = [
  {
    stage: 'Source',
    title: 'yfinance API',
    tech: 'yfinance',
    desc: 'Live price data for AAPL, MSFT, GOOGL and TSLA — pulled from a real external market feed, not a static dataset.',
  },
  {
    stage: 'Ingestion',
    title: 'Scheduled Polling Loop',
    tech: 'APScheduler + Pydantic',
    desc: 'Runs unattended every 60 seconds. Every incoming record is validated by pydantic before it gets anywhere near storage — malformed data is rejected at the door.',
  },
  {
    stage: 'Storage · Raw',
    title: 'price_records',
    tech: 'SQLite + SQLAlchemy',
    desc: 'An untouched historical record. A unique constraint on (ticker, timestamp) makes duplicate writes structurally impossible rather than something to remember to check for.',
  },
  {
    stage: 'Processing',
    title: 'Derived Metrics',
    tech: 'pandas',
    desc: 'Rolling calculations over the raw history — 5- and 20-period simple moving averages, 5-period momentum percentage, and rolling volatility.',
  },
  {
    stage: 'Storage · Derived',
    title: 'processed_metrics',
    tech: 'Separate table',
    desc: 'Calculated numbers live apart from raw history, so the whole metric set can be safely recomputed at any time without ever touching the source of truth.',
  },
  {
    stage: 'Serving',
    title: 'Live Dashboard',
    tech: 'Streamlit + Plotly',
    desc: 'Auto-refreshing every 30 seconds — ticker selector, summary metric cards, and an interactive price chart with moving averages overlaid.',
  },
];

const features = [
  {
    icon: '⏱',
    title: 'Unattended Ingestion',
    desc: 'APScheduler polls four tickers every 60 seconds and keeps running without supervision — a pipeline, not a one-off script.',
  },
  {
    icon: '🛡',
    title: 'Validation at the Door',
    desc: 'Pydantic models reject malformed or invalid price records before they can reach the database and poison downstream metrics.',
  },
  {
    icon: '🔒',
    title: 'Database-Level Dedup',
    desc: 'A unique constraint on (ticker, timestamp) means repeated polls during closed market hours can never create duplicate rows.',
  },
  {
    icon: '📈',
    title: 'Trading Metrics',
    desc: 'pandas rolling windows compute SMA(5), SMA(20), 5-period momentum and volatility — with edge cases for insufficient history handled.',
  },
  {
    icon: '🐳',
    title: 'Fully Containerized',
    desc: 'Docker and Docker Compose wrap the whole stack, and it runs live on the public internet — not a local notebook demo.',
  },
  {
    icon: '✅',
    title: 'Tested & CI-Backed',
    desc: 'pytest covers the calculation and validation logic, running automatically on every push through GitHub Actions.',
  },
];

const screens = [
  {
    img: '/images/stock-pipeline/dashboard.png',
    label: 'Dashboard',
    title: 'Live Summary View',
    desc: 'Ticker selector, four summary metric cards, and the price chart with moving averages — auto-refreshing off the live pipeline.',
  },
  {
    img: '/images/stock-pipeline/chart-data.png',
    label: 'Raw Data',
    title: 'Chart & Underlying Records',
    desc: 'The Plotly chart expanded alongside the raw stored rows — close price, SMA(5) and SMA(20) straight out of the metrics table.',
  },
];

const decisions = [
  {
    q: 'SQLite over PostgreSQL',
    a: 'Zero setup overhead, and it comfortably handles the write volume of a handful of tickers polled once a minute. SQLAlchemy is used as an abstraction layer rather than raw SQLite-specific queries — migrating to PostgreSQL later means changing a connection string, not rewriting models or queries.',
  },
  {
    q: 'A unique constraint over app-level dedup',
    a: 'Enforcing uniqueness at the database layer makes duplicate writes structurally impossible instead of relying on every write path remembering to check. The database rejects the insert; the application catches that specific error and logs it as a harmless skip.',
  },
  {
    q: 'Raw and processed data in separate tables',
    a: 'It keeps the pipeline stages honestly separated — ingestion never has to know how metrics are calculated, and processing can be re-run at any time without corrupting historical price data. A pattern borrowed from real production pipelines.',
  },
  {
    q: 'Scheduler in-process with the dashboard',
    a: "Render's free tier gives separate services isolated, ephemeral filesystems — no shared storage. Running the scheduler as a background thread inside the Streamlit process lets ingestion and serving share one SQLite file: a deliberate tradeoff for a single-instance free deployment, documented in the repo rather than left as a silent workaround.",
  },
];

const challenges = [
  {
    problem: 'A third-party API changed its response format mid-project.',
    solution:
      "yfinance's pinned version stopped working entirely partway through development because Yahoo Finance updated its backend. Fixed by upgrading and switching from an exact version pin to a minimum-version constraint — this one dependency needs to track upstream more loosely than the rest of the stack.",
  },
  {
    problem: 'Log messages were vanishing with no errors at all.',
    solution:
      'Logs from imported modules were silently disappearing because handlers had been attached to the wrong logger instance. Fixed by configuring the root logger directly so every module propagates correctly.',
  },
  {
    problem: 'A three-layer dependency conflict inside Docker.',
    solution:
      'A missing system library (libgomp1) caused a bare segmentation fault with no Python traceback. Fixing that exposed an incompatible pyarrow build, and fixing that exposed an ABI mismatch with an auto-installed numpy 2.x. Resolved by explicitly pinning all three to mutually compatible versions — not pinning one and hoping.',
  },
  {
    problem: 'An architecture constraint that only appeared in production.',
    solution:
      "Splitting the scheduler and dashboard into separate services worked flawlessly locally via a shared Docker volume, then broke immediately on Render because free-tier services don't share disk. Required redesigning the deployment into a single process — a decision that was invisible until it was actually hosted.",
  },
  {
    problem: 'Silent data duplication during closed market hours.',
    solution:
      'A live API returns the same "last traded" value repeatedly when markets are closed, so the pipeline had to distinguish "no new data yet" from "a real new data point" — solved with the database-level uniqueness constraint.',
  },
];

const stack = [
  { group: 'Core',      items: ['Python 3.11', 'pandas', 'Pydantic'] },
  { group: 'Pipeline',  items: ['APScheduler', 'yfinance'] },
  { group: 'Storage',   items: ['SQLite', 'SQLAlchemy'] },
  { group: 'Interface', items: ['Streamlit', 'Plotly'] },
  { group: 'Ops',       items: ['Docker', 'Docker Compose', 'GitHub Actions', 'pytest', 'Render'] },
];

const nextSteps = [
  'Migrate to PostgreSQL with a managed database add-on for a fully persistent, always-on deployment',
  'Add configurable alerting — a webhook notification when a price threshold is crossed',
  'Layer a lightweight forecasting model on top of the stored historical data',
  'Move to an always-on instance with a separate worker to remove the free-tier traffic limitation',
];

const StockPipelineDetail = () => {
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
          <span className="section-tag">Data Engineering · Python</span>
          <h1 className="detail__title">
            Real-Time Stock <span className="pipe-gradient">Pipeline</span>
          </h1>
          <p className="detail__tagline">
            A live-updating dashboard that ingests real-time stock prices through an automated
            pipeline, computes trading metrics, and visualizes trends — built, tested, containerized
            and deployed end to end.
          </p>

          <div className="detail__hero-actions">
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn pipe-btn--primary"
            >
              <span className="pipe-live-dot" />
              View Live Dashboard
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <FaYoutube size={16} />
              Watch Demo
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <FaGithub size={15} />
              Source Code
              <FaExternalLinkAlt size={11} />
            </a>
          </div>

          <div className="pipe-note">
            <span className="pipe-note__icon">☕</span>
            Hosted on a free tier — the app spins down after 15 minutes of inactivity, so the first
            visit takes 30–60 seconds to wake up.
          </div>

          <div className="detail__tech-strip" style={{ marginTop: '24px' }}>
            {['Python', 'pandas', 'Pydantic', 'SQLAlchemy', 'APScheduler', 'Streamlit', 'Plotly', 'Docker', 'GitHub Actions'].map((t) => (
              <span key={t} className="tag pipe-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ─── Stats ─── */}
        <div className="pipe-stats">
          {stats.map((s) => (
            <div key={s.label} className="pipe-stat glass-card">
              <div className="pipe-stat__value">{s.value}</div>
              <div className="pipe-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ─── The Problem ─── */}
        <div className="detail__section">
          <span className="section-tag">The Problem</span>
          <h2 className="detail__section-title">
            Raw feeds don't turn <span className="pipe-gradient">themselves</span> into insight
          </h2>
          <p className="pipe-prose">
            APIs, streams and scrapers are noisy, arrive continuously, and don't organise themselves
            into anything usable. Doing that reliably takes more than a one-off script: it needs a
            pipeline that runs unattended, handles failure gracefully, stores data in a queryable
            form, and surfaces something meaningful from it. This project solves that end to end for
            live stock price data — and ships as a real, working product rather than a local
            notebook demo.
          </p>
        </div>

        {/* ─── Architecture ─── */}
        <div className="detail__section">
          <span className="section-tag">Architecture</span>
          <h2 className="detail__section-title">
            Six stages, <span className="pipe-gradient">cleanly separated</span>
          </h2>
          <p className="detail__section-sub">
            Every stage owns one responsibility and hands off to the next.
          </p>

          <div className="pipe-flow">
            {pipeline.map((p, i) => (
              <div key={p.title} className="pipe-flow__row">
                <div className="pipe-flow__rail">
                  <div className="pipe-flow__node">{String(i + 1).padStart(2, '0')}</div>
                  {i < pipeline.length - 1 && <div className="pipe-flow__line" />}
                </div>
                <div className="pipe-flow__card glass-card">
                  <div className="pipe-flow__head">
                    <span className="pipe-stage-badge">{p.stage}</span>
                    <span className="pipe-flow__tech">{p.tech}</span>
                  </div>
                  <div className="pipe-flow__title">{p.title}</div>
                  <div className="pipe-flow__desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Features ─── */}
        <div className="detail__section">
          <span className="section-tag">Capabilities</span>
          <h2 className="detail__section-title">
            What it <span className="pipe-gradient">does</span>
          </h2>
          <div className="pipe-features">
            {features.map((f) => (
              <div key={f.title} className="pipe-feature glass-card">
                <div className="pipe-feature__icon">{f.icon}</div>
                <div className="pipe-feature__title">{f.title}</div>
                <div className="pipe-feature__desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Gallery ─── */}
        <div className="detail__section">
          <span className="section-tag">The Dashboard</span>
          <h2 className="detail__section-title">
            Live data, <span className="pipe-gradient">visualized</span>
          </h2>
          <p className="detail__section-sub">Click any screen to expand it.</p>

          <div className="pipe-gallery">
            {screens.map((s, i) => (
              <div
                key={s.title}
                className="pipe-gallery__item glass-card"
                onClick={() => openLightbox(i)}
              >
                <div className="pipe-gallery__img-wrap">
                  <img src={s.img} alt={s.title} className="pipe-gallery__img" loading="lazy" decoding="async" />
                  <div className="pipe-gallery__overlay">View full screen</div>
                </div>
                <div className="pipe-gallery__meta">
                  <span className="pipe-screen-badge">{s.label}</span>
                  <div className="pipe-gallery__title">{s.title}</div>
                  <div className="pipe-gallery__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Video walkthrough ─── */}
        <div className="detail__section">
          <span className="section-tag">Walkthrough</span>
          <h2 className="detail__section-title">
            See it <span className="pipe-gradient">running</span>
          </h2>
          <p className="detail__section-sub">
            A full walkthrough of the pipeline and the live dashboard.
          </p>

          <div className="pipe-video-wrapper glass-card">
            <iframe
              src={YT_EMBED}
              title="Real-Time Stock Pipeline — Demo Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="pipe-video"
            />
          </div>

          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="pipe-video-link"
          >
            <FaYoutube size={15} />
            Watch on YouTube
            <FaExternalLinkAlt size={10} />
          </a>
        </div>

        {/* ─── Engineering decisions ─── */}
        <div className="detail__section">
          <span className="section-tag">Decisions</span>
          <h2 className="detail__section-title">
            Why it's built <span className="pipe-gradient">this way</span>
          </h2>
          <div className="pipe-decisions">
            {decisions.map((d) => (
              <div key={d.q} className="pipe-decision glass-card">
                <div className="pipe-decision__q">
                  <span className="pipe-decision__why">Why</span>
                  {d.q}
                </div>
                <p className="pipe-decision__a">{d.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Challenges ─── */}
        <div className="detail__section">
          <span className="section-tag">Challenges</span>
          <h2 className="detail__section-title">
            Problems that only show up in a <span className="pipe-gradient">real build</span>
          </h2>
          <p className="detail__section-sub">
            The kind that never appear in a tutorial — only when something is actually shipped.
          </p>

          <div className="pipe-challenges">
            {challenges.map((c, i) => (
              <div key={c.problem} className="pipe-challenge glass-card">
                <div className="pipe-challenge__index">{String(i + 1).padStart(2, '0')}</div>
                <div className="pipe-challenge__body">
                  <div className="pipe-challenge__problem">{c.problem}</div>
                  <div className="pipe-challenge__solution">
                    <span className="pipe-challenge__arrow">↳</span>
                    {c.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Stack ─── */}
        <div className="detail__section">
          <span className="section-tag">Stack</span>
          <h2 className="detail__section-title">
            Everything <span className="pipe-gradient">under the hood</span>
          </h2>
          <div className="pipe-stack">
            {stack.map((s) => (
              <div key={s.group} className="pipe-stack__row">
                <div className="pipe-stack__group">{s.group}</div>
                <div className="pipe-stack__items">
                  {s.items.map((it) => (
                    <span key={it} className="tag pipe-tag">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pipe-testing glass-card">
            <div className="pipe-testing__icon">🧪</div>
            <div>
              <div className="pipe-testing__title">Testing &amp; CI</div>
              <p className="pipe-testing__desc">
                Unit tests cover the two areas most worth trusting: the pure calculation logic
                (moving averages, momentum, volatility — including insufficient-history edge cases)
                and the validation layer correctly rejecting malformed price records. They run
                automatically on every push via GitHub Actions, with a passing badge on the repo.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Next steps ─── */}
        <div className="detail__section">
          <span className="section-tag">Roadmap</span>
          <h2 className="detail__section-title">
            Where it goes <span className="pipe-gradient">next</span>
          </h2>
          <ul className="pipe-next">
            {nextSteps.map((n) => (
              <li key={n} className="pipe-next__item">
                <span className="pipe-next__marker" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Live CTA ─── */}
        <div className="detail__section pipe-cta-section">
          <div className="pipe-cta glass-card">
            <div className="pipe-cta__icon">📊</div>
            <div>
              <div className="pipe-cta__title">Running live right now</div>
              <div className="pipe-cta__sub">
                The pipeline is deployed and ingesting real market data. Open it in the browser — no
                install, no account.
              </div>
            </div>
            <a
              href={LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn pipe-btn--primary pipe-cta__btn"
            >
              Open Dashboard
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
              <span className="pipe-gradient">{screens[lightbox].label}</span>
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

export default StockPipelineDetail;
