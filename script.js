// Interactions: theme toggle, language toggle, skills animation, small entrance animations
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Theme toggle with localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if(savedTheme === 'light') document.body.classList.add('light');
  updateThemeButton();

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateThemeButton();
  });

  function updateThemeButton(){
    themeBtn.textContent = document.body.classList.contains('light') ? 'زر الظلام' : 'زر الضوء';
  }

  // Language toggle with simple text map
  let lang = localStorage.getItem('lang') || 'ar';
  applyLanguage(lang);

  langBtn.addEventListener('click', () => {
    lang = (lang === 'ar') ? 'en' : 'ar';
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
  });

  function applyLanguage(l){
    const doc = document.documentElement;
    if(l === 'en'){
      doc.lang = 'en'; doc.dir = 'ltr';
      langBtn.textContent = 'ع';
      // swap visible texts
      document.querySelector('.hero-title').textContent = 'Hello — I am Malek Alastal';
      document.querySelector('.hero-sub').textContent = 'Student and Cybersecurity enthusiast. I share resources and projects.';
      document.querySelector('.btn.primary').textContent = 'Browse resources';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
      document.querySelector('#about h3').textContent = 'About Me';
      document.querySelector('#college h3').textContent = 'University';
      document.querySelector('#skills h3').textContent = 'Skills';
      document.querySelector('#resources h3').textContent = 'Useful Links';
    } else {
      doc.lang = 'ar'; doc.dir = 'rtl';
      langBtn.textContent = 'EN';
      document.querySelector('.hero-title').textContent = 'مرحباً — أنا مالك العستال';
      document.querySelector('.hero-sub').textContent = 'طالب ومتخصص في الأمن السيبراني. أشارك موارد، مشاريع، وروابط تعليمية مفيدة.';
      document.querySelector('.btn.primary').textContent = 'تصفح الموارد';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> واتس اب';
      document.querySelector('#about h3').textContent = 'نبذة عني';
      document.querySelector('#college h3').textContent = 'الكلية الجامعية للعلوم التطبيقية';
      document.querySelector('#skills h3').textContent = 'المهارات';
      document.querySelector('#resources h3').textContent = 'روابط تعليمية مفيدة';
    }
  }

  // Skills animation when in view
  const fills = document.querySelectorAll('.skill-fill');
  const animateSkills = () => {
    fills.forEach(f => {
      const val = f.getAttribute('data-value') || 0;
      f.style.width = val + '%';
    });
  };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) animateSkills(); });
  }, {threshold: 0.3});
  const skillsSection = document.getElementById('skills');
  if(skillsSection) obs.observe(skillsSection);

  // Small entrance animations
  const heroImg = document.querySelector('.hero-image');
  if(heroImg){
    heroImg.style.transform = 'translateY(10px) scale(.98)';
    heroImg.style.opacity = 0;
    setTimeout(()=>{ heroImg.style.transition = 'transform .8s ease, opacity .8s ease'; heroImg.style.transform = 'translateY(0) scale(1)'; heroImg.style.opacity = 1; }, 200);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});
