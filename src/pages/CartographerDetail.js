import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { FaGithub, FaExternalLinkAlt, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Takeaways, NextProject } from '../components/project/ProjectParts';
import '../App.css';
import './CartographerDetail.css';

const LIVE     = 'https://codebase-cartographer-mohsin.vercel.app';
const GITHUB   = 'https://github.com/ahmadmohsin04/codebase_cartographer';
const LINKEDIN = 'https://www.linkedin.com/posts/ahmad-mohsin01_softwareengineering-webdevelopment-typescript-activity-7490462913091219456-oB4d';
const YOUTUBE  = 'https://youtu.be/4kfdFSao31Q';
const YT_EMBED = 'https://www.youtube.com/embed/4kfdFSao31Q';

const stats = [
  { value: '8',     label: 'Languages supported' },
  { value: '1,069', label: 'Files in one map' },
  { value: '2.9s',  label: '400-file map, live' },
  { value: '1',     label: 'API request per repo' },
];

const pillars = [
  {
    icon: '🕸',
    title: 'Dependency graph',
    desc: 'Every source file is a node, every internal import an edge. Entry points are marked and heavily-depended-upon files stand out on sight. Pan, zoom, minimap, fit-to-view.',
  },
  {
    icon: '🧭',
    title: 'Guided tour',
    desc: 'A breadth-first walkthrough starting at the entry points and moving outward, up to 20 narrated stops — so you meet the architecture in a sensible reading order, not alphabetically.',
  },
  {
    icon: '✨',
    title: 'Plain-English narration',
    desc: 'A summary of what the project is and where to start, plus a one-to-three sentence explanation of any file — streamed token-by-token, generated on demand rather than up front.',
  },
];

const screens = [
  { img: '/images/cartographer/landing.webp',     label: 'Landing',    title: 'Paste a URL, or pick an example',       desc: 'One input. No sign-in, no install, no clone.' },
  { img: '/images/cartographer/loading.webp',     label: 'Build',      title: 'Real streamed progress',                 desc: 'The loading screen reports what the server is actually doing — not a plausible animation on a timer.' },
  { img: '/images/cartographer/clustered.webp',   label: 'Clustering', title: "TanStack Query's 1,069 files",           desc: 'Rendered as 47 expandable folders plus 13 loose files. Legible at 0.76 zoom.' },
  { img: '/images/cartographer/overview.webp',    label: 'Narration',  title: 'What is this project?',                  desc: 'An AI-generated summary of what the codebase is, how it is organised, and where to start reading.' },
  { img: '/images/cartographer/search.webp',      label: 'Search',     title: 'Find anything, anywhere',                desc: 'Folders containing a match open automatically and the canvas pans to each hit. Enter and Shift+Enter step through.' },
  { img: '/images/cartographer/file-panel.webp',  label: 'File',       title: 'Per-file explanation',                   desc: 'Imports, imported-by, size, and a streamed plain-English account of what the file does and why it exists.' },
  { img: '/images/cartographer/isolate.webp',     label: 'Isolate',    title: 'One file, full closure',                 desc: "Dim everything except a file's complete transitive dependency closure — in both directions." },
  { img: '/images/cartographer/guided-tour.webp', label: 'Tour',       title: 'Guided tour, step 1',                    desc: 'Starts at the entry point, keyboard navigable, every stop narrated in context.' },
  { img: '/images/cartographer/heat.webp',        label: 'Heat',       title: 'Colour by connections',                  desc: 'Recolour the graph by fan-in to surface the hubs everything else depends on.' },
  { img: '/images/cartographer/expand-all.webp',  label: 'Expanded',   title: 'Every file at once',                     desc: 'When you want the whole picture rather than the readable one.' },
];

const languages = [
  { lang: 'JavaScript / TypeScript', form: 'import x from "./y"',        how: 'File path, with extension and /index probing, plus @/ aliases' },
  { lang: 'Python',                  form: 'from .models import X',      how: 'Module index across flat and src/ layouts; leading dots climb packages' },
  { lang: 'Java / Kotlin',           form: 'import com.example.Foo;',    how: "Index of fully-qualified names built from each file's own package declaration" },
  { lang: 'Go',                      form: 'import "mod/pkg/x"',         how: 'Module path read from go.mod, then the package directory' },
  { lang: 'C / C++',                 form: '#include "foo.h"',           how: 'Relative to the including file, then standard include roots' },
];

const langShots = [
  { img: '/images/cartographer/lang-java.webp',   label: 'Java',   desc: 'Spring PetClinic' },
  { img: '/images/cartographer/lang-python.webp', label: 'Python', desc: 'Flask' },
  { img: '/images/cartographer/lang-go.webp',     label: 'Go',     desc: 'fzf' },
  { img: '/images/cartographer/lang-c.webp',      label: 'C',      desc: 'jq — C, Python and JS in one repo' },
];

const deepDives = [
  {
    title: 'One API request instead of four hundred',
    body: [
      'The obvious way to fetch file contents is the GitHub Contents API — one request per file. At 400 files that exhausts an unauthenticated 60-requests-per-hour budget on the very first repository anyone tries.',
      'Instead the app downloads the repository tarball — a single request regardless of file count — streams it through gunzip and a purpose-written streaming tar reader, and keeps only the files it selected, discarding the rest without ever allocating them. The per-file Contents API stays on as an automatic fallback.',
    ],
    metric: { from: '400 requests', to: '1' },
  },
  {
    title: 'Multi-language support is a resolution problem, not a parsing problem',
    body: [
      'The first version claimed a "pluggable parser layer". That turned out to be only half true — and the easy half. Extracting import strings from any language is close to a regex.',
      'The hard half is resolution. ./utils is a file path. com.example.Foo is a class name. github.com/user/repo/pkg/x is a directory relative to a module root declared in a completely different file. The original design had resolution hardcoded for JavaScript, so a Java repository could never have worked no matter what parser fed it.',
      "The fix was to make each language own both halves — extraction and resolution, plus its own entry-point conventions and directory-layout priorities. Java builds an index of fully-qualified class names from each file's own package declaration rather than inferring it from the folder, which is exactly what makes Gradle and Maven layouts work.",
    ],
    metric: null,
  },
  {
    title: 'A 400-node graph is an image, not a map',
    body: [
      "Rendering every file worked, and it looked impressive in a screenshot. It wasn't usable: TanStack Query's 400-file slice fit the screen only at 0.245 zoom — you could see the shape and read nothing.",
      'Clustering files into collapsible folders turned it from a picture into a tool, and solved two language-specific problems at the same time. A Go import names a package, not a file, so at file level every import fanned out to every file in that directory — fzf drew 413 edges, clustered it draws 88. And Java\'s deep package chains collapsed from a column of identically-truncated labels into one node.',
      'It also let the analysis ceiling rise from 400 files to 1,500, because that cap was always about visual load rather than fetch cost.',
    ],
    metric: { from: '0.245 zoom · 400 files', to: '0.76 zoom · 1,069 files' },
  },
  {
    title: 'Honest loading states',
    body: [
      '/api/map speaks two protocols. A plain POST returns a single JSON body. When the client sends Accept: application/x-ndjson, the same pipeline streams progress events first — resolving, reading the tree, downloading n of m files, parsing, laying out.',
      'The loading screen reports what the server is actually doing rather than animating a plausible-looking sequence on a timer.',
    ],
    metric: null,
  },
  {
    title: 'The graph renders before any LLM call',
    body: [
      'Narration is layered on afterwards: the repo overview streams once per snapshot, per-file explanations stream on click. That keeps the first paint fast and bounds AI cost to what the user actually looks at, rather than narrating hundreds of files nobody will open.',
    ],
    metric: { from: '~7s first narration', to: '0.5s cached' },
  },
];

const perf = [
  { repo: 'TanStack/query',                   lang: 'TypeScript',  files: '1,069', imports: '1,372', note: '47 folders + 13 loose files' },
  { repo: 'expressjs/express',                lang: 'JavaScript',  files: '141',   imports: '57',    note: '' },
  { repo: 'pallets/flask',                    lang: 'Python',      files: '83',    imports: '184',   note: '' },
  { repo: 'junegunn/fzf',                     lang: 'Go',          files: '83',    imports: '88',    note: '413 edges before clustering' },
  { repo: 'jqlang/jq',                        lang: 'C (mixed)',   files: '55',    imports: '114',   note: 'C, Python and JS in one repo' },
  { repo: 'spring-projects/spring-petclinic', lang: 'Java',        files: '49',    imports: '24',    note: '' },
  { repo: 'pmndrs/zustand',                   lang: 'TypeScript',  files: '47',    imports: '34',    note: '' },
];

const featureGroups = [
  {
    title: 'Graph',
    items: [
      'Pan, zoom, minimap, fit-to-view',
      'Files cluster into folders that expand on click; folder edges aggregate, with stroke weight showing how many real imports they carry',
      'Single-child directory chains collapse into one node',
      'Colour by directory, or by fan-in heat to surface hubs',
      'Entry points detected from package.json and language conventions — main, __main__.py, func main, int main()',
    ],
  },
  {
    title: 'Navigation',
    items: [
      'Search with / to focus; Enter and Shift+Enter step through matches',
      'Subtree isolation — a file\'s full transitive closure, both directions',
      'Guided tour, breadth-first from entry points, keyboard navigable',
      'Shareable URLs pinned to a branch, tag or commit',
    ],
  },
  {
    title: 'Narration',
    items: [
      'Repo overview and per-file explanations, streamed token-by-token',
      'Lazy — the graph renders before any LLM call is made',
      'Cached by owner/repo@sha, so a repeat view is instant',
    ],
  },
  {
    title: 'Resilience',
    items: [
      'Real streamed progress during the build',
      'Typed error states — invalid URL, repo not found, no supported source files, rate limited with a reset estimate',
      'Rate limits fall back to the last cached snapshot rather than failing',
      'Works with no Anthropic API key — graph and tour still function',
      'prefers-reduced-motion respected throughout',
    ],
  },
];

const stack = [
  { group: 'Framework', items: ['Next.js 16.3', 'React 19.2', 'TypeScript', 'Turbopack', 'Vercel'] },
  { group: 'Graph',     items: ['React Flow 12.11', 'dagre', 'Custom column packing'] },
  { group: 'Repo I/O',  items: ['@octokit/rest 22', 'Streaming tar reader', 'gunzip'] },
  { group: 'Parsing',   items: ['es-module-lexer 2.3', '@babel/parser 8', 'Regex extractors'] },
  { group: 'AI',        items: ['Anthropic SDK', 'claude-opus-5', 'Provider wrapper'] },
  { group: 'UI',        items: ['Tailwind CSS v4', 'shadcn-style primitives', 'Geist Sans', 'JetBrains Mono', 'lucide-react'] },
  { group: 'Motion',    items: ['framer-motion 12', 'anime.js 4.5'] },
  { group: 'Caching',   items: ['lru-cache 11', 'Upstash Redis'] },
];

const scope = [
  'It is an import graph, not a call graph — no static analysis, no type resolution.',
  'Public repositories only. There is no authentication and nothing is cloned to disk.',
  'It does not do code review or security analysis, and it does not claim to.',
];

const CartographerDetail = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i - 1 + screens.length) % screens.length);
  const nextImg = () => setLightbox((i) => (i + 1) % screens.length);

  return (
    <div className="detail-page app">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Topbar */}
      <div className="detail__topbar">
        <div className="detail__topbar-inner">
          <button className="detail__back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} />
            Back to Portfolio
          </button>
        </div>
      </div>

      <div className="detail__content">

        {/* ─── Hero ─── */}
        <div className="detail__hero carto-hero">
          <span className="section-tag">Developer Tool · Next.js + AI</span>
          <h1 className="detail__title">
            Codebase <span className="carto-gradient">Cartographer</span>
          </h1>
          <p className="detail__tagline">
            Paste any public GitHub repository URL and get an interactive, narrated map of its
            architecture — a dependency graph, a guided tour, and a plain-English explanation of
            every file, across eight languages. Nothing is cloned to disk.
          </p>

          <div className="detail__hero-actions">
            <a href={LIVE} target="_blank" rel="noopener noreferrer" className="btn carto-btn--primary">
              <span className="carto-live-dot" />
              Try it Live
            </a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FaYoutube size={16} />
              Watch Demo
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FaGithub size={15} />
              Source
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FaLinkedin size={15} />
              Post
            </a>
          </div>

          <div className="detail__tech-strip" style={{ marginTop: '28px' }}>
            {['Next.js', 'TypeScript', 'React', 'React Flow', 'Data Visualisation', 'Anthropic API', 'LLM Streaming', 'GitHub API', 'Tailwind CSS', 'Vercel'].map((t) => (
              <span key={t} className="tag carto-tag">{t}</span>
            ))}
          </div>
        </div>

        <Takeaways
          items={[
            'Maps 1,069-file repos across eight languages',
            'One tarball request replaces 400 GitHub API calls',
            '400-file map in 2.9s, before any LLM call',
          ]}
        />

        {/* ─── Stats ─── */}
        <div className="carto-stats">
          {stats.map((s) => (
            <div key={s.label} className="carto-stat glass-card">
              <div className="carto-stat__value">{s.value}</div>
              <div className="carto-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ─── Problem ─── */}
        <div className="detail__section">
          <span className="section-tag">The Problem</span>
          <h2 className="detail__section-title">
            You can read a README in five minutes. The <span className="carto-gradient">architecture</span> takes days.
          </h2>
          <p className="carto-prose">
            Developers lose entire days to the same problem — working out how an unfamiliar project
            actually fits together. Which file is the entry point? What depends on what? Which twenty
            files matter and which four hundred are noise? Codebase Cartographer compresses that into
            about a minute: paste a URL, and the repository is read through the GitHub API, parsed in
            memory, laid out as an explorable graph, and explained in plain English.
          </p>
        </div>

        {/* ─── Pillars ─── */}
        <div className="detail__section">
          <span className="section-tag">What you get</span>
          <h2 className="detail__section-title">
            Three ways to read a <span className="carto-gradient">codebase</span>
          </h2>
          <div className="carto-pillars">
            {pillars.map((p) => (
              <div key={p.title} className="carto-pillar glass-card">
                <div className="carto-pillar__icon">{p.icon}</div>
                <div className="carto-pillar__title">{p.title}</div>
                <div className="carto-pillar__desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Video ─── */}
        <div className="detail__section">
          <span className="section-tag">Walkthrough</span>
          <h2 className="detail__section-title">
            See it <span className="carto-gradient">work</span>
          </h2>
          <p className="detail__section-sub">Every feature, end to end.</p>

          <div className="carto-video-wrapper glass-card">
            <iframe
              src={YT_EMBED}
              title="Codebase Cartographer — Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="carto-video"
            />
          </div>

          <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="carto-video-link">
            <FaYoutube size={15} />
            Watch on YouTube
            <FaExternalLinkAlt size={10} />
          </a>
        </div>

        {/* ─── Gallery ─── */}
        <div className="detail__section">
          <span className="section-tag">Screens</span>
          <h2 className="detail__section-title">
            The tool, <span className="carto-gradient">in use</span>
          </h2>
          <p className="detail__section-sub">Click any screen to expand it.</p>

          <div className="carto-gallery">
            {screens.map((s, i) => (
              <div key={s.title} className="carto-gallery__item glass-card" onClick={() => openLightbox(i)}>
                <div className="carto-gallery__img-wrap">
                  <img src={s.img} alt={s.title} className="carto-gallery__img" loading="lazy" decoding="async" />
                  <div className="carto-gallery__overlay">View full screen</div>
                </div>
                <div className="carto-gallery__meta">
                  <span className="carto-screen-badge">{s.label}</span>
                  <div className="carto-gallery__title">{s.title}</div>
                  <div className="carto-gallery__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Languages ─── */}
        <div className="detail__section">
          <span className="section-tag">Languages</span>
          <h2 className="detail__section-title">
            Eight languages, five ways to <span className="carto-gradient">resolve an import</span>
          </h2>
          <p className="detail__section-sub">
            JavaScript, TypeScript, Python, Java, Kotlin, Go, C and C++ — each one owns both halves
            of the problem, extraction and resolution.
          </p>

          <div className="carto-langtable">
            <div className="carto-langtable__head">
              <div>Language</div>
              <div>Import form</div>
              <div>Resolution strategy</div>
            </div>
            {languages.map((l) => (
              <div key={l.lang} className="carto-langtable__row">
                <div className="carto-langtable__lang">{l.lang}</div>
                <div className="carto-langtable__form"><code>{l.form}</code></div>
                <div className="carto-langtable__how">{l.how}</div>
              </div>
            ))}
          </div>

          <div className="carto-langshots">
            {langShots.map((l) => (
              <div key={l.label} className="carto-langshot glass-card">
                <div className="carto-langshot__img-wrap">
                  <img src={l.img} alt={`${l.label} support`} className="carto-langshot__img" loading="lazy" decoding="async" />
                </div>
                <div className="carto-langshot__meta">
                  <span className="carto-screen-badge">{l.label}</span>
                  <div className="carto-langshot__desc">{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Deep dives ─── */}
        <div className="detail__section">
          <span className="section-tag">Engineering</span>
          <h2 className="detail__section-title">
            The parts that were <span className="carto-gradient">actually hard</span>
          </h2>

          <div className="carto-dives">
            {deepDives.map((d, i) => (
              <div key={d.title} className="carto-dive glass-card">
                <div className="carto-dive__index">{String(i + 1).padStart(2, '0')}</div>
                <div className="carto-dive__body">
                  <h3 className="carto-dive__title">{d.title}</h3>
                  {d.body.map((p, j) => (
                    <p key={j} className="carto-dive__para">{p}</p>
                  ))}
                  {d.metric && (
                    <div className="carto-metric">
                      <span className="carto-metric__from">{d.metric.from}</span>
                      <span className="carto-metric__arrow">→</span>
                      <span className="carto-metric__to">{d.metric.to}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Performance ─── */}
        <div className="detail__section">
          <span className="section-tag">Measured</span>
          <h2 className="detail__section-title">
            Real repositories, <span className="carto-gradient">real numbers</span>
          </h2>
          <p className="detail__section-sub">
            Every figure measured against the live deployment or a local production build — not estimated.
          </p>

          <div className="carto-perf">
            <div className="carto-perf__head">
              <div>Repository</div>
              <div>Language</div>
              <div className="carto-perf__num">Files</div>
              <div className="carto-perf__num">Imports</div>
              <div>Note</div>
            </div>
            {perf.map((p) => (
              <div key={p.repo} className="carto-perf__row">
                <div className="carto-perf__repo">{p.repo}</div>
                <div className="carto-perf__lang">{p.lang}</div>
                <div className="carto-perf__num carto-perf__val">{p.files}</div>
                <div className="carto-perf__num carto-perf__val">{p.imports}</div>
                {p.note && <div className="carto-perf__note">{p.note}</div>}
              </div>
            ))}
          </div>

          <div className="carto-speed">
            {[
              { v: '0.77s', l: 'Landing page' },
              { v: '2.5s',  l: '47-file map' },
              { v: '2.9s',  l: '400-file map' },
              { v: '~21s',  l: 'Cold 1,069-file build' },
            ].map((s) => (
              <div key={s.l} className="carto-speed__item">
                <div className="carto-speed__v">{s.v}</div>
                <div className="carto-speed__l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Features ─── */}
        <div className="detail__section">
          <span className="section-tag">Feature set</span>
          <h2 className="detail__section-title">
            Everything it <span className="carto-gradient">does</span>
          </h2>
          <div className="carto-features">
            {featureGroups.map((g) => (
              <div key={g.title} className="carto-fgroup glass-card">
                <div className="carto-fgroup__title">{g.title}</div>
                <ul className="carto-fgroup__list">
                  {g.items.map((it) => (
                    <li key={it} className="carto-fgroup__item">
                      <span className="carto-fgroup__dot" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Honest scope ─── */}
        <div className="detail__section">
          <span className="section-tag">Scope</span>
          <h2 className="detail__section-title">
            What it deliberately <span className="carto-gradient">doesn't do</span>
          </h2>
          <div className="carto-scope glass-card">
            <div className="carto-scope__img-wrap">
              <img
                src="/images/cartographer/error-state.webp"
                alt="Typed, actionable error states"
                className="carto-scope__img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="carto-scope__body">
              <ul className="carto-scope__list">
                {scope.map((s) => (
                  <li key={s} className="carto-scope__item">
                    <span className="carto-scope__mark">—</span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="carto-scope__note">
                The constraints are deliberate, and every failure mode has a typed, actionable error
                state rather than a blank screen.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Stack ─── */}
        <div className="detail__section">
          <span className="section-tag">Stack</span>
          <h2 className="detail__section-title">
            Under the <span className="carto-gradient">hood</span>
          </h2>
          <p className="detail__section-sub">
            Roughly 6,200 lines across 41 TypeScript and CSS files. Solo project.
          </p>
          <div className="carto-stack">
            {stack.map((s) => (
              <div key={s.group} className="carto-stack__row">
                <div className="carto-stack__group">{s.group}</div>
                <div className="carto-stack__items">
                  {s.items.map((it) => (
                    <span key={it} className="tag carto-tag">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="detail__section carto-cta-section">
          <div className="carto-cta glass-card">
            <div className="carto-cta__icon">🧭</div>
            <div>
              <div className="carto-cta__title">Map a repository yourself</div>
              <div className="carto-cta__sub">
                Any public GitHub repo, no sign-in. Try vercel/swr, pmndrs/zustand or your own.
              </div>
            </div>
            <a href={LIVE} target="_blank" rel="noopener noreferrer" className="btn carto-btn--primary carto-cta__btn">
              Open the app
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
        </div>

      </div>

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div className="kom-lightbox" onClick={closeLightbox}>
          <button className="kom-lightbox__close" onClick={closeLightbox}>
            <FiX size={22} />
          </button>
          <button
            className="kom-lightbox__nav kom-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            ‹
          </button>
          <div className="kom-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={screens[lightbox].img} alt={screens[lightbox].title} className="kom-lightbox__img" />
            <div className="kom-lightbox__caption">
              <span className="carto-gradient">{screens[lightbox].label}</span>
              {' · '}
              {screens[lightbox].title}
            </div>
          </div>
          <button
            className="kom-lightbox__nav kom-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            ›
          </button>
        </div>
      )}

      <NextProject />

      <footer className="footer">
        <p>© 2026 Developed by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default CartographerDetail;
