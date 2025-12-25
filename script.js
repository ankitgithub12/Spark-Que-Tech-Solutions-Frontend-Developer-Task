

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
      preloader.classList.add('loaded');
  }, 1000);
});

// Initialize Particles.js
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
      particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#4361ee" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
              enable: true,
              distance: 150,
              color: "#4361ee",
              opacity: 0.2,
              width: 1
          },
          move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false
          }
      },
      interactivity: {
          detect_on: "canvas",
          events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
          }
      }
  });
}

// ===== THEME MANAGEMENT =====
const themeToggle = document.querySelector('.settings-toggle');
const themePanel = document.querySelector('.settings-content');
const colorOptions = document.querySelectorAll('.color-option');
const modeButtons = document.querySelectorAll('.mode-btn');
const animationToggle = document.getElementById('animationToggle');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
const savedColor = localStorage.getItem('theme-color') || '#4361ee';
const savedAnimations = localStorage.getItem('animations') !== 'false';

// Apply saved settings
document.documentElement.style.setProperty('--primary-color', savedColor);
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}
if (animationToggle) {
  animationToggle.checked = savedAnimations;
}

// Color picker
colorOptions.forEach(option => {
  if (option.dataset.color === savedColor) {
      option.style.transform = 'scale(1.2)';
      option.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.1)';
  }
  
  option.addEventListener('click', () => {
      const color = option.dataset.color;
      document.documentElement.style.setProperty('--primary-color', color);
      localStorage.setItem('theme-color', color);
      
      // Update UI
      colorOptions.forEach(opt => {
          opt.style.transform = 'scale(1)';
          opt.style.boxShadow = 'none';
      });
      option.style.transform = 'scale(1.2)';
      option.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.1)';
  });
});

// Theme mode
modeButtons.forEach(button => {
  if (button.dataset.mode === savedTheme) {
      button.classList.add('active');
  }
  
  button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      
      // Update UI
      modeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Apply theme
      if (mode === 'dark') {
          document.body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
      } else if (mode === 'light') {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
      } else {
          // Auto mode based on system preference
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.body.classList.add('dark-theme');
          } else {
              document.body.classList.remove('dark-theme');
          }
          localStorage.setItem('theme', 'auto');
      }
  });
});

// Animations toggle
if (animationToggle) {
  animationToggle.addEventListener('change', () => {
      const enabled = animationToggle.checked;
      localStorage.setItem('animations', enabled);
      
      if (!enabled) {
          document.body.classList.add('no-animations');
      } else {
          document.body.classList.remove('no-animations');
      }
  });
}

// ===== MOBILE MENU FUNCTIONALITY =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Create mobile menu
function createMobileMenu() {
  const mobileMenuHTML = `
      <div class="mobile-menu" id="mobileMenu">
          <div class="mobile-menu-header">
              <div class="logo">
                  <i class="fas fa-bolt"></i>
                  <span>Spark Que <strong>Tech</strong></span>
              </div>
              <button class="close-menu" id="closeMenu">
                  <i class="fas fa-times"></i>
              </button>
          </div>
          <div class="mobile-menu-content">
              <a href="#home" class="mobile-nav-link active">
                  <i class="fas fa-home"></i>
                  <span>Home</span>
              </a>
              <a href="#services" class="mobile-nav-link">
                  <i class="fas fa-cogs"></i>
                  <span>Services</span>
              </a>
              <a href="#about" class="mobile-nav-link">
                  <i class="fas fa-star"></i>
                  <span>Why Us</span>
              </a>
              <a href="#portfolio" class="mobile-nav-link">
                  <i class="fas fa-briefcase"></i>
                  <span>Portfolio</span>
              </a>
              <a href="#testimonials" class="mobile-nav-link">
                  <i class="fas fa-comment"></i>
                  <span>Testimonials</span>
              </a>
              <a href="#contact" class="mobile-nav-link">
                  <i class="fas fa-envelope"></i>
                  <span>Contact</span>
              </a>
              
              <div class="mobile-menu-actions">
                  <button class="btn btn-outline" id="mobileDemoBtn">
                      <i class="fas fa-play-circle"></i>
                      Free Demo
                  </button>
                  <button class="btn btn-primary" id="mobileQuoteBtn">
                      Get Quote
                      <i class="fas fa-arrow-right"></i>
                  </button>
              </div>
          </div>
      </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
}

// Initialize mobile menu
createMobileMenu();

// Get mobile menu elements
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const mobileDemoBtn = document.getElementById('mobileDemoBtn');
const mobileQuoteBtn = document.getElementById('mobileQuoteBtn');

// Mobile menu toggle
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
}

// Close mobile menu
if (closeMenu && mobileMenu) {
  closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
}

// Close mobile menu when clicking on links
if (mobileLinks) {
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
          
          // Update active link
          mobileLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
      });
  });
}

// Mobile button functionality
if (mobileDemoBtn) {
  mobileDemoBtn.addEventListener('click', () => {
      const videoModal = document.getElementById('videoModal');
      if (videoModal) {
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
      if (mobileMenu) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'hidden';
      }
  });
}

if (mobileQuoteBtn) {
  mobileQuoteBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = contactSection.offsetTop - headerHeight;
          
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
      if (mobileMenu) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      if (backToTop) backToTop.classList.add('visible');
  } else {
      navbar.classList.remove('scrolled');
      if (backToTop) backToTop.classList.remove('visible');
  }
  
  // Update active navigation links on scroll
  const sections = document.querySelectorAll('section');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  let current = '';
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
      }
  });
  
  // Update all nav links
  allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
      }
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('[data-count]');
const animationDuration = 2000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);

const easeOut = t => t * (2 - t);

const startCounters = () => {
  counters.forEach(counter => {
      let frame = 0;
      const countTo = parseInt(counter.dataset.count, 10);
      const counterElement = counter;
      
      const updateCounter = () => {
          frame++;
          const progress = easeOut(frame / totalFrames);
          const currentCount = Math.round(countTo * progress);
          
          if (parseInt(counterElement.innerText, 10) !== currentCount) {
              counterElement.innerText = currentCount;
          }
          
          if (frame < totalFrames) {
              requestAnimationFrame(updateCounter);
          }
      };
      
      // Start counter when element is in viewport
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  updateCounter();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
  });
};

// ===== INITIALIZE SWIPER =====
let testimonialSwiper;
if (typeof Swiper !== 'undefined') {
  testimonialSwiper = new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
          delay: 5000,
          disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      breakpoints: {
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          }
      }
  });
}

// ===== PORTFOLIO FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Filter items
          const filterValue = button.dataset.filter;
          
          portfolioItems.forEach(item => {
              if (filterValue === 'all' || item.dataset.category === filterValue) {
                  item.style.display = 'block';
                  setTimeout(() => {
                      item.style.opacity = '1';
                      item.style.transform = 'scale(1)';
                  }, 10);
              } else {
                  item.style.opacity = '0';
                  item.style.transform = 'scale(0.8)';
                  setTimeout(() => {
                      item.style.display = 'none';
                  }, 300);
              }
          });
      });
  });
}

// ===== MODAL FUNCTIONALITY =====
const videoModal = document.getElementById('videoModal');
const successModal = document.getElementById('successModal');
const watchVideoBtn = document.getElementById('watchVideo');
const closeModalBtns = document.querySelectorAll('.close-modal');
const closeSuccessModalBtn = document.getElementById('closeSuccessModal');

// Video modal
if (watchVideoBtn && videoModal) {
  watchVideoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
}

// Demo button functionality
const demoBtn = document.getElementById('demoBtn');
if (demoBtn && videoModal) {
  demoBtn.addEventListener('click', () => {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
}

// Close modals
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      if (videoModal) videoModal.classList.remove('active');
      if (successModal) successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
});

if (closeSuccessModalBtn && successModal) {
  closeSuccessModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
}

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (videoModal && e.target === videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
  }
  if (successModal && e.target === successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
  }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
          if (!field.value.trim()) {
              isValid = false;
              field.style.borderColor = 'var(--danger-color)';
          } else {
              field.style.borderColor = 'var(--gray-200)';
          }
      });
      
      if (!isValid) {
          alert('Please fill in all required fields.');
          return;
      }
      
      // Simulate form submission
      console.log('Form submitted:', data);
      
      // Show success modal
      if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
      
      // Reset form
      contactForm.reset();
  });
}

// ===== TYPEWRITER EFFECT =====
const typewriter = document.querySelector('.typewriter h2');
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = '';
  
  let i = 0;
  const type = () => {
      if (i < text.length) {
          typewriter.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
      }
  };
  
  // Start typing when element is in viewport
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              type();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  
  observer.observe(typewriter);
}

// ===== QUOTE BUTTONS =====
const quoteBtn = document.getElementById('quoteBtn');
const startProjectBtn = document.getElementById('startProject');

const handleQuoteClick = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
      const headerHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
      });
  }
};

if (quoteBtn) quoteBtn.addEventListener('click', handleQuoteClick);
if (startProjectBtn) startProjectBtn.addEventListener('click', handleQuoteClick);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
  });
});

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  startCounters();
  
  // Add animation classes to elements
  const animatedElements = document.querySelectorAll('.service-card, .feature-item, .portfolio-item');
  animatedElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
  });
});
