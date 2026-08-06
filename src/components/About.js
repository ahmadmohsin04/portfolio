import React from 'react';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './About.css';

const timeline = [
  { icon: '☕', label: 'JavaFX', desc: 'Started with console & desktop apps in Java' },
  { icon: '📱', label: 'Android', desc: 'Built mobile apps in Android Studio' },
  { icon: '🦋', label: 'Flutter', desc: 'Cross-platform mobile + frontend + backend with Flutter & Dart' },
  { icon: '🌐', label: 'Web Dev', desc: 'Scaled into React, Node.js & large-scale web platforms' },
];

const About = () => (
  <section id="about" className="section">
    <div className="section-inner">
      <Reveal>
        <span className="section-tag">Who I Am</span>
      </Reveal>

      <h2 className="section-title">
        <MaskedText
          text="From console apps to large-scale web"
          wordClassName={(w, i) => (i >= 4 ? 'gradient-text' : '')}
        />
      </h2>

      <Reveal delay={0.1}>
        <p className="about__bio">
          I'm Ahmad Mohsin, a Software Engineering student at the University of Management and
          Technology (UMT), Lahore — currently in my 6th semester. My journey in tech started with
          curiosity and hasn't stopped since. I've always been keen to test new technologies and
          push what I can build. Today, I focus on full-stack web development, having worked on
          several large-scale web applications.
        </p>
        <p className="about__bio about__bio--secondary">
          Outside of code, I'm a passionate cinephile — always hunting for the next great film.
          A big football fan as well — a few moments from the sport live rent-free in my head.
        </p>
      </Reveal>

      <StaggerGroup className="idx">
        {timeline.map((item, i) => (
          <StaggerItem key={item.label} className="idx__row idx__row--static">
            <span className="idx__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="idx__body">
              <span className="about__step-icon">{item.icon}</span>
              <span className="idx__title">{item.label}</span>
            </span>
            <span className="idx__meta">{item.desc}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default About;
