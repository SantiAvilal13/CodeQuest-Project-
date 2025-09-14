// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Enhanced card hover effects
document.querySelectorAll('.gamification-card, .uvp-feature, .methodology-item').forEach(card => {
  card.addEventListener('mouseenter', function () {
    const icon = this.querySelector('.card-icon, .feature-icon, .methodology-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
    }
  });

  card.addEventListener('mouseleave', function () {
    const icon = this.querySelector('.card-icon, .feature-icon, .methodology-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }
  });
});

// Journey step animations
document.querySelectorAll('.journey-step').forEach((step, index) => {
  step.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-15px) scale(1.05)';

    // Animate step number
    const stepNumber = this.querySelector('.step-number');
    stepNumber.style.transform = 'translateX(-50%) scale(1.2)';
    stepNumber.style.background = 'var(--accent)';
  });

  step.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';

    // Reset step number
    const stepNumber = this.querySelector('.step-number');
    stepNumber.style.transform = 'translateX(-50%) scale(1)';
    stepNumber.style.background = 'var(--primary)';
  });
});

// Floating elements enhanced animation
document.querySelectorAll('.floating-element').forEach((element, index) => {
  // Add random delays and speeds
  element.style.animationDelay = `${Math.random() * 5}s`;
  element.style.animationDuration = `${15 + Math.random() * 10}s`;

  // Add mouse follow effect
  document.addEventListener('mousemove', e => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.05;
    const deltaY = (e.clientY - centerY) * 0.05;

    element.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  const rate = scrolled * -0.3;

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Button click effects
document.querySelectorAll('.hero-btn, .final-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = e.offsetX - 10 + 'px';
    ripple.style.top = e.offsetY - 10 + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';

    this.style.position = 'relative';
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
