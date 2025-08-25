document.addEventListener('DOMContentLoaded', function() {
    const homeSkeleton = document.getElementById('home-skeleton');
    const homeSection = document.querySelector('.home');
    homeSection.style.display = 'none';
    homeSkeleton.style.display = 'flex';

    window.addEventListener('load', function() {
        homeSkeleton.style.display = 'none';
        homeSection.style.display = 'flex';
    });

    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mobileNav = document.getElementById('mobile-nav');

    hamburgerIcon.addEventListener('click', function() {
        if (mobileNav.style.display === 'flex') {
            mobileNav.style.display = 'none';
        } else {
            mobileNav.style.display = 'flex';
        }
    });
});

const links = document.querySelectorAll('.nav-link');

function activeLink(){
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

// Animate progress bars when skill sections are visible
function animateProgressBars(section) {
    const progressBars = section.querySelectorAll('progress');
    progressBars.forEach(bar => {
        const target = parseInt(bar.getAttribute('value'), 10);
        bar.value = 0;
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
    });
}

function handleSkillSectionAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateProgressBars(entry.target);
            entry.target.classList.add('animated');
        }
    });
}

const skillSections = document.querySelectorAll('.lang-exp, .tech-skills, .framework-libs');
const observer = new IntersectionObserver(handleSkillSectionAnimation, {
    threshold: 0.3
});
skillSections.forEach(section => {
    observer.observe(section);
});

// Prevent downloading of #profile image
const profileImg = document.getElementById('profile');
if (profileImg) {
    profileImg.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    profileImg.setAttribute('draggable', 'false');
    profileImg.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
}

// Previwiew project images in a modal
const projectImages = document.querySelectorAll('.project-preview');
const modal = document.getElementById('image-modal');
const prev_modal = document.getElementById('preview-modal');
projectImages.forEach(img => {
    img.addEventListener('click', function() {
        const src = this.src;
        prev_modal.style.backgroundImage = `url(${src})`;
        modal.style.display = 'flex';
    });
});

