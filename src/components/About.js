import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './About.css';

const timeline = [
  { icon: '☕', label: 'JavaFX', desc: 'Started with console & desktop apps in Java' },
  { icon: '📱', label: 'Android', desc: 'Built mobile apps in Android Studio' },
  { icon: '🦋', label: 'Flutter', desc: 'Cross-platform mobile + frontend + backend with Flutter & Dart' },
  { icon: '🌐', label: 'Web Dev', desc: 'Scaled into React, Node.js & large-scale web platforms' },
];

const About = () => {
  const sectionRef = useScrollAnimation(0.1);
  const timelineRef = useScrollAnimation(0.1);

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="fade-up" ref={sectionRef}>
          <span className="section-tag">Who I Am</span>
          <h2 className="section-title">
            From console apps to <span className="gradient-text">large-scale web</span>
          </h2>
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
        </div>

        <div className="about__timeline stagger" ref={timelineRef}>
          {timeline.map((item) => (
            <div key={item.label} className="about__step glass-card">
              <div className="about__step-icon">{item.icon}</div>
              <div className="about__step-label">{item.label}</div>
              <div className="about__step-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
