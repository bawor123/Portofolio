// Responsive Navbar (Hamburger Menu)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// =====================
// SKILL BAR + PERSEN
// =====================
document.addEventListener('DOMContentLoaded', function () {

  const fills = document.querySelectorAll('.skill-fill');
  const percentTexts = document.querySelectorAll('.skill-percent');

  // helper: check if element is visible on viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 60;
  }

  // fill bar
  function fillElement(el) {
    const value = el.getAttribute('data-progress') || '0';
    el.style.width = value + '%';
  }

  // animate percentage text
  function animatePercent(el, target) {
    let current = 0;
    const speed = 20;

    const timer = setInterval(() => {
      if (current <= target) {
        el.textContent = current + "%";
        current++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // main check
  function checkAndFill() {
    fills.forEach((bar, index) => {
      if (bar.dataset.filled) return;

      if (isInViewport(bar)) {
        // animasi bar
        fillElement(bar);
        bar.dataset.filled = '1';

        // animasi angka
        const targetNum = parseInt(bar.getAttribute("data-progress"));
        animatePercent(percentTexts[index], targetNum);
      }
    });
  }

  // initial check
  checkAndFill();

  // check on scroll and resize
  window.addEventListener('scroll', checkAndFill);
  window.addEventListener('resize', checkAndFill);
});



// Close mobile nav when link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// Fade-in Animation
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

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  errorName.textContent = '';
  errorEmail.textContent = '';
  errorMessage.textContent = '';
  formSuccess.textContent = '';

  const name = contactForm.name.value.trim();
  if (name.length < 3) {
    errorName.textContent = 'Nama minimal 3 karakter.';
    isValid = false;
  }

  const email = contactForm.email.value.trim();
  if (!validateEmail(email)) {
    errorEmail.textContent = 'Masukkan email yang valid.';
    isValid = false;
  }

  const message = contactForm.message.value.trim();
  if (message.length < 8) {
    errorMessage.textContent = 'Pesan minimal 8 karakter.';
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = 'Pesan berhasil dikirim! (Simulasi)';
    contactForm.reset();
    setTimeout(() => {
      formSuccess.textContent = '';
    }, 4000);
  }
});
