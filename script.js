// Interactions: theme toggle, language toggle, skills animation, entrance animations
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle with localStorage and accessible labels
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') document.body.classList.add('light');
  updateThemeButton();
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    updateThemeButton();
  });
  function updateThemeButton() { themeBtn.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode'; }

  // Language toggle (EN <-> AR) — Arabic bio shown first by default
  let lang = localStorage.getItem('lang') || 'ar';
  applyLanguage(lang);
  langBtn.addEventListener('click', () => {
    lang = (lang === 'en') ? 'ar' : 'en';
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
  });
  function applyLanguage(l) {
    const doc = document.documentElement;
    const bioAr = document.getElementById('bioAr');
    const bioEn = document.getElementById('bioEn');
    if (l === 'ar') {
      doc.lang = 'ar'; doc.dir = 'rtl'; langBtn.textContent = 'EN';
      // Arabic hero title and bio (already present)
      document.getElementById('heroTitle').textContent = '𓆩💻 مَـالِـك الأَسْطَـل 𓆪';
      bioAr.style.display = 'block';
      if (bioEn) bioEn.hidden = true;
      // About and other headings in Arabic
      document.getElementById('aboutTitle').textContent = 'نبذة عني';
      document.getElementById('aboutText').textContent = 'أنا مالك العستال، مهتم بالأمن السيبراني، تحليل الثغرات، وبناء حلول حماية. أعمل على مشاريع تعليمية وأشارك موارد للمجتمع.';
      document.getElementById('collegeTitle').textContent = '𓆩🎓 فخور بدخولي عالم التقنية والأمن';
      document.getElementById('collegeText').innerHTML = '𓆩🏫 الكُـلـيـة الجـامـعـيـة لـلـعـلـوم التـطـبـيـقـيـة<br>✧ هنا بدأت رحلتي السيبرانية<br>✧ بالأمل والشغف والإيمان بنفسي 🌟';
      document.getElementById('skillsTitle').textContent = 'المهارات';
      document.getElementById('resourcesTitle').textContent = 'روابط تعليمية مفيدة';
      document.querySelector('.btn.primary').textContent = 'تصفح الموارد';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> واتس اب';
    } else {
      doc.lang = 'en'; doc.dir = 'ltr'; langBtn.textContent = 'AR';
      // English hero title and bio
      document.getElementById('heroTitle').textContent = '𓆩⚙ Malek Alastal 𓆪';
      if (bioEn) { bioEn.hidden = false; bioAr.style.display = 'none'; }
      document.getElementById('aboutTitle').textContent = 'About Me';
      document.getElementById('aboutText').textContent = 'I am Malek Alastal, focused on cybersecurity, vulnerability analysis, and building protective solutions. I work on learning projects and share resources with the community.';
      document.getElementById('collegeTitle').textContent = '𓆩🎓 Proudly stepped into the universe of tech & security';
      document.getElementById('collegeText').innerHTML = '𓆩🏫 University College of Applied Sciences<br>✧ This is where my cyber journey begins<br>✧ With hope, passion, and faith in myself 🌟';
      document.getElementById('skillsTitle').textContent = 'Skills';
      document.getElementById('resourcesTitle').textContent = 'Useful Learning Links';
      document.querySelector('.btn.primary').textContent = 'Browse Resources';
      document.querySelector('.btn.outline').innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
    }
  }

  // Skills animation when in view
  const fills = document.querySelectorAll('.skill-fill');
  const animateSkills = () => fills.forEach(f => { const val = f.getAttribute('data-value') || 0; f.style.width = val + '%'; f.setAttribute('aria-valuenow', val); });
  const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) animateSkills(); }); }, { threshold: 0.3 });
  const skillsSection = document.getElementById('skills'); if (skillsSection) obs.observe(skillsSection);

  // Hero image entrance
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    heroImg.style.transform = 'translateY(10px) scale(.98)';
    heroImg.style.opacity = 0;
    setTimeout(() => { heroImg.style.transition = 'transform .8s ease, opacity .8s ease'; heroImg.style.transform = 'translateY(0) scale(1)'; heroImg.style.opacity = 1; }, 200);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
