/* ============================================================
   MAJIBU — Main JS
   ============================================================ */

/* --- Mobile nav toggle --- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close on nav link click (mobile)
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
}());


/* --- Active nav link based on current page --- */
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}());


/* --- Scroll-triggered fade-in for sections --- */
(function () {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.pillar-card, .impact-item, .partner-card, .team-card, .principle-card, .framework-step, .stat-item'
  );

  targets.forEach(function (el) {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
}());


/* --- Staggered card animations --- */
(function () {
  var grids = document.querySelectorAll(
    '.pillars-grid, .impact-grid, .partners-grid, .team-grid, .stats-inner'
  );

  grids.forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });
}());


/* --- Contact form client-side handling --- */
(function () {
  var form     = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');
  var btn      = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation
    var name    = form.querySelector('#name').value.trim();
    var email   = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showFeedback('Please fill in all required fields.', 'error');
      return;
    }
    if (!emailRe.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate submission (replace with actual endpoint or Formspree)
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    setTimeout(function () {
      showFeedback('Thank you — your message has been sent. Joanna will be in touch within two business days.', 'success');
      form.reset();
      btn.disabled    = false;
      btn.textContent = 'Send message →';
    }, 1200);
  });

  function showFeedback(msg, type) {
    feedback.style.display     = 'block';
    feedback.textContent       = msg;
    feedback.style.background  = type === 'success' ? 'rgba(27,58,45,0.08)' : 'rgba(220,50,50,0.08)';
    feedback.style.color       = type === 'success' ? 'var(--green)'         : '#c0392b';
    feedback.style.borderLeft  = '3px solid ' + (type === 'success' ? 'var(--green)' : '#c0392b');
  }
}());


/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80; // header height
      var top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});


/* --- Header shadow on scroll --- */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 2px 24px rgba(0,0,0,0.28)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.18)';
    }
  }, { passive: true });
}());
