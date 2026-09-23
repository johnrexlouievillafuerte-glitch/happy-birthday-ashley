/* ========================================
   MAIN.JS — App Init + Scroll Observer
   ======================================== */

(function () {
    'use strict';

    // === Floating Balloons ===
    function createBalloons() {
        const container = document.getElementById('balloons-container');
        if (!container) return;

        const balloonEmojis = ['🎈', '🎀', '🌸', '🎈', '💖', '🎈', '🌟', '🎈'];
        const numBalloons = 8;

        for (let i = 0; i < numBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloonEmojis[i % balloonEmojis.length];
            balloon.style.left = Math.random() * 90 + 5 + '%';
            balloon.style.animationDuration = (Math.random() * 10 + 12) + 's';
            balloon.style.animationDelay = (Math.random() * 15) + 's';
            balloon.style.fontSize = (Math.random() * 1.5 + 2) + 'rem';
            balloon.style.animation = `floatUp ${Math.random() * 10 + 12}s linear ${Math.random() * 15}s infinite`;
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
                    // Call the global function from typewriter.js
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

    // === Easter Egg: Konami Code ===
    function setupEasterEgg() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', function (e) {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    konamiIndex = 0;
                    // Super confetti explosion!
                    if (typeof confetti === 'function') {
                        for (let i = 0; i < 5; i++) {
                            setTimeout(function () {
                                confetti({
                                    particleCount: 100,
                                    spread: 160,
                                    origin: { x: Math.random(), y: Math.random() * 0.5 },
                                    colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3']
                                });
                            }, i * 200);
                        }
                    }
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    // === Initialize Everything ===
    function init() {
        createBalloons();
        setupScrollReveal();
        setupTypewriterTrigger();
        setupSectionAnimations();
        setupEasterEgg();

        // Log a cute message to console
        console.log('%c💖 Happy Birthday, Ashley Marie! 💖', 
            'color: #E91E63; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);');
        console.log('%cMade with love 💝', 
            'color: #FF7EB3; font-size: 14px;');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
