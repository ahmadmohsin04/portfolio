/* ─── One list of the work ────────────────────────────────────
   The grid and the next-project navigation both read from here, so
   the running order can't drift between them — adding a project in
   one place used to mean it was missing from the other.

   `span` is the width of the card in a 12-column grid, and it is the
   ranking: the work is not all of equal weight and the layout should
   say so before the copy does. A uniform grid flattens a production
   platform and a UI exploration into the same claim.

   `line` is what the card shows — one clause, scannable down a column.
   `desc` is the longer read, and only the lead card has room for it. */

export const projects = [
  {
    key: 'almushtaraka',
    title: 'Al-Mushtaraka',
    span: 12,
    featured: true,
    type: 'web',
    line: 'A production trading platform, running live with real customers.',
    desc:
      'A production-grade trading operations platform — multi-module system with agreements, remote signing, customer management, admin panel, and PDF generation.',
    tech: ['React', 'Supabase', 'jsPDF', 'React Router'],
    link: '/projects/almushtaraka',
    live: 'https://www.almushtaraka.com',
  },
  {
    key: 'cartographer',
    title: 'Codebase Cartographer',
    span: 7,
    type: 'tool',
    line: 'Maps any GitHub repo into a narrated architecture diagram.',
    desc:
      'Paste any public GitHub repo and get an interactive, narrated map of its architecture — a dependency graph, a guided tour, and a plain-English explanation of every file. Handles 1,000+ file repos across 8 languages.',
    tech: ['Next.js', 'TypeScript', 'React Flow', 'Anthropic API', 'GitHub API'],
    link: '/projects/codebase-cartographer',
    live: 'https://codebase-cartographer-mohsin.vercel.app',
    liveLabel: 'Live Demo',
    github: 'https://github.com/ahmadmohsin04/codebase_cartographer',
  },
  {
    key: 'stock-pipeline',
    title: 'Real-Time Stock Pipeline',
    span: 5,
    type: 'data',
    line: 'Ingests live market prices every 60 seconds, containerised.',
    desc:
      'An automated data pipeline that ingests live stock prices every 60 seconds, validates and stores them, computes trading metrics, and serves it all on a live auto-refreshing dashboard. Containerized, tested, and deployed.',
    tech: ['Python', 'pandas', 'SQLAlchemy', 'Streamlit', 'Docker'],
    link: '/projects/stock-pipeline',
    live: 'https://stock-dashboard-qh6l.onrender.com',
    github: 'https://github.com/ahmadmohsin04/realtime-stock-pipeline',
  },
  {
    key: 'chess',
    title: 'Chess Master',
    span: 5,
    type: 'web',
    line: 'Stockfish at 20 levels, in a single file with no dependencies.',
    desc:
      'A fully playable chess game — Stockfish AI at 20 skill levels, dual chess clocks, move history, and sound effects. Built as a single HTML file with zero dependencies.',
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'chess.js', 'Stockfish AI'],
    link: '/projects/chess-master',
    live: 'https://playmasterchess.vercel.app/',
    linkedin:
      'https://www.linkedin.com/posts/ahmad-mohsin01_webdevelopment-javascript-chess-ugcPost-7469432174732210176-TMF8/',
  },
  {
    key: 'habit-tracker',
    title: 'Habit Tracker',
    span: 7,
    type: 'app',
    line: 'A Flutter habit app with local storage and a monthly heatmap.',
    desc:
      'A fully built Flutter app for tracking daily habits. Features a weekly check-in system, monthly heatmap, local ISAR storage, and full light & dark mode support. Open source on GitHub.',
    tech: ['Flutter', 'Dart', 'ISAR Database'],
    link: '/projects/habit-tracker',
    live: 'https://github.com/ahmadmohsin04/Habit-Tracker-App',
  },
  {
    key: 'crypto',
    title: 'Crypto Wallet UI',
    span: 4,
    type: 'design',
    line: 'A fintech wallet interface, built to standard.',
    desc:
      'A dark-themed cryptocurrency wallet interface — onboarding, live balance dashboard with LTV gauge, and a loan management flow. Built to fintech UI standards.',
    tech: ['Flutter', 'Dart', 'UI/UX'],
    link: '/projects/crypto-wallet',
    live: 'https://github.com/ahmadmohsin04/crypto-wallet-ui',
  },
  {
    key: 'komorebi',
    title: 'Komorebi',
    span: 4,
    type: 'design',
    line: 'Seven screens for a student companion app.',
    desc:
      'A student companion app with 7 screens across academics, productivity, and campus life — schedule, notes, planner, tasks, focus timer, and attendance. Backend in development.',
    tech: ['Flutter', 'Dart', 'UI/UX', 'Mobile Design'],
    link: '/projects/komorebi',
  },
  {
    key: 'medium',
    title: 'Medium — Landing Page',
    span: 4,
    type: 'design',
    line: 'Medium’s landing page, redesigned in Figma.',
    desc:
      "A modern redesign of Medium's landing page — cleaner layout, sharper hierarchy, and a high-conversion feel that holds up equally well on desktop and mobile. Designed in Figma as part of a design-before-code workflow.",
    tech: ['Figma', 'UI/UX', 'Design Systems'],
    link: '/projects/medium-redesign',
    live: 'https://www.figma.com/design/ZS4BXedDbppIbjpyhyByTU/Medium-Landing-Page?node-id=0-1',
    linkedin:
      'https://www.linkedin.com/posts/ahmad-mohsin01_figma-uiux-flutterdeveloper-share-7434875421629792257-tDfR',
  },
];

/* Wraps at the end, so the work is a loop rather than eight dead ends.
   Previously every detail page's only exit was the browser's back
   button. */
export const nextProject = (path) => {
  const i = projects.findIndex((p) => p.link === path);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
};
