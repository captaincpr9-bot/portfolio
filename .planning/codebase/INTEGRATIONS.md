# External & Internal Integrations

**Analysis Date**: 2026-09-21  
**Project**: Mohid Shaikh — Creative Visual Designer Portfolio  

---

## 1. External Third-Party Services & CDNs

### CDN Resources
1. **Cloudflare CDN (GSAP Core)**
   - **URL**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js`
   - **Integrity**: `sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==`
   - **Referrer Policy**: `no-referrer`
   - **Usage**: Critical runtime dependency loaded in `<script>` tag before local vendor scripts.

2. **Google Fonts API**
   - **Preconnect**: `https://fonts.googleapis.com`, `https://fonts.gstatic.com` (crossorigin)
   - **Stylesheet**: `https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap`
   - **Usage**: Typography asset used for SVG path text rendering of the "visual" script badge.

---

## 2. Local Vendor Scripts

The project bundles minified third-party libraries locally in `overall/` to maintain offline reliability and prevent CDN downtime:

1. **`overall/ScrollTrigger.min.js`**
   - **Size**: ~44.1 KB
   - **Role**: Registers GSAP ScrollTrigger plugin for synchronized viewport pinning and scrubbing.
2. **`overall/lenis.min.js`**
   - **Size**: ~13.0 KB
   - **Role**: Lightweight smooth-scroller library initialized globally as `window.lenis`.

---

## 3. Media & Asset Integrations

### Project Showcase Images (`overall/images/`)
Used in `#about-work` pinned deck and horizontal scrub cards:
- **`project-ascnd.png`** (949.8 KB) — Ascnd Studio project hero mockup (Brand & Front-End).
- **`project-strix.png`** (344.5 KB) — Strix Security platform interface (Cybersecurity Platform).
- **`project-viralclips.png`** (157.6 KB) — ViralClips AI SaaS interface (AI Video SaaS).

### Miscellaneous Assets
- **`iron-man.webp`** (16.5 KB in root, copy in `overall/`) — Legacy or experimental asset; not currently rendered in active `overall/index2.html`.

---

## 4. External Outbound Links & Social Targets

Embedded in the left fixed social bar (`#social-bar`):
- **GitHub**: `https://github.com` (Target: `_blank`, `rel="noopener"`)
- **LinkedIn**: `https://linkedin.com` (Target: `_blank`, `rel="noopener"`)
- **Instagram**: `https://instagram.com` (Target: `_blank`, `rel="noopener"`)

*Note: URLs currently point to domain roots and require updating to Mohid's actual profile handles.*

---

## 5. Backend & Data Storage

- **API Integrations**: None. Fully self-contained client-side application.
- **Persistent Storage**: None (No `localStorage`, `sessionStorage`, or IndexedDB dependencies).
- **Configuration Engine**: Embedded directly in `overall/script.js` as `ABOUT_WORK_CONFIG` containing project descriptors, timings, rotational offsets, and responsive dimensions.
