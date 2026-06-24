/*
 * Основной JavaScript для сайта ВайбЗмест
 *
 * Отвечает за:
 *  - появление секций при прокрутке (IntersectionObserver)
 *  - работу бургер‑меню на мобильных устройствах
 *  - подстановку ссылок на корпоративный курс и Telegram
 */

document.addEventListener('DOMContentLoaded', () => {
  // Бургер‑меню
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }

  // Анимации появления секций
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.scroll-section').forEach((section) => {
    observer.observe(section);
  });

  // Переменные для ссылок
  // Реальные URL: курс и Telegram
  const courseUrl = 'https://pedfund.github.io/AI-PVNvna/';
  const telegramUrl = 'https://t.me/vibezmest';

  // Подстановка ссылок
  const courseLinkElement = document.getElementById('course-link');
  if (courseLinkElement) {
    courseLinkElement.setAttribute('href', courseUrl);
  }
  const telegramLinkElement = document.getElementById('telegram-link');
  if (telegramLinkElement) {
    telegramLinkElement.setAttribute('href', telegramUrl);
  }
});