document.addEventListener('DOMContentLoaded', function () {
  const homeSkeleton = document.getElementById('home-skeleton');
  const homeSection = document.querySelector('.home');
  homeSection.style.display = 'none';
  homeSkeleton.style.display = 'flex';

  window.addEventListener('load', function () {
    homeSkeleton.style.display = 'none';
    homeSection.style.display = 'flex';
  });

  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNav = document.getElementById('mobile-nav');

  hamburgerIcon.addEventListener('click', function () {
    if (mobileNav.style.display === 'flex') {
      mobileNav.style.display = 'none';
    } else {
      mobileNav.style.display = 'flex';
    }
  });
});

const links = document.querySelectorAll('.nav-link');

function activeLink() {
  links.forEach((item) =>
    item.classList.remove('active'));

  this.classList.add('active');
}

links.forEach((item) =>
  item.addEventListener('click', activeLink));

const bioParagraphs = document.querySelectorAll('.bio-para');
let randoomIndex = Math.floor(Math.random() * bioParagraphs.length);
bioParagraphs.forEach((para, index) => {
  para.classList.remove('show');
});
bioParagraphs[randoomIndex].classList.add('show');

// Prevent downloading of #profile image
const profileImg = document.getElementById('profile');
if (profileImg) {
  profileImg.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  profileImg.setAttribute('draggable', 'false');
  profileImg.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });
}

// Preview project images in a modal
const projectImages = document.querySelectorAll('.project-preview');
const modal = document.getElementById('image-modal');
const previewModal = document.getElementById('preview-modal');
const closeBtn = document.getElementById('close-btn');

projectImages.forEach(img => {
  img.addEventListener('click', function (e) {
    e.preventDefault();
    const src = this.src;
    previewModal.style.backgroundImage = `url(${src})`;
    modal.classList.add('preview-modal');
  });
});

// Close modal on close button click
if (closeBtn) {
  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    modal.classList.remove('preview-modal');
    previewModal.style.backgroundImage = '';
  });
}

// Close modal when clicking outside the image
modal.addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('preview-modal');
    previewModal.style.backgroundImage = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('preview-modal')) {
    modal.classList.remove('preview-modal');
    previewModal.style.backgroundImage = '';
  }
});

