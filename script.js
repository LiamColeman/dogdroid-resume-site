/* ═══════════════════════════════════════════════════════════════════════════
   DOGDROID.DEV - Interactive Scripts
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) {
        yearEl.textContent = `© ${new Date().getFullYear()}`;
    }

    // Initialize all features
    initMoodCycler();
    initStatCounters();
    initScrollAnimations();
    initGlitchEffect();
    initSmoothScroll();
});

/* ═══════════════════════════════════════════════════════════════════════════
   MOOD CYCLER
   ═══════════════════════════════════════════════════════════════════════════ */

function initMoodCycler() {
    const moodEl = document.getElementById('mood');
    if (!moodEl) return;

    const moods = [
        'caffeinated',
        'debugging',
        'in the zone',
        'curious',
        'shipping code',
        'refactoring',
        'googling',
        'optimizing',
        'contemplating',
        'building'
    ];

    let currentIndex = 0;

    setInterval(() => {
        moodEl.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % moods.length;
            moodEl.textContent = moods[currentIndex];
            moodEl.style.opacity = '1';
        }, 200);
    }, 3000);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAT COUNTERS
   ═══════════════════════════════════════════════════════════════════════════ */

function initStatCounters() {
    const stats = document.querySelectorAll('.stat-value[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        const target = stat.dataset.target;
        if (target !== '∞') {
            stat.textContent = '0';
            observer.observe(stat);
        }
    });
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.target.includes('.');
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;

    let step = 0;

    const timer = setInterval(() => {
        step++;
        const current = Math.min(increment * step, target);

        element.textContent = isDecimal ? current.toFixed(2) : Math.round(current);

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = isDecimal ? target.toFixed(2) : target;
        }
    }, stepDuration);
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section, .project-card, .stat-card');

    // Add initial hidden state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENHANCED GLITCH EFFECT
   ═══════════════════════════════════════════════════════════════════════════ */

function initGlitchEffect() {
    const glitchEl = document.querySelector('.glitch');
    if (!glitchEl) return;

    // Occasionally trigger a more intense glitch
    setInterval(() => {
        if (Math.random() > 0.9) {
            glitchEl.style.animation = 'none';
            glitchEl.offsetHeight; // Trigger reflow

            // Random intense glitch
            const intensity = Math.random() * 10;
            glitchEl.style.textShadow = `
                ${intensity}px 0 var(--accent-secondary),
                ${-intensity}px 0 var(--accent-primary)
            `;

            setTimeout(() => {
                glitchEl.style.textShadow = '';
            }, 100);
        }
    }, 2000);

    // Mouse interaction glitch
    glitchEl.addEventListener('mouseenter', () => {
        glitchEl.classList.add('glitch-active');
    });

    glitchEl.addEventListener('mouseleave', () => {
        glitchEl.classList.remove('glitch-active');
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════════════════════════════════════════ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   EASTER EGG - KONAMI CODE
   ═══════════════════════════════════════════════════════════════════════════ */

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 2000);

    console.log('🐕 woof! you found the secret!');
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONSOLE EASTER EGG
   ═══════════════════════════════════════════════════════════════════════════ */

console.log(`
%c    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║   🐕  Welcome to dogdroid.dev  🤖    ║
    ║                                       ║
    ║   Curious? The source is on GitHub.   ║
    ║   Try the Konami code for a surprise. ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
`, 'color: #00ffcc; font-family: monospace;');
