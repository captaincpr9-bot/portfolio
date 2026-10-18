# Codebase Structure

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. Directory Tree

```
c:/Users/lenovo/Desktop/portfolio/
├── .agents/                                # Agent capabilities & custom skills
│   └── skills/
│       └── lenis-gsap-scroll/              # Lenis + GSAP integration guide & best practices
│           └── SKILL.md
├── .planning/                              # GSD framework project management directory
│   ├── codebase/                           # Codebase intelligence & architectural docs
│   │   ├── ARCHITECTURE.md
│   │   ├── CONCERNS.md
│   │   ├── CONVENTIONS.md
│   │   ├── INTEGRATIONS.md
│   │   ├── STACK.md
│   │   ├── STRUCTURE.md
│   │   └── TESTING.md
│   ├── config.json                         # Project metadata & declared dependencies
│   ├── PROJECT.md                          # Project charter & executive summary
│   ├── REQUIREMENTS.md                     # Feature requirements & acceptance criteria
│   ├── ROADMAP.md                          # Phase-by-phase delivery roadmap
│   └── STATE.md                            # Current milestone status & active decisions
├── .vscode/                                # IDE workspace configurations
├── loading animation/                      # Legacy standalone loading prototype
│   ├── index.html
│   ├── script.js
│   └── style.css
├── overall/                                # MAIN ACTIVE SOURCE DIRECTORY
│   ├── images/                             # Showcase screenshots & visual media
│   │   ├── project-ascnd.png               # Project 1: Ascnd Studio hero visual
│   │   ├── project-strix.png               # Project 2: Strix Security interface
│   │   └── project-viralclips.png          # Project 3: ViralClips AI SaaS interface
│   ├── scratch/                            # Development helper scripts
│   │   └── get-paths.html                  # SVG path extraction tool for font glyphs
│   ├── index2.html                         # Primary production HTML entry point
│   ├── iron-man.webp                       # Unused test asset
│   ├── lenis.min.js                        # Vendor: Lenis smooth scroll engine (v1.1.18)
│   ├── ScrollTrigger.min.js                # Vendor: GSAP ScrollTrigger plugin (v3.13.0)
│   ├── script.js                           # Core interaction & motion orchestration script
│   └── style2.css                          # Primary stylesheet with design system & keyframes
├── text animation/                         # Legacy standalone text reveal prototype
│   ├── index.html
│   ├── script2.js
│   └── style.css
└── iron-man.webp                           # Root duplicate test asset
```

---

## 2. Directory Roles & Responsibilities

### `overall/` (Active Production)
The core application lives entirely within `overall/`. All modern enhancements, animations, scroll engines, and styles reside here:
- **`index2.html`**: Defines semantic page markup, SVG assets, canvas layer, navigation, pinned project container, and script imports.
- **`style2.css`**: Contains CSS variables, reset, cursor styles, ambient blob animations, loader curtain styles, grid layouts, and media queries.
- **`script.js`**: Monolithic orchestration script managing preloader sequence, custom cursor coordinates, particle physics, magnetic calculations, Lenis smooth scrolling, and GSAP timeline scrubbing.
- **`images/`**: Stores high-resolution project presentation assets (`project-ascnd.png`, `project-strix.png`, `project-viralclips.png`).
- **`scratch/`**: Holds scratchpad utilities used during development (e.g. `get-paths.html` for SVG glyph path tracing).

### Legacy & Prototype Folders
- **`loading animation/`**: Early testbed for testing 3-stage full-screen color curtain transitions. Retained for historical reference.
- **`text animation/`**: Early testbed for testing word-splitting and reveal spans.

### `.planning/` (Project Governance)
Contains GSD (Get Stuff Done) documentation guiding phase development, architectural knowledge, roadmaps, and requirements tracking.

### `.agents/` (Custom Skills)
Local configuration storing reusable agent intelligence (such as `lenis-gsap-scroll/SKILL.md`).

---

## 3. Key Entry Points & Execution Paths

| Entry Point | Context | Primary Function |
|---|---|---|
| `overall/index2.html` | Browser DOM | Root document loaded by browser; boots CSS, DOM nodes, and triggers script loads in order. |
| `overall/script.js` -> `init()` | JavaScript Runtime | Self-invoking function executed upon DOM load. Bootstraps loader, cursor, canvas, and scroll observers. |
| `overall/style2.css` | Rendering Engine | Establishes CSS custom properties, global resets (`cursor: none`), z-index tiers, and responsive breakpoints. |
