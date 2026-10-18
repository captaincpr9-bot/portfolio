# System Architecture

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. High-Level Architectural Overview

The application is structured as a client-side, event-driven interactive portfolio with layered rendering and physics-based motion systems. The architecture emphasizes zero-bundle overhead, frame-accurate animation synchronization, and multi-tier user feedback.

```
┌─────────────────────────────────────────────────────────────┐
│                 DOM Document (Viewport)                     │
├──────────────────────────────┬──────────────────────────────┤
│  Z-Index 1,000,000+          │ Custom Cursor Engine         │
│                              │ (Dual-tier Dot + Ring)       │
├──────────────────────────────┼──────────────────────────────┤
│  Z-Index 999 (Transition)    │ Preloader & Green Curtain    │
│                              │ (0-100% counter, wipes)      │
├──────────────────────────────┼──────────────────────────────┤
│  Z-Index 10,000              │ Fixed Social Bar (Left dock) │
├──────────────────────────────┼──────────────────────────────┤
│  Z-Index 1 - 100             │ Core Page Content            │
│                              │ ├── Sticky Navigation Bar    │
│                              │ ├── Hero Editorial Banner    │
│                              │ └── #about-work Pinned Deck  │
│                              │     (7x Scrub ScrollTrigger) │
├──────────────────────────────┼──────────────────────────────┤
│  Z-Index 0                   │ Ambient Visuals              │
│                              │ ├── 3 Floating Gradient Blobs│
│                              │ └── HTML5 Canvas Particles   │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 2. Execution & Lifecycle Flow

The application initializes via a self-invoking function (`init()`) in `overall/script.js` (lines 1136–1154):

```mermaid
sequenceDiagram
    autonumber
    participant DOM as Document DOM
    participant Pre as Preloader (#loader)
    participant Green as Green Curtain (#green)
    participant Home as Hero (#home)
    participant Lenis as Lenis Engine
    participant ST as ScrollTrigger

    DOM->>Pre: revealTospan() wraps text in span.parent > span.child
    DOM->>Lenis: initLenis() registered; lenis.stop() halts scrolling
    DOM->>Pre: loadingAnimation() starts 0-100% counter interval
    Pre->>Pre: Counter reaches 100%; word reveal complete
    Pre->>Green: Wipe #loader out (y: -100%), pull #green to height 100%
    Green->>Home: AnimateHome() reduces #green to 0%, unveils #home
    Home->>Lenis: lenis.start(); body scroll unlocked
    Home->>ST: ScrollTrigger.refresh(); animateSocialBar() fades in
    DOM->>ST: initAboutWorkScroll() compiles 7x Scrub timeline
```

---

## 3. Subsystem Breakdown

### 3.1. Motion & Scroll Engine
- **Lenis-GSAP Synchronization**:
  - `lenis.on("scroll", ScrollTrigger.update)` links smooth scroll events to GSAP's layout calculations.
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))` drives Lenis through GSAP's internal RAF ticker, avoiding multiple concurrent animation frames.
  - `gsap.ticker.lagSmoothing(0)` prevents animation stutter during heavy tab switches or GPU throttles.
- **Pinned Scroll Scrub (`#about-work`)**:
  - Configured with `scrollLengthMultiplier: 7.0` (700vh total scrub distance).
  - Uses `gsap.context()` for clean scoping and teardown on resize.
  - Resizes are debounced (`resizeTimeout`, 200ms) with a 10px width threshold check to prevent false re-triggers from mobile browser address bar toggling.

### 3.2. Custom Cursor Subsystem
- **Dual-Element Architecture**:
  - `.cursor-dot`: High-precision 8px point using direct coordinate snapping (`mix-blend-mode: difference`).
  - `.cursor-ring`: 36px outer ring with smooth cubic-bezier transitions (`cubic-bezier(0.215, 0.61, 0.355, 1)`).
- **Dynamic State System**:
  - `hover-link`: Expanding 60px ring for links and nav elements.
  - `hover-button`: 80px ring with dot collapse for primary actions.
  - `hover-social`: 55px accent-colored ring for social icons.
  - `hover-image` / `hover-project`: Expanded viewing state for cards.
- **Device Detection**:
  - Automatically suppresses itself if `(pointer: coarse)` or touch events are detected to prevent interference on mobile devices.

### 3.3. Ambient Particle Physics
- **Canvas Particle Network**:
  - Renders on `<canvas id="particle-canvas">`.
  - Maintains an array of particle nodes with randomized velocity vectors (`vx`, `vy`).
  - Draws dynamic connecting constellation lines based on Euclidean distance thresholds.
  - Implements mouse proximity repulsion with falloff radius.

### 3.4. Magnetic Attraction Engine
- Elements tagged with `data-magnetic` (social links, arrow icons, nav items) calculate cursor offset relative to their bounding box center (`getBoundingClientRect()`).
- GSAP smoothly interpolates element translation (`x`, `y`) toward cursor with magnetic strength factor (`0.3` to `0.5`).

---

## 4. State & Configuration Management

State is managed imperatively through DOM class bindings and a centralized configuration schema:

1. **`ABOUT_WORK_CONFIG`**:
   - Holds project metadata (titles, tags, image paths).
   - Card rotation stacks: initial `[-3, -10, -17]`, active `0`, exit `-8`, waiting `[5, 10]`.
   - Responsive geometry: Desktop (62vw width / 70vh height), Mobile (88vw width / 55vh height).
2. **Scroll Context Lifecycle**:
   - `aboutWorkCtx` tracks active GSAP timelines and ScrollTrigger instances.
   - Cleans up and recreates on window dimension changes via `.revert()`.
