import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Interests.css';

const footballMoments = [
  { year: '2017', desc: "Ronaldo's hat-trick — Real Madrid claim the UCL crown in iconic fashion." },
  { year: '2019', desc: "The bicycle kick. Juventus vs Real Madrid. Need I say more." },
  { year: '2022–23', desc: "Manchester City's treble season. History written in sky blue." },
];

const Interests = () => {
  return (
    <section id="interests" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="section-tag">Beyond Code</span>
        </Reveal>

        <h2 className="section-title">
          <MaskedText
            text="What keeps me on track"
            wordClassName={(w, i) => (i >= 3 ? 'gradient-text' : '')}
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="idx__lead">
            Code isn't the only story. Here's what I'm equally passionate about.
          </p>
        </Reveal>

        <StaggerGroup className="idx" stagger={0.12}>
          <StaggerItem>
            <a
              href="https://boxd.it/7lrSZ"
              target="_blank"
              rel="noopener noreferrer"
              className="idx__row"
            >
              <span className="idx__num">01</span>
              <span className="idx__body">
                <span className="idx__title">
                  <span className="interests__emoji" aria-hidden="true">🎬</span>
                  A Cinephile at Heart
                </span>
                <span className="idx__note">
                  Cinema is the art form that hits different. I explore films across genres, eras, and
                  languages — always chasing a story that stays with you long after the credits roll.
                  Tracking every watch on Letterboxd.
                </span>
              </span>
              <span className="idx__meta">Obsessive film watcher</span>
              <span className="idx__view">
                View
                <FiArrowUpRight size={15} />
              </span>
            </a>
          </StaggerItem>

          <StaggerItem>
            <div className="idx__row idx__row--static">
              <span className="idx__num">02</span>
              <span className="idx__body">
                <span className="idx__title">
                  <span className="interests__emoji" aria-hidden="true">⚽</span>
                  The Beautiful Game
                </span>
                <span className="idx__note">
                  A football fan at heart. Manchester City's my club, and I've had the pleasure of
                  watching some genuinely unforgettable moments in the sport.
                </span>
              </span>
              <span className="idx__meta">Manchester City fan</span>
            </div>
          </StaggerItem>

          {/* The moments are the best writing in the section, so they get
              their own run underneath rather than being folded into a card. */}
          <StaggerItem>
            <div className="moments">
              <div className="moments__label">Moments etched in memory</div>
              {footballMoments.map((m) => (
                <div key={m.year} className="moment">
                  <span className="moment__year">{m.year}</span>
                  <span className="moment__desc">{m.desc}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};

export default Interests;
