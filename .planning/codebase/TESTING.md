# Testing & Verification Strategy

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. Current Testing Strategy

The project currently operates as a zero-dependency static web application without a headless automated test runner (such as Jest, Vitest, or Cypress). Quality assurance relies on **manual visual regression testing, cross-browser interactive validation, and device emulation**.

---

## 2. Interactive Verification Matrix

When verifying changes to `overall/index2.html`, `overall/style2.css`, or `overall/script.js`, test against the following behavioral checklist:

### A. Preloader & Lifecycle Transitions
- [ ] Preloader counter smoothly climbs from `0%` to `100%`.
- [ ] Words ("Mohid", "shaikh", "is") stagger into view with dynamic offsets.
- [ ] Progress bar width matches counter percentage.
- [ ] Black `#loader` slides up (`-100%`), followed by the `#green` accent curtain.
- [ ] Body and HTML scroll locks are removed (`overflow: auto`, `overflow-x: hidden`).
- [ ] Hero navigation and typography stagger downward cleanly into place.
- [ ] Social dock fades in on the lower left.

### B. Custom Cursor & Interactive Physics
- [ ] Default system cursor is hidden (`cursor: none` across `html`, `body`, and interactive links).
- [ ] `.cursor-dot` precisely follows mouse coordinates with zero latency.
- [ ] `.cursor-ring` smoothly glides behind with spring damping.
- [ ] Cursor scales and shifts state on hover:
  - Over Nav links (`#nav a`) -> `.hover-link` (60px ring)
  - Over Social links (`.social-link`) -> `.hover-social` (55px ring with accent border)
  - Over Arrow button (`.arrow-icon`) -> `.hover-button` (80px ring, dot collapses)
  - Over Project cards (`.project-card`) -> `.hover-project` (Expanded preview ring)
- [ ] Touch devices: Cursor elements are hidden via `(pointer: coarse)` media query.

### C. Canvas Particle System & Ambient Blobs
- [ ] Particle canvas dimensions dynamically track `window.innerWidth` and `window.innerHeight`.
- [ ] Particles bounce off boundary edges without escaping viewport.
- [ ] Constellation lines render between adjacent particles below distance threshold (`100px`).
- [ ] Canvas framerate holds steady at ~60fps without progressive memory growth.

### D. Pinned `#about-work` ScrollTrigger Scrub
- [ ] Lenis captures mouse wheel and provides smooth inertia scrolling.
- [ ] Section pins firmly to viewport upon arrival (`top top`).
- [ ] 6-Step scrub execution proceeds linearly with scroll distance:
  - **Step 1**: Card 1 straightens, about text fades, Title 1 appears.
  - **Step 2**: Card 1 expands to full viewport (100vw x 100svh).
  - **Step 3**: Card 1 slides out left (-8deg tilt), Card 2 enters medium center.
  - **Step 4**: Card 2 expands to full viewport; Title 2 transitions in.
  - **Step 5**: Card 2 slides out left, Card 3 enters medium center.
  - **Step 6**: Card 3 expands to full viewport; Title 3 transitions in.
- [ ] Section unpins cleanly after Card 3 hold duration, allowing further page scrolling.
- [ ] Window resize triggers `aboutWorkCtx.revert()` and recalculates pin parameters without layout breaking.

---

## 3. Viewport & Breakpoint Matrix

| Viewport Category | Width Range | Key Validation Focus |
|---|---|---|
| **Large Desktop / Ultrawide** | > 1440px | Large typography scaling, canvas particle density, margin balance. |
| **Standard Laptop** | 1024px – 1440px | Pinned card proportions (62vw / 70vh), social dock spacing. |
| **Tablet Portrait** | 768px – 1023px | Font size clamping, header wrapping, touch interaction compatibility. |
| **Mobile Screen** | < 768px | Fallback mobile card dimensions (88vw / 55vh), cursor suppression, preloader typography scaling. |

---

## 4. Recommended Automated Quality Gates

To formalize testing as the portfolio expands, the following tools are recommended for integration:
1. **Playwright E2E Tests**:
   - Verify zero console errors during preloader execution.
   - Assert `ScrollTrigger` pin triggers activate at expected scroll depths.
   - Capture visual diff screenshots of the hero and card stack across desktop and mobile viewports.
2. **Google Lighthouse CI**:
   - Audit Performance score (target >= 90).
   - Audit Accessibility score (target >= 95).
   - Audit Best Practices & SEO (target 100).
3. **HTML5 & CSS Linting**:
   - `html-validate` to check for missing semantic landmarks.
   - `stylelint` to maintain consistent CSS formatting and catch invalid properties.
