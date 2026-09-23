/* ========================================
   ENVELOPE.JS — Envelope Open Animation
   ======================================== */

(function () {
    'use strict';

    const openBtn = document.getElementById('open-btn');
    const envelope = document.getElementById('envelope');
    const cardSection = document.getElementById('card-section');

    if (!openBtn || !envelope || !cardSection) return;

    let isOpened = false;

    function openEnvelope() {
        if (isOpened) return;
        isOpened = true;

        // Remove bounce animation from button
        openBtn.classList.remove('bounce');
        openBtn.style.opacity = '0.6';
        openBtn.style.pointerEvents = 'none';

        // Open the envelope flap
        envelope.classList.add('opened');

        // Small confetti burst
        if (typeof confetti === 'function') {
            setTimeout(function () {
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3'],
                    scalar: 0.8
                });
            }, 400);
        }

        // Scroll to card section after animation
        setTimeout(function () {
            cardSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 1200);
    }

    // Click button to open
    openBtn.addEventListener('click', openEnvelope);

    // Also allow clicking the envelope itself
    envelope.addEventListener('click', openEnvelope);
})();
