import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Reveal, MaskedText } from './motion/Motion';
import './About.css';

const timeline = [
  { icon: '☕', label: 'JavaFX', desc: 'Started with console & desktop apps in Java' },
  { icon: '📱', label: 'Android', desc: 'Built mobile apps in Android Studio' },
  { icon: '🦋', label: 'Flutter', desc: 'Cross-platform mobile + frontend + backend with Flutter & Dart' },
  { icon: '🌐', label: 'Web Dev', desc: 'Scaled into React, Node.js & large-scale web platforms' },
];

/* ─── The journey, pinned ─────────────────────────────────────
   These were four cards side by side, which stated the stages but not
   the movement between them — and the movement is the point of the
   section. Pinning it and advancing one stage per screen of scroll
   makes the reader travel the same path.

   Every stage stays mounted and is switched by opacity rather than
   swapped in and out: the tallest one sets the height, so the panel
   cannot resize as it advances. Below the desktop range the pin is
   dropped and the stages simply stack — four screens of hijacked
   scroll on a phone is a good way to lose someone. */
const Journey = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Clamped, or the final stage flicks past its own index the moment
    // progress touches exactly 1.
    const i = Math.min(timeline.length - 1, Math.max(0, Math.floor(v * timeline.length)));
    setActive(i);
  });

  return (
    <div className="journey" ref={ref} style={{ height: `${timeline.length * 100}vh` }}>
      <div className="journey__pin">
        <div className="journey__inner">
          <ol className="journey__rail">
            {timeline.map((step, i) => (
              <li
                key={step.label}
                className={[
                  'journey__tick',
                  i === active ? 'journey__tick--on' : '',
                  i < active ? 'journey__tick--past' : '',
                ].join(' ')}
              >
                <span className="journey__tick-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="journey__tick-label">{step.label}</span>
              </li>
            ))}
          </ol>

          <div className="journey__stages">
            {timeline.map((step, i) => (
              <motion.div
                key={step.label}
                className={`journey__stage ${i === active ? 'journey__stage--on' : ''}`}
                animate={reduced ? undefined : { opacity: i === active ? 1 : 0, y: i === active ? 0 : 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="journey__icon">{step.icon}</span>
                <h3 className="journey__label">{step.label}</h3>
                <p className="journey__desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="section">
    <div className="section-inner">
      <Reveal>
        <span className="section-tag">Who I Am</span>
      </Reveal>

      <h2 className="section-title">
        <MaskedText
          text="From console apps to large-scale web"
          wordClassName={(w, i) => (i >= 4 ? 'gradient-text' : '')}
        />
      </h2>

      <Reveal delay={0.1}>
        <p className="about__bio">
          I'm Ahmad Mohsin, a Software Engineering student at the University of Management and
          Technology (UMT), Lahore — currently in my 6th semester. My journey in tech started with
          curiosity and hasn't stopped since. I've always been keen to test new technologies and
          push what I can build. Today, I focus on full-stack web development, having worked on
          several large-scale web applications.
        </p>
        <p className="about__bio about__bio--secondary">
          Outside of code, I'm a passionate cinephile — always hunting for the next great film.
          A big football fan as well — a few moments from the sport live rent-free in my head.
        </p>
      </Reveal>
    </div>

    <Journey />
  </section>
);

export default About;
