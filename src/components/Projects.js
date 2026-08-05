import React from 'react';
import { FaLinkedin, FaExternalLinkAlt, FaArrowRight, FaFigma, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Projects.css';

const BADGE = {
  web:    <>🌐 Web App</>,
  design: <><FaFigma size={10} /> UI/UX Design</>,
  app:    <>📱 Flutter App</>,
  data:   <>📊 Data Engineering</>,
  tool:   <>🧭 Developer Tool</>,
};

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <Reveal>
          <span className="section-tag">Work</span>
        </Reveal>

        <h2 className="section-title">
          <MaskedText
            text="Things I've built"
            wordClassName={(w, i) => (i >= 2 ? 'gradient-text' : '')}
          />
        </h2>

        <Reveal delay={0.1}>
          <p className="section-subtitle">
            I focus on web development, working on production-scale applications.
          </p>
        </Reveal>

        <StaggerGroup className="projects__grid" stagger={0.06}>
          {projects.map((p) => (
            <StaggerItem
              key={p.key}
              className={`project-card glass-card ${p.featured ? 'project-card--featured' : ''} project-card--${p.type} project-card--span-${p.span}`}
            >
              <div className="project-card__body">
                <div className={`project-card__badge project-card__badge--${p.type}`}>
                  {p.featured ? 'Featured Project' : BADGE[p.type]}
                </div>

                <h3 className="project-card__title">{p.title}</h3>

                {/* One clause on every card, so the column can be scanned.
                    Only the lead card is wide enough to carry the longer
                    read as well — the rest keep it for their own page. */}
                <p className="project-card__line">{p.line}</p>
                {p.featured && <p className="project-card__desc">{p.desc}</p>}

                <div className="project-card__tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="project-card__actions">
                {p.link && (
                  <Link to={p.link} className="btn btn--primary project-card__view-btn">
                    View Project
                    <FaArrowRight size={13} />
                  </Link>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${p.link ? 'btn--ghost' : 'btn--primary'} project-card__live-btn`}
                  >
                    {p.type === 'design'
                      ? <><FaFigma size={13} /> View Design</>
                      : <>{p.liveLabel || (p.type === 'data' ? 'Live Demo' : 'Live Site')} <FaExternalLinkAlt size={11} /></>}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost project-card__live-btn"
                  >
                    <FaGithub size={14} /> Code
                  </a>
                )}
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost project-card__live-btn"
                  >
                    <FaLinkedin size={14} /> Post
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="projects__cta" delay={0.05}>
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
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
