/* ============================================================
   Team C.A.R.E — main.js (FINAL)
   Vanilla JS port of every interactive behavior + dynamic render.
   Loaded at end of <body> on every page, after data/content.js.
   ============================================================ */
(function () {
  'use strict';

  /* =========================================================
     PART A — CONTENT RENDERS (run first, before animations)
     Each is guarded by the presence of its container element,
     so this single file works on every page.
     ========================================================= */

  /* A1. HOMEPAGE — news cards (first 4) */
  function renderHomeNews() {
    const el = document.getElementById('homeNewsGrid');
    if (!el || !window.CARE || !window.CARE.news) return;
    el.innerHTML = window.CARE.news.items.slice(0, 4).map(item =>
      '<div class="news-card fade-up">' +
        '<div class="news-thumb">' + (item.emoji || '📰') + '</div>' +
        '<div class="news-body">' +
          '<div class="news-date">' + (item.date || '') + '</div>' +
          '<h4>' + (item.title || '') + '</h4>' +
          '<a href="' + (item.link || '#') + '" target="_blank" rel="noreferrer" class="news-arrow">→</a>' +
        '</div>' +
      '</div>'
    ).join('');
  }

  /* A2. AWARDS PAGE — award cards */
  function renderAwards() {
    const el = document.getElementById('awardsList');
    if (!el || !window.CARE || !window.CARE.achievements) return;

    const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:46px;height:46px;color:var(--blue)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"></path></svg>';

    el.innerHTML = window.CARE.achievements.items.map(a => {
      const eyebrow = (a.badge || '') + ' · ' + (a.year || '');
      const badge = a.date || a.year || '';
      const imgSrc = a.image
        ? '<img src="' + a.image + '" alt="' + (a.title || '').replace(/"/g, '&quot;') + '">'
        : '<div class="care-award-placeholder">' + starSVG + '</div>';
      const descAttr = (a.desc || '').replace(/"/g, '&quot;');
      return (
        '<article class="care-award" data-desc="' + descAttr + '" data-link="' + (a.link || '#') + '">' +
          '<div class="care-award-img">' + imgSrc + '</div>' +
          '<div class="care-award-body">' +
            '<div class="care-award-eyebrow">' + eyebrow + '</div>' +
            '<h3>' + (a.title || '') + '</h3>' +
            '<span class="care-award-badge">' + badge + '</span>' +
            '<div><button class="btn-outline">See details →</button></div>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* A3. TEAM PAGE — member cards */
  function renderTeam() {
    const el = document.getElementById('teamGrid');
    if (!el || !window.CARE || !window.CARE.team) return;
    el.innerHTML = window.CARE.team.members.map(m => {
      const avatar = m.photo
        ? '<div class="member-avatar" style="background-image:url(\'' + m.photo + '\');background-size:cover;background-position:center"></div>'
        : '<div class="member-avatar">👤</div>';
      const socials = [];
      if (m.linkedin) socials.push('<a href="' + m.linkedin + '" target="_blank" rel="noreferrer">in</a>');
      if (m.facebook) socials.push('<a href="' + m.facebook + '" target="_blank" rel="noreferrer">f</a>');
      return (
        '<div class="member-card fade-up">' +
          avatar +
          '<h4>' + (m.name || '') + '</h4>' +
          '<p class="role">' + (m.role || '') + '</p>' +
          '<div class="member-socials">' + socials.join('') + '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* A4. GALLERY PAGE — photo grid */
  function renderGallery() {
    const el = document.getElementById('galleryGrid');
    if (!el || !window.CARE || !window.CARE.gallery) return;
    el.innerHTML = window.CARE.gallery.photos.map(p => {
      const cls = 'gallery-item' + (p.size ? ' ' + p.size : '');
      const inner = p.image
        ? '<div class="gallery-inner" style="background-image:url(\'' + p.image + '\');background-size:cover;background-position:center"></div>'
        : '<div class="gallery-inner">' + (p.emoji || '📷') + '</div>';
      return (
        '<div class="' + cls + '" data-cat="' + (p.cat || '') + '">' +
          inner +
          '<div class="gallery-overlay">' +
            '<h4>' + (p.title || '') + '</h4>' +
            '<p>' + (p.subtitle || '') + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* A5. NEWS PAGE — all news items */
  function renderNews() {
    const el = document.getElementById('newsGrid');
    if (!el || !window.CARE || !window.CARE.news) return;
    el.innerHTML = window.CARE.news.items.map(item =>
      '<div class="news-card fade-up">' +
        '<div class="news-thumb">' + (item.emoji || '📰') + '</div>' +
        '<div class="news-body">' +
          '<div class="news-date">' + (item.date || '') + '</div>' +
          '<h4>' + (item.title || '') + '</h4>' +
          '<a href="' + (item.link || '#') + '" target="_blank" rel="noreferrer" class="news-arrow">→</a>' +
        '</div>' +
      '</div>'
    ).join('');
  }

  /* A6. HOMEPAGE + CONTACT — inject site stats and contact info */
  function renderSite() {
    if (!window.CARE || !window.CARE.site) return;
    const S = window.CARE.site;

    /* Stats — attach data-target and data-plus for the counter animation */
    document.querySelectorAll('.stat-num[data-stat]').forEach(el => {
      const key = el.dataset.stat;
      if (!(key in S)) return;
      el.dataset.target = String(S[key]);
      el.dataset.plus = String(!!S[key + '_plus']);
      el.textContent = String(S[key]) + (S[key + '_plus'] ? '+' : '');
    });

    /* Contact page fields */
    document.querySelectorAll('[data-contact="email"]').forEach(el => el.textContent = S.contact_email || el.textContent);
    document.querySelectorAll('[data-contact="location"]').forEach(el => el.textContent = S.contact_location || el.textContent);
    document.querySelectorAll('[data-contact="social"]').forEach(el => el.textContent = S.contact_social || el.textContent);
    const form = document.querySelector('.contact-form');
    if (form && S.contact_email) form.action = 'mailto:' + S.contact_email;
  }

  /* =========================================================
     PART B — INTERACTIONS
     ========================================================= */

  /* B1. THEME TOGGLE (persisted in localStorage) */
  function initTheme() {
    const saved = localStorage.getItem('care-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('care-theme', next);
      });
    });
  }

  /* B2. WELCOME POPUP */
  function initWelcome() {
    const popup = document.getElementById('welcome-popup');
    if (!popup) return;
    const closeBtn = popup.querySelector('.welcome-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
        setTimeout(() => popup.remove(), 500);
      });
    }
  }

  /* B3. CUSTOM CURSOR */
  function initCursor() {
    const ring = document.getElementById('cursor-ring');
    const dot = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, .card, .project-card, .member-card, .gallery-item, .news-card, .road-card, .care-feat-item, .filter-btn');
      document.body.classList.toggle('cursor-hover', !!t);
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
  }

  /* B4. MOBILE MENU */
  function initMobileMenu() {
    const burger = document.querySelector('.hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  /* B5. TAGLINE REVEAL */
  function initTaglineReveal() {
    document.querySelectorAll('.tagline-reveal').forEach(el => {
      if (!el.querySelector('.tag-word')) {
        const words = (el.textContent || '').trim().split(/\s+/);
        el.innerHTML = words.map(w => '<span class="tag-word">' + w + '</span>').join(' ');
      }
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.querySelectorAll('.tag-word').forEach((w, i) => {
            w.style.transitionDelay = (0.12 * i) + 's';
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tagline-reveal').forEach(el => obs.observe(el));
  }

  /* B6. ROADMAP LETTER SPLIT */
  function initRoadmapLetters() {
    document.querySelectorAll('.road-letter-title').forEach(el => {
      if (el.dataset.split) return;
      el.dataset.split = '1';
      const text = el.textContent || '';
      el.innerHTML = text.split('').map(c =>
        c === ' ' ? '&nbsp;' : '<span class="letter">' + c + '</span>'
      ).join('');
    });
  }

  /* B7. FADE-UP ON SCROLL */
  function initFadeUp() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80 * i);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('main .fade-up, section .fade-up').forEach(el => obs.observe(el));
  }

  /* B8. CARE WHEELCHAIR LAYOUT (projects page) */
  function initCareWcLayout() {
    const layout = document.getElementById('careWcLayout');
    if (!layout) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const left = layout.querySelectorAll('.care-wc-left .care-feat-item');
          const right = layout.querySelectorAll('.care-wc-right .care-feat-item');
          left.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 * i));
          right.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 100 * i + 200));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(layout);
  }

  /* B9. STAT COUNTERS */
  function initStats() {
    const stats = document.getElementById('stats');
    if (!stats) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.dataset.target || el.textContent || '0', 10);
            const plus = el.dataset.plus === 'true';
            let cur = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              cur = Math.min(cur + step, target);
              el.textContent = Math.floor(cur) + (plus ? '+' : '');
              if (cur >= target) clearInterval(timer);
            }, 22);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(stats);
  }

  /* B10. HERO CANVAS #1 — streaks + rings + orbs (verbatim port) */
  function initHeroBgCanvas() {
    const canvas = document.getElementById('heroBgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let streaks = [], rings = [], orbs = [];
    let rafId = 0, frame = 0;

    function setup() {
      W = canvas.parentElement.offsetWidth;
      H = canvas.parentElement.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      streaks = [];
      for (let i = 0; i < 14; i++) {
        streaks.push({
          x: Math.random() * W * 1.5 - 0.25 * W,
          y: Math.random() * H * 1.5 - 0.25 * H,
          angle: -0.52 + (Math.random() - 0.5) * 0.2,
          len: 80 + 220 * Math.random(),
          speed: 0.12 + 0.18 * Math.random(),
          alpha: 0.04 + 0.08 * Math.random(),
          width: 0.6 + 0.8 * Math.random()
        });
      }
      rings = [];
      for (let i = 0; i < 4; i++) {
        rings.push({
          x: W * (0.55 + 0.4 * Math.random()),
          y: H * (0.2 + 0.6 * Math.random()),
          r: 40 + 80 * Math.random(),
          maxR: 200 + 200 * Math.random(),
          speed: 0.4 + 0.5 * Math.random(),
          alpha: 0.06 + 0.06 * Math.random(),
          delay: 60 * i
        });
      }
      orbs = [
        { x: 0.72 * W, y: 0.35 * H, r: 260, color: isDark ? '41,121,255' : '41,100,200', a: isDark ? 0.055 : 0.04, vx: 0.08, vy: 0.05 },
        { x: 0.88 * W, y: 0.65 * H, r: 180, color: isDark ? '0,180,255'  : '0,130,200', a: isDark ? 0.04  : 0.03, vx: -0.06, vy: 0.07 },
        { x: 0.62 * W, y: 0.7  * H, r: 140, color: isDark ? '100,60,255' : '80,50,200', a: isDark ? 0.03  : 0.02, vx: 0.05, vy: -0.06 }
      ];
    }

    function frameLoop() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0.4 * W || o.x > 1.05 * W) o.vx *= -1;
        if (o.y < -50 || o.y > H + 50) o.vy *= -1;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, 'rgba(' + o.color + ',' + o.a + ')');
        g.addColorStop(0.5, 'rgba(' + o.color + ',' + (0.4 * o.a) + ')');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI); ctx.fill();
      });

      streaks.forEach(s => {
        s.y += 0.3 * s.speed; s.x += 0.15 * s.speed;
        if (s.y > H + 200) { s.y = -200; s.x = Math.random() * W * 1.5 - 0.25 * W; }
        const x2 = s.x + Math.cos(s.angle) * s.len;
        const y2 = s.y + Math.sin(s.angle) * s.len;
        const alpha = isDark ? s.alpha : 0.6 * s.alpha;
        ctx.strokeStyle = 'rgba(' + (isDark ? '41,121,255' : '26,80,180') + ',' + alpha + ')';
        ctx.lineWidth = s.width;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(x2, y2); ctx.stroke();
      });

      rings.forEach(r => {
        if (frame < r.delay) return;
        r.r += r.speed;
        if (r.r > r.maxR) r.r = 20;
        const a = (1 - r.r / r.maxR) * r.alpha * (isDark ? 1 : 0.6);
        ctx.strokeStyle = 'rgba(41,121,255,' + a + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 2 * Math.PI); ctx.stroke();
      });

      rafId = requestAnimationFrame(frameLoop);
    }

    setup();
    frameLoop();
    window.addEventListener('resize', setup);
  }

  /* B11. HERO CANVAS #2 — particle network (verbatim port) */
  function initHeroAbstractCanvas() {
    const canvas = document.getElementById('heroAbstractCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let particles = [];
    let pulses = [];
    let rafId = 0;

    function setup() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      particles = [];
      const count = Math.min(Math.floor(W * H / 8000), 42);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 2 * Math.random() + 0.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + 0.025 * Math.random(),
          hub: Math.random() < 0.12
        });
      }
    }

    const pulseTimer = setInterval(() => {
      if (particles.length < 2) return;
      const fromIdx = Math.floor(Math.random() * particles.length);
      let toIdx = -1, minDist = 9999;
      particles.forEach((p, i) => {
        if (i === fromIdx) return;
        const d = Math.hypot(p.x - particles[fromIdx].x, p.y - particles[fromIdx].y);
        if (d < 150 && d < minDist) { minDist = d; toIdx = i; }
      });
      if (toIdx > -1) {
        pulses.push({ from: fromIdx, to: toIdx, p: 0, sp: 0.007 + 0.01 * Math.random() });
      }
    }, 600);

    function frameLoop() {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const baseRGB = isDark ? [41, 121, 255] : [26, 95, 212];
      const hubRGB  = isDark ? [0, 200, 255]  : [0, 110, 190];

      particles.forEach((p, pi) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.pulse += p.pulseSpeed;

        for (let qi = pi + 1; qi < particles.length; qi++) {
          const q = particles[qi];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            const rgb = (p.hub || q.hub) ? hubRGB : baseRGB;
            ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + ((1 - d / 130) * (isDark ? 0.15 : 0.1)) + ')';
            ctx.lineWidth = (p.hub || q.hub) ? 1 : 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      });

      pulses = pulses.filter(pu => pu.p <= 1);
      pulses.forEach(pu => {
        pu.p += pu.sp;
        const x1 = particles[pu.from].x, y1 = particles[pu.from].y;
        const x2 = particles[pu.to].x,   y2 = particles[pu.to].y;
        const x = x1 + (x2 - x1) * pu.p;
        const y = y1 + (y2 - y1) * pu.p;
        const a = Math.sin(pu.p * Math.PI) * (isDark ? 0.85 : 0.65);
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(' + hubRGB[0] + ',' + hubRGB[1] + ',' + hubRGB[2] + ',' + a + ')';
        ctx.fill();
      });

      particles.forEach(p => {
        const rgb = p.hub ? hubRGB : baseRGB;
        const radius = p.r + 0.7 * Math.sin(p.pulse);
        const a = isDark ? (0.55 + 0.25 * Math.sin(p.pulse)) : (0.45 + 0.18 * Math.sin(p.pulse));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 5 * radius);
        grad.addColorStop(0, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (isDark ? 0.22 : 0.13) + ')');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(p.x, p.y, 5 * radius, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
        ctx.fill();
      });

      rafId = requestAnimationFrame(frameLoop);
    }

    setup();
    frameLoop();
    window.addEventListener('resize', setup);
  }

  /* B12. GALLERY FILTER */
  function initGalleryFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    if (!buttons.length || !items.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat || (btn.textContent || '').trim().toLowerCase();
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach(it => {
          const itemCat = (it.dataset.cat || '').toLowerCase();
          it.style.display = (cat === 'all' || itemCat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* B13. GALLERY LIGHTBOX */
  function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<div class="lightbox-inner"><button class="lightbox-close">✕</button><span class="lightbox-emoji"></span><h3></h3><p></p></div>';
    document.body.appendChild(lb);
    const close = () => lb.classList.remove('open');
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    items.forEach(it => {
      it.addEventListener('click', () => {
        const overlay = it.querySelector('.gallery-overlay');
        const title = overlay ? (overlay.querySelector('h4') ? overlay.querySelector('h4').textContent : '') : '';
        const subtitle = overlay ? (overlay.querySelector('p') ? overlay.querySelector('p').textContent : '') : '';
        const inner = it.querySelector('.gallery-inner');
        lb.querySelector('.lightbox-emoji').textContent = inner ? inner.textContent.trim() : '';
        lb.querySelector('h3').textContent = title;
        lb.querySelector('p').textContent = subtitle;
        lb.classList.add('open');
      });
    });
  }

  /* B14. AWARDS "SEE DETAILS" MODAL */
  function initAwardModals() {
    const buttons = document.querySelectorAll('.care-award .btn-outline');
    if (!buttons.length) return;
    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML = '<div class="care-award-modal"><button class="lightbox-close">✕</button><div class="care-award-placeholder" style="margin-bottom:20px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:46px;height:46px;color:var(--blue)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"></path></svg></div><h3></h3><p class="aw-desc"></p><a class="btn-outline aw-link" target="_blank" rel="noreferrer" href="#">View on Facebook →</a></div>';
    document.body.appendChild(modal);
    const close = () => modal.classList.remove('open');
    modal.querySelector('.lightbox-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.care-award');
        if (!card) return;
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        const desc = card.dataset.desc || 'Details coming soon.';
        const link = card.dataset.link || '#';
        modal.querySelector('h3').textContent = title;
        modal.querySelector('.aw-desc').textContent = desc;
        const l = modal.querySelector('.aw-link');
        if (l) l.href = link;
        modal.classList.add('open');
      });
    });
  }

  /* B15. ACTIVE NAV LINK */
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const base = href.split('#')[0].split('/').pop();
      if (base === path && base !== '') {
        a.classList.add('active');
      }
    });
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function boot() {
    /* Renders first (build DOM) */
    renderSite();
    renderHomeNews();
    renderAwards();
    renderTeam();
    renderGallery();
    renderNews();

    /* Then interactions (bind to the freshly rendered DOM) */
    initTheme();
    initWelcome();
    initCursor();
    initMobileMenu();
    initTaglineReveal();
    initRoadmapLetters();
    initFadeUp();
    initCareWcLayout();
    initStats();
    initHeroBgCanvas();
    initHeroAbstractCanvas();
    initGalleryFilter();
    initGalleryLightbox();
    initAwardModals();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();