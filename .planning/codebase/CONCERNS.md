# Technical Concerns, Debt & Roadmap Gaps

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. Technical Debt & Code Organization

### Monolithic File Structures
- **`overall/script.js` (1,155 lines)**:
  - Houses the preloader, custom cursor, magnetics, canvas particles, blob parallax, Lenis setup, and the complete 7x pinned scrub timeline in a single file.
  - **Risk**: Harder to isolate bugs or refactor individual subsystems without inadvertently affecting another lifecycle hook.
  - **Recommendation**: As the project evolves, separate concerns into modular files (e.g. `cursor.js`, `particles.js`, `scroll-timeline.js`) or introduce a lightweight Vite build setup.
- **`overall/style2.css` (1,000 lines)**:
  - Contains all styles in one continuous file without CSS modularization or preprocessor splitting.

### Legacy Prototypes & Orphan Files
- **Prototype Folders**: `loading animation/` and `text animation/` are experimental remnants from early iterations. They are not referenced by `overall/` and can cause confusion for developers exploring the repo.
- **Unused Image Assets**: `iron-man.webp` (16.5 KB) exists both in the root workspace and in `overall/`, but is never referenced or rendered in the DOM.

---

## 2. Incomplete Features & Roadmap Gaps

1. **Missing Contact Section & Footer**:
   - The navigation bar includes a "Contact" anchor, but it currently links to `#` with no destination on the page.
   - There is no contact section, contact form, inquiry drawer, or formal site footer (social copyright, back-to-top button, time zone indicator).
2. **Project Detail Views**:
   - The pinned cards in `#about-work` expand to full screen during scroll, but clicking a card does not open a detailed case study, external live demo, or tech stack overview.
3. **External Profile Link Placeholders**:
   - The fixed social bar links point to root domain URLs (`https://github.com`, `https://linkedin.com`, `https://instagram.com`) instead of Mohid's actual handles.
4. **Copy & Typographic Nuances**:
   - Preloader header uses lowercase "shaikh" ("Mohid shaikh is") while the navigation uses uppercase "MOHID SHAIKH".

---

## 3. Performance & Resource Bottlenecks

1. **Heavy Simultaneous Visual Layers**:
   - The page runs a continuous 60fps HTML5 Canvas particle loop (`requestAnimationFrame`) alongside three large overlapping CSS blurred radial gradient blobs (`filter: blur(80px)` to `blur(100px)`).
   - High-radius CSS blurs on full-screen fixed containers can cause heavy GPU fill-rate consumption, especially on integrated GPUs and mobile hardware.
2. **Image Optimization**:
   - `overall/images/project-ascnd.png` is ~950 KB in raw PNG format.
   - Converting portfolio hero mockups to modern `.webp` or `.avif` formats could yield a 60–80% reduction in asset weight with zero visual quality loss.
3. **CDN Dependency & Offline Fallback**:
   - GSAP core is loaded via an external CDN (`cdnjs.cloudflare.com`). If the user develops or tests offline, the preloader and timeline will throw an unhandled `ReferenceError: gsap is not defined`, preventing the page from unveiling.

---

## 4. Accessibility (a11y) & SEO Considerations

1. **Global Cursor Suppression (`cursor: none`)**:
   - `cursor: none` is forced globally on `html` and `body`. If the custom cursor script fails to load or encounters a runtime error, the user is left with an invisible mouse pointer.
2. **Semantic Landmark Elements**:
   - `#nav` is defined as a `<div>` instead of a semantic `<nav>` element.
   - `#main` is a `<div>` instead of a `<main>` landmark.
   - The document lacks a semantic `<footer>` element.
3. **Contrast with `mix-blend-mode: difference`**:
   - While `mix-blend-mode: difference` creates stunning aesthetic effects over high-contrast black/white backgrounds, it can produce low-contrast muddy colors when hovering over mid-tone grays (`#777` or muted card backgrounds).
