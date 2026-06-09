import React from 'react';
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './YouTube.css';

const CHANNEL = 'https://www.youtube.com/@ahmadmohsin7';

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
            Dev tutorials, project walkthroughs, and builds documented on YouTube.
          </p>
        </div>

        <div className="youtube__card glass-card fade-up" ref={cardRef}>
          <div className="youtube__glow" />

          <div className="youtube__icon-wrap">
            <FaYoutube size={34} />
          </div>

          <div className="youtube__body">
            <div className="youtube__channel-name">Ahmad Mohsin</div>
            <div className="youtube__handle">@ahmadmohsin7</div>
            <p className="youtube__desc">
              Coding tutorials, project deep-dives, and behind-the-scenes builds —
              React, Flutter, Vanilla JS, and whatever I'm working on next. The
              projects on this portfolio have a story behind them; the channel is where
              I tell it.
            </p>
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
