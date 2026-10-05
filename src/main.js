import './styles/main.css';
import {
  siteProfile,
  aboutData,
  expertiseData,
  journeyData,
  educationData,
  trainingTopics,
  congressEventData,
  organizationsData,
  publicationsData,
  achievementsData,
  humanSideData
} from './data/portfolioData.js';
import testimonials from './data/testimonials.json';
import { MotionEngine } from './motion/motionEngine.js';
import { getAssetUrl } from './utils/paths.js';

// SVG Icons Generator
const Icons = {
  briefcase: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  cpu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  landmark: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18"/><line x1="10" x2="10" y1="18"/><line x1="14" x2="14" y1="18"/><line x1="18" x2="18" y1="18"/><polygon points="12 2 20 7 4 7"/></svg>`,
  users: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  bookOpen: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  trendingUp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  fileText: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  mic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>`,
  badgeCheck: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  compass: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  sparkles: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  messageSquare: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  target: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  heartHandshake: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  coins: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
  lightbulb: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  shieldAlert: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  userCheck: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  graduationCap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  facebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  mapPin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  download: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  chevronLeft: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  arrowUp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  play: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  volume2: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeX: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`
};

function getSocialIcon(name) {
  if (name.toLowerCase() === 'linkedin') return Icons.linkedin;
  if (name.toLowerCase() === 'instagram') return Icons.instagram;
  if (name.toLowerCase() === 'facebook') return Icons.facebook;
  return '';
}

// Render Header Navigation
function renderHeader() {
  return `
    <header class="site-header" id="site-header">
      <div class="container header-container">
        <a href="#hero" class="brand-logo" aria-label="Dr. Vishal Kattery Home">
          <span>Dr. Vishal</span> <span class="brand-accent">Kattery</span>
        </a>

        <nav class="desktop-nav" aria-label="Main Navigation">
          <a href="#hero" class="nav-link active">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#expertise" class="nav-link">Expertise</a>
          <a href="#journey" class="nav-link">Journey</a>
          <a href="#teaching" class="nav-link">Teaching</a>
          <a href="#research" class="nav-link">Publications</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>

        <div class="header-actions">
          <a href="#contact" class="btn btn-primary" style="padding: 0.6rem 1.4rem; font-size: 0.88rem; gap: 0.5rem;">
            Let's Connect
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Dark/Light Theme">
            <span class="theme-icon-container">${Icons.sun}</span>
          </button>
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Navigation Menu">
            ${Icons.menu}
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-nav-drawer" id="mobile-nav-drawer">
      <div style="display: flex; justify-content: flex-end; margin-bottom: 2rem;">
        <button class="mobile-menu-btn" id="mobile-drawer-close" aria-label="Close Menu">
          ${Icons.x}
        </button>
      </div>
      <div class="mobile-nav-links">
        <a href="#hero" class="mobile-nav-link active">Home</a>
        <a href="#about" class="mobile-nav-link">About</a>
        <a href="#expertise" class="mobile-nav-link">Expertise</a>
        <a href="#journey" class="mobile-nav-link">Journey</a>
        <a href="#education" class="mobile-nav-link">Education</a>
        <a href="#teaching" class="mobile-nav-link">Teaching & Impact</a>
        <a href="#speaking" class="mobile-nav-link">Speaking</a>
        <a href="#congress" class="mobile-nav-link">17th Co-op Congress</a>
        <a href="#research" class="mobile-nav-link">Research & Publications</a>
        <a href="#testimonials" class="mobile-nav-link">Testimonials</a>
        <a href="#human" class="mobile-nav-link">Human Side</a>
        <a href="#contact" class="mobile-nav-link">Contact</a>
      </div>
      <div class="mobile-nav-socials">
        ${siteProfile.socials.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name}">
            ${getSocialIcon(s.name)}
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Redesigned Hero Section
function renderHero() {
  return `
    <section class="hero-cinematic" id="hero">
      <!-- Atmospheric Backdrop Behind Portrait -->
      <div class="hero-backdrop-glow"></div>
      <div class="hero-backdrop-circle"></div>

      <!-- Floating 3D Geometric Accents -->
      <div class="hero-deco-torus"></div>
      <div class="hero-deco-sphere-1"></div>
      <div class="hero-deco-sphere-2"></div>
      <div class="hero-deco-sphere-3"></div>
      <div class="hero-deco-sphere-4"></div>

      <!-- Flowing Background Contour Lines -->
      <svg class="hero-contour-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 520 C 300 370, 600 710, 1100 420 C 1300 300, 1500 340, 1600 320" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5" stroke-dasharray="6 6" />
        <path d="M-50 260 C 400 470, 800 210, 1200 490 C 1350 590, 1550 510, 1650 460" stroke="rgba(37, 99, 235, 0.28)" stroke-width="2" />
      </svg>

      <div class="container" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="hero-main-stage">
          <!-- LEFT ZONE: Editorial Identity & CTAs -->
          <div class="hero-zone-left">
            <div class="hero-eyebrow">Hello, I'm</div>
            <h1 class="hero-name-editorial">
              <span class="hero-name-top">Dr. VISHAL</span>
              <span class="hero-name-accent">KATTERY</span>
            </h1>
            <div class="hero-positioning-line">
              <span>Professor</span><span class="divider">|</span>
              <span>Mentor</span><span class="divider">|</span>
              <span>Placement Trainer</span><span class="divider">|</span>
              <span>Counselor</span><span class="divider">|</span>
              <span>Banker</span>
            </div>
            <p class="hero-lead-text">
              An academic professional combining teaching, research, and industry experience in banking, HR, and IT to deliver industry-relevant learning and student empowerment.
            </p>
            <div class="hero-cta-group">
              <a href="#about" class="btn-hero-primary">
                Explore My Journey
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="${getAssetUrl(siteProfile.resumePdf)}" download="Dr_Vishal_Kattery_CV.pdf" class="btn-hero-secondary">
                ${Icons.download}
                Download Resume
              </a>
            </div>
            <div class="hero-socials-row">
              ${siteProfile.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-badge-btn" aria-label="${s.name} Profile">
                  ${getSocialIcon(s.name)}
                </a>
              `).join('')}
            </div>
          </div>

          <!-- CENTER ZONE: Large Centered Transparent Cutout Portrait -->
          <div class="hero-zone-center">
            <div class="hero-portrait-stage">
              <div class="hero-cutout-img-wrap" id="hero-cutout-wrap">
                <img 
                  src="${getAssetUrl('/assets/images/hero/hero.png')}" 
                  alt="Dr. Vishal Kattery Transparent Cutout Portrait" 
                  class="hero-cutout-img" 
                  id="hero-cutout-img" 
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          <!-- RIGHT ZONE: Floating Professional Capability Cards -->
          <div class="hero-zone-right">
            <div class="hero-cards-grid">
              <!-- Card 1: Academic Professional -->
              <div class="hero-capability-card card-float-1">
                <div class="card-icon-header">
                  <div class="card-illustration-wrap">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <div class="card-status-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                </div>
                <div class="hero-card-title">Academic Professional</div>
                <div class="hero-card-topics">Teaching | Research | Guidance</div>
              </div>

              <!-- Card 2: Career Counselling -->
              <div class="hero-capability-card card-float-2">
                <div class="card-icon-header">
                  <div class="card-illustration-wrap" style="background: rgba(245, 158, 11, 0.1);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div class="card-status-pill" style="background: #f59e0b;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>
                <div class="hero-card-title">Career Counselling</div>
                <div class="hero-card-topics">Student Mentoring | Career Guidance</div>
              </div>

              <!-- Card 3: Placement Training -->
              <div class="hero-capability-card card-float-3">
                <div class="card-icon-header">
                  <div class="card-illustration-wrap" style="background: rgba(16, 185, 129, 0.1);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                    </svg>
                  </div>
                  <div class="card-status-pill" style="background: #10b981;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                </div>
                <div class="hero-card-title">Placement Training</div>
                <div class="hero-card-topics">Skill Development | Industry Readiness</div>
              </div>

              <!-- Card 4: Motivational Speaker -->
              <div class="hero-capability-card card-float-4">
                <div class="card-icon-header">
                  <div class="card-illustration-wrap" style="background: rgba(139, 92, 246, 0.1);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2">
                      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/>
                    </svg>
                  </div>
                  <div class="card-status-pill" style="background: #8b5cf6;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  </div>
                </div>
                <div class="hero-card-title">Motivational Speaker</div>
                <div class="hero-card-topics">Workshops | Seminars | Empowerment</div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM CAPABILITY BAR / DOCK -->
        <div class="hero-bottom-bar">
          <div class="hero-bottom-items">
            <div class="hero-bottom-item">
              <span class="bottom-item-icon">${Icons.bookOpen}</span>
              <span class="bottom-item-text">Teaching & Mentoring</span>
            </div>
            <div class="hero-bottom-item">
              <span class="bottom-item-icon">${Icons.users}</span>
              <span class="bottom-item-text">Career Development</span>
            </div>
            <div class="hero-bottom-item">
              <span class="bottom-item-icon">${Icons.trendingUp}</span>
              <span class="bottom-item-text">Research & Publications</span>
            </div>
            <div class="hero-bottom-item">
              <span class="bottom-item-icon">${Icons.briefcase}</span>
              <span class="bottom-item-text">Industry Exposure</span>
            </div>
          </div>
          <div class="hero-scroll-indicator">
            <div class="scroll-mouse-icon">
              <div class="scroll-mouse-wheel"></div>
            </div>
            <span>SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="section" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-media-stack">
            <div class="about-main-img-wrap">
              <img src="${getAssetUrl('/assets/images/portraits/random.jpeg')}" alt="Dr. Vishal Kattery" class="about-main-img" loading="lazy" />
            </div>
            <div class="about-overlay-quote">
              <p class="about-quote-text">${aboutData.quote}</p>
              <div class="about-quote-author">— Dr. Vishal Kattery</div>
            </div>
          </div>

          <div class="about-story">
            <div>
              <span class="section-tag">${aboutData.subtitle}</span>
              <h2 class="section-title">${aboutData.title}</h2>
              <p class="about-lead">${aboutData.lead}</p>
            </div>
            ${aboutData.paragraphs.map(p => `<p class="about-p">${p}</p>`).join('')}

            <div class="about-stats-grid">
              ${aboutData.highlights.map(h => `
                <div class="about-stat-card">
                  <div class="about-stat-val">${h.value}</div>
                  <div class="about-stat-lbl">${h.label}</div>
                  <div class="about-stat-note">${h.note}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderExpertise() {
  return `
    <section class="section" id="expertise" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header" style="text-align: center; max-width: 740px; margin-left: auto; margin-right: auto;">
          <span class="section-tag">Interactive Matrix</span>
          <h2 class="section-title">One Professional. Many Roles.</h2>
          <p class="section-subtitle">
            An interdisciplinary domain spanning academic theory, cooperative banking frameworks, enterprise IT programming, and transformative youth mentoring.
          </p>
        </div>

        <div class="expertise-matrix">
          ${expertiseData.map(exp => `
            <div class="expertise-card" tabindex="0">
              <div class="expertise-card-icon">
                ${Icons[exp.icon] || Icons.briefcase}
              </div>
              <h3 class="expertise-card-title">${exp.title}</h3>
              <p class="expertise-card-desc">${exp.desc}</p>
              <div class="expertise-topics-list">
                ${exp.topics.map(t => `<span class="topic-pill">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderJourney() {
  return `
    <section class="section" id="journey">
      <div class="container">
        <div class="section-header" style="text-align: center; max-width: 720px; margin-left: auto; margin-right: auto;">
          <span class="section-tag">Chronology</span>
          <h2 class="section-title">From Experience to Purpose</h2>
          <p class="section-subtitle">
            A continuous career trajectory moving fluidly between enterprise software, cooperative banking administration, university academia, and corporate governance.
          </p>
        </div>

        <div class="journey-timeline-wrap">
          <div class="timeline-rail">
            <div class="timeline-rail-progress"></div>
          </div>

          ${journeyData.map((item, idx) => `
            <div class="timeline-item">
              <div class="timeline-node"></div>
              <div class="timeline-content-left">
                ${idx % 2 === 0 ? `
                  <div class="timeline-period-badge">${item.period}</div>
                  <div class="timeline-card">
                    <span class="badge" style="margin-bottom: 0.75rem;">${item.badge}</span>
                    <h3 class="timeline-role">${item.role}</h3>
                    <div class="timeline-org">${item.organization}</div>
                    <p class="timeline-desc">${item.description}</p>
                  </div>
                ` : ''}
              </div>
              <div class="timeline-content-right">
                ${idx % 2 !== 0 ? `
                  <div class="timeline-period-badge">${item.period}</div>
                  <div class="timeline-card">
                    <span class="badge" style="margin-bottom: 0.75rem;">${item.badge}</span>
                    <h3 class="timeline-role">${item.role}</h3>
                    <div class="timeline-org">${item.organization}</div>
                    <p class="timeline-desc">${item.description}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderEducation() {
  return `
    <section class="section" id="education" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Academic Credentials</span>
          <h2 class="section-title">Scholarly Foundations</h2>
          <p class="section-subtitle">
            Formal qualifications spanning doctoral research in management, commerce, business administration, and computer applications.
          </p>
        </div>

        <div class="education-grid">
          ${educationData.map(edu => `
            <div class="education-card">
              <div class="edu-icon-wrap">
                ${Icons.graduationCap}
              </div>
              <div class="edu-content">
                <div class="edu-top-meta">
                  <span class="badge">${edu.type}</span>
                  <span class="edu-period">${edu.period}</span>
                </div>
                <h3 class="edu-degree">${edu.degree}</h3>
                <div class="edu-institution">${edu.institution}</div>
                <p class="edu-focus">${edu.focus}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderTeaching() {
  return `
    <section class="section" id="teaching">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Pedagogy & Impact</span>
          <h2 class="section-title">Teaching & Student Impact</h2>
          <p class="section-subtitle">
            Empowering students with industry-relevant skills, corporate readiness, and emotional resilience across classrooms and campuses in South India.
          </p>
        </div>

        <div class="teaching-hero-banner">
          <div class="teaching-hero-grid">
            <div>
              <h3 class="teaching-banner-title">Shaping Future Leaders Through Active Mentorship</h3>
              <p class="teaching-banner-sub">
                Bridging the vital gap between collegiate syllabi and corporate workplace expectations through rigorous placement training, real-time interview preparedness, and life-skills cultivation.
              </p>
            </div>
            <div class="teaching-counter-box">
              <div class="teaching-counter-num">100+</div>
              <div class="teaching-counter-label">Sessions Delivered</div>
              <div class="teaching-counter-note">Across schools & colleges in South India</div>
            </div>
          </div>
        </div>

        <!-- Video Player Section -->
        <div class="classroom-video-container" id="video-section">
          <video id="classroom-video" class="classroom-video" muted playsinline loop poster="${getAssetUrl('/assets/images/teaching/classroom training.jpg')}">
            <source src="${getAssetUrl('/assets/video/classroom video.mp4')}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div class="video-controls-bar">
            <div class="video-label-info">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></span>
              Classroom Training Session in Action
            </div>
            <div class="video-btn-group">
              <button class="video-control-btn" id="video-play-btn" aria-label="Play or Pause Video">
                ${Icons.play}
              </button>
              <button class="video-control-btn" id="video-mute-btn" aria-label="Mute or Unmute Video">
                ${Icons.volumeX}
              </button>
            </div>
          </div>
        </div>

        <!-- Training Themes Grid -->
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Curated Training & Mentoring Themes</h3>
        </div>

        <div class="training-topics-grid">
          ${trainingTopics.map(item => `
            <div class="training-topic-card">
              <div class="training-topic-icon">
                ${Icons[item.icon] || Icons.target}
              </div>
              <h4 class="training-topic-title">${item.title}</h4>
              <p class="training-topic-desc">${item.desc}</p>
            </div>
          `).join('')}
        </div>

        <!-- Classroom Moments Mosaic -->
        <div style="margin-top: 4rem; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Authentic Classroom & Student Interactions</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Documented sessions from vocational training, group discussions, and student milestone celebrations.</p>
        </div>

        <div class="photo-mosaic">
          <div class="mosaic-item span-2">
            <img src="${getAssetUrl('/assets/images/teaching/classroom training.jpg')}" alt="Classroom Training" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">Interactive Classroom Lecture</div>
          </div>
          <div class="mosaic-item">
            <img src="${getAssetUrl('/assets/images/students/interactions with student.jpg')}" alt="Student Interaction" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">One-on-One Student Guidance</div>
          </div>
          <div class="mosaic-item">
            <img src="${getAssetUrl('/assets/images/students/motivational class.jpg')}" alt="Motivational Class" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">Youth Motivational Session</div>
          </div>
          <div class="mosaic-item">
            <img src="${getAssetUrl('/assets/images/teaching/classroom training 0.jpg')}" alt="Training Session" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">Career Preparedness Workshop</div>
          </div>
          <div class="mosaic-item">
            <img src="${getAssetUrl('/assets/images/students/celebration with students.jpg')}" alt="Celebration with Students" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">Celebrating Academic Achievements</div>
          </div>
          <div class="mosaic-item span-2">
            <img src="${getAssetUrl('/assets/images/teaching/classroom training 3.jpg')}" alt="Group Discussion" class="mosaic-img" loading="lazy" />
            <div class="mosaic-caption">Group Discussion & Soft Skills Practice</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSpeaking() {
  return `
    <section class="section" id="speaking" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Keynote & Engagement</span>
          <h2 class="section-title">Speaking & Public Engagement</h2>
          <p class="section-subtitle">
            Engaging large audiences at academic symposiums, cooperative society conventions, and institutional youth forums across South India.
          </p>
        </div>

        <div class="speaking-editorial-grid">
          <div class="speaking-highlight-card">
            <div class="speaking-img-wrap">
              <img src="${getAssetUrl('/assets/images/speaking/on stage addressing crowd.jpg')}" alt="Addressing Gathering" class="speaking-img" loading="lazy" />
            </div>
            <div class="speaking-content">
              <div>
                <span class="badge" style="margin-bottom: 0.75rem;">Keynote Address</span>
                <h3 class="speaking-title">Empowering Youth Through Career Clarity</h3>
                <p class="speaking-desc">
                  Keynote sessions addressing emerging collegiate graduates on navigating market disruptions, maintaining psychological resilience, and building intentional career trajectories.
                </p>
              </div>
            </div>
          </div>

          <div class="speaking-highlight-card">
            <div class="speaking-img-wrap">
              <img src="${getAssetUrl('/assets/images/speaking/speach from co operative bank seminar.jpeg')}" alt="Co-operative Bank Seminar" class="speaking-img" loading="lazy" />
            </div>
            <div class="speaking-content">
              <div>
                <span class="badge" style="margin-bottom: 0.75rem;">Institutional Seminar</span>
                <h3 class="speaking-title">Cooperative Banking & Financial Resilience</h3>
                <p class="speaking-desc">
                  Facilitating institutional workshops on cooperative banking governance, employee stress mitigation, and operational excellence for banking personnel and administrators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCongress() {
  return `
    <section class="section" id="congress">
      <div class="container">
        <div class="congress-feature-card">
          <div class="congress-grid">
            <div>
              <div class="congress-header-meta">
                <span class="badge">National Engagement</span>
                <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border-color: var(--border-subtle);">${congressEventData.location}</span>
              </div>
              <h2 class="congress-title">${congressEventData.title}</h2>
              <div class="congress-inauguration">
                ${Icons.award} ${congressEventData.inauguration}
              </div>
              <p class="congress-summary">${congressEventData.summary}</p>

              <div class="congress-themes-list">
                ${congressEventData.keyThemes.map(t => `
                  <div class="congress-theme-item">
                    <span class="congress-theme-dot"></span>
                    <span>${t}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="congress-media-frame">
              <img src="${getAssetUrl(congressEventData.images[0].src)}" alt="${congressEventData.images[0].caption}" class="congress-img" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderOrganizations() {
  return `
    <section class="section" id="organizations" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Institutions & Civic Engagement</span>
          <h2 class="section-title">Organizations & Community</h2>
          <p class="section-subtitle">
            Long-standing associations with academic institutes and dedicated civic disaster relief teams across Kerala.
          </p>
        </div>

        <div class="orgs-grid">
          <div>
            <h3 class="org-column-title">
              <span class="dot"></span> Academic Faculty Roles
            </h3>
            <div class="org-cards-stack">
              ${organizationsData.academic.map(org => `
                <div class="org-card">
                  <div class="org-name">${org.name}</div>
                  <div class="org-role">${org.role} &bull; <span style="color: var(--text-muted);">${org.period}</span></div>
                  <p class="org-desc">${org.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div>
            <h3 class="org-column-title">
              <span class="dot" style="background: #ef4444;"></span> Volunteer & Disaster Management
            </h3>
            <div class="org-cards-stack">
              ${organizationsData.volunteer.map(org => `
                <div class="org-card">
                  <div class="org-name">${org.name}</div>
                  <div class="org-role">${org.role} &bull; <span style="color: var(--text-muted);">${org.period}</span> (${org.affiliation})</div>
                  <p class="org-desc">${org.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="istd-card">
          <div class="istd-info">
            <span class="badge" style="margin-bottom: 0.5rem;">${organizationsData.membership.registration}</span>
            <h4>${organizationsData.membership.title} — ${organizationsData.membership.organization}</h4>
            <p>${organizationsData.membership.desc}</p>
          </div>
          <div style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--accent-light); white-space: nowrap;">
            ISTD Life Member
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderResearch() {
  return `
    <section class="section" id="research">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Scholarly Contributions</span>
          <h2 class="section-title">Research & Publications</h2>
          <p class="section-subtitle">
            Peer-reviewed research and SCOPUS-indexed studies investigating banking employee commitment, organizational stress, SME sustainability, and artificial intelligence in commerce.
          </p>
        </div>

        <div class="publications-stack">
          ${publicationsData.map(pub => `
            <div class="pub-card">
              <div>
                <h3 class="pub-title">${pub.title}</h3>
                <div class="pub-venue">
                  <strong>Venue:</strong> ${pub.venue} ${pub.details ? `&bull; ${pub.details}` : ''} ${pub.pages ? `&bull; ${pub.pages}` : ''}
                </div>
                <div class="pub-tags">
                  <span class="badge">${pub.badge}</span>
                  <span class="badge" style="background: var(--bg-surface-elevated); color: var(--text-secondary); border-color: var(--border-subtle);">${pub.focus}</span>
                </div>
              </div>
              <div>
                <span class="badge" style="padding: 0.5rem 1rem; font-size: 0.85rem;">${pub.indexing || 'Published'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAchievements() {
  return `
    <section class="section" id="achievements" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header" style="text-align: center; max-width: 680px; margin-left: auto; margin-right: auto;">
          <span class="section-tag">Milestones</span>
          <h2 class="section-title">Recognition & Standing</h2>
          <p class="section-subtitle">
            Verified academic and professional milestones strictly supported by documented credentials and source publications.
          </p>
        </div>

        <div class="achievements-grid">
          ${achievementsData.map(item => `
            <div class="achievement-card">
              <div class="achievement-icon">
                ${Icons[item.icon] || Icons.award}
              </div>
              <h3 class="achievement-title">${item.title}</h3>
              <div class="achievement-issuer">${item.issuer}</div>
              <p class="achievement-detail">${item.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderTestimonials() {
  const hasData = Array.isArray(testimonials) && testimonials.length > 0;

  return `
    <section class="section" id="testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Endorsements & Recommendations</span>
          <h2 class="section-title">Testimonials</h2>
          <p class="section-subtitle">
            Feedback and reflections from students, institutional leadership, and academic colleagues.
          </p>
        </div>

        <div class="testimonials-wrapper" id="testimonials-wrapper">
          ${!hasData ? `
            <div class="testimonials-empty-state">
              <div class="empty-icon-wrap">
                ${Icons.messageSquare}
              </div>
              <h3 class="empty-title">No testimonials added yet.</h3>
              <p class="empty-sub">
                This section connects directly to <code>content/testimonials/testimonials.xlsx</code>.
                When authentic student or faculty recommendations are added to the Excel workbook and the site is rebuilt, they will automatically appear here.
              </p>
              <div class="empty-pill">Development state &bull; Excel Ingestion Ready</div>
            </div>
          ` : `
            <div class="testimonials-carousel" id="testimonial-carousel">
              ${testimonials.map((t, idx) => `
                <div class="testimonial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                  <div class="testimonial-quote-icon">“</div>
                  <div class="testimonial-quote-text">${t.testimony}</div>
                  <div class="testimonial-author-block">
                    <div class="author-meta">
                      <span class="author-name">${t.name}</span>
                      <span class="author-role-inst">
                        ${[t.role, t.institution].filter(Boolean).join(' &bull; ')}
                      </span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
              <div class="testimonial-counter" id="testimonial-counter">
                01 / ${String(testimonials.length).padStart(2, '0')}
              </div>
              <div class="testimonial-nav-controls">
                <button class="test-nav-btn" id="test-prev-btn" aria-label="Previous Testimonial">
                  ${Icons.chevronLeft}
                </button>
                <button class="test-nav-btn" id="test-next-btn" aria-label="Next Testimonial">
                  ${Icons.chevronRight}
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    </section>
  `;
}

function renderHumanSide() {
  return `
    <section class="section" id="human" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Personal Reflections</span>
          <h2 class="section-title">${humanSideData.title}</h2>
          <p class="section-subtitle">${humanSideData.intro}</p>
        </div>

        <div class="human-grid">
          ${humanSideData.moments.map(m => `
            <div class="human-card">
              <div class="human-img-frame">
                <img src="${getAssetUrl(m.src)}" alt="${m.caption}" class="human-img" loading="lazy" />
              </div>
              <div class="human-content">
                <div class="human-tag">${m.tag}</div>
                <div class="human-caption">${m.caption}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="section" id="contact">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Get in Touch</span>
          <h2 class="section-title">Let's Connect</h2>
          <p class="section-subtitle">
            Open to academic guest lectures, faculty development programs, placement bootcamps, keynote invitations, and research collaborations.
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-channels">
              <div class="contact-card">
                <div class="contact-card-icon">${Icons.mapPin}</div>
                <div>
                  <div class="contact-card-label">Location</div>
                  <div class="contact-card-val">${siteProfile.location}</div>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">${Icons.phone}</div>
                <div>
                  <div class="contact-card-label">Phone</div>
                  <a href="tel:${siteProfile.phone.replace(/\s+/g, '')}" class="contact-card-val" style="color: inherit;">
                    ${siteProfile.phone}
                  </a>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">${Icons.mail}</div>
                <div>
                  <div class="contact-card-label">Email</div>
                  <a href="mailto:${siteProfile.email}" class="contact-card-val" style="color: inherit;">
                    ${siteProfile.email}
                  </a>
                </div>
              </div>

              <a href="${getAssetUrl(siteProfile.resumePdf)}" download="Dr_Vishal_Kattery_CV.pdf" class="contact-card" style="text-decoration: none;">
                <div class="contact-card-icon">${Icons.download}</div>
                <div>
                  <div class="contact-card-label">Curriculum Vitae</div>
                  <div class="contact-card-val" style="color: var(--accent-light);">Download Complete Resume (PDF)</div>
                </div>
              </a>
            </div>

            <div>
              <div style="font-size: 0.85rem; font-family: var(--font-mono); text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem;">
                Professional Social Links
              </div>
              <div class="social-links-row">
                ${siteProfile.socials.map(s => `
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name} Profile">
                    ${getSocialIcon(s.name)}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="contact-form-panel">
            <form id="contact-form" onsubmit="event.preventDefault(); window.location.href='mailto:${siteProfile.email}?subject=' + encodeURIComponent(document.getElementById('c-subject').value) + '&body=' + encodeURIComponent('From: ' + document.getElementById('c-name').value + ' (' + document.getElementById('c-email').value + ')\n\n' + document.getElementById('c-message').value);">
              <div class="form-group">
                <label for="c-name" class="form-label">Your Name</label>
                <input type="text" id="c-name" class="form-control" placeholder="Prof. / Dr. / Mr. / Ms." required />
              </div>
              <div class="form-group">
                <label for="c-email" class="form-label">Email Address</label>
                <input type="email" id="c-email" class="form-control" placeholder="name@institution.edu" required />
              </div>
              <div class="form-group">
                <label for="c-subject" class="form-label">Purpose of Contact</label>
                <input type="text" id="c-subject" class="form-control" placeholder="e.g. Placement Training / Keynote / Academic Collaboration" required />
              </div>
              <div class="form-group">
                <label for="c-message" class="form-label">Message</label>
                <textarea id="c-message" class="form-control" placeholder="Share details regarding your institution, proposed dates, or engagement scope..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                Send Inquiry Directly
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <div class="brand-monogram">VK</div>
              <h3>${siteProfile.name}</h3>
            </div>
            <p>${siteProfile.title}</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">${siteProfile.location}</p>
          </div>

          <div>
            <div class="footer-heading">Navigation</div>
            <ul class="footer-nav-list">
              <li><a href="#about">About Dr. Vishal</a></li>
              <li><a href="#expertise">Domains of Expertise</a></li>
              <li><a href="#journey">Career Journey</a></li>
              <li><a href="#education">Academic Credentials</a></li>
              <li><a href="#teaching">Teaching & Student Impact</a></li>
              <li><a href="#speaking">Keynotes & Speaking</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-heading">Connect Directly</div>
            <ul class="footer-nav-list" style="margin-bottom: 1.5rem;">
              <li><a href="mailto:${siteProfile.email}">${siteProfile.email}</a></li>
              <li><a href="tel:${siteProfile.phone.replace(/\s+/g, '')}">${siteProfile.phone}</a></li>
            </ul>
            <div class="social-links-row">
              ${siteProfile.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name} Profile">
                  ${getSocialIcon(s.name)}
                </a>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>&copy; ${new Date().getFullYear()} Dr. Vishal Kattery. All rights reserved.</div>
          <button class="back-to-top-btn" id="back-to-top-btn" aria-label="Back to Top">
            ${Icons.arrowUp}
          </button>
        </div>
      </div>
    </footer>
  `;
}

// Main Application Initialization
function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Ambient Lighting & Film Grain -->
    <div class="bg-ambient">
      <div class="bg-ambient-orb orb-1"></div>
      <div class="bg-ambient-orb orb-2"></div>
      <div class="bg-ambient-orb orb-3"></div>
    </div>
    <div class="grain-overlay"></div>

    <!-- Custom Cursor (Desktop) -->
    <div class="custom-cursor"></div>
    <div class="custom-cursor-follower"></div>

    <!-- Loading Veil -->
    <div class="loading-veil" id="loading-veil">
      <div class="veil-monogram">VK</div>
      <div class="veil-name">Dr. Vishal Kattery</div>
      <div class="veil-bar">
        <div class="veil-bar-fill"></div>
      </div>
    </div>

    <!-- Header Navigation -->
    ${renderHeader()}

    <!-- Main Content Flow -->
    <main>
      ${renderHero()}
      ${renderAbout()}
      ${renderExpertise()}
      ${renderJourney()}
      ${renderEducation()}
      ${renderTeaching()}
      ${renderSpeaking()}
      ${renderCongress()}
      ${renderOrganizations()}
      ${renderResearch()}
      ${renderAchievements()}
      ${renderTestimonials()}
      ${renderHumanSide()}
      ${renderContact()}
    </main>

    <!-- Footer -->
    ${renderFooter()}
  `;

  // Initialize Motion Engine
  const motion = new MotionEngine();
  motion.init();

  // Setup Theme Switcher
  setupTheme();

  // Setup Header Scroll Effect
  setupHeaderScroll();

  // Setup Mobile Menu
  setupMobileMenu();

  // Setup Video Player Controls
  setupVideoControls();

  // Setup Testimonials Carousel (if data present)
  setupTestimonialCarousel();

  // Setup Back to top
  document.getElementById('back-to-top-btn')?.addEventListener('click', () => {
    if (motion.lenis) {
      motion.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Dissolve Loading Veil
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loading-veil')?.classList.add('loaded');
    }, 400);
  });

  // Fallback in case load already fired
  setTimeout(() => {
    document.getElementById('loading-veil')?.classList.add('loaded');
  }, 1000);
}

function setupTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const container = document.querySelector('.theme-icon-container');
  if (container) {
    container.innerHTML = theme === 'dark' ? Icons.sun : Icons.moon;
  }
}

function setupHeaderScroll() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

function setupMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-nav-drawer');

  openBtn?.addEventListener('click', () => {
    drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    drawer?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function setupVideoControls() {
  const video = document.getElementById('classroom-video');
  const playBtn = document.getElementById('video-play-btn');
  const muteBtn = document.getElementById('video-mute-btn');

  if (!video || !playBtn || !muteBtn) return;

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = Icons.pause;
    } else {
      video.pause();
      playBtn.innerHTML = Icons.play;
    }
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? Icons.volumeX : Icons.volume2;
  });

  // Try muted autoplay if permitted by browser policy
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      playBtn.innerHTML = Icons.pause;
    }).catch(() => {
      // Auto-play was prevented; leave play button ready
      playBtn.innerHTML = Icons.play;
    });
  }
}

function setupTestimonialCarousel() {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return;

  let currentIndex = 0;
  const total = testimonials.length;
  const slides = document.querySelectorAll('.testimonial-slide');
  const counter = document.getElementById('testimonial-counter');
  const prevBtn = document.getElementById('test-prev-btn');
  const nextBtn = document.getElementById('test-next-btn');

  const showSlide = (index) => {
    currentIndex = (index + total) % total;
    slides.forEach((s, idx) => {
      if (idx === currentIndex) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    if (counter) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
  };

  prevBtn?.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => showSlide(currentIndex + 1));

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const section = document.getElementById('testimonials');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  const carouselEl = document.getElementById('testimonial-carousel');
  carouselEl?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselEl?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) showSlide(currentIndex + 1);
    if (touchEndX - touchStartX > 50) showSlide(currentIndex - 1);
  }, { passive: true });
}

// Start Application
document.addEventListener('DOMContentLoaded', initApp);
