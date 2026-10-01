/* ============================================================
   Team C.A.R.E — main.js (V2, minimal)
   Light-first. Canvas kept but soft + paused off-screen.
   Cursor uses transform only. All handlers passive.
   ============================================================ */
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice =
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  function renderSite() {
    if (!window.CARE || !window.CARE.site) return;
    const S = window.CARE.site;

    document.querySelectorAll('.stat-num[data-stat]').forEach(el => {
      const key = el.dataset.stat;
      if (!(key in S)) return;
      el.dataset.target = String(S[key]);
      el.dataset.plus = String(!!S[key + '_plus']);
      el.textContent = String(S[key]) + (S[key + '_plus'] ? '+' : '');
    });

    document.querySelectorAll('[data-contact="email"]').forEach(el => el.textContent = S.contact_email || el.textContent);
    document.querySelectorAll('[data-contact="location"]').forEach(el => el.textContent = S.contact_location || el.textContent);
    document.querySelectorAll('[data-contact="social"]').forEach(el => el.textContent = S.contact_social || el.textContent);
    const form = document.querySelector('.contact-form');
    if (form && S.contact_email) form.action = 'mailto:' + S.contact_email;
  }

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

  function renderAwards() {
    const el = document.getElementById('awardsList');
    if (!el || !window.CARE || !window.CARE.achievements) return;
    const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:40px;height:40px;color:var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"></path></svg>';
    el.innerHTML = window.CARE.achievements.items.map(a => {
      const eyebrow = (a.badge || '') + ' · ' + (a.year || '');
      const badge = a.date || a.year || '';
      const imgSrc = a.image
        ? '<img src="' + a.image + '" alt="' + (a.title || '').replace(/"/g, '&quot;') + '" loading="lazy">'
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
        '<div class="member-card fade-up">' + avatar +
          '<h4>' + (m.name || '') + '</h4>' +
          '<p class="role">' + (m.role || '') + '</p>' +
          '<div class="member-socials">' + socials.join('') + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderGallery() {
    const el = document.getElementById('galleryGrid');
    if (!el || !window.CARE || !window.CARE.gallery) return;
    el.innerHTML = window.CARE.gallery.photos.map(p => {
      const cls = 'gallery-item' + (p.size ? ' ' + p.size : '');
      const inner = p.image
        ? '<div class="gallery-inner" style="background-image:url(\'' + p.image + '\');background-size:cover;background-position:center"></div>'
        : '<div class="gallery-inner">' + (p.emoji || '📷') + '</div>';
      return (
        '<div class="' + cls + '" data-cat="' + (p.cat || '') + '">' + inner +
          '<div class="gallery-overlay">' +
            '<h4>' + (p.title || '') + '</h4>' +
            '<p>' + (p.subtitle || '') + '</p>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function initTheme() {
    const saved = localStorage.getItem('care-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('care-theme', next);
      });
    });
  }

  function initMobileMenu() {
    const burger = document.querySelector('.hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  function initCursor() {
    if (isTouchDevice || prefersReducedMotion) return;
    const ring = document.getElementById('cursor-ring');
    const dot = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + (mx - 2) + 'px,' + (my - 2) + 'px,0)';
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = 'translate3d(' + (rx - 14) + 'px,' + (ry - 14) + 'px,0)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, .card, .project-card, .member-card, .gallery-item, .news-card, .road-card, .filter-btn');
      document.body.classList.toggle('cursor-hover', !!t);
    });
  }

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
            w.style.transitionDelay = (0.1 * i) + 's';
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.tagline-reveal').forEach(el => obs.observe(el));
  }

  function initFadeUp() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  }

  function initStats() {
    const stats = document.getElementById('stats');
    if (!stats) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const target = parseInt(el.dataset.target || el.textContent || '0', 10);
          const plus = el.dataset.plus === 'true';
          let cur = 0;
          const step = Math.max(target / 40, 0.5);
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.floor(cur) + (plus ? '+' : '');
            if (cur >= target) clearInterval(timer);
          }, 24);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    obs.observe(stats);
  }

  function initCareWcLayout() {
    const layout = document.getElementById('careWcLayout');
    if (!layout) return;
    if (prefersReducedMotion) {
      layout.querySelectorAll('.care-feat-item').forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          layout.querySelectorAll('.care-feat-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 60 * i);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(layout);
  }

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
        const title = overlay && overlay.querySelector('h4') ? overlay.querySelector('h4').textContent : '';
        const subtitle = overlay && overlay.querySelector('p') ? overlay.querySelector('p').textContent : '';
        const inner = it.querySelector('.gallery-inner');
        lb.querySelector('.lightbox-emoji').textContent = inner ? inner.textContent.trim() : '';
        lb.querySelector('h3').textContent = title;
        lb.querySelector('p').textContent = subtitle;
        lb.classList.add('open');
      });
    });
  }

  function initAwardModals() {
    const buttons = document.querySelectorAll('.care-award .btn-outline');
    if (!buttons.length) return;
    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML = '<div class="care-award-modal"><button class="lightbox-close">✕</button><h3></h3><p></p><a class="btn-outline aw-link" target="_blank" rel="noreferrer" href="#">View on Facebook →</a></div>';
    document.body.appendChild(modal);
    const close = () => modal.classList.remove('open');
    modal.querySelector('.lightbox-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.care-award');
        if (!card) return;
        modal.querySelector('h3').textContent = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        modal.querySelector('p').textContent = card.dataset.desc || 'Details coming soon.';
        modal.querySelector('.aw-link').href = card.dataset.link || '#';
        modal.classList.add('open');
      });
    });
  }

  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const base = href.split('#')[0].split('/').pop();
      if (base === path && base !== '') a.classList.add('active');
    });
  }

  function initHeroCanvas() {
    if (prefersReducedMotion || isTouchDevice) return;
    const canvas = document.getElementById('heroBgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let W = 0, H = 0;
    let points = [];
    let rafId = 0;
    let running = false;

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor(W * H / 26000), 26);
      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 0.8 + Math.random() * 1.2
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const rgb = isDark ? '100, 160, 255' : '26, 95, 212';

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb + ', 0.35)';
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            const a = (1 - d2 / 15000) * 0.14;
            ctx.strokeStyle = 'rgba(' + rgb + ', ' + a + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    }

    function start() { if (running) return; running = true; rafId = requestAnimationFrame(draw); }
    function stop() { running = false; cancelAnimationFrame(rafId); }

    setup();
    start();
    window.addEventListener('resize', setup, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });
    const hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0 });
      io.observe(hero);
    }
  }

  function boot() {
    renderSite();
    renderHomeNews();
    renderNews();
    renderAwards();
    renderTeam();
    renderGallery();

    initTheme();
    initMobileMenu();
    initCursor();
    initTaglineReveal();
    initFadeUp();
    initStats();
    initCareWcLayout();
    initGalleryFilter();
    initGalleryLightbox();
    initAwardModals();
    initActiveNav();
    initHeroCanvas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
