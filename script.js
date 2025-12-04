// Interactions: theme toggle, language toggle, skills animation, entrance animations
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

  // Language toggle with decorated bios
  let lang = localStorage.getItem('lang') || 'ar';
  applyLanguage(lang);

  langBtn.addEventListener('click', () => {
    lang = (lang === 'ar') ? 'en' : 'ar';
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
  });

  function applyLanguage(l){
    const doc = document.documentElement;
    const bioAr = document.getElementById('bioDecorAr');
    const bioEn = document.getElementById('bioDecorEn');

    if(l === 'en'){
      doc.lang = 'en'; doc.dir = 'ltr';
      langBtn.textContent = 'ع';
      document.getElementById('heroTitle').textContent = 'Hello — I am Malek Alastal';
      document.getElementById('heroSub').textContent = 'Student and Cybersecurity enthusiast. I share resources and projects.';
      document.querySelector('.btn.primary').textContent = 'Browse resources';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
      document.getElementById('aboutTitle').textContent = 'About Me';
      document.getElementById('aboutText').textContent = 'I am Malek Alastal, focused on cybersecurity, vulnerability analysis, and building protective solutions.';
      document.getElementById('collegeTitle').textContent = 'University College of Applied Sciences';
      document.getElementById('collegeText').textContent = 'Studying at the University College of Applied Sciences with a focus on cybersecurity and practical technologies.';
      document.getElementById('skillsTitle').textContent = 'Skills';
      document.getElementById('resourcesTitle').textContent = 'Useful Links';
      bioAr.hidden = true; bioEn.hidden = false;
    } else {
      doc.lang = 'ar'; doc.dir = 'rtl';
      langBtn.textContent = 'EN';
      document.getElementById('heroTitle').textContent = 'مرحباً — أنا مالك العستال';
      document.getElementById('heroSub').textContent = 'طالب ومتخصص في الأمن السيبراني. أشارك موارد، مشاريع، وروابط تعليمية مفيدة.';
      document.querySelector('.btn.primary').textContent = 'تصفح الموارد';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> واتس اب';
      document.getElementById('aboutTitle').textContent = 'نبذة عني';
      document.getElementById('aboutText').textContent = 'أنا مالك العستال، مهتم بالأمن السيبراني، تحليل الثغرات، وبناء حلول حماية. أعمل على مشاريع تعليمية وأشارك موارد للمجتمع.';
      document.getElementById('collegeTitle').textContent = 'الكلية الجامعية للعلوم التطبيقية';
      document.getElementById('collegeText').textContent = 'دراسة في الكلية الجامعية للعلوم التطبيقية مع تركيز على الأمن السيبراني والتقنيات العملية.';
      document.getElementById('skillsTitle').textContent = 'المهارات';
      document.getElementById('resourcesTitle').textContent = 'روابط تعليمية مفيدة';
      bioAr.hidden = false; bioEn.hidden = true;
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

  // Entrance animation for hero image
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
