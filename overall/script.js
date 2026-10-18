// ═══════════════════════════════════════════
// MOHID SHAIKH — PREMIUM PORTFOLIO ENGINE
// ═══════════════════════════════════════════

// ── UTILITIES ──────────────────────────────

function revealTospan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var spanParent = document.createElement("span");
            var spanChild = document.createElement("span");

            spanParent.classList.add("parent");
            spanChild.classList.add("child");

            spanChild.innerHTML = elem.innerHTML;
            spanParent.appendChild(spanChild);

            elem.innerHTML = "";
            elem.appendChild(spanParent);
        })
}

// ── LOADING ANIMATION ─────────────────────

function loadingAnimation() {
    gsap.set("#home", { autoAlpha: 0 });

    let progressBar = document.querySelector(".progress-bar");
    let counter = document.querySelector("#counter h2");
    let count = 0;

    let counterInterval = setInterval(function () {
        count++;
        counter.textContent = count + "%";
        progressBar.style.width = count + "%";

        if (count === 80) {
            gsap.to("#home", {
                autoAlpha: 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        }

        if (count === 100) {
            clearInterval(counterInterval);
        }
    }, 15);

    var tl = gsap.timeline({
        onComplete: function () {
            document.documentElement.style.overflow = "auto";
            document.documentElement.style.overflowX = "hidden";
            document.body.style.overflow = "auto";
            document.body.style.overflowX = "hidden";
            document.querySelector("#home").style.position = "relative";
            gsap.set("#home", { autoAlpha: 1 });

            if (lenis) {
                lenis.start();
                lenis.resize();
                if (typeof ScrollTrigger !== "undefined") {
                    ScrollTrigger.refresh();
                }
            }

            // Trigger social bar entrance after loading completes
            animateSocialBar();
        }
    });

    tl.from(".child", {
        x: function (index, target) {
            let text = target.textContent || target.innerText;
            if (text.includes("Mohid")) return 100;
            if (text.includes("shaikh")) return 300;
            if (text.includes("is")) return 500;
            return 100;
        },
        delay: 0,
        stagger: .15,
        duration: 1.2,
        ease: Expo.easeInOut
    })

    tl.to(".parent .child", {
        y: "-100%",
        duration: 0.8,
        delay: 0,
        ease: Circ.easeInOut
    })
    tl.to("#loader", {
        y: "-100%",
        duration: 0.8,
        delay: 0,
        ease: Circ.easeInOut
    })
    tl.to("#green", {
        height: "100%",
        top: 0,
        duration: 0.8,
        delay: -.7,
        ease: Circ.easeInOut,
        onComplete: AnimateHome
    })
}

function AnimateHome() {
    let timeline = gsap.timeline();

    timeline.to("#green", {
        height: "0%",
        duration: 0.8,
        ease: Circ.easeInOut,
    })
    timeline.to("#home", {
        top: 0,
        duration: 1.2,
        delay: -.3,
        ease: Circ.easeInOut,
    });

    timeline.from("#nav a", {
        y: -50,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        delay: -0.2,
        ease: Expo.easeInOut
    })

    timeline.from(".raw h1, .row h1, .text h5", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        delay: -0.3,
        ease: Expo.easeInOut
    });
}

// ── SOCIAL BAR ENTRANCE ANIMATION ─────────

function animateSocialBar() {
    var socialBar = document.querySelector("#social-bar");
    if (!socialBar) return;

    gsap.to(socialBar, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(".social-link", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".social-line", {
        scaleY: 0,
        opacity: 0,
        transformOrigin: "top center",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.7
    });
}

// ── PREMIUM CUSTOM CURSOR ─────────────────

function initCustomCursor() {
    var cursorContainer = document.querySelector("#custom-cursor");
    var cursorDot = document.querySelector(".cursor-dot");
    var cursorRing = document.querySelector(".cursor-ring");

    if (!cursorContainer || !cursorDot || !cursorRing) return;

    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var cursorVisible = false;

    var dotXSet = gsap.quickSetter(cursorDot, "x", "px");
    var dotYSet = gsap.quickSetter(cursorDot, "y", "px");
    var ringXSet = gsap.quickSetter(cursorRing, "x", "px");
    var ringYSet = gsap.quickSetter(cursorRing, "y", "px");

    window.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        if (!cursorVisible) {
            cursorVisible = true;
            gsap.to([cursorDot, cursorRing], {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    });

    window.addEventListener("mouseleave", function () {
        cursorVisible = false;
        gsap.to([cursorDot, cursorRing], {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // High-performance RAF loop — dot tracks fast, ring creates motion trail
    function tick() {
        dotPos.x += (mouse.x - dotPos.x) * 0.22;
        dotPos.y += (mouse.y - dotPos.y) * 0.22;

        ringPos.x += (mouse.x - ringPos.x) * 0.09;
        ringPos.y += (mouse.y - ringPos.y) * 0.09;

        dotXSet(dotPos.x);
        dotYSet(dotPos.y);
        ringXSet(ringPos.x);
        ringYSet(ringPos.y);

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Return references for other modules
    return { cursorContainer: cursorContainer, mouse: mouse };
}

// ── CURSOR STATE MANAGEMENT ───────────────

function initCursorStates(cursorContainer) {
    if (!cursorContainer) return;

    // Nav links
    document.querySelectorAll("#nav a").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            cursorContainer.classList.add("hover-link");
        });
        el.addEventListener("mouseleave", function () {
            cursorContainer.classList.remove("hover-link");
        });
    });

    // Arrow button
    var arrowBtn = document.querySelector(".arrow-icon");
    if (arrowBtn) {
        arrowBtn.addEventListener("mouseenter", function () {
            cursorContainer.classList.add("hover-button");
        });
        arrowBtn.addEventListener("mouseleave", function () {
            cursorContainer.classList.remove("hover-button");
        });
    }

    // Social links
    document.querySelectorAll(".social-link").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            cursorContainer.classList.add("hover-social");
        });
        el.addEventListener("mouseleave", function () {
            cursorContainer.classList.remove("hover-social");
        });
    });

    // Images & Project Cards
    document.querySelectorAll(".imgcontnr, .project-card").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            cursorContainer.classList.add("hover-image");
        });
        el.addEventListener("mouseleave", function () {
            cursorContainer.classList.remove("hover-image");
        });
    });

    // Contact interactive elements
    document.querySelectorAll(".contact-submit-button, .social-row, .reset-contact-btn, .footer-btt-link, .floating-field input, .floating-field textarea").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            cursorContainer.classList.add("hover-button");
        });
        el.addEventListener("mouseleave", function () {
            cursorContainer.classList.remove("hover-button");
        });
    });
}

// ── TEXT SPLITTING & LETTER ANIMATIONS ────

function initTextSplitting() {
    var navLinks = document.querySelectorAll("#nav a");

    navLinks.forEach(function (link) {
        var textNode = Array.from(link.childNodes).find(function (node) {
            return node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0;
        });

        if (textNode) {
            var rawText = textNode.textContent.trim();
            textNode.textContent = "";

            var charContainer = document.createElement("span");
            charContainer.classList.add("char-container");
            charContainer.style.display = "inline-block";

            rawText.split("").forEach(function (letter) {
                var charSpan = document.createElement("span");
                charSpan.classList.add("char");
                charSpan.textContent = letter === " " ? "\u00A0" : letter;
                charContainer.appendChild(charSpan);
            });

            link.insertBefore(charContainer, link.firstChild);
        }
    });

    // Hover stagger effects
    navLinks.forEach(function (link) {
        var chars = link.querySelectorAll(".char");

        link.addEventListener("mouseenter", function () {
            gsap.killTweensOf(chars);
            gsap.to(chars, {
                y: -2,
                letterSpacing: "2px",
                color: "#04c514",
                duration: 0.5,
                stagger: {
                    each: 0.025,
                    from: "start"
                },
                ease: "power2.out"
            });
        });

        link.addEventListener("mouseleave", function () {
            gsap.killTweensOf(chars);
            gsap.to(chars, {
                y: 0,
                letterSpacing: "0px",
                color: "#111",
                duration: 0.4,
                stagger: {
                    each: 0.015,
                    from: "end"
                },
                ease: "power2.out"
            });
        });
    });
}

// ── MAGNETIC INTERACTION SYSTEM ───────────

function initMagnetics() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    var magneticEls = document.querySelectorAll("#nav a, .arrow-icon, .social-link, #contact-submit-btn, .social-row, .reset-contact-btn, #contact-btt-link");
    var radius = 100;

    window.addEventListener("mousemove", function (e) {
        var mx = e.clientX;
        var my = e.clientY;

        magneticEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var dx = mx - cx;
            var dy = my - cy;
            var dist = Math.sqrt(dx * dx + dy * dy);

            var isBtn = el.classList.contains("arrow-icon");
            var isSocial = el.classList.contains("social-link");

            if (dist < radius) {
                el._pulled = true;
                var ratio = 1 - (dist / radius);

                var pull = isBtn ? 0.3 : isSocial ? 0.4 : 0.45;

                gsap.to(el, {
                    x: dx * ratio * pull,
                    y: dy * ratio * pull,
                    scale: 1 + (0.08 * ratio),
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Inner parallax for button SVG
                if (isBtn) {
                    var svg = el.querySelector("svg");
                    if (svg) {
                        gsap.to(svg, {
                            x: dx * ratio * 0.15,
                            y: dy * ratio * 0.15,
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                    }
                }

                // Social icon glow
                if (isSocial) {
                    gsap.to(el, {
                        boxShadow: "0 0 " + (20 + 15 * ratio) + "px rgba(4, 197, 20, " + (0.2 + 0.2 * ratio) + ")",
                        duration: 0.3,
                        overwrite: "auto"
                    });
                }

            } else if (el._pulled) {
                el._pulled = false;

                gsap.to(el, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    boxShadow: "0 0 0px rgba(4, 197, 20, 0)",
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: "auto"
                });

                if (isBtn) {
                    var svg = el.querySelector("svg");
                    if (svg) {
                        gsap.to(svg, {
                            x: 0,
                            y: 0,
                            duration: 0.8,
                            ease: "elastic.out(1, 0.3)",
                            overwrite: "auto"
                        });
                    }
                }
            }
        });
    });
}

// ── PARTICLE SYSTEM ───────────────────────

function initParticles() {
    var canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = 50;
    var mouseRef = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", function (e) {
        mouseRef.x = e.clientX;
        mouseRef.y = e.clientY;
    });

    // Create particles
    for (var i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: Math.random() * canvas.width,
            baseY: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.15 + 0.03,
            hue: Math.random() > 0.5 ? 140 : 150  // Green-ish hues
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
            // Gentle floating movement
            p.baseX += p.speedX;
            p.baseY += p.speedY;

            // Wrap around screen
            if (p.baseX > canvas.width + 20) p.baseX = -20;
            if (p.baseX < -20) p.baseX = canvas.width + 20;
            if (p.baseY > canvas.height + 20) p.baseY = -20;
            if (p.baseY < -20) p.baseY = canvas.height + 20;

            // Subtle parallax response to cursor
            var parallaxX = (mouseRef.x - canvas.width / 2) * 0.01 * p.size;
            var parallaxY = (mouseRef.y - canvas.height / 2) * 0.01 * p.size;

            p.x = p.baseX + parallaxX;
            p.y = p.baseY + parallaxY;

            // Draw circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "hsla(" + p.hue + ", 70%, 55%, " + p.opacity + ")";
            ctx.fill();
        });

        // Draw subtle connections between close particles
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "hsla(145, 60%, 50%, " + (0.03 * (1 - dist / 120)) + ")";
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }
    requestAnimationFrame(drawParticles);
}

// ── PARALLAX BLOBS ────────────────────────

function initParallaxBlobs() {
    var blobs = document.querySelectorAll(".gradient-blob");
    if (!blobs.length) return;

    window.addEventListener("mousemove", function (e) {
        var mx = (e.clientX / window.innerWidth - 0.5) * 2;
        var my = (e.clientY / window.innerHeight - 0.5) * 2;

        blobs.forEach(function (blob, i) {
            var depth = (i + 1) * 12;
            gsap.to(blob, {
                x: mx * depth,
                y: my * depth,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto"
            });
        });
    });
}

// ── SMOOTH SCROLL ENGINE (LENIS + GSAP SCROLLTRIGGER SYNC) ──

var lenis;

function initLenis() {
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (typeof Lenis === "undefined") return;

    // Respect prefers-reduced-motion: disable smoothing if preferred
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    lenis = new Lenis({
        lerp: prefersReducedMotion ? 1 : 0.09,
        smoothWheel: !prefersReducedMotion,
        smoothTouch: false
    });

    // Pause scroll while loader is running
    lenis.stop();

    // Synchronize Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis through GSAP ticker for 60fps frame-perfect animation
    gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

function initSmoothScroll() {
    // Provide smooth scroll behavior for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    if (lenis) {
                        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
                    } else {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════
// ABOUT / WORK PINNED SCROLL ANIMATION (7X VIEWPORT SCRUB)
// ═══════════════════════════════════════════════════════════

// Centralized configuration object for tweaking animation values
const ABOUT_WORK_CONFIG = {
    // ── Placeholder Project Data (Drop your real screenshots here) ──
    projects: [
        {
            title: "ASCND STUDIO",
            tag: "Brand & Front-End",
            image: "images/project-ascnd.png"
        },
        {
            title: "STRIX SECURITY",
            tag: "Cybersecurity Platform",
            image: "images/project-strix.png"
        },
        {
            title: "VIRALCLIPS AI",
            tag: "AI Video SaaS",
            image: "images/project-viralclips.png"
        }
    ],

    // Total scrub scroll distance (7x viewport height)
    scrollLengthMultiplier: 7.0,

    // Border radius values
    radius: {
        medium: 24, // px
        full: 0     // px
    },

    // Rotation values in degrees
    rotations: {
        initial: [-3, -10, -17], // Card 1, Card 2, Card 3 in initial fanned stack
        straight: 0,             // Straightened active card
        exit: -8,                // Tilted when sliding out to the left
        waiting: [5, 10]         // Waiting tilted cards parked on the right edge
    },

    // Desktop layout tuning
    desktop: {
        mediumWidthFraction: 0.62, // 62vw wide
        aspectRatio: 16 / 10,      // Landscape website screenshot
        initialWidthFraction: 0.30,// Initial stack card width (~30vw)
        initialXRatio: 0.24,       // Offset to the right for initial fanned deck
        exitXRatio: -0.95,         // Offset to the left for exiting card
        waitingXRatio: 0.44        // Offset to the right for waiting parked cards
    },

    // Mobile layout tuning (<768px)
    mobile: {
        mediumWidthFraction: 0.88, // 88vw wide
        aspectRatio: 16 / 10,
        initialWidthFraction: 0.56,
        initialXRatio: 0,
        exitXRatio: -1.15,
        waitingXRatio: 0.70
    },

    // Scrub timing segments
    timing: {
        c1Medium: 1.0,     // Card 1 enters center & sizes to medium, text fades, giant title 1 in
        c1Full: 0.9,       // Card 1 expands to 100vw x 100svh, pill fades in
        c1Hold: 0.35,      // Hold full-screen
        c1ExitC2Med: 1.1,  // Card 1 shrinks & exits left, Card 2 enters & sizes to medium, title 2 in
        c2Full: 0.9,       // Card 2 expands to 100vw x 100svh, pill fades in
        c2Hold: 0.35,      // Hold full-screen
        c2ExitC3Med: 1.1,  // Card 2 shrinks & exits left, Card 3 enters & sizes to medium, title 3 in
        c3Full: 0.9,       // Card 3 expands to 100vw x 100svh, pill fades in
        c3Hold: 0.6        // Card 3 stays full-screen until section unpins
    }
};

function buildAboutWorkTimeline() {
    var section = document.querySelector("#about-work");
    if (!section) return;

    var c1 = section.querySelector(".project-card.card-1");
    var c2 = section.querySelector(".project-card.card-2");
    var c3 = section.querySelector(".project-card.card-3");
    var pill1 = c1 ? c1.querySelector(".card-pill") : null;
    var pill2 = c2 ? c2.querySelector(".card-pill") : null;
    var pill3 = c3 ? c3.querySelector(".card-pill") : null;

    var giantItem1 = section.querySelector(".giant-item-1");
    var giantItem2 = section.querySelector(".giant-item-2");
    var giantItem3 = section.querySelector(".giant-item-3");

    var aboutText = section.querySelector(".about-text-wrap");
    var workIndicator = section.querySelector(".work-indicator");
    var counterCurrent = section.querySelector(".work-counter .counter-current");

    if (!c1 || !c2 || !c3 || !aboutText || !workIndicator) return;

    // Sync project array metadata to DOM if present
    if (ABOUT_WORK_CONFIG.projects && ABOUT_WORK_CONFIG.projects.length >= 3) {
        var cards = [c1, c2, c3];
        var giantItems = [giantItem1, giantItem2, giantItem3];
        ABOUT_WORK_CONFIG.projects.forEach(function (proj, idx) {
            var card = cards[idx];
            if (card) {
                var img = card.querySelector(".card-img");
                if (img && proj.image) img.src = proj.image;
                var pTitle = card.querySelector(".pill-title");
                if (pTitle && proj.title) pTitle.textContent = proj.title;
                var pTag = card.querySelector(".pill-tag");
                if (pTag && proj.tag) pTag.textContent = proj.tag;
            }
            var gItem = giantItems[idx];
            if (gItem) {
                var gTitle = gItem.querySelector(".giant-title");
                if (gTitle && proj.title) gTitle.textContent = proj.title;
                var gTag = gItem.querySelector(".giant-tag");
                if (gTag && proj.tag) gTag.textContent = proj.tag;
            }
        });
    }

    var W = window.innerWidth;
    var H = window.innerHeight;
    var isMobile = W < 768;
    var cfg = isMobile ? ABOUT_WORK_CONFIG.mobile : ABOUT_WORK_CONFIG.desktop;

    // Respect prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initial card dimensions (fanned deck)
    var initW = isMobile
        ? Math.min(Math.max(W * cfg.initialWidthFraction, 220), 340)
        : Math.min(Math.max(W * cfg.initialWidthFraction, 320), 460);
    var initH = initW / cfg.aspectRatio;

    // Medium card dimensions (62vw desktop / 88vw mobile, 16:10)
    var medW = W * cfg.mediumWidthFraction;
    var medH = medW / cfg.aspectRatio;

    // Full-screen card dimensions (100vw x 100svh)
    var fullW = W;
    var fullH = H;

    var radMed = ABOUT_WORK_CONFIG.radius.medium;
    var radFull = ABOUT_WORK_CONFIG.radius.full;

    // Coordinates relative to true center (0,0)
    var initX = isMobile ? 0 : W * cfg.initialXRatio;
    var initY = isMobile ? H * 0.12 : 0;
    var waitingX = isMobile ? W * cfg.waitingXRatio : W * cfg.waitingXRatio;
    var exitX = isMobile ? W * cfg.exitXRatio : W * cfg.exitXRatio;

    // Center anchor for cards
    gsap.set([c1, c2, c3], {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50
    });

    // Reset initial states
    gsap.set(c1, {
        x: initX,
        y: initY,
        rotation: ABOUT_WORK_CONFIG.rotations.initial[0],
        width: initW,
        height: initH,
        borderRadius: radMed,
        zIndex: 10,
        opacity: 1
    });

    gsap.set(c2, {
        x: initX - 35,
        y: initY + 15,
        rotation: ABOUT_WORK_CONFIG.rotations.initial[1],
        width: initW,
        height: initH,
        borderRadius: radMed,
        zIndex: 9,
        opacity: 1
    });

    gsap.set(c3, {
        x: initX - 70,
        y: initY + 30,
        rotation: ABOUT_WORK_CONFIG.rotations.initial[2],
        width: initW,
        height: initH,
        borderRadius: radMed,
        zIndex: 8,
        opacity: 1
    });

    if (pill1) gsap.set(pill1, { opacity: 0 });
    if (pill2) gsap.set(pill2, { opacity: 0 });
    if (pill3) gsap.set(pill3, { opacity: 0 });

    if (giantItem1) gsap.set(giantItem1, { opacity: 0, y: 40 });
    if (giantItem2) gsap.set(giantItem2, { opacity: 0, y: 60 });
    if (giantItem3) gsap.set(giantItem3, { opacity: 0, y: 60 });

    gsap.set(aboutText, { opacity: 1, x: 0, y: 0 });
    gsap.set(workIndicator, { opacity: 0 });
    if (counterCurrent) counterCurrent.textContent = "1";

    if (prefersReducedMotion) {
        // Accessible static state
        gsap.set(aboutText, { opacity: 0 });
        gsap.set(workIndicator, { opacity: 1 });
        gsap.set(c1, { x: 0, y: 0, width: medW, height: medH, rotation: 0, borderRadius: radMed });
        if (giantItem1) gsap.set(giantItem1, { opacity: 1, y: 0 });
        return;
    }

    var tm = ABOUT_WORK_CONFIG.timing;
    var cur = 0;

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=" + (H * ABOUT_WORK_CONFIG.scrollLengthMultiplier),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
                if (!counterCurrent) return;
                var p = self.progress;
                if (p < 0.35) {
                    counterCurrent.textContent = "1";
                } else if (p < 0.68) {
                    counterCurrent.textContent = "2";
                } else {
                    counterCurrent.textContent = "3";
                }
            }
        }
    });

    // ──────────────────────────────────────────
    // STEP 1: Card 1 -> MEDIUM CENTER (62vw, rot: 0)
    // ──────────────────────────────────────────
    // About text fades out
    tl.to(aboutText, {
        opacity: 0,
        x: isMobile ? 0 : -80,
        y: isMobile ? -30 : 0,
        duration: tm.c1Medium * 0.7,
        ease: "power2.inOut"
    }, cur);

    // Work indicator HUD reveals
    tl.to(workIndicator, {
        opacity: 1,
        duration: tm.c1Medium * 0.5,
        ease: "power2.out"
    }, cur + tm.c1Medium * 0.2);

    // Card 1 straightens and sizes up to medium width at center (0,0)
    tl.to(c1, {
        x: 0,
        y: 0,
        rotation: 0,
        width: medW,
        height: medH,
        borderRadius: radMed,
        duration: tm.c1Medium,
        ease: "power2.inOut"
    }, cur);

    // Giant Title 1 slides/masks into view behind Card 1
    if (giantItem1) {
        tl.to(giantItem1, {
            opacity: 1,
            y: 0,
            duration: tm.c1Medium * 0.8,
            ease: "power2.out"
        }, cur + tm.c1Medium * 0.2);
    }

    // Cards 2 & 3 move to right waiting position, half visible & tilted
    tl.to(c2, {
        x: waitingX,
        y: -15,
        rotation: ABOUT_WORK_CONFIG.rotations.waiting[0],
        duration: tm.c1Medium,
        ease: "power2.inOut"
    }, cur);

    tl.to(c3, {
        x: waitingX + (isMobile ? 20 : 40),
        y: 15,
        rotation: ABOUT_WORK_CONFIG.rotations.waiting[1],
        duration: tm.c1Medium,
        ease: "power2.inOut"
    }, cur);

    cur += tm.c1Medium;

    // ──────────────────────────────────────────
    // STEP 2: Card 1 -> FULL-SCREEN (100vw x 100svh, radius: 0)
    // ──────────────────────────────────────────
    tl.to(c1, {
        width: fullW,
        height: fullH,
        borderRadius: radFull,
        duration: tm.c1Full,
        ease: "power2.inOut"
    }, cur);

    // Bottom-left pill fades in near full-screen
    if (pill1) {
        tl.to(pill1, {
            opacity: 1,
            duration: tm.c1Full * 0.35,
            ease: "power2.out"
        }, cur + tm.c1Full * 0.65);
    }

    cur += tm.c1Full;

    // Hold Card 1 briefly at full-screen
    tl.to({}, { duration: tm.c1Hold }, cur);
    cur += tm.c1Hold;

    // ──────────────────────────────────────────
    // STEP 3: Card 1 EXIT & Card 2 -> MEDIUM
    // ──────────────────────────────────────────
    // Pill 1 fades out immediately
    if (pill1) {
        tl.to(pill1, {
            opacity: 0,
            duration: tm.c1ExitC2Med * 0.2,
            ease: "power2.in"
        }, cur);
    }

    // Card 1 shrinks back to medium and slides out to the left
    tl.to(c1, {
        x: exitX,
        y: 20,
        rotation: ABOUT_WORK_CONFIG.rotations.exit,
        width: medW,
        height: medH,
        borderRadius: radMed,
        opacity: 0.15,
        duration: tm.c1ExitC2Med,
        ease: "power2.inOut"
    }, cur);

    // Card 2 rises to top z-index, straightens to 0, moves to center & sizes up to medium
    tl.set(c2, { zIndex: 15 }, cur);
    tl.to(c2, {
        x: 0,
        y: 0,
        rotation: 0,
        width: medW,
        height: medH,
        borderRadius: radMed,
        duration: tm.c1ExitC2Med,
        ease: "power2.inOut"
    }, cur);

    // Giant title swap (slide/mask reveal: title 1 exits up, title 2 enters from below)
    if (giantItem1) {
        tl.to(giantItem1, {
            y: -60,
            opacity: 0,
            duration: tm.c1ExitC2Med * 0.5,
            ease: "power2.in"
        }, cur);
    }
    if (giantItem2) {
        tl.to(giantItem2, {
            y: 0,
            opacity: 1,
            duration: tm.c1ExitC2Med * 0.7,
            ease: "power2.out"
        }, cur + tm.c1ExitC2Med * 0.3);
    }

    // Card 3 moves forward in waiting stack
    tl.to(c3, {
        x: waitingX,
        y: -10,
        rotation: ABOUT_WORK_CONFIG.rotations.waiting[0],
        duration: tm.c1ExitC2Med,
        ease: "power2.inOut"
    }, cur);

    cur += tm.c1ExitC2Med;

    // ──────────────────────────────────────────
    // STEP 4: Card 2 -> FULL-SCREEN (100vw x 100svh, radius: 0)
    // ──────────────────────────────────────────
    tl.to(c2, {
        width: fullW,
        height: fullH,
        borderRadius: radFull,
        duration: tm.c2Full,
        ease: "power2.inOut"
    }, cur);

    if (pill2) {
        tl.to(pill2, {
            opacity: 1,
            duration: tm.c2Full * 0.35,
            ease: "power2.out"
        }, cur + tm.c2Full * 0.65);
    }

    cur += tm.c2Full;

    // Hold Card 2 briefly at full-screen
    tl.to({}, { duration: tm.c2Hold }, cur);
    cur += tm.c2Hold;

    // ──────────────────────────────────────────
    // STEP 5: Card 2 EXIT & Card 3 -> MEDIUM
    // ──────────────────────────────────────────
    if (pill2) {
        tl.to(pill2, {
            opacity: 0,
            duration: tm.c2ExitC3Med * 0.2,
            ease: "power2.in"
        }, cur);
    }

    tl.to(c2, {
        x: exitX,
        y: 20,
        rotation: ABOUT_WORK_CONFIG.rotations.exit,
        width: medW,
        height: medH,
        borderRadius: radMed,
        opacity: 0.15,
        duration: tm.c2ExitC3Med,
        ease: "power2.inOut"
    }, cur);

    // Card 3 rises to top z-index, straightens to 0, moves to center & sizes up to medium
    tl.set(c3, { zIndex: 20 }, cur);
    tl.to(c3, {
        x: 0,
        y: 0,
        rotation: 0,
        width: medW,
        height: medH,
        borderRadius: radMed,
        duration: tm.c2ExitC3Med,
        ease: "power2.inOut"
    }, cur);

    // Giant title swap: title 2 exits up, title 3 enters from below
    if (giantItem2) {
        tl.to(giantItem2, {
            y: -60,
            opacity: 0,
            duration: tm.c2ExitC3Med * 0.5,
            ease: "power2.in"
        }, cur);
    }
    if (giantItem3) {
        tl.to(giantItem3, {
            y: 0,
            opacity: 1,
            duration: tm.c2ExitC3Med * 0.7,
            ease: "power2.out"
        }, cur + tm.c2ExitC3Med * 0.3);
    }

    cur += tm.c2ExitC3Med;

    // ──────────────────────────────────────────
    // STEP 6: Card 3 -> FULL-SCREEN (100vw x 100svh, radius: 0)
    // ──────────────────────────────────────────
    tl.to(c3, {
        width: fullW,
        height: fullH,
        borderRadius: radFull,
        duration: tm.c3Full,
        ease: "power2.inOut"
    }, cur);

    if (pill3) {
        tl.to(pill3, {
            opacity: 1,
            duration: tm.c3Full * 0.35,
            ease: "power2.out"
        }, cur + tm.c3Full * 0.65);
    }

    cur += tm.c3Full;

    // Hold Card 3 at full-screen until timeline ends, then unpins
    tl.to({}, { duration: tm.c3Hold }, cur);

    return tl;
}

var aboutWorkCtx;
var lastWindowWidth = window.innerWidth;

function initAboutWorkScroll() {
    if (typeof ScrollTrigger === "undefined") return;

    aboutWorkCtx = gsap.context(function () {
        buildAboutWorkTimeline();
    });

    var resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            // Ignore height-only changes on mobile (e.g. browser address bar show/hide)
            if (Math.abs(window.innerWidth - lastWindowWidth) > 10) {
                lastWindowWidth = window.innerWidth;
                if (aboutWorkCtx) aboutWorkCtx.revert();
                aboutWorkCtx = gsap.context(function () {
                    buildAboutWorkTimeline();
                });
                ScrollTrigger.refresh();
                if (lenis) lenis.resize();
            }
        }, 200);
    });
}

// ═══════════════════════════════════════════════════════════
// PREMIUM EDITORIAL CONTACT SECTION (GSAP + SCROLLTRIGGER)
// ═══════════════════════════════════════════════════════════

const CONTACT_CONFIG = {
    accentColor: "#04c514", // Change here: e.g. #2B3BE0, #FF6A3D, #04c514
    durations: {
        label: 0.8,
        headlineWord: 0.8,
        card: 0.9,
        fields: 0.8,
        socials: 0.8,
        signature: 1.1,
        footer: 0.8
    },
    staggers: {
        headlineWord: 0.08,
        fields: 0.12,
        socials: 0.1
    },
    ease: "power3.out"
};

function initContactSection() {
    var contactSection = document.querySelector("#contact");
    if (!contactSection) return;

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. ScrollTrigger Entrance Animation (Unpinned, triggers at top 80%) ──
    if (typeof ScrollTrigger !== "undefined") {
        if (prefersReducedMotion) {
            // Accessible static state
            gsap.set("#contact .contact-tag, #contact .word, #contact .contact-card, #contact .field-wrap, #contact .social-row, #contact .contact-signature-text, #contact .contact-footer-bar", {
                opacity: 1,
                y: 0,
                x: 0,
                yPercent: 0
            });
        } else {
            var contactTl = gsap.timeline({
                scrollTrigger: {
                    trigger: contactSection,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            });

            // 1. "CONTACT" label fades & slides up
            contactTl.from("#contact .contact-tag", {
                y: 24,
                opacity: 0,
                duration: CONTACT_CONFIG.durations.label,
                ease: CONTACT_CONFIG.ease
            });

            // 2. Headline reveals with word mask stagger
            contactTl.from("#contact .contact-headline .word", {
                yPercent: 110,
                opacity: 0,
                duration: CONTACT_CONFIG.durations.headlineWord,
                stagger: CONTACT_CONFIG.staggers.headlineWord,
                ease: CONTACT_CONFIG.ease
            }, "-=0.45");

            // 3. Form card and fields slide up
            contactTl.from("#contact .contact-card", {
                y: 40,
                opacity: 0,
                duration: CONTACT_CONFIG.durations.card,
                ease: CONTACT_CONFIG.ease
            }, "-=0.5");

            contactTl.from("#contact .field-wrap, #contact .form-action", {
                y: 28,
                opacity: 0,
                stagger: CONTACT_CONFIG.staggers.fields,
                duration: CONTACT_CONFIG.durations.fields,
                ease: CONTACT_CONFIG.ease
            }, "-=0.6");

            // 4. Social links list slides in from the right
            contactTl.from("#contact .social-row", {
                x: 36,
                opacity: 0,
                stagger: CONTACT_CONFIG.staggers.socials,
                duration: CONTACT_CONFIG.durations.socials,
                ease: CONTACT_CONFIG.ease
            }, "-=0.65");

            // 5. Signature statement fades in smoothly
            contactTl.from("#contact .contact-signature-text", {
                y: 35,
                opacity: 0,
                duration: CONTACT_CONFIG.durations.signature,
                ease: CONTACT_CONFIG.ease
            }, "-=0.4");

            // 6. Minimal footer bar
            contactTl.from("#contact .contact-footer-bar", {
                opacity: 0,
                duration: CONTACT_CONFIG.durations.footer,
                ease: "power2.out"
            }, "-=0.5");
        }
    }

    // ── 2. Interactive Form Handling (Floating labels & Simulated Submission) ──
    var contactForm = document.querySelector("#contact-form");
    var successState = document.querySelector("#contact-success-state");
    var submitBtn = document.querySelector("#contact-submit-btn");
    var resetBtn = document.querySelector(".reset-contact-btn");

    if (contactForm && submitBtn) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var nameInput = document.querySelector("#contact-name");
            var emailInput = document.querySelector("#contact-email");
            var messageInput = document.querySelector("#contact-message");

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                // Focus first empty field
                if (!nameInput.value.trim()) nameInput.focus();
                else if (!emailInput.value.trim()) emailInput.focus();
                else messageInput.focus();
                return;
            }

            // Enter loading state
            submitBtn.classList.add("is-loading");
            submitBtn.disabled = true;

            // Simulate server submission (structured to swap in real API call)
            setTimeout(function () {
                submitBtn.classList.remove("is-loading");
                submitBtn.disabled = false;

                // Animate transition to success state
                gsap.to(contactForm, {
                    opacity: 0,
                    y: -15,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: function () {
                        contactForm.style.display = "none";
                        if (successState) {
                            successState.style.display = "block";
                            gsap.fromTo(successState,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                            );
                        }
                    }
                });
            }, 1200);
        });
    }

    // Reset button to allow sending another message
    if (resetBtn && contactForm && successState) {
        resetBtn.addEventListener("click", function () {
            contactForm.reset();
            gsap.to(successState, {
                opacity: 0,
                y: 15,
                duration: 0.35,
                ease: "power2.in",
                onComplete: function () {
                    successState.style.display = "none";
                    contactForm.style.display = "flex";
                    gsap.fromTo(contactForm,
                        { opacity: 0, y: -10 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                    );
                }
            });
        });
    }

    // ── 3. Back to Top Smooth Scroll Link ──
    var bttLink = document.querySelector("#contact-btt-link");
    if (bttLink) {
        bttLink.addEventListener("click", function (e) {
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.5 });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }
}

// ── INITIALIZATION ────────────────────────

(function init() {
    revealTospan();
    initLenis();
    loadingAnimation();

    var cursorRefs = initCustomCursor();
    if (cursorRefs) {
        initCursorStates(cursorRefs.cursorContainer);
    }

    initTextSplitting();
    initMagnetics();
    initParticles();
    initParallaxBlobs();
    initSmoothScroll();
    initAboutWorkScroll();
    initContactSection();
})();
