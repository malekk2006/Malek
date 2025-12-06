// Main interactions + GSAP animations
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const themeBtnNav = document.getElementById('themeToggleNav');
  const langBtnNav = document.getElementById('langToggleNav');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
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

  // Nav toggle (hamburger) for mobile
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.classList.toggle('open', isOpen);
    });

    // Close nav when clicking a link (mobile)
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('open');
        }
      });
    });
  }

  // Skills animation when in view (GSAP will handle; fallback simple)
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(f => f.style.width = '0%');

  // Touch feedback for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('touchstart', () => btn.classList.add('touched'));
    btn.addEventListener('touchend', () => setTimeout(()=>btn.classList.remove('touched'), 120));
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

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
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

    // Fade-in for .gs-reveal
    gsap.utils.toArray('.gs-reveal').forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 18 },
        {
          duration: 0.9,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Staggered reveal for lists
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
          start: 'top 90%',
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
        if (rect.top < window.innerHeight * 0.85) {
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
