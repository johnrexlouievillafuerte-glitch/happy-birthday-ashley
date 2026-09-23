/* ========================================
   SPARKLES.JS — Cursor Sparkle Trail
   ======================================== */

(function () {
    'use strict';

    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;

    const COLORS = ['#FFB6C1', '#DDA0DD', '#B5EAD7', '#FFD700', '#FF7EB3', '#B4D7FF', '#FFDAB9'];
    const MAX_PARTICLES = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            size: Math.random() * 4 + 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2 - 1,
            life: 1,
            decay: Math.random() * 0.02 + 0.015,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            shape: Math.random() > 0.5 ? 'star' : 'circle'
        };
    }

    function drawStar(x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const method = i === 0 ? 'moveTo' : 'lineTo';
            ctx[method](Math.cos(angle) * size, Math.sin(angle) * size);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add new particles at cursor
        if (particles.length < MAX_PARTICLES) {
            particles.push(createParticle(mouseX, mouseY));
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= p.decay;
            p.rotation += p.rotationSpeed;
            p.size *= 0.98;

            if (p.life <= 0 || p.size < 0.5) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;

            if (p.shape === 'star') {
                drawStar(p.x, p.y, p.size, p.rotation);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    // Initialize
    resize();
    animate();
})();
