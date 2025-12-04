document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if(savedTheme === 'light') document.body.classList.add('light');
  updateThemeButton();
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateThemeButton();
  });
  function updateThemeButton(){ themeBtn.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode'; }

  // Language toggle simplified
  let lang = localStorage.getItem('lang') || 'en';
  applyLanguage(lang);
  langBtn.addEventListener('click', () => {
    lang = (lang === 'en') ? 'ar' : 'en';
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
  });
  function applyLanguage(l){
    const doc = document.documentElement;
    if(l === 'ar'){
      doc.lang = 'ar'; doc.dir = 'rtl'; langBtn.textContent = 'EN';
      document.getElementById('heroTitle').textContent = 'مرحباً — أنا مالك العستال';
      document.getElementById('heroSub').textContent = 'طالب ومتخصص في الأمن السيبراني. أشارك موارد ومشاريع وروابط تعليمية.';
      document.querySelector('.btn.primary').textContent = 'تصفح الموارد';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> واتس اب';
    } else {
      doc.lang = 'en'; doc.dir = 'ltr'; langBtn.textContent = 'AR';
      document.getElementById('heroTitle').textContent = 'Hello — I am Malek Alastal';
      document.getElementById('heroSub').textContent = 'Student and Cybersecurity enthusiast. I share resources, projects, and learning links.';
      document.querySelector('.btn.primary').textContent = 'Browse Resources';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
    }
  }

  // Skills animation
  const fills = document.querySelectorAll('.skill-fill');
  const animateSkills = () => fills.forEach(f => { const val = f.getAttribute('data-value') || 0; f.style.width = val + '%'; f.setAttribute('aria-valuenow', val); });
  const obs = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting) animateSkills(); }); }, {threshold: 0.3});
  const skillsSection = document.getElementById('skills'); if(skillsSection) obs.observe(skillsSection);

  // Hero image entrance
  const heroImg = document.querySelector('.hero-image');
  if(heroImg){ heroImg.style.transform = 'translateY(10px) scale(.98)'; heroImg.style.opacity = 0;
    setTimeout(()=>{ heroImg.style.transition = 'transform .8s ease, opacity .8s ease'; heroImg.style.transform = 'translateY(0) scale(1)'; heroImg.style.opacity = 1; }, 200);
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{ a.addEventListener('click', e=>{ e.preventDefault(); const target = document.querySelector(a.getAttribute('href')); if(target) target
