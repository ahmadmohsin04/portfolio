import React from 'react';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
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

        <StaggerGroup className="contact__links" stagger={0.1}>
          <StaggerItem>
            <a
              href="mailto:business.ahmadmohsin@gmail.com"
              className="contact-link glass-card"
            >
              <div className="contact-link__icon contact-link__icon--email">
                <HiMail size={24} />
              </div>
              <div>
                <div className="contact-link__label">Email</div>
                <div className="contact-link__value">business.ahmadmohsin@gmail.com</div>
              </div>
            </a>
          </StaggerItem>

          <StaggerItem>
            <a
              href="https://www.linkedin.com/in/ahmad-mohsin01"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link glass-card"
            >
              <div className="contact-link__icon contact-link__icon--linkedin">
                <FaLinkedin size={24} />
              </div>
              <div>
                <div className="contact-link__label">LinkedIn</div>
                <div className="contact-link__value">ahmad-mohsin01</div>
              </div>
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </div>
  </section>
);

export default Contact;
