import React from 'react';
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { Reveal, MaskedText } from './motion/Motion';
import './YouTube.css';

const CHANNEL = 'https://www.youtube.com/@ahmadmohsin7';

const topics = ['Coding Projects', 'Campus Life', 'Build Vlogs'];

const YouTube = () => {
  return (
    <section id="youtube" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="section-tag">Content</span>
        </Reveal>

        <h2 className="section-title">
          <MaskedText
            text="Building in public"
            wordClassName={(w, i) => (i >= 1 ? 'gradient-text' : '')}
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="idx__lead">
            Code, campus, and everything in between — documented on YouTube.
          </p>
        </Reveal>

        {/* One channel, so one row — but a lead row: the name at full size
            with a line of copy under it, the handle and the topics kept in
            the detail column where every other section puts its detail. */}
        <Reveal className="idx" delay={0.06}>
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="idx__row idx__row--lead"
          >
            <span className="idx__num">01</span>

            <span className="idx__body">
              <span className="youtube__id">
                <img
                  src="/images/yt-avatar.jpg"
                  alt="Ahmad Mohsin — YouTube channel"
                  className="youtube__avatar"
                  loading="lazy"
                  decoding="async"
                />
                <span className="idx__title">Ahmad Mohsin</span>
              </span>
              <span className="idx__note">
                A student sharing coding projects, campus life, and the adventures along
                the way. The projects on this portfolio have a story behind them — the
                channel is where I tell it.
              </span>
            </span>

            <span className="idx__meta">
              @ahmadmohsin7
              <span className="youtube__topics">{topics.join(' · ')}</span>
            </span>

            <span className="idx__view">
                Visit
                <FiArrowUpRight size={15} />
              </span>
          </a>
        </Reveal>

        <Reveal className="youtube__actions" delay={0.05}>
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
        </Reveal>
      </div>
    </section>
  );
};

export default YouTube;
