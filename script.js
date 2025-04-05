// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
});


// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    '.feature-card, .gallery-item, .specs-list'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', animateOnScroll);

