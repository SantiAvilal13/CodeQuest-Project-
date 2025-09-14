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

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
  member.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-15px) scale(1.02)';

    // Animate skill tags
    const skillTags = this.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
      setTimeout(() => {
        tag.style.transform = 'translateY(-2px)';
      }, index * 100);
    });
  });

  member.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';

    // Reset skill tags
    const skillTags = this.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      tag.style.transform = 'translateY(0)';
    });
  });
});

// Experience cards counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(start) + (element.textContent.includes('+') ? '+' : '');
    }
  }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statElement = entry.target.querySelector('.experience-stat');
      const statText = statElement.textContent;
      let targetValue = parseInt(statText);

      if (statText.includes('K')) {
        targetValue = parseInt(statText) * 1000;
      }

      // Reset and animate
      statElement.textContent = '0';
      animateCounter(statElement, targetValue);

      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.experience-card').forEach(card => {
  counterObserver.observe(card);
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

    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;

    element.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  const rate = scrolled * -0.5;

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Dynamic text highlighting
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.innerHTML = text
    .split('')
    .map(char => `<span style="transition: color 0.3s ease;">${char}</span>`)
    .join('');

  heroTitle.addEventListener('mouseover', () => {
    const spans = heroTitle.querySelectorAll('span');
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.color = 'var(--primary)';
        setTimeout(() => {
          span.style.color = '';
        }, 200);
      }, index * 50);
    });
  });
}
