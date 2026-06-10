import React from 'react';
import { FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './YouTube.css';

const CHANNEL = 'https://www.youtube.com/@ahmadmohsin7';

const topics = ['Coding Projects', 'Campus Life', 'Build Vlogs'];

const YouTube = () => {
  const titleRef = useScrollAnimation(0.1);
  const cardRef  = useScrollAnimation(0.1);

  return (
    <section id="youtube" className="section">
      <div className="section-inner">
        <div className="fade-up" ref={titleRef}>
          <span className="section-tag">Content</span>
          <h2 className="section-title">
            Building <span className="gradient-text">in public</span>
          </h2>
          <p className="section-subtitle">
            Code, campus, and everything in between — documented on YouTube.
          </p>
        </div>

        <div className="youtube__card glass-card fade-up" ref={cardRef}>
          <div className="youtube__glow" />
          <FaPlay className="youtube__watermark" aria-hidden="true" />

          <div className="youtube__avatar-wrap">
            <div className="youtube__avatar-ring">
              <img
                src="/images/yt-avatar.jpg"
                alt="Ahmad Mohsin — YouTube channel"
                className="youtube__avatar"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="youtube__avatar-badge">
              <FaYoutube size={15} />
            </div>
          </div>

          <div className="youtube__body">
            <div className="youtube__channel-name">Ahmad Mohsin</div>
            <a
              href={CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube__handle"
            >
              @ahmadmohsin7
            </a>
            <p className="youtube__desc">
              A student sharing coding projects, campus life, and the adventures along
              the way. The projects on this portfolio have a story behind them — the
              channel is where I tell it.
            </p>
            <div className="youtube__topics">
              {topics.map((t) => (
                <span key={t} className="youtube__topic">
                  <span className="youtube__topic-dot" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="youtube__actions">
            <a
              href={CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube__btn--subscribe"
            >
              <FaYoutube size={17} />
              Subscribe
            </a>
            <a
              href={CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              View Channel
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTube;
