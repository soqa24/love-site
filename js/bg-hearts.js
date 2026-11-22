const BASE = '/love-site/';

const heartUrls = [
  `\${BASE}images/hearts/heart-small.svg`,
  `\${BASE}images/hearts/heart-outline.svg`,
  `\${BASE}images/hearts/heart-glow.svg`,
  `\${BASE}images/hearts/heart-filled.svg`,
];

const count = 30;

export function initHearts() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const start = () => {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('img');
      heart.className = 'heart';
      heart.src = heartUrls[Math.floor(Math.random() * heartUrls.length)];
      heart.alt = '';

      heart.style.left = Math.random() * 100 + '%';
      heart.style.width = 16 + Math.random() * 24 + 'px';
      heart.style.height = heart.style.width;
      heart.style.animationDuration = 4 + Math.random() * 6 + 's';
      heart.style.animationDelay = Math.random() * 5 + 's';

      hero.appendChild(heart);
    }
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 3000 });
  } else {
    setTimeout(start, 1500);
  }
}
