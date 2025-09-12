// Animaciones al hacer scroll
const scrollObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.2s';
        entry.target.style.animation = 'FadeIn 0.8s ease-in-out forwards';
      }
    });
  },
  { threshold: 0.1 }
);

// Efectos de hover mejorados para las cards
document.addEventListener('DOMContentLoaded', () => {
  // Observar elementos para animaciones
  document.querySelectorAll('.feature-card, .testimonial-card, .Card').forEach(card => {
    scrollObserver.observe(card);
  });

  // Observar sección de progreso
  const progressSection = document.querySelector('.progress-section');
  if (progressSection) {
    progressObserver.observe(progressSection);
  }

  // Efectos de partículas en hover
  document.querySelectorAll('.Card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Paralaje suave para elementos flotantes
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floating = document.querySelectorAll('.floating-element');

    floating.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });

  // Efecto de escritura continua en el typewriter
  setInterval(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }
  }, 500);

  // Animación de números en las estadísticas
  const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      const increment = target / 100;
      let current = 0;

      const updateNumber = () => {
        if (current < target) {
          current += increment;
          stat.textContent =
            Math.ceil(current) +
            (stat.textContent.includes('+') ? '+' : '') +
            (stat.textContent.includes('%') ? '%' : '');
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = stat.dataset.original || stat.textContent;
        }
      };

      stat.dataset.original = stat.textContent;
      updateNumber();
    });
  };

  // Observar sección de estadísticas
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('stats-section')) {
        animateNumbers();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});
