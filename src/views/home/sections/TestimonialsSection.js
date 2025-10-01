export function TestimonialsSection() {
  return `
    <div class="testimonials-section">
      <h2 class="section-title">Experiencias Inolvidables</h2>
      <div class="testimonials-carousel">
        <div class="testimonial-card active">
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <p class="testimonial-text">"Una experiencia gastronómica excepcional. Cada plato es una obra maestra que combina sabor, presentación y creatividad de manera impecable."</p>
          <p class="testimonial-author">- María González</p>
        </div>
      </div>
    </div>
  `;
}

export function initTestimonialsSection() {
  const testimonials = [
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'Una experiencia gastronómica excepcional. Cada plato es una obra maestra que combina sabor, presentación y creatividad de manera impecable.',
      author: 'María González'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'El ambiente es sofisticado y acogedor, perfecto para ocasiones especiales. La atención al detalle en cada aspecto es simplemente extraordinaria.',
      author: 'Carlos Ramírez'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'Sin duda el mejor restaurante de la ciudad. La calidad de los ingredientes y la técnica culinaria son de primer nivel. Volveremos pronto.',
      author: 'Ana Martínez'
    }
  ];

  let currentIndex = 0;
  const carousel = document.querySelector('.testimonials-carousel');

  if (!carousel) return;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    const testimonial = testimonials[currentIndex];

    carousel.style.opacity = '0';
    carousel.style.transform = 'translateY(20px)';

    setTimeout(() => {
      carousel.innerHTML = `
        <div class="testimonial-card active">
          <div class="stars">${testimonial.stars}</div>
          <p class="testimonial-text">"${testimonial.text}"</p>
          <p class="testimonial-author">- ${testimonial.author}</p>
        </div>
      `;
      carousel.style.opacity = '1';
      carousel.style.transform = 'translateY(0)';
    }, 300);
  }, 5000);
}
