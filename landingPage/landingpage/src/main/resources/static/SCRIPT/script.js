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

// ---------------------------------------------------------------
// ------------------- FUNCIONES AUXILIARES ---------------------

// Contador de tiempo regresivo
function startCountdown() {
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  let hours = 23;
  let minutes = 45;
  let seconds = 30;

  const countdown = setInterval(() => {
    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 23;
      minutes = 59;
      seconds = 59;
    }

    //hoursEl.textContent = hours.toString().padStart(2, '0');
    //minutesEl.textContent = minutes.toString().padStart(2, '0');
    //secondsEl.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

// Iniciar countdown cuando se carga la página
document.addEventListener('DOMContentLoaded', startCountdown);

// Efecto de ripple en el botón
document.getElementById('codeQuestBtn').addEventListener('click', function (e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  this.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// ---------------------------------------------------------------
// ------------------- CONTACTO ------------------

// Animaciones de entrada para elementos
document.addEventListener('DOMContentLoaded', function () {
  // Crear más partículas dinámicamente
  const particlesContainer = document.querySelector('.floating-particles');
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particlesContainer.appendChild(particle);
  }

  // Manejar el envío del formulario
  //const form = document.getElementById('contactForm');
  //const submitButton = document.querySelector('.submit-button');
  //const successMessage = document.getElementById('successMessage');

  /*
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar campos requeridos
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue(
          '--destructive'
        );
        field.focus();
      } else {
        field.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue(
          '--border'
        );
      }
    });

    if (!isValid) {
      return;
    }

    // Simular carga
    submitButton.classList.add('loading');
    submitButton.querySelector('.button-text span:first-child').textContent = 'Enviando...';
    submitButton.querySelector('.button-icon').textContent = '⏳';

    // Simular envío (reemplazar con tu lógica real)
    setTimeout(() => {
      submitButton.classList.remove('loading');
      submitButton.style.display = 'none';
      successMessage.classList.add('show');

      // Opcional: limpiar formulario
      form.reset();

      // Confetti effect (opcional)
      createConfetti();
    }, 2000);
  });

  */
  // Efectos de focus mejorados
  const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.querySelector('.form-label').style.color = getComputedStyle(
        document.documentElement
      )
        .getPropertyValue('--primary')
        .trim();
    });

    input.addEventListener('blur', function () {
      this.parentElement.querySelector('.form-label').style.color = getComputedStyle(
        document.documentElement
      )
        .getPropertyValue('--foreground')
        .trim();
    });

    // Efecto de typing
    input.addEventListener('input', function () {
      if (this.value) {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  // Efecto de confetti
  function createConfetti() {
    const colors = ['#ff5a00', '#f97316', '#facc15', '#10b981'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = Math.random() * 8 + 4 + 'px';
      confetti.style.height = confetti.style.width;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  }

  // Agregar keyframes para confetti
  const style = document.createElement('style');
  style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
  document.head.appendChild(style);
});

// MOSTRAR MENSAJE DE CONFIRMACION}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.display = 'flex'; // Lo muestra automáticamente

    const closeBtn = modal.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});

function mostrarModal() {
  const modal = document.getElementById('successModal');
  modal.style.display = 'flex';
  modal.classList.add('fade-in'); // animación

  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => (modal.style.display = 'none'));

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
}
