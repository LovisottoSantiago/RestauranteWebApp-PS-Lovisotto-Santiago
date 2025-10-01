export function GallerySection() {
  return `
    <div class="gallery-section">
      <h2 class="section-title">Nuestras Creaciones</h2>
      <div class="gallery-grid">
      
        <div class="gallery-item" data-aos="zoom-in">
          <img src="https://malevamag.com/wp-content/uploads/2017/11/Ceviche-cremosos-Puerta-del-Inca.jpg" alt="Entradas Gourmet" class="gallery-img" />
          <div class="gallery-overlay">
            <div class="overlay-content">
              <h4>Entradas</h4>
              <p>Sabores que despiertan el paladar</p>
            </div>
          </div>
        </div>

        <div class="gallery-item" data-aos="zoom-in" data-delay="100">
          <img src="https://airescriollos.com.ar/wp-content/uploads/2020/10/Best-parrillas-en-buenos-aires.jpg" alt="Platos Principales" class="gallery-img" />
          <div class="gallery-overlay">
            <div class="overlay-content">
              <h4>Parrilla</h4>
              <p>El arte de la cocina en su máxima expresión</p>
            </div>
          </div>
        </div>

        <div class="gallery-item" data-aos="zoom-in" data-delay="200">
          <img src="https://media.ambito.com/p/eeeb0aa8490c86a5ed10e052acb243d0/adjuntos/239/imagenes/039/444/0039444907/pastasjpg.jpg" alt="Pastas Frescas" class="gallery-img" />
          <div class="gallery-overlay">
            <div class="overlay-content">
              <h4>Pastas</h4>
              <p>Recetas caseras con tradición italiana</p>
            </div>
          </div>
        </div>

        <div class="gallery-item" data-aos="zoom-in" data-delay="300">
          <img src="https://st2.depositphotos.com/1328914/7152/i/450/depositphotos_71522437-stock-photo-burgers-at-restaurant-table.jpg" alt="Cervezas Artesanales" class="gallery-img" />
          <div class="gallery-overlay">
            <div class="overlay-content">
              <h4>Cervezas Artesanales</h4>
              <p>Variedades únicas para acompañar tu plato</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initGallerySection() {
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

  document.querySelectorAll('.gallery-section [data-aos]').forEach(el => {
    const delay = el.getAttribute('data-delay') || 0;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}
