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

// Required JS for animations (include AOS library)
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-quart',
    once: true,
    mirror: false,
  });

  // Hover animation enhancement
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // Dynamic background particles (optional)
  const featuresSection = document.querySelector('.features');
  if (featuresSection) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      featuresSection.appendChild(particle);
    }
  }
});

// gallery
document.addEventListener('DOMContentLoaded', function () {
  const gallery = {
    init() {
      this.thumbnails = document.querySelectorAll('.thumbnail-item');
      this.showcaseImage = document.querySelector('.showcase-image');
      this.captionText = document.querySelector('.caption-text');
      this.captionCounter = document.querySelector('.caption-counter');

      // Preload images for smoother transitions
      this.preloadImages();

      // Set up thumbnail click handlers
      this.thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', this.handleThumbnailClick.bind(this));
      });

      // Initialize first image
      this.updateGallery(0);

      // Optional: Add keyboard navigation
      document.addEventListener('keydown', this.handleKeyboardNav.bind(this));
    },

    preloadImages() {
      const images = document.querySelectorAll('.thumbnail-item img');
      images.forEach((img) => {
        new Image().src = img.src;
      });
    },

    handleThumbnailClick(e) {
      const thumbnail = e.currentTarget;
      const index = parseInt(thumbnail.getAttribute('data-index'));

      this.updateGallery(index);
    },

    updateGallery(index) {
      // Update active states
      this.thumbnails.forEach((thumb) => {
        thumb.classList.remove('active');
      });
      this.thumbnails[index].classList.add('active');

      // Get new image source
      const newImageSrc = this.thumbnails[index]
        .querySelector('img')
        .src.replace('-thumb-', '-hero-');

      // Create new image element
      const newImage = document.createElement('img');
      newImage.src = newImageSrc;
      newImage.alt = this.thumbnails[index].querySelector('img').alt;
      newImage.classList.add('showcase-image');
      newImage.loading = 'lazy';

      // Add to DOM
      const showcaseInner = document.querySelector('.showcase-inner');
      showcaseInner.appendChild(newImage);

      // Wait for new image to load
      newImage.onload = () => {
        // Fade in new image
        setTimeout(() => {
          document
            .querySelector('.showcase-image.active')
            .classList.remove('active');
          newImage.classList.add('active');

          // Remove old image after transition
          setTimeout(() => {
            const oldImage = showcaseInner.querySelector(
              '.showcase-image:not(.active)'
            );
            if (oldImage) oldImage.remove();
          }, 500);
        }, 50);

        // Update caption
        this.updateCaption(index);
      };
    },

    updateCaption(index) {
      const captions = [
        'Aerospace-grade aluminum enclosure',
        'Ergonomic curved design',
        '10-layer protective coating',
        'Precision-milled buttons',
        'Nanotextured surface grip',
        'Included accessories',
      ];

      this.captionText.textContent = captions[index];
      this.captionCounter.textContent = `${index + 1}/${
        this.thumbnails.length
      }`;
    },

    handleKeyboardNav(e) {
      const currentIndex = parseInt(
        document
          .querySelector('.thumbnail-item.active')
          .getAttribute('data-index')
      );
      let newIndex;

      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % this.thumbnails.length;
      } else if (e.key === 'ArrowLeft') {
        newIndex =
          (currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
      } else {
        return;
      }

      this.updateGallery(newIndex);
      this.thumbnails[newIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
  };

  // Initialize gallery
  gallery.init();

  // Optional: Add smooth scroll for thumbnails
  const thumbnailTrack = document.querySelector('.thumbnail-track');
  let isDown = false;
  let startX;
  let scrollLeft;

  thumbnailTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - thumbnailTrack.offsetLeft;
    scrollLeft = thumbnailTrack.scrollLeft;
  });

  thumbnailTrack.addEventListener('mouseleave', () => {
    isDown = false;
  });

  thumbnailTrack.addEventListener('mouseup', () => {
    isDown = false;
  });

  thumbnailTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - thumbnailTrack.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailTrack.scrollLeft = scrollLeft - walk;
  });
});








// Specs Section JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Update active tab
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Show corresponding pane
      tabPanes.forEach((pane) => pane.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });

  // 3D Rotation Simulation
  const product3d = document.querySelector('.product-3d');
  const rotateButtons = document.querySelectorAll('[data-rotate]');
  let rotateY = 0;

  rotateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.getAttribute('data-rotate');

      if (direction === 'y-plus') {
        rotateY += 45;
      } else if (direction === 'y-minus') {
        rotateY -= 45;
      }

      product3d.style.transform = `rotateY(${rotateY}deg)`;

      // Add temporary class for animation
      product3d.classList.add('rotating');
      setTimeout(() => {
        product3d.classList.remove('rotating');
      }, 1200);
    });
  });

  // Highlight corresponding spec when hovering 3D model parts
  const specItems = document.querySelectorAll('.spec-item');

  // This would be connected to actual 3D model parts in a real implementation
  specItems.forEach((item) => {
    const highlight = item.getAttribute('data-highlight');

    item.addEventListener('mouseenter', () => {
      // In a real implementation, this would highlight parts of the 3D model
      console.log(`Highlighting ${highlight} on 3D model`);
    });
  });

  // Parallax effect on scroll
  if (window.innerWidth > 1200) {
    const visualContainer = document.querySelector('.visual-container');
    const visualBase = document.querySelector('.visual-base');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const containerOffset = visualContainer.offsetTop;
      const containerHeight = visualContainer.offsetHeight;

      // Only animate when in view
      if (
        scrollPosition > containerOffset - window.innerHeight &&
        scrollPosition < containerOffset + containerHeight
      ) {
        const progress =
          (scrollPosition - containerOffset + window.innerHeight) /
          (window.innerHeight + containerHeight);
        const parallaxValue = progress * 20;

        visualBase.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }
});
