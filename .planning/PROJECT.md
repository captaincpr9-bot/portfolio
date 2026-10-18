# Mohid Shaikh — Creative Visual Designer Portfolio

## 1. Executive Summary
This project is an award-worthy, interaction-heavy personal portfolio website for **Mohid Shaikh**, a Creative Visual Designer specializing in immersive digital experiences for mobile and desktop. 

The website showcases cutting-edge motion design, micro-interactions, magnetic physics, and custom visual storytelling.

---

## 2. Core Architecture & Tech Stack

### Technology Stack
- **Structure**: Vanilla Semantic HTML5 (`overall/index2.html`)
- **Styling**: Vanilla CSS3 (`overall/style2.css`) featuring custom CSS variables, CSS grid/flexbox, keyframe animations, and filter effects
- **Interaction & Motion Engine**: 
  - Vanilla JavaScript (`overall/script.js`)
  - **GSAP (GreenSock Animation Platform) 3.13.0** for timelines, quickSetters, and physics easings
  - HTML5 Canvas for real-time generative particle physics
- **Typography**:
  - Primary: Gilroy font family (Modern geometric sans-serif)
  - Accent / Handwritten: Google Fonts `Caveat` (used for SVG stroke morphing)

---

## 3. Existing Feature Analysis (in `overall/`)

### 3.1. Loading & Intro Experience
- **Full-Screen Minimal Loader (`#loader`)**:
  - Dark backdrop (`#000000`) with sleek uppercase metadata (`Design portfolio © 2026`).
  - Staggered word reveal with dynamic x-offsets ("Mohid", "shaikh", "is").
  - Precision counter (0% - 100%) and horizontal glowing progress bar.
  - Curtain wipe effect via `#green` overlay (`#035c0a`) rolling up to reveal the main home screen.

### 3.2. Ambient Environment & Cursor
- **Dual-Tier Custom Cursor (`#custom-cursor`)**:
  - Fast-tracking high-precision dot (`.cursor-dot`) with `mix-blend-mode: difference`.
  - Spring-inertia trailing ring (`.cursor-ring`) with dynamic state transforms (`hover-link`, `hover-button`, `hover-social`, `hover-image`).
  - Automatic suppression on touch/coarse pointer devices.
- **Ambient Visuals (`#bg-animation`)**:
  - 3 floating radial gradient blobs with slow organic translation loops.
  - Interactive canvas particle system with distance-based constellation lines and mouse parallax.

### 3.3. Navigation & Hero
- **Magnetic Nav Bar (`#nav`)**:
  - Links ("MOHID SHAIKH", "About me", "Work gallery", "Contact").
  - Dual line reveal animations (`.line1`, `.line2`) on hover.
  - Interactive letter-splitting stagger on mouseenter/mouseleave.
  - Magnetic cursor pull physics.
- **Hero Typography & SVG Accent**:
  - Massive editorial typography: "Creative Visual Designer".
  - SVG handwritten script ("visual") animated using stroke-dashoffset / stroke-dasharray drawing.
  - Circular magnetic arrow button.

### 3.4. About Me & Imagery Section
- **Watermark & Section Indicator**:
  - Huge outline watermark text (`ABOUT ME`).
  - Section indicator pill with pulsing accent green dot.
- **Tilted Card Deck (`#imgright`)**:
  - 3 overlapping rotated image cards with grayscale filters that smoothly colorize on hover.

### 3.5. Social Bar
- Left-docked vertical fixed social bar (GitHub, LinkedIn, Instagram) with magnetic attraction and connecting stem line.

---

## 4. Current Gaps & Incomplete Areas
1. **Work Gallery (`#work`)**: Currently an empty section container with only an `<h1>` heading. Needs a dynamic project showcase, interactive project cards, tags, case study previews, or modal detail views.
2. **Contact Section & Footer**: Navigation contains a "Contact" link, but there is no corresponding contact section, social contact cards, or inquiry form in the page.
3. **Copy & Text Refinements**: Minor typos (e.g. "Devlope" instead of "Develop", inconsistent casing in "shaikh").
4. **Asset Management**: Image cards currently use external third-party Unsplash / iStock URLs rather than curated or local high-res project artwork.
5. **Mobile / Viewport Optimization**: Fine-tuning layout and typography scaling for tablet and mobile screens.
