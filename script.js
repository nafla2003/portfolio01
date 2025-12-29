// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
  htmlElement.classList.add('dark');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
  const isDarkMode = htmlElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  
  if (isDarkMode) {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuIcon.style.display = menuIcon.style.display === 'none' ? 'block' : 'none';
  closeIcon.style.display = closeIcon.style.display === 'none' ? 'none' : 'block';
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  });
});

// Scroll to Section Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav.classList.remove('active');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  }
}

// Logo click to home
document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  scrollToSection('home');
});


// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
  const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        break;
      }
    }
  }
});

// Download Resume
function downloadResume() {
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'Fathima_Nafla_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Anime.js per-letter animation for the hero sentence
try {
  var textWrapper = document.querySelector('.ml2');
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    if (window.anime) {
      anime.timeline({loop: true})
        .add({
          targets: '.ml2 .letter',
          scale: [4,1],
          opacity: [0,1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 950,
          delay: function(el, i) { return 70 * i; }
        }).add({
          targets: '.ml2',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000
        });
    }
  }
} catch (e) {
  console.warn('Anime initialization failed:', e);
}

// Add Video Background
const videoBg = document.createElement('video');
videoBg.src = 'https://assets.mixkit.co/videos/110/110-720.mp4';
videoBg.autoplay = true;
videoBg.loop = true;
videoBg.muted = true;
videoBg.playsInline = true;
videoBg.style.position = 'fixed';
videoBg.style.top = '0';
videoBg.style.left = '0';
videoBg.style.width = '100%';
videoBg.style.height = '100%';
videoBg.style.objectFit = 'cover';
videoBg.style.zIndex = '-1';
document.body.prepend(videoBg);
