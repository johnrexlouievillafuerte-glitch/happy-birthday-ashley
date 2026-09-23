/* ========================================
   MAIN.JS — App Init + Scroll Observer
   ======================================== */

(function () {
    'use strict';

    // === Floating Balloons (CSS hearts instead of emoji) ===
    function createBalloons() {
        const container = document.getElementById('balloons-container');
        if (!container) return;

        const colors = ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFDAB9', '#B4D7FF', '#FFB6C1', '#DDA0DD', '#FFB6C1'];
        const numBalloons = 8;

        for (let i = 0; i < numBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * 90 + 5 + '%';

            // Create a CSS heart shape
            const heart = document.createElement('div');
            heart.className = 'balloon-heart';
            heart.style.background = colors[i % colors.length];
            const size = Math.random() * 10 + 14;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';

            // Update pseudo-element sizes via CSS custom property
            heart.style.setProperty('--size', size + 'px');

            balloon.appendChild(heart);
            balloon.style.animation = 'floatUp ' + (Math.random() * 10 + 12) + 's linear ' + (Math.random() * 15) + 's infinite';
            container.appendChild(balloon);
        }
    }

    // === Scroll Reveal for Love Items ===
    function setupScrollReveal() {
        const loveItems = document.querySelectorAll('.love-item');

        if (loveItems.length === 0) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index) || 0;
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, index * 150); // staggered animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        loveItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    // === Typewriter Trigger on Scroll ===
    function setupTypewriterTrigger() {
        const wishSection = document.getElementById('wishes-section');
        if (!wishSection) return;

        let typewriterStarted = false;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !typewriterStarted) {
                    typewriterStarted = true;
                    if (typeof window.startTypewriter === 'function') {
                        setTimeout(window.startTypewriter, 500);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(wishSection);
    }

    // === Section Fade-in Animation ===
    function setupSectionAnimations() {
        const titles = document.querySelectorAll('.section-title, .section-subtitle');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        titles.forEach(function (title) {
            title.style.opacity = '0';
            observer.observe(title);
        });

        // Don't hide the first section title
        const firstTitle = document.querySelector('#envelope-section .greeting-text');
        if (firstTitle) {
            firstTitle.style.opacity = '1';
            firstTitle.style.animation = 'fadeInUp 1s ease forwards';
        }
    }

    // === Initialize Everything ===
    function init() {
        createBalloons();
        setupScrollReveal();
        setupTypewriterTrigger();
        setupSectionAnimations();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
