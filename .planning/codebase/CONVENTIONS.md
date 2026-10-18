# Coding Conventions & Development Patterns

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. Naming & Code Style Conventions

### JavaScript (`overall/script.js`)
- **Functions**: `camelCase` for utilities and lifecycle initializers (`revealTospan`, `loadingAnimation`, `initLenis`, `initMagnetics`). Occasional PascalCase for major transition functions (`AnimateHome`).
- **Constants & Configuration**: UPPER_SNAKE_CASE for global configuration dictionaries (e.g. `ABOUT_WORK_CONFIG`).
- **Variables**: `camelCase` for DOM elements, timelines, and animation references (`progressBar`, `counterInterval`, `aboutWorkCtx`, `cur`).
- **Data Attributes**: `data-magnetic` for elements participating in magnetic attraction physics; `data-index` for indexed card elements in the `#about-work` showcase.

### CSS (`overall/style2.css`)
- **Classes**: `kebab-case` for component elements and state modifiers:
  - Components: `.cursor-dot`, `.cursor-ring`, `.gradient-blob`, `.project-card`, `.work-indicator`
  - Cursor States: `.hover-link`, `.hover-button`, `.hover-social`, `.hover-project`
- **IDs**: `#kebab-case` or lowercase strings for unique structural sections:
  - Sections: `#loader`, `#green`, `#home`, `#about-work`, `#social-bar`, `#nav`
- **Z-Index Layering**: Explicit numeric bands assigned by architectural layer:
  - `0`: Background blobs & canvas
  - `1 - 10`: Main content container, cards, and titles
  - `100`: Navigation and work indicator
  - `999`: Loader and transition curtains
  - `10,000`: Social bar fixed dock
  - `999,999+`: Custom cursor components

---

## 2. Animation & Motion Design Standards

### GSAP Easing Hierarchy
- **Entrance & Curtain Reveals**: `Circ.easeInOut` and `Expo.easeInOut` for bold, editorial momentum.
- **Scroll Scrub Transitions**: `power2.inOut` and `power2.out` for predictable 1:1 mouse-wheel scrubbing.
- **Magnetic Pull & Returns**: `power3.out` for snappy cursor attraction with zero bounce.

### Smooth Scroll & Ticker Harmony
- Always drive Lenis via GSAP's central ticker:
  ```javascript
  gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  ```
- Always pause Lenis during the preloader (`lenis.stop()`) and resume only after curtain completion (`lenis.start()`).

### Context Scoping & Resize Hygiene
- All ScrollTrigger timelines must be instantiated within a `gsap.context()` wrapper:
  ```javascript
  aboutWorkCtx = gsap.context(() => {
      buildAboutWorkTimeline();
  });
  ```
- On resize, call `aboutWorkCtx.revert()` before rebuilding timelines to prevent memory leaks and duplicate triggers.
- Debounce window resize events (200ms) and ignore height-only jitter (e.g. mobile URL bar expanding/collapsing).

---

## 3. DOM & Performance Guidelines

1. **Hardware Acceleration**: Use `transform` (`x`, `y`, `scale`, `rotation`) and `opacity` exclusively for animated properties. Never animate `top`, `left`, `margin`, or `padding` during scroll scrubs.
2. **Pointer Events**: Set `pointer-events: none` on ambient overlays (`#bg-animation`, `#custom-cursor`, `#particle-canvas`) so clicks pass seamlessly to underlying links and interactive controls.
3. **Accessibility & Reduced Motion**:
   - Query `window.matchMedia("(prefers-reduced-motion: reduce)")`.
   - When active, set Lenis `lerp: 1`, disable `smoothWheel`, and reduce complex transform durations.
4. **Existence Guards**: Guard all element selections before attaching listeners (`if (!elem) return;`).
