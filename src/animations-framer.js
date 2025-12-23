// ============================================
// FRAMER MOTION ANIMATIONS - Comprehensive Animation Suite
// ============================================

/**
 * Framer Motion Animations using Intersection Observer for scroll triggers
 * and requestAnimationFrame for smooth animations
 */

// ============================================
// ANIMATION UTILITIES
// ============================================

/**
 * Create a fade-in animation
 */
function animateElement(element, options = {}) {
  const {
    duration = 0.8,
    delay = 0,
    x = 0,
    y = 0,
    opacity = 1,
    scale = 1,
    rotate = 0,
    ease = 'easeOut'
  } = options;

  const startTime = Date.now() + delay * 1000;
  const endTime = startTime + duration * 1000;

  element.style.opacity = '0';
  element.style.transform = `translate(${-x}px, ${-y}px) scale(${1 - (1 - scale)}) rotate(${-rotate}deg)`;

  function animate() {
    const now = Date.now();
    let progress = Math.min((now - startTime) / (endTime - startTime), 1);

    if (progress < 0) {
      requestAnimationFrame(animate);
      return;
    }

    // Apply easing function
    const eased = applyEase(progress, ease);

    element.style.opacity = eased;
    element.style.transform = `translate(${-x * (1 - eased)}px, ${-y * (1 - eased)}px) scale(${1 - (1 - scale) * (1 - eased)}) rotate(${-rotate * (1 - eased)}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Apply easing functions
 */
function applyEase(t, ease) {
  const eases = {
    linear: t => t,
    easeIn: t => t * t,
    easeOut: t => t * (2 - t),
    easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOutQuad: t => t * (2 - t),
    easeOutCubic: t => (--t) * t * t + 1,
    backOut: t => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return c3 * t * t * t - c1 * t * t;
    }
  };
  return eases[ease] ? eases[ease](t) : t;
}

/**
 * Stagger animation helper
 */
function animateElementsWithStagger(elements, options = {}) {
  const { stagger = 0.1, ...restOptions } = options;
  
  elements.forEach((el, index) => {
    animateElement(el, {
      ...restOptions,
      delay: (restOptions.delay || 0) + index * stagger
    });
  });
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function observeElementsForAnimation(selector, animationOptions = {}) {
  const elements = document.querySelectorAll(selector);

  const observerOptions = {
    threshold: animationOptions.threshold || 0.3,
    rootMargin: animationOptions.rootMargin || '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateElement(entry.target, animationOptions);
        entry.target.dataset.animated = 'true';
        if (animationOptions.once !== false) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

// ============================================
// 1. HEADER NAVIGATION ANIMATIONS
// ============================================
function animateHeader() {
  const header = document.querySelector('.header');
  const logo = document.querySelector('.logo');
  const navLinks = document.querySelectorAll('.navbar a');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  // Animate header
  animateElement(header, {
    duration: 0.8,
    y: -100,
    opacity: 0,
    ease: 'easeOut'
  });

  // Animate logo
  animateElement(logo, {
    duration: 0.8,
    delay: 0.2,
    x: -50,
    opacity: 0,
    ease: 'easeOut'
  });

  // Animate nav links with stagger
  animateElementsWithStagger(navLinks, {
    duration: 0.6,
    delay: 0.4,
    y: -20,
    opacity: 0,
    stagger: 0.1,
    ease: 'easeOut'
  });

  // Animate hamburger icon
  animateElement(hamburgerIcon, {
    duration: 0.6,
    delay: 0.6,
    scale: 0,
    opacity: 0,
    ease: 'backOut'
  });

  // Add hover animations to nav links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateY(-5px)';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ============================================
// 2. HERO SECTION ANIMATIONS
// ============================================
function animateHeroSection() {
  // Hero content stagger animation
  const h1 = document.querySelector('.home-content h1');
  const h3 = document.querySelector('.home-content h3');
  const p = document.querySelector('.home-content p');
  const socialIcons = document.querySelectorAll('.social-icons a');
  const buttons = document.querySelectorAll('.btn-group .btn');
  const profileImg = document.querySelector('.home-img img');

  animateElement(h1, {
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'easeOut'
  });

  animateElement(h3, {
    duration: 1,
    delay: 0.2,
    x: -100,
    opacity: 0,
    ease: 'easeOut'
  });

  animateElement(p, {
    duration: 1,
    delay: 0.4,
    y: 30,
    opacity: 0,
    ease: 'easeOut'
  });

  animateElementsWithStagger(socialIcons, {
    duration: 0.8,
    delay: 0.6,
    y: 50,
    opacity: 0,
    stagger: 0.15,
    ease: 'backOut'
  });

  animateElementsWithStagger(buttons, {
    duration: 0.8,
    delay: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'backOut'
  });

  animateElement(profileImg, {
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'easeOut'
  });

  // Profile image hover animation
  if (profileImg) {
    profileImg.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s ease';
      this.style.transform = 'scale(1.05)';
    });

    profileImg.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  }
}

// ============================================
// 3. SKELETON LOADER ANIMATIONS
// ============================================
function animateSkeletonLoader() {
  const skeleton = document.getElementById('home-skeleton');
  const skeletonDivs = document.querySelectorAll('.skeleton-content > div, .skeleton-img');

  animateElement(skeleton, {
    duration: 0.5,
    opacity: 0,
    ease: 'easeOut'
  });

  // Pulsing skeleton effect
  function pulse() {
    skeletonDivs.forEach(div => {
      div.style.animation = 'pulse-animation 1.5s ease-in-out infinite';
    });
  }

  pulse();
}

// ============================================
// 4. EDUCATION TIMELINE ANIMATIONS
// ============================================
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    const dot = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content');

    observeElementsForAnimation('.timeline-dot', {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      ease: 'backOut'
    });

    observeElementsForAnimation('.timeline-content', {
      duration: 0.8,
      x: index % 2 === 0 ? 100 : -100,
      opacity: 0,
      ease: 'easeOut'
    });

    // Hover animation
    item.addEventListener('mouseenter', function () {
      dot.style.transition = 'transform 0.3s ease';
      dot.style.transform = 'scale(1.2)';
    });

    item.addEventListener('mouseleave', function () {
      dot.style.transform = 'scale(1)';
    });
  });
}

// ============================================
// 5. PROGRESS BARS ANIMATIONS
// ============================================
function animateProgressBars() {
  const progressBars = document.querySelectorAll('progress');

  progressBars.forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = parseInt(bar.getAttribute('value'), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60)); // ~1s animation
          
          function updateBar() {
            if (current < target) {
              current += step;
              if (current > target) current = target;
              bar.value = current;
              requestAnimationFrame(updateBar);
            } else {
              bar.value = target;
            }
          }
          
          requestAnimationFrame(updateBar);
          entry.target.dataset.animated = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(bar);
  });
}

// ============================================
// 6. SKILL CIRCLES ANIMATIONS
// ============================================
function animateSkillCircles() {
  const circles = document.querySelectorAll('.circle');

  circles.forEach((circle, index) => {
    observeElementsForAnimation('.circle', {
      duration: 0.8,
      delay: index * 0.1,
      scale: 0,
      opacity: 0,
      ease: 'backOut'
    });

    // Rotation animation on scroll
    circle.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s ease';
      this.style.transform = 'scale(1.1) rotate(10deg)';
    });

    circle.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// ============================================
// 7. ARSENAL SECTION ANIMATIONS
// ============================================
function animateArsenal() {
  const sections = document.querySelectorAll('.lang-exp, .tech-skills, .framework-libs');

  sections.forEach((section, index) => {
    observeElementsForAnimation('.lang-exp, .tech-skills, .framework-libs', {
      duration: 0.8,
      delay: index * 0.15,
      y: 50,
      opacity: 0,
      ease: 'easeOut'
    });

    // Add hover lift effect
    section.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s ease';
      this.style.transform = 'translateY(-10px)';
    });

    section.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ============================================
// 8. PROJECT CARDS ANIMATIONS
// ============================================
function animateProjectCards() {
  const projectItems = document.querySelectorAll('.project-item');

  projectItems.forEach((item, index) => {
    observeElementsForAnimation('.project-item', {
      duration: 0.8,
      delay: index * 0.1,
      y: 30,
      opacity: 0,
      ease: 'easeOut'
    });

    // Hover effect for project cards
    item.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateY(-10px)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ============================================
// 9. BUTTON ANIMATIONS
// ============================================
function animateButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });
}

// ============================================
// 10. CONTACT FORM ANIMATIONS
// ============================================
function animateContactForm() {
  const contactSection = document.querySelector('#contact');

  if (contactSection) {
    observeElementsForAnimation('#contact .wrapper', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'easeOut'
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.02)';
      });

      input.addEventListener('blur', function () {
        this.style.transform = 'scale(1)';
      });
    });
  }
}

// ============================================
// 11. BACKGROUND SHAPES ANIMATIONS
// ============================================
function animateBackgroundShapes() {
  const shapes = document.querySelectorAll('.background .shape');

  shapes.forEach((shape, index) => {
    shape.style.animation = `float-animation ${3 + index}s ease-in-out infinite`;
  });
}

// ============================================
// 12. FOOTER ANIMATIONS
// ============================================
function animateFooter() {
  const footer = document.querySelector('footer');

  if (footer) {
    observeElementsForAnimation('footer', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'easeOut'
    });
  }
}

// ============================================
// 13. SECTION HEADINGS ANIMATIONS
// ============================================
function animateSectionHeadings() {
  const headings = document.querySelectorAll('.section-lbl');

  headings.forEach(heading => {
    observeElementsForAnimation('.section-lbl', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      ease: 'easeOut'
    });
  });
}

// ============================================
// 14. MODAL ANIMATIONS
// ============================================
function animateModal() {
  const modal = document.getElementById('image-modal');

  if (modal) {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.8)';

    const observer = new MutationObserver(() => {
      if (modal.classList.contains('preview-modal')) {
        animateElement(modal, {
          duration: 0.3,
          scale: 0.8,
          opacity: 0,
          ease: 'easeOut'
        });
      }
    });

    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
  }
}

// ============================================
// 15. PARALLAX SCROLLING EFFECT
// ============================================
function addParallaxEffect() {
  const homeImg = document.querySelector('.home-img img');

  if (homeImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      homeImg.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
  }

  // Parallax for project images
  const projectImages = document.querySelectorAll('.project-item img');
  projectImages.forEach(img => {
    window.addEventListener('scroll', () => {
      const rect = img.getBoundingClientRect();
      const scrollY = window.scrollY;
      const offsetY = rect.top + scrollY;
      const distance = scrollY - offsetY;
      img.style.transform = `translateY(${distance * 0.3}px)`;
    });
  });
}

// ============================================
// 16. LEGEND ITEMS ANIMATIONS
// ============================================
function animateLegendItems() {
  const legendItems = document.querySelectorAll('.legend li');

  legendItems.forEach((item, index) => {
    observeElementsForAnimation('.legend li', {
      duration: 0.6,
      delay: index * 0.08,
      x: -50,
      opacity: 0,
      ease: 'easeOut'
    });
  });
}

// ============================================
// CSS ANIMATIONS
// ============================================
function injectAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse-animation {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }

    @keyframes float-animation {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(20px); }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slide-in-left {
      from { transform: translateX(-100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slide-in-right {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slide-in-up {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes scale-in {
      from { transform: scale(0); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INITIALIZATION
// ============================================
function initializeAnimations() {
  // Inject animation styles
  injectAnimationStyles();

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAnimations);
  } else {
    startAnimations();
  }
}

function startAnimations() {
  // Run all animations
  animateHeader();
  animateHeroSection();
  animateSkeletonLoader();
  animateTimeline();
  animateProgressBars();
  animateSkillCircles();
  animateArsenal();
  animateProjectCards();
  animateButtons();
  animateContactForm();
  animateBackgroundShapes();
  animateFooter();
  animateSectionHeadings();
  animateModal();
  addParallaxEffect();
  animateLegendItems();

  console.log('✨ All Framer Motion animations initialized successfully!');
}

// Start animations when script loads
initializeAnimations();

// Optional: Refresh animations on window resize
window.addEventListener('resize', () => {
  console.log('Window resized - animations remain active');
});

// Optional: Disable animations on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  console.log('⚠️ Reduced motion preference detected - animations minimized');
}
