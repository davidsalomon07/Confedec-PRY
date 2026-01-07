// core/main.js
// Minimal, production-ready JS for homepage and dropdown behavior

// No debug logs in production


document.addEventListener('DOMContentLoaded', () => {
  console.log('Core main.js loaded');

  // Preload hero image so it's ready
  const img = new Image();
  img.src = '/static/core/img/banner.svg';

  // Ensure header, hero and menu visible
  const header = document.querySelector('header');
  if (header) { header.style.opacity = '1'; header.style.transform = 'none'; }

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.backgroundImage = "url('/static/core/img/banner.svg')";
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }

  // Hide old side menu if present
  const menu = document.querySelector('.menu-lateral');
  if (menu) menu.style.display = 'none';

  // Apply footer banner background from data attribute (avoids template in CSS)
  const footerRight = document.querySelector('.footer-right');
  if (footerRight && footerRight.dataset.banner) {
    footerRight.style.backgroundImage = `url('${footerRight.dataset.banner}')`;
    footerRight.style.backgroundSize = 'cover';
    footerRight.style.backgroundPosition = 'center';
  }

  // Login dropdown toggle and close behavior
  const loginToggle = document.getElementById('loginToggle');
  const loginMenu = document.getElementById('loginMenu');

  function closeLoginMenu() {
    if (loginMenu) loginMenu.classList.remove('show');
    if (loginToggle) loginToggle.setAttribute('aria-expanded', 'false');
  }

  if (loginToggle && loginMenu) {
    loginToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = loginMenu.classList.toggle('show');
      loginToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        const first = loginMenu.querySelector('.dropdown-item');
        if (first) first.focus();
      }
    });

    // allow keyboard activation (Enter / Space) on the toggle
    loginToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loginToggle.click();
      }
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!loginMenu.contains(e.target) && e.target !== loginToggle) closeLoginMenu();
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLoginMenu();
    });

    // close if focusing outside
    document.addEventListener('focusin', (e) => {
      if (!loginMenu.contains(e.target) && e.target !== loginToggle) closeLoginMenu();
    });
  }
});
