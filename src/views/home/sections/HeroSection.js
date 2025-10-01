export function HeroSection() {
  return `
    <div class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <div class="logo-animation">
          <h1 class="brand-name">Lovi's</h1>
          <div class="brand-underline"></div>
        </div>
        <p class="hero-subtitle">Una experiencia culinaria excepcional</p>
        <button class="cta-button" onclick="window.location.hash='#/carta'">
          <span>Ver Menú</span>
          <div class="button-shine"></div>
        </button>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <p>Descubre más</p>
      </div>
    </div>
  `;
}

export function initHeroSection() {
  const ctaButton = document.querySelector('.hero-section .cta-button');

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
        const heroBackground = document.querySelector('.hero-background');

        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}
