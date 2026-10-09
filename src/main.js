import './styles/main.css';
import {
  siteProfile,
  heroData,
  aboutData,
  expertiseData,
  trainingCategories,
  journeyData,
  educationData,
  speakingCardsData,
  congressEventData,
  organizationsData,
  publicationsData,
  achievementsData,
  humanSideData
} from './data/portfolioData.js';
import testimonials from './data/testimonials.json';
import { MotionEngine } from './motion/motionEngine.js';
import { ThreeSculpture } from './components/ThreeSculpture.js';
import { getAssetUrl } from './utils/paths.js';

// SVG Icons Generator
const Icons = {
  briefcase: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  landmark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18"/><line x1="10" x2="10" y1="18"/><line x1="14" x2="14" y1="18"/><line x1="18" x2="18" y1="18"/><polygon points="12 2 20 7 4 7"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  bookOpen: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  trendingUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  fileText: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  mic: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>`,
  badgeCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  graduationCap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  mapPin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  arrowUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  play: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  volume2: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeX: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  menu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`
};

function getSocialIcon(name) {
  if (name.toLowerCase() === 'linkedin') return Icons.linkedin;
  if (name.toLowerCase() === 'instagram') return Icons.instagram;
  if (name.toLowerCase() === 'facebook') return Icons.facebook;
  return '';
}

// Shiny Button Component Markup Generator
function renderShinyButton({ text, href, id = '', icon = Icons.arrowRight, onClick = '' }) {
  const isLink = Boolean(href);
  const tag = isLink ? 'a' : 'button';
  const hrefAttr = isLink ? `href="${href}"` : '';
  const idAttr = id ? `id="${id}"` : '';
  const clickAttr = onClick ? `onclick="${onClick}"` : '';
  const typeAttr = !isLink ? 'type="submit"' : '';

  return `
    <${tag} ${hrefAttr} ${idAttr} ${clickAttr} ${typeAttr} class="shiny-btn">
      <span class="shiny-btn-content">
        <span>${text}</span>
        ${icon ? `<span>${icon}</span>` : ''}
      </span>
    </${tag}>
  `;
}

// Minimalist Floating Navigation Pill (Reference 01 & 03)
function renderHeader() {
  return `
    <header class="site-header" id="site-header">
      <div class="container">
        <div class="header-container">
          <a href="#hero" class="brand-logo" aria-label="Dr. Vishal Kattery Home">
            <span class="brand-monogram-tiny">VK</span>
            <span class="brand-name-full"><span>Dr. Vishal</span> <span class="brand-accent">Kattery</span></span>
          </a>

          <nav class="desktop-nav" aria-label="Main Navigation">
            <a href="#about" class="nav-link">About</a>
            <a href="#expertise" class="nav-link">Expertise</a>
            <a href="#journey" class="nav-link">Experience</a>
            <a href="#training" class="nav-link">Training</a>
            <a href="#speaking" class="nav-link">Speaking</a>
            <a href="#research" class="nav-link">Publications</a>
            <a href="#contact" class="nav-link">Contact</a>
          </nav>

          <div class="header-actions">
            <div class="desktop-cta-wrap">
              ${renderShinyButton({
                text: "Let's Connect",
                href: "#contact",
                id: "header-btn-connect",
                icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
              })}
            </div>
            <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Dark/Light Theme">
              <span class="theme-icon-container">${Icons.sun}</span>
            </button>
            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Navigation Menu">
              ${Icons.menu}
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div class="mobile-drawer-header">
        <a href="#hero" class="brand-logo" aria-label="Dr. Vishal Kattery Home">
          <span class="brand-monogram-tiny">VK</span>
          <span>Dr. Vishal <span class="brand-accent">Kattery</span></span>
        </a>
        <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close Navigation Menu">
          ${Icons.x}
        </button>
      </div>
      <nav class="mobile-nav-links">
        <a href="#hero" class="mobile-nav-link active">Home</a>
        <a href="#about" class="mobile-nav-link">About</a>
        <a href="#expertise" class="mobile-nav-link">Expertise</a>
        <a href="#journey" class="mobile-nav-link">Experience</a>
        <a href="#training" class="mobile-nav-link">Training &amp; Impact</a>
        <a href="#speaking" class="mobile-nav-link">Speaking</a>
        <a href="#research" class="mobile-nav-link">Publications</a>
        <a href="#testimonials" class="mobile-nav-link">Testimonials</a>
        <a href="#contact" class="mobile-nav-link">Contact</a>
      </nav>

      <div class="mobile-drawer-cta">
        ${renderShinyButton({
          text: "Let's Connect",
          href: "#contact",
          id: "drawer-btn-connect",
          icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
        })}
      </div>

      <div class="mobile-nav-socials">
        ${siteProfile.socials.map(s => `
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name}">
            ${getSocialIcon(s.name)}
          </a>
        `).join('')}
      </div>
    </div>
    <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>
  `;
}

// 3D Hero Section — Asymmetric Composition (Reference 01 & 02)
function renderHero() {
  return `
    <section class="hero-section" id="hero">
      <div class="hero-backdrop-glow"></div>

      <div class="container">
        <div class="hero-layout-asymmetric">
          <!-- LEFT: Editorial Identity & Staggered Typography -->
          <div class="hero-identity-col">
            <!-- 2. Small uppercase professional descriptor -->
            <div class="hero-eyebrow">
              <span class="hero-eyebrow-dot"></span>
              <span>ACADEMIC LEADER &bull; MENTOR &bull; RESEARCHER</span>
            </div>

            <!-- 3. Large “DR. VISHAL KATTERY” heading -->
            <h1 class="hero-name-editorial">
              <span class="hero-name-first">DR. VISHAL</span>
              <span class="hero-name-last">KATTERY</span>
            </h1>

            <!-- 4. Professional roles -->
            <div class="hero-roles-editorial">
              <span class="hero-role-pill">Professor</span><span class="role-sep">&bull;</span>
              <span class="hero-role-pill">Mentor</span><span class="role-sep">&bull;</span>
              <span class="hero-role-pill">Placement Trainer</span><span class="role-sep">&bull;</span>
              <span class="hero-role-pill">Career Counsellor</span><span class="role-sep">&bull;</span>
              <span class="hero-role-pill">Banker</span>
            </div>

            <!-- 5. Short introduction -->
            <p class="hero-lead-text">
              ${heroData.intro}
            </p>

            <!-- 6. “Explore My Journey” and “Let's Connect” buttons -->
            <div class="hero-cta-group">
              ${renderShinyButton({
                text: "Explore My Journey",
                href: "#journey",
                id: "hero-cta-journey",
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
              })}
              ${renderShinyButton({
                text: "Let's Connect",
                href: "#contact",
                id: "hero-cta-connect",
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
              })}
            </div>

            <!-- 7. Resume download and social links -->
            <div class="hero-quick-meta">
              <a href="${getAssetUrl(siteProfile.resumePdf)}" download="Dr_Vishal_Kattery_CV.pdf" class="hero-cv-link" aria-label="Download Resume (PDF)">
                ${Icons.download} <span>Download Resume (PDF)</span>
              </a>
              <div class="hero-socials-inline">
                ${siteProfile.socials.map(s => `
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hero-social-icon" aria-label="${s.name} Profile">
                    ${getSocialIcon(s.name)}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- RIGHT: Interactive 3D Knowledge Sculpture + Portrait Anchor + Floating Meta Badges -->
          <div class="hero-visual-col">
            <div class="hero-visual-stage">
              <!-- Three.js 3D Knowledge Sculpture Canvas Stage -->
              <div id="hero-3d-stage" class="hero-3d-stage" aria-hidden="true"></div>

              <!-- Existing Portrait Visual Anchor -->
              <div class="hero-portrait-frame" id="hero-cutout-wrap">
                <img 
                  src="${getAssetUrl('/assets/images/hero/hero.png')}" 
                  alt="Dr. Vishal Kattery" 
                  class="hero-portrait-img" 
                  id="hero-cutout-img"
                  loading="eager"
                />
              </div>
            </div>

            <!-- Dimensional Floating Badges -->
            <div class="hero-badges-wrapper">
              <div class="hero-float-badge float-badge-1">
                <div class="float-badge-icon">${Icons.mic}</div>
                <div class="float-badge-content">
                  <div class="float-badge-title">100+ Sessions</div>
                  <div class="float-badge-subtitle">Youth &amp; Keynotes</div>
                </div>
              </div>

              <div class="hero-float-badge float-badge-2">
                <div class="float-badge-icon">${Icons.award}</div>
                <div class="float-badge-content">
                  <div class="float-badge-title">Ph.D. Management</div>
                  <div class="float-badge-subtitle">Doctoral Research</div>
                </div>
              </div>

              <div class="hero-float-badge float-badge-3">
                <div class="float-badge-icon">${Icons.fileText}</div>
                <div class="float-badge-content">
                  <div class="float-badge-title">SCOPUS Author</div>
                  <div class="float-badge-subtitle">Indexed Papers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// About Section — Editorial Overlapping Photographic Depth
function renderAbout() {
  return `
    <section class="section" id="about">
      <div class="container">
        <div class="about-editorial-grid">
          <div class="about-photo-wrapper">
            <div class="about-photo-frame">
              <img 
                src="${getAssetUrl('/assets/review/random 9.jpg')}" 
                alt="Dr. Vishal Kattery - Academic &amp; Mentor" 
                class="about-photo-img" 
                loading="lazy" 
              />
            </div>
            <div class="about-quote-pill">
              <p class="about-quote-p">${aboutData.quote}</p>
              <div class="about-quote-cite">— Dr. Vishal Kattery</div>
            </div>
          </div>

          <div>
            <span class="section-tag">${aboutData.subtitle}</span>
            <h2 class="section-title">${aboutData.title}</h2>
            <p class="about-lead-statement">${aboutData.lead}</p>
            ${aboutData.paragraphs.map(p => `<p class="about-body-text">${p}</p>`).join('')}

            <div class="about-stats-dimensional">
              ${aboutData.highlights.map(h => `
                <div class="about-stat-item">
                  <div class="about-stat-number">${h.value}</div>
                  <div class="about-stat-label">${h.label}</div>
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

// Expertise Section (Reference 05 Premium Feature Bento Cards)
function renderExpertise() {
  return `
    <section class="section" id="expertise" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">AREAS OF MASTERY</span>
          <h2 class="section-title">Domains of Expertise</h2>
          <p class="section-subtitle">
            An interdisciplinary portfolio bridging management theory, cooperative banking administration, enterprise computing, and transformative student mentorship.
          </p>
        </div>

        <div class="expertise-bento-grid">
          <!-- Card 1: Wide Feature Card (Management & Commerce) -->
          <div class="bento-card span-2">
            <div class="bento-card-index">01 / FEATURE DOMAIN</div>
            <h3 class="bento-card-title">${expertiseData[0].title}</h3>
            <p class="bento-card-desc">${expertiseData[0].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[0].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 2: Vertical Highlight Card (Banking & Finance) -->
          <div class="bento-card">
            <div class="bento-card-index">02 / DOMAIN</div>
            <h3 class="bento-card-title">${expertiseData[1].title}</h3>
            <p class="bento-card-desc">${expertiseData[1].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[1].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 3: Compact Tech Card (Computer Applications & IT) -->
          <div class="bento-card">
            <div class="bento-card-index">03 / DOMAIN</div>
            <h3 class="bento-card-title">${expertiseData[2].title}</h3>
            <p class="bento-card-desc">${expertiseData[2].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[2].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 4: Wide Feature Card (Training & Mentoring) -->
          <div class="bento-card span-2">
            <div class="bento-card-index">04 / FEATURE DOMAIN</div>
            <h3 class="bento-card-title">${expertiseData[3].title}</h3>
            <p class="bento-card-desc">${expertiseData[3].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[3].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 5: Scholarly Card (Research & Publications) -->
          <div class="bento-card span-2">
            <div class="bento-card-index">05 / SCHOLARLY INQUIRY</div>
            <h3 class="bento-card-title">${expertiseData[4].title}</h3>
            <p class="bento-card-desc">${expertiseData[4].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[4].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Card 6: Corporate Card (Industry Exposure) -->
          <div class="bento-card">
            <div class="bento-card-index">06 / DOMAIN</div>
            <h3 class="bento-card-title">${expertiseData[5].title}</h3>
            <p class="bento-card-desc">${expertiseData[5].desc}</p>
            <div class="bento-topics-list">
              ${expertiseData[5].topics.map(t => `
                <div class="bento-topic-item">
                  <span class="bento-topic-bullet"></span>
                  <span>${t}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Experience Section (Reference 04 Connected Progression Flow)
// 5 Authoritative Records Strictly Preserved
function renderJourney() {
  return `
    <section class="section" id="journey">
      <div class="container">
        <div class="section-header centered">
          <span class="section-tag">PROGRESSIVE TIMELINE</span>
          <h2 class="section-title">From Experience to Purpose</h2>
          <p class="section-subtitle">
            A continuous career trajectory progressing fluidly across enterprise software, cooperative banking administration, higher academia, and corporate directorship.
          </p>
        </div>

        <div class="connected-flow-stage">
          ${journeyData.map((item, idx) => `
            <div class="flow-step-container">
              <div class="flow-step-card">
                <div class="flow-step-header">
                  <div class="flow-step-tag">
                    <span class="flow-step-tag-circle"></span>
                    <span>STAGE 0${idx + 1}</span>
                  </div>
                  <div class="flow-step-period">${item.period}</div>
                </div>
                <h3 class="flow-step-role">${item.role}</h3>
                <div class="flow-step-org">${item.organization}</div>
                <p class="flow-step-desc">${item.description}</p>
              </div>

              ${idx < journeyData.length - 1 ? `
                <div class="flow-connector-line">
                  <svg class="flow-connector-svg" viewBox="0 0 100 48" preserveAspectRatio="none">
                    <path d="${idx % 2 === 0 ? 'M 20 0 L 20 24 L 80 24 L 80 48' : 'M 80 0 L 80 24 L 20 24 L 20 48'}" fill="none" stroke="rgba(142, 182, 155, 0.45)" stroke-width="2" stroke-dasharray="4 4" />
                    <circle cx="${idx % 2 === 0 ? '20' : '80'}" cy="4" r="3" fill="#daf1de" />
                    <circle cx="${idx % 2 === 0 ? '80' : '20'}" cy="44" r="3" fill="#daf1de" />
                  </svg>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Speaking & Public Engagement Section (Photography Led)
// First card image MUST be assets/images/speaking/seminar 7.jpg
function renderSpeaking() {
  return `
    <section class="section" id="speaking" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PUBLIC ENGAGEMENT</span>
          <h2 class="section-title">Speaking &amp; Public Engagement</h2>
          <p class="section-subtitle">
            Engaging large audiences at academic symposiums, cooperative conventions, institutional seminars, and student empowerment forums across South India.
          </p>
        </div>

        <div class="speaking-editorial-grid">
          ${speakingCardsData.map(card => `
            <div class="speaking-card">
              <div class="speaking-img-wrap">
                <img 
                  src="${getAssetUrl(card.image)}" 
                  alt="${card.title}" 
                  class="speaking-img" 
                  loading="lazy" 
                />
              </div>
              <div class="speaking-body">
                <span class="speaking-category">${card.category}</span>
                <h3 class="speaking-title">${card.title}</h3>
                <p class="speaking-desc">${card.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// 17th Indian Co-operative Congress Feature Section
function renderCongress() {
  return `
    <section class="section" id="congress">
      <div class="container">
        <div class="bento-card" style="padding: 3rem 2.8rem;">
          <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center;">
            <div>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
                <span class="badge">National Engagement</span>
                <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary); border-color: var(--border-subtle);">${congressEventData.location}</span>
              </div>
              <h2 style="font-size: clamp(1.8rem, 2.8vw, 2.4rem); font-weight: 800; color: var(--text-primary); margin-bottom: 0.85rem; letter-spacing: -0.025em;">
                ${congressEventData.title}
              </h2>
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; font-weight: 600; color: var(--accent-highlight); margin-bottom: 1.25rem;">
                ${Icons.award} ${congressEventData.inauguration}
              </div>
              <p style="font-size: 0.98rem; line-height: 1.68; color: var(--text-secondary); margin-bottom: 1.75rem;">
                ${congressEventData.summary}
              </p>

              <div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
                ${congressEventData.keyThemes.map(t => `
                  <div style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.88rem; color: var(--text-primary);">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-highlight); box-shadow: 0 0 6px var(--accent-highlight);"></span>
                    <span>${t}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-card); aspect-ratio: 4 / 3;">
              <img 
                src="${getAssetUrl(congressEventData.images[0].src)}" 
                alt="${congressEventData.images[0].caption}" 
                style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Training & Mentoring Section — Curated Themes & Video Player
function renderTraining() {
  return `
    <section class="section" id="training" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PEDAGOGY &amp; MENTORSHIP</span>
          <h2 class="section-title">Training &amp; Student Impact</h2>
          <p class="section-subtitle">
            Bridging collegiate curricula and corporate workplace expectations through rigorous placement training, real-time interview preparedness, and life-skills cultivation.
          </p>
        </div>

        <!-- Video Player Frame -->
        <div class="classroom-video-frame" id="video-section">
          <video 
            id="classroom-video" 
            class="classroom-video" 
            muted 
            playsinline 
            loop 
            poster="${getAssetUrl('/assets/images/teaching/classroom training.jpg')}"
          >
            <source src="${getAssetUrl('/assets/video/classroom video.mp4')}" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div class="video-bar">
            <div class="video-label">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-highlight); box-shadow: 0 0 8px var(--accent-highlight);"></span>
              Classroom Mentorship &amp; Placement Training in Action
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <button class="video-btn" id="video-play-btn" aria-label="Play or Pause Video">
                ${Icons.play}
              </button>
              <button class="video-btn" id="video-mute-btn" aria-label="Mute or Unmute Video">
                ${Icons.volumeX}
              </button>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <span class="section-tag">CURATED THEMES</span>
          <h3 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 1.5rem;">Training &amp; Mentoring Dimensions</h3>
        </div>

        <div class="training-catalogue-grid">
          ${trainingCategories.map(cat => `
            <div class="training-catalogue-card">
              <div class="training-catalogue-header">
                <span style="color: var(--accent-highlight);">${Icons.badgeCheck}</span>
                <h4 class="training-catalogue-title">${cat.category}</h4>
              </div>
              <div class="training-topics-stack">
                ${cat.themes.map(t => `
                  <div class="training-topic-row">
                    <div class="training-topic-name">${t.name}</div>
                    <div class="training-topic-desc">${t.desc}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Academic Faculty, Volunteer & Membership Section
function renderOrganizations() {
  return `
    <section class="section" id="organizations">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">INSTITUTIONS &amp; CIVIC SERVICE</span>
          <h2 class="section-title">Organizations &amp; Community</h2>
          <p class="section-subtitle">
            Long-standing associations with academic learning centres and frontline emergency relief teams across Kerala.
          </p>
        </div>

        <div class="orgs-layout-grid">
          <div>
            <h3 class="org-col-heading">
              <span class="dot"></span> Academic Faculty Roles
            </h3>
            <div class="org-stack">
              ${organizationsData.academic.map(org => `
                <div class="org-item-card">
                  <div class="org-item-name">${org.name}</div>
                  <div class="org-item-role">${org.role} &bull; <span style="color: var(--text-muted);">${org.period}</span></div>
                  <p class="org-item-desc">${org.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div>
            <h3 class="org-col-heading">
              <span class="dot"></span> Volunteer &amp; Disaster Management
            </h3>
            <div class="org-stack">
              ${organizationsData.volunteer.map(org => `
                <div class="org-item-card">
                  <div class="org-item-name">${org.name}</div>
                  <div class="org-item-role">${org.role} &bull; <span style="color: var(--text-muted);">${org.period}</span> (${org.affiliation})</div>
                  <p class="org-item-desc">${org.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ISTD Life Membership Card -->
        <div class="istd-banner-card">
          <div style="max-width: 720px;">
            <span class="badge" style="margin-bottom: 0.65rem;">${organizationsData.membership.registration}</span>
            <h4 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              ${organizationsData.membership.title} — ${organizationsData.membership.organization}
            </h4>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary);">
              ${organizationsData.membership.desc}
            </p>
          </div>
          <div class="istd-pill-badge">
            ISTD Life Member
          </div>
        </div>
      </div>
    </section>
  `;
}

// Research & Publications Section (Academic Archive)
function renderResearch() {
  return `
    <section class="section" id="research" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">SCHOLARLY INQUIRY</span>
          <h2 class="section-title">Research &amp; Publications</h2>
          <p class="section-subtitle">
            Peer-reviewed research and SCOPUS-indexed papers investigating banking sector stress dynamics, organizational commitment, sustainability in manufacturing, and artificial intelligence in commerce.
          </p>
        </div>

        <div class="publications-archive-stack">
          ${publicationsData.map(pub => `
            <div class="pub-archive-card">
              <div>
                <div class="pub-archive-num">${pub.num} / PUBLICATION</div>
                <h3 class="pub-archive-title">${pub.title}</h3>
                <div class="pub-archive-venue">
                  <strong>Publication Venue:</strong> ${pub.venue} ${pub.details ? `&bull; ${pub.details}` : ''} ${pub.pages ? `&bull; ${pub.pages}` : ''}
                </div>
                <div class="pub-archive-tags">
                  <span class="badge">${pub.badge}</span>
                  <span class="badge" style="background: rgba(255,255,255,0.04); color: var(--text-secondary); border-color: var(--border-subtle);">${pub.focus}</span>
                </div>
              </div>
              <div>
                <span class="badge" style="padding: 0.5rem 1.1rem; font-size: 0.82rem;">${pub.indexing}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Recognition & Standing Section (4 Milestones)
function renderAchievements() {
  return `
    <section class="section" id="achievements">
      <div class="container">
        <div class="section-header centered">
          <span class="section-tag">VERIFIED MILESTONES</span>
          <h2 class="section-title">Recognition &amp; Standing</h2>
          <p class="section-subtitle">
            Academic honors and credentials documented by registered regulatory institutions and international indices.
          </p>
        </div>

        <div class="recognition-milestones-grid">
          ${achievementsData.map(item => `
            <div class="recognition-card">
              <div class="recognition-icon-wrap">
                ${Icons[item.icon] || Icons.award}
              </div>
              <h3 class="recognition-title">${item.title}</h3>
              <div class="recognition-issuer">${item.issuer}</div>
              <p class="recognition-detail">${item.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Testimonials Section (Reference 06 Floating Reviews)
function renderTestimonials() {
  const hasData = Array.isArray(testimonials) && testimonials.length > 0;
  if (!hasData) return '';

  // Distribute testimonials across 3 staggered columns for the floating reviews feel
  const cols = [[], [], []];
  testimonials.forEach((t, i) => {
    cols[i % 3].push(t);
  });

  return `
    <section class="section" id="testimonials" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header centered">
          <span class="section-tag">ENDORSEMENTS</span>
          <h2 class="section-title">Testimonials &amp; Feedback</h2>
          <p class="section-subtitle">
            Authentic reflections from students, graduates, and collegiate faculty guided by Dr. Vishal.
          </p>
        </div>

        <div class="floating-reviews-stage">
          <div class="floating-reviews-grid">
            ${cols.map(col => `
              <div class="floating-review-col">
                ${col.map(t => {
                  const initials = t.name
                    ? t.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
                    : 'VK';
                  const roleMeta = [t.role, t.institution].filter(Boolean).join(' &bull; ');

                  return `
                    <div class="floating-review-card">
                      <div>
                        <div class="review-stars">★★★★★</div>
                        <p class="review-quote-text">"${t.testimony}"</p>
                      </div>
                      <div class="review-author-row">
                        <div class="review-avatar-monogram">${initials}</div>
                        <div>
                          <div class="review-author-name">${t.name}</div>
                          ${roleMeta ? `<div class="review-author-meta">${roleMeta}</div>` : ''}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

// Personal Perspective / Human Dimension
function renderHumanSide() {
  return `
    <section class="section" id="human">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PERSONAL PERSPECTIVE</span>
          <h2 class="section-title">The Human Dimension</h2>
          <p class="section-subtitle">
            Behind the research papers, lecture halls, and boardroom meetings lies a grounded devotion to student welfare, lifelong growth, and family milestones.
          </p>
        </div>

        <div class="speaking-editorial-grid">
          ${humanSideData.map(m => `
            <div class="speaking-card">
              <div class="speaking-img-wrap">
                <img 
                  src="${getAssetUrl(m.src)}" 
                  alt="${m.title}" 
                  class="speaking-img" 
                  loading="lazy" 
                />
              </div>
              <div class="speaking-body">
                <span class="speaking-category">${m.category}</span>
                <h3 class="speaking-title">${m.title}</h3>
                <p class="speaking-desc">${m.caption}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Contact Section — Bold Editorial Closing ("LET'S CONNECT.")
function renderContact() {
  return `
    <section class="section" id="contact" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="contact-editorial-layout">
          <div>
            <span class="section-tag">INITIATE COLLABORATION</span>
            <h2 class="contact-hero-statement">
              LET'S<br /><span>CONNECT.</span>
            </h2>
            <p class="contact-sub-statement">
              Open to academic guest lectures, placement bootcamps, faculty development programs, corporate workshops, and research collaborations.
            </p>

            <div class="contact-info-list">
              <div class="contact-detail-card">
                <div class="contact-detail-icon">${Icons.mapPin}</div>
                <div>
                  <div class="contact-detail-lbl">Location</div>
                  <div class="contact-detail-val">${siteProfile.location}</div>
                </div>
              </div>

              <div class="contact-detail-card">
                <div class="contact-detail-icon">${Icons.phone}</div>
                <div>
                  <div class="contact-detail-lbl">Direct Phone</div>
                  <a href="tel:${siteProfile.phone.replace(/\s+/g, '')}" class="contact-detail-val">
                    ${siteProfile.phone}
                  </a>
                </div>
              </div>

              <div class="contact-detail-card">
                <div class="contact-detail-icon">${Icons.mail}</div>
                <div>
                  <div class="contact-detail-lbl">Email Address</div>
                  <a href="mailto:${siteProfile.email}" class="contact-detail-val">
                    ${siteProfile.email}
                  </a>
                </div>
              </div>

              <a href="${getAssetUrl(siteProfile.resumePdf)}" download="Dr_Vishal_Kattery_CV.pdf" class="contact-detail-card" style="text-decoration: none;">
                <div class="contact-detail-icon">${Icons.download}</div>
                <div>
                  <div class="contact-detail-lbl">Curriculum Vitae</div>
                  <div class="contact-detail-val" style="color: var(--accent-highlight);">Download Complete Resume (PDF)</div>
                </div>
              </a>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              ${siteProfile.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name} Profile">
                  ${getSocialIcon(s.name)}
                </a>
              `).join('')}
            </div>
          </div>

          <div class="contact-form-card">
            <form id="contact-form" novalidate>
              <div class="form-group">
                <label for="c-name" class="form-label">Your Name</label>
                <input type="text" id="c-name" class="form-control" placeholder="Prof. / Dr. / Mr. / Ms." required />
                <div class="form-feedback" id="c-name-feedback"></div>
              </div>
              <div class="form-group">
                <label for="c-email" class="form-label">Email Address</label>
                <input type="email" id="c-email" class="form-control" placeholder="name@institution.edu" required />
                <div class="form-feedback" id="c-email-feedback"></div>
              </div>
              <div class="form-group">
                <label for="c-subject" class="form-label">Purpose of Contact</label>
                <input type="text" id="c-subject" class="form-control" placeholder="e.g. Placement Training / Keynote / Academic Collaboration" required />
                <div class="form-feedback" id="c-subject-feedback"></div>
              </div>
              <div class="form-group">
                <label for="c-message" class="form-label">Message</label>
                <textarea id="c-message" class="form-control" placeholder="Share details regarding your institution, proposed dates, or engagement scope..." required></textarea>
                <div class="form-feedback" id="c-message-feedback"></div>
              </div>

              <!-- Status alert box -->
              <div class="form-status-alert" id="form-status-alert" role="status" aria-live="polite" style="display: none;"></div>

              <div style="margin-top: 1.75rem;">
                ${renderShinyButton({
                  text: "Send Enquiry",
                  id: "contact-submit-btn",
                  icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Minimalist Studio Grade Footer (Reference 01)
function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top-row">
          <div class="footer-brand">
            <h3>Dr. Vishal Kattery</h3>
            <p>${siteProfile.title}</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">${siteProfile.location}</p>
          </div>

          <div>
            <div class="footer-heading">Navigation</div>
            <ul class="footer-links-list">
              <li><a href="#about">About Dr. Vishal</a></li>
              <li><a href="#expertise">Domains of Expertise</a></li>
              <li><a href="#journey">Career Experience</a></li>
              <li><a href="#training">Teaching &amp; Impact</a></li>
              <li><a href="#speaking">Speaking &amp; Engagement</a></li>
              <li><a href="#research">Research &amp; Publications</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-heading">Direct Contact</div>
            <ul class="footer-links-list" style="margin-bottom: 1.5rem;">
              <li><a href="mailto:${siteProfile.email}">${siteProfile.email}</a></li>
              <li><a href="tel:${siteProfile.phone.replace(/\s+/g, '')}">${siteProfile.phone}</a></li>
            </ul>
            <div style="display: flex; gap: 0.75rem;">
              ${siteProfile.socials.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-link-btn" aria-label="${s.name} Profile">
                  ${getSocialIcon(s.name)}
                </a>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="footer-bottom-row">
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
    <!-- Ambient Lighting & Film Grain (Reference 02) -->
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
      ${renderSpeaking()}
      ${renderCongress()}
      ${renderTraining()}
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

  // Initialize Interactive 3D Knowledge Sculpture
  let sculpture = null;
  try {
    sculpture = new ThreeSculpture('hero-3d-stage');
    sculpture.init();
  } catch (err) {
    console.warn('3D Sculpture initialization notice:', err);
  }

  // Initialize Motion Engine (Lenis smooth scroll, cursor lerp, parallax)
  const motion = new MotionEngine();
  motion.init();

  // Setup Theme Switcher
  setupTheme(sculpture);

  // Setup Header Scroll Effect
  setupHeaderScroll();

  // Setup Mobile Menu
  setupMobileMenu();

  // Setup Contact Form Validation & Mailto Action
  setupContactForm();

  // Setup Video Player Controls
  setupVideoControls();

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

  setTimeout(() => {
    document.getElementById('loading-veil')?.classList.add('loaded');
  }, 1000);
}

function setupTheme(sculpture) {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  sculpture?.updateTheme(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    sculpture?.updateTheme(next);
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
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  const openMenu = () => {
    drawer?.classList.add('open');
    backdrop?.classList.add('open');
    drawer?.setAttribute('aria-hidden', 'false');
    openBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
    drawer?.setAttribute('aria-hidden', 'true');
    openBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.getElementById('drawer-btn-connect')?.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeMenu();
    }
  });
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const statusAlert = document.getElementById('form-status-alert');
  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('c-name');
  const emailInput = document.getElementById('c-email');
  const subjectInput = document.getElementById('c-subject');
  const messageInput = document.getElementById('c-message');

  function clearErrors() {
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      inp?.classList.remove('is-invalid');
    });
    document.querySelectorAll('.form-feedback').forEach(f => {
      f.textContent = '';
      f.style.display = 'none';
    });
    if (statusAlert) {
      statusAlert.style.display = 'none';
      statusAlert.className = 'form-status-alert';
      statusAlert.innerHTML = '';
    }
  }

  function setError(input, feedbackId, message) {
    input.classList.add('is-invalid');
    const fb = document.getElementById(feedbackId);
    if (fb) {
      fb.textContent = message;
      fb.style.display = 'block';
    }
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    inp?.addEventListener('input', () => {
      inp.classList.remove('is-invalid');
      const fb = document.getElementById(`${inp.id}-feedback`);
      if (fb) {
        fb.textContent = '';
        fb.style.display = 'none';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    if (!name) {
      setError(nameInput, 'c-name-feedback', 'Please enter your name.');
      hasError = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(emailInput, 'c-email-feedback', 'Please provide a valid email address.');
      hasError = true;
    }
    if (!subject) {
      setError(subjectInput, 'c-subject-feedback', 'Please specify the purpose of contact.');
      hasError = true;
    }
    if (!message || message.length < 10) {
      setError(messageInput, 'c-message-feedback', 'Please enter a message (at least 10 characters).');
      hasError = true;
    }

    if (hasError) {
      const firstInvalid = form.querySelector('.is-invalid');
      firstInvalid?.focus();
      return;
    }

    // Prevent duplicate clicks while submitting
    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="shiny-btn-content">
        <span class="btn-spinner"></span>
        <span>Preparing Email...</span>
      </span>
    `;

    const recipient = 'k.vishalnair@gmail.com';
    const emailSubject = `[Enquiry via Portfolio] ${subject}`;
    const emailBody = `Dear Dr. Vishal Kattery,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}\nPurpose: ${subject}\nSent via Portfolio: ${window.location.href}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    if (statusAlert) {
      statusAlert.className = 'form-status-alert info';
      statusAlert.style.display = 'block';
      statusAlert.innerHTML = `
        <div class="status-alert-header">
          <strong>Opening Your Email Application</strong>
        </div>
        <p class="status-alert-text">
          Your enquiry addressed to <strong>${recipient}</strong> has been prepared. Your email application (e.g. Outlook, Apple Mail, or Gmail) is opening to complete the sending process.
        </p>
        <div class="status-alert-actions">
          <a href="${mailtoUrl}" class="status-action-link">Open Email App Again &rarr;</a>
          <button type="button" class="status-action-btn" id="copy-email-btn">Copy Email Address</button>
        </div>
      `;

      document.getElementById('copy-email-btn')?.addEventListener('click', () => {
        const btn = document.getElementById('copy-email-btn');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(recipient).then(() => {
            if (btn) btn.textContent = 'Copied to clipboard!';
          }).catch(() => {
            // Fallback for unfocused or permission-blocked documents
            fallbackCopy(recipient, btn);
          });
        } else {
          fallbackCopy(recipient, btn);
        }
      });
    }

    function fallbackCopy(text, btn) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        if (btn) btn.textContent = 'Copied to clipboard!';
      } catch (err) {
        if (btn) btn.textContent = recipient;
      }
    }

    // Trigger mailto link via safe anchor click
    const mailLink = document.createElement('a');
    mailLink.href = mailtoUrl;
    mailLink.target = '_blank';
    mailLink.rel = 'noopener noreferrer';
    document.body.appendChild(mailLink);
    mailLink.click();

    setTimeout(() => {
      mailLink.remove();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }, 2000);
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

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      playBtn.innerHTML = Icons.pause;
    }).catch(() => {
      playBtn.innerHTML = Icons.play;
    });
  }
}

// Start Application
document.addEventListener('DOMContentLoaded', initApp);
