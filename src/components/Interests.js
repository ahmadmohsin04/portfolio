import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Interests.css';

const footballMoments = [
  { year: '2017', desc: "Ronaldo's hat-trick — Real Madrid claim the UCL crown in iconic fashion." },
  { year: '2019', desc: "The bicycle kick. Juventus vs Real Madrid. Need I say more." },
  { year: '2022–23', desc: "Manchester City's treble season. History written in sky blue." },
];

const Interests = () => {
  const titleRef = useScrollAnimation(0.1);
  const cardsRef = useScrollAnimation(0.08);

  return (
    <section id="interests" className="section">
      <div className="section-inner">
        <div className="fade-up" ref={titleRef}>
          <span className="section-tag">Beyond Code</span>
          <h2 className="section-title">
            What keeps me <span className="gradient-text">on track</span>
          </h2>
          <p className="section-subtitle">
            Code isn't the only story. Here's what I'm equally passionate about.
          </p>
        </div>

        <div className="interests__grid stagger" ref={cardsRef}>
          {/* Cinema Card */}
          <div className="interest-card interest-card--cinema glass-card">
            <div className="interest-card__glow interest-card__glow--cinema" />
            <div className="interest-card__header">
              <div className="interest-card__emoji">🎬</div>
              <div>
                <h3 className="interest-card__title">A Cinephile at Heart</h3>
                <p className="interest-card__subtitle">Obsessive film watcher</p>
              </div>
            </div>
            <p className="interest-card__body">
              Cinema is the art form that hits different. I explore films across genres, eras, and
              languages — always chasing a story that stays with you long after the credits roll.
              Tracking every watch on Letterboxd.
            </p>
            <a
              href="https://boxd.it/7lrSZ"
              target="_blank"
              rel="noopener noreferrer"
              className="interest-card__link interest-card__link--cinema"
            >
              <span>View my Letterboxd</span>
              <FaExternalLinkAlt size={11} />
            </a>
          </div>

          {/* Football Card */}
          <div className="interest-card interest-card--football glass-card">
            <div className="interest-card__glow interest-card__glow--football" />
            <div className="interest-card__header">
              <div className="interest-card__emoji">⚽</div>
              <div>
                <h3 className="interest-card__title">The Beautiful Game</h3>
                <p className="interest-card__subtitle">Manchester City fan</p>
              </div>
            </div>
            <p className="interest-card__body">
              A football fan at heart. Manchester City's my club, and I've had the pleasure of
              watching some genuinely unforgettable moments in the sport.
            </p>
            <div className="moments">
              <div className="moments__label">Moments etched in memory</div>
              {footballMoments.map((m) => (
                <div key={m.year} className="moment">
                  <span className="moment__year">{m.year}</span>
                  <span className="moment__desc">{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
