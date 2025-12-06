// Main interactions + GSAP animations + robust mobile nav behavior
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const themeBtnNav = document.getElementById('themeToggleNav');
  const langBtnNav = document.getElementById('langToggleNav');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (desktop + nav)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') document.body.classList.add('light');
  updateThemeButtons();
  function toggleTheme() {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateThemeButtons();
  }
  function updateThemeButtons() {
    const isLight = document.body.classList.contains('light');
    const text = isLight ? 'Dark Mode' : 'Light Mode';
    const short = isLight ? 'Dark' : 'Light';
    if (themeBtn) themeBtn.textContent = text;
    if (themeBtnNav) themeBtnNav.textContent = short;
  }
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeBtnNav) themeBtnNav.addEventListener('click', toggleTheme);

  // Language toggle (desktop + nav)
  let lang = localStorage.getItem('lang') || 'ar';
  function toggleLang() {
    lang = (lang === 'en') ? 'ar' : 'en';
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
  }
  if (langBtn) langBtn.addEventListener('click', toggleLang);
  if (langBtnNav) langBtnNav.addEventListener('click', toggleLang);

  function applyLanguage(l) {
    const doc = document.documentElement;
    const bioAr = document.getElementById('bioAr');
    const bioEn = document.getElementById('bioEn');
    if (l === 'ar') {
      doc.lang = 'ar'; doc.dir = 'rtl';
      if (bioAr) bioAr.style.display = 'block';
      if (bioEn) bioEn.hidden = true;
      if (langBtn) langBtn.textContent = 'EN';
      if (langBtnNav) langBtnNav.textContent = 'EN';
      document.getElementById('heroTitle').textContent = '𓆩💻 مَـالِـك الأَسْطَـل 𓆪';
      document.getElementById('aboutTitle').textContent = 'نبذة عني';
      document.getElementById('aboutText').textContent = 'أنا مالك العستال، مهتم بالأمن السيبراني، تحليل الثغرات، وبناء حلول حماية. أعمل على مشاريع تعليمية وأشارك موارد للمجتمع.';
      document.getElementById('collegeTitle').textContent = '𓆩🎓 فخور بدخولي عالم التقنية والأمن';
      document.getElementById('collegeText').innerHTML = '𓆩🏫 الكُـلـيـة الجـامـعـيـة لـلـعـلـوم التـطـبـيـقـيـة<br>✧ هنا بدأت رحلتي السيبرانية<br>✧ بالأمل والشغف والإيمان بنفسي 🌟';
      document.querySelector('.btn.primary').textContent = 'تصفح الموارد';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> واتس اب';
    } else {
      doc.lang = 'en'; doc.dir = 'ltr';
      if (bioEn) bioEn.hidden = false;
      if (bioAr) bioAr.style.display = 'none';
      if (langBtn) langBtn.textContent = 'AR';
      if (langBtnNav) langBtnNav.textContent = 'AR';
      document.getElementById('heroTitle').textContent = '𓆩⚙ Malek Alastal 𓆪';
      document.getElementById('aboutTitle').textContent = 'About Me';
      document.getElementById('aboutText').textContent = 'I am Malek Alastal, focused on cybersecurity, vulnerability analysis, and building protective solutions. I work on learning projects and share resources with the community.';
      document.getElementById('collegeTitle').textContent = '𓆩🎓 Proudly stepped into the universe of tech & security';
      document.getElementById('collegeText').innerHTML = '𓆩🏫 University College of Applied Sciences<br>✧ This is where my cyber journey begins<br>✧ With hope, passion, and faith in myself 🌟';
      document.querySelector('.btn.primary').textContent = 'Browse Resources';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
    }
  }
  applyLanguage(lang);

  // Nav toggle (hamburger) for mobile with robust behavior
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.classList.toggle('open', isOpen);

      // animate nav links with GSAP if available
      if (typeof gsap !== 'undefined') {
        const items = Array.from(mainNav.querySelectorAll('.nav-link'));
        if (isOpen) {
          gsap.fromTo(items, { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.36, ease: 'power2.out' });
        }
      }
    });

    // Ensure links close menu and scroll smoothly on mobile and desktop
    navLinks.forEach(link => {
      // Use pointerup to support touch and mouse reliably
      link.addEventListener('pointerup', (e) => {
        // allow default for external links (target _blank)
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            // close mobile nav if open
            if (mainNav.classList.contains('open')) {
              mainNav.classList.remove('open');
              navToggle.classList.remove('open');
              navToggle.setAttribute('aria-expanded', 'false');
            }
            // smooth scroll
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // update focus for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            window.setTimeout(() => target.removeAttribute('tabindex'), 1200);
          }
        } else {
          // external link: close menu on mobile then allow navigation
          if (mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }, { passive: true });
    });
  }

  // Skills initial state
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(f => f.style.width = '0%');

  // Touch feedback for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('touchstart', () => btn.classList.add('touched'), { passive: true });
    btn.addEventListener('touchend', () => setTimeout(()=>btn.classList.remove('touched'), 120), { passive: true });
    btn.addEventListener('mousedown', () => btn.classList.add('touched'));
    btn.addEventListener('mouseup', () => setTimeout(()=>btn.classList.remove('touched'), 80));
  });

  // Hero image entrance
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    heroImg.style.transform = 'translateY(10px) scale(.98)';
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroImg.style.transition = 'transform .8s ease, opacity .8s ease';
      heroImg.style.transform = 'translateY(0) scale(1)';
      heroImg.style.opacity = 1;
    }, 200);
  }

  // Smooth scroll for internal links outside nav (works on desktop too)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    // skip if handled by navLinks pointerup above
    if (a.closest('.main-nav')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Accessibility: close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      if (navToggle) { navToggle.setAttribute('aria-expanded', 'false'); navToggle.classList.remove('open'); }
    }
  });

  // === GSAP animations (if GSAP loaded) ===
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in and slide-up for .gs-reveal sections
    gsap.utils.toArray('.gs-reveal').forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 22 },
        {
          duration: 0.9,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Staggered reveal for nav links on open (also run once on load for desktop)
    const navItems = Array.from(document.querySelectorAll('.main-nav .nav-link'));
    if (navItems.length) {
      // small entrance on page load for desktop
      if (window.innerWidth > 820) {
        gsap.from(navItems, { autoAlpha: 0, y: -6, stagger: 0.06, duration: 0.6, ease: 'power2.out' });
      }
    }

    // Staggered reveal for lists (resources, social icons)
    const lists = document.querySelectorAll('.resources-list, .inline-social, .social-icons');
    lists.forEach(list => {
      const items = Array.from(list.children);
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 10,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Skill bars animation
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length) {
      gsap.fromTo(skillFills,
        { width: '0%' },
        {
          width: (i, el) => el.getAttribute('data-value') + '%',
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Hero image subtle parallax
    if (heroImg) {
      gsap.to(heroImg, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }

    // Button hover micro animation
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.03, duration: 0.18, ease: 'power1.out' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power1.out' }));
    });

    // Respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce && reduce.matches) {
      ScrollTrigger.getAll().forEach(st => st.disable());
    }
  } else {
    // Fallback: simple reveal when scrolling (no GSAP)
    const revealOnScroll = () => {
      document.querySelectorAll('.gs-reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }
      });
      // simple skill fill
      const skillsRect = document.getElementById('skills')?.getBoundingClientRect();
      if (skillsRect && skillsRect.top < window.innerHeight * 0.85) {
        document.querySelectorAll('.skill-fill').forEach(f => {
          const val = f.getAttribute('data-value') || 0;
          f.style.width = val + '%';
          f.setAttribute('aria-valuenow', val);
        });
      }
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });
  }
});
