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
import { galleryPhotos, galleryVideos } from './data/galleryData.js';
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
  chevronLeft: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  image: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
  video: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
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
            <a href="#gallery" class="nav-link">Gallery</a>
            <a href="#speaking" class="nav-link">Speaking</a>
            <a href="#research" class="nav-link">Publications</a>
            <a href="#testimonials" class="nav-link">Testimonials</a>
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
        <a href="#gallery" class="mobile-nav-link">Media Gallery</a>
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

// Dedicated Media Gallery Section (Art-directed preview on main page)
function renderGallery() {
  const previewPhotos = galleryPhotos.slice(0, 3);
  return `
    <section class="section gallery-section" id="gallery">
      <div class="container">
        <div class="section-header centered">
          <span class="section-tag">ARCHIVAL MEDIA</span>
          <h2 class="section-title">Curated Media Gallery</h2>
          <p class="section-subtitle">
            A verified photographic and videographic record spanning classroom lectures, student bootcamps, doctoral milestones, and collegiate keynotes.
          </p>
        </div>

        <div class="gallery-preview-stage">
          <div class="gallery-preview-cards-stack">
            ${previewPhotos.map((p, idx) => `
              <div class="gallery-preview-card" onclick="openMediaGallery(${idx})" tabindex="0" role="button" aria-label="Open gallery image: ${p.title}">
                <img 
                  src="${getAssetUrl(p.src)}" 
                  alt="${p.title}" 
                  loading="lazy" 
                  onerror="this.onerror=null; this.src='${getAssetUrl('/assets/images/academic/teaching.jpeg')}';"
                />
                <div class="gallery-preview-badge">
                  <span>${p.category}</span>
                  <span>${p.title.length > 28 ? p.title.slice(0, 28) + '...' : p.title}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="gallery-preview-cta">
            <button type="button" class="shiny-btn" id="open-media-gallery-btn" onclick="openMediaGallery(0, 'photos')" aria-haspopup="dialog" aria-expanded="false">
              <span class="shiny-btn-content">
                <span>View Photo Gallery (${galleryPhotos.length} Photos &bull; ${galleryVideos.length} Videos)</span>
                ${Icons.arrowRight}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Expanded Media Gallery Modal Overlay -->
    <div class="media-gallery-modal-overlay" id="media-gallery-modal" role="dialog" aria-modal="true" aria-label="Media Gallery" aria-hidden="true">
      <div class="media-gallery-dialog">
        <div class="gallery-modal-topbar">
          <div class="gallery-segmented-control" role="tablist">
            <button type="button" class="gallery-tab-btn active" id="gallery-tab-photos" role="tab" aria-selected="true" aria-controls="gallery-view-photos">
              ${Icons.image}
              <span>Photos (${galleryPhotos.length})</span>
            </button>
            <button type="button" class="gallery-tab-btn" id="gallery-tab-videos" role="tab" aria-selected="false" aria-controls="gallery-view-videos">
              ${Icons.video}
              <span>Videos (${galleryVideos.length})</span>
            </button>
          </div>
          <button type="button" class="modal-close-btn" id="close-gallery-modal-btn" onclick="closeMediaGallery(event); event.stopPropagation();" aria-label="Close Gallery">
            ${Icons.x}
          </button>
        </div>

        <div class="gallery-modal-viewport">
          <!-- Photos View (Coverflow Carousel) -->
          <div class="coverflow-carousel-wrap" id="gallery-view-photos" role="tabpanel" aria-labelledby="gallery-tab-photos">
            <div class="coverflow-stage" id="coverflow-stage" tabindex="0" aria-label="Photo Coverflow Carousel">
              ${galleryPhotos.map((photo, i) => `
                <div class="coverflow-card ${i === 0 ? 'active-card' : ''}" data-index="${i}" data-aspect="${photo.aspectRatio}">
                  <div class="coverflow-media-frame aspect-${photo.aspectRatio}">
                    <img src="${getAssetUrl(photo.src)}" alt="${photo.title}" loading="lazy" />
                  </div>
                  <div class="coverflow-card-caption">
                    <span class="coverflow-card-category">${photo.category}</span>
                    <h4 class="coverflow-card-title">${photo.title}</h4>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="coverflow-controls-bar">
              <button type="button" class="coverflow-nav-btn" id="coverflow-prev-btn" aria-label="Previous Photo">
                ${Icons.chevronLeft}
              </button>
              <div class="coverflow-dots" id="coverflow-dots">
                ${galleryPhotos.map((_, i) => `
                  <button type="button" class="coverflow-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
                `).join('')}
              </div>
              <div class="coverflow-counter" id="coverflow-counter">01 / ${String(galleryPhotos.length).padStart(2, '0')}</div>
              <button type="button" class="coverflow-nav-btn" id="coverflow-next-btn" aria-label="Next Photo">
                ${Icons.chevronRight}
              </button>
            </div>
          </div>

          <!-- Videos View (Vertical 3D Coverflow) -->
          <div class="video-coverflow-wrap" id="gallery-view-videos" style="display: none;" role="tabpanel" aria-labelledby="gallery-tab-videos">
            <div class="video-coverflow-stage" id="video-coverflow-stage" tabindex="0" aria-label="Video Coverflow Carousel">
              ${galleryVideos.map((video, i) => `
                <div class="video-coverflow-card ${i === 0 ? 'active-card' : ''}" data-index="${i}">
                  <div class="video-card-frame">
                    <video 
                      class="video-card-media" 
                      id="gallery-video-${i}" 
                      src="${getAssetUrl(video.src)}" 
                      poster="${getAssetUrl(video.poster)}" 
                      muted 
                      playsinline 
                      loop
                    ></video>
                    <div class="video-card-overlay-controls">
                      <div class="video-card-top-info">
                        <span class="coverflow-card-category" style="color: #fff;">VERTICAL REEL (9:16) &bull; ${video.duration}</span>
                        <h4 class="coverflow-card-title" style="color: #fff; font-size: 0.95rem;">${video.title}</h4>
                      </div>
                      <button type="button" class="video-play-center-btn" id="video-play-toggle-${i}" aria-label="Play Video">
                        ${Icons.play}
                      </button>
                      <div class="video-bottom-toolbar">
                        <button type="button" class="video-btn" id="video-mute-toggle-${i}" aria-label="Mute or Unmute">
                          ${Icons.volumeX}
                        </button>
                        <div class="video-volume-group">
                          <input type="range" class="video-volume-slider" id="video-volume-${i}" min="0" max="1" step="0.05" value="0" aria-label="Volume Slider" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="coverflow-card-caption">
                    <span class="coverflow-card-category">${video.duration} &bull; Verified Local Video</span>
                    <h4 class="coverflow-card-title">${video.title}</h4>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="coverflow-controls-bar">
              <button type="button" class="coverflow-nav-btn" id="video-prev-btn" aria-label="Previous Video">
                ${Icons.chevronLeft}
              </button>
              <div class="coverflow-counter" id="video-counter">01 / ${String(galleryVideos.length).padStart(2, '0')}</div>
              <button type="button" class="coverflow-nav-btn" id="video-next-btn" aria-label="Next Video">
                ${Icons.chevronRight}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full-Screen Image Lightbox -->
    <div class="media-lightbox-overlay" id="image-lightbox" role="dialog" aria-modal="true" aria-label="Full-screen Image View" aria-hidden="true">
      <button type="button" class="lightbox-close-btn" id="close-image-lightbox-btn" onclick="closePhotoLightbox(event); event.stopPropagation();" aria-label="Close Lightbox">
        ${Icons.x}
      </button>
      <button type="button" class="lightbox-nav-btn lightbox-prev" id="lightbox-prev-btn" aria-label="Previous Image">
        ${Icons.chevronLeft}
      </button>
      <button type="button" class="lightbox-nav-btn lightbox-next" id="lightbox-next-btn" aria-label="Next Image">
        ${Icons.chevronRight}
      </button>
      <div class="lightbox-dialog">
        <div class="lightbox-image-frame">
          <img id="lightbox-img" src="" alt="" />
        </div>
        <div class="lightbox-caption-bar">
          <div class="lightbox-caption-title" id="lightbox-title"></div>
          <div class="lightbox-caption-category" id="lightbox-category"></div>
        </div>
      </div>
    </div>

    <!-- Full-Screen Video Lightbox -->
    <div class="media-lightbox-overlay" id="video-lightbox" role="dialog" aria-modal="true" aria-label="Full-screen Video View" aria-hidden="true">
      <button type="button" class="lightbox-close-btn" id="close-video-lightbox-btn" onclick="closeVideoLightbox(event); event.stopPropagation();" aria-label="Close Video Lightbox">
        ${Icons.x}
      </button>
      <button type="button" class="lightbox-nav-btn lightbox-prev" id="video-lightbox-prev-btn" aria-label="Previous Video">
        ${Icons.chevronLeft}
      </button>
      <button type="button" class="lightbox-nav-btn lightbox-next" id="video-lightbox-next-btn" aria-label="Next Video">
        ${Icons.chevronRight}
      </button>
      <div class="lightbox-dialog">
        <div class="lightbox-video-frame">
          <video id="lightbox-video-elem" controls playsinline></video>
        </div>
        <div class="lightbox-caption-bar">
          <div class="lightbox-caption-title" id="video-lightbox-title"></div>
        </div>
      </div>
    </div>
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

// Testimonials Section (Reference 06 Floating Reviews & Stepped Marquee)
function renderTestimonials() {
  const hasData = Array.isArray(testimonials) && testimonials.length > 0;
  if (!hasData) return '';

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

        <div class="testimonials-floating-stage" id="testimonials-stage">
          <div class="testimonials-floating-track" id="testimonials-track">
            ${[...testimonials, ...testimonials].map((t, idx) => {
              const initials = t.name
                ? t.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
                : 'VK';
              const roleMeta = [t.role, t.institution].filter(Boolean).join(' &bull; ');
              const truncatedText = t.testimony.length > 115 
                ? t.testimony.slice(0, 115).trim() + '...' 
                : t.testimony;

              return `
                <div class="floating-pill-card" data-index="${idx}" onclick="openAllTestimonials(event); event.stopPropagation();" role="button" tabindex="0" aria-label="Testimonial by ${t.name}">
                  <div class="pill-avatar-monogram">${initials}</div>
                  <div class="pill-content">
                    <div class="pill-header-row">
                      <span class="pill-author-name">${t.name}</span>
                      <span class="pill-stars">★★★★★</span>
                    </div>
                    ${roleMeta ? `<div class="pill-author-meta">${roleMeta}</div>` : ''}
                    <p class="pill-quote">"${truncatedText}"</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="testimonials-cta-wrap">
          <button type="button" class="shiny-btn" id="view-all-testimonials-btn" onclick="openAllTestimonials(event); event.stopPropagation();" aria-haspopup="dialog" aria-expanded="false">
            <span class="shiny-btn-content">
              <span>View All Testimonials (${testimonials.length})</span>
              ${Icons.arrowRight}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Dedicated Full Testimonials View Modal (Reference: Website inspo/testimonials-fullscreen-reference.jpg) -->
    <div class="testimonials-modal-overlay" id="all-testimonials-modal" role="dialog" aria-modal="true" aria-label="All Testimonials" aria-hidden="true" data-lenis-prevent>
      <div class="testimonials-modal-dialog" data-lenis-prevent>
        <div class="modal-header">
          <div>
            <div class="modal-header-badge-row">
              <span class="badge">VERIFIED ENDORSEMENTS</span>
              <span class="modal-count-badge">${testimonials.length} Authentic Reviews</span>
              <span class="modal-rating-badge">★★★★★ 5.0 Rating</span>
            </div>
            <h3 class="modal-title">Testimonials &amp; Mentorship Reflections</h3>
            <p class="modal-subtitle">Complete, unedited feedback from mentees, graduates, and collegiate faculty guided by Dr. Vishal Kattery.</p>
          </div>
          <button type="button" class="modal-close-btn" id="close-testimonials-modal-btn" onclick="closeAllTestimonials(event); event.stopPropagation();" aria-label="Close Testimonials Dialog">
            ${Icons.x}
          </button>
        </div>

        <div class="testimonials-modal-body" data-lenis-prevent>
          ${(() => {
            const featured = testimonials.find(t => t.id === 2) || testimonials[0];
            const regularReviews = testimonials.filter(t => t.id !== featured.id);
            const featuredInitials = featured.name
              ? featured.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
              : 'VK';
            const featuredMeta = [featured.role, featured.institution].filter(Boolean).join(' &bull; ');

            return `
              <!-- Featured Spotlight Review -->
              <div class="testimonial-featured-card">
                <div class="featured-card-topbar">
                  <div class="featured-badge-pill">
                    <span class="dot"></span>
                    <span>FEATURED MENTORSHIP SPOTLIGHT</span>
                  </div>
                  <div class="pill-stars">★★★★★</div>
                </div>
                <blockquote class="featured-quote-text">"${featured.testimony}"</blockquote>
                <div class="review-author-row featured-author-row">
                  <div class="pill-avatar-monogram">${featuredInitials}</div>
                  <div>
                    <div class="review-author-name">${featured.name}</div>
                    <div class="review-author-meta">${featuredMeta || 'Student &bull; Placed at Accenture'}</div>
                  </div>
                </div>
              </div>

              <!-- Editorial Multi-Column Masonry for Remaining Reviews -->
              <div class="testimonials-editorial-columns">
                ${regularReviews.map(t => {
                  const initials = t.name
                    ? t.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
                    : 'VK';
                  const roleMeta = [t.role, t.institution].filter(Boolean).join(' &bull; ');
                  const isShort = t.testimony.length < 150;

                  return `
                    <div class="testimonial-full-card ${isShort ? 'card-compact' : ''}">
                      <div>
                        <div class="testimonial-full-card-header">
                          <div class="pill-stars">★★★★★</div>
                          ${t.institution ? `<span class="institution-tag">${t.institution.length > 28 ? t.institution.slice(0, 28) + '&hellip;' : t.institution}</span>` : ''}
                        </div>
                        <p class="testimonial-full-text">"${t.testimony}"</p>
                      </div>
                      <div class="review-author-row">
                        <div class="pill-avatar-monogram">${initials}</div>
                        <div>
                          <div class="review-author-name">${t.name}</div>
                          ${roleMeta ? `<div class="review-author-meta">${roleMeta}</div>` : ''}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `;
          })()}
        </div>
      </div>
    </div>
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
      ${renderGallery()}
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
  window.motion = motion;
  window.lenis = motion.lenis;

  // Setup Theme Switcher
  setupTheme(sculpture);

  // Setup Header Scroll Effect
  setupHeaderScroll();

  // Setup Mobile Menu
  setupMobileMenu();

  // Setup Testimonial Stepped Marquee & Full View Modal
  setupTestimonialMarquee();

  // Setup Media Gallery (Coverflow Carousels & Lightboxes)
  setupMediaGallery();

  // Setup Contact Form Validation & Mailto Action
  setupContactForm();

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

    submitBtn.disabled = true;
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="shiny-btn-content">
        <span class="btn-spinner"></span>
        <span>Preparing Draft...</span>
      </span>
    `;

    const recipient = 'k.vishalnair@gmail.com';
    const emailSubject = `[Enquiry via Portfolio] ${subject}`;
    const emailBody = `Dear Dr. Vishal Kattery,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}\nPurpose: ${subject}\nWebsite: ${window.location.origin + window.location.pathname}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Set location directly to trigger user's default email client safely
    window.location.href = mailtoUrl;

    if (statusAlert) {
      statusAlert.className = 'form-status-alert info';
      statusAlert.style.display = 'block';
      statusAlert.innerHTML = `
        <div class="status-alert-header">
          <strong>Enquiry Prepared for ${recipient}</strong>
        </div>
        <p class="status-alert-text">
          Your default email application is opening to review and send this message. If your browser cannot launch a desktop email client, use one of the direct options below:
        </p>
        <div class="status-alert-actions">
          <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" class="status-action-link">Open in Gmail (Web) &rarr;</a>
          <button type="button" class="status-action-btn" id="copy-draft-btn">Copy Full Draft</button>
          <button type="button" class="status-action-btn" id="copy-email-btn">Copy Email Address</button>
        </div>
      `;

      function copyText(text, btn, successLabel) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            if (btn) btn.textContent = successLabel;
            setTimeout(() => { if (btn) btn.textContent = btn.dataset.originalText || 'Copy'; }, 3000);
          }).catch(() => fallbackCopy(text, btn, successLabel));
        } else {
          fallbackCopy(text, btn, successLabel);
        }
      }

      function fallbackCopy(text, btn, successLabel) {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          if (btn) btn.textContent = successLabel;
        } catch (err) {
          if (btn) btn.textContent = 'Copy failed';
        }
      }

      const emailBtn = document.getElementById('copy-email-btn');
      if (emailBtn) {
        emailBtn.dataset.originalText = 'Copy Email Address';
        emailBtn.addEventListener('click', () => copyText(recipient, emailBtn, 'Email Copied!'));
      }

      const draftBtn = document.getElementById('copy-draft-btn');
      if (draftBtn) {
        draftBtn.dataset.originalText = 'Copy Full Draft';
        draftBtn.addEventListener('click', () => copyText(`Subject: ${emailSubject}\n\n${emailBody}`, draftBtn, 'Draft Copied!'));
      }
    }

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }, 1500);
  });
}

// =============================================================================
// GLOBAL VIEW STATE COORDINATOR
// Coordinates Top-Level Views (Main, Testimonials, Media Gallery) and Nested Lightboxes
// =============================================================================
const VIEW_STATES = {
  MAIN: 'main',
  TESTIMONIALS: 'testimonials',
  GALLERY_PHOTOS: 'gallery_photos',
  GALLERY_VIDEOS: 'gallery_videos',
  LIGHTBOX_PHOTO: 'lightbox_photo',
  LIGHTBOX_VIDEO: 'lightbox_video'
};

let currentViewState = VIEW_STATES.MAIN;
let originScrollY = 0;

function setupTestimonialMarquee() {
  const stage = document.getElementById('testimonials-stage');
  const track = document.getElementById('testimonials-track');
  const openModalBtn = document.getElementById('view-all-testimonials-btn');
  const modal = document.getElementById('all-testimonials-modal');
  const closeModalBtn = document.getElementById('close-testimonials-modal-btn');
  if (!stage || !track) return;

  const cards = track.querySelectorAll('.floating-pill-card');
  const count = cards.length;
  if (count === 0) return;

  let currentShift = 0;
  let isPaused = false;
  let timer = null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stepMarquee() {
    if (isPaused || prefersReduced) return;
    const cardEl = cards[0];
    const cardWidth = cardEl ? (cardEl.offsetWidth + 24) : 480;
    const halfWidth = (count / 2) * cardWidth;

    currentShift += cardWidth;
    if (currentShift >= halfWidth) {
      currentShift = 0;
      track.style.transition = 'none';
      track.style.transform = `translateX(0px)`;
      void track.offsetWidth;
    }

    track.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(-${currentShift}px)`;
  }

  function startTimer() {
    if (prefersReduced) return;
    if (timer) clearInterval(timer);
    timer = setInterval(stepMarquee, 5000);
  }

  stage.addEventListener('mouseenter', () => { isPaused = true; });
  stage.addEventListener('mouseleave', () => { isPaused = false; });
  stage.addEventListener('focusin', () => { isPaused = true; });
  stage.addEventListener('focusout', () => { isPaused = false; });
  stage.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  stage.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

  startTimer();

  window.openAllTestimonials = function(e) {
    if (e) {
      e.stopPropagation?.();
    }
    // Prevent opening if another overlay is already active
    if (currentViewState !== VIEW_STATES.MAIN && currentViewState !== VIEW_STATES.TESTIMONIALS) {
      return;
    }
    const modalEl = document.getElementById('all-testimonials-modal');
    if (!modalEl) return;

    originScrollY = window.scrollY || window.pageYOffset || 0;
    currentViewState = VIEW_STATES.TESTIMONIALS;

    // Safety: ensure media gallery and lightboxes are closed and non-interactive
    const galleryModal = document.getElementById('media-gallery-modal');
    galleryModal?.classList.remove('open', 'active');
    galleryModal?.setAttribute('aria-hidden', 'true');
    document.getElementById('image-lightbox')?.classList.remove('open', 'active');
    document.getElementById('image-lightbox')?.setAttribute('aria-hidden', 'true');
    document.getElementById('video-lightbox')?.classList.remove('open', 'active');
    document.getElementById('video-lightbox')?.setAttribute('aria-hidden', 'true');

    modalEl.classList.add('open', 'active');
    modalEl.setAttribute('aria-hidden', 'false');
    const btn = document.getElementById('view-all-testimonials-btn');
    btn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Completely lock Lenis virtual scrolling while modal is open
    if (window.lenis) {
      window.lenis.stop();
    }

    // Reset modal scroll to top upon opening
    const body = modalEl.querySelector('.testimonials-modal-body');
    if (body) body.scrollTop = 0;

    isPaused = true;
  };

  window.closeAllTestimonials = function(e) {
    if (e) {
      e.stopPropagation?.();
    }
    const modalEl = document.getElementById('all-testimonials-modal');
    if (!modalEl) return;
    modalEl.classList.remove('open', 'active');
    modalEl.setAttribute('aria-hidden', 'true');
    const btn = document.getElementById('view-all-testimonials-btn');
    btn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    currentViewState = VIEW_STATES.MAIN;

    // Resume Lenis smooth scroll and return to originating scroll position
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(originScrollY, { immediate: true });
    }
    window.scrollTo({ top: originScrollY, behavior: 'instant' });

    isPaused = false;
  };

  openModalBtn?.addEventListener('click', (e) => window.openAllTestimonials(e));
  closeModalBtn?.addEventListener('click', (e) => window.closeAllTestimonials(e));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) window.closeAllTestimonials(e);
  });

  // Wheel forwarding: Any wheel event over the modal overlay or header scrolls the body content
  modal?.addEventListener('wheel', (e) => {
    const body = modal.querySelector('.testimonials-modal-body');
    if (!body) return;
    if (!body.contains(e.target) || e.target === body) {
      body.scrollTop += e.deltaY;
    }
    e.stopPropagation();
  }, { passive: true });
}

function setupMediaGallery() {
  const modal = document.getElementById('media-gallery-modal');
  const openBtn = document.getElementById('open-media-gallery-btn');
  const closeBtn = document.getElementById('close-gallery-modal-btn');
  const tabPhotos = document.getElementById('gallery-tab-photos');
  const tabVideos = document.getElementById('gallery-tab-videos');
  const viewPhotos = document.getElementById('gallery-view-photos');
  const viewVideos = document.getElementById('gallery-view-videos');

  // Photo coverflow elements
  const photoStage = document.getElementById('coverflow-stage');
  const photoCards = Array.from(document.querySelectorAll('.coverflow-card'));
  const photoPrevBtn = document.getElementById('coverflow-prev-btn');
  const photoNextBtn = document.getElementById('coverflow-next-btn');
  const photoCounter = document.getElementById('coverflow-counter');
  const photoDots = Array.from(document.querySelectorAll('.coverflow-dot'));

  // Video coverflow elements
  const videoStage = document.getElementById('video-coverflow-stage');
  const videoCards = Array.from(document.querySelectorAll('.video-coverflow-card'));
  const videoPrevBtn = document.getElementById('video-prev-btn');
  const videoNextBtn = document.getElementById('video-next-btn');
  const videoCounter = document.getElementById('video-counter');

  // Photo Lightbox elements
  const photoLightbox = document.getElementById('image-lightbox');
  const photoLightboxImg = document.getElementById('lightbox-img');
  const photoLightboxTitle = document.getElementById('lightbox-title');
  const photoLightboxCategory = document.getElementById('lightbox-category');
  const photoLightboxClose = document.getElementById('close-image-lightbox-btn');
  const photoLightboxPrev = document.getElementById('lightbox-prev-btn');
  const photoLightboxNext = document.getElementById('lightbox-next-btn');

  // Video Lightbox elements
  const videoLightbox = document.getElementById('video-lightbox');
  const videoLightboxElem = document.getElementById('lightbox-video-elem');
  const videoLightboxTitle = document.getElementById('video-lightbox-title');
  const videoLightboxClose = document.getElementById('close-video-lightbox-btn');
  const videoLightboxPrev = document.getElementById('video-lightbox-prev-btn');
  const videoLightboxNext = document.getElementById('video-lightbox-next-btn');

  let activePhotoIdx = 0;
  let activeVideoIdx = 0;
  let isMutedState = true;
  let currentActiveTab = 'photos';

  // Open Media Gallery Modal
  window.openMediaGallery = function(index = 0, tab = 'photos', e) {
    if (e) {
      e.stopPropagation?.();
    }
    const modalEl = document.getElementById('media-gallery-modal');
    if (!modalEl) return;

    if (currentViewState === VIEW_STATES.MAIN) {
      originScrollY = window.scrollY || window.pageYOffset || 0;
    }

    // Safety: close testimonials modal if open
    const testModal = document.getElementById('all-testimonials-modal');
    testModal?.classList.remove('open', 'active');
    testModal?.setAttribute('aria-hidden', 'true');

    // Close any stale lightboxes
    photoLightbox?.classList.remove('open', 'active');
    photoLightbox?.setAttribute('aria-hidden', 'true');
    videoLightbox?.classList.remove('open', 'active');
    videoLightbox?.setAttribute('aria-hidden', 'true');

    modalEl.classList.add('open', 'active');
    modalEl.setAttribute('aria-hidden', 'false');
    const btn = document.getElementById('open-media-gallery-btn');
    btn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (window.lenis) {
      window.lenis.stop();
    }

    if (tab === 'videos') {
      currentViewState = VIEW_STATES.GALLERY_VIDEOS;
      switchTab('videos');
      if (typeof index === 'number') updateVideoCoverflow(index);
    } else {
      currentViewState = VIEW_STATES.GALLERY_PHOTOS;
      switchTab('photos');
      if (typeof index === 'number') updatePhotoCoverflow(index);
    }
  };

  // Close Media Gallery Modal
  window.closeMediaGallery = function(e) {
    if (e) {
      e.stopPropagation?.();
    }
    const modalEl = document.getElementById('media-gallery-modal');
    if (!modalEl) return;

    // Close all nested lightboxes safely
    if (photoLightbox) {
      photoLightbox.classList.remove('open', 'active');
      photoLightbox.setAttribute('aria-hidden', 'true');
    }
    if (videoLightbox) {
      videoLightbox.classList.remove('open', 'active');
      videoLightbox.setAttribute('aria-hidden', 'true');
      if (videoLightboxElem) {
        videoLightboxElem.pause();
        videoLightboxElem.removeAttribute('src');
        videoLightboxElem.load();
      }
    }

    pauseAllVideos();

    modalEl.classList.remove('open', 'active');
    modalEl.setAttribute('aria-hidden', 'true');
    const btn = document.getElementById('open-media-gallery-btn');
    btn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    currentViewState = VIEW_STATES.MAIN;

    // Resume Lenis and restore originating scroll position
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(originScrollY, { immediate: true });
    }
    window.scrollTo({ top: originScrollY, behavior: 'instant' });
  };

  openBtn?.addEventListener('click', (e) => window.openMediaGallery(0, 'photos', e));
  closeBtn?.addEventListener('click', (e) => window.closeMediaGallery(e));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal && (currentViewState === VIEW_STATES.GALLERY_PHOTOS || currentViewState === VIEW_STATES.GALLERY_VIDEOS)) {
      window.closeMediaGallery(e);
    }
  });

  // Header and Drawer Nav Links to Gallery
  document.querySelectorAll('a[href="#gallery"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSec = document.getElementById('gallery');
      if (targetSec) {
        if (window.lenis) {
          window.lenis.scrollTo(targetSec, { offset: -70 });
        } else {
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Nav Links to Testimonials
  document.querySelectorAll('a[href="#testimonials"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSec = document.getElementById('testimonials');
      if (targetSec) {
        if (window.lenis) {
          window.lenis.scrollTo(targetSec, { offset: -70 });
        } else {
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Tab Switcher
  function switchTab(tab) {
    currentActiveTab = tab;
    if (tab === 'photos') {
      currentViewState = VIEW_STATES.GALLERY_PHOTOS;
      tabPhotos?.classList.add('active');
      tabPhotos?.setAttribute('aria-selected', 'true');
      tabVideos?.classList.remove('active');
      tabVideos?.setAttribute('aria-selected', 'false');
      if (viewPhotos) viewPhotos.style.display = 'flex';
      if (viewVideos) viewVideos.style.display = 'none';
      pauseAllVideos();
      updatePhotoCoverflow(activePhotoIdx);
    } else {
      currentViewState = VIEW_STATES.GALLERY_VIDEOS;
      tabVideos?.classList.add('active');
      tabVideos?.setAttribute('aria-selected', 'true');
      tabPhotos?.classList.remove('active');
      tabPhotos?.setAttribute('aria-selected', 'false');
      if (viewVideos) viewVideos.style.display = 'flex';
      if (viewPhotos) viewPhotos.style.display = 'none';
      updateVideoCoverflow(activeVideoIdx);
    }
  }

  tabPhotos?.addEventListener('click', () => switchTab('photos'));
  tabVideos?.addEventListener('click', () => switchTab('videos'));

  // ---------------------------------------------------------------------------
  // PHOTOS COVERFLOW CAROUSEL (3D Perspective + Preserves Aspect Ratios)
  // ---------------------------------------------------------------------------
  function updatePhotoCoverflow(idx) {
    if (photoCards.length === 0) return;
    activePhotoIdx = ((idx % photoCards.length) + photoCards.length) % photoCards.length;

    const isMobile = window.innerWidth <= 768;
    const xStep = isMobile ? Math.min(138, Math.round(window.innerWidth * 0.36)) : 130;
    const zStep = isMobile ? 65 : 90;
    const rot = isMobile ? 24 : 32;

    photoCards.forEach((card, i) => {
      const diff = i - activePhotoIdx;
      card.classList.remove('active-card');

      if (diff === 0) {
        card.classList.add('active-card');
        card.style.transform = `translateX(0px) scale(1) translateZ(0px) rotateY(0deg)`;
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (Math.abs(diff) <= 3) {
        const xOffset = diff * xStep;
        const scale = 1 - Math.abs(diff) * (isMobile ? 0.14 : 0.12);
        const zOffset = -Math.abs(diff) * zStep;
        const yRotation = diff < 0 ? rot : -rot;
        const opacity = Math.max(0.25, 0.75 - Math.abs(diff) * 0.2);
        const zIndex = 10 - Math.abs(diff);

        card.style.transform = `translateX(${xOffset}px) scale(${scale}) translateZ(${zOffset}px) rotateY(${yRotation}deg)`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.pointerEvents = 'auto';
      } else {
        const xOffset = diff > 0 ? (isMobile ? 320 : 550) : (isMobile ? -320 : -550);
        card.style.transform = `translateX(${xOffset}px) scale(0.6) translateZ(-350px) rotateY(0deg)`;
        card.style.opacity = '0';
        card.style.zIndex = '0';
        card.style.pointerEvents = 'none';
      }
    });

    if (photoCounter) {
      photoCounter.textContent = `${String(activePhotoIdx + 1).padStart(2, '0')} / ${String(photoCards.length).padStart(2, '0')}`;
    }

    photoDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activePhotoIdx);
    });
  }

  let pTouchStartX = 0;
  let pTouchStartY = 0;
  let pJustSwiped = false;
  let pIsSwiping = false;

  photoCards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (pJustSwiped) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (i === activePhotoIdx) {
        openPhotoLightbox(i, e);
      } else {
        updatePhotoCoverflow(i);
      }
    });
  });

  photoPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updatePhotoCoverflow(activePhotoIdx - 1);
  });
  photoNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updatePhotoCoverflow(activePhotoIdx + 1);
  });

  photoDots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      updatePhotoCoverflow(i);
    });
  });

  // Touch & Swipe on Photo Stage
  photoStage?.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    pTouchStartX = e.touches[0].clientX;
    pTouchStartY = e.touches[0].clientY;
    pIsSwiping = false;
  }, { passive: true });

  photoStage?.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const diffX = e.touches[0].clientX - pTouchStartX;
    const diffY = e.touches[0].clientY - pTouchStartY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      pIsSwiping = true;
    }
  }, { passive: true });

  photoStage?.addEventListener('touchend', (e) => {
    if (!e.changedTouches[0]) return;
    const diffX = e.changedTouches[0].clientX - pTouchStartX;
    const diffY = e.changedTouches[0].clientY - pTouchStartY;
    if (pIsSwiping && Math.abs(diffX) >= 40 && Math.abs(diffX) > Math.abs(diffY)) {
      pJustSwiped = true;
      setTimeout(() => { pJustSwiped = false; }, 350);
      if (diffX > 0) updatePhotoCoverflow(activePhotoIdx - 1);
      else updatePhotoCoverflow(activePhotoIdx + 1);
    }
  }, { passive: true });

  // Mouse Drag on Photo Stage
  let pMouseStartX = 0;
  let pIsMouseDragging = false;
  photoStage?.addEventListener('mousedown', (e) => {
    pMouseStartX = e.clientX;
    pIsMouseDragging = true;
  });
  window.addEventListener('mouseup', (e) => {
    if (!pIsMouseDragging) return;
    pIsMouseDragging = false;
    const diff = e.clientX - pMouseStartX;
    if (Math.abs(diff) > 40) {
      pJustSwiped = true;
      setTimeout(() => { pJustSwiped = false; }, 350);
      if (diff > 0) updatePhotoCoverflow(activePhotoIdx - 1);
      else updatePhotoCoverflow(activePhotoIdx + 1);
    }
  });

  // ---------------------------------------------------------------------------
  // PHOTO LIGHTBOX (Child interaction within Media Gallery)
  // ---------------------------------------------------------------------------
  let lbPhotoIdx = 0;
  function openPhotoLightbox(index, e) {
    if (e) e.stopPropagation?.();
    if (!photoLightbox || !galleryPhotos[index]) return;
    lbPhotoIdx = index;
    renderPhotoLightboxContent();
    currentViewState = VIEW_STATES.LIGHTBOX_PHOTO;
    photoLightbox.classList.add('open', 'active');
    photoLightbox.setAttribute('aria-hidden', 'false');
  }

  function renderPhotoLightboxContent() {
    const item = galleryPhotos[lbPhotoIdx];
    if (!item) return;
    if (photoLightboxImg) {
      photoLightboxImg.src = getAssetUrl(item.src);
      photoLightboxImg.alt = item.title;
    }
    if (photoLightboxTitle) photoLightboxTitle.textContent = item.title;
    if (photoLightboxCategory) photoLightboxCategory.textContent = `${item.category} (${item.aspectRatio.toUpperCase()})`;
  }

  function closePhotoLightbox(e) {
    if (e) {
      e.stopPropagation?.();
      e.preventDefault?.();
    }
    if (!photoLightbox) return;
    photoLightbox.classList.remove('open', 'active');
    photoLightbox.setAttribute('aria-hidden', 'true');
    // Return to parent Photo Coverflow view (keep gallery modal open, maintain image index)
    currentViewState = VIEW_STATES.GALLERY_PHOTOS;
    updatePhotoCoverflow(activePhotoIdx);
  }
  window.closePhotoLightbox = closePhotoLightbox;

  photoLightboxClose?.addEventListener('click', (e) => closePhotoLightbox(e));
  photoLightbox?.addEventListener('click', (e) => {
    if (e.target === photoLightbox) closePhotoLightbox(e);
  });
  photoLightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    lbPhotoIdx = ((lbPhotoIdx - 1) + galleryPhotos.length) % galleryPhotos.length;
    renderPhotoLightboxContent();
    activePhotoIdx = lbPhotoIdx;
    updatePhotoCoverflow(lbPhotoIdx);
  });
  photoLightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    lbPhotoIdx = (lbPhotoIdx + 1) % galleryPhotos.length;
    renderPhotoLightboxContent();
    activePhotoIdx = lbPhotoIdx;
    updatePhotoCoverflow(lbPhotoIdx);
  });

  // ---------------------------------------------------------------------------
  // VIDEO 3D COVERFLOW (9:16 Vertical Video Reels)
  // ---------------------------------------------------------------------------
  function pauseAllVideos() {
    videoCards.forEach(card => {
      const vid = card.querySelector('video');
      const pBtn = card.querySelector('.video-play-center-btn');
      if (vid) vid.pause();
      if (pBtn) pBtn.innerHTML = Icons.play;
    });
  }

  function updateVideoCoverflow(idx) {
    if (videoCards.length === 0) return;
    activeVideoIdx = ((idx % videoCards.length) + videoCards.length) % videoCards.length;

    const isMobile = window.innerWidth <= 768;
    const xStep = isMobile ? Math.min(150, Math.round(window.innerWidth * 0.36)) : 150;
    const rot = isMobile ? 22 : 30;
    const zStep = isMobile ? -90 : -130;

    videoCards.forEach((card, i) => {
      const diff = i - activeVideoIdx;
      const vid = card.querySelector('video');
      const pBtn = card.querySelector('.video-play-center-btn');
      const muteBtn = card.querySelector(`#video-mute-toggle-${i}`);
      const volumeSlider = card.querySelector(`#video-volume-${i}`);

      card.classList.remove('active-card');

      if (diff === 0) {
        card.classList.add('active-card');
        card.style.transform = `translateX(0px) scale(1) translateZ(0px) rotateY(0deg)`;
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';

        if (vid) {
          vid.muted = isMutedState;
          if (muteBtn) muteBtn.innerHTML = isMutedState ? Icons.volumeX : Icons.volume2;
          if (volumeSlider) volumeSlider.value = isMutedState ? '0' : String(vid.volume || 0.7);

          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              if (pBtn) pBtn.innerHTML = Icons.pause;
            }).catch(() => {
              if (pBtn) pBtn.innerHTML = Icons.play;
            });
          }
        }
      } else {
        const xOffset = diff * xStep;
        const yRotation = diff < 0 ? rot : -rot;
        card.style.transform = `translateX(${xOffset}px) scale(0.85) translateZ(${zStep}px) rotateY(${yRotation}deg)`;
        card.style.opacity = '0.55';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'auto';

        if (vid) vid.pause();
        if (pBtn) pBtn.innerHTML = Icons.play;
      }
    });

    if (videoCounter) {
      videoCounter.textContent = `${String(activeVideoIdx + 1).padStart(2, '0')} / ${String(videoCards.length).padStart(2, '0')}`;
    }
  }

  let vTouchStartX = 0;
  let vTouchStartY = 0;
  let vJustSwiped = false;
  let vIsSwiping = false;

  videoCards.forEach((card, i) => {
    const vid = card.querySelector('video');
    const playBtn = card.querySelector('.video-play-center-btn');
    const muteBtn = card.querySelector(`#video-mute-toggle-${i}`);
    const volSlider = card.querySelector(`#video-volume-${i}`);

    card.addEventListener('click', (e) => {
      if (e.target.closest('.video-bottom-toolbar')) return;
      if (vJustSwiped) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      if (i !== activeVideoIdx) {
        updateVideoCoverflow(i);
      } else {
        if (vid) {
          if (vid.paused) {
            vid.play().then(() => {
              if (playBtn) playBtn.innerHTML = Icons.pause;
            });
          } else {
            vid.pause();
            if (playBtn) playBtn.innerHTML = Icons.play;
          }
        }
      }
    });

    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (i !== activeVideoIdx) {
        updateVideoCoverflow(i);
        return;
      }
      if (vid) {
        if (vid.paused) {
          vid.play().then(() => {
            playBtn.innerHTML = Icons.pause;
          });
        } else {
          vid.pause();
          playBtn.innerHTML = Icons.play;
        }
      }
    });

    muteBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      isMutedState = !isMutedState;
      if (vid) {
        vid.muted = isMutedState;
        muteBtn.innerHTML = isMutedState ? Icons.volumeX : Icons.volume2;
        if (volSlider) volSlider.value = isMutedState ? '0' : String(vid.volume || 0.7);
      }
    });

    volSlider?.addEventListener('input', (e) => {
      e.stopPropagation();
      const val = parseFloat(volSlider.value);
      if (vid) {
        vid.volume = val;
        vid.muted = (val === 0);
        isMutedState = (val === 0);
        if (muteBtn) muteBtn.innerHTML = val === 0 ? Icons.volumeX : Icons.volume2;
      }
    });

    card.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      openVideoLightbox(i, e);
    });
  });

  videoPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateVideoCoverflow(activeVideoIdx - 1);
  });
  videoNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateVideoCoverflow(activeVideoIdx + 1);
  });

  // Touch Swipe on Video Stage
  videoStage?.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    vTouchStartX = e.touches[0].clientX;
    vTouchStartY = e.touches[0].clientY;
    vIsSwiping = false;
  }, { passive: true });

  videoStage?.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const diffX = e.touches[0].clientX - vTouchStartX;
    const diffY = e.touches[0].clientY - vTouchStartY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      vIsSwiping = true;
    }
  }, { passive: true });

  videoStage?.addEventListener('touchend', (e) => {
    if (!e.changedTouches[0]) return;
    const diffX = e.changedTouches[0].clientX - vTouchStartX;
    const diffY = e.changedTouches[0].clientY - vTouchStartY;
    if (vIsSwiping && Math.abs(diffX) >= 40 && Math.abs(diffX) > Math.abs(diffY)) {
      vJustSwiped = true;
      setTimeout(() => { vJustSwiped = false; }, 350);
      if (diffX > 0) updateVideoCoverflow(activeVideoIdx - 1);
      else updateVideoCoverflow(activeVideoIdx + 1);
    }
  }, { passive: true });

  // Mouse Drag on Video Stage
  let vMouseStartX = 0;
  let vIsMouseDragging = false;
  videoStage?.addEventListener('mousedown', (e) => {
    vMouseStartX = e.clientX;
    vIsMouseDragging = true;
  });
  window.addEventListener('mouseup', (e) => {
    if (!vIsMouseDragging) return;
    vIsMouseDragging = false;
    const diff = e.clientX - vMouseStartX;
    if (Math.abs(diff) > 40) {
      vJustSwiped = true;
      setTimeout(() => { vJustSwiped = false; }, 350);
      if (diff > 0) updateVideoCoverflow(activeVideoIdx - 1);
      else updateVideoCoverflow(activeVideoIdx + 1);
    }
  });

  // ---------------------------------------------------------------------------
  // VIDEO LIGHTBOX (Child interaction within Media Gallery)
  // ---------------------------------------------------------------------------
  let lbVideoIdx = 0;
  function openVideoLightbox(index, e) {
    if (e) e.stopPropagation?.();
    if (!videoLightbox || !galleryVideos[index]) return;
    pauseAllVideos();
    lbVideoIdx = index;
    renderVideoLightboxContent();
    currentViewState = VIEW_STATES.LIGHTBOX_VIDEO;
    videoLightbox.classList.add('open', 'active');
    videoLightbox.setAttribute('aria-hidden', 'false');
  }

  function renderVideoLightboxContent() {
    const item = galleryVideos[lbVideoIdx];
    if (!item) return;
    if (videoLightboxElem) {
      videoLightboxElem.src = getAssetUrl(item.src);
      videoLightboxElem.poster = getAssetUrl(item.poster);
      videoLightboxElem.muted = isMutedState;
      videoLightboxElem.play().catch(() => {});
    }
    if (videoLightboxTitle) videoLightboxTitle.textContent = `${item.title} (9:16 Vertical Reel)`;
  }

  function closeVideoLightbox(e) {
    if (e) {
      e.stopPropagation?.();
      e.preventDefault?.();
    }
    if (!videoLightbox) return;
    if (videoLightboxElem) {
      videoLightboxElem.pause();
      videoLightboxElem.removeAttribute('src');
      videoLightboxElem.load();
    }
    videoLightbox.classList.remove('open', 'active');
    videoLightbox.setAttribute('aria-hidden', 'true');
    // Return to parent Video Coverflow view (keep gallery modal open)
    currentViewState = VIEW_STATES.GALLERY_VIDEOS;
    updateVideoCoverflow(activeVideoIdx);
  }
  window.closeVideoLightbox = closeVideoLightbox;

  videoLightboxClose?.addEventListener('click', (e) => closeVideoLightbox(e));
  videoLightbox?.addEventListener('click', (e) => {
    if (e.target === videoLightbox) closeVideoLightbox(e);
  });
  videoLightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    lbVideoIdx = ((lbVideoIdx - 1) + galleryVideos.length) % galleryVideos.length;
    renderVideoLightboxContent();
    activeVideoIdx = lbVideoIdx;
  });
  videoLightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    lbVideoIdx = (lbVideoIdx + 1) % galleryVideos.length;
    renderVideoLightboxContent();
    activeVideoIdx = lbVideoIdx;
  });

  // Resize handler for responsive 3D transforms
  window.addEventListener('resize', () => {
    if (currentViewState === VIEW_STATES.GALLERY_PHOTOS) {
      updatePhotoCoverflow(activePhotoIdx);
    } else if (currentViewState === VIEW_STATES.GALLERY_VIDEOS) {
      updateVideoCoverflow(activeVideoIdx);
    }
  });

  // Global Keyboard Navigation (Esc to close, Arrows to navigate)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (currentViewState === VIEW_STATES.LIGHTBOX_PHOTO) {
        closePhotoLightbox(e);
      } else if (currentViewState === VIEW_STATES.LIGHTBOX_VIDEO) {
        closeVideoLightbox(e);
      } else if (currentViewState === VIEW_STATES.GALLERY_PHOTOS || currentViewState === VIEW_STATES.GALLERY_VIDEOS) {
        window.closeMediaGallery(e);
      } else if (currentViewState === VIEW_STATES.TESTIMONIALS) {
        window.closeAllTestimonials(e);
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentViewState === VIEW_STATES.LIGHTBOX_PHOTO) {
        photoLightboxPrev?.click();
      } else if (currentViewState === VIEW_STATES.LIGHTBOX_VIDEO) {
        videoLightboxPrev?.click();
      } else if (currentViewState === VIEW_STATES.GALLERY_PHOTOS) {
        updatePhotoCoverflow(activePhotoIdx - 1);
      } else if (currentViewState === VIEW_STATES.GALLERY_VIDEOS) {
        updateVideoCoverflow(activeVideoIdx - 1);
      }
    } else if (e.key === 'ArrowRight') {
      if (currentViewState === VIEW_STATES.LIGHTBOX_PHOTO) {
        photoLightboxNext?.click();
      } else if (currentViewState === VIEW_STATES.LIGHTBOX_VIDEO) {
        videoLightboxNext?.click();
      } else if (currentViewState === VIEW_STATES.GALLERY_PHOTOS) {
        updatePhotoCoverflow(activePhotoIdx + 1);
      } else if (currentViewState === VIEW_STATES.GALLERY_VIDEOS) {
        updateVideoCoverflow(activeVideoIdx + 1);
      }
    }
  });

  // Initialize first coverflow state
  updatePhotoCoverflow(0);
}

// Start Application
document.addEventListener('DOMContentLoaded', initApp);
