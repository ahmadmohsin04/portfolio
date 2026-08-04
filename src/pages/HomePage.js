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
import { Intro } from '../components/motion/Motion';

function HomePage() {
  // Play the curtain once per session — coming back from a project page
  // shouldn't replay it.
  const [introDone, setIntroDone] = useState(
    () => typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro-played') === '1'
  );

  const handleIntroDone = () => {
    try { sessionStorage.setItem('intro-played', '1'); } catch (e) { /* private mode */ }
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

      {!introDone && <Intro onDone={handleIntroDone} />}

      <Navbar />
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
