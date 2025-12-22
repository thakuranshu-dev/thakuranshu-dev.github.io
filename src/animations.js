// ============================================
// GSAP ANIMATIONS - Comprehensive Animation Suite
// ============================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. HEADER NAVIGATION ANIMATIONS
// ============================================
function animateHeader() {
  // Animate header on page load
  gsap.from('.header', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Animate logo
  gsap.from('.logo', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  });

  // Animate nav links with stagger
  gsap.from('.navbar a', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.4,
    ease: 'power2.out'
  });

  // Animate hamburger icon
  gsap.from('#hamburger-icon', {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    delay: 0.6,
    ease: 'back.out'
  });

  // Add hover animation to nav links
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      gsap.to(this, {
        color: 'var(--main-color)',
        duration: 0.3,
        overwrite: 'auto'
      });
    });

    link.addEventListener('mouseleave', function () {
      if (!this.classList.contains('active')) {
        gsap.to(this, {
          color: 'var(--text-color)',
          duration: 0.3,
          overwrite: 'auto'
        });
      }
    });
  });
}

// ============================================
// 2. HERO SECTION ANIMATIONS
// ============================================
function animateHeroSection() {
  // Hero content stagger animation
  gsap.from('.home-content h1', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.home-content h3', {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.home-content p', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'power2.out'
  });

  // Social icons animation
  gsap.from('.social-icons a', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.6,
    ease: 'back.out'
  });

  // Button group animation
  gsap.from('.btn-group .btn', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.8,
    ease: 'back.out'
  });

  // Profile image animation
  gsap.from('.home-img img', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Profile image hover animation
  const profileImg = document.querySelector('.home-img img');
  if (profileImg) {
    profileImg.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.05,
        boxShadow: '0 0 50px var(--main-color)',
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    profileImg.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }
}

// ============================================
// 3. SKELETON LOADER ANIMATIONS
// ============================================
function animateSkeletonLoader() {
  gsap.from('#home-skeleton', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });

  // Pulsing skeleton effect
  gsap.to('.skeleton-content > div, .skeleton-img', {
    opacity: 0.7,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// ============================================
// 4. EDUCATION TIMELINE ANIMATIONS
// ============================================
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    // Animate timeline dot
    gsap.from(item.querySelector('.timeline-dot'), {
      scrollTrigger: {
        trigger: item,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out'
    });

    // Animate timeline content
    gsap.from(item.querySelector('.timeline-content'), {
      scrollTrigger: {
        trigger: item,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      x: index % 2 === 0 ? 100 : -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Add hover animation
    item.addEventListener('mouseenter', function () {
      gsap.to(this.querySelector('.timeline-content'), {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    item.addEventListener('mouseleave', function () {
      gsap.to(this.querySelector('.timeline-content'), {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// 5. PROGRESS BARS ANIMATIONS
// ============================================
function animateProgressBars() {
  const progressBars = document.querySelectorAll('progress');

  progressBars.forEach(bar => {
    gsap.from(bar, {
      scrollTrigger: {
        trigger: bar.parentElement,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      value: 0,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function () {
        bar.value = this.progress() * parseInt(bar.getAttribute('value'));
      }
    });
  });
}

// ============================================
// 6. SKILL CIRCLES ANIMATIONS
// ============================================
function animateSkillCircles() {
  const circles = document.querySelectorAll('.circle');

  circles.forEach((circle, index) => {
    gsap.from(circle, {
      scrollTrigger: {
        trigger: circle,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'back.out'
    });

    // Rotation animation on scroll
    gsap.to(circle, {
      scrollTrigger: {
        trigger: circle,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      rotation: 360,
      duration: 2,
      ease: 'none'
    });

    // Hover animation
    circle.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    circle.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// 7. ARSENAL SECTION ANIMATIONS
// ============================================
function animateArsenal() {
  const sections = document.querySelectorAll('.lang-exp, .tech-skills, .framework-libs');

  sections.forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top center+=150',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power2.out'
    });

    // Add hover lift effect
    section.addEventListener('mouseenter', function () {
      gsap.to(this, {
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 255, 238, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    section.addEventListener('mouseleave', function () {
      gsap.to(this, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Animate individual pie charts (frameworks)
  const pieCharts = document.querySelectorAll('.pie');
  pieCharts.forEach((pie, index) => {
    gsap.from(pie, {
      scrollTrigger: {
        trigger: pie,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.08,
      ease: 'back.out'
    });

    // Rotate pie chart on scroll
    gsap.to(pie, {
      scrollTrigger: {
        trigger: pie,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      rotation: 360,
      duration: 2,
      ease: 'none'
    });

    // Hover animation for pies
    pie.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.15,
        filter: 'brightness(1.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    pie.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// 8. PROJECT CARDS ANIMATIONS
// ============================================
function animateProjectCards() {
  const projectItems = document.querySelectorAll('.project-item');

  projectItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top center+=150',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: (index % 3) * 0.15,
      ease: 'power2.out'
    });

    // Image scale on scroll
    const img = item.querySelector('img');
    gsap.to(img, {
      scrollTrigger: {
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      scale: 1.1,
      ease: 'none'
    });

    // Card hover animation
    item.addEventListener('mouseenter', function () {
      gsap.to(this, {
        y: -15,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(img, {
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(this.querySelector('h3'), {
        color: 'var(--main-color)',
        duration: 0.3
      });
    });

    item.addEventListener('mouseleave', function () {
      gsap.to(this, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(img, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(this.querySelector('h3'), {
        color: 'var(--text-color)',
        duration: 0.3
      });
    });
  });
}

// ============================================
// 9. BUTTON ANIMATIONS
// ============================================
function animateButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    // Hover animation
    btn.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out'
      });

      // Glow effect
      gsap.to(this, {
        boxShadow: '0 0 30px var(--main-color)',
        duration: 0.3
      });
    });

    btn.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Click animation
    btn.addEventListener('click', function (e) {
      if (this.classList.contains('visit-project')) {
        return; // Skip for external links
      }

      gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    });
  });
}

// ============================================
// 10. CONTACT FORM ANIMATIONS
// ============================================
function animateContactForm() {
  const contactSection = document.querySelector('#contact');

  if (contactSection) {
    gsap.from(contactSection, {
      scrollTrigger: {
        trigger: contactSection,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animate form title
    gsap.from('#contact h2', {
      scrollTrigger: {
        trigger: contactSection,
        start: 'top center+=150',
        toggleActions: 'play none none reverse'
      },
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animate form wrapper
    gsap.from('#contact .wrapper', {
      scrollTrigger: {
        trigger: contactSection,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out'
    });

    // Form input focus animation
    const inputs = document.querySelectorAll('#contact input, #contact textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        gsap.to(this, {
          scale: 1.02,
          backgroundColor: 'rgba(255,255,255,0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      input.addEventListener('blur', function () {
        gsap.to(this, {
          scale: 1,
          backgroundColor: 'rgba(255,255,255,0.07)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Submit button animation
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        if (this.type === 'submit') {
          gsap.to(this, {
            scale: 0.95,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
          });
        }
      });
    }
  }
}

// ============================================
// 11. BACKGROUND SHAPES ANIMATIONS
// ============================================
function animateBackgroundShapes() {
  const shapes = document.querySelectorAll('.background .shape');

  shapes.forEach((shape, index) => {
    // Floating animation
    gsap.to(shape, {
      y: 30,
      duration: 3 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Scale pulse on scroll
    gsap.to(shape, {
      scrollTrigger: {
        trigger: shape,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      scale: 1.2,
      opacity: 0.8,
      ease: 'none'
    });
  });
}

// ============================================
// 12. FOOTER ANIMATIONS
// ============================================
function animateFooter() {
  const footer = document.querySelector('footer');

  if (footer) {
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animate footer links
    const footerLinks = footer.querySelectorAll('a');
    footerLinks.forEach(link => {
      link.addEventListener('mouseenter', function () {
        gsap.to(this, {
          color: 'var(--main-color)',
          duration: 0.3
        });
      });

      link.addEventListener('mouseleave', function () {
        gsap.to(this, {
          color: 'var(--text-color)',
          duration: 0.3
        });
      });
    });
  }
}

// ============================================
// 13. SECTION HEADINGS ANIMATIONS
// ============================================
function animateSectionHeadings() {
  const headings = document.querySelectorAll('.section-lbl');

  headings.forEach(heading => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top center+=150',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Underline animation
    const style = window.getComputedStyle(heading);
    const textDecoration = style.textDecoration;

    if (textDecoration.includes('underline')) {
      gsap.from(heading, {
        backgroundPosition: '100% 0',
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: heading,
          start: 'top center+=150',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
}

// ============================================
// 14. MODAL ANIMATIONS
// ============================================
function animateModal() {
  const modal = document.getElementById('image-modal');

  if (modal) {
    // Modal open animation
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (modal.classList.contains('preview-modal')) {
          gsap.to(modal, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out'
          });
        } else {
          gsap.to(modal, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
          });
        }
      });
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

// ============================================
// 15. PARALLAX SCROLLING EFFECT
// ============================================
function addParallaxEffect() {
  const homeImg = document.querySelector('.home-img img');

  if (homeImg) {
    gsap.to(homeImg, {
      scrollTrigger: {
        trigger: '.home',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      y: -50,
      ease: 'none'
    });
  }

  // Parallax for project images
  const projectImages = document.querySelectorAll('.project-item img');
  projectImages.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.closest('.project-item'),
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      y: -20,
      ease: 'none'
    });
  });
}

// ============================================
// 16. STAGGER ANIMATIONS FOR LISTS
// ============================================
function animateLegendItems() {
  const legendItems = document.querySelectorAll('.legend li');

  gsap.from(legendItems, {
    scrollTrigger: {
      trigger: '.legend',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out'
  });
}

// ============================================
// INITIALIZATION
// ============================================
function initializeAnimations() {
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

  console.log('✨ All GSAP animations initialized successfully!');
}

// Start animations when script loads
initializeAnimations();

// Optional: Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
});

// Optional: Disable animations on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0.5);
}
