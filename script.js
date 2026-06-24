/*
 * Основной JavaScript для сайта ВайбЗмест
 *
 * Отвечает за:
 *  - появление секций и элементов при прокрутке
 *  - работу бургер‑меню на мобильных устройствах
 *  - подстановку ссылок на корпоративный курс и Telegram
 *  - sticky‑навигацию и мягкий параллакс на первом экране
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const hero = document.querySelector('.hero');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  const revealTargets = document.querySelectorAll('.scroll-section, .reveal-item');

  // Бургер‑меню
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (navLinks && navbar && navToggle) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky‑навигация и фоновый параллакс от скролла
  const updateOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', scrollY > 18);
    }

    if (hero) {
      hero.style.setProperty('--hero-scroll', `${Math.min(scrollY, 600)}px`);
    }
  };

  updateOnScroll();
  window.addEventListener('scroll', updateOnScroll, { passive: true });

  // Анимации появления секций и внутренних карточек
  revealTargets.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 0.06, 0.32)}s`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -6% 0px' }
  );

  revealTargets.forEach((element) => observer.observe(element));

  // Подстановка ссылок
  const courseUrl = 'https://pedfund.github.io/AI-PVNvna/';
  const telegramUrl = 'https://t.me/vibezmest';

  ['course-link', 'hero-course-link'].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute('href', courseUrl);
    }
  });

  const telegramLinkElement = document.getElementById('telegram-link');
  if (telegramLinkElement) {
    telegramLinkElement.setAttribute('href', telegramUrl);
  }

  // Мягкий параллакс по движению курсора
  if (hero && parallaxLayers.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let rafId = null;
    let pointerX = 0;
    let pointerY = 0;

    const applyParallax = () => {
      parallaxLayers.forEach((layer) => {
        const speed = Number(layer.dataset.speed || 0.04);
        const moveX = pointerX * speed * 18;
        const moveY = pointerY * speed * 18;
        layer.style.setProperty('--move-x', `${moveX}px`);
        layer.style.setProperty('--move-y', `${moveY}px`);
      });
      rafId = null;
    };

    const scheduleParallax = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyParallax);
      }
    };

    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      scheduleParallax();
    });

    hero.addEventListener('mouseleave', () => {
      pointerX = 0;
      pointerY = 0;
      scheduleParallax();
    });
  }
});
