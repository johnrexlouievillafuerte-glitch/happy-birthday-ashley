/* ========================================
   CARD.JS — Birthday Card Flip + Confetti
   ======================================== */

(function () {
    'use strict';

    const card = document.getElementById('birthday-card');
    if (!card) return;

    let isFlipped = false;
    let confettiFired = false;

    function toggleCard() {
        isFlipped = !isFlipped;

        if (isFlipped) {
            card.classList.add('flipped');

            // Fire confetti on first open
            if (!confettiFired && typeof confetti === 'function') {
                confettiFired = true;

                // Big confetti burst!
                const duration = 2000;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0, y: 0.6 },
                        colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3', '#FFDAB9']
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1, y: 0.6 },
                        colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3', '#FFDAB9']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                })();
            }
        } else {
            card.classList.remove('flipped');
        }
    }

    card.addEventListener('click', toggleCard);
})();
