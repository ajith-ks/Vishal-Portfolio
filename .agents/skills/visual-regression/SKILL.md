---
name: visual-regression
description: Comprehensive visual and functional regression audit procedure testing responsive breakpoints, themes, navigation, media, animations, and accessibility using browser subagents.
---

# Visual Regression Audit Workflow

Use this skill when auditing visual fidelity, responsive responsiveness, theme transitions, or interaction integrity across the portfolio.

---

## 1. Multi-Viewport Responsive Matrix

Browser subagents must capture and evaluate the interface at all 7 standardized viewport widths (using standard device heights or 900px minimum):

| Breakpoint | Target Category | Focus Areas |
| :--- | :--- | :--- |
| **320px** | Ultra-narrow mobile (iPhone SE / older Android) | Header height vs hero overlap, brand logo truncation, badge grid wrapping |
| **360px** | Compact mobile (Galaxy S / Moto G) | Role pill wrapping, ShinyButton full-width sizing, touch target margins |
| **390px** | Standard modern mobile (iPhone 13/14/15) | Typography line breaks, hero portrait scale, card padding |
| **430px** | Large modern mobile (iPhone Plus / Pro Max) | Header actions spacing, mobile drawer layout, timeline alignment |
| **768px** | Tablet portrait (iPad Mini / Surface) | Navigation switch (drawer vs bar), 2-column bento grids, video container ratio |
| **1024px** | Tablet landscape / Small laptop | Desktop nav appearance, 3D sculpture scaling, side-by-side hero composition |
| **1440px** | Desktop standard / Large displays | Container max-width clamping (`--container-max`), ambient lighting orbs, cursor follower |

---

## 2. Theme Verification (Dark & Light)

Audit both states across the entire page:
1. **Dark Mode (`[data-theme="dark"]` — default)**:
   - Deep forest/near-black background (`#050807`).
   - High legibility of text (`#f5f9f6`, `#b8cfc1`).
   - ShinyButton illuminated perimeter and mint glow.
2. **Light Mode (`[data-theme="light"]`)**:
   - Pale sage / warm off-white background (`#f6f9f7`).
   - Deep forest green text (`#0a2318`) with high contrast (minimum WCAG AA 4.5:1 ratio).
   - Ensure buttons, badges, theme toggle, and icons do **not** appear washed out.
   - 3D sculpture lighting and material updates reflect light palette.
3. **Theme Transition**:
   - Verify smooth background-color and color transitions without jarring flicker.
   - Confirm `vk_theme` persistence in `localStorage`.

---

## 3. Navigation & Anchor Interactions

- **Desktop Navigation**:
  - Test clicks on each anchor link: `#about`, `#expertise`, `#journey`, `#training`, `#speaking`, `#research`, `#contact`.
  - Confirm Lenis smooth scroll lands at the target section with the appropriate header offset (`-70px`).
  - Active section highlight reflects scroll position via `IntersectionObserver`.
- **Mobile Navigation Drawer**:
  - Open drawer via `#mobile-menu-btn`. Confirm backdrop blur and `aria-hidden` updates.
  - Test link clicks inside drawer; drawer must close smoothly upon selection and scroll to the section.
  - Close drawer via `#mobile-drawer-close` and backdrop click.

---

## 4. Media & Asset Loading Verification

- **Images**:
  - Inspect `assets/images/hero/hero.png` cutout sharpness and transparency.
  - Verify all photography assets render without broken image icons (404s).
  - Verify aspect ratios: images must not be vertically or horizontally stretched (`object-fit: cover` intact).
- **Video Interaction**:
  - Training section classroom video (`#classroom-video`):
  - Test play/pause button (`#video-play-btn`) and mute/unmute button (`#video-mute-btn`).
  - Verify autoplay behavior (muted, playsinline) and poster frame loading.
- **3D Sculpture**:
  - WebGL canvas renders inside `#hero-3d-stage` without WebGL context loss or console errors.
  - Check interactive mouse tracking / rotation response.

---

## 5. Animation & Motion Behavior

- **Scroll Reveals**: Elements with `[data-reveal]` transition upward smoothly with opacity as they enter the viewport.
- **ShinyButton Micro-Animations**:
  - Continuous rotating border gradient (`shinyBorderRotate`).
  - Periodic light sweep reflection (`shinySweep`).
  - Hover translation (`translateY(-2px)`) and active depression state.
- **Timeline Rail Progress**: The vertical line in Experience (`.timeline-rail-progress`) fills proportionately as the user scrolls past each milestone.
- **Testimonials Carousel**:
  - Slide navigation (previous/next buttons, swipe, keyboard arrows).
  - Check counter indicator update (`01/08` through `08/08`).

---

## 6. Accessibility & Motion Preference Audit

1. **`prefers-reduced-motion` Compliance**:
   - Emulate `prefers-reduced-motion: reduce`.
   - Verify that:
     - 3D sculpture rotational animation stops and stays static.
     - Lenis smooth wheel scrolling is bypassed in favor of native instant scrolling.
     - Custom cursor follower is disabled.
     - Shimmer sweep and border rotate animations pause or reduce intensity.
2. **Keyboard Focus & Screen Readers**:
   - All interactive controls (`button`, `a`, `input`, `textarea`) show clear `:focus-visible` outlines.
   - Mobile menu and drawer possess appropriate `aria-label`, `aria-modal`, and `role="dialog"`.
3. **Contrast Compliance**:
   - Verify all text, badges, and secondary buttons against WCAG AA requirements in both dark and light modes.
