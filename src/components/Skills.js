import React from 'react';
import { FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiFlutter, SiDart } from 'react-icons/si';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Skills.css';

const skills = [
  {
    icon: <FaReact size={36} />,
    name: 'React',
    color: '#61dafb',
    desc: 'Building dynamic, component-driven frontends and large-scale SPAs.',
  },
  {
    icon: <FaNodeJs size={36} />,
    name: 'Node.js',
    color: '#68a063',
    desc: 'RESTful APIs, server-side logic, and scalable backend services.',
  },
  {
    icon: <SiFlutter size={36} />,
    name: 'Flutter',
    color: '#54c5f8',
    desc: 'Cross-platform mobile & frontend development from a single codebase.',
  },
  {
    icon: <SiDart size={36} />,
    name: 'Dart',
    color: '#0175c2',
    desc: 'The language behind Flutter — clean, typed, and performant.',
  },
  {
    icon: <FaJava size={36} />,
    name: 'Java',
    color: '#f89820',
    desc: 'Where it all began — OOP fundamentals and application development.',
  },
];

const Skills = () => (
  <section id="skills" className="section">
    <div className="section-inner">
      <Reveal>
        <span className="section-tag">Tech Stack</span>
      </Reveal>

      <h2 className="section-title">
        <MaskedText
          text="Tools I build with"
          wordClassName={(w, i) => (i >= 2 ? 'gradient-text' : '')}
        />
      </h2>

      <Reveal delay={0.1}>
        <p className="idx__lead">
          A focused stack, chosen for real-world impact and production-ready results.
        </p>
      </Reveal>

      <StaggerGroup className="idx" stagger={0.07}>
        {skills.map((skill, i) => (
          <StaggerItem key={skill.name}>
            <div className="idx__row idx__row--static">
              <span className="idx__num">{String(i + 1).padStart(2, '0')}</span>

              <span className="idx__body">
                <span className="idx__title">
                  <span className="skills__icon" style={{ color: skill.color }} aria-hidden="true">
                    {skill.icon}
                  </span>
                  {skill.name}
                </span>
              </span>

              <span className="idx__meta">{skill.desc}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Skills;
