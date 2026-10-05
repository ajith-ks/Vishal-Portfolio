import Lenis from 'lenis';

export class MotionEngine {
  constructor() {
    this.lenis = null;
    this.cursor = null;
    this.cursorFollower = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.followerX = 0;
    this.followerY = 0;
    this.rafId = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hero parallax targets
    this.heroCutout = null;
    this.heroGlow = null;
    this.heroCards = [];
    this.targetHeroX = 0;
    this.targetHeroY = 0;
    this.currentHeroX = 0;
    this.currentHeroY = 0;
  }

  init() {
    this.initLenis();
    this.initCursor();
    this.initHeroParallax();
    this.initScrollReveals();
    this.initActiveNavTracking();
    this.initTimelineProgress();
    this.startRafLoop();
  }

  initLenis() {
    if (this.reducedMotion) return;

    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        infinite: false
      });

      // Handle smooth scroll clicks for internal anchors
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              if (this.lenis) {
                this.lenis.scrollTo(targetEl, { offset: -70 });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        });
      });
    } catch (e) {
      console.warn('Lenis could not be initialized:', e);
    }
  }

  initCursor() {
    if (this.reducedMotion || window.innerWidth <= 1024 || 'ontouchstart' in window) {
      return;
    }

    this.cursor = document.querySelector('.custom-cursor');
    this.cursorFollower = document.querySelector('.custom-cursor-follower');

    if (!this.cursor || !this.cursorFollower) return;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .btn, .card, .expertise-card, .timeline-card, .hero-capability-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor?.classList.add('hovering');
        this.cursorFollower?.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor?.classList.remove('hovering');
        this.cursorFollower?.classList.remove('hovering');
      });
    });
  }

  initHeroParallax() {
    if (this.reducedMotion || window.innerWidth <= 1024 || 'ontouchstart' in window) {
      return;
    }

    this.heroCutout = document.getElementById('hero-cutout-wrap');
    this.heroGlow = document.querySelector('.hero-backdrop-glow');
    this.heroCards = Array.from(document.querySelectorAll('.hero-capability-card'));

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Normalized between -1 and 1
      this.targetHeroX = (e.clientX - centerX) / centerX;
      this.targetHeroY = (e.clientY - centerY) / centerY;
    }, { passive: true });
  }

  initScrollReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  initTimelineProgress() {
    const timelineWrap = document.querySelector('.journey-timeline-wrap');
    const progressBar = document.querySelector('.timeline-rail-progress');
    if (!timelineWrap || !progressBar) return;

    window.addEventListener('scroll', () => {
      const rect = timelineWrap.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.8;
      const totalH = rect.height;
      const current = start - rect.top;

      let progress = (current / totalH) * 100;
      progress = Math.max(0, Math.min(100, progress));
      progressBar.style.height = `${progress}%`;
    }, { passive: true });
  }

  startRafLoop() {
    const ticker = (time) => {
      // 1. Lenis update
      if (this.lenis) {
        this.lenis.raf(time);
      }

      // 2. Cursor smoothing (lerp)
      if (this.cursor && this.cursorFollower) {
        this.cursorX += (this.mouseX - this.cursorX) * 0.45;
        this.cursorY += (this.mouseY - this.cursorY) * 0.45;
        this.followerX += (this.mouseX - this.followerX) * 0.15;
        this.followerY += (this.mouseY - this.followerY) * 0.15;

        this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        this.cursorFollower.style.transform = `translate(${this.followerX}px, ${this.followerY}px)`;
      }

      // 3. Hero Subtle Parallax
      if (this.heroCutout && !this.reducedMotion) {
        this.currentHeroX += (this.targetHeroX - this.currentHeroX) * 0.08;
        this.currentHeroY += (this.targetHeroY - this.currentHeroY) * 0.08;

        const px = this.currentHeroX * 14;
        const py = this.currentHeroY * 10;
        this.heroCutout.style.transform = `translate3d(${px}px, ${py}px, 0)`;

        if (this.heroGlow) {
          const gx = -this.currentHeroX * 18;
          const gy = -this.currentHeroY * 14;
          this.heroGlow.style.transform = `translate(calc(-50% + ${gx}px), calc(-50% + ${gy}px))`;
        }
      }

      this.rafId = requestAnimationFrame(ticker);
    };

    this.rafId = requestAnimationFrame(ticker);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.lenis) this.lenis.destroy();
  }
}
