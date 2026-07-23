// La Cantine du Curé — interactions légères

(function () {
  // Mode QA : ?noanim désactive reveals et smooth scroll
  if (window.location.search.indexOf('noanim') !== -1) {
    document.documentElement.classList.add('noanim');
  }

  // Animation d'ouverture — html.anim-open posé dans <head> si anim autorisée
  const ouverture = document.getElementById('ouverture');
  if (ouverture && document.documentElement.classList.contains('anim-open')) {
    setTimeout(() => {
      document.documentElement.classList.add('ouverture-fin');
      ouverture.addEventListener('transitionend', () => ouverture.remove(), { once: true });
      // Filet de sécurité si transitionend ne fire pas
      setTimeout(() => ouverture.remove(), 2000);
    }, 1500);
  }

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu-mobile');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
      menu.hidden = open;
    });

    menu.querySelectorAll('a').forEach((lien) => {
      lien.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        menu.hidden = true;
      });
    });
  }

  // Reveals au scroll — on observe l'élément parent, jamais l'image clippée
  const cibles = document.querySelectorAll('.reveal, .reveal-clip');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || document.documentElement.classList.contains('noanim') || !('IntersectionObserver' in window)) {
    cibles.forEach((el) => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
    );
    cibles.forEach((el) => io.observe(el));
  }

  // Année du footer
  const annee = document.getElementById('annee');
  if (annee) annee.textContent = String(new Date().getFullYear());
})();
