// Responsive Navbar (Hamburger Menu)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// assets/js/script.js
document.addEventListener('DOMContentLoaded', function () {
  const fills = document.querySelectorAll('.skill-fill');

  // helper: check if element is visible on viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 60;
  }

  // fill a single element according to data-progress
  function fillElement(el) {
    const value = el.getAttribute('data-progress') || '0%';
    // sanitize value (ensure percentage)
    const percent = value.toString().trim().replace('%','') + '%';
    // set width (this will trigger CSS transition)
    el.style.width = percent;
  }

  // try fill all that are visible now
  function checkAndFill() {
    fills.forEach(el => {
      if (el.dataset.filled) return; // already filled
      if (isInViewport(el) || document.readyState === 'complete') {
        fillElement(el);
        el.dataset.filled = '1';
      }
    });
  }

  // initial check (in case already visible)
  checkAndFill();

  // check on scroll and resize
  window.addEventListener('scroll', checkAndFill);
  window.addEventListener('resize', checkAndFill);
});

/* ================================
   ANIMASI ANGKA PERSENTASE
================================ */
const percentTexts = document.querySelectorAll('.skill-percent');

function animatePercent(el, target) {
  let current = 0;
  const speed = 20; // kecepatan angka

  const timer = setInterval(() => {
    if (current <= target) {
      el.textContent = current + "%";
      current++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

function runPercentAnimation() {
  fills.forEach((bar, index) => {
    if (bar.dataset.filled && !bar.dataset.percentAnimated) {
      let target = parseInt(bar.getAttribute("data-progress"));
      animatePercent(percentTexts[index], target);
      bar.dataset.percentAnimated = "1";
    }
  });
}

window.addEventListener("scroll", runPercentAnimation);
window.addEventListener("DOMContentLoaded", runPercentAnimation);



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