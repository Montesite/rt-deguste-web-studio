document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  var iconMenu = navToggle.querySelector('.icon-menu');
  var iconX = navToggle.querySelector('.icon-x');

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  function closeMobileMenu() {
    navMobile.classList.remove('is-open');
    iconMenu.style.display = '';
    iconX.style.display = 'none';
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMobile.classList.toggle('is-open');
    iconMenu.style.display = isOpen ? 'none' : '';
    iconX.style.display = isOpen ? '' : 'none';
  });

  document.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function () {
      closeMobileMenu();
      var target = document.querySelector(el.getAttribute('data-scroll'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function () {
      var message = 'Olá! Gostaria de mais informações sobre os produtos da RT-Deguste.';
      window.open('https://wa.me/5571993524067?text=' + encodeURIComponent(message), '_blank');
    });
  }

  // Product carousel: autoplay, prev/next, pause on hover
  var carousel = document.getElementById('carousel');
  var track = document.getElementById('carouselTrack');
  var slides = track ? track.children : [];
  var index = 0;
  var autoplayId = null;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 3000);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
  }

  if (carousel && track && slides.length) {
    document.getElementById('carouselNext').addEventListener('click', function () {
      next();
      startAutoplay();
    });
    document.getElementById('carouselPrev').addEventListener('click', function () {
      prev();
      startAutoplay();
    });
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }
});
