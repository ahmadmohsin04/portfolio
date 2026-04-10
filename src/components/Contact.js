import React from 'react';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Contact.css';

const Contact = () => {
  const ref = useScrollAnimation(0.1);

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="contact__wrapper fade-up" ref={ref}>
          <div className="contact__header">
            <span className="section-tag">Contact</span>
            <h2 className="section-title">
              Let's <span className="gradient-text">connect</span>
            </h2>
            <p className="section-subtitle">
              Whether it's a project, collaboration, or just a conversation — my inbox is open.
            </p>
          </div>

          <div className="contact__links">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
