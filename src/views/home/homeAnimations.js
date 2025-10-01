export function initAnimations() {
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

  document.querySelectorAll('[data-aos]').forEach(el => {
    const delay = el.getAttribute('data-delay') || 0;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });

  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

export function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const floatingShapes = document.querySelectorAll('.shape');

        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

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

export function initCarousel() {
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
