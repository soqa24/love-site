
export function loveFacts() {document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.love-facts--list-item');
  
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.style.transitionDelay = `\${0.1 + (index * 0.1)}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px'
  });

  cards.forEach(card => observer.observe(card));
});
}