// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

function isDarkMode() {
  return html.getAttribute('data-theme') === 'dark';
}

// Nav scroll effect
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Fade-in observer
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  fadeEls.forEach(el => observer.observe(el));
}

// ─── FALLING ELEMENTS ──────────────────────────────────────────

const starColors = [
  '#FFB5E8', '#B5DEFF', '#B5FFB5', '#FFFFB5',
  '#E0B5FF', '#FFD5B5', '#B5FFF0', '#FFB5B5',
];

const petalColors = [
  '#9B59B6', '#8E44AD', '#A569BD', '#7D3C98',
  '#BB8FCE', '#9063CD', '#7B68EE', '#8B5CF6',
];

const flowerShapes = ['❀', '✿', '❁', '✾', '❃', '✽', '✼', '❋'];
const petalShapes  = ['✿', '❀', '❁', '✾'];

function createFlower() {
  if (isDarkMode()) return;
  const el = document.createElement('div');
  el.className = 'falling-flower';
  el.innerHTML = flowerShapes[Math.floor(Math.random() * flowerShapes.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];
  el.style.fontSize = (14 + Math.random() * 18) + 'px';
  el.style.animationDuration = (10 + Math.random() * 10) + 's';
  el.style.opacity = 0.5 + Math.random() * 0.4;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

function createStar() {
  if (!isDarkMode()) return;
  const el = document.createElement('div');
  el.className = 'falling-star';
  el.innerHTML = '★';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.color = starColors[Math.floor(Math.random() * starColors.length)];
  el.style.fontSize = (12 + Math.random() * 16) + 'px';
  el.style.animationDuration = (8 + Math.random() * 8) + 's';
  el.style.opacity = 0.6 + Math.random() * 0.4;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 16000);
}

// Cursor trail
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTrailTime < 50) return;
  lastTrailTime = now;

  const p = document.createElement('div');
  p.className = 'cursor-trail';

  if (isDarkMode()) {
    p.innerHTML = '✦';
    p.style.color = starColors[Math.floor(Math.random() * starColors.length)];
    p.style.fontSize = (8 + Math.random() * 8) + 'px';
    p.style.textShadow = '0 0 5px currentColor';
  } else {
    p.innerHTML = petalShapes[Math.floor(Math.random() * petalShapes.length)];
    p.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    p.style.fontSize = (10 + Math.random() * 10) + 'px';
  }

  p.style.left = e.clientX + 'px';
  p.style.top  = e.clientY + 'px';
  p.style.setProperty('--drift-x', ((Math.random() - 0.5) * 30) + 'px');
  p.style.setProperty('--drift-y', (20 + Math.random() * 30) + 'px');
  p.style.setProperty('--rotate',  (Math.random() * 360) + 'deg');

  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1000);
});

// Periodic spawning
setInterval(() => {
  if (isDarkMode()) { if (Math.random() > 0.3) createStar(); }
  else              { if (Math.random() > 0.3) createFlower(); }
}, 1500);

// Initial burst
for (let i = 0; i < 5; i++) {
  setTimeout(() => isDarkMode() ? createStar() : createFlower(), i * 500);
}
