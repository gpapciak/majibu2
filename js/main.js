/* ============================================================
   MAJIBU — Main JS
   ============================================================ */

/* --- Mobile nav toggle --- */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    var spans = toggle.querySelectorAll('span');
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

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
}());


/* --- Active nav link based on current page --- */
(function () {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}());


/* --- Scroll reveal for .reveal elements --- */
(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el) { observer.observe(el); });
}());


/* --- Staggered delay for grid children with .reveal --- */
(function () {
  var grids = document.querySelectorAll(
    '.pillars-grid, .impact-grid, .partners-grid, .team-grid, .stats-inner, .principles-grid'
  );
  grids.forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });
}());


/* --- Partner modal --- */
(function () {
  var partnerData = {
    'oceans-alive': {
      name: 'Oceans Alive',
      location: 'Kenya — Kilifi',
      founded: '2004',
      budget: '£404,478',
      staff: '33',
      volunteers: '50+',
      reach: '150 sq km ocean protected, 8,000 coral colonies restored, 9,100 people supported',
      focus: ['Marine conservation', 'Coral restoration', 'Fisher livelihoods', 'Community livelihoods'],
      website: 'www.oceansalive.org',
      websiteHref: 'https://www.oceansalive.org',
      goal: 'Replication → Sustainability'
    },
    'ace-africa': {
      name: 'Ace Africa',
      location: 'Kenya — Western Kenya',
      founded: '2003',
      budget: '£316,727',
      staff: '13',
      volunteers: '5,000',
      reach: '1.5 million people',
      focus: ['Community health', 'Women and girls', 'Child development', 'Rights protection', 'Sustainable livelihoods'],
      website: 'www.ace-africa.org',
      websiteHref: 'https://www.ace-africa.org',
      goal: 'Replication → Sustainability'
    },
    'rlabs': {
      name: 'RLabs',
      location: 'Tanzania — Iringa',
      founded: '2019',
      budget: '£91,500',
      staff: '6',
      volunteers: 'Fewer than 10',
      reach: '1,000 young people',
      focus: ['Youth empowerment', 'Entrepreneurship', 'Business and savings', 'Girls', 'Street kids'],
      website: 'www.rlabs.or.tz',
      websiteHref: 'https://www.rlabs.or.tz',
      goal: 'Established → Replication'
    }
  };

  var overlay   = document.getElementById('partnerModal');
  if (!overlay) return;

  var closeBtn  = document.getElementById('modalClose');
  var titleEl   = document.getElementById('modalTitle');
  var locationEl= document.getElementById('modalLocation');
  var metaEl    = document.getElementById('modalMeta');
  var reachEl   = document.getElementById('modalReach');
  var focusEl   = document.getElementById('modalFocus');
  var goalEl    = document.getElementById('modalGoal');
  var websiteEl = document.getElementById('modalWebsite');

  function openModal(key) {
    var d = partnerData[key];
    if (!d) return;

    titleEl.textContent    = d.name;
    locationEl.textContent = d.location;

    metaEl.innerHTML =
      '<div class="modal-meta-item"><span class="meta-label">Founded</span><span class="meta-value">' + d.founded + '</span></div>' +
      '<div class="modal-meta-item"><span class="meta-label">Annual budget</span><span class="meta-value">' + d.budget + '</span></div>' +
      '<div class="modal-meta-item"><span class="meta-label">Staff</span><span class="meta-value">' + d.staff + '</span></div>' +
      '<div class="modal-meta-item"><span class="meta-label">Volunteers</span><span class="meta-value">' + d.volunteers + '</span></div>';

    reachEl.innerHTML =
      '<span class="meta-label">Reach</span><p>' + d.reach + '</p>';

    focusEl.innerHTML = d.focus.map(function (f) {
      return '<span class="focus-tag">' + f + '</span>';
    }).join('');

    goalEl.innerHTML =
      '<span class="goal-label">Majibu portfolio goal</span>' +
      '<span class="goal-value">' + d.goal + '</span>';

    websiteEl.innerHTML =
      '<a href="' + d.websiteHref + '" target="_blank" rel="noopener">' + d.website + ' &rarr;</a>';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.partner-card[data-partner]').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card.dataset.partner); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.partner);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}());


/* --- Funding flow visualiser animation --- */
(function () {
  var visualiser = document.getElementById('flowVisualiser');
  if (!visualiser || !('IntersectionObserver' in window)) {
    // No observer support — just show bars at full height immediately
    if (visualiser) {
      visualiser.querySelectorAll('.flow-segment').forEach(function (seg) {
        seg.style.height = seg.dataset.height + '%';
        seg.classList.add('animated');
      });
    }
    return;
  }

  var animated = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;
        visualiser.querySelectorAll('.flow-segment').forEach(function (seg, i) {
          setTimeout(function () {
            seg.style.height = seg.dataset.height + '%';
            seg.classList.add('animated');
          }, i * 60);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(visualiser);
}());


/* --- Impact calculator --- */
(function () {
  var slider      = document.getElementById('calcAmount');
  var displayEl   = document.getElementById('calcAmountDisplay');
  var grantsEl    = document.getElementById('calcGrants');
  var grantsPctEl = document.getElementById('calcGrantsPct');
  var orgDevEl    = document.getElementById('calcOrgDev');
  var orgDevPctEl = document.getElementById('calcOrgDevPct');
  var mgmtEl      = document.getElementById('calcMgmt');
  var mgmtPctEl   = document.getElementById('calcMgmtPct');
  var orgsEl      = document.getElementById('calcOrgs');
  var yearTabs    = document.querySelectorAll('.calc-year-tab');

  if (!slider) return;

  var yearRates = {
    1: { grants: 0.70, orgDev: 0.15, mgmt: 0.15 },
    2: { grants: 0.74, orgDev: 0.13, mgmt: 0.13 },
    3: { grants: 0.78, orgDev: 0.11, mgmt: 0.11 }
  };

  var currentYear = 1;

  function fmt(n) {
    return n.toLocaleString('en-GB');
  }

  function update() {
    var amount = parseInt(slider.value, 10);
    var rates  = yearRates[currentYear];
    var grants = Math.round(amount * rates.grants);
    var orgDev = Math.round(amount * rates.orgDev);
    var mgmt   = Math.round(amount * rates.mgmt);
    var orgs   = Math.floor(amount / 35000);

    displayEl.textContent   = fmt(amount);
    grantsEl.textContent    = fmt(grants);
    grantsPctEl.textContent = Math.round(rates.grants * 100);
    orgDevEl.textContent    = fmt(orgDev);
    orgDevPctEl.textContent = Math.round(rates.orgDev * 100);
    mgmtEl.textContent      = fmt(mgmt);
    mgmtPctEl.textContent   = Math.round(rates.mgmt * 100);
    orgsEl.textContent      = orgs < 1 ? '<1' : orgs;
  }

  slider.addEventListener('input', update);

  yearTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      yearTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentYear = parseInt(tab.dataset.year, 10);
      update();
    });
  });

  update();
}());


/* --- Contact form client-side handling --- */
(function () {
  var form     = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');
  var btn      = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

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

    btn.disabled    = true;
    btn.textContent = 'Sending\u2026';

    setTimeout(function () {
      showFeedback('Thank you \u2014 your message has been sent. Joanna will be in touch within two business days.', 'success');
      form.reset();
      btn.disabled    = false;
      btn.textContent = 'Send message \u2192';
    }, 1200);
  });

  function showFeedback(msg, type) {
    feedback.style.display     = 'block';
    feedback.textContent       = msg;
    feedback.style.background  = type === 'success' ? 'rgba(27,58,45,0.08)' : 'rgba(220,50,50,0.08)';
    feedback.style.color       = type === 'success' ? 'var(--green)'         : '#c0392b';
    feedback.style.borderLeft  = '3px solid ' + (type === 'success' ? 'var(--green)' : '#c0392b');
    feedback.style.padding     = '1rem 1.25rem';
    feedback.style.borderRadius = '0 var(--radius) var(--radius) 0';
    feedback.style.marginTop   = '1rem';
  }
}());


/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80;
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
