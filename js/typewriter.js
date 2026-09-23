/* ========================================
   TYPEWRITER.JS — Typewriter Text Effect
   ======================================== */

(function () {
    'use strict';

    const wishLetter = document.getElementById('wish-letter');
    const cursor = document.getElementById('typewriter-cursor');
    const wishBtn = document.getElementById('wish-btn');

    if (!wishLetter) return;

    const MESSAGE = `Ashley,

I've been trying to figure out the right words for this, and honestly, I don't think there are any that are good enough. But I'm gonna try anyway.

You showed up in my life and somehow made everything make more sense. The days feel different with you in them — better, warmer, like they actually matter.

I know I don't always say it the way I should, or as often as you deserve to hear it. But you are the best thing that's ever happened to me. Not in a cheesy, movie kind of way. In the real, everyday, I-can't-imagine-doing-this-without-you kind of way.

So happy birthday, Ash. I hope this year gives you everything you've been wishing for. And if it doesn't, I'll be right here trying to make up the difference.

Always yours.`;

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
