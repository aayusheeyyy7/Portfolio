document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. Typing effect for hero role line
  ---------------------------------------------------------- */
  const roles = [
    'BCA Student',
    'Front-end Enthusiast',
    'HTML & CSS Learner',
    'Aspiring Web Developer'
  ];
  const typedEl = document.getElementById('typedRole');

  if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const HOLD_TIME = 1400;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }
    tick();
  } else if (typedEl) {
    typedEl.textContent = roles[0];
  }

  /* ----------------------------------------------------------
     2. Mobile nav toggle
  ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navTabs = document.getElementById('navTabs');

  if (navToggle && navTabs) {
    navToggle.addEventListener('click', () => {
      const isOpen = navTabs.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navTabs.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        navTabs.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     3. Scroll-spy — highlight active tab based on section in view
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const tabs = document.querySelectorAll('.tab');

  const setActiveTab = (id) => {
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.dataset.tab === id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => spyObserver.observe(section));
  }

  /* ----------------------------------------------------------
     4. Reveal-on-scroll for cards & panels
  ---------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.skillfile, .projectcard, .infocard, .contact__form, .contact__card, .about__copy'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ----------------------------------------------------------
     5. Animate skill meters when they scroll into view
  ---------------------------------------------------------- */
  const meters = document.querySelectorAll('.meter__fill');

  if ('IntersectionObserver' in window && meters.length) {
    const meterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const level = fill.dataset.level || 0;
          fill.style.width = level + '%';
          meterObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.4 });

    meters.forEach(fill => meterObserver.observe(fill));
  } else {
    meters.forEach(fill => { fill.style.width = (fill.dataset.level || 0) + '%'; });
  }

  /* ----------------------------------------------------------
     6. Contact form — lightweight client-side handling
  ---------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.style.color = '#E5484D';
        status.textContent = 'Please fill in every field before sending.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.style.color = '#E5484D';
        status.textContent = 'That email address doesn\'t look right.';
        return;
      }

      // No backend connected yet — replace this with a real request
      // (e.g. fetch to an API or a form service) when ready.
      status.style.color = '#17A673';
      status.textContent = `Thanks, ${name}! Your message has been noted locally — connect a backend to send it for real.`;
      form.reset();
    });
  }

  /* ----------------------------------------------------------
     7. Footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()}`;
  }

});
