/* =============================================================
   script.js — Анимации и интерактивность
   ============================================================= */

/* ── Theme toggle ── */
(function () {
  const btn  = document.getElementById('themeToggle');
  const body = document.body;
  const KEY  = 'theme';

  // Apply saved preference immediately (before paint)
  if (localStorage.getItem(KEY) === 'light') body.classList.add('light');

  if (!btn) return;

  btn.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    localStorage.setItem(KEY, isLight ? 'light' : 'dark');
  });
})();


/* ── Typewriter effect ── */
(function () {
  const text = 'Проектирую интеграции и архитектуры, которые работают в продакшне';
  const el = document.getElementById('tagline');
  if (!el) return;

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, Math.random() * 40 + 28); // human-like speed
    }
  }
  // Start after short delay so user sees the cursor first
  setTimeout(type, 600);
})();


/* ── Navbar: scrolled class + scroll-spy ── */
(function () {
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── Burger / Mobile menu ── */
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  function close() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  menu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) close();
  });
})();


/* ── Intersection Observer: fade-up ── */
(function () {
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();


/* ── Smooth anchor scroll (fallback for older browsers) ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
