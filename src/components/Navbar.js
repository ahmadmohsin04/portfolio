import React, { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'YouTube', href: '#youtube' },
  { label: 'Interests', href: '#interests' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ brandHidden = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Retract on the way down, return on the way up. The 6px floor
      // ignores trackpad jitter and momentum wobble, which would
      // otherwise flip the bar back and forth mid-scroll.
      if (Math.abs(y - lastY.current) > 6) {
        setRetracted(y > lastY.current && y > 120);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // The mobile menu is position:fixed inside this bar, and any transform
  // here would turn the bar into its containing block — so the retract is
  // suppressed while the menu is open.
  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${
        retracted && !menuOpen ? 'navbar--retracted' : ''
      }`}
    >
      <div className="navbar__inner">
        <a
          href="#hero"
          className={`navbar__logo ${brandHidden ? 'navbar__logo--pending' : ''}`}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          AM
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
