// Enhanced animations and smooth scroll behavior for RunwayML-inspired design
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize theme toggle
  initializeThemeToggle();
  
  // Initialize client logo marquee
  initializeMarquee();
  
  // Initialize reveal animations
  initializeRevealAnimations();
  
  // Initialize other animations
  initializeAnimations();
  
  // Handle smooth scrolling for navigation links
  initializeSmoothScrolling();
  
  // Handle navbar scroll effects
  initializeNavbarEffects();
  
  // Handle mobile menu (if needed for future implementation)
  initializeMobileMenu();
  
  // Initialize hover effects
  initializeHoverEffects();
  
});

// Initialize Theme Toggle with localStorage
function initializeThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme on page load
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    // Update icon and save preference
    if (document.body.classList.contains('light-mode')) {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Initialize client logo marquee
function initializeMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;
  // Duplicate all items once to create a continuous loop
  track.innerHTML += track.innerHTML;
}

// Initialize data-reveal animations
function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    threshold: 0.18,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        // Optionally unobserve after animation
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Initialize fade-in animations
function initializeAnimations() {
  // Create intersection observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // For staggered animations in grids
        if (entry.target.classList.contains('stagger-parent')) {
          const children = entry.target.querySelectorAll('.stagger-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);
  
  // Observe all animated sections
  const animatedSections = document.querySelectorAll(`
    .vision-section,
    .capabilities-section,
    .insights-section,
    .showcase-section,
    .founder-section,
    .projects-section,
    .cta-section
  `);
  
  animatedSections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Observe individual cards for staggered effect
  const cards = document.querySelectorAll(`
    .capability-card,
    .insight-card,
    .project-card
  `);
  
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Add parallax effect to sections
  initializeParallax();
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = 80;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize navbar scroll effects
function initializeNavbarEffects() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove backdrop blur based on scroll position
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Initialize mobile menu functionality (placeholder for future use)
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbarNav = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!mobileMenuToggle || !navbarNav) return;
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navbarNav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navbarNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbarNav.contains(e.target) && 
        !mobileMenuToggle.contains(e.target) && 
        navbarNav.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navbarNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Initialize parallax effects
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('.video-container, .showcase-video');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = element.offsetHeight;
      
      // Only apply parallax when element is in viewport
      if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
        const parallaxSpeed = 0.5;
        const yPos = -(scrolled - elementTop) * parallaxSpeed;
        element.style.transform = `translateY(${yPos * 0.1}px)`;
      }
    });
  }, { passive: true });
}

// Add hover effects for project cards
function initializeProjectHovers() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const thumbnail = card.querySelector('.project-thumbnail img');
    
    card.addEventListener('mouseenter', () => {
      if (thumbnail) {
        thumbnail.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (thumbnail) {
        thumbnail.style.transform = 'scale(1)';
      }
    });
  });
}

// Initialize all hover interactions
function initializeHoverEffects() {
  initializeProjectHovers();
  
  // Capability cards icon rotation
  const capabilityCards = document.querySelectorAll('.capability-card');
  capabilityCards.forEach(card => {
    const icon = card.querySelector('.capability-icon svg');
    
    card.addEventListener('mouseenter', () => {
      if (icon) {
        icon.style.transform = 'rotate(5deg) scale(1.1)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (icon) {
        icon.style.transform = 'rotate(0deg) scale(1)';
      }
    });
  });
}

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.8s ease forwards !important;
  }
  
  .navbar.scrolled {
    background-color: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(24px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
  
  /* Enhanced hover effects */
  .nav-link {
    position: relative;
    overflow: hidden;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  /* Button hover enhancements */
  .btn-outline,
  .btn-primary,
  .btn-hero,
  .cta-button {
    position: relative;
    overflow: hidden;
  }
  
  .btn-outline::before,
  .btn-primary::before,
  .btn-hero::before,
  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.6s ease;
  }
  
  .btn-outline:hover::before,
  .btn-primary:hover::before,
  .btn-hero:hover::before,
  .cta-button:hover::before {
    left: 100%;
  }
  
  /* Video container hover effect */
  .video-container:hover,
  .showcase-video:hover {
    transform: scale(1.01);
    transition: transform 0.4s ease;
  }
  
  /* Stagger animation for cards */
  .stagger-child {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .stagger-child.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Enhanced fade-in */
  .fade-in {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Smooth transitions for all interactive elements */
  a, button, .capability-card, .insight-card, .project-card {
    transition: all 0.3s ease;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    .hero-content,
    .video-container,
    .fade-in,
    .stagger-child {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

document.head.appendChild(style);

// Add performance optimizations
function optimizePerformance() {
  // Lazy load video if supported
  const video = document.querySelector('.video-player');
  if (video && 'loading' in HTMLVideoElement.prototype) {
    video.loading = 'lazy';
  }
  
  // Preload critical fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontPreload.as = 'style';
  document.head.appendChild(fontPreload);
}

// Initialize performance optimizations
optimizePerformance();

// Export functions for potential external use
window.ProLabsAnimations = {
  initializeAnimations,
  initializeSmoothScrolling,
  initializeNavbarEffects,
  initializeHoverEffects,
  initializeParallax
};

// Contact Form Handlers
function initializeContactForms() {
  // Get configuration from config.js
  const config = window.CONTACT_CONFIG || {
    email: { address: 'purequality255@gmail.com', subject: 'New Inquiry from ProLabs Digital Website' },
    whatsapp: { number: '60143646023' }
  };

  // Email Form Handler
  const emailForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Create mailto link using config
      const subject = encodeURIComponent(config.email.subject);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      const mailtoLink = `mailto:${config.email.address}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.style.animation = 'fadeIn 0.5s ease';
      }
      
      // Clear form after 1 second
      setTimeout(() => {
        emailForm.reset();
      }, 1000);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 5000);
    });
  }
  
  // WhatsApp Form Handler
  const whatsappForm = document.getElementById('whatsappForm');
  
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const waName = document.getElementById('waName').value;
      const waPhone = document.getElementById('waPhone').value;
      const waMessage = document.getElementById('waMessage').value;
      
      // Format message
      let formattedMessage = `Hi, I'm ${waName}.`;
      
      if (waPhone) {
        formattedMessage += ` My phone number is ${waPhone}.`;
      }
      
      formattedMessage += ` Here's my inquiry: ${waMessage}`;
      
      // Use WhatsApp number from config
      const whatsappNumber = config.whatsapp.number;
      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappLink, '_blank');
      
      // Clear form after opening WhatsApp
      setTimeout(() => {
        whatsappForm.reset();
      }, 500);
    });
  }
}

// Initialize contact forms when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContactForms);
} else {
  initializeContactForms();
}













