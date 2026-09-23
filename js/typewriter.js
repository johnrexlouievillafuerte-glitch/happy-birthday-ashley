/* ========================================
   TYPEWRITER.JS — Typewriter Text Effect
   ======================================== */

(function () {
    'use strict';

    const wishLetter = document.getElementById('wish-letter');
    const cursor = document.getElementById('typewriter-cursor');
    const wishBtn = document.getElementById('wish-btn');

    if (!wishLetter) return;

    const MESSAGE = `My Dearest Ashley Marie,

On this beautiful day, I want you to know just how much you mean to me. You are the reason I smile every morning and the last thought on my mind every night.

Every day with you feels like a gift I never knew I deserved. You've taught me what it means to truly love someone — with your patience, your warmth, and your beautiful heart.

I promise to always be your biggest cheerleader, your shoulder to lean on, and your partner in every adventure life brings us.

Happy Birthday, my love. You deserve all the happiness in the world — and I'll spend every day trying to give you exactly that.

Forever and always yours 💝`;

    let charIndex = 0;
    let isTyping = false;
    let typingInterval = null;

    function startTyping() {
        if (isTyping) return;
        isTyping = true;

        typingInterval = setInterval(function () {
            if (charIndex < MESSAGE.length) {
                wishLetter.textContent += MESSAGE[charIndex];
                charIndex++;

                // Auto-scroll the container to keep text visible
                wishLetter.parentElement.scrollTop = wishLetter.parentElement.scrollHeight;
            } else {
                clearInterval(typingInterval);
                isTyping = false;

                // Hide cursor after typing is done
                if (cursor) {
                    setTimeout(function () {
                        cursor.style.display = 'none';
                    }, 1000);
                }

                // Show the "Make a Wish" button
                if (wishBtn) {
                    setTimeout(function () {
                        wishBtn.classList.remove('hidden');
                        wishBtn.style.animation = 'fadeInUp 0.8s ease forwards';
                    }, 500);
                }
            }
        }, 35); // typing speed in ms
    }

    // Expose function for main.js to call when section is in view
    window.startTypewriter = startTyping;
})();
