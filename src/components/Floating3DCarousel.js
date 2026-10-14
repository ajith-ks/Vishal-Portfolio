/**
 * Floating3DCarousel — Fluid 3D Floating Media Carousel
 * 
 * Features:
 * - Standalone, isolated, reusable component
 * - Discovers and supports both images and videos seamlessly
 * - Enforces strict 16:9 framing without cropping (object-fit: contain foreground)
 * - Tasteful blurred ambient background extension for non-16:9 portrait/square/vertical media
 * - Infinite, seamless looping in both directions: continuous 3D coordinate ring with zero resets/jumps
 * - Power-based momentum swiping: velocity + distance physics with smooth quintic ease-out inertia
 * - Immediate interruption: new touch or pointer interaction instantly interrupts ongoing momentum
 * - Automatic right-to-left flow every 2 seconds, paused during drag, momentum, hover, and tab blur
 * - Click safety: suppresses card activation and media opening during active drag gestures
 * - Single-video playback: muted by default, only active foreground card plays, others paused
 * - Touch swipe on mobile with vertical-scroll discrimination (no interference with page scrolling)
 * - Full previous/next and keyboard navigation
 * - Respects prefers-reduced-motion media query
 * - Clean lifecycle teardown via destroy()
 */

import { getAssetUrl } from '../utils/paths.js';

const DEFAULT_SAMPLE_ITEMS = [
  { id: 'sample-1', src: '/assets/images/review/random 9.jpg', alt: 'Dr. Vishal Kattery' },
  { id: 'sample-2', src: '/assets/images/review/pic with a famous person.jpg', alt: 'Honors and Awards' },
  { id: 'sample-3', src: '/assets/images/review/session.jpeg', alt: 'Keynote Lecture' },
  { id: 'sample-4', src: '/assets/images/review/random3.jpg', alt: 'Conference Session' },
  { id: 'sample-5', src: '/assets/images/review/pic with famous person 2.jpg', alt: 'Academic Felicitation' },
  { id: 'sample-6', src: '/assets/images/review/random5.jpg', alt: 'Student Mentorship' }
];

export class Floating3DCarousel {
  /**
   * @param {HTMLElement|string} container - Container element or selector
   * @param {Object} options - Configuration options
   */
  constructor(container, options = {}) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;

    if (!this.container) {
      console.warn('[Floating3DCarousel] Target container not found:', container);
      return;
    }

    this.options = {
      items: options.items && options.items.length ? options.items : DEFAULT_SAMPLE_ITEMS,
      initialIndex: typeof options.initialIndex === 'number' ? options.initialIndex : 0,
      ariaLabel: options.ariaLabel || 'Curated 3D Media Carousel',
      showControls: options.showControls !== false,
      showIndicators: options.showIndicators !== false,
      dragThreshold: options.dragThreshold || 12,
      autoplayDelay: 2000, // 2 seconds between automatic right-to-left steps
      onCardClick: typeof options.onCardClick === 'function' ? options.onCardClick : null,
      onChange: typeof options.onChange === 'function' ? options.onChange : null,
      ...options
    };

    this.items = this.options.items.map((item, idx) => ({
      id: item.id || `media-${idx}`,
      type: item.type || (item.src && /\.(mp4|webm|mov|m4v)$/i.test(item.src) ? 'video' : 'image'),
      src: item.src,
      resolvedSrc: item.resolvedUrl || getAssetUrl(item.src),
      poster: item.poster || item.src,
      resolvedPoster: item.poster ? getAssetUrl(item.poster) : getAssetUrl(item.src),
      alt: item.alt || item.title || 'Curated portfolio media',
      aspectRatio: item.aspectRatio || '16:9'
    }));

    // Continuous virtual position float (0.0 to N - 1, wraps indefinitely)
    this.currentIndex = Math.max(0, Math.min(this.options.initialIndex, this.items.length - 1));
    this.position = this.currentIndex;
    
    // Interaction and momentum state
    this.isDragging = false;
    this.isAnimating = false;
    this.hasMoved = false;
    this.dragStartPos = this.position;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.startTime = 0;
    this.dragDelta = 0;
    this.swipeDirection = null; // null | 'horizontal' | 'vertical'
    this.pointerHistory = []; // Rolling history of [{ x, time }] for release velocity
    
    // Animation and timer handles
    this.animFrameId = null;
    this.autoplayTimer = null;
    this.isHovered = false;

    // Bound event handlers for clean removal
    this._handlePointerDown = this._onPointerDown.bind(this);
    this._handlePointerMove = this._onPointerMove.bind(this);
    this._handlePointerUp = this._onPointerUp.bind(this);
    this._handlePointerCancel = this._onPointerCancel.bind(this);

    this._handleTouchStart = this._onTouchStart.bind(this);
    this._handleTouchMove = this._onTouchMove.bind(this);
    this._handleTouchEnd = this._onTouchEnd.bind(this);
    this._handleTouchCancel = this._onTouchCancel.bind(this);

    this._handleKeyDown = this._onKeyDown.bind(this);
    this._handleResize = this._onResize.bind(this);
    this._handleMouseEnter = this._onMouseEnter.bind(this);
    this._handleMouseLeave = this._onMouseLeave.bind(this);
    this._handleVisibilityChange = this._onVisibilityChange.bind(this);
    this._handleMotionQueryChange = this._onMotionPreferenceChange.bind(this);

    // Reduced motion media query
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = this.motionQuery.matches;

    this.init();
  }

  init() {
    this._renderMarkup();
    this._cacheDom();
    this._bindEvents();
    this._applyTransforms();
    this._scheduleAutoplay();
  }

  _renderMarkup() {
    this.container.innerHTML = '';

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'floating-3d-carousel';
    this.rootEl.setAttribute('role', 'region');
    this.rootEl.setAttribute('aria-roledescription', 'carousel');
    this.rootEl.setAttribute('aria-label', this.options.ariaLabel);
    this.rootEl.setAttribute('tabindex', '0');

    // 3D Stage & Track
    const stage = document.createElement('div');
    stage.className = 'floating-3d-stage';

    const track = document.createElement('div');
    track.className = 'floating-3d-track';

    this.items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'floating-3d-card';
      card.setAttribute('data-index', String(index));
      card.setAttribute('data-type', item.type);
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${index + 1} of ${this.items.length}: ${item.alt}`);

      // Strict 16:9 aspect ratio frame
      // Backdrop: ambient blurred extension of the same media
      // Foreground: complete media with object-fit: contain (never cropped or distorted)
      card.innerHTML = `
        <div class="floating-3d-card-inner">
          <div class="floating-3d-card-frame aspect-16-9">
            <div class="floating-3d-backdrop" aria-hidden="true">
              <img 
                src="${item.resolvedPoster || item.resolvedSrc}" 
                alt="" 
                class="floating-3d-backdrop-media" 
                loading="lazy" 
                draggable="false" 
              />
              <div class="floating-3d-backdrop-tint"></div>
            </div>

            <div class="floating-3d-foreground">
              ${item.type === 'video' ? `
                <video 
                  class="floating-3d-video" 
                  src="${item.resolvedSrc}" 
                  poster="${item.resolvedPoster}" 
                  muted 
                  playsinline 
                  loop 
                  preload="metadata"
                ></video>
                <div class="floating-3d-video-badge" aria-label="Video Reel">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  <span>REEL</span>
                </div>
              ` : `
                <img 
                  src="${item.resolvedSrc}" 
                  alt="${item.alt}" 
                  class="floating-3d-image" 
                  loading="${index <= 4 ? 'eager' : 'lazy'}" 
                  draggable="false" 
                />
              `}
            </div>

            <div class="floating-3d-glass-sheen"></div>
          </div>
        </div>
      `;

      track.appendChild(card);
    });

    stage.appendChild(track);
    this.rootEl.appendChild(stage);

    // Controls & Indicators
    if (this.options.showControls || this.options.showIndicators) {
      const controlsBar = document.createElement('div');
      controlsBar.className = 'floating-3d-controls';

      if (this.options.showControls) {
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'floating-3d-btn floating-3d-btn-prev';
        prevBtn.setAttribute('aria-label', 'Previous media');
        prevBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        `;
        controlsBar.appendChild(prevBtn);
      }

      if (this.options.showIndicators) {
        const indicators = document.createElement('div');
        indicators.className = 'floating-3d-indicators';
        indicators.setAttribute('role', 'tablist');
        indicators.setAttribute('aria-label', 'Media slide indicators');

        const indicatorCount = Math.min(this.items.length, 12);
        for (let i = 0; i < indicatorCount; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'floating-3d-dot';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('data-indicator-index', String(i));
          dot.setAttribute('aria-label', `Media slide ${i + 1}`);
          dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          indicators.appendChild(dot);
        }

        controlsBar.appendChild(indicators);
      }

      if (this.options.showControls) {
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'floating-3d-btn floating-3d-btn-next';
        nextBtn.setAttribute('aria-label', 'Next media');
        nextBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        controlsBar.appendChild(nextBtn);
      }

      this.rootEl.appendChild(controlsBar);
    }

    this.container.appendChild(this.rootEl);
  }

  _cacheDom() {
    this.stageEl = this.rootEl.querySelector('.floating-3d-stage');
    this.trackEl = this.rootEl.querySelector('.floating-3d-track');
    this.cardEls = Array.from(this.rootEl.querySelectorAll('.floating-3d-card'));
    this.prevBtn = this.rootEl.querySelector('.floating-3d-btn-prev');
    this.nextBtn = this.rootEl.querySelector('.floating-3d-btn-next');
    this.dotEls = Array.from(this.rootEl.querySelectorAll('.floating-3d-dot'));
  }

  _bindEvents() {
    // Prev / Next button clicks
    this.prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });

    this.nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    // Indicator dots
    this.dotEls.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = Math.round((index / (this.dotEls.length - 1)) * (this.items.length - 1));
        this.goTo(targetIndex);
      });
    });

    // Card click: open existing popup for full-size viewing
    this.cardEls.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (this.hasMoved) return; // Prevent accidental opening while dragging
        e.stopPropagation();
        if (this.options.onCardClick) {
          this.options.onCardClick(index, this.items[index]);
        }
      });
    });

    // Desktop mouse / pointer events
    this.stageEl.addEventListener('pointerdown', this._handlePointerDown);
    window.addEventListener('pointermove', this._handlePointerMove);
    window.addEventListener('pointerup', this._handlePointerUp);
    window.addEventListener('pointercancel', this._handlePointerCancel);

    // Mobile touch events with vertical-scroll discrimination
    this.stageEl.addEventListener('touchstart', this._handleTouchStart, { passive: true });
    window.addEventListener('touchmove', this._handleTouchMove, { passive: false });
    window.addEventListener('touchend', this._handleTouchEnd);
    window.addEventListener('touchcancel', this._handleTouchCancel);

    // Hover pauses autoplay; leaving resumes it
    this.stageEl.addEventListener('mouseenter', this._handleMouseEnter);
    this.stageEl.addEventListener('mouseleave', this._handleMouseLeave);

    // Tab visibility handling (pause autoplay when tab is hidden)
    document.addEventListener('visibilitychange', this._handleVisibilityChange);

    // Keyboard accessibility
    this.rootEl.addEventListener('keydown', this._handleKeyDown);

    // Window resize
    window.addEventListener('resize', this._handleResize);

    // Reduced motion preference
    if (this.motionQuery.addEventListener) {
      this.motionQuery.addEventListener('change', this._handleMotionQueryChange);
    } else if (this.motionQuery.addListener) {
      this.motionQuery.addListener(this._handleMotionQueryChange);
    }
  }

  // =========================================================================
  // CONTINUOUS 3D GEOMETRY & RENDERING (Zero Resets, Infinite Ring Loop)
  // =========================================================================

  _getActiveIndex() {
    const N = this.items.length;
    if (N === 0) return 0;
    return ((Math.round(this.position) % N) + N) % N;
  }

  _getPxPerItem() {
    const width = window.innerWidth;
    if (width <= 380) return 140;
    if (width <= 768) return 180;
    return 270;
  }

  /**
   * Applies continuous 3D transforms to all cards based on float this.position.
   * Moving continuously across N has zero reset or visual jump.
   */
  _applyTransforms() {
    const N = this.items.length;
    if (N === 0) return;

    const width = window.innerWidth;
    const isSmall = width <= 380;
    const isMobile = width <= 768;
    const activeIdx = this._getActiveIndex();

    // Responsive geometry calibrations
    let kx1, kz1, ks1, kr1, ko1, kb1;
    let kx2, kz2, ks2, kr2, ko2, kb2;

    if (isSmall) {
      kx1 = 82; kz1 = -85; ks1 = 0.76; kr1 = 14; ko1 = 0.55; kb1 = 0.70;
      kx2 = 160; kz2 = -180; ks2 = 0.55; kr2 = 20; ko2 = 0.0; kb2 = 0.40;
    } else if (isMobile) {
      kx1 = 115; kz1 = -100; ks1 = 0.80; kr1 = 16; ko1 = 0.65; kb1 = 0.70;
      kx2 = 200; kz2 = -200; ks2 = 0.60; kr2 = 24; ko2 = 0.0; kb2 = 0.40;
    } else {
      kx1 = 240; kz1 = -140; ks1 = 0.85; kr1 = 18; ko1 = 0.78; kb1 = 0.75;
      kx2 = 440; kz2 = -280; ks2 = 0.70; kr2 = 30; ko2 = 0.45; kb2 = 0.50;
    }

    this.cardEls.forEach((card, index) => {
      // Continuous cyclic offset from this.position
      let diff = ((index - this.position) % N + N) % N;
      if (diff > N / 2) diff -= N;

      const absDiff = Math.abs(diff);
      const sgn = diff < 0 ? -1 : 1;

      // Visibility cutoff
      const maxVisible = isMobile ? 1.85 : 3.1;
      if (absDiff >= maxVisible) {
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '0';
        card.setAttribute('aria-hidden', 'true');
        card.setAttribute('tabindex', '-1');
        card.classList.remove('is-active');
        
        const vid = card.querySelector('video');
        if (vid && !vid.paused) vid.pause();
        return;
      }

      card.style.visibility = 'visible';

      let x, z, scale, rot, opacity, brightness, zIndex;

      if (this.isReducedMotion) {
        // Reduced motion: simple fade and minimal shift without 3D rotations
        opacity = Math.max(0, 1 - absDiff * 0.5);
        scale = absDiff < 0.5 ? 1.0 : 0.85;
        x = sgn * Math.min(absDiff, 1) * (isMobile ? 115 : 240);
        z = 0;
        rot = 0;
        brightness = absDiff < 0.5 ? 1.0 : 0.75;
        zIndex = Math.round(10 - absDiff * 3);
      } else if (absDiff <= 1.0) {
        // Interpolate between center (0) and flank 1 (1.0)
        const t = absDiff;
        x = sgn * (t * kx1);
        z = t * kz1;
        scale = 1.0 - t * (1.0 - ks1);
        rot = -sgn * (t * kr1);
        opacity = 1.0 - t * (1.0 - ko1);
        brightness = 1.0 - t * (1.0 - kb1);
        zIndex = Math.round(10 - t * 4);
      } else if (absDiff <= 2.0) {
        // Interpolate between flank 1 (1.0) and flank 2 (2.0)
        const t = absDiff - 1.0;
        x = sgn * (kx1 + t * (kx2 - kx1));
        z = kz1 + t * (kz2 - kz1);
        scale = ks1 - t * (ks1 - ks2);
        rot = -sgn * (kr1 + t * (kr2 - kr1));
        opacity = ko1 - t * (ko1 - ko2);
        brightness = kb1 - t * (kb1 - kb2);
        zIndex = Math.round(6 - t * 3);
      } else {
        // Desktop flank 2 to outer edge (fade out smoothly)
        const t = absDiff - 2.0;
        x = sgn * (kx2 + t * 110);
        z = kz2 - t * 100;
        scale = ks2 - t * 0.15;
        rot = -sgn * (kr2 + t * 5);
        opacity = ko2 * (1.0 - t);
        brightness = kb2 - t * 0.2;
        zIndex = Math.max(1, Math.round(3 - t * 2));
      }

      const isActive = absDiff < 0.5;
      card.style.opacity = Math.max(0, opacity).toFixed(3);
      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, ${z.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateY(${rot.toFixed(1)}deg)`;
      card.style.zIndex = String(zIndex);
      card.style.filter = `brightness(${brightness.toFixed(2)})`;
      card.style.pointerEvents = isActive ? 'auto' : 'auto';
      card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      card.setAttribute('tabindex', isActive ? '0' : '-1');

      if (isActive) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }

      // Single-video playback: muted by default, only active card plays, others paused
      const videoElem = card.querySelector('video');
      if (videoElem) {
        if (isActive) {
          videoElem.muted = true;
          const playPromise = videoElem.play();
          if (playPromise !== undefined) playPromise.catch(() => {});
        } else if (!videoElem.paused) {
          videoElem.pause();
        }
      }
    });

    // Update Indicators
    if (this.dotEls.length > 0) {
      const activeIndicatorIdx = Math.round((activeIdx / (N - 1)) * (this.dotEls.length - 1));
      this.dotEls.forEach((dot, index) => {
        const isSelected = index === activeIndicatorIdx;
        dot.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        dot.classList.toggle('is-active', isSelected);
      });
    }

    if (activeIdx !== this.currentIndex) {
      this.currentIndex = activeIdx;
      if (this.options.onChange) {
        this.options.onChange(this.currentIndex, this.items[this.currentIndex]);
      }
    }
  }

  // =========================================================================
  // FLUID MOMENTUM PHYSICS & INTERACTION
  // =========================================================================

  _startInteraction(x, y) {
    // Interrupt any active momentum or animation immediately
    this._stopAnimation();
    this._clearAutoplay();

    this.isDragging = true;
    this.hasMoved = false;
    this.dragStartPos = this.position;
    this.startX = x;
    this.startY = y;
    this.currentX = x;
    this.currentY = y;
    this.startTime = Date.now();
    this.dragDelta = 0;
    this.pointerHistory = [{ x, time: this.startTime }];

    this.rootEl.classList.add('is-dragging');
  }

  _moveInteraction(x, y, isTouch = false, touchEvent = null) {
    if (!this.isDragging) return;

    this.currentX = x;
    this.currentY = y;
    const dx = this.currentX - this.startX;
    const dy = this.currentY - this.startY;

    // Mobile touch slope discrimination: only capture horizontal swipes
    if (isTouch && this.swipeDirection === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        if (Math.abs(dx) > Math.abs(dy) * 1.25) {
          this.swipeDirection = 'horizontal';
        } else {
          this.swipeDirection = 'vertical';
        }
      }
    }

    if (isTouch && this.swipeDirection === 'vertical') {
      return; // Allow native vertical page scrolling without interference
    }

    if (isTouch && this.swipeDirection === 'horizontal' && touchEvent?.cancelable) {
      touchEvent.preventDefault();
    }

    this.dragDelta = dx;
    if (Math.abs(this.dragDelta) > 6) {
      this.hasMoved = true;
    }

    // Record pointer history for velocity calculation
    const now = Date.now();
    this.pointerHistory.push({ x, time: now });
    if (this.pointerHistory.length > 8) {
      this.pointerHistory.shift();
    }

    // Move carousel directly with finger/pointer in real-time
    const pxPerItem = this._getPxPerItem();
    this.position = this.dragStartPos - (this.dragDelta / pxPerItem);
    this._applyTransforms();
  }

  /**
   * Finishes drag with power-based momentum:
   * - Considers both swipe velocity and distance
   * - Strong swipe flows across multiple items (no arbitrary 1-item limit)
   * - Decelerates with natural quintic ease-out inertia
   */
  _finishDrag(cancelled = false) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.rootEl.classList.remove('is-dragging');

    if (cancelled || this.swipeDirection === 'vertical') {
      this.swipeDirection = null;
      this._settleToNearest();
      return;
    }

    const now = Date.now();
    const recentMoves = this.pointerHistory.filter(p => now - p.time <= 140);
    let velocity = 0; // px per ms

    if (recentMoves.length >= 2) {
      const oldest = recentMoves[0];
      const newest = recentMoves[recentMoves.length - 1];
      const dt = Math.max(newest.time - oldest.time, 1);
      velocity = (newest.x - oldest.x) / dt;
    } else {
      const dt = Math.max(now - this.startTime, 1);
      velocity = (this.currentX - this.startX) / dt;
    }

    const totalDx = this.currentX - this.startX;
    const absTotalDx = Math.abs(totalDx);
    const absV = Math.abs(velocity);
    const pxPerItem = this._getPxPerItem();

    // If gesture was a static tap or tiny movement, settle to nearest integer
    if (absTotalDx < 8 && absV < 0.12) {
      this.swipeDirection = null;
      setTimeout(() => { this.hasMoved = false; }, 50);
      this._settleToNearest();
      return;
    }

    // Momentum displacement calculation:
    // dragItems: offset directly achieved during drag
    // velocityItems: extra distance carried by swipe speed
    const dragItems = -totalDx / pxPerItem;
    const momentumCarryMs = this.isReducedMotion ? 0 : 380;
    const velocityItems = -velocity * momentumCarryMs / pxPerItem;

    let totalOffset = dragItems + velocityItems;

    // Enforce clear threshold advancement
    if (absTotalDx >= this.options.dragThreshold || absV >= 0.35) {
      const dir = (velocity < 0 || totalDx < 0) ? 1 : -1;
      if (dir > 0 && totalOffset < 0.5) totalOffset = 1;
      if (dir < 0 && totalOffset > -0.5) totalOffset = -1;
    }

    // Power-based target: can advance 1, 2, 3, 5, or more items based on swipe power
    const steps = Math.abs(Math.round(totalOffset));
    const targetPos = Math.round(this.dragStartPos + totalOffset);
    this.swipeDirection = null;

    setTimeout(() => { this.hasMoved = false; }, 50);
    this._animateToPosition(targetPos, absV);
  }

  _settleToNearest() {
    this._animateToPosition(Math.round(this.position), 0);
  }

  /**
   * Smoothly animates continuous position to target position using natural inertia deceleration.
   * Interruptible at any instant by user touch or pointer down.
   */
  _animateToPosition(targetPos, initialSpeed = 0) {
    this._stopAnimation();
    this._clearAutoplay();

    const startPos = this.position;
    const distance = Math.abs(targetPos - startPos);

    if (this.isReducedMotion || distance < 0.001) {
      this.position = targetPos;
      this._applyTransforms();
      this._scheduleAutoplay();
      return;
    }

    this.isAnimating = true;
    const startTime = performance.now();

    // Duration scales naturally with travel distance: 420ms to 1250ms
    const baseDuration = 420;
    const itemExtra = Math.min(distance * 110, 830);
    const duration = Math.min(1250, Math.max(380, baseDuration + itemExtra));

    // Quintic ease-out curve: high initial glide, smooth natural deceleration
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 4);

    const step = (now) => {
      if (!this.isAnimating) return;

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progress);

      this.position = startPos + (targetPos - startPos) * eased;
      this._applyTransforms();

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(step);
      } else {
        this.position = targetPos;
        this.isAnimating = false;
        this.animFrameId = null;
        this._applyTransforms();
        this._scheduleAutoplay();
      }
    };

    this.animFrameId = requestAnimationFrame(step);
  }

  _stopAnimation() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.isAnimating = false;
  }

  // =========================================================================
  // AUTOMATIC RIGHT-TO-LEFT MOVEMENT (Every 2 Seconds)
  // =========================================================================

  _scheduleAutoplay() {
    if (this.isReducedMotion) return;
    this._clearAutoplay();

    // Do not schedule autoplay if hovered or document hidden
    if (this.isHovered || document.visibilityState === 'hidden') return;

    this.autoplayTimer = setTimeout(() => {
      this._autoplayStep();
    }, this.options.autoplayDelay);
  }

  _clearAutoplay() {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  _autoplayStep() {
    if (this.isDragging || this.isAnimating || this.isHovered) {
      this._scheduleAutoplay();
      return;
    }

    // Automatically advance right-to-left: target is next item (+1)
    const nextTarget = Math.round(this.position) + 1;
    this._animateToPosition(nextTarget, 0);
  }

  // =========================================================================
  // EVENT LISTENERS & GESTURE DISCRIMINATION
  // =========================================================================

  _onPointerDown(e) {
    if (e.pointerType === 'touch') return; // Handled by touch events
    if (e.button !== 0) return; // Left click only
    this._startInteraction(e.clientX, e.clientY);
  }

  _onPointerMove(e) {
    if (!this.isDragging || e.pointerType === 'touch') return;
    this._moveInteraction(e.clientX, e.clientY, false);
  }

  _onPointerUp(e) {
    if (!this.isDragging || e.pointerType === 'touch') return;
    this._finishDrag();
  }

  _onPointerCancel(e) {
    if (!this.isDragging || e.pointerType === 'touch') return;
    this._finishDrag(true);
  }

  _onTouchStart(e) {
    if (e.touches.length !== 1) return;
    this._startInteraction(e.touches[0].clientX, e.touches[0].clientY);
    this.swipeDirection = null;
  }

  _onTouchMove(e) {
    if (!this.isDragging || e.touches.length !== 1) return;
    this._moveInteraction(e.touches[0].clientX, e.touches[0].clientY, true, e);
  }

  _onTouchEnd() {
    if (!this.isDragging) return;
    this._finishDrag();
  }

  _onTouchCancel() {
    if (!this.isDragging) return;
    this._finishDrag(true);
  }

  _onMouseEnter() {
    this.isHovered = true;
    this._clearAutoplay();
  }

  _onMouseLeave() {
    this.isHovered = false;
    if (!this.isDragging && !this.isAnimating) {
      this._scheduleAutoplay();
    }
  }

  _onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this._clearAutoplay();
    } else if (!this.isDragging && !this.isAnimating && !this.isHovered) {
      this._scheduleAutoplay();
    }
  }

  _onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
    }
  }

  _onResize() {
    this._applyTransforms();
  }

  _onMotionPreferenceChange(e) {
    this.isReducedMotion = e.matches;
    if (this.isReducedMotion) {
      this._clearAutoplay();
    } else {
      this._scheduleAutoplay();
    }
    this._applyTransforms();
  }

  // =========================================================================
  // PUBLIC CONTROLS & NAVIGATION
  // =========================================================================

  step(delta) {
    const target = Math.round(this.position) + delta;
    this._animateToPosition(target, 0);
  }

  next() {
    this.step(1);
  }

  prev() {
    this.step(-1);
  }

  goTo(targetIndex) {
    const N = this.items.length;
    if (N === 0) return;
    const bounded = ((targetIndex % N) + N) % N;
    const current = this._getActiveIndex();
    
    // Shortest cyclic route around the ring
    let diff = bounded - current;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;

    const targetPos = Math.round(this.position) + diff;
    this._animateToPosition(targetPos, 0);
  }

  /**
   * Teardown of event listeners, video players, timers, rAF, and DOM elements
   */
  destroy() {
    this._stopAnimation();
    this._clearAutoplay();

    // Pause and clean up any video elements
    if (this.cardEls) {
      this.cardEls.forEach(card => {
        const vid = card.querySelector('video');
        if (vid) {
          vid.pause();
          vid.removeAttribute('src');
          vid.load();
        }
      });
    }

    // Remove event listeners
    if (this.stageEl) {
      this.stageEl.removeEventListener('pointerdown', this._handlePointerDown);
      this.stageEl.removeEventListener('touchstart', this._handleTouchStart);
      this.stageEl.removeEventListener('mouseenter', this._handleMouseEnter);
      this.stageEl.removeEventListener('mouseleave', this._handleMouseLeave);
    }
    window.removeEventListener('pointermove', this._handlePointerMove);
    window.removeEventListener('pointerup', this._handlePointerUp);
    window.removeEventListener('pointercancel', this._handlePointerCancel);

    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('touchend', this._handleTouchEnd);
    window.removeEventListener('touchcancel', this._handleTouchCancel);

    document.removeEventListener('visibilitychange', this._handleVisibilityChange);

    if (this.rootEl) {
      this.rootEl.removeEventListener('keydown', this._handleKeyDown);
    }

    window.removeEventListener('resize', this._handleResize);

    if (this.motionQuery.removeEventListener) {
      this.motionQuery.removeEventListener('change', this._handleMotionQueryChange);
    } else if (this.motionQuery.removeListener) {
      this.motionQuery.removeListener(this._handleMotionQueryChange);
    }

    // Clean up DOM
    if (this.rootEl && this.rootEl.parentNode) {
      this.rootEl.parentNode.removeChild(this.rootEl);
    }

    this.cardEls = [];
    this.dotEls = [];
    this.rootEl = null;
    this.stageEl = null;
    this.trackEl = null;
  }
}

// Attach to window object for standalone usage/debugging in browser
if (typeof window !== 'undefined') {
  window.Floating3DCarousel = Floating3DCarousel;
}
