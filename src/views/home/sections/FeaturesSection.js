export function FeaturesSection() {
  return `
    <div class="features-section">
      <div class="feature-card" data-aos="fade-up" data-delay="0">
        <img src="/src/assets/images/cocina-autor.jpg" alt="Cocina de Autor" class="feature-icon-img" />
        <h3>Cocina de Autor</h3>
        <p>Ingredientes selectos de temporada preparados con técnicas tradicionales y contemporáneas</p>
        <div class="card-glow"></div>
      </div>
      <div class="feature-card" data-aos="fade-up" data-delay="100">
        <img src="/src/assets/images/ambiente-exclusivo.jpg" alt="Ambiente Exclusivo" class="feature-icon-img" />
        <h3>Ambiente Exclusivo</h3>
        <p>Un espacio elegante diseñado para crear momentos memorables con tus seres queridos</p>
        <div class="card-glow"></div>
      </div>
      <div class="feature-card" data-aos="fade-up" data-delay="200">
        <img src="/src/assets/images/servicio-premium.jpg" alt="Servicio Premium" class="feature-icon-img" />
        <h3>Servicio Premium</h3>
        <p>Atención personalizada que supera expectativas en cada detalle de tu experiencia</p>
        <div class="card-glow"></div>
      </div>
    </div>
  `;
}

export function initFeaturesSection() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.features-section [data-aos]').forEach(el => {
    const delay = el.getAttribute('data-delay') || 0;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}
