---
name: lenis-gsap-scroll
description: "Patterns and best practices for Lenis.js smooth scrolling and GSAP ScrollTrigger animations"
---

# Lenis.js & GSAP ScrollTrigger Skill

## 1. Overview
This skill provides guidelines, integration patterns, and code recipes for combining **Lenis.js** (buttery smooth kinetic scrolling) and **GSAP ScrollTrigger** (scroll-driven animations) in this creative visual designer portfolio.

---

## 2. Library Inclusion
The project includes local offline-ready scripts in `overall/`:
- `overall/lenis.min.js` (Lenis v1.1.18)
- `overall/ScrollTrigger.min.js` (GSAP ScrollTrigger v3.13.0)

In `index2.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="ScrollTrigger.min.js"></script>
<script src="lenis.min.js"></script>
<script src="script.js"></script>
```

---

## 3. Recommended CSS Setup
```css
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
```

---

## 4. Integration Pattern (Lenis + GSAP Ticker)
Always synchronize Lenis with the GSAP ticker to avoid frame stuttering:

```javascript
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
});

// Update ScrollTrigger on every scroll event
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis via GSAP ticker
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Turn off GSAP's lag smoothing to keep scroll animations in lockstep
gsap.ticker.lagSmoothing(0);

// Anchor link smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        }
    });
});
```

---

## 5. Loader Handling
While the loading screen (`#loader`) is active:
```javascript
lenis.stop(); // Prevent scrolling during intro
```
Once the green curtain completes and home is revealed:
```javascript
lenis.start(); // Enable smooth scrolling
ScrollTrigger.refresh();
```

---

## 6. Common ScrollTrigger Recipes

### 6.1. Staggered Card Entrance
```javascript
gsap.from(".work-card", {
    scrollTrigger: {
        trigger: "#work",
        start: "top 75%",
        toggleActions: "play none none reverse"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});
```

### 6.2. Horizontal Parallax / Pinned Showcase
```javascript
gsap.to(".work-slider", {
    scrollTrigger: {
        trigger: "#work",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=2000"
    },
    xPercent: -100 * (cards.length - 1) / cards.length,
    ease: "none"
});
```
