/* ========================================
   COUNTDOWN.JS — Countdown Timer to Oct 29
   ======================================== */

(function () {
    'use strict';

    const BIRTHDAY = new Date('2026-10-29T00:00:00');
    const BIRTHDAY_END = new Date('2026-10-30T00:00:00');

    function updateCountdown() {
        const banner = document.getElementById('countdown-banner');
        if (!banner) return;

        const now = new Date();

        // It's her birthday!
        if (now >= BIRTHDAY && now < BIRTHDAY_END) {
            banner.textContent = "It's Ashley Marie's birthday today!";
            banner.style.background = 'linear-gradient(135deg, #FF7EB3, #FF5A95, #DDA0DD)';
            return;
        }

        // Birthday has passed
        if (now >= BIRTHDAY_END) {
            banner.textContent = 'Hope you had the best birthday, Ashley.';
            return;
        }

        // Calculate time remaining
        const diff = BIRTHDAY - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days === 0) {
            banner.textContent = hours + 'h ' + minutes + 'm ' + seconds + "s until Ashley's birthday";
        } else if (days === 1) {
            banner.textContent = "1 day until Ashley's special day";
        } else {
            banner.textContent = days + ' days, ' + hours + 'h ' + minutes + "m until Ashley's birthday";
        }
    }

    // Initialize
    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
