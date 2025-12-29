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
