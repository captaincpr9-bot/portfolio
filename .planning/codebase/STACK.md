# Technology Stack

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  
**Target Codebase Directory**: `overall/`

---

## 1. Core Runtime & Architecture

| Layer | Technology | Description |
|---|---|---|
| **Markup** | HTML5 | Semantic markup (`overall/index2.html`) structured with custom canvas, SVG text rendering, and pinned scroll sections. |
| **Styling** | Vanilla CSS3 | Custom stylesheets (`overall/style2.css`) using CSS custom properties, 3D CSS transforms, multi-layer blur filters, and CSS keyframe animations. |
| **Logic & Engine** | Vanilla JavaScript (ES6+) | Direct DOM manipulation, custom physics calculations, canvas rendering loop, and lifecycle hooks (`overall/script.js`). |
| **Build Tooling** | None (Static Asset Delivery) | Directly served via HTTP / browser file preview; no Node.js bundler (Webpack/Vite/Rollup) or transpilation pipeline currently required. |

---

## 2. Animation & Motion Libraries

### GSAP (GreenSock Animation Platform)
- **Version**: `3.13.0`
- **Delivery**: CDN (`cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js`) with Subresource Integrity (SRI) validation.
- **Responsibilities**:
  - Orchestration of the loading sequence (`loadingAnimation`) and curtain reveal (`AnimateHome`).
  - Staggered typography entrance animations with `Expo.easeInOut` and `Circ.easeInOut`.
  - Continuous ticker integration for physics, particle loops, and scroll synchronization.

### GSAP ScrollTrigger
- **Version**: `3.13.0`
- **Delivery**: Local vendor script (`overall/ScrollTrigger.min.js`).
- **Responsibilities**:
  - Drives the 7x viewport scrub animation in the `#about-work` section.
  - Controls card unstacking, card expansion from medium pill to full-screen viewport, and title parallax.

### Lenis Smooth Scroll
- **Version**: `1.1.18`
- **Delivery**: Local vendor script (`overall/lenis.min.js`).
- **Responsibilities**:
  - Provides momentum-based smooth scrolling with configurable lerp (`0.09` standard, `1.0` when `prefers-reduced-motion` is detected).
  - Ticker-synchronized with `gsap.ticker` to eliminate scroll-jitter and frame collisions.
  - Handles anchor navigation intercepts for `#about-work` and hash targets.

---

## 3. Typography & Graphics

### Fonts
- **Primary Typography**: `Gilroy` (Loaded locally / system font stack; geometric sans-serif for headers and body).
- **Handwritten / Script Accent**: `Caveat` (Weight: 700) via Google Fonts (`fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap`).
  - Used specifically for SVG path stroke rendering and vector morphing in the Hero section ("visual" accent).

### Graphics & Visual Processing
- **Vector Graphics (SVG)**: Custom SVG inline definitions for social icons, arrows, and animated script text.
- **HTML5 Canvas 2D Context**: High-performance interactive particle network with distance-based constellation links and dynamic mouse repulsion.
- **CSS Blend Modes**: Extensive use of `mix-blend-mode: difference` for the dual custom cursor, work indicator, and navigation contrast.

---

## 4. Dependencies & Version Manifest

| Package / Library | Source | Version | Purpose |
|---|---|---|---|
| `gsap` | CDN (Cloudflare) | `3.13.0` | Motion timelines & tweens |
| `ScrollTrigger` | Local (`overall/ScrollTrigger.min.js`) | `3.13.0` | Scroll-driven timeline scrubbing |
| `lenis` | Local (`overall/lenis.min.js`) | `1.1.18` | Inertia smooth scrolling |
| `Caveat` | Google Fonts | `wght@700` | Handwritten SVG accent lettering |
