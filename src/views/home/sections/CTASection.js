export function CTASection() {
  return `
    <div class="cta-section">
      <div class="cta-content">
        <h2>Descubre Nuestra Carta</h2>
        <p>Explora una selección de platos preparados con ingredientes frescos y llenos de sabor.</p>
        <button class="cta-button secondary" onclick="window.location.hash='#/carta'">
          <span>Ver Carta Completa</span>
          <div class="button-shine"></div>
        </button>
      </div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
  `;
}

export function initCTASection() {
  const ctaButton = document.querySelector('.cta-section .cta-button');

  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      const rect = ctaButton.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ctaButton.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const floatingShapes = document.querySelectorAll('.cta-section .shape');

        floatingShapes.forEach((shape, index) => {
          const speed = 0.1 + (index * 0.05);
          shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}
