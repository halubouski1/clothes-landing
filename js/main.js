import Lenis from './vendor/lenis.js';
import Swiper from './vendor/swiper.js';
import AOS from './vendor/aos.js';

// ── Lenis smooth scroll ───────────────────────────────────────────────────────
window.lenis = new Lenis({
  smoothWheel: true,
  smoothTouch: false,
});

requestAnimationFrame(function raf(time) {
  window.lenis.raf(time);
  requestAnimationFrame(raf);
});

// ── Swiper ────────────────────────────────────────────────────────────────────
new Swiper('.catalog-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  navigation: {
    prevEl: '.catalog-prev',
    nextEl: '.catalog-next',
  },
  pagination: {
    el: '.catalog-pagination',
    clickable: true,
  },
});

new Swiper('.catalog-swiper-mobile', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  loop: true,
  navigation: {
    prevEl: '.catalog-prev-mobile',
    nextEl: '.catalog-next-mobile',
  },
  pagination: {
    el: '.catalog-pagination-mobile',
    clickable: true,
  },
});

// ── Burger / offcanvas ────────────────────────────────────────────────────────
(function () {
  var burger = document.querySelector('.burger');
  var offcanvas = document.querySelector('.offcanvas');
  var offcanvasOverlay = document.querySelector('.offcanvas-overlay');
  var offcanvasClose = document.querySelector('.offcanvas__close');

  function openMenu() {
    offcanvas.classList.add('offcanvas--open');
    offcanvasOverlay.classList.add('offcanvas-overlay--visible');
    burger.setAttribute('aria-expanded', 'true');
    offcanvas.setAttribute('aria-hidden', 'false');
    if (window.lenis) window.lenis.stop();
  }

  function closeMenu() {
    offcanvas.classList.remove('offcanvas--open');
    offcanvasOverlay.classList.remove('offcanvas-overlay--visible');
    burger.setAttribute('aria-expanded', 'false');
    offcanvas.setAttribute('aria-hidden', 'true');
    if (window.lenis) window.lenis.start();
  }

  burger.addEventListener('click', openMenu);
  offcanvasOverlay.addEventListener('click', closeMenu);
  offcanvasClose.addEventListener('click', closeMenu);
  offcanvas.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

// ── AOS ───────────────────────────────────────────────────────────────────────
AOS.init({
  duration: 700,
  offset: 80,
  once: true,
  easing: 'ease-out',
});

// ── Popup ─────────────────────────────────────────────────────────────────────
(function () {
  var popupOverlay = document.querySelector('.popup-overlay');
  var popupClose = document.querySelector('.popup__close');

  function openPopup() {
    popupOverlay.classList.add('popup-overlay--visible');
    if (window.lenis) window.lenis.stop();
  }

  function closePopup() {
    popupOverlay.classList.remove('popup-overlay--visible');
    if (window.lenis) window.lenis.start();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn--primary, .btn--header');
    if (btn && !btn.classList.contains('popup__submit')) {
      e.preventDefault();
      openPopup();
    }
  });

  popupClose.addEventListener('click', closePopup);

  popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) closePopup();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });
})();
