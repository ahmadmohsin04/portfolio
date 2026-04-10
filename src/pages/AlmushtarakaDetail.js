import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import '../App.css';
import './AlmushtarakaDetail.css';

const modules = [
  {
    icon: '📝',
    title: 'Sales Agreement',
    features: [
      'Full sale agreement form with buyer details, products table, payment terms',
      'Multi-buyer support (add/remove buyers)',
      'Currency selector (AED, USD, PKR, EUR, GBP, SAR)',
      'Auto-generated reference numbers (SA/XXXX/MM/YYYY)',
      'Extra payment terms & standard terms with custom additions',
      'Subtotal, VAT, total auto-calculation',
      'Guarantor section with checkbox toggle',
      'Seller signature pre-loaded from asset',
      'Buyer signature canvases (in-person drawing)',
      'Live camera photo capture per buyer (verification)',
      'Customer ID document upload (front & back)',
    ],
  },
  {
    icon: '🏠',
    title: 'Lease Cum Sale Agreement',
    features: [
      'All Sales Agreement features included',
      'Token amount, delivery amount, installment months',
      'Custom installment start date',
      'Auto-generated monthly payment schedule',
      'Remaining balance calculation',
      'Guarantor in both sale and lease agreements',
    ],
  },
  {
    icon: '📄',
    title: 'PDF Generation',
    features: [
      'Programmatic PDF via jsPDF (no HTML capture)',
      'Company logo, header, watermark on every page',
      'Footer strip: buyer initials + guarantor name/CNIC when present',
      'Footer height adjusts based on guarantor presence',
      'Dedicated signatures page — all signatories on one page',
      'Customer ID documents page — 3 buyers per page (6 cards)',
      'Original vs Customer Copy — two separate download buttons',
      '"ORIGINAL" / "CUSTOMER COPY" badge on PDF',
    ],
  },
  {
    icon: '🔗',
    title: 'Remote Signing',
    features: [
      'Generate per-buyer share links',
      'Customer signs via /sign/:token on their own device',
      'Live photo capture on signing page',
      'Signatures & photos saved to Supabase',
      'Real-time draft preview updates via Supabase live subscription',
      'Signed/Pending status badge per buyer in preview',
      'Toast notification when a buyer signs remotely',
      'Signatures merged into agreements table on submission',
    ],
  },
  {
    icon: '📊',
    title: 'Agreement Dashboard',
    features: [
      'Login with hardcoded admin + Supabase employee accounts',
      'Role-based access (Admin, Manager, Sales Agent, Viewer)',
      'Save & resume drafts with custom names',
      'Draft type badge (Sale / Lease)',
      'Complete agreement button — marks draft as done',
      'Per-draft activity log drawer',
      'Global activity log with limit selector (30/60/90/150 entries)',
      'Clear activity log (admin/delete permission only)',
      'Delete draft with confirmation',
    ],
  },
  {
    icon: '👥',
    title: 'Customer Module',
    features: [
      'UAE & Pakistan customer types',
      'Full customer profile (company, rep, license, EID/CNIC, NTN, contact)',
      'ID document upload (front & back images to Supabase Storage)',
      'Partners section per customer (name + CNIC/EID + ID front/back)',
      'Customer search with filter tabs (All / UAE / Pakistan)',
      'Customer selector in agreement form — auto-fills buyer fields',
      'Partner ID images carry through to agreement form',
    ],
  },
  {
    icon: '🛡️',
    title: 'Admin Panel',
    features: [
      'Password-protected admin panel',
      'All submitted agreements with full detail view',
      'Agreement detail: buyer info, products, payment schedule, financial info',
      'Guarantor info + partner sections with uploaded ID images',
      'Remote signatures & photos visible in admin detail view',
      'Employees tab — add, edit, activate/deactivate, delete',
      'Roles: Admin, Manager, Sales Agent, Viewer',
      'Stats strip: total agreements, customers, employees, portfolio value',
    ],
  },
  {
    icon: '🏢',
    title: 'Hub — Operations Gateway',
    features: [
      'Password-protected hub at /hub',
      'Session persists via localStorage — no re-login when navigating away',
      'Lock button clears session',
      'Live clock + date display',
      'Live stats (agreements, customers, employees, total portfolio value)',
      'Three module cards with accent colours and pulsing indicators',
    ],
  },
  {
    icon: '🎨',
    title: 'UI, Auth & Deployment',
    features: [
      'Design tokens: --forest, --gold, --cream CSS variables',
      'Barlow Condensed headings, consistent typography across all modules',
      'Toast notifications (success, error, warning)',
      'Confirm dialog component for destructive actions',
      'Fully mobile responsive across all 8+ modules',
      'React Router with all module routes + public marketing home page',
      'Deployed on Vercel — production build verified clean',
    ],
  },
];

const tech = ['React 19', 'React Router', 'Supabase', 'jsPDF', 'jsPDF-AutoTable', 'Vercel'];

const AlmushtarakaDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-page app">
      {/* Background orbs */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* Back bar */}
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
        <div className="detail__hero">
          <span className="section-tag">Case Study</span>
          <h1 className="detail__title">
            Al-Mushtaraka <span className="gradient-text">Trading Co.</span>
          </h1>
          <p className="detail__tagline">
            A full-scale business operations platform built for a real UAE trading company — covering the entire lifecycle of trade agreements, customer management, remote signing, and admin oversight.
          </p>

          <div className="detail__hero-actions">
            <a
              href="https://www.almushtaraka.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Visit Live Site
              <FaExternalLinkAlt size={12} />
            </a>
          </div>

          <div className="detail__tech-strip">
            {tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ─── Video Demo ─── */}
        <div className="detail__section">
          <span className="section-tag">Demo</span>
          <h2 className="detail__section-title">Watch it in action</h2>
          <div className="detail__video-wrapper glass-card">
            <iframe
              src="https://drive.google.com/file/d/18xG9nSgn6iKglVt3aPVYR17sWAsVj3Zr/preview"
              title="Al-Mushtaraka Platform Demo"
              allow="autoplay"
              allowFullScreen
              className="detail__video"
            />
          </div>
        </div>

        {/* ─── Features ─── */}
        <div className="detail__section">
          <span className="section-tag">Functionality</span>
          <h2 className="detail__section-title">
            What's <span className="gradient-text">inside</span>
          </h2>
          <p className="detail__section-sub">
            9 fully functional modules, built and shipped to production.
          </p>
          <div className="detail__modules">
            {modules.map((mod) => (
              <div key={mod.title} className="module-card glass-card">
                <div className="module-card__header">
                  <span className="module-card__icon">{mod.icon}</span>
                  <h3 className="module-card__title">{mod.title}</h3>
                </div>
                <ul className="module-card__list">
                  {mod.features.map((f, i) => (
                    <li key={i} className="module-card__item">
                      <span className="module-card__check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="footer">
        <p>Crafted with care by <span className="gradient-text">Ahmad Mohsin</span></p>
      </footer>
    </div>
  );
};

export default AlmushtarakaDetail;
