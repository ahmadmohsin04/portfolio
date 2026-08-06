import React from 'react';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { Reveal, MaskedText, StaggerGroup, StaggerItem } from './motion/Motion';
import './Contact.css';

const Contact = () => (
  <section id="contact" className="section">
    <div className="section-inner">
      <div className="contact__wrapper">
        <div className="contact__header">
          <Reveal>
            <span className="section-tag">Contact</span>
          </Reveal>

          <h2 className="section-title">
            <MaskedText
              text="Let's connect"
              block
              wordClassName={(w, i) => (i >= 1 ? 'gradient-text' : '')}
            />
          </h2>

          <Reveal delay={0.1}>
            <p className="section-subtitle">
              Whether it's a project, collaboration, or just a conversation — my inbox is open.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="idx contact__index" stagger={0.1}>
          <StaggerItem>
            <a
              href="mailto:business.ahmadmohsin@gmail.com"
              className="idx__row idx__row--lead"
            >
              <span className="idx__num">01</span>

              <span className="idx__body">
                <span className="idx__title">
                  <span className="contact__mark" aria-hidden="true">
                    <HiMail />
                  </span>
                  Email
                </span>
              </span>

              <span className="idx__meta">business.ahmadmohsin@gmail.com</span>

              <span className="idx__view">
                Open
                <FiArrowUpRight size={15} />
              </span>
            </a>
          </StaggerItem>

          <StaggerItem>
            <a
              href="https://www.linkedin.com/in/ahmad-mohsin01"
              target="_blank"
              rel="noopener noreferrer"
              className="idx__row idx__row--lead"
            >
              <span className="idx__num">02</span>

              <span className="idx__body">
                <span className="idx__title">
                  <span className="contact__mark" aria-hidden="true">
                    <FaLinkedin />
                  </span>
                  LinkedIn
                </span>
              </span>

              <span className="idx__meta">ahmad-mohsin01</span>

              <span className="idx__view">
                Open
                <FiArrowUpRight size={15} />
              </span>
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </div>
  </section>
);

export default Contact;
