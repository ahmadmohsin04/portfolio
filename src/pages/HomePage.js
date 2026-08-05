import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Interests from '../components/Interests';
import YouTube from '../components/YouTube';
import Contact from '../components/Contact';
import { BrandIntro } from '../components/motion/Motion';

/* Plays once per page load. A module-level flag rather than sessionStorage
   is deliberate: it survives client-side navigation back from a project
   page, but resets on a real reload. sessionStorage persisted for the whole
   tab, so after the first view the intro never ran again. */
let introPlayed = false;

function HomePage() {
  const [introDone, setIntroDone] = useState(introPlayed);

  const handleIntroDone = () => {
    introPlayed = true;
    setIntroDone(true);
  };

  return (
    <div className="app">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {!introDone && <BrandIntro onDone={handleIntroDone} />}

      {/* The nav logo is where the intro's mark lands, so it stays
          hidden until the flight has finished on top of it. */}
      <Navbar brandHidden={!introDone} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <YouTube />
        <Interests />
        <Contact />
      </main>

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
}

export default HomePage;
