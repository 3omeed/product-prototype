/**
 * MAIN NAVIGATION FUNCTIONALITY
 * Handles mobile menu toggle and smooth scrolling
 */

// Mobile Navigation Toggle
const initMobileNav = () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    if (!navToggle || !navLinks) return;
  
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  };
  
  // Smooth scrolling for anchor links
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Sticky header on scroll
  const initStickyHeader = () => {
    const header = document.querySelector('.header');
    if (!header) return;
  
    window.addEventListener('scroll', () => {
      header.classList.toggle('sticky', window.scrollY > 0);
    });
  };
  
  /**
   * ANIMATION FUNCTIONS
   * Handles scroll and hover animations
   */
  
  // Initialize Animate On Scroll (AOS) library
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out-quart',
        once: true,
        mirror: false
      });
    }
  };
  
  // Add hover effects to feature cards
  const initFeatureCardAnimations = () => {
    const featureCards = document.querySelectorAll('.feature-card');
  
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.15)';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  };
  
  // Create floating particles in features section
  const createParticles = () => {
    const featuresSection = document.querySelector('.features');
    if (!featuresSection) return;
  
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
  };
  
  /**
   * GALLERY FUNCTIONALITY
   * Handles image gallery with thumbnail navigation
   */
  
  const initGallery = () => {
    const gallery = {
      // Cache DOM elements
      thumbnails: null,
      showcaseImage: null,
      captionText: null,
      captionCounter: null,
  
      // Initialize gallery
      init() {
        this.thumbnails = document.querySelectorAll('.thumbnail-item');
        this.showcaseImage = document.querySelector('.showcase-image');
        this.captionText = document.querySelector('.caption-text');
        this.captionCounter = document.querySelector('.caption-counter');
  
        if (!this.thumbnails.length) return;
  
        this.preloadImages();
        this.setupThumbnailHandlers();
        this.updateGallery(0);
        this.setupKeyboardNavigation();
        this.setupThumbnailDragScroll();
      },
  
      // Preload images for smoother transitions
      preloadImages() {
        document.querySelectorAll('.thumbnail-item img').forEach(img => {
          new Image().src = img.src;
        });
      },
  
      // Set up click handlers for thumbnails
      setupThumbnailHandlers() {
        this.thumbnails.forEach(thumb => {
          thumb.addEventListener('click', e => this.handleThumbnailClick(e));
        });
      },
  
      // Handle thumbnail click events
      handleThumbnailClick(e) {
        const thumbnail = e.currentTarget;
        const index = parseInt(thumbnail.getAttribute('data-index'));
        this.updateGallery(index);
      },
  
      // Update main gallery image
      updateGallery(index) {
        this.updateActiveThumbnail(index);
        this.loadNewImage(index);
      },
  
      // Update active thumbnail styling
      updateActiveThumbnail(index) {
        this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.thumbnails[index].classList.add('active');
      },
  
      // Load and display new main image
      loadNewImage(index) {
        const newImageSrc = this.thumbnails[index]
          .querySelector('img')
          .src.replace('-thumb-', '-hero-');
  
        const newImage = new Image();
        newImage.src = newImageSrc;
        newImage.alt = this.thumbnails[index].querySelector('img').alt;
        newImage.classList.add('showcase-image');
        newImage.loading = 'lazy';
  
        const showcaseInner = document.querySelector('.showcase-inner');
        showcaseInner.appendChild(newImage);
  
        newImage.onload = () => {
          this.transitionToNewImage(newImage);
          this.updateCaption(index);
        };
      },
  
      // Animate transition between images
      transitionToNewImage(newImage) {
        setTimeout(() => {
          document.querySelector('.showcase-image.active')?.classList.remove('active');
          newImage.classList.add('active');
  
          setTimeout(() => {
            const oldImage = document.querySelector('.showcase-image:not(.active)');
            if (oldImage) oldImage.remove();
          }, 500);
        }, 50);
      },
  
      // Update image caption
      updateCaption(index) {
        const captions = [
          'Aerospace-grade aluminum enclosure',
          'Ergonomic curved design',
          '10-layer protective coating',
          'Precision-milled buttons',
          'Nanotextured surface grip',
          'Included accessories'
        ];
  
        this.captionText.textContent = captions[index];
        this.captionCounter.textContent = `${index + 1}/${this.thumbnails.length}`;
      },
  
      // Keyboard navigation for gallery
      setupKeyboardNavigation() {
        document.addEventListener('keydown', e => this.handleKeyboardNav(e));
      },
  
      handleKeyboardNav(e) {
        const currentIndex = parseInt(
          document.querySelector('.thumbnail-item.active').getAttribute('data-index')
        );
        let newIndex;
  
        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % this.thumbnails.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
        } else {
          return;
        }
  
        this.updateGallery(newIndex);
        this.thumbnails[newIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      },
  
      // Draggable thumbnail track for mobile
      setupThumbnailDragScroll() {
        const thumbnailTrack = document.querySelector('.thumbnail-track');
        if (!thumbnailTrack) return;
  
        let isDown = false;
        let startX;
        let scrollLeft;
  
        thumbnailTrack.addEventListener('mousedown', e => {
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
  
        thumbnailTrack.addEventListener('mousemove', e => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - thumbnailTrack.offsetLeft;
          const walk = (x - startX) * 2;
          thumbnailTrack.scrollLeft = scrollLeft - walk;
        });
      }
    };
  
    gallery.init();
  };
  
  /**
   * SPECIFICATIONS SECTION
   * Handles tabs and 3D model interaction
   */
  
  const initSpecsSection = () => {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    if (tabButtons.length && tabPanes.length) {
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          
          // Update active tab
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Show corresponding pane
          tabPanes.forEach(pane => pane.classList.remove('active'));
          document.getElementById(tabId).classList.add('active');
        });
      });
    }
  
    // 3D Rotation Simulation
    const product3d = document.querySelector('.product-3d');
    const rotateButtons = document.querySelectorAll('[data-rotate]');
    
    if (product3d && rotateButtons.length) {
      let rotateY = 0;
  
      rotateButtons.forEach(button => {
        button.addEventListener('click', () => {
          const direction = button.getAttribute('data-rotate');
          
          if (direction === 'y-plus') {
            rotateY += 45;
          } else if (direction === 'y-minus') {
            rotateY -= 45;
          }
          
          product3d.style.transform = `rotateY(${rotateY}deg)`;
          product3d.classList.add('rotating');
          
          setTimeout(() => {
            product3d.classList.remove('rotating');
          }, 1200);
        });
      });
    }
  
    // Parallax effect on desktop
    if (window.innerWidth > 1200) {
      const visualContainer = document.querySelector('.visual-container');
      const visualBase = document.querySelector('.visual-base');
      
      if (visualContainer && visualBase) {
        window.addEventListener('scroll', () => {
          const scrollPosition = window.scrollY;
          const containerOffset = visualContainer.offsetTop;
          const containerHeight = visualContainer.offsetHeight;
          
          if (scrollPosition > containerOffset - window.innerHeight && 
              scrollPosition < containerOffset + containerHeight) {
            const progress = (scrollPosition - containerOffset + window.innerHeight) / 
                            (window.innerHeight + containerHeight);
            const parallaxValue = progress * 20;
            
            visualBase.style.transform = `translateY(${parallaxValue}px)`;
          }
        });
      }
    }
  };
  
  /**
   * INITIALIZE ALL FUNCTIONALITY
   * When the DOM is fully loaded
   */
  
  document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    initMobileNav();
    initSmoothScrolling();
    initStickyHeader();
  
    // Animations
    initAOS();
    initFeatureCardAnimations();
    createParticles();
  
    // Sections
    initGallery();
    initSpecsSection();
  });