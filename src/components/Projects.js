import React from 'react';
import { FaLinkedin, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Projects.css';

const projects = [
  {
    title: 'Al-Mushtaraka',
    tech: ['React', 'Supabase', 'jsPDF', 'React Router'],
    desc: 'A production-grade trading operations platform — multi-module system with agreements, remote signing, customer management, admin panel, and PDF generation.',
    link: '/projects/almushtaraka',
    live: 'https://www.almushtaraka.com',
    featured: true,
  },
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
          </p>
        </div>

        <div className="projects__grid stagger" ref={gridRef}>
          {projects.map((p) => (
            <div key={p.title} className={`project-card glass-card ${p.featured ? 'project-card--featured' : ''}`}>
              {p.featured && <div className="project-card__badge">Featured Project</div>}
              <div className="project-card__body">
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-card__actions">
                <Link to={p.link} className="btn btn--primary project-card__view-btn">
                  View Project
                  <FaArrowRight size={13} />
                </Link>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost project-card__live-btn"
                >
                  Live Site
                  <FaExternalLinkAlt size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__cta fade-up">
          <a
            href="https://www.linkedin.com/in/ahmad-mohsin01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost projects__linkedin-btn"
          >
            <FaLinkedin size={18} />
            More on LinkedIn
            <FaExternalLinkAlt size={11} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
