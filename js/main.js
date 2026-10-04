/* ============================================================
   Team C.A.R.E — main.js (V10)
   Font Awesome icons · awards scroll-stack · roadmap media
   Team: image-only sections, no captions.
   ============================================================ */
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice =
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const ICONS = {
    plane:   'fa-solid fa-plane',
    globe:   'fa-solid fa-earth-asia',
    trophy:  'fa-solid fa-trophy',
    medal:   'fa-solid fa-medal',
    users:   'fa-solid fa-users',
    wrench:  'fa-solid fa-wrench',
    laptop:  'fa-solid fa-laptop-code',
    tv:      'fa-solid fa-tv',
    wheel:   'fa-solid fa-wheelchair',
    cap:     'fa-solid fa-graduation-cap',
    star:    'fa-solid fa-star',
    user:    'fa-solid fa-user',
    mail:    'fa-solid fa-envelope',
    pin:     'fa-solid fa-location-dot',
    phone:   'fa-solid fa-mobile-screen',
    book:    'fa-solid fa-book-open',
    bolt:    'fa-solid fa-bolt',
    chip:    'fa-solid fa-microchip',
    gear:    'fa-solid fa-gear',
    heart:   'fa-solid fa-heart-pulse',
    brain:   'fa-solid fa-brain'
  };
  function icon(name, fallback) {
    const cls = ICONS[name] || ICONS[fallback] || 'fa-solid fa-star';
    return '<i class="' + cls + '"></i>';
  }

  /* =========================================================
     RENDERS
     ========================================================= */

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

  function newsCardHTML(item) {
    return '<div class="news-card fade-up">' +
      '<div class="news-thumb">' + icon(item.icon, 'star') + '</div>' +
      '<div class="news-body">' +
        '<div class="news-date">' + (item.date || '') + '</div>' +
        '<h4>' + (item.title || '') + '</h4>' +
        '<a href="' + (item.link || '#') + '" target="_blank" rel="noreferrer" class="news-arrow">' +
          '<i class="fa-solid fa-arrow-right"></i>' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  function renderHomeNews() {
    const el = document.getElementById('homeNewsGrid');
    if (!el || !window.CARE || !window.CARE.news) return;
    el.innerHTML = window.CARE.news.items.slice(0, 4).map(newsCardHTML).join('');
  }

  function renderNews() {
    const el = document.getElementById('newsGrid');
    if (!el || !window.CARE || !window.CARE.news) return;
    el.innerHTML = window.CARE.news.items.map(newsCardHTML).join('');
  }

  function renderAwards() {
    const el = document.getElementById('awardsList');
    if (!el || !window.CARE || !window.CARE.achievements) return;

    const items = window.CARE.achievements.items;

    el.innerHTML = items.map(a => {
      const eyebrow = (a.badge || '') + ' · ' + (a.year || '');
      const badge = a.date || a.year || '';
      const imgSrc = a.image
        ? '<img src="' + a.image + '" alt="' + (a.title || '').replace(/"/g, '&quot;') + '" loading="lazy" decoding="async">'
        : '<div class="care-award-placeholder">' + icon('trophy') + '</div>';
      const descAttr = (a.desc || '').replace(/"/g, '&quot;');
      return (
        '<article class="care-award" data-badge="' + (a.badge || '') + '" data-desc="' + descAttr + '" data-link="' + (a.link || '#') + '">' +
          '<div class="care-award-img">' + imgSrc + '</div>' +
          '<div class="care-award-body">' +
            '<div class="care-award-eyebrow">' + eyebrow + '</div>' +
            '<h3>' + (a.title || '') + '</h3>' +
            '<span class="care-award-badge">' + badge + '</span>' +
            '<button class="btn-outline">See details <i class="fa-solid fa-arrow-right"></i></button>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    const intro = document.getElementById('awardsIntro');
    if (intro && items.length) {
      intro.textContent = items.length + ' national and international awards earned by Team C.A.R.E — scroll to explore.';
    }

    initAwardsScroll();
  }

  function renderTeam() {
    const el = document.getElementById('teamSections');
    if (!el || !window.CARE || !window.CARE.team) return;

    el.innerHTML = window.CARE.team.sections.map(section => {
      const photos = (section.photos || []).map(src =>
        '<div class="team-photo">' +
          '<img src="' + src + '" alt="" loading="lazy" decoding="async">' +
        '</div>'
      ).join('');

      return (
        '<section class="team-section fade-up">' +
          '<div class="team-section-head">' +
            '<div class="section-eyebrow">' + (section.eyebrow || '') + '</div>' +
            '<h2 class="team-section-title">' + (section.title || '') + '</h2>' +
          '</div>' +
          '<div class="team-photo-grid">' + photos + '</div>' +
        '</section>'
      );
    }).join('');
  }

  function renderGallery() {
    const el = document.getElementById('galleryGrid');
    if (!el || !window.CARE || !window.CARE.gallery) return;

    el.innerHTML = window.CARE.gallery.photos.map((item, i) => {
      const src = typeof item === 'string' ? item : (item.image || '');
      const cat = typeof item === 'string' ? '' : (item.cat || '');
      if (!src) return '';
      const thumb = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><rect width="40" height="30" fill="#e7f4eb"/></svg>'
      );
      return (
        '<div class="gallery-item" data-cat="' + cat + '" data-index="' + i + '">' +
          '<img class="gallery-thumb" src="' + thumb + '" alt="" aria-hidden="true">' +
          '<img class="gallery-img" src="' + src + '" alt="Gallery photo ' + (i + 1) + '" loading="lazy" decoding="async">' +
        '</div>'
      );
    }).join('');

    el.querySelectorAll('.gallery-item').forEach(it => {
      const img = it.querySelector('.gallery-img');
      if (!img) return;
      const mark = () => {
        img.classList.add('loaded');
        it.classList.add('ready');
      };
      if (img.complete && img.naturalWidth > 0) mark();
      else img.addEventListener('load', mark, { once: true });
      img.addEventListener('error', () => it.classList.add('ready'), { once: true });
    });
  }

  function renderRoadmap() {
    const el = document.getElementById('roadmapTrack');
    if (!el || !window.CARE || !window.CARE.roadmap) return;

    const items = window.CARE.roadmap.items;

    el.innerHTML = items.map((item, i) => {
      const isMilestone = item.kind === 'milestone';
      const sideClass = (i % 2 === 0) ? 'road-left' : 'road-right';
      const kindClass = isMilestone ? 'road-milestone' : 'road-achievement';

      let mediaHTML = '';
      if (item.media) {
        if (item.media.type === 'video') {
          const posterAttr = (item.media.poster && item.media.poster.trim())
            ? ' poster="' + item.media.poster + '"'
            : '';
          mediaHTML =
            '<div class="road-media">' +
              '<video class="road-video" muted playsinline preload="metadata" controls' + posterAttr + '>' +
                '<source src="' + item.media.src + '" type="video/mp4">' +
              '</video>' +
              '<div class="video-overlay"><div class="play-icon"><i class="fa-solid fa-play"></i></div></div>' +
            '</div>';
        } else if (item.media.type === 'image') {
          mediaHTML =
            '<div class="road-media">' +
              '<img class="road-image" src="' + item.media.src + '" alt="' + (item.title || '').replace(/"/g, '&quot;') + '" loading="lazy" decoding="async">' +
            '</div>';
        }
      }

      const dotClass = item.status === 'active' ? 'active' : (item.status === 'vision' ? 'future' : 'done');

      return (
        '<div class="roadmap-item ' + sideClass + ' ' + kindClass + ' fade-up">' +
          '<div class="road-dot-wrap"><div class="road-dot ' + dotClass + '"></div></div>' +
          '<div class="road-content">' +
            '<div class="road-card">' +
              '<div class="road-year">' + (item.date || '') + '</div>' +
              '<h3 class="road-letter-title">' + (item.title || '') + '</h3>' +
              '<p>' + (item.desc || '') + '</p>' +
              mediaHTML +
              '<div class="road-status-row">' +
                '<span class="road-status status-done">' +
                  (isMilestone ? '✓ Milestone' : '★ Achievement') +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    initRoadmapVideos();
  }

  function initRoadmapVideos() {
    const videos = [...document.querySelectorAll('.road-video')];
    if (!videos.length) return;

    videos.forEach(v => {
      if (v.hasAttribute('poster') && v.getAttribute('poster')) return;

      const makeThumb = () => {
        try {
          if (v.duration && v.duration > 0.3) v.currentTime = 0.1;
        } catch (e) { /* ignore */ }

        const onSeeked = () => {
          try { v.pause(); } catch (e) {}
          v.classList.add('has-thumb');
          v.removeEventListener('seeked', onSeeked);
        };
        v.addEventListener('seeked', onSeeked, { once: true });
      };

      if (v.readyState >= 2) makeThumb();
      else v.addEventListener('loadeddata', makeThumb, { once: true });
    });

    videos.forEach(v => {
      v.addEventListener('play', () => {
        videos.forEach(other => {
          if (other !== v && !other.paused) other.pause();
        });
        v.classList.add('is-playing');
      });
      v.addEventListener('pause', () => {
        v.classList.remove('is-playing');
      });
    });

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            const v = entry.target;
            if (!v.paused) v.pause();
          }
        });
      }, { threshold: 0.25 });
      videos.forEach(v => obs.observe(v));
    }

    document.querySelectorAll('.road-media .video-overlay').forEach(overlay => {
      overlay.addEventListener('click', () => {
        const v = overlay.parentElement.querySelector('video');
        if (!v) return;
        v.currentTime = 0;
        v.muted = false;
        v.play().catch(() => {});
      });
    });
  }

  function initAwardsScroll() {
    const cards = document.querySelectorAll('.care-award');
    if (!cards.length) return;

    if (prefersReducedMotion) {
      cards.forEach(c => c.classList.add('in-view'));
      return;
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.remove('leaving');
        } else if (entry.boundingClientRect.top < 0) {
          entry.target.classList.add('leaving');
        }
      });
    }, { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' });

    cards.forEach(c => obs.observe(c));

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.bottom < vh * 0.15) {
            card.classList.add('leaving');
          } else if (rect.top < vh && rect.bottom > 0) {
            card.classList.remove('leaving');
          }
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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
          const show = (cat === 'all' || itemCat === cat);
          it.style.transition = 'opacity 0.2s, transform 0.2s';
          if (show) {
            it.style.display = '';
            requestAnimationFrame(() => { it.style.opacity = '1'; });
          } else {
            it.style.opacity = '0';
            setTimeout(() => { it.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  function initGalleryLightbox() {
    const items = [...document.querySelectorAll('.gallery-item')];
    if (!items.length) return;

    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML =
      '<div class="lightbox-stage">' +
        '<button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
        '<button class="lightbox-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>' +
        '<button class="lightbox-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>' +
        '<img class="lightbox-img" alt="">' +
        '<div class="lightbox-counter"></div>' +
      '</div>';
    document.body.appendChild(lb);

    const imgEl = lb.querySelector('.lightbox-img');
    const counter = lb.querySelector('.lightbox-counter');

    function visibleItems() {
      return items.filter(it => it.style.display !== 'none');
    }

    let current = 0;
    let visible = [];

    function preload(i) {
      const nxt = visible[i];
      if (!nxt) return;
      const img = nxt.querySelector('.gallery-img');
      if (!img || !img.src) return;
      const pre = new Image();
      pre.src = img.src;
    }

    function show(idx) {
      visible = visibleItems();
      if (!visible.length) return;
      current = (idx + visible.length) % visible.length;
      const img = visible[current].querySelector('.gallery-img');
      if (!img) return;
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      counter.textContent = (current + 1) + ' / ' + visible.length;
      preload((current + 1) % visible.length);
      preload((current - 1 + visible.length) % visible.length);
    }

    function open(it) {
      visible = visibleItems();
      const idx = visible.indexOf(it);
      if (idx === -1) return;
      show(idx);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    items.forEach(it => it.addEventListener('click', () => open(it)));

    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.querySelector('.lightbox-prev').addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
    lb.querySelector('.lightbox-next').addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });

    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  function initAwardModals() {
    const buttons = document.querySelectorAll('.care-award .btn-outline');
    if (!buttons.length) return;

    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML =
      '<div class="care-award-modal">' +
        '<button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>' +
        '<h3></h3>' +
        '<p></p>' +
        '<a class="btn-outline aw-link" target="_blank" rel="noreferrer" href="#">View on Facebook <i class="fa-solid fa-arrow-right"></i></a>' +
      '</div>';
    document.body.appendChild(modal);

    const close = () => modal.classList.remove('open');
    modal.querySelector('.lightbox-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    buttons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const card = btn.closest('.care-award');
        if (!card) return;
        const h3 = card.querySelector('h3');
        modal.querySelector('h3').textContent = h3 ? h3.textContent : '';
        modal.querySelector('p').textContent = card.dataset.desc || 'Details coming soon.';
        modal.querySelector('.aw-link').href = card.dataset.link || '#';
        modal.classList.add('open');
      });
    });
  }

  function initTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('care-theme', 'light');

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
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
      const t = e.target.closest('a, button, .card, .project-card, .team-photo, .gallery-item, .news-card, .road-card, .filter-btn, .care-award, .road-media');
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

    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 2) return;
    const lowTier = cores <= 4;

    const canvas = document.getElementById('heroBgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let W = 0, H = 0;
    let points = [];
    let rafId = 0;
    let running = false;
    let lastFrame = 0;
    const FRAME_MS = lowTier ? 50 : 33;

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = lowTier ? 12 : 26;
      const divisor = lowTier ? 45000 : 26000;
      const count = Math.min(Math.floor(W * H / divisor), targetCount);

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

    function draw(ts) {
      if (!running) return;
      if (ts && ts - lastFrame < FRAME_MS) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = ts || 0;

      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const rgb = isDark ? '74, 144, 255' : '21, 128, 61';

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
    renderRoadmap();

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
