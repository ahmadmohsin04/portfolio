import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { nextProject } from '../../data/projects';
import './ProjectParts.css';

/* ─── The spine every project page shares ─────────────────────
   The eight pages each solved presentation their own way, so there
   was no consistent place to look for what a project actually was.
   These two blocks are the parts that should read the same on all
   of them — the reference's case studies do exactly this. */

/* Three facts, numbered, above the prose. A skim path for someone who
   will not read the paragraphs — which is most people, most of the
   time, and certainly anyone reviewing a stack of portfolios. */
export const Takeaways = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="takeaways" aria-label="Key takeaways">
      <div className="detail__content">
        <span className="section-tag">Key takeaways</span>
        <ol className="takeaways__list">
          {items.map((item, i) => (
            <li className="takeaways__item" key={item}>
              <span className="takeaways__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="takeaways__text">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* Closes every project page with the next one, so the work reads as a
   loop. Before this the only way out of a project was the browser's
   back button — eight dead ends. The running order comes from the same
   list the grid is built from, so the two cannot disagree. */
export const NextProject = () => {
  const { pathname } = useLocation();
  const next = nextProject(pathname);
  if (!next) return null;

  return (
    <section className="next-project" aria-label="Next project">
      <Link to={next.link} className="next-project__link">
        <div className="detail__content next-project__inner">
          <span className="next-project__label">Next project</span>
          <span className="next-project__title">{next.title}</span>
          <span className="next-project__line">{next.line}</span>
          <span className="next-project__arrow" aria-hidden="true">
            <FiArrowRight size={22} />
          </span>
        </div>
      </Link>
    </section>
  );
};
