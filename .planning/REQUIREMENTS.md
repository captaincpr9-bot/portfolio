# Project Requirements: Mohid Shaikh Portfolio

## 1. Functional Requirements

### 1.1. Work Gallery Section
- **REQ-WG-1**: Implement an interactive, premium Work Showcase grid or horizontal scroll deck featuring 3–6 visual design projects.
- **REQ-WG-2**: Each project card must display project title, category/discipline (e.g. Visual Design, 3D, Web App, Branding), year, and a high-resolution preview image.
- **REQ-WG-3**: Project cards must integrate with the custom cursor system (e.g. triggering an expanded `hover-project` or `View Project` cursor state).
- **REQ-WG-4**: Include interactive project modal or expander to view project details, tools used, and live/demo links.

### 1.2. About Me Section Expansion
- **REQ-AB-1**: Refine the introductory copy (correct typos such as "Devlope" -> "Develop", standardize typography).
- **REQ-AB-2**: Add a concise skill/capabilities matrix (e.g. UI/UX Design, Visual Identity, Motion & Interaction, 3D Art Direction, Web Development).
- **REQ-AB-3**: Provide reliable, high-quality images for the 3 tilted cards (using curated high-resolution assets or generated visuals).

### 1.3. Contact Section & Footer
- **REQ-CT-1**: Add a dedicated `#contact` section linked from `#nav`.
- **REQ-CT-2**: Include a modern contact form or interactive contact card (Email, Direct Message, Availability status, Location / Timezone).
- **REQ-CT-3**: Include an interactive "Let's Talk" magnetic CTA button with micro-animations.
- **REQ-CT-4**: Include a sleek minimal footer with copyright, back-to-top smooth action, and localized time display.

### 1.4. Navigation & Page Flow
- **REQ-NV-1**: Ensure all navigation links (`About me`, `Work gallery`, `Contact`) correctly scroll to their respective section anchors with smooth easing.
- **REQ-NV-2**: Highlight active navigation item as the user scrolls through sections.

---

## 2. Non-Functional Requirements

### 2.1. Motion & Aesthetics
- **REQ-NF-1**: Maintain a 60 FPS animation budget across all GSAP timelines, canvas particles, and mousemove listeners.
- **REQ-NF-2**: Consistent dark/light contrast with neon emerald accents (`#04c514`, `#10b981`).
- **REQ-NF-3**: Zero layout shifts during loader transition and element reveals.

### 2.2. Responsiveness & Accessibility
- **REQ-NF-4**: Seamless responsive layout across Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (<768px).
- **REQ-NF-5**: Accessible fallbacks when custom cursor is hidden on touchscreen devices.
- **REQ-NF-6**: Semantic heading structure (`h1` -> `h2` -> `h3`) and descriptive ARIA labels for interactive controls.
