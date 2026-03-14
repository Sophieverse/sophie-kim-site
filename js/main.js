// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scroll for navigation links
document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Check if dark mode
function isDarkMode() {
    return html.getAttribute('data-theme') === 'dark';
}

// Pastel star colors (for dark mode)
const starColors = [
    '#FFB5E8', // pink
    '#B5DEFF', // blue
    '#B5FFB5', // green
    '#FFFFB5', // yellow
    '#E0B5FF', // purple
    '#FFD5B5', // peach
    '#B5FFF0', // mint
    '#FFB5B5', // coral
];

// Petal/flower colors (for light mode) - purple tones
const petalColors = [
    '#9B59B6', // amethyst
    '#8E44AD', // deep purple
    '#A569BD', // medium orchid
    '#7D3C98', // dark violet
    '#BB8FCE', // soft purple
    '#9063CD', // medium purple
    '#7B68EE', // medium slate blue
    '#8B5CF6', // violet
];

// Flower shapes for falling
const flowerShapes = ['❀', '✿', '❁', '✾', '❃', '✽', '✼', '❋'];

// Petal shapes for cursor trail
const petalShapes = ['✿', '❀', '❁', '✾'];

// Create falling flower (light mode)
function createFlower() {
    if (isDarkMode()) return;

    const flower = document.createElement('div');
    flower.className = 'falling-flower';
    flower.innerHTML = flowerShapes[Math.floor(Math.random() * flowerShapes.length)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    flower.style.fontSize = (14 + Math.random() * 18) + 'px';
    flower.style.animationDuration = (10 + Math.random() * 10) + 's';
    flower.style.opacity = 0.5 + Math.random() * 0.4;

    document.body.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 20000);
}

// Create falling star (dark mode)
function createStar() {
    if (!isDarkMode()) return;

    const star = document.createElement('div');
    star.className = 'falling-star';
    star.innerHTML = '★';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.fontSize = (12 + Math.random() * 16) + 'px';
    star.style.animationDuration = (8 + Math.random() * 8) + 's';
    star.style.opacity = 0.6 + Math.random() * 0.4;

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 16000);
}

// Create cursor trail particle
let lastTrailTime = 0;
const trailDelay = 50; // milliseconds between trail particles

function createTrailParticle(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < trailDelay) return;
    lastTrailTime = now;

    const particle = document.createElement('div');
    particle.className = 'cursor-trail';

    if (isDarkMode()) {
        particle.innerHTML = '✦';
        particle.style.color = starColors[Math.floor(Math.random() * starColors.length)];
        particle.style.fontSize = (8 + Math.random() * 8) + 'px';
        particle.style.textShadow = '0 0 5px currentColor';
    } else {
        particle.innerHTML = petalShapes[Math.floor(Math.random() * petalShapes.length)];
        particle.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        particle.style.fontSize = (10 + Math.random() * 10) + 'px';
    }

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Random drift direction
    const driftX = (Math.random() - 0.5) * 30;
    const driftY = 20 + Math.random() * 30;
    particle.style.setProperty('--drift-x', driftX + 'px');
    particle.style.setProperty('--drift-y', driftY + 'px');
    particle.style.setProperty('--rotate', (Math.random() * 360) + 'deg');

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Track mouse movement for cursor trail
document.addEventListener('mousemove', (e) => {
    createTrailParticle(e.clientX, e.clientY);
});

// Create falling elements periodically
setInterval(() => {
    if (isDarkMode()) {
        if (Math.random() > 0.3) createStar();
    } else {
        if (Math.random() > 0.3) createFlower();
    }
}, 1500);

// Create initial falling elements
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        if (isDarkMode()) {
            createStar();
        } else {
            createFlower();
        }
    }, i * 500);
}

