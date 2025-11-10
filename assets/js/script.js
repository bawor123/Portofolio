// Responsive Navbar (Hamburger Menu)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Fade-in Animation on Scroll
function revealOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => {
    const elemTop = el.getBoundingClientRect().top;
    const vh = window.innerHeight;
    if (elemTop < vh - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorMessage = document.getElementById('error-message');
const formSuccess = document.getElementById('formSuccess');

// Simple email validation regex
function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  // Clear messages
  errorName.textContent = '';
  errorEmail.textContent = '';
  errorMessage.textContent = '';
  formSuccess.textContent = '';

  // Name Validation
  const name = contactForm.name.value.trim();
  if (name.length < 3) {
    errorName.textContent = 'Nama minimal 3 karakter.';
    isValid = false;
  }

  // Email Validation
  const email = contactForm.email.value.trim();
  if (!validateEmail(email)) {
    errorEmail.textContent = 'Masukkan email yang valid.';
    isValid = false;
  }

  // Message Validation
  const message = contactForm.message.value.trim();
  if (message.length < 8) {
    errorMessage.textContent = 'Pesan minimal 8 karakter.';
    isValid = false;
  }

  // If valid, simulate sending
  if (isValid) {
    formSuccess.textContent = 'Pesan berhasil dikirim! (Simulasi)';
    contactForm.reset();
    setTimeout(() => {
      formSuccess.textContent = '';
    }, 4000);
  }
});