/* ========================================
   CANDLES.JS — Candle Blow-Out Interaction
   ======================================== */

(function () {
    'use strict';

    const wishBtn = document.getElementById('wish-btn');
    const candlesContainer = document.getElementById('candles-container');
    const candlesRow = document.getElementById('candles-row');
    const fireworksMessage = document.getElementById('fireworks-message');

    if (!wishBtn || !candlesContainer || !candlesRow) return;

    const NUM_CANDLES = 7;
    let candlesBlown = 0;
    let allBlown = false;

    // Candle colors for variety
    const CANDLE_COLORS = [
        'linear-gradient(135deg, #FFB6C1, #FF7EB3)',
        'linear-gradient(135deg, #DDA0DD, #CC8FCC)',
        'linear-gradient(135deg, #B5EAD7, #8FD4BC)',
        'linear-gradient(135deg, #FFDAB9, #FFB88C)',
        'linear-gradient(135deg, #B4D7FF, #8CBFFF)',
        'linear-gradient(135deg, #FFD700, #FFC107)',
        'linear-gradient(135deg, #FFB6C1, #DDA0DD)'
    ];

    function createCandles() {
        candlesRow.innerHTML = '';

        for (let i = 0; i < NUM_CANDLES; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'candle-wrapper';
            wrapper.dataset.index = i;

            wrapper.innerHTML = `
                <div class="candle" style="background: ${CANDLE_COLORS[i]}">
                    <div class="candle-stripe"></div>
                    <div class="flame" id="flame-${i}"></div>
                    <div class="smoke" id="smoke-${i}"></div>
                </div>
            `;

            wrapper.addEventListener('click', function () {
                blowOutCandle(i);
            });

            candlesRow.appendChild(wrapper);
        }
    }

    function blowOutCandle(index) {
        if (allBlown) return;

        const flame = document.getElementById('flame-' + index);
        const smoke = document.getElementById('smoke-' + index);

        if (!flame || flame.classList.contains('blown-out')) return;

        // Blow out the flame
        flame.classList.add('blown-out');

        // Show smoke
        if (smoke) {
            smoke.classList.add('visible');
            smoke.style.animation = 'smokeRise 1s ease forwards';

            setTimeout(function () {
                smoke.classList.remove('visible');
            }, 1000);
        }

        candlesBlown++;

        // Small pop confetti for each candle
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 15,
                spread: 30,
                origin: { y: 0.7 },
                colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7'],
                scalar: 0.6
            });
        }

        // All candles blown out!
        if (candlesBlown >= NUM_CANDLES) {
            allBlown = true;
            setTimeout(celebrationFinale, 600);
        }
    }

    function celebrationFinale() {
        // Hide candles instruction
        const instruction = candlesContainer.querySelector('.candles-instruction');
        if (instruction) {
            instruction.style.display = 'none';
        }

        // Show final message
        if (fireworksMessage) {
            fireworksMessage.classList.remove('hidden');
        }

        // Epic confetti finale!
        if (typeof confetti === 'function') {
            // Initial burst
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3', '#FFDAB9', '#B4D7FF']
            });

            // Side cannons
            setTimeout(function () {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700']
                });
            }, 300);

            setTimeout(function () {
                confetti({
                    particleCount: 80,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF7EB3', '#FFDAB9', '#B4D7FF', '#FFD700']
                });
            }, 600);

            // Final rain
            setTimeout(function () {
                const duration = 3000;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0, y: 0 },
                        colors: ['#FFB6C1', '#DDA0DD', '#B5EAD7']
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1, y: 0 },
                        colors: ['#FF7EB3', '#FFDAB9', '#B4D7FF']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                })();
            }, 1000);
        }
    }

    // "Make a Wish" button click
    wishBtn.addEventListener('click', function () {
        wishBtn.classList.add('hidden');
        candlesContainer.classList.remove('hidden');
        candlesContainer.style.animation = 'fadeInUp 0.8s ease forwards';
        createCandles();
    });
})();
