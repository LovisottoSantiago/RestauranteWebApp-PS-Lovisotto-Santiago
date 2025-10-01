import { initAnimations, initParallax, initCarousel } from './homeAnimations.js';

export function renderHome() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <div class="home-container">
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

      <div class="features-section">
        <div class="feature-card" data-aos="fade-up" data-delay="0">
          <div class="feature-icon">🍽️</div>
          <h3>Cocina de Autor</h3>
          <p>Ingredientes selectos de temporada preparados con técnicas tradicionales y contemporáneas</p>
          <div class="card-glow"></div>
        </div>
        <div class="feature-card" data-aos="fade-up" data-delay="100">
          <div class="feature-icon">🥂</div>
          <h3>Ambiente Exclusivo</h3>
          <p>Un espacio elegante diseñado para crear momentos memorables con tus seres queridos</p>
          <div class="card-glow"></div>
        </div>
        <div class="feature-card" data-aos="fade-up" data-delay="200">
          <div class="feature-icon">⭐</div>
          <h3>Servicio Premium</h3>
          <p>Atención personalizada que supera expectativas en cada detalle de tu experiencia</p>
          <div class="card-glow"></div>
        </div>
      </div>

      <div class="gallery-section">
        <h2 class="section-title">Nuestras Creaciones</h2>
        <div class="gallery-grid">
          <div class="gallery-item" data-aos="zoom-in">
            <img src="https://malevamag.com/wp-content/uploads/2017/11/Ceviche-cremosos-Puerta-del-Inca.jpg" alt="Entradas Gourmet" class="gallery-img" />
            <div class="gallery-overlay">
              <h4>Entradas</h4>
              <p>Sabores que despiertan el paladar</p>
            </div>
          </div>

          <div class="gallery-item" data-aos="zoom-in" data-delay="100">
            <img src="https://cdn0.matrimonios.cl/article-vendor/8739/original/1280/jpg/gazpacho-de-betarraga-y-verduras_8_148739-1559321340.jpeg" alt="Platos Principales" class="gallery-img" />
            <div class="gallery-overlay">
              <h4>Parrilla</h4>
              <p>El arte de la cocina en su máxima expresión</p>
            </div>
          </div>

          <div class="gallery-item" data-aos="zoom-in" data-delay="200">
            <img src="https://cdn0.matrimonios.cl/article-vendor/8739/original/1280/jpg/gazpacho-de-betarraga-y-verduras_8_148739-1559321340.jpeg" alt="Pastas Frescas" class="gallery-img" />
            <div class="gallery-overlay">
              <h4>Pastas</h4>
              <p>Recetas caseras con tradición italiana</p>
            </div>
          </div>

          <div class="gallery-item" data-aos="zoom-in" data-delay="300">
            <img src="https://cdn0.matrimonios.cl/article-vendor/8739/original/1280/jpg/gazpacho-de-betarraga-y-verduras_8_148739-1559321340.jpeg" alt="Cervezas Artesanales" class="gallery-img" />
            <div class="gallery-overlay">
              <h4>Cervezas Artesanales</h4>
              <p>Variedades únicas para acompañar tu plato</p>
            </div>
          </div>
        </div>
      </div>



      <div class="testimonials-section">
        <h2 class="section-title">Experiencias Inolvidables</h2>
        <div class="testimonials-carousel">
          <div class="testimonial-card active">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"Una experiencia gastronómica excepcional. Cada plato es una obra maestra que combina sabor, presentación y creatividad de manera impecable."</p>
            <p class="testimonial-author">María González</p>
          </div>
        </div>
      </div>

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

    </div>
  `;

  initAnimations();
  initParallax();
  initCarousel();
}
