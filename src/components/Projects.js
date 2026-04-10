import React from 'react';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Projects.css';

const placeholders = [
  { title: 'Al-Mushtaraka', tech: ['React', 'Supabase', 'Node.js'], desc: 'A large-scale web platform built for real-world use — featuring authentication, dashboards, and PDF generation.' },
  { title: 'More on LinkedIn', tech: ['Flutter', 'Dart', 'Java'], desc: 'Several other projects across mobile and web — explore the full list on my LinkedIn profile.' },
];

const Projects = () => {
  const titleRef = useScrollAnimation(0.1);
  const gridRef = useScrollAnimation(0.1);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="fade-up" ref={titleRef}>
          <span className="section-tag">Work</span>
          <h2 className="section-title">
            Things I've <span className="gradient-text">built</span>
          </h2>
          <p className="section-subtitle">
            I focus on web development, working on production-scale applications.
            Check my LinkedIn for the complete project list.
          </p>
        </div>

        <div className="projects__grid stagger" ref={gridRef}>
          {placeholders.map((p) => (
            <div key={p.title} className="project-card glass-card">
              <div className="project-card__body">
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__cta fade-up">
          <a
            href="https://www.linkedin.com/in/ahmad-mohsin01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary projects__linkedin-btn"
          >
            <FaLinkedin size={18} />
            See All Projects on LinkedIn
            <FaExternalLinkAlt size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
